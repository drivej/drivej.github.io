import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Lab from './pages/Lab.tsx';
import SetGamePage from './pages/SetGamePage.js';
import { SpiderVerse } from '@drivej/spiderverse';
import { SpiderVersePage } from './pages/SpiderVersePage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/lab' element={<Lab />} />
        <Route path='/set-game' element={<SetGamePage />} />
        <Route path='/spiderverse' element={<SpiderVersePage />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
