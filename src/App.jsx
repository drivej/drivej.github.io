import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Aurora } from './components/Aurora';
import { GlobalHeader } from './components/Header';
import { ProjectModal } from './components/ProjectModal';
import { FullscreenModal } from './components/FullscreenModal';
import CandleAnimation from '@drivej/candle-animation';
import LeavesAndSnowReact from '@drivej/leaves-animation';
import HomePage from './pages/HomePage';
import { HomePageV2 } from './pages/HomePage_v2';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get('section');

    if (section) {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    } else if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <>
      <Aurora />
      <GlobalHeader />
      {/* <HomePageV2 /> */}
      <HomePage />
    </>
  );
}
