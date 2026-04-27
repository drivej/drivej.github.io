import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Lab from './pages/Lab.tsx';
import SetGamePage from './pages/SetGamePage.js';
import { SpiderVerse } from '@drivej/spiderverse';
import { SpiderVersePage } from './pages/SpiderVersePage';
import { HomePageV2 } from './pages/HomePage_v2';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={<HomePageV2 />} />
        <Route path='/hp0' element={<App />} />
        <Route path='/lab' element={<Lab />} />
        <Route path='/set-game' element={<SetGamePage />} />
        <Route path='/spiderverse' element={<SpiderVersePage />} />
        <Route path='/hp2' element={<HomePageV2 />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
