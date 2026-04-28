import '../styles/hamburgers.css';
import '../styles/navgrid.css';

import { CSSProperties, MouseEventHandler, ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';
import { SocialIcon } from 'react-social-icons';
import { useIntersectionObserver } from 'usehooks-ts';

import cvPdf from '../assets/Jason_Contento_CV.pdf';
import { HappySwamp, randGear } from '../components/HappySwamp';
import { Icon } from '../components/Icon';
import { Tag, Tags } from '../components/Tag';

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
      <SidebarMenu />
      <Header />
      <Section id='tldr' title={'TL;DR'} color={colors.blue} content={<Introduction />} />
      <Section id='skills' title={'My Skills'} color={colors.green} content={<MyStats />} />
      <Section id='case_study' title={'Case Study'} color={colors.purple} content={<CaseStudies />} />
      <Section id='reviews' title={'Reviews'} color={colors.orange} content={<Reviews />} />
      <Swamp />
      <Footer />
    </NavProvider>
  );
};

const Swamp = () => {
  return (
    <div className='sky-gradient' style={{ position: 'relative' }}>
      <h2 id='thankyou' className='flex-col gap-1 p-3' style={{ position: 'absolute', top: '10vh', right: 0, width: '100%', textAlign: 'center', fontFamily: 'courier', zIndex: 10 }}>
        <a className='stay-connected-btn' href='mailto:drivej@hotmail.com'>
          st<span>@</span>y connected
        </a>
        <div className='flex-row gap-2 flex-center'>
          <SocialIcon url={linkedInUrl} borderRadius='6px' />
          <SocialIcon url={'mailto:drivej@hotmail.com'} borderRadius='6px' />
          <SocialIcon url={'https://github.com/drivej'} borderRadius='6px' />
        </div>
      </h2>
      <HappySwamp />
    </div>
  );
};

const Section = ({ id, title, color, content }: { id: string; title: string; color: string; content: ReactNode }) => {
  return (
    <div id={id} className='section-block underline' style={{ '--bg-color': color } as CSSProperties}>
      <div>
        <div>
          <SidebarTitle color={color}>{title}</SidebarTitle>
        </div>
      </div>
      <div>{content}</div>
    </div>
  );
};

const Header = () => {
  return (
    <div className='header-bar p-1 underline' style={{ position: 'sticky', top: 0, zIndex: 999, background: '#0f1a49', textAlign: 'center', color: 'rgba(255,255,255,0.8)' }}>
      <p className='flex-row gap-2 flex-center desktop-only'>
        <span>Jason Contento</span>|<span>Frontend Dev</span>|<span>NY Metro</span>
      </p>
      <p className='flex-row gap-1 flex-end mobile-only'>
        <span>Jason Contento</span>|<span>Frontend Dev</span>|<span>NYC</span>
      </p>
    </div>
  );
};

const Footer = () => {
  return (
    <div className='p-1' style={{ background: '#0f1a49', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 9 }}>
      &copy; Jason Contento 2026
    </div>
  );
};

const SidebarTitle = (p: { children: ReactNode; color: string }) => {
  return (
    <div className='sidebar-title' style={{ '--bg-color': p.color } as CSSProperties}>
      <h1 style={{ color: p.color }}>{p.children}</h1>
      <NavGrid />
    </div>
  );
};

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

const SidebarMenu = () => {
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

  return (
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
        </div>
        <hr />
        <div className='flex-col gap-3'>
          <p>
            Jason Contento
            <br />
            NY Metro
          </p>
        </div>
      </div>
      <div className='flex-row gap-1'>
        <a className='resume-link' href={cvPdf} target='_blank' title='resume'>
          <Icon name='download' />
          Resume
        </a>
        <SocialIcon url={'mailto:drivej@hotmail.com'} borderRadius='6px' title='email' />
        <SocialIcon url={linkedInUrl} borderRadius='6px' title='linkedIn' />
        <SocialIcon url={'https://github.com/drivej'} title='github' borderRadius='6px' />
      </div>
    </Sidenav>
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

const Introduction = () => {
  return (
    <div className='flex-col gap-3' style={{ maxWidth: 800 }}>
      <div className='flex-row gap-2' style={{ alignItems: 'center' }}>
        <div className='circle desktop-only' style={{ width: 90, alignSelf: 'start' }}>
          <h3>JC</h3>
        </div>
        <div className='flex-col gap-1'>
          <h1>Jason Contento</h1>
          <p className='flex-row gap-1'>
            <span>&nbsp;Design Engineer</span>|<span>NY Metro</span>
          </p>
          <div className='flex-row gap-1 flex-wrap'>
            <Tag>AI Coding</Tag>
            <Tags.UXUI />
            <Tags.React />
            <Tags.TypeScript />
            <Tags.CSS3 />
            <Tags.GQL />
            <Tags.NodeJS />
          </div>
        </div>
      </div>
      <hr />
      <div className='flex-col gap-1'>
        <div className='flex-col gap-2'>
          <div className='p-3' style={{ backgroundColor: 'rgba(40, 125, 215, 0.2)', borderRadius: 20 }}>
            <p>AI is reshaping how skills and intellect are valued. I leverage AI tools to enhance productivity while aligning with product goals and collaborating across teams to deliver meaningful outcomes.</p>
          </div>
          <br />
          <h2>How Will I Contribute?</h2>
          <p>I will be the Development Team Lead with a focus on UI/UX and Design for web using NodeJs, React, GraphQL.</p>
          <p>I will optimize with AI driven development, agility, and future proofing.</p>
          <p>I will use my experience with complex organizations, time crunches, and design requirements to achieve your goals.</p>
        </div>
      </div>

      <div className='flex-row gap-1'>
        <a className='resume-link' href={cvPdf} target='_blank' title='resume'>
          <Icon name='download' />
          Resume
        </a>
        <SocialIcon url={'mailto:drivej@hotmail.com'} borderRadius='6px' title='email' />
        <SocialIcon url={linkedInUrl} borderRadius='6px' title='linkedIn' />
        <SocialIcon url={'https://github.com/drivej'} title='github' borderRadius='6px' />
      </div>
    </div>
  );
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

const MyStats = () => {
  return (
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
      <hr />
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
      <hr />
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
  );
};

const CaseStudies = () => {
  const [showIndex, setShowIndex] = useState(0);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div className='flex-row gap-2'>
        <button className='case-study-btn btn' data-selected={showIndex == 0 ? '1' : '0'} onClick={() => setShowIndex(0)}>
          Digital Marketing Agency
        </button>
        <button className='case-study-btn btn' data-selected={showIndex == 1 ? '1' : '0'} onClick={() => setShowIndex(1)}>
          Social Media Startup
        </button>
      </div>
      <div className='p-3' />
      <div style={{ display: showIndex == 0 ? '' : 'none' }}>
        <CaseStudy1 />
      </div>
      <div style={{ display: showIndex == 1 ? '' : 'none' }}>
        <CaseStudy2 />
      </div>

      <div style={{ flex: '1 1 auto' }} />
    </div>
  );
};

const CaseStudy1 = () => {
  return (
    <div className='flex-col gap-3' style={{ maxWidth: 800 }}>
      <div className='flex-col gap-1'>
        <h2>Custom Analytics & Reporting System</h2>
        <p>Digital Marketing Agency</p>
      </div>
      <hr />
      <div className='flex-col gap-2 Xp-1'>
        <div className='flex-col gap-1'>
          {/* <h3>Problem</h3> */}
          <p className='Xps-1'>
            The client provides excellent online marketing services. They go to bat for their clients, delivering far beyond what many larger agencies would offer. However, their reporting process required manual aggregation of data from multiple sources. They were also expanding from a few dozen clients to a few
            hundred. This was unsustainable.
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
  );
};

const CaseStudy2 = () => {
  return (
    <div className='flex-col gap-3' style={{ maxWidth: 800 }}>
      <div className='flex-col gap-1'>
        <h2>Web Version of Mobile App</h2>
        <p>Social Media Startup</p>
      </div>
      <hr />
      <div className='flex-col gap-2 Xp-1'>
        <div className='flex-col gap-1'>
          <p className='Xps-1'>The client built an amazing socila media app using audio as the primary post method. This was a fantasic app and an excellent opportunity to work with the latest web audio tech.</p>
        </div>

        <div className='flex-col gap-1 ps-1'>
          <li>
            <p>Aligned with app dev team to achieve as much parity with the app as possible</p>
          </li>
          <li>
            <p>Evolved with the Web Audio API that has patchy support across browsers</p>
          </li>
          <li>
            <p>Developed and maintained full stack with AWS Lambda/Node for 3 web properties</p>
          </li>
          <li>
            <p>Built a react-query based backbone for the GQL API integration</p>
          </li>
        </div>
      </div>
    </div>
  );
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

const Reviews = () => {
  return (
    <div className='flex-row flex-wrap gap-2' style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Review author='Intern' border={colors.green}>
        The best <i>I've</i> ever seen
      </Review>
      <Review author='Project Manager' border={colors.orange}>
        Stays calm while others panic.
        <br />
        Also, stays calm while others toil.
      </Review>
      {/* <Review author='Dept. VP' border={colors.blue}>
        Get back to work!
      </Review> */}
      <Review author='HR' border={colors.purple}>
        We can only confirm that he worked here.
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
  );
};
