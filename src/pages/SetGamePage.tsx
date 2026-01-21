import SetGameReact from "@drivej/set-game";
import '@drivej/set-game/styles.css';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SetGamePage() {
  // if on mobile, show message that this is not designed for mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (typeof window !== 'undefined' && window.innerWidth < 700) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener('resize', onResize);
    onResize();
  }, []);

  if (isMobile) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Sorry, this is not designed for mobile.</h1>
        <p>Please play on a desktop or laptop.</p>
        <Link to='/lab' className='btn'>Back to Lab</Link>
      </div>
    );
  }

  return (
    <div className='app' style={{background: 'rgba(255,255,255,0.9)' }}>
      <SetGameReact />
    </div>
  );
}
