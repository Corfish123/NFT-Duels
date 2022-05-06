import React from 'react'
import { Modal } from 'react-bootstrap'
import '../../Styles/css/style.css'
import closeBtn from '../../Images/closeBtn.png'
import modalimg1 from '../../Images/modalImg1.png'
import modalimg2 from '../../Images/modalImg2.png'
import flippingCircle from '../../Images/flippingCIrcle.svg'
import bigCrown from '../../Images/bigCrown.svg'
import bigSnow from '../../Images/BigSnow.svg'
import ms2Img1 from '../../Images/m-s2-img1.png'
import ms2Img2 from '../../Images/m-s2-img2.png'

function Modals1(props) {
    console.log(props)
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className='modal-contents py-2'>
                <h4 className='modaltitle my-4 m-0'>DUEL</h4>
                <p className='text-center text-white'>Flipping in</p>
                <div className='modal-container'>
                    <div className='modal-grid'>
                        <div className='position-relative'>
                            <img src={modalimg1} className="w-100 rounded-3" alt="" />
                            <div className='m-icon-div1'>
                                <img src={bigCrown} alt="" />
                            </div>
                        </div>
                        <div>
                            <img src={flippingCircle} className="w-100" alt="" />
                        </div>
                        <div className='position-relative'>
                            <img src={modalimg2} className="w-100 rounded-3" alt="" />
                            <div className='m-icon-div2'>
                                <img src={bigSnow} alt="" />
                            </div>
                        </div>
                    </div>
                    {/* section-2 */}

                    <div className='mt-5 m-section-2-main'>
                        <div className='m-section-2'>
                            <div>
                                <img src={ms2Img1} className="w-100 ms2Img1" alt="" />
                            </div>
                            <div>
                                <p className='m-0 m-s2-title'>Bloodfist</p>
                                <p className='m-0 m-s2-desc'>GuresomeCol#42</p>
                            </div>
                        </div>
                        <div className='m-section-2'>
                            <div>
                                <img src={ms2Img2} className="w-100 ms2Img1" alt="" />
                            </div>
                            <div>
                                <p className='m-0 m-s2-title'>Bloodfist</p>
                                <p className='m-0 m-s2-desc'>GuresomeCol#42</p>
                            </div>
                        </div>
                    </div>
                    {/* section-2 */}
                    <div className='text-center mt-4'>
                        <img src={closeBtn} alt="" onClick={props.onHide} style={{cursor:"pointer"}} />
                    </div>
                    {/* modal footer */}
                    <div className='m-footer mt-5'>
                        <small>You can not cancel when timer is less than 5s.</small>
                    </div>
                    {/* modal footer */}
                </div>

            </div>
        </Modal>
    )
}

export default Modals1