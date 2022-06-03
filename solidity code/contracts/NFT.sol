// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
	constructor() ERC721("Coolest NFT", "NFT") {}


	function mint(uint256 _tokenId) external returns (uint) {
		_mint(msg.sender, _tokenId);
		return _tokenId;
	}
}