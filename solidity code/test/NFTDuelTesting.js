import { isTypedArray } from "util/types";
const { expectRevert, expectEvent, BN } = require('@openzeppelin/test-helpers');
const NFTDuels = artifacts.require('NFTDuels');
const NFT = artifacts.require('NFT');

contract( 'Market' , () => {
    let market;
    let token;

    const tokenId = 1;

    before( () => {
        market = await NFTDuels.deployed();
        token = await NFT.deployed();

        await token.mint();
    })

    describe( 'Escrow Token', () =>{
        it('should prevent escrowing token' , () =>{
            expectRevert(market.escrowToken(
                token.address,
                tokenId
            ), 'ERC721: transfer caller is not owner nor approved');
        })
    })
});