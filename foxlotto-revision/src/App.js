import './App.css';
import './Styles/font/HarabaraMaisDemo.otf'
import './Styles/css/style.css'
import './Styles/css/responsive.css'
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import Icon1 from './Images/icons/Dollar.svg'
import Icon2 from './Images/icons/giftIcon.svg'
import Icon3 from './Images/icons/people-group.svg'
import Icon4 from './Images/icons/check.svg'
import Icon5 from './Images/icons/support.svg'
import LeftSidebar from './Components/LeftSidebar.js'
import RightSidebar from './Components/RightSidebar.js'
import { ethers } from 'ethers'
import React, { useState, useEffect } from 'react';
import { useMoralis } from "react-moralis";
import Moralis from 'moralis'

import CoinFlip from './Pages/CoinFlip';
import Affiliate from './Pages/Affiliate';
import CoinFlipHistory from './Pages/CoinFlipHistory';
import CoinFlipTop from './Pages/CoinFlipTop';
import HowToPlayCoinFlip from './Pages/HowToPlayCoinFlip';
import ProvablyFair from './Pages/ProvablyFair';
import Support from './Pages/Support';
import TermsAndConditions from './Pages/TermsAndConditions';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import CookiePolicy from './Pages/CookiePolicy';
import AMLPolicy from './Pages/AMLPolicy';
import ResponsibleGambling from './Pages/ResponsibleGambling';

function App() {
  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) {
      // add your logic here
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const login = async () => {
    if (!isAuthenticated) {

      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const logOut = async () => {
    await logout();
    console.log("logged out");
  }

  return (
    <>
      <Router>
        {/* Header */}
        <div className='header-main'>
          <div className='header-main-child-1' />
          <div className='header-main-child-2'>
            <ul>
              <li>
                <Link to='/affiliate'>
                  <img src={Icon3} alt="" />AFFLIATE
                </Link>
              </li>
              <li>
                <Link to='/provably-fair'>
                  <img src={Icon4} alt="" />PROVABLY FAIR
                </Link>
              </li>
              <li>
                <Link to='/support'>
                  <img src={Icon5} alt="" />SUPPORT
                </Link>
              </li>
            </ul>
            <button onClick={isAuthenticated === false ? login : logOut}
              className="connect-wallet-button">{isAuthenticated === false ? "CONNECT WALLET" : user.get("ethAddress")}</button>
          </div>
        </div>
        <div className='site-main'>
          <div className="sm-child1">
            <LeftSidebar />
          </div>
          <div className="sm-child2">
            <div className="site-middle-container">

              <Routes>
                {/* switch / to /coinflip when we add more games */}
                <Route path="/" exact element={<CoinFlip user={user} />} />
                <Route path="/coinflip/history" element={<CoinFlipHistory />} />
                <Route path="/coinflip/top" exact element={<CoinFlipTop />} />
                <Route path="/coinflip/how-to-play" element={<HowToPlayCoinFlip />} />
                <Route path="/affiliate" exact element={<Affiliate />} />
                <Route path="/provably-fair" element={<ProvablyFair />} />
                <Route path="/support" element={<Support />} />
                <Route path="/terms-and-conditions" exact element={<TermsAndConditions />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/cookie-policy" exact element={<CookiePolicy />} />
                <Route path="/aml-policy" element={<AMLPolicy />} />
                <Route path="/responsible-gambling" element={<ResponsibleGambling />} />
              </Routes>

              <div className="footer-links">
                <Link to='/terms-and-conditions'>Terms and Conditions</Link>
                <Link to='/privacy-policy'>Privacy Policy</Link>
                <Link to='/cookie-policy'>Cookie Policy</Link>
                <Link to='/aml-policy'>AML Policy</Link>
                <Link to='/responsible-gambling'>Responsible Gambling</Link>
              </div>
            </div>
          </div>
          <div className="sm-child3">
            <RightSidebar />
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
