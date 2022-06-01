import React from 'react'
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
import ActiveGame from '../Components/ActiveGame.js'
import RecentGame from '../Components/RecentGame';

function CoinFlip(props) {
  const [coinFlipModal, setCoinFlipModal] = React.useState(false);
  const [pickNFTModal, setPickNFTModal] = React.useState(false);
  const [feeModal, setFeeModal] = React.useState(false);

  return (
    <>
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
    </>
  )
}

export default CoinFlip