const infosysImg = new URL('../assets/infosys.png', import.meta.url).href;
import cvPdf from '../assets/Jason_Contento_CV.pdf';
import macysImg from '../assets/macys.png';
import perryImg from '../assets/perry.png';
import swellImg from '../assets/swell.png';

const tayloredImg = new URL('../assets/taylored.png', import.meta.url).href;

import { useMemo, useState } from 'react';
import { AboutGrid } from '../components/AboutGrid';
import { ContactCard } from '../components/ContactCard';
import { Footer } from '../components/Footer';
import { Hero } from '../components/Hero';
import { Modal } from '../components/Modal';
import { ProjectsGrid } from '../components/ProjectsGrid';
import { Section } from '../components/Section';

const PROJECTS = [
  {
    title: "Macy's Special Projects",
    employer: "Macy's",
    role: 'Development Manager',
    blurb: "Team dev lead for flagship seasonal campaigns across Macy's digital properties.",
    description:
      "As team development lead for Macy's special projects, I led builds for major seasonal campaigns including Holiday, Black Friday, July 4th, and the Thanksgiving Parade. I helped steer the transition from Flash experiences to modern HTML, WebGL, and JavaScript, keeping the work highly interactive while improving performance and reach.",
    tags: ['Dev Manager', 'Flash', 'HTML', 'WebGL', 'JavaScript', 'JIRA'],
    live: '',
    code: '',
    badge: '',
    image: macysImg,
    link: 'https://www.macys.com/'
  },
  {
    title: 'Infosys Rapid Prototyping',
    employer: 'Infosys',
    role: 'Technical Director',
    blurb: 'Build enterprise web apps for big players.',
    description: 'As Technical Director at Infosys, I led the creation of ecom websites for corporate clients. I worked within a full enterprise pipeline alongside brilliant designers, engineers, and stakeholders to validate concepts quickly and translate them into production-ready directions.',
    tags: ['Technical Director', 'Prototyping', 'Enterprise', 'HTML', 'JavaScript', 'JIRA', 'Confluence'],
    live: '',
    code: '',
    badge: '',
    image: infosysImg,
    link: 'https://www.infosys.com/'
  },
  {
    title: 'Perry Marketing Analytics',
    employer: 'Perry Marketing',
    role: 'Analytics & Reporting',
    blurb: 'Apps Script, BigQuery, and Looker Studio dashboards for account teams.',
    description: 'At Perry Marketing I focus on analytics for account management using Google Apps Script, BigQuery, and Looker Studio to stitch together data and build clear, informative infographics and dashboards that help account teams see performance at a glance.',
    tags: ['Apps Script', 'BigQuery', 'Looker Studio', 'Analytics'],
    live: '',
    code: '',
    badge: '',
    image: perryImg,
    link: 'https://www.perrymarketing.com/'
  },
  {
    title: 'Swell',
    role: 'Full-stack Developer',
    blurb: 'Led web development across the Swell product ecosystem.',
    description:
      'As lead web developer for Swell, I owned all web-facing properties: the web version of the app, the corporate website, and the developer documentation. I also contributed to the Flutter-based mobile app and handled UX/UI design to keep the experience consistent across platforms. Unfortunately, this project has been sunset.',
    tags: ['Lead Developer', 'React', 'Next.js', 'Flutter', 'UX/UI', 'JIRA', 'Confluence'],
    live: '',
    code: '',
    badge: '',
    image: swellImg,
    link: 'https://www.swell.life/'
  },
  {
    title: 'Taylored Powersports',
    role: 'Full-stack Developer',
    blurb: 'WooCommerce storefront with custom PHP and UX for power sports shoppers.',
    description: 'A WooCommerce ecommerce site for a power sports brand. I handled the PHP store integration, vehicle product search, and UX design, focusing on clear navigation, product discovery, and a smooth checkout.',
    tags: ['PHP', 'WooCommerce', 'Spark Shipping', 'WordPress', 'UX Design'],
    live: 'https://tayloredpowersports.com/',
    code: '',
    badge: '',
    image: tayloredImg,
    link: 'https://tayloredpowersports.com/'
  }
];

export default function HomePage() {
//   const [active, setActive] = useState(null);
//   const [isCandleOpen, setIsCandleOpen] = useState(false);
//   const [isLeavesOpen, setIsLeavesOpen] = useState(false);
//   const [viewport, setViewport] = useState(() => ({
//     width: typeof window !== 'undefined' ? window.innerWidth : 0,
//     height: typeof window !== 'undefined' ? window.innerHeight : 0
//   }));
  const year = useMemo(() => new Date().getFullYear(), []);

  // Keyboard shortcuts: 1/2/3 to jump sections, ESC closes modal
//   useEffect(() => {
//     const onKeyDown = (e: { key: string }) => {
//       const tag = document.activeElement?.tagName;
//       if (tag === 'INPUT' || tag === 'TEXTAREA') return;

//       if (e.key === '1') window.location.hash = '#projects';
//       if (e.key === '2') window.location.hash = '#about';
//       if (e.key === '3') window.location.hash = '#contact';
//       if (e.key === 'Escape') {
//         setActive(null);
//         setIsCandleOpen(false);
//         setIsLeavesOpen(false);
//       }
//     };
//     window.addEventListener('keydown', onKeyDown);
//     return () => window.removeEventListener('keydown', onKeyDown);
//   }, []);

  // Keep LeavesAndSnowReact sized to the current viewport
//   useEffect(() => {
//     if (typeof window === 'undefined') return;

//     const onResize = () => {
//       setViewport({
//         width: window.innerWidth,
//         height: window.innerHeight
//       });
//     };

//     window.addEventListener('resize', onResize);
//     return () => window.removeEventListener('resize', onResize);
//   }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='container'>
      <main id='top'>
        <Hero
          availability='Available for freelance & full-time'
          headlineTop='Practical'
          headlineAccent='frontend + UX'
          lead='I design and build maintainable frontends, dashboards, and product UIs that are straightforward, performant, and reliable in production.'
          ctas={[
            { variant: 'primary', href: '#projects', label: 'See projects', icon: 'plus' },
            { variant: 'secondary', href: '#contact', label: 'Contact me', icon: 'mail' },
            {
              variant: 'secondary',
              href: cvPdf,
              label: 'Resume',
              icon: 'download'
            }
          ]}
          stats={[
            { title: '15+ years', text: 'Shipping web products and design systems.' },
            { title: 'Performance-first', text: 'KISS builds, clean CSS, sensible animations.' },
            { title: 'Toolbox', text: 'TypeScript • React • Node • Figma • Photoshop' }
          ]}
        />

        <div
          style={{
            marginTop: 12,
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap'
          }}
        >
          {/* <button type='button' className='btn' onClick={() => setIsCandleOpen(true)}>
            Light the candles
          </button>
          <button type='button' className='btn' onClick={() => setIsLeavesOpen(true)}>
            Let it snow
          </button>
          {isModalOpen ? 1 : 0}
          <button onClick={() => setIsModalOpen((v) => !v)}>Open Portal Modal</button> */}
        </div>

        <Section id='projects' title='Experience' subtitle='Click a card for details'>
          <ProjectsGrid projects={PROJECTS} />
        </Section>

        <Section id='about' title='About' subtitle='What I do & how I work'>
          <AboutGrid />
        </Section>

        <Section id='contact' title='Contact' subtitle='Fastest reply via email'>
          <ContactCard
            email='drivej@hotmail.com'
            links={[
              { label: 'GitHub', href: 'https://github.com/drivej' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jason-contento-9826597/' }
            ]}
          />
        </Section>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2>Portal Modal</h2>
          <p>This modal is rendered outside the app's root DOM node!</p>
        </Modal>

        <Footer name='Contento Interactive' year={year} />
      </main>
    </div>
  );
}
