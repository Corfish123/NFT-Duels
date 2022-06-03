
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
            ), "ERC721: owner query for nonexistent token");

        });
        it('should prevent escrowing token because not correct owner' , () =>{
            return expectRevert(
                market.escrowToken(
                token.address,
                tokenIdMinter,  { from: buyer }
            ), "not the owner of contract");

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
                      100000000, {from: buyer,value: 500}
                      ), 'insufficient funds'); 
    });
    it('incorrect owner', () => {
        return expectRevert(
            market.makeOffer(
                MinterListTokenIndex,
                token.address,
                 tokenIdMinter ,
                  1000,
                  100000000, {from: buyer,value: 1000}
                  ), "not the owner of contract being offered"); 
});
it('offer goes through for trading nfts', async () => {

    const tx = await market.makeOffer(
        MinterListTokenIndex,
        token.address,
        tokenIdBuyer,
        1000,
        100000000, 
        {from: buyer,value: 1000}
    );


    return expectEvent(tx , 'OfferMade'
    , {
        requestedContractAddr: token.address,
         requestedTokenId: tokenIdMinter,
           offeredContractAddr: token.address,
            offeredTokenId: tokenIdBuyer,
             exchangeValue : new BN(0)}
        );
});

it('offer goes through for trading nfts', async () => {

    const tx = await market.makeOffer(
        MinterListTokenIndex,
        token.address,
        tokenIdBuyer,
        1000,
        100000000, 
        {from: buyer,value: 1000}
    );


    return expectEvent(tx , 'OfferMade'
    , {
        requestedContractAddr: token.address,
         requestedTokenId: tokenIdMinter,
           offeredContractAddr: token.address,
            offeredTokenId: tokenIdBuyer,
             exchangeValue : new BN(0)}
        );
});

    

    
    });
});