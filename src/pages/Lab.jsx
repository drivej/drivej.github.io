import { useEffect, useRef, useState } from 'react';
import { LeavesAndSnowReact } from 'leaves-and-snow';
import { Tags } from '../components/Tag';
import CandleAnimation from '@drivej/candle-animation';
import { Link } from 'react-router-dom';
import { SetDeckCard } from '@drivej/set-game';
import '@drivej/set-game/styles.css';
import { GlobalHeader } from '../components/Header';
import { Aurora } from '../components/Aurora';

const randomCards = () => {
  const cards = [];
  for (let i = 0; i < 9; i++) {
    cards.push(Math.floor(Math.random() * 81));
  }
  return cards;
};

export default function Lab() {
  const leavesContainer = useRef(null);
  const [leavesWidth, setLeavesWidth] = useState(200);
  const [leavesHeight, setLeavesHeight] = useState(200);
  const [_windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0);

  useEffect(() => {
    const container = leavesContainer.current;
    if (!container) return;

    const ro = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const cr = entry.contentRect;
        console.log(cr);
        // make height max out at 90% of screen height
        const maxHeight = window.innerHeight * 0.9;
        const height = Math.min(maxHeight, cr.width * 0.66);
        // make width max out at 1300 but stay proportional to height
        const maxWidth = 1300;
        const width = Math.min(maxWidth, height / 0.66);

        setLeavesWidth(width);
        setLeavesHeight(height);
      }
    });
    ro.observe(container);

    // also refresh when window resizes
    const onResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      ro.observe(container);
    };
    window.addEventListener('resize', onResize);
    // call onResize once to set initial size
    //onResize();
    // window.addEventListener('resize', onResize);

    return () => {
      ro.disconnect();
    };
    // return () => window.removeEventListener('resize', onResize);
    //return () => leaves.stop();
  }, []);

  // pick 9 numbers randomly between 0-81
  const cardIds = randomCards();

  return (
    <>
      <Aurora />
      <GlobalHeader />
      <div className='container'>
        <main id='top'>
          <h1>Lab</h1>
          <p>Experiments, prototypes, and just for fun programming...</p>
        </main>
      </div>
      <div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#4a91ab' }}>
          <div data-ref='leaves-container' ref={leavesContainer} style={{ width: '100%', maxWidth: 1100 }}>
            <LeavesAndSnowReact width={leavesWidth} height={leavesHeight} style={{ margin: '0 auto', display: 'block' }} />
          </div>
        </div>
      </div>
      <div className='container'>
        <main id='top'>
          <h1>Late Autumn</h1>
          <div className='tagrow'>
            <Tags.PixiJS />
            <Tags.React />
            <Tags.TypeScript />
          </div>
          <p>
            Particle engines have been a long held interest of mine. I have used various methods for snow across winter themed campaigns over the years. This specific animation is a port of a Flash project I build in 2005. The flowing paths use a simple gear mechanism which spins multiple armatures around the elements
            base position. This allows gravity and wind to be simulated at the world level while each leaf or snowflake takes a unique path.
          </p>
          <p></p>
        </main>
      </div>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#030303' }}>
        <CandleAnimation numCandles={8} width={windowHeight * 1.5} height={windowHeight * 0.8} style={{ margin: '0 auto', display: 'block' }} />
      </div>

      <div className='container'>
        <main id='top'>
          <h1>Make a Wish!</h1>
          <div className='tagrow'>
            <Tags.PixiJS />
            <Tags.React />
            <Tags.TypeScript />
          </div>
          <p>This is an investigation into the nature of a flame. Essentially, the fire consists of a particle that grows and dimishes over and over - specks of fuel that burn up as they rise. They also react to wind (your mouse). Hint: Click on the candles to light each one.</p>
          <p></p>
        </main>
      </div>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#b1a0cc' }}>
        <Link to='/set-game'>
          <div className='set-game' style={{ width: '100%', maxWidth: 1100, position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', padding: 40 }}>
              {cardIds.map((n) => (
                <SetDeckCard cardId={n} style={{ width: 100, height: 140 }} />
              ))}
            </div>
            <div className='app'></div>
          </div>
        </Link>
      </div>

      <div className='container'>
        <main id='top'>
          <h1>Game, Set, Match!</h1>
          <div className='tagrow'>
            <Tags.CSS3 />
            <Tags.SVG />
            <Tags.React />
            <Tags.TypeScript />
          </div>
          <p>
            A CSS/JS card matching game. "Set" is a popular game around our household. I was inspired to build a digital version as a personal challenge and to better understand the game's logic. This is (an AI confirmed) "clever" method of animation where the layout consists of hidden elements using only HTML/CSS
            while the fixed position cards tween to their target positions using JavaScript.
          </p>
          <p>
            <Link className='btn primary' to='/set-game'>
              Play Set Game
            </Link>
          </p>
        </main>
      </div>
    </>
  );
}
