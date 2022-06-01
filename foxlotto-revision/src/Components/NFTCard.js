import React from 'react'
import '../Styles/css/style.css'
import mCardimg1 from '../Images/random/m-card-img1.png'

function NFTCard(props) {
  return (
    <div className='m-card'>
      <img className='mcard-img' src={props.image} alt="" />
      <div className='p-3'>
        <p className='mcard-title'>{props.name}</p>
      </div>
      <p className='mCard-price'>{props.price}<sub style={{ fontSize: "10px" }}>ETH</sub></p>
    </div>
  )
}

export default NFTCard