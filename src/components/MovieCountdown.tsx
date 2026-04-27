import { useEffect, useState } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

export const MovieCountdown = () => {
  const [className, setClassName] = useState('cinema-countdown-spinner');
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 1,
    freezeOnceVisible: true
  });

  useEffect(() => {
    if (isIntersecting) {
      setClassName('cinema-countdown-spinner animating');
    }
  }, [isIntersecting]);

  // You deserve a break!

  return (
    <div ref={ref} className={className}>
      <div>
        <div></div>
      </div>
    </div>
  );

  return <span>You deserve a break!</span>;
};
