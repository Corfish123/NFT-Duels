import React from 'react'
import logo from '../Images/random/LOGO.svg'
import discord from '../Images/socialIcons/discord.svg'
import twitter from '../Images/socialIcons/twitter.svg'
import insta from '../Images/socialIcons/instagram.svg'

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
                <ul>
                    <li><a href="/" target="_blank"><img src={discord} alt="" /></a></li>
                    <li><a href="/" target="_blank"><img src={twitter} alt="" /></a></li>
                    <li><a href="/" target="_blank"><img src={insta} alt="" /></a></li>
                </ul>
            </div>
        </div>
    )
}

export default LeftSidebar