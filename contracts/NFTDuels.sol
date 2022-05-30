pragma solidity ^0.8.14;

abstract contract ERC721 {
    function  totalSupply() public view virtual returns (uint256 total);
    function balanceOf(address _owner) public view virtual returns (uint256 balance);
    function ownerOf(uint256 _tokenId) external view virtual returns (address owner);
    function approve(address _to, uint256 _tokenId) virtual external;
    function getApproved(uint256 _tokenId) virtual external returns(address operator);
    function setApprovalForAll(address to, bool approved) virtual external;
    function isApprovedForAll(address owner, address operator) virtual external returns(bool approved);
    function transfer(address _to, uint256 _tokenId) virtual external;
    function transferFrom(address _from, address _to, uint256 _tokenId) virtual external;

    event Transfer(address from, address to, uint256 tokenId);
    event Approval(address owner, address approved, uint256 tokenId);
}

contract NFTSwap {
    event NFTApproved(address indexed contractAddr, uint256 indexed tokenId);
    event UserApproved(address indexed contractAddr);
    event TokenUnlisted(address indexed contractAddr, uint256 indexed tokenId);
    event TokenListed(address indexed contractAddr, uint256 indexed tokenId);
    event OfferMade(address requestedContractAddr, uint256 requestedTokenId, address offeredContractAddr, uint256 offeredTokenId, int exchangeValue, uint expires);
    event OfferTaken(address takenContractAddr, uint256 takenTokenId, address givenContractAddr, uint256 givenTokenId, int exchangeValue, address winningAddress);
    event OfferCancelled(address requestedContractAddr, uint256 requestedTokenId, address offeredContractAddr, uint256 offeredTokenId, int exchangeValue, uint expires);

    // Initializing the state variable
    uint randNonce = 0;

    struct ListedToken {
        address owner;
        address contractAddr;
        uint tokenId;
    }

    ListedToken[] public listedTokens;

    mapping (address => uint[]) public ownerTokens;

    // For convenience
    mapping (address => mapping (uint256 => uint)) public tokenIndexInOwnerTokens;

    struct Offer {
        address offerer;
        uint requestedIndex;
        uint offeredIndex;
        int exchangeValue;
        uint expires;
    }
    Offer[] public offers;

    address owner;
      constructor() {
        owner = msg.sender;
    }
    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
    
    // Defining a function to generate
// a random number
function randomNumber() internal returns(uint)
{
   // increase nonce
   randNonce++; 
   return uint(keccak256(abi.encodePacked(block.timestamp,
                                          msg.sender,
                                          randNonce))) %100;
 }


    //approves all users NFT the be later gambled with
    function approveNFT( uint256 _tokenId) external {
        ERC721(msg.sender).approve( address(this), _tokenId);
        emit NFTApproved(msg.sender, _tokenId);
    }

    //approves all users NFT the be later gambled with
    function approveUser() external {
        ERC721(msg.sender).setApprovalForAll( address(this), true);
        emit UserApproved(msg.sender);
    }

    //check to make sure our contract is fully approved to transfer all nfts
    function checkApprovedUser() public returns (bool) {
        // This requires the token to be approved which should be handled by the UI
        return ERC721(msg.sender).isApprovedForAll(msg.sender, address(this));

    }
    //check to make sure our contract is fully approved to transfer this nft
    function checkApprovedNFT( uint256 _tokenId) public returns (bool) {
        // This requires the token to be approved which should be handled by the UI
        return (address(this)) == ERC721(msg.sender).getApproved(_tokenId);

    }

    function escrowToken(address _contractAddr, uint256 _tokenId) public returns (uint){
        require(msg.sender ==   ERC721(_contractAddr).ownerOf(_tokenId));

        listedTokens.push(ListedToken({
            owner: msg.sender,
            contractAddr: _contractAddr,
            tokenId: _tokenId
        }));
        uint listedTokenIndex =  listedTokens.length; 
        // push returns the new length of the array, so listed token is at index-1
        ownerTokens[msg.sender].push(listedTokenIndex - 1);
        uint ownerTokenIndex = ownerTokens[msg.sender].length;

        tokenIndexInOwnerTokens[_contractAddr][_tokenId] = ownerTokenIndex - 1;

        emit TokenListed(_contractAddr, _tokenId);

        return listedTokenIndex - 1;
    }

    // Makes an offer for the token listed at _requestedIndex for the token listed at _offeredIndex with just NFT
    function makeOffer(uint _requestedIndex, address _contractAddrOffered,uint256 _tokenIdOffered ,uint fee, uint _expiresIn) external payable returns (uint) {
        require(msg.sender ==   ERC721(_contractAddrOffered).ownerOf(_tokenIdOffered));
        require(msg.value == fee);
        require(_expiresIn > 0);

        ListedToken storage requestedToken = listedTokens[_requestedIndex];

        // Can not make offers to non-listed token
        require(requestedToken.owner != address(0x0));

        uint _offeredIndex = escrowToken(_contractAddrOffered, _tokenIdOffered);

        ListedToken storage offeredToken = listedTokens[_offeredIndex];

        require(offeredToken.owner == msg.sender);

         offers.push(Offer({
            offerer: msg.sender,
            requestedIndex: _requestedIndex,
            offeredIndex: _offeredIndex,
            exchangeValue: 0, //no money offered
            expires: block.number + _expiresIn
        }));
        uint index = offers.length ;

        emit OfferMade(requestedToken.contractAddr, requestedToken.tokenId, offeredToken.contractAddr, offeredToken.tokenId, 0, block.number + _expiresIn);

        return index - 1;
    }

    // Makes an offer for the token listed at _requestedIndex with the sent funds (without offering a token in return)
    function makeOfferWithFunds(uint _requestedIndex, uint _expiresIn, uint funds) external payable returns (uint) {
        require(_expiresIn > 0);
        require(msg.value == uint(funds * 102 / 100));
        ListedToken storage requestedToken = listedTokens[_requestedIndex];

        // Can not make offers to delisted token
              require(requestedToken.owner != address(0x0));
        

        offers.push(Offer({
            offerer: msg.sender,
            requestedIndex: _requestedIndex,
            offeredIndex: 0,                 // 0 means no token is offered (listed token id's start from 1, see constructor)
            exchangeValue: int(funds),   // Exchange value is equal to the amount sent
            expires: block.number + _expiresIn
        }));

        uint index = offers.length;

        emit OfferMade(requestedToken.contractAddr, requestedToken.tokenId, address(0x0), 0, int(msg.value), block.number + _expiresIn);

        return index - 1;
    }

//funds can only be positive
        function takeOffer(uint _offerId, uint fee ) external payable {
        Offer storage offer = offers[_offerId];
        require(offer.expires > block.number);
        
        //exchange value should be greater than zero
        require(offer.exchangeValue >= 0);

        //this is the fee one must pay to play the game
        require(msg.value == fee);


        ListedToken storage givenToken = listedTokens[offer.requestedIndex];
        require(givenToken.owner == msg.sender);

        givenToken.owner = offer.offerer;

        uint givenTokenIndex = tokenIndexInOwnerTokens[givenToken.contractAddr][givenToken.tokenId];

        ListedToken storage takenToken = listedTokens[offer.offeredIndex];

        // If this is a "cash-only" offer
        if (takenToken.owner == address(0x0)) {  // We are actually checking if null
            uint toBeMovedTokenIndex = ownerTokens[msg.sender].length - 1;

            //move the given token that will be swapped onto the end of the list
            if (givenTokenIndex != toBeMovedTokenIndex) {
                ownerTokens[msg.sender][givenTokenIndex] = ownerTokens[msg.sender][toBeMovedTokenIndex];

                ListedToken storage toBeMovedToken = listedTokens[ownerTokens[msg.sender][toBeMovedTokenIndex]];
                tokenIndexInOwnerTokens[toBeMovedToken.contractAddr][toBeMovedToken.tokenId] = givenTokenIndex;
            }

            uint randomNum = randomNumber();
            address winningAddress = address(0x0);
            //give the token to the offerer
            if(randomNum < 50){
                ownerTokens[offer.offerer].push(offer.requestedIndex);
                uint newIndex =  ownerTokens[offer.offerer].length -1;
                tokenIndexInOwnerTokens[givenToken.contractAddr][givenToken.tokenId] = newIndex;
                winningAddress = offer.offerer;
            }else{
                //give money to lister
                payable(msg.sender).transfer(uint(offer.exchangeValue));
                winningAddress = msg.sender;
            }
            emit OfferTaken(address(0x0), 0, givenToken.contractAddr, givenToken.tokenId, offer.exchangeValue, winningAddress);
        } else { // nft exchange
            takenToken.owner = msg.sender;

            uint takenTokenIndex = tokenIndexInOwnerTokens[takenToken.contractAddr][takenToken.tokenId];

            uint temp = ownerTokens[msg.sender][givenTokenIndex];
            ownerTokens[msg.sender][givenTokenIndex] = ownerTokens[offer.offerer][takenTokenIndex];
            ownerTokens[offer.offerer][takenTokenIndex] = temp;

            temp = tokenIndexInOwnerTokens[givenToken.contractAddr][givenToken.tokenId];
            tokenIndexInOwnerTokens[givenToken.contractAddr][givenToken.tokenId] =
                tokenIndexInOwnerTokens[takenToken.contractAddr][takenToken.tokenId];
            tokenIndexInOwnerTokens[takenToken.contractAddr][takenToken.tokenId] = temp;

            emit OfferTaken(takenToken.contractAddr, takenToken.tokenId, givenToken.contractAddr, givenToken.tokenId, offer.exchangeValue );
        }

        // Remove offer since it's taken
        delete offers[_offerId];
    }


    function withdraw() public payable onlyOwner {

    (bool os, ) = payable(owner).call{value: address(this).balance}("");
    require(os);
    // =============================================================================
  }
}