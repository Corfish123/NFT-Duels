import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
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
  return (
    <>
      <Router>
        <Routes>
          {/* switch / to /coinflip when we add more games */}
          <Route path="/" exact element={<CoinFlip />} />
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
      </Router>
    </>
  );
}

export default App;
