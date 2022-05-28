import React from 'react'
import '../Styles/font/HarabaraMaisDemo.otf'
import '../Styles/css/style.css'
import '../Styles/css/responsive.css'
import Icon1 from '../Images/icons/Dollar.svg'
import Icon2 from '../Images/icons/giftIcon.svg'
import Icon3 from '../Images/icons/people-group.svg'
import Icon4 from '../Images/icons/check.svg'
import Icon5 from '../Images/icons/support.svg'

function Header() {
  return (
    <div className='header-main'>
      <div className='header-main-child-1'>

      </div>
      <div className='header-main-child-2'>
        <div>
          <ul>
            <li><img src={Icon1} alt="" /><a href="/">FUNDS</a></li>
            <li><img src={Icon2} alt="" /><a href="/">CASHBACK</a></li>
            <li><img src={Icon3} alt="" /><a href="/">AFFLIATE</a></li>
            <li><img src={Icon4} alt="" /><a href="/">PROVABLY FAIR</a></li>
            <li><img src={Icon5} alt="" /><a href="/">SUPPORT</a></li>
          </ul>
        </div>
        <div>
          {/* <button onClick={connectWallet}
                className="connect wallet button">{walletAddress === '' ? "CONNECT WALLET" : walletAddress}</button> */}
        </div>
      </div>
    </div>
  )
}

export default Header