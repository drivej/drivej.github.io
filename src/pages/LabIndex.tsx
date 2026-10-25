import { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import audio from '../assets/thumbnail_audiowave.png';
import autumn from '../assets/thumbnail_autumn.png';
import candles from '../assets/thumbnail_candles.png';
import lanterns from '../assets/thumbnail_lanterns.png';
import setgame from '../assets/thumbnail_setgame.png';
import spiderverse from '../assets/thumbnail_spiderverse.png';
import './LabIndex.scss';

const experiments = [
  { slug: 'spiderverse', title: 'Spiderverse', type: 'WebVR Experience', image: spiderverse },
  { slug: 'setgame', title: 'Set', type: 'JS/CSS Game', image: setgame },
  { slug: 'audio', title: 'Audio Waves', type: 'Audio Visualization', image: audio },
  { slug: 'autumn', title: 'Late Autumn', type: 'Canvas Animation', image: autumn },
  { slug: 'candles', title: 'Make a Wish', type: 'Canvas Animation', image: candles },
  { slug: 'lanterns', title: 'Lanterns', type: '3D Parallax', image: lanterns }
];

export default function LabIndex() {
  useLayoutEffect(() => {
    // Reset before paint; instant overrides the site's smooth scrolling.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <main className='lab-index'>
      <div className='lab-index-wrap'>
        <Link className='lab-back' to='/'>← Back to home</Link>
        <header>
          <p className='lab-eyebrow'>A little room for curiosity</p>
          <h1>The Lab</h1>
          <p>Experiments in motion, sound, and interaction. Pick something and play.</p>
        </header>
        <div className='lab-tiles'>
          {experiments.map(({ slug, title, type, image }) => (
            <Link className='lab-tile' to={`/lab/${slug}`} key={slug}>
              <img src={image} alt='' loading='lazy' />
              <div><h2>{title}<span aria-hidden='true'>↗</span></h2><p>{type}</p></div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
