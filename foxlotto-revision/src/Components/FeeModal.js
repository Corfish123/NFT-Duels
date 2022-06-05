import React from 'react'
import { Modal } from 'react-bootstrap'
import '../Styles/css/style.css'
import closeBtn from '../Images/random/closeBtn.png'
import modalimg1 from '../Images/random/modalImg1.png'
import modalimg2 from '../Images/random/modalImg2.png'
import flippingCircle from '../Images/random/flippingCIrcle.svg'
import bigCrown from '../Images/random/bigCrown.svg'
import bigSnow from '../Images/random/BigSnow.svg'
import ms2Img1 from '../Images/random/m-s2-img1.png'
import ms2Img2 from '../Images/random/m-s2-img2.png'

function FeeModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className='modal-contents py-2 px-4'>
                <h4 className='modaltitle my-4 m-0'>2% FEE</h4>
                <h1 className='feeModalText text-white'>We charge 2% commission from the sum of all bets in Coin Flip regardless of the game outcome. This is due to fees for keeping the website operating.</h1>
            </div>
        </Modal>
    )
}

export default FeeModal
