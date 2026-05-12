import CandleAnimation from '@drivej/candle-animation';
import { LanternsReact } from '@drivej/lanterns';
import { SetDeckCard } from '@drivej/set-game';
import '@drivej/set-game/styles.css';
import { SpaceBallsComponent } from '@drivej/space-balls';
import { useWaveControls, WaveAnimReact } from '@drivej/wave-anim';
import { LeavesAndSnowReact } from 'leaves-and-snow';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useResizeObserver } from 'usehooks-ts';
import audioSrc from '../assets/48K_1713045663.m4a';
import Odin from '../assets/odin.png';
import spiderverseBg from '../assets/spiderverse.jpg';
import spideyVideo from '../assets/spiderverse_clipped_1.mp4';
import { Aurora } from '../components/Aurora';
import { Footer } from '../components/Footer';
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

const LabBlock = ({ children, id }: { children: React.ReactNode; id?: string }) => {
  return (
    <div id={id} className='container lab-block'>
      {children}
    </div>
  );
};

export const ProjectAutumnBlock = () => {
  const container = useRef(null);
  const { width, height } = useContainerSize(container);

  return (
    <LabBlock id='project-autumn'>
      <div className='lab-top' ref={container}>
        <LeavesAndSnowReact width={width} height={height} style={{ margin: '0 auto', display: 'block' }} />
      </div>

      <div className='lab-bottom'>
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

export const ProjectCandleBlock = () => {
  const container = useRef(null);
  const { width, height } = useContainerSize(container);

  return (
    <LabBlock id='project-candle'>
      <div ref={container} className='lab-top' style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CandleAnimation numCandles={7} width={width} height={height} key={`${width}-${height}`} />
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

export const ProjectAudioBlock = () => {
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

        <h1>Audio Visualizer</h1>
        <div className='tagrow'>
          <Tags.WebAudio />
          <Tags.TypeScript />
          <Tags.Canvas />
        </div>
        <p>Web Audio became a big part of my toolbox when I started working at Swell. One of the most gratifying exercises was creating the loudness meters and wave visualizations to go along with UGC audio. We ultimately landed on a more design focused execution, but the foundation of the work starts here.</p>
      </div>
    </LabBlock>
  );
};

export const ProjectSpaceBallsBlock = () => {
  const container = useRef<HTMLDivElement>(null);
  const { width, height } = useResizeObserver({ ref: container, box: 'border-box' });

  return (
    <LabBlock id='project-spaceballs'>
      <div ref={container} className='lab-top' style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#030303' }}>
        <SpaceBallsComponent width={width} height={height} />
      </div>

      <div className='lab-bottom'>
        <div>
          <h1>Space Race</h1>
          <div className='tagrow'>
            <Tags.TypeScript />
            <Tags.Canvas />
          </div>
          <p>Press and hold to go faster. Mouse around and click on the targets to destroy them. This is peak pointless fun.</p>
        </div>
      </div>
    </LabBlock>
  );
};

export const ProjectLanterns = () => {
  const container = useRef<HTMLDivElement>(null);
  const { width, height } = useResizeObserver({ ref: container, box: 'border-box' });

  return (
    <LabBlock id='project-lanterns'>
      <div
        ref={container}
        className='lab-top'
        style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#030303' }}
      >
        <LanternsReact style={{ width, height }} />
      </div>

      <div className='lab-bottom'>
        <h1>Chinese Lanterns</h1>
        <div className='tagrow'>
          <Tags.Canvas />
          <Tags.WebAudio />
          <Tags.React />
        </div>
        <p>
          Drag around, mouse-wheel in and out, click a lantern to bring it front and center. I have been building 3D Parallax engines since the Flash days. This was a prototype for delivering Swell micro-podcasting content. The idea was for users to record their New Year's resoltuions and wishes on swell, then this
          would be an interactive display of everyone's entries. Some things just never make it past the back burner.
        </p>
      </div>
    </LabBlock>
  );
};

export const ProjectSpidey = () => {
  const $video = useRef<HTMLVideoElement>(null);
  const [buttonStyle, setButtonStyle] = useState<CSSProperties>({ visibility: 'visible' });

  function playVideo() {
    if ($video.current) {
      $video.current.src = spideyVideo;
      // $video.current.style.display = 'block';
      $video.current.style.opacity = '1';
      setButtonStyle({ visibility: 'hidden' });
    }
  }

  function onEndVideo() {
    if ($video.current) {
      // $video.current.style.display = 'none';
      $video.current.style.opacity = '0';
      if (document.fullscreenElement) document.exitFullscreen();
      setButtonStyle({ visibility: 'visible' });
    }
  }

  return (
    <LabBlock id='project-spidey'>
      <div className='lab-top'>
        <Link
          to='/spiderverse'
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${spiderverseBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#030303'
          }}
        ></Link>
        <video onEnded={() => onEndVideo()} autoPlay controls src='' style={{ position: 'absolute', width: '100%', height: '100%', opacity: '0', transition: 'opacity 0.5s', inset: 0, objectFit: 'cover', objectPosition: 'center' }} ref={$video} />
        <div
          onClick={() => playVideo()}
          style={{
            position: 'absolute', //
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            width: 60,
            height: 60,
            background: 'rgba(255,255,255,0.6)',
            color: '#000',
            fontSize: 24,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            ...buttonStyle
          }}
        >
          <div style={{ transform: 'translate(5%,0)' }}>&#9658;</div>
        </div>
      </div>

      <div className='lab-bottom'>
        <h1>Spider-verse VR</h1>
        <div className='tagrow'>
          <Tags.Canvas />
          <Tags.React />
          <Tags.WebXR />
          <Tags.ThreeJS />
        </div>
        <p>
          I mean... if we're gonna VR, we might as well be a super hero, right? Visit this link in your VR browser and swing through the city like your friendly neighborhood Spider Man. Plus, we can learn about{' '}
          <a href='https://en.wikipedia.org/wiki/Hooke%27s_law' target='_blank'>
            Hooke's Law
          </a>{' '}
          and apply it.
        </p>

        <Link className='btn primary' to='/spiderverse' style={{ textAlign: 'center' }}>
          <h3 style={{ width: '100%' }}>Play in VR!</h3>
        </Link>
      </div>
    </LabBlock>
  );
};

const AdiosBlock = () => {
  return (
    <div className='lab-block' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', gap: 20, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ color: 'rgba(255,255,255,0.9)' }}>
            <h2 style={{ marginBottom: 10 }}>Curiosity is the cure!</h2>
            <p style={{ margin: 0 }}>Thanks for checking this out!</p>
          </div>
          <div title="Hi! I'm Odin!" style={{ backgroundImage: `url(${Odin})`, backgroundSize: '70%', backgroundRepeat: 'no-repeat', backgroundPosition: '40% 60%', width: 200, height: 200, borderRadius: '50%', backgroundColor: '#ca4490' }} />
        </div>
      </div>
      <div style={{ maxWidth: 1100, width: '100%' }}>
        <Footer />
      </div>
    </div>
  );
};

const HelloBlock = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className='lab-block' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', padding: 20 }}>
        <h1>Welcome to the Lab!</h1>
        <p>Experiments, prototypes, and just-for-fun programming.</p>
        <hr style={{ margin: '30px', opacity: 0.5 }} />
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a className='btn primary' onClick={() => scrollToSection('project-autumn')}>
            Late Autumn
          </a>

          <a className='btn primary' onClick={() => scrollToSection('project-lanterns')}>
            Chinese Lanterns
          </a>

          <a className='btn primary' onClick={() => scrollToSection('project-spidey')}>
            Spider-verse VR
          </a>

          <a className='btn primary' onClick={() => scrollToSection('project-spaceballs')}>
            Space Balls
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
  );
};

function Lab() {
  return (
    <>
      <Aurora />
      <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 999 }}>
        <GlobalHeader />
      </div>
      <div className='lab-blocks'>
        <HelloBlock />
        <ProjectAutumnBlock />
        <ProjectLanterns />
        <ProjectSpidey />
        <ProjectSpaceBallsBlock />
        <ProjectCandleBlock />
        <ProjectAudioBlock />
        <ProjectSetBlock />
        <AdiosBlock />
      </div>
    </>
  );
}

// function XLab() {
//   const leavesContainer = useRef(null);
//   const [leavesWidth, setLeavesWidth] = useState(200);
//   const [leavesHeight, setLeavesHeight] = useState(200);
//   const [_windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
//   const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0);
//   const waveRef = useRef(null);
//   const waveControls = useWaveControls(waveRef);
//   // const loc = useLocation();

//   // track latest playing state so we can safely pause on unmount (route change)
//   // const isPlayingRef = useRef(waveControls.isPlaying);

//   useEffect(() => {
//     return () => {
//       console.log('unmount');
//       waveControls?.destroy?.();
//     };
//   }, []);

//   useEffect(() => {
//     const container = leavesContainer.current;
//     if (!container) return;

//     const ro = new ResizeObserver((entries) => {
//       for (let entry of entries) {
//         const cr = entry.contentRect;
//         // make height max out at 90% of screen height
//         const maxHeight = window.innerHeight * 0.9;
//         const height = Math.min(maxHeight, cr.width * 0.66);
//         // make width max out at 1300 but stay proportional to height
//         const maxWidth = 1300;
//         const width = Math.min(maxWidth, height / 0.66);

//         setLeavesWidth(width);
//         setLeavesHeight(height);
//       }
//     });
//     ro.observe(container);

//     // also refresh when window resizes
//     const onResize = () => {
//       setWindowWidth(window.innerWidth);
//       setWindowHeight(window.innerHeight);
//       ro.observe(container);
//     };
//     window.addEventListener('resize', onResize);
//     // call onResize once to set initial size
//     //onResize();
//     // window.addEventListener('resize', onResize);

//     return () => {
//       ro.disconnect();
//     };
//     // return () => window.removeEventListener('resize', onResize);
//     //return () => leaves.stop();
//   }, []);

//   // pick 9 numbers randomly between 0-81
//   const cardIds = randomCards();

//   return (
//     <>
//       <Aurora />
//       <GlobalHeader />
//       <div className='container'>
//         <h1>The Lab</h1>
//         <p>Experiments, prototypes, and just-for-fun programming...</p>
//       </div>
//       <div>
//         <div style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#4a91ab' }}>
//           <div data-ref='leaves-container' ref={leavesContainer} style={{ width: '100%', maxWidth: 1100 }}>
//             <LeavesAndSnowReact width={leavesWidth} height={leavesHeight} style={{ margin: '0 auto', display: 'block' }} />
//           </div>
//         </div>
//       </div>
//       <div className='container'>
//         <main id='top'>
//           <h1>Late Autumn</h1>
//           <div className='tagrow'>
//             <Tags.PixiJS />
//             <Tags.React />
//             <Tags.TypeScript />
//           </div>
//           <p>
//             Particle engines have been a long held interest of mine. I have used various methods for snow across winter themed campaigns over the years. This specific animation is a port of a Flash project I build in 2005. The flowing paths use a simple gear mechanism which spins multiple armatures around the elements
//             base position. This allows gravity and wind to be simulated at the world level while each leaf or snowflake takes a unique path.
//           </p>
//           <p></p>
//         </main>
//       </div>

//       <div style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#030303' }}>
//         <CandleAnimation
//           numCandles={8}
//           width={windowHeight * 1.5}
//           height={windowHeight * 0.8}
//           // style={{ margin: '0 auto', display: 'block' }}
//         />
//       </div>

//       <div className='container'>
//         <main id='top'>
//           <h1>Make a Wish!</h1>
//           <div className='tagrow'>
//             <Tags.PixiJS />
//             <Tags.React />
//             <Tags.TypeScript />
//           </div>
//           <p>This is an investigation into the nature of a flame. Essentially, the fire consists of a particle that grows and dimishes over and over - specks of fuel that burn up as they rise. They also react to wind (your mouse). Hint: Click on the candles to light each one.</p>
//           <p></p>
//         </main>
//       </div>

//       <div style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#b1a0cc' }}>
//         <Link to='/set-game'>
//           <div className='set-game' style={{ width: '100%', maxWidth: 1100, position: 'relative' }}>
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', padding: 40 }}>
//               {cardIds.map((n, i) => (
//                 <SetDeckCard key={`dck_${n}_${i}`} cardId={n} style={{ width: 100, height: 140 }} />
//               ))}
//             </div>
//             <div className='app'></div>
//           </div>
//         </Link>
//       </div>

//       <div className='container'>
//         <main id='top'>
//           <h1>Game, Set, Match!</h1>
//           <div className='tagrow'>
//             <Tags.CSS3 />
//             <Tags.SVG />
//             <Tags.React />
//             <Tags.TypeScript />
//           </div>
//           <p>
//             A CSS/JS card matching game. "Set" is a popular game around our household. I was inspired to build a digital version as a personal challenge and to better understand the game's logic. This is (an AI confirmed) "clever" method of animation where the layout consists of hidden elements using only HTML/CSS
//             while the fixed position cards tween to their target positions using JavaScript.
//           </p>
//           <p>
//             <Link className='btn primary' to='/set-game'>
//               Play Set Game
//             </Link>
//           </p>
//         </main>
//       </div>

//       <div style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#030303' }}>
//         <WaveAnimReact ref={waveRef} onClick={waveControls.togglePlay} audioSrc={audioSrc} width={_windowWidth} height={300} style={{ margin: '0 auto', display: 'block' }} />
//       </div>

//       <div className='container'>
//         <div className='tagrow'>
//           {/* <pre>{JSON.stringify(waveControls, null, 2)}</pre> */}
//           {waveControls.isLocked ? (
//             <span className='btn primary'>Click anywhere to unlock audio player</span>
//           ) : (
//             <>
//               <button onClick={waveControls.togglePlay} className='btn primary'>
//                 {waveControls.isPlaying ? 'Pause' : 'Play'}
//               </button>
//               <button onClick={waveControls.toggleMute} className='btn secondary'>
//                 {waveControls.isMuted ? 'Unmute' : 'Mute'}
//               </button>
//             </>
//           )}
//           {/* <button onClick={waveControls.togglePlay} className='btn primary'>
//             {waveControls.isPlaying ? 'Pause' : 'Play'}
//           </button>
//           <button onClick={waveControls.toggleMute} className='btn secondary'>
//             {waveControls.isMuted ? 'Unmute' : 'Mute'}
//           </button> */}
//         </div>
//         <main id='top'>
//           <h1>Audio Visualizer</h1>
//           <div className='tagrow'>
//             <Tags.WebAudio />
//             <Tags.TypeScript />
//             <Tags.Canvas />
//           </div>
//           <p>
//             A CSS/JS card matching game. "Set" is a popular game around our household. I was inspired to build a digital version as a personal challenge and to better understand the game's logic. This is (an AI confirmed) "clever" method of animation where the layout consists of hidden elements using only HTML/CSS
//             while the fixed position cards tween to their target positions using JavaScript.
//           </p>
//         </main>
//       </div>
//     </>
//   );
// }

export default Lab;
