import React from 'react'
import logo from '../Images/random/LOGO.svg'
import { SocialIcon } from 'react-social-icons'
import { Link } from 'react-router-dom';

function LeftSidebar() {
    return (
        <div className='leftSidebar'>
            <div className='site-logo-area'>
                <Link to='/'><img src={logo} className="site-logo" alt="" /></Link>
            </div>
            <Link to='/' className='no-underline'>
                <div className='left-sidebar-list mt-4'>
                    <span className='list1'>Coin Flip</span>
                    <span className='list1Number'>10</span>
                </div>
            </Link>
            <div className='social-icon-div'>
                <a href="/" target="_blank"><SocialIcon network="discord" bgColor="#bfd1ff" /></a>
                <a href="/" target="_blank"><SocialIcon network="twitter" bgColor="#bfd1ff" /></a>
                <a href="/" target="_blank"><SocialIcon network="tiktok" bgColor="#bfd1ff" /></a>
            </div>
        </div>
    )
}

export default LeftSidebar