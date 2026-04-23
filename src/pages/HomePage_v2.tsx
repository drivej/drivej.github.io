import { createContext, CSSProperties, MouseEventHandler, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import cvPdf from '../assets/Jason_Contento_CV.pdf';
import { Icon } from '../components/Icon';
import { Tags } from '../components/Tag';
import '../styles/navgrid.css';

const RAD = Math.PI / 180;
const gridSize = 20;
const colors = {
  blue: '#46b8da',
  green: '#2ebd3f',
  purple: '#7a4be3', // '#4f29a4',
  red: '#781f65',
  orange: '#cd5d44',
  yellow: '#f5c615'
};

export const HomePageV2 = () => {
  return (
    <NavProvider>
      <HomePageV2Content />
    </NavProvider>
  );
};

export const HomePageV2Content = () => {
  const nav = useNav();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const onClickNavItem: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    const url = new URL(e.currentTarget.href);
    scrollToSection(url.hash.slice(1));
    nav.close();
  };

  //   const [p, setP] = useState(0);

  //   useEffect(() => {
  // let raf = 0;

  // const tick = () => {
  //   setP((v) => {
  //     const next = v + (window.scrollY * 0.02 - v) / 2;
  //     if (Math.abs(next - v) > 0.01) {
  //       raf = requestAnimationFrame(tick);
  //     }
  //     return next;
  //   });
  // };

  // const onScroll = () => {
  //   cancelAnimationFrame(raf);
  //   raf = requestAnimationFrame(tick);
  // };

  //     window.addEventListener('scroll', onScroll, { passive: true });
  //     onScroll();

  //     return () => {
  //       window.removeEventListener('scroll', onScroll);
  //       cancelAnimationFrame(raf);
  //     };
  //   }, []);

  return (
    <>
      <Sidenav>
        <br />
        <div className='flex-col gap-3'>
          <div className='flex-col gap-3'>
            <a href='#tldr' onClick={onClickNavItem}>
              <h2 style={{ color: colors.blue }}>TL;DR</h2>
            </a>
            <a href='#skills' onClick={onClickNavItem}>
              <h2 style={{ color: colors.green }}>Skills</h2>
            </a>
            <a href='#case_study' onClick={onClickNavItem}>
              <h2 style={{ color: colors.purple }}>Case Study</h2>
            </a>
            <a href='#reviews' onClick={onClickNavItem}>
              <h2 style={{ color: colors.orange }}>Reviews</h2>
            </a>
            <a href='#tough_crowd' onClick={onClickNavItem}>
              <h2 style={{ color: colors.yellow }}>Tough Crowd</h2>
            </a>
          </div>
          <hr />
          <div className='flex-col gap-3'>
            <p>
              Jason Contento
              <br />
              New Jersey, USA
            </p>
            <a href={cvPdf} className='hover-underline text-light'>
              Download Resume
            </a>
            <a href='mailto:drivej@hotmail.com' className='hover-underline text-light'>
              drivej@hotmail.com
            </a>
          </div>
        </div>
      </Sidenav>

      <div className='funky-scroll' style={{ '--grid-size': `${gridSize}px` } as CSSProperties}>
        <section id='tldr' className='underline' style={{ '--bg-color': '#46b8da' } as CSSProperties}>
          <div>
            <div className='sidebar-title'>
              <h1 className='text-color-2'>TL;DR</h1>
              <NavGrid />
            </div>
          </div>
          <div className='flex-col gap-3'>
            <div className='p-2' />
            <div className='flex-row gap-1' style={{ alignItems: 'center' }}>
              <div className='circle' style={{ width: 70 }}>
                JC
              </div>
              <h1>Jason Contento</h1>
            </div>
            <div className='flex-row gap-1 flex-wrap'>
              <Tags.React />
              <Tags.TypeScript />
              <Tags.CSS3 />
              <Tags.Canvas />
              <Tags.WebAudio />
              <Tags.GQL />
              <Tags.NodeJS />
              <Tags.ThreeJS />
              <Tags.UXUI />
            </div>
            <div className='flex-col gap-1'>
              <h2>The Pitch</h2>
              <p>Do you need a Team Lead or Dev Lead with a focus on UI/UX and Design for web projects using NodeJs, React, GraphQL?</p>
              <p>I come with experience working with large organizations, time crunches, and Design oriented executions. I have a track record of success, teamwork, agility and a good attitude.</p>
            </div>
            <hr />
            <div className='flex-col gap-1'>
              <h2>How Will I Contribute?</h2>
              <ul style={{ paddingLeft: 20 }}>
                <li>
                  <h4 className='d-inline-block'>Discovery:</h4> <p className='d-inline-block'>Align high level goals.</p>
                </li>
                <li>
                  <h4 className='d-inline-block'>Planning:</h4> <p className='d-inline-block'>Identify architecture, capabilities, strengths and a path to success.</p>
                </li>
                <li>
                  <h4 className='d-inline-block'>Execution:</h4> <p className='d-inline-block'>Teams win. Cross the finish line together.</p>
                </li>
              </ul>
            </div>
            <hr />
            <div className='flex-row gap-2'>
              <a className='btn primary' href='mailto:drivej@hotmail.com' style={{ paddingLeft: 30, paddingRight: 30 }}>
                Hire Me
              </a>
              <a className='btn primary' href={cvPdf}>
                <Icon name='download' />
                Download Resume
              </a>
              <a className='btn primary' href='mailto:drivej@hotmail.com'>
                <Icon name='mail' />
                Email
              </a>
              {/* <a className='btn primary' href='tel:+13157514119'>
                Call Me
              </a> */}
            </div>
          </div>
        </section>

        <section id='skills' className='underline' style={{ '--bg-color': '#2ebd3f' } as CSSProperties}>
          <div>
            <div className='sidebar-title'>
              <h1 className='text-color-2'>Skills</h1>
              <NavGrid />
            </div>
          </div>
          <div className='flex-col gap-3'>
            <div className='flex-col gap-3'>
              <h2>Technology</h2>
              <div className='progress-bars-container'>
                <ProgressInfo title='React' description='' progress={87} />
                <ProgressInfo title='CSS3' description='' progress={70} />
                <ProgressInfo title='NodeJS' description='' progress={71} />
                <ProgressInfo title='API Integration' description='' progress={63} />
                <ProgressInfo title='UI / UX' description='' progress={50} />
                <ProgressInfo title='Rapid Prototyping' description='' progress={90} />
                <ProgressInfo title='Printer Repair' description='' progress={11} />
              </div>
            </div>
            <hr />

            <div className='flex-col gap-3' style={{ '--bar-color': '226, 130, 21' } as CSSProperties}>
              <h2>Experience</h2>
              <div className='progress-bars-container'>
                <ProgressInfo title='Team Lead' description='&gt;20 years' progress={75} />
                <ProgressInfo title='Education' description='Masters Work' progress={70} />
                <ProgressInfo title='Book Smarts' description='Fake it' progress={42} />
                <ProgressInfo title='Street Smarts' description='Make it' progress={85} />
              </div>
            </div>

            <hr />

            <div className='flex-col gap-3' style={{ '--bar-color': '58, 146, 207' } as CSSProperties}>
              <h2>Traits</h2>
              <div className='progress-bars-container'>
                <ProgressInfo title='Self-directed' description='Better to ask forgiveness...' progress={90} />
                <ProgressInfo title='Problem Solving' description='Teams Win' progress={99} />
                <ProgressInfo title='Persistence' description='Build &rarr; QA &rarr; Deploy &rarr; Repeat...' progress={95} />
                <ProgressInfo title='Good Vibes' description='After coffee of course...' progress={92} />
              </div>
            </div>
          </div>
        </section>

        <section id='case_study' className='underline' style={{ '--bg-color': '#4f29a4' } as CSSProperties}>
          <div>
            <div className='sidebar-title'>
              <h1 className='text-color-3'>Case Study</h1>
              <NavGrid />
            </div>
          </div>
          <div>
            <div className='flex-col gap-3'>
              <div className='flex-col gap-1 underline'>
                <h2>Perry Marketing</h2>
                <p>Custom Analytics & Reporting System</p>
                <br />
              </div>

              <div className='flex-col gap-2 Xp-1'>
                <div className='flex-col gap-1'>
                  <h3>Problem</h3>
                  <p className='ps-1'>
                    Perry Marketing provides excellent online marketing services. They go to bat for their clients, delivering far beyond what many larger agencies would offer. However, their reporting process required manual aggregation of data from multiple sources. They were also expanding from a few dozen clients
                    to a few hundred. This was unsustainable.
                  </p>
                </div>

                <div className='flex-col gap-1'>
                  <h3>Solution</h3>
                  <p className='ps-1'>
                    Automate analytics aggregation for 100s of clients. Leverage the Google ecosystem. Design a flow using: BigQuery, AppScript, Looker and Sheets. First, identify the source-of-truth for all incoming data. Understand the touchpoints along the way: Forms, Calls, and manual lead validation. Populate
                    BigQuery and pipe into Looker. Optimize complex SQL queries for daily, weekly, and yearly reports.
                  </p>
                </div>

                <div className='flex-col gap-1'>
                  <h3>Future Proofing</h3>
                  <p className='ps-1'>Design the database to hold and process the abstract data from our sources. Don't simply regurgitate reports. This gives us the opportunity to run AI agents on the data for prediction models and market trend reports. This positions Perry Marketing for expansion.</p>
                </div>

                <div className='flex-col gap-1'>
                  <h3>Retrospective</h3>
                  <p className='ps-1'>
                    <b>The Good &mdash;</b> The stack was the right choice. BigQuery is a fantastic data store. Looker has all the necessary features even though it lacks finesse.
                    <br />
                    <b>The Bad &mdash;</b> Google Ads admin metrics do not always match the raw data exported from their API. We want data parity with sources, but calculated analytics suffer from average aggregation issues and collection delay. This bloated our QA process.
                    <br />
                    <b>The Ugly &mdash;</b> There is room for pretty UX/UI for some of the managed data but these are low value, low priority issues.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id='reviews' className='underline' style={{ '--bg-color': '#cd5d44' } as CSSProperties}>
          <div>
            <div className='sidebar-title'>
              <h1 className='text-color-2'>Reviews</h1>
              <NavGrid />
            </div>
          </div>
          <div className='flex-center'>
            <div className='flex-row flex-wrap gap-2' style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Review author='Intern' border={colors.green}>
                The best <i>I've</i> ever seen
              </Review>
              <Review author='Project Manager' border={colors.orange}>
                Stays calm while others panic.
                <br />
                Also, stays calm while others toil.
              </Review>
              <Review author='Dept. VP' border={colors.blue}>
                Get back to work!
              </Review>
              <Review author='HR' border={colors.purple}>
                We can only confirm the he worked here.
                {/* <br /> */}
                {/* so close to the ground... */}
                <br />
                Is this being recorded?
              </Review>
              <Review author='Pair Programmer' border={colors.red}>
                So much confidence.
                <br />
                So few tests.
              </Review>
              <Review author='Client' border={colors.blue}>
                Will work with him again!
              </Review>
              <Review author='Postmates Dude' border={colors.purple}>
                When the going get rough, he gets bagels.
              </Review>
              <Review author='CEO' border={colors.green}>
                Who?
              </Review>
            </div>
          </div>
        </section>

        <div style={{ position: 'relative', height: '200vh' }}>
          <RandomBalls />
          <div className='underline flex-center' style={{ '--bg-color': '#781f65', height: '100vh', position: 'sticky', top: 0, boxShadow: ' 0px 0px 40px rgba(0,0,0,0.9)', backgroundColor: 'rgba(0,0,0,0.2)', fontFamily: 'cursive' } as CSSProperties}>
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

        <section id='tough_crowd' className='underline' style={{ '--bg-color': '#f5c615' } as CSSProperties}>
          <div>
            <div className='sidebar-title'>
              <h1 className='text-color-2'>Tough Crowd</h1>
              <NavGrid />
            </div>
          </div>
          <div>
            <h1>Still on the fence?</h1>
            <h2 style={{ fontWeight: 200 }}>Here's a letter from my mother to drive this home...</h2>
            <br />
            <br />

            <div className='p-2'>
              <h4>Dear Hiring Manager,</h4>
              <br />
              <p>Just kidding. There's absolutely no way I'd let my mother near this. She's great in her capacity, but frankly, most of the work I do goes straight over the bangs. Let's move on...</p>
              <br />
              <p>My goal is to help your business thrive. To do that, I first need to undersand your bread &amp; butter and the special sauce that makes it work. Together we'll identify the meat of the matter. Then, wrap those pieces with technology to advance our core goals. Like a burrito... a business burrito!</p>
              <br />
              <p>And obviously, we all like burritos. Case closed.</p> <br />
              <p>Is it lunch time yet?</p>
            </div>
          </div>
        </section>

        <AllTheWayUp />
      </div>
    </>
  );
};

import { interpolate, rand } from '@drivej/xrworld';
import { ParallaxProvider, useParallax } from 'react-scroll-parallax';
import '../styles/hamburgers.css';

const HamburgerMenu = () => {
  const nav = useNav();
  return (
    <div onClick={nav.toggleOpen} data-state={nav.state} className='hamburger-menu'>
      <div>
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

const NavContext = createContext({ isOpen: false, open: () => {}, close: () => {}, toggleOpen: () => null, state: 'closed' });

const useNav = () => useContext(NavContext);

const NavProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setOpen] = useState(false);
  const state = isOpen ? 'open' : 'closed';
  const toggleOpen = () => {
    setOpen((v) => !v);
  };
  const open = () => {
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
  };
  return <NavContext.Provider value={{ isOpen, toggleOpen, open, close, state }}>{children}</NavContext.Provider>;
};

const useWindowScrollY = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return { scrollY };
};

const Sidenav = ({ children }: { children: ReactNode }) => {
  const nav = useNav();
  return (
    <div className='sidenav' data-state={nav.state}>
      <HamburgerMenu />
      <div className='sidenav-content'>{children}</div>
    </div>
  );
};

const BreakMessage = () => {
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

const ProgressInfo = ({ title, description, progress }: { title: string; description: string; progress: number }) => {
  const [visibleProgress, setVisibleProgress] = useState(0);

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 1,
    freezeOnceVisible: true
  });

  useEffect(() => {
    if (isIntersecting) {
      setVisibleProgress(progress);
    }
  }, [isIntersecting]);

  return (
    <div ref={ref} className='flex-col gap-1'>
      <div className='flex-row-between' style={{ alignItems: 'end' }}>
        <h4 style={{ fontWeight: 300 }}>{title}</h4>
        <p className='text-light' style={{ fontSize: 12, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          {description}
        </p>
      </div>
      <div className='progress-bar'>
        <div style={{ width: `${visibleProgress}%` }} />
      </div>
    </div>
  );
};

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

const Review = ({ author, border, children }: { author: React.ReactNode; border: string; children: React.ReactNode }) => {
  return (
    <div className='quote p-2' style={{ border: `2px solid ${border}` }}>
      <blockquote className='p-0 m-0'>&ldquo;{children}&rdquo;</blockquote>
      <br />
      <p>~ {author}</p>
    </div>
  );
};

type Gear = {
  a: number;
  r: number;
  s: number;
  args: { radius: { min: number; max: number }; speed: { min: number; max: number } };
};

function randGear(radius: { min: number; max: number } = { min: 3, max: 8 }, speed: { min: number; max: number } = { min: 1, max: 10 }): Gear {
  return {
    a: rand(0, 360) * RAD,
    r: rand(radius.min, radius.max),
    s: rand(speed.min, speed.max) * RAD, //0.3 + Math.random() * 30 * RAD
    args: { radius, speed }
  };
}

function getGearPosition(gears: Gear[], offset: number, normalize = false) {
  let x = 0;
  let y = 0;
  let a = 0;

  for (let i = 0; i < gears.length; i++) {
    const gear = gears[i];
    a = gear.a + gear.s * offset;
    x += Math.sin(a) * gear.r;
    y += Math.cos(a) * gear.r;
  }
  return { x, y };
}

function advanceGears(gears: Gear[], steps = 1) {
  let x = 0;
  let y = 0;

  for (let i = 0; i < gears.length; i++) {
    const gear = gears[i];
    gear.a += gear.s * steps;
    x += Math.sin(gear.a) * gear.r;
    y += Math.cos(gear.a) * gear.r;
  }
  return { x, y };
}

function getGearsRadius(gears: Gear[]) {
  let l = 0;
  for (let i = 0; i < gears.length; i++) {
    l += gears[i].r;
  }
  return l;
}

const NavGrid = () => {
  const speed = useRef(10); //rand(2,5));
  const { scrollY } = useWindowScrollY();
  const [_p, setP] = useState(scrollY);
  const vals = useRef(Array.from({ length: 30 }).map(() => randGear()));

  useEffect(() => {
    let raf: number;

    const tick = () => {
      setP((v) => {
        const next = v + (window.scrollY * 0.02 - v) / speed.current; // 2
        if (Math.abs(next - v) > 0.01) {
          raf = requestAnimationFrame(tick);
        }
        return next;
      });
    };

    tick();

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [scrollY]);

  return (
    <div className='navgrid'>
      {vals.current.map((val, i) => {
        const a = val.a + val.s * _p;
        const sina = Math.sin(a);
        const cosa = Math.cos(a);
        const o = (sina + 1) / 2;
        const x = sina * 100;
        const _x = ~~(x / gridSize) * gridSize;
        const s = (cosa + 1) / 2;
        const _s = 0.25 + ~~((s * 0.75) / 0.25) * 0.25;
        return <div key={`ng${i}`} style={{ opacity: o, transform: `translate(${_x}px) scale(${_s})` }} />;
      })}
    </div>
  );
};

const AllTheWayUp = () => {
  return (
    <ParallaxProvider>
      <div
        className='sky-gradient'
        style={{
          height: '150vh',
          position: 'relative'
          //   display:'flex', alignItems:'end'
        }}
      >
        {Array.from({ length: 30 }).map((e, i) => (
          <Star key={`start${i}`} />
        ))}
        <NightSwamp />
        <h2 className='p-3' style={{ position: 'sticky', top: 20, right: 20, width: '100%', textAlign: 'right', fontFamily: 'courier' }}>
          <sup>*</sup>Thanks for visiting
        </h2>
      </div>
    </ParallaxProvider>
  );
};

type Point = {
  x: number;
  y: number;
};

type Particle = {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  mass: number;
  isStatic?: boolean;
  width: number;
};

type Spring = { a: number; b: number; restLength: number };
type GrassBlade = { grass: Particle[]; springs: Spring[]; color: string; ignoreMouse: boolean; cvs: OffscreenCanvas; ctx: OffscreenCanvasRenderingContext2D; dupes: Point[] };
type Butterfly = { shouldFollow: boolean; anchor: any; position: any; vector: any; flutter: Gear[]; width: any; color: RGB; glowColor: RGB; depth?: number; glow: Gear[]; glowRadius: number };

const Star = () => {
  const offsetY = useRef(Math.random() * 5);
  const parallax = useParallax<HTMLDivElement>({ speed: offsetY.current });
  const baseStyle = useRef<CSSProperties>({
    position: 'absolute',
    borderRadius: '2000px', //
    left: 5 + Math.random() * 90 + '%',
    top: 5 + Math.random() * 80 + '%',
    width: 1 + Math.random() * 4,
    aspectRatio: '1/1',
    backgroundColor: `rgba(255,255,255,${Math.random() * 1})`,
    filter: `blur(${Math.random() * 2}px)`
  });

  return <div ref={parallax.ref} style={baseStyle.current}></div>;
};

function solveDistanceConstraint(p1: Particle, p2: Particle, restLength: number) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;

  const error = dist - restLength;
  const nx = dx / dist;
  const ny = dy / dist;

  const w1 = 1 / p1.mass;
  const w2 = 1 / p2.mass;
  const wSum = w1 + w2;

  const correctionX = nx * error;
  const correctionY = ny * error;

  if (p1?.isStatic !== true) {
    p1.x += correctionX * (w1 / wSum);
    p1.y += correctionY * (w1 / wSum);
  }

  if (p2?.isStatic !== true) {
    p2.x -= correctionX * (w2 / wSum);
    p2.y -= correctionY * (w2 / wSum);
  }
}

function verletIntegrateDamped(p: Particle, ax: number, ay: number, dt: number, damping = 0.98) {
  const vx = (p.x - p.prevX) * damping;
  const vy = (p.y - p.prevY) * damping;
  const nextX = p.x + vx + ax * dt * dt;
  const nextY = p.y + vy + ay * dt * dt;
  p.prevX = p.x;
  p.prevY = p.y;
  if (p?.isStatic !== true) {
    p.x = nextX;
    p.y = nextY;
  }
}

function simulate(particles: Particle[], springs: Spring[], dt: number, gravityY = 5) {
  for (const p of particles) {
    verletIntegrateDamped(p, 0, gravityY, dt, 0.98);
  }

  for (let i = 0; i < 4; i++) {
    for (const s of springs) {
      solveDistanceConstraint(particles[s.a], particles[s.b], s.restLength);
    }
  }
}

function generateGrassBlade(width = 500, height = 100): GrassBlade {
  const widthOffset = rand(0.5, 1);
  const massOffset = rand(0.7, 3); // rand(0, 40);
  const restLengthOffset = rand(0.6, 1); //rand(0, 20);
  const x = rand(0, width);
  const color1 = [46, 189, 63];
  const color2 = [159, 139, 111];
  const r1 = 0.6;
  const r2 = 1;
  const c = Math.random() < 0.2 ? color2 : color1;
  const color = `rgb(${rand(c[0] * r1, c[0] * r2)}, ${rand(c[1] * r1, c[1] * r2)}, ${rand(c[2] * r1, c[2] * r2)})`;
  const bladeHeight = height * rand(0.4, 0.6);
  const y = bladeHeight;

  const grass: Particle[] = [
    { x, y, prevX: x, prevY: y, mass: 80 * massOffset, width: 5 * widthOffset, isStatic: true },
    { x, y, prevX: x, prevY: y, mass: 50 * rand(0.7, 3), width: 5 * widthOffset },
    { x, y, prevX: x, prevY: y, mass: 20 * rand(0.7, 3), width: 5 * widthOffset },
    { x, y, prevX: x, prevY: y, mass: 20 * rand(0.7, 3), width: 5 * widthOffset },
    { x, y, prevX: x, prevY: y, mass: 10 * rand(0.7, 3), width: 4 * widthOffset },
    { x, y, prevX: x, prevY: y, mass: 10 * rand(0.7, 3), width: 3 * widthOffset },
    { x, y, prevX: x, prevY: y, mass: 30 * rand(0.7, 3), width: 1 }
  ];
  const springs = grass.slice(0, -1).map((g, i) => ({
    a: i,
    b: i + 1,
    restLength: (bladeHeight / grass.length) * restLengthOffset
  }));
  const cvs = new OffscreenCanvas(width, height);
  const ctx = cvs.getContext('2d');
  return {
    grass,
    springs,
    color,
    ignoreMouse: Math.random() < 0.1,
    cvs,
    ctx, //
    dupes: Array.from({ length: rand(10, 20, true) }).map(() => ({ x: x + rand(-100, 100), y: rand(0, 100) }))
  };
}

const generateFlutter = (length = 5): Gear[] => {
  //   return Array.from({ length }).map(() => ({ a: rand(0, 360), s: rand(-3, 3), r: rand(20, 100) }));
  return Array.from({ length }).map(() => randGear({ min: 20, max: 100 }, { min: -3, max: 3 }));
};

const generateButterfly = (): Butterfly => {
  const glow = Array.from({ length: rand(2, 3, true) }).map(() => randGear({ min: 200, max: 400 }, { min: -0.5, max: 0.5 }));
  return {
    anchor: { x: rand(0, 2000), y: rand(100, 300) }, //
    position: { x: rand(0, 2000), y: rand(100, 300) },
    vector: { x: 0, y: 0 },
    flutter: generateFlutter(5),
    width: rand(1, 2.5), //rand(2, 5),
    // color: '#6a6868',
    color: hexToRgb('#837f6e'), //'#e6ea87',
    glowColor: hexToRgb('#cff87b'),
    depth: 0,
    glow,
    glowRadius: getGearsRadius(glow),
    shouldFollow: rand(0, 1) < 0.2
  };
};

const NightSwamp = () => {
  const $cvs = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  //   const [mouseEntered, setMouseEntered] = useState(false);
  const mouseEnteredRef = useRef(false);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const field = useMemo<GrassBlade[]>(() => {
    const length = Math.min(~~(width / 3), 350);
    const margin = 50;
    const gap = (margin + width + margin) / length;
    return Array.from({ length }).map((e, i) => {
      const blade = generateGrassBlade(width, height);
      blade.grass[0].x = -margin + i * gap;
      blade.grass[0].y = height;
      return blade;
    });
  }, [width, height]);

  const windGears = useRef([
    randGear({ min: 200, max: 200 }, { min: -0.5, max: -0.5 }), //
    randGear({ min: 80, max: 80 }, { min: 0.1, max: 0.1 }),
    randGear({ min: 200, max: 200 }, { min: -0.3, max: -0.3 }),
    randGear({ min: 30, max: 40 }, { min: 0.1, max: 0.5 })
  ]);
  const moon = useMemo(() => ({ x: width * 0.5, y: height * 0.8, width: width * 0.1 }), [width]);

  const butterflies = useMemo(() => {
    const length = ~~(width / 100);
    return Array.from({ length }).map((_, i) => {
      const b = generateButterfly();
      b.depth = i * 10 + rand(0, 5, true);
      return b;
    });
  }, [width]);

  useEffect(() => {
    if ($cvs.current) {
      const onMove = (e: MouseEvent) => {
        mouseX.current = e.offsetX;
        mouseY.current = e.offsetY;
      };
      const onResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight * 0.9);
      };
      const onEnter = () => {
        // setMouseEntered(true);
        mouseEnteredRef.current = true;
      };
      const onLeave = () => {
        // setMouseEntered(false);
        mouseEnteredRef.current = false;
      };
      $cvs.current.addEventListener('pointermove', onMove);
      $cvs.current.addEventListener('pointerenter', onEnter);
      $cvs.current.addEventListener('pointerleave', onLeave);
      window.addEventListener('resize', onResize);
      onResize();
      return () => {
        if ($cvs.current) {
          $cvs.current.removeEventListener('pointermove', onMove);
        }
      };
    }
  }, [$cvs]);

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0,
    freezeOnceVisible: false
  });

  useEffect(() => {
    if (isIntersecting) {
      let raf = 0;
      const ctx = $cvs.current.getContext('2d');
      //   let windAngle = 0;

      const clearCanvas = () => {
        ctx.clearRect(0, 0, $cvs.current.width, $cvs.current.height);
      };

      const renderGrassBlade = (grassblade: GrassBlade, index: number = 0) => {
        const w = getGearPosition(windGears.current, index);
        simulate(grassblade.grass, grassblade.springs, 0.1, -15);
        const d = grassblade.grass[0].x - mouseX.current;
        let windX = 0;
        const maxD = 200; //width * .2;
        // const nor = normalizeVector(w);

        if (mouseEnteredRef.current && mouseY.current > height * 0.5 && Math.abs(d) < maxD) {
          // user interacting with grass
          const dir = mouseX.current > grassblade.grass[0].x ? -1 : 1;
          const power = Math.pow(Math.abs(d), 0.25) * 1;
          windX = Math.abs(w.x) * 0.01 + power * dir;
        } else {
          // apply wind forces
          windX = w.x * 0.01;
        }

        for (let i = 1; i < grassblade.grass.length; i++) {
          grassblade.grass[i].x += windX / grassblade.grass[i].mass;
        }

        grassblade.ctx.clearRect(0, 0, grassblade.cvs.width, grassblade.cvs.height);
        //
        //
        //
        /*
        grassblade.ctx.fillStyle = grassblade.color;
        grassblade.ctx.beginPath();
        const points = grassblade.grass;
        const len = points.length;
        let i = 1;
        let point = points[0];

        grassblade.ctx.moveTo(point.x - point.width * 0.5, point.y);

        for (i = 1; i < len - 1; i++) {
          point = points[i];
          grassblade.ctx.lineTo(point.x - point.width * 0.5, point.y);
        }
        point = points[i];
        grassblade.ctx.lineTo(point.x, point.y);

        for (i = len - 1; i >= 0; i--) {
          point = points[i];
          grassblade.ctx.lineTo(point.x + point.width * 0.5, point.y);
        }
        grassblade.ctx.closePath();
        grassblade.ctx.fill();

        ctx.drawImage(grassblade.cvs, 0, 0);

        for (let i = 0; i < grassblade.dupes.length; i++) {
          ctx.drawImage(grassblade.cvs, grassblade.dupes[i].x, grassblade.dupes[i].y);
        }
        */

        ctx.fillStyle = grassblade.color;
        ctx.beginPath();
        const points = grassblade.grass;
        const len = points.length;
        let i = 1;
        let point = points[0];

        ctx.moveTo(point.x - point.width * 0.5, point.y);

        for (i = 1; i < len - 1; i++) {
          point = points[i];
          ctx.lineTo(point.x - point.width * 0.5, point.y);
        }
        point = points[i];
        ctx.lineTo(point.x, point.y);

        for (i = len - 1; i >= 0; i--) {
          point = points[i];
          ctx.lineTo(point.x + point.width * 0.5, point.y);
        }
        ctx.closePath();
        ctx.fill();
      };

      const renderBranch = () => {
        ctx.lineCap = 'round';

        let i = field.length;
        let butterflyIndex = butterflies.length - 1;

        while (i--) {
          renderGrassBlade(field[i], i);

          if (butterflyIndex > -1 && i < butterflies[butterflyIndex].depth) {
            renderButterfly(butterflies[butterflyIndex]);
            butterflyIndex--;
          }
        }
      };

      const renderButterfly = (b: Butterfly) => {
        if (Math.random() < 0.01) {
          //   b.flutter[rand(0, b.flutter.length - 1, true)].s = rand(-3, 3);
          const gearIndex = rand(0, b.flutter.length - 1, true);
          const gear = b.flutter[gearIndex];
          gear.s = rand(gear.args.speed.min, gear.args.speed.max);
          //   b.flutter[gearIndex].s = rand(-3, 3);
        }
        if (b.shouldFollow) {
          b.vector.x += (mouseX.current - b.position.x) * 0.02;
          b.vector.y += (mouseY.current - b.position.y) * 0.01;
        }
        b.vector.x *= 0.3;
        b.vector.y *= 0.3;
        b.anchor.x += b.vector.x;
        b.anchor.y += b.vector.y;

        const glow = advanceGears(b.glow, 10);

        const offset = { x: 0, y: 0 };

        for (let i = 0; i < b.flutter.length; i++) {
          const f = b.flutter[i];
          f.a += f.s;
          offset.x += Math.sin(f.a * RAD) * f.r;
          offset.y += Math.cos(f.a * RAD) * f.r;
        }
        b.position.x = b.anchor.x + offset.x;
        b.position.y = b.anchor.y + offset.y;

        b.vector.y -= (b.position.y - height * 0.8) * 0.01;
        b.vector.x -= (b.position.x - width * 0.8) * 0.01;

        // ctx.fillStyle = `rgb(0,0,0)`;
        // ctx.beginPath();
        // ctx.arc(b.position.x + 0.1, b.position.y + 0.5, b.width, 0, 1.3 * Math.PI);
        // ctx.closePath();
        // ctx.fill();

        const colorTerp = glow.x / b.glowRadius;
        ctx.fillStyle = `rgb(${interpolate(b.color.r, b.glowColor.r, colorTerp)},${interpolate(b.color.g, b.glowColor.g, colorTerp)},${interpolate(b.color.b, b.glowColor.b, colorTerp)})`;
        ctx.beginPath();
        ctx.arc(b.position.x, b.position.y, b.width, 0, 1.3 * Math.PI);
        ctx.closePath();
        ctx.fill();
      };

      const renderMoon = () => {
        if (moon.y > moon.width) {
          moon.y -= 0.03;
        }
        ctx.save();
        ctx.filter = 'blur(2px)';
        ctx.fillStyle = '#f6f7ed';
        ctx.beginPath();
        ctx.arc(moon.x, moon.y, moon.width, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
      };

      const renderGround = () => {
        const x = 0;
        const y = height * 0.85;
        const w = width;
        const h = height * 0.15;
        const grd = ctx.createLinearGradient(0, y, 0, y + h);
        grd.addColorStop(0, '#093b0a00');
        // grd.addColorStop(0.5, '#093b0aFF');
        grd.addColorStop(1, 'rgb(9, 21, 59)');
        ctx.fillStyle = grd;
        ctx.fillRect(x, y, w, h);
      };

      const renderForeground = () => {
        const x = 0;
        const y = height * 0.9;
        const w = width;
        const h = height * 0.1;
        const grd = ctx.createLinearGradient(0, y, 0, y + h);
        grd.addColorStop(0, 'rgba(64, 85, 25,0)');
        // grd.addColorStop(0.5, 'rgba(47, 124, 48, 0.5)');
        grd.addColorStop(1, 'rgb(61, 108, 38)');
        ctx.fillStyle = grd;
        ctx.fillRect(x, y, w, h);
      };

      const renderWind = () => {
        // if (Math.random() < 0.01) {
        //   const index = rand(0, windGears.current.length - 1, true);
        //   const gear = windGears.current[index];
        //   gear.s = rand(gear.args.speed.min, gear.args.speed.max);

        //   gear.s = rand(-3, 3);
        //   for (let i = 0; i < b.flutter.length; i++) {
        //     b.flutter[i].s = rand(-3, 3);
        //   }
        //   b.flutter = generateFlutter(5);
        // }
        advanceGears(windGears.current, 4);
      };

      const animate = () => {
        clearCanvas();
        renderMoon();
        renderGround();
        renderWind();
        renderBranch();
        renderForeground();
        raf = requestAnimationFrame(animate);
      };

      // pre-render to clean up initial state
      for (let i = 0; i < 50; i++) {
        let i = field.length;
        while (i--) {
          simulate(field[i].grass, field[i].springs, 0.5, -30);
        }
      }

      animate();

      return () => {
        cancelAnimationFrame(raf);
      };
    }
  }, [isIntersecting, width]);

  return (
    <div
      id='flower'
      ref={ref}
      style={{
        position: 'absolute',
        bottom: -1,
        left: 0,
        maxWidth: '100%',
        overflow: 'hidden'
        // transform: 'translateX(-50%)'
      }}
    >
      {/* {butterflies.current.map((b, i) => (
        <div key={`bf${i}`} className='butterfly' style={{ position: 'absolute', left: b.position.x, bottom: b.position.y, width: b.width, height: b.width }} />
      ))} */}
      <canvas ref={$cvs} width={width} height={height} />
      {/* <div id="log" className='p-2' style={{position:'fixed', top:'50%', left:0, background:'black'}}>Hi</div> */}
    </div>
  );
};

type RGB = { r: number; b: number; g: number };

function hexToRgb(hex: string) {
  const normalized = hex.replace('#', '');

  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized;

  const num = parseInt(full, 16);

  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}
