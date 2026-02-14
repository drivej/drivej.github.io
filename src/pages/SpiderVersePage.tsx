import { SpiderVerse } from '@drivej/spiderverse';
import { useRef } from 'react';
import { useWindowSize } from 'usehooks-ts';

export const SpiderVersePage = () => {
  const container = useRef<HTMLDivElement>(null);
  const {width, height} = useWindowSize();
//   const { width, height } = useResizeObserver({ ref: container, box: 'border-box' });

  return (
    <div ref={container} className='lab-top' style={{ width: '100vh', height: '100vh', background:'#FFF' }}>
      <SpiderVerse style={{ width, height }} />
    </div>
  );
};
