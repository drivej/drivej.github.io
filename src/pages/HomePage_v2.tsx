import { createContext, CSSProperties, MouseEventHandler, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import cvPdf from '../assets/Jason_Contento_CV.pdf';
import { Icon } from '../components/Icon';
import { Tag, Tags } from '../components/Tag';
import '../styles/navgrid.css';

const linkedInUrl = 'https://www.linkedin.com/in/jason-contento-9826597/';
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
              <h2 style={{ color: colors.green }}>My Skills</h2>
            </a>
            <a href='#case_study' onClick={onClickNavItem}>
              <h2 style={{ color: colors.purple }}>Case Study</h2>
            </a>
            <a href='#reviews' onClick={onClickNavItem}>
              <h2 style={{ color: colors.orange }}>Reviews</h2>
            </a>
            {/* <a href='#tough_crowd' onClick={onClickNavItem}>
              <h2 style={{ color: colors.yellow }}>Tough Crowd</h2>
            </a> */}
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
              <div className='circle' style={{ width: 90, alignSelf:'start' }}>
                <h3>JC</h3>
              </div>
              <div className='flex-col gap-1'>
                <h1>Jason Contento</h1>
                <div className='flex-row gap-1 flex-wrap'>
                  <Tag url='https://www.css3.info/'>AI Coding</Tag>
                  <Tags.UXUI />
                  <Tags.React />
                  <Tags.TypeScript />
                  <Tags.CSS3 />
                  {/* <Tags.Canvas /> */}
                  {/* <Tags.WebAudio /> */}
                  <Tags.GQL />
                  <Tags.NodeJS />
                  {/* <Tags.ThreeJS /> */}
                </div>
              </div>
            </div>
            <hr />
            <div className='flex-col gap-1'>
              <div className='flex-col gap-2'>
                <h2>How Will I Contribute?</h2>
                <p>I will be the Development Team Lead with a focus on UI/UX and Design for web using NodeJs, React, GraphQL.</p>
                <p>I will optimize with AI driven development, agility, and future proofing.</p>
                <p>I will use my experience with complex organizations, time crunches, and design requirements to achieve our goals.</p>
              </div>
            </div>
            {/* <hr /> */}

            {/* <hr /> */}
            {/* <div className='flex-col gap-1'>
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
            </div> */}
            {/* <hr /> */}
            <div className='flex-row flex-wrap gap-2'>
              <a className='btn primary' href='mailto:drivej@hotmail.com' style={{ paddingLeft: 30, paddingRight: 30 }}>
                Hire Me
              </a>
              <a className='btn primary' href={linkedInUrl}>
                LinkedIn
              </a>
              <a className='btn primary' href={cvPdf}>
                <Icon name='download' />
                Download Resume
              </a>
              <a className='btn primary' href='mailto:drivej@hotmail.com'>
                <Icon name='mail' />
                drivej@hotmail.com
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
              <h1 className='text-color-2'>My Skills</h1>
              <NavGrid />
            </div>
          </div>
          <div className='flex-col gap-3'>
            <div className='flex-col gap-3' style={{ '--bar-color': '226, 130, 21' } as CSSProperties}>
              <h2 className='Xunderline gap-2'>Experience</h2> 
              {/* <hr /> */}
              <div className='progress-bars-container'>
                <ProgressInfo title='Team Lead' description='&gt;20 years' progress={75} />
                <ProgressInfo title='Education' description='Masters Work' progress={70} />
                <ProgressInfo title='Book Smarts' description='Fake it' progress={42} />
                <ProgressInfo title='Street Smarts' description='Make it' progress={85} />
              </div>
            </div>
{/* <hr /> */}
            <div className='flex-col gap-3'>
              <h2 className='Xunderline gap-2'>Technology</h2>
              {/* <hr /> */}
              <div className='progress-bars-container'>
                <ProgressInfo title='UI / UX' description='React / CSS3' progress={50} />
                <ProgressInfo title='Rapid Prototyping' description='AI / Design Systems' progress={90} />
                <ProgressInfo title='API Integration' description='GQL / Node.js' progress={63} />
                {/* <ProgressInfo title='React' description='' progress={87} />
                <ProgressInfo title='CSS3' description='' progress={70} />
                <ProgressInfo title='NodeJS' description='' progress={71} /> */}
                <ProgressInfo title='Printer Repair' description='Check Paper / Power off then on' progress={11} />
              </div>
            </div>
{/* <hr /> */}
            <div className='flex-col gap-3' style={{ '--bar-color': '58, 146, 207' } as CSSProperties}>
              <h2 className='Xunderline gap-1'>Traits</h2>
              {/* <hr /> */}
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
              <div className='flex-col gap-3'>
                <div className='flex-col gap-1'>
                  <h2>Custom Analytics & Reporting System</h2>
                  <p>Digital Marketing Agency</p>
                </div>
                <hr />
                <div className='flex-col gap-2 Xp-1'>
                  <div className='flex-col gap-1'>
                    {/* <h3>Problem</h3> */}
                    <p className='Xps-1'>
                      Perry Marketing provides excellent online marketing services. They go to bat for their clients, delivering far beyond what many larger agencies would offer. However, their reporting process required manual aggregation of data from multiple sources. They were also expanding from a few dozen clients
                      to a few hundred. This was unsustainable.
                    </p>
                  </div>

                  <div className='flex-col gap-1 ps-1'>
                    <li>
                      <p>Layed the groundwork with AI driven architecture for an AI driven future.</p>
                    </li>
                    <li>
                      <p>Automated multi-source analytics reporting for a growing client base (10s → 100s), eliminating manual data aggregation</p>
                    </li>
                    <li>
                      <p>Built a scalable data pipeline using Google BigQuery, Google Apps Script, Looker, and Google Sheets</p>
                    </li>
                    <li>
                      <p>Defined source-of-truth across lead channels (forms, calls, manual validation) and centralized data into BigQuery for unified reporting</p>
                    </li>
                    <li>
                      <p>Developed and optimized SQL queries powering daily, weekly, and annual performance dashboards</p>
                    </li>
                    <li>
                      <p>Designed flexible data architecture to support future AI-driven insights, forecasting, and trend analysis</p>
                    </li>
                  </div>

                  {/* <div className='flex-col gap-1'>
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
                </div> */}
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
          <div>
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

        {/* <section id='tough_crowd' className='underline' style={{ '--bg-color': '#f5c615' } as CSSProperties}>
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
        </section> */}

        <div className='sky-gradient' style={{ position: 'relative' }}>
          <h2 id='thankyou' className='p-3' style={{ position: 'sticky', top: '20vh', right: 0, width: '100%', textAlign: 'center', fontFamily: 'courier', zIndex: 10 }}>
            <a
              className='stay-connected-btn'
              // href='mailto:drivej@hotmail.com'
              href={linkedInUrl}
              target='linkedin'
            >
              st<span>@</span>y connected
              <br />
            </a>
          </h2>
          <HappySwamp />
        </div>
        <div className='p-1' style={{ background: '#0f1a49', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 9 }}>
          &copy; Jason Contento 2026
        </div>

        {/* <BreakMessage /> */}
      </div>
    </>
  );
};

import { ParallaxProvider, useParallax } from 'react-scroll-parallax';
import { HappySwamp, randGear } from '../components/HappySwamp';
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
