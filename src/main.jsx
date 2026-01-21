import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Lab from './pages/Lab.jsx';
import SetGamePage from './pages/SetGamePage.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/lab' element={<Lab />} />
        <Route path='/set-game' element={<SetGamePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
