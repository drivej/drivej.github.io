import { CSSProperties, useRef } from 'react';
import { ParallaxProvider, useParallax } from 'react-scroll-parallax';

const RandomBalls = () => {
  const count = useRef(~~(window.innerWidth / 50));

  return (
    <ParallaxProvider>
      {Array.from({ length: count.current }).map((e, i) => (
        <RandomBall key={`ball${i}`} />
      ))}
    </ParallaxProvider>
  );
};

const RandomBall = () => {
  const offsetY = useRef(Math.random() * 20);
  const parallax = useParallax<HTMLDivElement>({ speed: offsetY.current });
  const baseStyle = useRef<CSSProperties>({
    position: 'absolute',
    borderRadius: '2000px', //
    left: 5 + Math.random() * 90 + '%',
    top: 5 + Math.random() * 90 + '%',
    width: 10 + Math.random() * 30,
    aspectRatio: '1/1',
    backgroundColor: `rgba(255,255,255,${Math.random() * 0.5})`,
    filter: `blur(${Math.random() * 5}px)`
  });

  return <div ref={parallax.ref} style={baseStyle.current}></div>;
};

const Intermission = () => {
  return (
    <div className='underline' style={{ position: 'relative', height: '150dvh' }}>
      <RandomBalls />
      <div className='underline flex-center' style={{ '--bg-color': '#781f65', height: '100dvh', position: 'sticky', top: 0, boxShadow: ' 0px 0px 40px rgba(0,0,0,0.9)', backgroundColor: 'rgba(0,0,0,0.2)', fontFamily: 'cursive' } as CSSProperties}>
        <div className='p-4 flex-center w-100'>
          <div className='flex-col flex-center'>
            <h1 className='d-block w-100 text-center' style={{ textShadow: '5px 5px 10px rgba(20,100,80,1)' }}>
              ~ Intermission ~
            </h1>
            <small style={{ fontFamily: 'Arial', fontSize: 16, opacity: 0.7, fontWeight: 100 }}>You deserve a break!</small>
          </div>
          {/* <BreakMessage /> */}
        </div>

        <div className='cornice' style={{ borderRight: 'none', borderBottom: 'none', top: 10, left: 10 }}>
          &spades;
        </div>

        <div className='cornice' style={{ borderLeft: 'none', borderBottom: 'none', top: 10, right: 10 }}>
          &hearts;
        </div>

        <div className='cornice' style={{ borderRight: 'none', borderTop: 'none', bottom: 10, left: 10 }}>
          &clubs;
        </div>

        <div className='cornice' style={{ borderLeft: 'none', borderTop: 'none', bottom: 10, right: 10 }}>
          &diams;
        </div>
      </div>
    </div>
  );
};
