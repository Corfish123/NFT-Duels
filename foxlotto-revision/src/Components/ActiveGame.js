import React from 'react'
import '../Styles/css/style.css'
import boldcrown from '../Images/random/bold-king.svg'
import snow from '../Images/random/snowflake.svg'
import whiteSign from '../Images/random/what-Sign.svg'
import placebetbg from '../Images/random/placebet.png'

function ActiveGame(props) {
  return (
    <div>
      {props.side === "red" ? <div className='active-games-div mt-2'>
        <div className='icon-div crownIcon'>
          <img src={boldcrown} alt="" />
        </div>
        <div className='join-game-button d-inline'>
          <img src={placebetbg} className="hs3-placebetbg" alt="" />
          <p className='placebet-para hs3-text'>JOIN 56.42 <sub>ETH</sub></p>
        </div>
        <div className='agd-child-blue'>
          <div className='white-sign' >
            <img src={whiteSign} alt="" />
          </div>
          <span className='agd-username'>{props.user}</span>
          <div className='icon-div2'>
            <img src={snow} alt="" />
          </div>
        </div>
      </div> : <div className='active-games-div mt-2'>
        <div className='agd-child-red'>
          <div className='icon-div'>
            <img src={boldcrown} alt="" />
          </div>
          <span className='agd-username'>{props.user}</span>
          <div className='white-sign' >
            <img src={whiteSign} alt="" />
          </div>
        </div>
        <div className='join-game-button d-inline'>
          <img src={placebetbg} className="hs3-placebetbg" alt="" />
          <p className='placebet-para hs3-text'>JOIN 56.42 <sub>ETH</sub></p>
        </div>
        <div className='icon-div2 crownIcon agd-left-auto'>
          <img src={snow} alt="" />
        </div>
      </div>}
    </div>
  )
}

export default ActiveGame