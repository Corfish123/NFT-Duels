import React from 'react'
import logo from '../Images/random/LOGO.svg'
import { SocialIcon } from 'react-social-icons'

function LeftSidebar() {
    return (
        <div className='leftSidebar'>
            <div className='site-logo-area'>
                <img src={logo} className="site-logo" alt="" />
            </div>
            <div className='left-sidebar-list mt-4'>
                <span className='list1'>Coin Flip</span>
                <span className='list1Number'>10</span>
            </div>
            <div className='social-icon-div'>
                <a href="/" target="_blank"><SocialIcon network="discord" bgColor="#bfd1ff" /></a>
                <a href="/" target="_blank"><SocialIcon network="twitter" bgColor="#bfd1ff" /></a>
                <a href="/" target="_blank"><SocialIcon network="tiktok" bgColor="#bfd1ff" /></a>
            </div>
        </div>
    )
}

export default LeftSidebar