import React from 'react'
import '../Styles/css/style.css'
import mCardimg1 from '../Images/random/m-card-img1.png'
import whiteSign from '../Images/random/what-Sign.svg'
import { FileSearchOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'
import opensealogo from '../Images/random/opensealogo.svg'

function AdvancedNFTCard(props) {
  return (
    <div className='m-card'>
      <div className={props.approved ? '' : 'grayed-out'} onClick={props.approved ? props.onClick : null}>
        {props.image !== undefined ? <img className={props.approved ? 'mcard-img hover-img' : 'mcard-img'} src={props.image} alt="" /> : <img className={props.approved ? 'mcard-img hover-img white-sign-large' : 'mcard-img white-sign-large'} src={whiteSign} alt="" />}
      </div>
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
        {props.approved ?
          <CloseCircleOutlined
            onClick={() => props.onApprove(props.actualIndex, false)}
          /> : (
            <CheckCircleOutlined
              onClick={() => props.onApprove(props.actualIndex, true)}
            />
          )
        }
      </div>
    </div>
  )
}

export default AdvancedNFTCard