
const { expectRevert, expectEvent, BN } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { assert } = require('console');
const NFTDuels = artifacts.require('NFTDuels');
const NFT = artifacts.require('NFT');

contract('Market', (accounts) => {
    let market;
    let token;
    const minter = accounts[1];
    const buyer = accounts[2];
    const tokenIdMinter = new BN(1);
    const tokenIdBuyer = new BN(2);
    const MinterListTokenIndex = new BN(0);
    const BuyerListTokenIndex = new BN(1);
    const offerIndex = new BN(0);
    const chances = 50;
    before(async () => {
        market = await NFTDuels.deployed();
        token = await NFT.deployed();

        await token.mint(1, { from: minter });
        await token.mint(2, { from: buyer });
    });

    describe('Escrow Token', () => {
        it('should prevent escrowing token bc NFT doesnt exist', () => {
            return expectRevert(
                market.escrowToken(
                    token.address,
                    1000
                ), "ERC721: owner query for nonexistent token");

        });
        it('should prevent escrowing token because not correct owner', () => {
            return expectRevert(
                market.escrowToken(
                    token.address,
                    tokenIdMinter, { from: buyer }
                ), "not the owner of contract");

        });

        it('should prevent escrowing token because token not approved', () => {
            return expectRevert(
                market.escrowToken(
                    token.address,
                    tokenIdMinter,
                    { from: minter }
                ), "This contract needs to be approved before getting listed");

        });


        it('should execute escrowing token', async () => {
            await token.approve(market.address, tokenIdMinter, {
                from: minter
            });

            const tx = await market.escrowToken(
                token.address,
                tokenIdMinter,
                { from: minter }
            );

            return expectEvent(tx, 'TokenListed'
                , {
                    contractAddr: token.address,
                    tokenId: tokenIdMinter,
                    listedTokenIndex: MinterListTokenIndex
                }
            );
        });

    });

    /**
     * Make offer testing
     * /////////////////////////////////////////////////////////////////
     */
    describe('Make offer ', () => {
        it('not enough fees', () => {
            return expectRevert(
                market.makeOffer(
                    MinterListTokenIndex,
                    token.address,
                    tokenIdBuyer,
                    1000,
                    100000000, { from: buyer, value: 500 }
                ), 'insufficient funds');
        });
        it('incorrect owner', () => {
            return expectRevert(
                market.makeOffer(
                    MinterListTokenIndex,
                    token.address,
                    tokenIdMinter,
                    1000,
                    100000000, { from: buyer, value: 1000 }
                ), "not the owner of contract being offered");
        });

        it('offered token is not approved ', () => {
            return expectRevert(
                market.makeOffer(
                    MinterListTokenIndex,
                    token.address,
                    tokenIdBuyer,
                    1000,
                    100000000,
                    { from: buyer, value: 1000 }
                ), "This contract needs to be approved before getting listed");
        });

        it('offered token reverted bc index out of range', () => {
            return expectRevert(
                market.makeOffer(
                    10000,
                    token.address,
                    tokenIdBuyer,
                    1000,
                    100000000,
                    { from: buyer, value: 1000 }
                ), "requested index isn't within range");
        });

        //TESTING OFFER WITH FUNDS REVERTING 
        it('not enough fees for MAKEING OFFER WITH FUNDS', () => {
            return expectRevert(
                market.makeOfferWithFunds(
                    MinterListTokenIndex,
                    1000,
                    100000000, { from: buyer, value: 500 }
                ), 'insufficient funds');
        });
        it('offered token is not approved ', () => {
            return expectRevert(
                market.makeOffer(
                    MinterListTokenIndex,
                    token.address,
                    tokenIdBuyer,
                    1000,
                    100000000,
                    { from: buyer, value: 1000 }
                ), "This contract needs to be approved before getting listed");
        });

        it('offered token reverted bc index out of range', () => {
            return expectRevert(
                market.makeOfferWithFunds(
                    10000,
                    1000,
                    100000000,
                    { from: buyer, value: 1000 }
                ), "requested index isn't within range");
        });
        //offer going through
        ///////////////////////////////////////////
        it('offer goes through for trading nfts', async () => {

            await token.approve(market.address, tokenIdBuyer, {
                from: buyer
            });

            const tx = await market.makeOffer(
                MinterListTokenIndex,
                token.address,
                tokenIdBuyer,
                1000,
                100000000,
                { from: buyer, value: 1000 }
            );


            return expectEvent(tx, 'OfferMade'
                , {
                    requestedContractAddr: token.address,
                    requestedTokenId: tokenIdMinter,
                    offeredContractAddr: token.address,
                    offeredTokenId: tokenIdBuyer,
                    exchangeValue: new BN(0),
                    isCashOffer: false
                }
            );
        });

        it('offer goes through for with money offer', async () => {

            const tx = await market.makeOfferWithFunds(
                BuyerListTokenIndex,
                1000,
                100000000,
                { from: buyer, value: 1020 }
            );


            return expectEvent(tx, 'OfferMade'
                , {
                    requestedContractAddr: token.address,
                    requestedTokenId: tokenIdBuyer,
                    offeredTokenId: new BN(0),
                    exchangeValue: new BN(1000),
                    isCashOffer: true
                }
            );
        });
    });
    /**Take Offer testing
     * ////////////////////////////////////////////////////////////////////
     */
    describe('Take Offer', () => {
        it('take token reverted bc the caller is not the owner ', () => {
            return expectRevert(
                market.takeOffer(
                    offerIndex,
                    1000,
                    chances,
                    { from: buyer, value: 1000 }
                ), "you must be the owner of this nft");
        });

        it('take token reverted bc index not in range', () => {
            return expectRevert(
                market.takeOffer(
                    1000,
                    1000,
                    chances,
                    { from: minter, value: 1000 }
                ), "offer index isn't within range");
        });
        it('take token reverted bc insufficient funds', () => {
            return expectRevert(
                market.takeOffer(
                    offerIndex,
                    1000,
                    chances,
                    { from: minter, value: 500 }
                ), "insufficient funds to play");
        });

        //EVENTS GO THROUGH
        it('take offer goes through for trading nfts', async () => {

            const tx = await market.takeOffer(
                offerIndex,
                1000,
                chances,
                { from: minter, value: 1000 }
            );
            return expectEvent(tx, 'OfferTaken'
                , {
                    requestedContractAddr: token.address,
                    requestedTokenId: tokenIdMinter,
                    offeredContractAddr: token.address,
                    offeredTokenId: tokenIdBuyer,
                    exchangeValue: new BN(0),
                    winningAddress: minter,
                    isCashOffer: false
                }
            );
        });

    });
});