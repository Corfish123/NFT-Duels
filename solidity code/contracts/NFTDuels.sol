// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract NFTDuels {
    event NFTApproved(address indexed contractAddr, uint256 indexed tokenId);
    event UserApproved(address indexed contractAddr);
    event TokenUnlisted(
        address indexed contractAddr,
        uint256 indexed tokenId,
        uint256 listedTokenIndex
    );
    event TokenListed(
        address indexed contractAddr,
        uint256 indexed tokenId,
        uint256 listedTokenIndex
    );
    event OfferMade(
        address requestedContractAddr,
        uint256 requestedTokenId,
        address offeredContractAddr,
        uint256 offeredTokenId,
        int256 exchangeValue,
        uint256 expires,
        bool isCashOffer
    );
    event OfferTaken(
        address requestedContractAddr,
        uint256 requestedTokenId,
        address offeredContractAddr,
        uint256 offeredTokenId,
        int256 exchangeValue,
        address winningAddress,
        bool isCashOffer
    );
    event OfferCancelled(
        address requestedContractAddr,
        uint256 requestedTokenId,
        address offeredContractAddr,
        uint256 offeredTokenId,
        int256 exchangeValue,
        uint256 expires,
        bool isCashOffer
    );
    event Debug(string text);
    // Initializing the state variable
    uint256 randNonce = 0;

    struct ListedToken {
        address owner;
        address contractAddr;
        uint256 tokenId;
    }

    ListedToken[] public listedTokens;

    struct Offer {
        address offerer;
        uint256 requestedIndex;
        uint256 offeredIndex;
        int256 exchangeValue;
        uint256 expires;
        bool isCashOffer;
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
    function randomNumber() internal returns (uint256) {
        // increase nonce
        randNonce++;
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.timestamp, msg.sender, randNonce)
                )
            ) % 100;
    }

    //take an nft and list it by putting it inside our listing array
    function escrowToken(address _contractAddr, uint256 _tokenId)
        public
        returns (uint256)
    {
        require(
            msg.sender == ERC721(_contractAddr).ownerOf(_tokenId),
            "not the owner of contract"
        );
        require(address(this) == ERC721(_contractAddr).getApproved(_tokenId) 
        , "This contract needs to be approved before getting listed");
        
        return addTokenToList(_contractAddr, _tokenId);
    }

//private function to add tokens to the list array
    function addTokenToList(address _contractAddr, uint256 _tokenId)
        private
        returns (uint256)
    {
        listedTokens.push(
            ListedToken({
                owner: msg.sender,
                contractAddr: _contractAddr,
                tokenId: _tokenId
            })
        );
        uint256 listedTokenIndex = listedTokens.length;

        emit TokenListed(_contractAddr, _tokenId, listedTokenIndex - 1);

        return listedTokenIndex - 1;
    }

    function withdrawToken(uint256 _listedTokenIndex) external {
         require(
            _listedTokenIndex >= 0 && _listedTokenIndex < listedTokens.length,
            " requested index isn't within range"
        );
        
        ListedToken storage withdrawnListedToken = listedTokens[
            _listedTokenIndex
        ];
        require(withdrawnListedToken.owner == msg.sender);

        emit TokenUnlisted(
            withdrawnListedToken.contractAddr,
            withdrawnListedToken.tokenId,
            _listedTokenIndex
        );

        delete listedTokens[_listedTokenIndex];
    }

    // Makes an offer for the token listed at _requestedIndex for the token listed at _offeredIndex with just NFT
    function makeOffer(
        uint256 _requestedIndex,
        address _contractAddrOffered,
        uint256 _tokenIdOffered,
        uint256 fee,
        uint256 _expiresIn
    ) external payable returns (uint256) {
        require(
            msg.sender == ERC721(_contractAddrOffered).ownerOf(_tokenIdOffered),
            "not the owner of contract being offered"
        );
        require(msg.value >= fee, "insufficient funds");
        require(_expiresIn > 0, "expiration date isn't positive");
        require(
            _requestedIndex >= 0 && _requestedIndex < listedTokens.length,
            " requested index isn't within range"
        );
        require(address(this) == ERC721(_contractAddrOffered).getApproved(_tokenIdOffered) , "This contract needs to be approved before getting listed");
        ListedToken storage requestedToken = listedTokens[_requestedIndex];
        // Can not make offers to non-listed token
        require(
            requestedToken.owner != address(0x0),
            "requested token owner can't be zero address"
        );

        uint256 _offeredIndex = addTokenToList(
            _contractAddrOffered,
            _tokenIdOffered
        );

        ListedToken storage offeredToken = listedTokens[_offeredIndex];

        offers.push(
            Offer({
                offerer: msg.sender,
                requestedIndex: _requestedIndex,
                offeredIndex: _offeredIndex,
                exchangeValue: 0, //no money offered
                expires: block.number + _expiresIn,
                isCashOffer: false
            })
        );
        uint256 index = offers.length;

        emit OfferMade(
            requestedToken.contractAddr,
            requestedToken.tokenId,
            offeredToken.contractAddr,
            offeredToken.tokenId,
            0,
            block.number + _expiresIn,
            false
        );

        return index - 1;
    }

    // Makes an offer for the token listed at _requestedIndex with the sent funds (without offering a token in return)
    function makeOfferWithFunds(
        uint256 _requestedIndex,
         uint256 funds,
        uint256 _expiresIn
    ) external payable returns (uint256) {
        require(_expiresIn > 0, "expiration date isn't positive");
        require(
            _requestedIndex >= 0 && _requestedIndex < listedTokens.length,
            "requested index isn't within range"
        );
        require(msg.value >= uint256((funds * 102) / 100) , "insufficient funds to play" );
        ListedToken storage requestedToken = listedTokens[_requestedIndex];

        // Can not make offers to delisted token
          require(
            requestedToken.owner != address(0x0),
            "requested token owner can't be zero address"
        );

        offers.push(
            Offer({
                offerer: msg.sender,
                requestedIndex: _requestedIndex,
                offeredIndex: 0, // 0 means no token is offered (listed token id's start from 1, see constructor)
                exchangeValue: int256(funds), // Exchange value is equal to the amount sent
                expires: block.number + _expiresIn,
                isCashOffer: true
            })
        );

        uint256 index = offers.length;

        emit OfferMade(
            requestedToken.contractAddr,
            requestedToken.tokenId,
            address(0x0),
            0,
            int256(funds),
            block.number + _expiresIn,
            true
        );

        return index - 1;
    }

    //the lister takes the offer and then there is a randomized flipper that flips the chances to earn both nfts
    function takeOffer(uint256 _offerId, uint256 fee, uint256 chances) external payable {
    
        require(
            _offerId >= 0 && _offerId < offers.length,
            "offer index isn't within range"
        );
        Offer storage offer = offers[_offerId];
        require(offer.expires > block.number, "offer expired already");

        require(chances <= 100 && chances >= 0, "chances must be between 0 to 100");
        //this is the fee one must pay to play the game
        require(msg.value >= fee, "insufficient funds to play");

        ListedToken storage listedToken = listedTokens[offer.requestedIndex];
        require(listedToken.owner == msg.sender, "you must be the owner of this nft");

        
        ListedToken storage offeredToken = listedTokens[offer.offeredIndex];

        // If this is a "cash-only" offer
        if (offer.isCashOffer) {
            // We are actually checking if null

            uint256 randomNum = randomNumber();
            address winningAddress;
            //give the token to the offerer
            if (randomNum < chances) {
              
                require(ERC721(listedToken.contractAddr).ownerOf(listedToken.tokenId)== msg.sender, "lister owner should be caller");

   
                ERC721(listedToken.contractAddr).transferFrom(
                    msg.sender,
                    offer.offerer,
                    listedToken.tokenId
                );
                winningAddress = offer.offerer;
                listedToken.owner = offer.offerer;

    
            } else {
                //give money to lister
                payable(msg.sender).transfer(uint256(offer.exchangeValue));
                winningAddress = msg.sender;
                offeredToken.owner = msg.sender;

         
            }
            emit OfferTaken(
                listedToken.contractAddr,
                listedToken.tokenId,
                address(0x0),
                0,
                offer.exchangeValue,
                winningAddress,
                offer.isCashOffer
            );
        } else {
            // nft exchange
            uint256 randomNum = randomNumber();
            address winningAddress = address(0x0);

            //give the NFT to the offerer
            if (randomNum < chances) {
                ERC721(listedToken.contractAddr).transferFrom(
                    msg.sender,
                    offer.offerer,
                    listedToken.tokenId
                );
                winningAddress = offer.offerer;
                listedToken.owner = offer.offerer;

                
            } else {

                require(offer.offerer == offeredToken.owner, "you must be the owner of this nft");

                //give NFT to lister
                ERC721(offeredToken.contractAddr).transferFrom(
                    offer.offerer,
                    msg.sender,
                    offeredToken.tokenId
                );
                winningAddress = msg.sender;
                offeredToken.owner = msg.sender;
            
            }

            emit OfferTaken(

                listedToken.contractAddr,
                listedToken.tokenId,
                offeredToken.contractAddr,
                offeredToken.tokenId,
                offer.exchangeValue,
                winningAddress,
                offer.isCashOffer
            );
        }

        // Remove offer since it's taken
        delete offers[_offerId];
    }

    // This does not remove the approval of the token
    function cancelOffer(uint256 _offerId) external {

        require(
            _offerId >= 0 && _offerId < offers.length,
            " requested index isn't within range"
        );

        Offer storage offer = offers[_offerId];
        require(offer.offerer == msg.sender);

        // Refund to offerer if exchangeValue is greater than 0, which means offerer sent it when making the offer
        if (offer.exchangeValue > 0) {
            payable(offer.offerer).transfer(uint256(offer.exchangeValue));
        }

        ListedToken storage requestedToken = listedTokens[offer.requestedIndex];
        ListedToken storage offeredToken = listedTokens[offer.offeredIndex];

        emit OfferCancelled(
            requestedToken.contractAddr,
            requestedToken.tokenId,
            offeredToken.contractAddr,
            offeredToken.tokenId,
            offer.exchangeValue,
            offer.expires,
            offer.isCashOffer
        );

        delete offers[_offerId];
    }

    function withdraw() public payable onlyOwner {
        (bool os, ) = payable(owner).call{value: address(this).balance}("");
        require(os);
        // =============================================================================
    }
}
