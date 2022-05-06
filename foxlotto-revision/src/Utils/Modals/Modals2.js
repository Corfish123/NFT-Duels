import React from 'react'
import { Modal } from 'react-bootstrap'
import '../../Styles/css/style.css'
import searchIcon from '../../Images/SearchIcon.svg'
import mCardimg1 from '../../Images/m-card-img1.png'
import mCardimg2 from '../../Images/m-card-img2.png'

function Modals2(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className='modal-contents py-2'>
                <h4 className='modaltitle my-4 m-0'>NFTs</h4>
                <div className='modal-container'>
                    <div className='position-relative'>
                        <input type="text" className='m-input-field' placeholder='Search NFTs, Users...' />
                        <img src={searchIcon} className="m-searchIcon" alt="" />
                    </div>
                     
                     <h4 className='mt-5 text-white'>Popular NFTs</h4>
                    {/* modal card */}
                    <div className='modal-card my-4'>
                        <div className='m-card'>
                            <img src={mCardimg1} className="w-100" alt="" />
                            <div className='p-3'>
                                <p className='mcard-cap'>@fl3xf0x</p>
                                <p className='mcard-title'>Cuppalatte03</p>
                            </div>
                            <div className='mCard-footer p-3'>
                                <div>
                                    <p className='mCard-footerLeft_text'>WISHLIST</p>
                                </div>
                                <div>
                                    <p className='mCard-price'>1526.52 <sub style={{fontSize:"10px"}}>ETH</sub></p>
                                </div>
                            </div>
                        </div>
                        <div className='m-card'>
                            <img src={mCardimg2} className="w-100" alt="" />
                            <div className='p-3'>
                                <p className='mcard-cap'>@fl3xf0x</p>
                                <p className='mcard-title'>Panalocola</p>
                            </div>
                            <div className='mCard-footer p-3'>
                                <div>
                                    <p className='mCard-footerLeft_text'>WISHLIST</p>
                                </div>
                                <div>
                                    <p className='mCard-price'>1316.71 <sub style={{fontSize:"10px"}}>ETH</sub></p>
                                </div>
                            </div>
                        </div>
                        <div className='m-card'>
                            <img src={mCardimg1} className="w-100" alt="" />
                            <div className='p-3'>
                                <p className='mcard-cap'>@fl3xf0x</p>
                                <p className='mcard-title'>Cuppalatte03</p>
                            </div>
                            <div className='mCard-footer p-3'>
                                <div>
                                    <p className='mCard-footerLeft_text'>WISHLIST</p>
                                </div>
                                <div>
                                    <p className='mCard-price'>1526.52 <sub style={{fontSize:"10px"}}>ETH</sub></p>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* modal card */}
                </div>
            </div>
        </Modal>
    )
}

export default Modals2