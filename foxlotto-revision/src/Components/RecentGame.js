import React from 'react'
import '../Styles/css/style.css'
import boldcrown from '../Images/random/bold-king.svg'
import snow from '../Images/random/snowflake.svg'
import whiteSign from '../Images/random/what-Sign.svg'

function RecentGame(props) {
  return (
    <div>
      {props.side === "red" ? <div className='active-games-div2 active-games-div2-bg1 mt-2'>
        <div className='agd2-child-1'>
          <div className='icon-div'>
            <img src={boldcrown} alt="" />
          </div>
        </div>
        <div className='agd2-child-2'>
          <div className='ms-3'>
            <p className='agd2-p2'>FRI 12 Feb, 2022</p>
          </div>
          <div>
            <div className='d-inline'>
              <div className='white-sign me-3'>
                <img src={whiteSign} alt="" />
              </div>
              <div className='white-sign me-3'>
                <img src={whiteSign} alt="" />
              </div>
            </div>
          </div>
          <div>
            <span className='hs3-username'>{props.user}</span>
          </div>
          <div>
            <p className='r-price-number'>3124.81 <sub>ETH</sub> </p>
          </div>
        </div>
      </div> : <div className='active-games-div2 active-games-div2-bg2 mt-2'>
        <div className='agd2-child-1'>
          <div className='icon-div2'>
            <img src={snow} alt="" />
          </div>
        </div>
        <div className='agd2-child-2'>
          <div className='ms-3'>
            <p className='agd2-p2'>FRI 12 Feb, 2022</p>
          </div>
          <div>
            <div className='d-inline'>
              <div className='white-sign me-3'>
                <img src={whiteSign} alt="" />
              </div>
              <div className='white-sign me-3'>
                <img src={whiteSign} alt="" />
              </div>
            </div>
          </div>
          <div>
            <span className='hs3-username'>{props.user}</span>
          </div>
          <div>
            <p className='r-price-number'>3124.81 <sub>ETH</sub> </p>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default RecentGame