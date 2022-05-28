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
import Modals1 from '../Utils/Modals/Modals1'
import Modals2 from '../Utils/Modals/Modals2'
import { ethers } from 'ethers'
import { useState } from 'react';

import '../Styles/font/HarabaraMaisDemo.otf'
import '../Styles/css/style.css'
import '../Styles/css/responsive.css'
import Icon1 from '../Images/icons/Dollar.svg'
import Icon2 from '../Images/icons/giftIcon.svg'
import Icon3 from '../Images/icons/people-group.svg'
import Icon4 from '../Images/icons/check.svg'
import Icon5 from '../Images/icons/support.svg'

function Home() {
  const [modalShow, setModalShow] = React.useState(false);
  const [pickNFTModal, setPickNFTModal] = React.useState(false);
  const [walletAddress, setWalletAddress] = useState('');

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
            <li><img src={Icon1} alt="" /><a href="/">FUNDS</a></li>
            <li><img src={Icon2} alt="" /><a href="/">CASHBACK</a></li>
            <li><img src={Icon3} alt="" /><a href="/">AFFLIATE</a></li>
            <li><img src={Icon4} alt="" /><a href="/">PROVABLY FAIR</a></li>
            <li><img src={Icon5} alt="" /><a href="/">SUPPORT</a></li>
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
              <div>
                <p className="hs1-first">Coin Flip</p>
              </div>
              <div>
                <img src={icon1} alt="" /><a href="/" className="hs-history">HISTORY</a>
              </div>
              <div>
                <img src={icon2} alt="" /><a href="/" className="hs-history">TOP</a>
              </div>
              <div>
                <img src={icon3} alt="" /><a href="/" className="hs-history">HOW TO PLAY</a>
              </div>
              <div>
                <img src={icon4} alt="" /><a href="/" className="hs-history">2% FEE</a>
              </div>
              <div>
                <img src={icon5} alt="" /><a href="/" className="hs-history">FAIRNESS</a>
              </div>
            </div>
            {/* section-1 */}
            {/* section-2 */}
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
                  <Modals2
                    show={pickNFTModal}
                    onHide={() => setPickNFTModal(false)}
                  />
                </div>
                <div className='hs2-second'>
                  <div className='position-relative' style={{ cursor: 'pointer' }} >
                    <img src={placebetbg} className='hs3-placebetbg' alt="" onClick={() => setModalShow(true)} />
                    <p className='placebet-para' onClick={() => setModalShow(true)} >PLACE BET</p>
                    <Modals1
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <h1 className='commonh1 mt-5 mb-4'>Active Games <span className='h-s3-subtitle'>2 Games Online</span></h1>
            {/* Active game 1 */}
            <div className='active-games-div mt-2'>
              <div className='icon-div crownIcon'>
                <img src={crownIcon} alt="" />
              </div>
              <div className='join-game-button d-inline'>
                <img src={placebetbg} className="hs3-placebetbg" alt="" />
                <p className='placebet-para hs3-text'>JOIN 56.42 <sub>ETH</sub></p>
              </div>
              <div className='agd-child-2'>
                <div className='white-sign' >
                  <img src={whiteSign} alt="" />
                </div>
                <span className='agd-username'>fros231jkfa</span>
                <div className='icon-div2'>
                  <img src={snow} alt="" />
                </div>
              </div>
            </div>
            {/* Active game 2 */}
            <div className='active-games-div mt-2'>
              <div className='agd-child-2'>
                <div className='icon-div'>
                  <img src={crownIcon} alt="" />
                </div>
                <span className='agd-username'>fros231jkfa</span>
                <div className='white-sign' >
                  <img src={whiteSign} alt="" />
                </div>
              </div>
              <div className='join-game-button d-inline'>
                <img src={placebetbg} className="hs3-placebetbg" alt="" />
                <p className='placebet-para hs3-text'>JOIN 56.42 <sub>ETH</sub></p>
              </div>
              <div className='icon-div2 crownIcon'>
                <img src={snow} alt="" />
              </div>
            </div>
            {/* Recent games HAVENT TOUCHED */}
            <h1 className='commonh1 mt-5 mb-4'>Recent Games</h1>
            <div className='active-games-div2 active-games-div2-bg1'>
              <div className='agd2-child-1'>
                <div className='icon-div'>
                  <img src={boldcrown} alt="" />
                </div>
              </div>
              <div className='agd2-child-2'>
                <div className='ms-3'>
                  <p className='agd2-p1'>D1SFUN2I0N</p>
                  <p className='agd2-p2'>FRI 12 Feb, 2022</p>
                </div>
                <div>
                  <div className='d-inline'>
                    <div className='white-sign me-3'>
                      <img src={whiteSign} alt="" />
                    </div>
                  </div>
                </div>
                <div>
                  <span className='hs3-username'>fros231jkfa</span>
                </div>
                <div>
                  <img src={hs3img} className="active-user-profile" alt="" />
                </div>
                <div>
                  <p className='r-price-number'>3124.81 <sub>ETH</sub> </p>
                </div>
              </div>
            </div>
            <div className='active-games-div2 active-games-div2-bg2 mt-2'>
              <div className='agd2-child-1'>
                <div className='icon-div2'>
                  <img src={snow} alt="" />
                </div>
              </div>
              <div className='agd2-child-2'>
                <div className='ms-3'>
                  <p className='agd2-p1'>D1SFUN2I0N</p>
                  <p className='agd2-p2'>FRI 12 Feb, 2022</p>
                </div>
                <div>
                  <div className='d-inline'>
                    <div className='white-sign me-3'>
                      <img src={whiteSign} alt="" />
                    </div>
                  </div>
                </div>
                <div>
                  <span className='hs3-username'>fros231jkfa</span>
                </div>
                <div>
                  <img src={hs3img} className="active-user-profile" alt="" />
                </div>
                <div>
                  <p className='r-price-number'>3124.81 <sub>ETH</sub> </p>
                </div>
              </div>
            </div>
            {/* section-4 */}
            <div className='p-5'></div>
          </div>
        </div>
        <div className="sm-child3">
          <RightSidebar />
        </div>
      </div>
    </>
  )
}

export default Home