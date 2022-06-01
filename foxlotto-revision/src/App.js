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
import { useState } from 'react';

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
  const [walletAddress, setWalletAddress] = useState('');

  //requesting to connect a meta mask account
  async function requestAccount() {
    console.log('Requesting account...');

    // ❌ Check if Meta Mask Extension exists 
    if (window.ethereum) {
      console.log('detected');

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      alert('Meta Mask not detected');
    }
  }

  // Create a provider to interact with a smart contract
  async function connectWallet() {
    console.log()
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // renderTokensForOwner(walletAddress)
    }
  }

  //get NFTs from owner's wallet
  // async function renderTokensForOwner(ownerAddress) {
  //   fetch(
  //     `https://api.opensea.io/api/v1/assets?owner=${ownerAddress}&order_direction=desc&offset=0&limit=50`,
  //     { method: "GET", headers: { Accept: "application/json" } }
  //   ).then(response => response.json()).then(({ assets }) => {
  //     assets.forEach((nft) => {
  //       document.getElementById("container").append(createTokenElement(nft))
  //     })
  //   })
  // }

  // const createTokenElement = ({ name, collection, description, permalink, image_preview_url, token_id }) => {
  //   const newElement = document.getElementById("nft_template").content.cloneNode(true)

  //   newElement.querySelector("section").id = `${collection.slug}_${token_id}`
  //   newElement.querySelector("h1").innerText = name
  //   newElement.querySelector("a").href = permalink
  //   newElement.querySelector("img").src = image_preview_url
  //   newElement.querySelector("img").alt = description

  //   return newElement
  // }

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
            <button onClick={connectWallet}
              className="connect-wallet-button">{walletAddress === '' ? "CONNECT WALLET" : walletAddress}</button>
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
                <Route path="/" exact element={<CoinFlip addy={walletAddress} />} />
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
