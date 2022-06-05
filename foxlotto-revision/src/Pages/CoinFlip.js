import React from 'react'
import LeftSidebar from '../Components/LeftSidebar.js'
import RightSidebar from '../Components/RightSidebar.js'
import '../Styles/font/HarabaraMaisDemo.otf'
import icon1 from '../Images/icons/timer.svg'
import icon2 from '../Images/icons/poll.svg'
import icon3 from '../Images/icons/bi_question-lg.svg'
import icon4 from '../Images/icons/fa-solid_percentage.svg'
import icon5 from '../Images/icons/check.svg'
import hexagonal from '../Images/random/hexgonal.svg'
import arrow from '../Images/random/arrow.svg'
import placebetbg from '../Images/random/placebet.png'
import privateGame from '../Images/random/privateGame.svg'
import crownIcon from '../Images/random/crownicon.svg'
import boldcrown from '../Images/random/bold-king.svg'
import snow from '../Images/random/snowflake.svg'
import whiteSign from '../Images/random/what-Sign.svg'
import hs3img from '../Images/random/unsplash_ZnHRNtwXg6Q.png'
import CoinFlipModal from '../Components/CoinFlipModal'
import PickNFTModal from '../Components/PickNFTModal'
import FeeModal from '../Components/feeModal.js'
import { ethers } from 'ethers'
import { useState } from 'react';
import { Link } from 'react-router-dom';

import '../Styles/font/HarabaraMaisDemo.otf'
import '../Styles/css/style.css'
import '../Styles/css/responsive.css'
import Icon1 from '../Images/icons/Dollar.svg'
import Icon2 from '../Images/icons/giftIcon.svg'
import Icon3 from '../Images/icons/people-group.svg'
import Icon4 from '../Images/icons/check.svg'
import Icon5 from '../Images/icons/support.svg'
import ActiveGame from '../Components/ActiveGame.js'
import RecentGame from '../Components/RecentGame';

import NFTDuelabi from "../contractABI/NFTDuelsABI.json";

function CoinFlip() {
  const [coinFlipModal, setCoinFlipModal] = React.useState(false);
  const [pickNFTModal, setPickNFTModal] = React.useState(false);
  const [feeModal, setFeeModal] = React.useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  //Rinkeby test net
  const NFTDuelAddress = "0xDd6994c7CC7459AdA439ab9fEA425Aa15D7B4891";

  //requesting to connect a meta mask account
  async function requestAccount() {
    console.log('Requesting account...');

    // ❌ Check if Meta Mask Extension exists 
    if (window.ethereum) {
      console.log('detected');

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      alert('Meta Mask not detected');
    }
  }

  // Create a provider to interact with a smart contract
  async function connectWallet() {
    console.log()
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      renderTokensForOwner(walletAddress)

      
    }
  }

  async function escrowTokens(_contractAddr ,_tokenId ){
        //connect NFT Duel contract
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const NFTDuel = new ethers.Contract(NFTDuelAddress, NFTDuelabi, signer);
        await NFTDuel.escrowToken(_contractAddr, _tokenId)
  }

  async function withdrawToken(_listedTokenIndex ){
    //connect NFT Duel contract
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const NFTDuel = new ethers.Contract(NFTDuelAddress, NFTDuelabi, signer);
    await NFTDuel.withdrawToken(_listedTokenIndex)
}
async function makeOffer(_requestedIndex,
  _contractAddrOffered,
   _tokenIdOffered,
   fee,
   _expiresIn ){
  //connect NFT Duel contract
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();
  const NFTDuel = new ethers.Contract(NFTDuelAddress, NFTDuelabi, signer);

  //get time stamp
  var blockNumber = await provider.getBlockNumber();
  const block = await provider.getBlock(blockNumber);

  await NFTDuel.makeOffer(_requestedIndex,
    _contractAddrOffered,
     _tokenIdOffered,
     fee,
     block.timestamp + _expiresIn)
}

async function makeOfferWithFunds(_requestedIndex,
   funds,
   _expiresIn ){
  //connect NFT Duel contract
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();
  const NFTDuel = new ethers.Contract(NFTDuelAddress, NFTDuelabi, signer);

  //get time stamp
  var blockNumber = await provider.getBlockNumber();
  const block = await provider.getBlock(blockNumber);

  await NFTDuel.makeOffer(_requestedIndex,
     funds,
     block.timestamp + _expiresIn)
}

async function takeOffer(_offerId,
  fee,
  chances ){
 //connect NFT Duel contract
 const provider = new ethers.providers.Web3Provider(window.ethereum);
 const signer = await provider.getSigner();
 const NFTDuel = new ethers.Contract(NFTDuelAddress, NFTDuelabi, signer);
 await NFTDuel.takeOffer(_offerId,
    fee,
    chances)
}

async function cancelOffer(_offerId){
 //connect NFT Duel contract
 const provider = new ethers.providers.Web3Provider(window.ethereum);
 const signer = await provider.getSigner();
 const NFTDuel = new ethers.Contract(NFTDuelAddress, NFTDuelabi, signer);
 await NFTDuel.cancelOffer(_offerId)
}


  //get NFTs from owner's wallet
  async function renderTokensForOwner(ownerAddress) {
    fetch(
      `https://api.opensea.io/api/v1/assets?owner=${ownerAddress}&order_direction=desc&offset=0&limit=50`,
      { method: "GET", headers: { Accept: "application/json" } }
    ).then(response => response.json()).then(({ assets }) => {
      assets.forEach((nft) => {
        document.getElementById("container").append(createTokenElement(nft))
      })
    })
  }

  const createTokenElement = ({ name, collection, description, permalink, image_preview_url, token_id }) => {
    const newElement = document.getElementById("nft_template").content.cloneNode(true)

    newElement.querySelector("section").id = `${collection.slug}_${token_id}`
    newElement.querySelector("h1").innerText = name
    newElement.querySelector("a").href = permalink
    newElement.querySelector("img").src = image_preview_url
    newElement.querySelector("img").alt = description

    return newElement
  }


  return (
    <>
      {/* Header */}
      <div className='header-main'>
        <div className='header-main-child-1' />
        <div className='header-main-child-2'>
          <ul>
            <li>
              <Link to='/affiliate'>
                <img src={Icon3} alt="" />AFFLIATE
              </Link>
            </li>
            <li>
              <Link to='/provably-fair'>
                <img src={Icon4} alt="" />PROVABLY FAIR
              </Link>
            </li>
            <li>
              <Link to='/support'>
                <img src={Icon5} alt="" />SUPPORT
              </Link>
            </li>
          </ul>
          <button onClick={connectWallet}
            className="connect-wallet-button">{walletAddress === '' ? "CONNECT WALLET" : walletAddress}</button>
        </div>
      </div>
      <div className='site-main'>
        <div className="sm-child1">
          <LeftSidebar />
        </div>
        <div className="sm-child2">
          <div className="site-middle-container">
            {/* section-1 */}
            <div className="h-section-1">
              <p className="hs1-first">Coin Flip</p>
              <div>
                <Link to='/coinflip/history'>
                  <img src={icon1} alt="" />HISTORY
                </Link>
              </div>
              <div>
                <Link to='/coinflip/top'>
                  <img src={icon2} alt="" />TOP
                </Link>
              </div>
              <div>
                <Link to='/coinflip/how-to-play'>
                  <img src={icon3} alt="" />HOW TO PLAY
                </Link>
              </div>
              {/* make 2% fee modal */}
              <div>
                <div className="h-section-1-modal-text" onClick={() => setFeeModal(true)}>
                  <img src={icon4} alt="" />2% FEE
                </div>
                <FeeModal
                  show={feeModal}
                  onHide={() => setFeeModal(false)}
                />
              </div>
            </div>
            <div className="h-section-2">
              <div className="hs2-child1">
                <div className='hs2-child1-inner'>
                  <div className="text-center">
                    <img src={hexagonal} className="hexagonal" alt="" />
                  </div>
                  <div>
                    <p className="m-0 text-white"> CHOOSE </p>
                    <p className="m-0 text-white"> A SIDE </p>
                  </div>
                </div>
              </div>
              <div className="hs2-child2">
                <div className='d-flex'>
                  <div className='icon-div me-2'>
                    <img src={boldcrown} alt="" />
                  </div>
                  <div className='icon-div2'>
                    <img src={snow} alt="" />
                  </div>
                </div>
              </div>
              <div className="hs2-child3">
                <div>
                  <div className='picknft' onClick={() => setPickNFTModal(true)} style={{ cursor: "pointer" }}>
                    <p className='m-0'>PICK NFT</p>
                    <div className='picknft-right'>
                      <img src={arrow} alt="" />
                    </div>
                  </div>
                  <PickNFTModal
                    show={pickNFTModal}
                    onHide={() => setPickNFTModal(false)}
                  />
                </div>
                <div className='hs2-second'>
                  <div className='position-relative' style={{ cursor: 'pointer' }} >
                    <img src={placebetbg} className='hs3-placebetbg' alt="" onClick={() => setCoinFlipModal(true)} />
                    <p className='placebet-para' onClick={() => setCoinFlipModal(true)} >PLACE BET</p>
                    <CoinFlipModal
                      show={coinFlipModal}
                      onHide={() => setCoinFlipModal(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <h1 className='commonh1 mt-5 mb-4'>Active Games <span className='h-s3-subtitle'>2 Games Online</span></h1>
            <ActiveGame
              side="red"
              user="fros231jkfa"
            //price=
            //nft=
            />
            <ActiveGame
              side="blue"
              user="fros231jkfa"
            //price=
            //nft=
            />
            <h1 className='commonh1 mt-5 mb-4'>Recent Games</h1>
            <RecentGame
              side="red"
              user="fros231jkfa"
            //price=
            //nft=
            />
            <RecentGame
              side="blue"
              user="fros231jkfa"
            //price=
            //nft=
            />
            <div className="footer-links">
              <Link to='/terms-and-conditions'>Terms and Conditions</Link>
              <Link to='/privacy-policy'>Privacy Policy</Link>
              <Link to='/cookie-policy'>Cookie Policy</Link>
              <Link to='/aml-policy'>AML Policy</Link>
              <Link to='/responsible-gambling'>Responsible Gambling</Link>
            </div>
          </div>
        </div>
        <div className="sm-child3">
          <RightSidebar />
        </div>
      </div>
    </>
  )
}

export default CoinFlip