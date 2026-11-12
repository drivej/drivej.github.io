import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Navigate, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Lab, { ProjectAudioBlock, ProjectAutumnBlock, ProjectCandleBlock, ProjectLanterns, ProjectSpidey } from './pages/Lab.tsx';
import SetGamePage from './pages/SetGamePage.js';
import { SpiderVerse } from '@drivej/spiderverse';
import { SpiderVersePage } from './pages/SpiderVersePage';
import { HomePageV2 } from './pages/HomePage_v2';
import HomePage_v3 from './pages/HomePage_v3';
import HomePageStateStreet from './pages/HomePageStateStreet';
import LabIndex from './pages/LabIndex';
import JobShowcase from './case_studies/JobShowcase.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={<HomePageStateStreet />} />
        <Route path='/hp3' element={<HomePage_v3 />} />
        <Route path='/case-studies/job-showcase' element={<JobShowcase />} />
        {/* <Route path='/state-street' element={<HomePageStateStreet />} /> */}
        <Route path='/hp2' element={<HomePageV2 />} />
        <Route path='/hp0' element={<App />} />
        <Route path='/lab' element={<LabIndex />} />
        <Route path='/set-game' element={<SetGamePage />} />
        <Route path='/spiderverse' element={<SpiderVersePage />} />
        <Route path='/hp2' element={<HomePageV2 />} />
        <Route path='/lab/lanterns' element={<ProjectLanterns />} />
        <Route path='/lab/autumn' element={<ProjectAutumnBlock />} />
        <Route path='/lab/candles' element={<ProjectCandleBlock />} />
        <Route path='/lab/spiderverse' element={<ProjectSpidey />} />
        <Route path='/lab/setgame' element={<SetGamePage />} />
        <Route path='/lab/audio' element={<ProjectAudioBlock />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
