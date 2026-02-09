import CandleAnimation from '@drivej/candle-animation';
import { SetDeckCard } from '@drivej/set-game';
import '@drivej/set-game/styles.css';
import { useWaveControls, WaveAnimReact } from '@drivej/wave-anim';
import { LeavesAndSnowReact } from 'leaves-and-snow';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import audioSrc from '../assets/48K_1713045663.m4a';
import { Aurora } from '../components/Aurora';
import { GlobalHeader } from '../components/Header';
import { Tags } from '../components/Tag';

const randomCards = () => {
  const cards = [];
  for (let i = 0; i < 9; i++) {
    cards.push(Math.floor(Math.random() * 81));
  }
  return cards;
};

// hook to capture width/height of container
const useContainerSize = (ref: React.RefObject<HTMLElement>) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const ro = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const cr = entry.contentRect;
        setWidth(cr.width);
        setHeight(cr.height);
      }
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, [ref]);
  return { width, height };
};

const useWindowSize = () => {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [height, setHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0);
  useEffect(() => {
    const onResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return { width, height };
};

const LabBlock = ({ children, id }: { children: React.ReactNode; id?: string }) => {
  return (
    <div id={id} className='container lab-block'>
      {children}
    </div>
  );
};

const ProjectAutumnBlock = () => {
  const container = useRef(null);
  const { width, height } = useContainerSize(container);

  return (
    <LabBlock id='project-autumn'>
      <div className='lab-top' ref={container}>
        <LeavesAndSnowReact width={width} height={height} style={{ margin: '0 auto', display: 'block' }} />
      </div>

      <div className='lab-bottom' style={{ flexGrow: 0, flexShrink: 1, padding: 20 }}>
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
      </div>
    </LabBlock>
  );
};

const ProjectCandleBlock = () => {
  // const { width, height } = useWindowSize();
  const container = useRef(null);
  const aspectRatio = 3 / 2;
  const { width, height } = useContainerSize(container);
  // calculate size that fits in the container and maintains aspect ratio
  const w = useMemo(() => {
    const height = 600;
    const w = height * aspectRatio;
    if (w > width) {
      return width;
    }
    return w;
  }, [width, height]);

  const h = useMemo(() => w / aspectRatio, [w]);
  //const w = useMemo(() => height * aspectRatio, [width, height]);
  //const h = useMemo(() => height, [width, height]);

  // width={windowHeight * 1.5}
  // height={windowHeight * 0.8}

  return (
    <LabBlock id='project-candle'>
      <div ref={container} className='lab-top' style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CandleAnimation numCandles={7} width={800} height={500} />
      </div>

      <div className='lab-bottom'>
        <h1>Make a Wish!</h1>
        <div className='tagrow'>
          <Tags.PixiJS />
          <Tags.React />
          <Tags.TypeScript />
        </div>
        <p>This is an investigation into the nature of a flame. Essentially, the fire consists of a particle that grows and dimishes over and over - specks of fuel that burn up as they rise. They also react to wind (your mouse). Hint: Click on the candles to light each one.</p>
        <p></p>
      </div>
    </LabBlock>
  );
};

const ProjectSetBlock = () => {
  const cardIds = randomCards();

  return (
    <LabBlock id='project-setgame'>
      <div className='lab-top' style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#b1a0cc' }}>
        <Link to='/set-game'>
          <div className='set-game' style={{ width: '100%', maxWidth: 1100, position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', padding: 40 }}>
              {cardIds.map((n, i) => (
                <SetDeckCard key={`dck_${n}_${i}`} cardId={n} style={{ width: 100, height: 140 }} />
              ))}
            </div>
            <div className='app'></div>
          </div>
        </Link>
      </div>

      <div className='lab-bottom'>
        <h1>Game, Set, Match!</h1>
        <div className='tagrow'>
          <Tags.CSS3 />
          <Tags.SVG />
          <Tags.React />
          <Tags.TypeScript />
        </div>
        <p>
          A CSS/JS card matching game. "Set" is a popular game around our household. I was inspired to build a digital version as a personal challenge and to better understand the game's logic. This is (an AI confirmed) "clever" method of animation where the layout consists of hidden elements using only HTML/CSS while
          the fixed position cards tween to their target positions using JavaScript.
        </p>
        <p>
          <Link className='btn primary' to='/set-game'>
            Play Set Game
          </Link>
        </p>
      </div>
    </LabBlock>
  );
};

const ProjectAudioBlock = () => {
  const container = useRef(null);
  const waveRef = useRef(null);
  const waveControls = useWaveControls(waveRef);
  const [width, setWidth] = useState(500);

  // watch window size with useEffect
  useEffect(() => {
    const onResize = () => {
      setWidth(container.current?.clientWidth || 500);
    };
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    return () => {
      console.log('unmount');
      waveControls?.destroy?.();
    };
  }, []);

  return (
    <LabBlock id='project-wave'>
      <div ref={container} className='lab-top' style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#030303' }}>
        <WaveAnimReact ref={waveRef} onClick={waveControls.togglePlay} audioSrc={audioSrc} width={width} height={300} style={{ margin: '0 auto', display: 'block' }} />
      </div>

      <div className='lab-bottom'>
        <div className='tagrow'>
          {waveControls.isLocked ? (
            <span className='btn primary'>Click anywhere to unlock audio player</span>
          ) : (
            <>
              <button onClick={waveControls.togglePlay} className='btn primary'>
                {waveControls.isPlaying ? 'Pause' : 'Play'}
              </button>
              <button onClick={waveControls.toggleMute} className='btn secondary'>
                {waveControls.isMuted ? 'Unmute' : 'Mute'}
              </button>
            </>
          )}
        </div>
        <div>
          <h1>Audio Visualizer</h1>
          <div className='tagrow'>
            <Tags.WebAudio />
            <Tags.TypeScript />
            <Tags.Canvas />
          </div>
          <p>
            A CSS/JS card matching game. "Set" is a popular game around our household. I was inspired to build a digital version as a personal challenge and to better understand the game's logic. This is (an AI confirmed) "clever" method of animation where the layout consists of hidden elements using only HTML/CSS
            while the fixed position cards tween to their target positions using JavaScript.
          </p>
        </div>
      </div>
    </LabBlock>
  );
};

function Lab() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Aurora />
      <GlobalHeader />
      <div className='lab-block' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', padding: 20 }}>
          <h1>Welcome to the Lab!</h1>
          <p>Experiments, prototypes, and just-for-fun programming.</p>
          <hr style={{ margin: '30px', opacity: 0.5 }} />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a className='btn primary' onClick={() => scrollToSection('project-autumn')}>
              Late Autumn
            </a>

            <a className='btn primary' onClick={() => scrollToSection('project-candle')}>
              Make a wish!
            </a>

            <a className='btn primary' onClick={() => scrollToSection('project-wave')}>
              Audio Wave
            </a>

            <a className='btn primary' onClick={() => scrollToSection('project-setgame')}>
              Set Game
            </a>
          </div>
          <h3>...or scroll down through the experiments</h3>

          <h1>⇓</h1>
        </div>
      </div>
      {/* <GlobalHeader /> */}
      {/* <div className='container'>
        <h1>The Lab</h1>
        <p>Experiments, prototypes, and just-for-fun programming...</p>
      </div> */}
      <div className='lab-blocks'>
        <ProjectAutumnBlock />
        <ProjectCandleBlock />
        <ProjectAudioBlock />
        <ProjectSetBlock />\
      </div>
    </>
  );
}

function XLab() {
  const leavesContainer = useRef(null);
  const [leavesWidth, setLeavesWidth] = useState(200);
  const [leavesHeight, setLeavesHeight] = useState(200);
  const [_windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0);
  const waveRef = useRef(null);
  const waveControls = useWaveControls(waveRef);
  // const loc = useLocation();

  // track latest playing state so we can safely pause on unmount (route change)
  // const isPlayingRef = useRef(waveControls.isPlaying);

  useEffect(() => {
    return () => {
      console.log('unmount');
      waveControls?.destroy?.();
    };
  }, []);

  useEffect(() => {
    const container = leavesContainer.current;
    if (!container) return;

    const ro = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const cr = entry.contentRect;
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
        <h1>The Lab</h1>
        <p>Experiments, prototypes, and just-for-fun programming...</p>
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
        <CandleAnimation
          numCandles={8}
          width={windowHeight * 1.5}
          height={windowHeight * 0.8}
          // style={{ margin: '0 auto', display: 'block' }}
        />
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
              {cardIds.map((n, i) => (
                <SetDeckCard key={`dck_${n}_${i}`} cardId={n} style={{ width: 100, height: 140 }} />
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

      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#030303' }}>
        <WaveAnimReact ref={waveRef} onClick={waveControls.togglePlay} audioSrc={audioSrc} width={_windowWidth} height={300} style={{ margin: '0 auto', display: 'block' }} />
      </div>

      <div className='container'>
        <div className='tagrow'>
          {/* <pre>{JSON.stringify(waveControls, null, 2)}</pre> */}
          {waveControls.isLocked ? (
            <span className='btn primary'>Click anywhere to unlock audio player</span>
          ) : (
            <>
              <button onClick={waveControls.togglePlay} className='btn primary'>
                {waveControls.isPlaying ? 'Pause' : 'Play'}
              </button>
              <button onClick={waveControls.toggleMute} className='btn secondary'>
                {waveControls.isMuted ? 'Unmute' : 'Mute'}
              </button>
            </>
          )}
          {/* <button onClick={waveControls.togglePlay} className='btn primary'>
            {waveControls.isPlaying ? 'Pause' : 'Play'}
          </button>
          <button onClick={waveControls.toggleMute} className='btn secondary'>
            {waveControls.isMuted ? 'Unmute' : 'Mute'}
          </button> */}
        </div>
        <main id='top'>
          <h1>Audio Visualizer</h1>
          <div className='tagrow'>
            <Tags.WebAudio />
            <Tags.TypeScript />
            <Tags.Canvas />
          </div>
          <p>
            A CSS/JS card matching game. "Set" is a popular game around our household. I was inspired to build a digital version as a personal challenge and to better understand the game's logic. This is (an AI confirmed) "clever" method of animation where the layout consists of hidden elements using only HTML/CSS
            while the fixed position cards tween to their target positions using JavaScript.
          </p>
        </main>
      </div>
    </>
  );
}

export default Lab;
