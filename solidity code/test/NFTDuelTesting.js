
const { expectRevert, expectEvent, BN } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { assert } = require('console');
const NFTDuels = artifacts.require('NFTDuels');
const NFT = artifacts.require('NFT');

contract( 'Market' , (accounts) => {
    let market;
    let token;
    const minter = accounts[1];
    const buyer = accounts[2];
    const tokenIdMinter = new BN(1);
    const tokenIdBuyer = new BN(2);
    const MinterListTokenIndex = new BN(0);
    const BuyerListTokenIndex = new BN(1);
    before( async () => {
        market = await NFTDuels.deployed();
        token = await NFT.deployed();
    
        await token.mint(1,{ from: minter });
        await token.mint(2, { from: buyer });
    });

    describe( 'Escrow Token', () =>{
        it('should prevent escrowing token bc NFT doesnt exist' , () =>{
            return expectRevert(
                market.escrowToken(
                token.address,
                1000
            ), 'revert');

        });
        it('should prevent escrowing token because not correct owner' , () =>{
            return expectRevert(
                market.escrowToken(
                token.address,
                tokenIdMinter,  { from: buyer }
            ), 'revert');

        });
       

        it('should execute escrowing token' , async () =>{
            await token.approve(market.address, tokenIdMinter,  {
                from: minter
            });
            
            const tx = await market.escrowToken(
                token.address,
                tokenIdMinter,
                { from: minter }
            );
    
            return expectEvent(tx , 'TokenListed'
            , {
                contractAddr: token.address,
                tokenId: tokenIdMinter,
                listedTokenIndex: MinterListTokenIndex}
                );
        });

        // it('should prevent escrowing token bc inccorect user' , () =>{
        //     return expectRevert(
        //         market.escrowToken(
        //         token.address,
        //         tokenIdMinter,
        //         { from: buyer }
        //     ), "not the owner of contract");

        // });
    });

    
    describe('Make offer ', () => {
        it('not enough fees', () => {
                return expectRevert(
                market.makeOffer(
                    MinterListTokenIndex,
                    token.address,
                     tokenIdBuyer ,
                      1000,
                      100000000), 
                      {
                        from: buyer,
                        value: 500
                      }), "insufficient funds"; 
    });
    it('incorrect owner', () => {
        return expectRevert(
        market.makeOffer(
            MinterListTokenIndex,
            token.address,
             tokenIdMinter ,
              1000,
              100000000), 
              {
                from: buyer,
                value: 500
              }), "not the owner of contract"; 
});
it('offer goes through', () => {
    //  const tx = 
    return expectRevert(market.makeOffer(
        MinterListTokenIndex,
        token.address,
        tokenIdBuyer ,
          1000,
          100000000, 
          {
            from: buyer,
            value: 1000
          }), "nothing");
    //       console.log(tx);
    // return expectEvent(tx , 'OfferMade'
    // , {
    //     requestedContractAddr: token.address,
    //      requestedTokenId: tokenIdMinter,
    //        offeredContractAddr: token.address,
    //         offeredTokenId: tokenIdBuyer,
    //          exchangeValue : new BN(0)}
    //     );
    
});

    

    
    });
});