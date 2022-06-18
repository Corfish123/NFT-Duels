import React from 'react'
import '../Styles/css/style.css'
import mCardimg1 from '../Images/random/m-card-img1.png'
import whiteSign from '../Images/random/what-Sign.svg'
import { FileSearchOutlined } from '@ant-design/icons'
import opensealogo from '../Images/random/opensealogo.svg'

function BasicNFTCard(props) {
  return (
    <div className='m-card' onClick={props.onClick}>
      {props.image !== undefined ? <img className='mcard-img' src={props.image} alt="" /> : <img className='mcard-img white-sign-large' src={whiteSign} alt="" />}
      <div className='p-3'>
        <p className='mcard-title'>{props.name}</p>
      </div>
      <div className='mCard-footer'>
        <FileSearchOutlined
          onClick={() =>
            window.open(
              props.explorerUrl,
              "_blank",
            )
          }
        />
        <img className="opensea-logo" src={opensealogo} alt=""
          onClick={() =>
            window.open(
              props.openSeaUrl,
              "_blank",
            )
          }
        />
      </div>
    </div>
  )
}

export default BasicNFTCard