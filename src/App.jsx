import { useEffect, useMemo, useState } from 'react';

import tayloredImg from './assets/taylored.png';
import swellImg from './assets/swell.png';
import macysImg from './assets/macys.png';
import infosysImg from './assets/infosys.png';
import perryImg from './assets/perry.png';
import cvPdf from './assets/Jason_Contento_CV.pdf';

import { Aurora } from './components/Aurora';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Section } from './components/Section';
import { ProjectsGrid } from './components/ProjectsGrid';
import { AboutGrid } from './components/AboutGrid';
import { ContactCard } from './components/ContactCard';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';

const PROJECTS = [
  {
    title: "Macy's Special Projects",
    employer: "Macy's",
    role: 'Dev Team Lead',
    blurb: "Team dev lead for flagship seasonal campaigns across Macy's digital properties.",
    description:
      "As team development lead for Macy's special projects, I led builds for major seasonal campaigns including Holiday, Black Friday, July 4th, and the Thanksgiving Parade. I helped steer the transition from Flash experiences to modern HTML, WebGL, and JavaScript, keeping the work highly interactive while improving performance and reach.",
    tags: ['Team Lead', 'Flash', 'HTML', 'WebGL', 'JavaScript'],
    live: '',
    code: '',
    badge: 'Enterprise',
    image: macysImg
  },
  {
    title: 'Infosys Rapid Prototyping',
    employer: 'Infosys',
    role: 'Technical Director',
    blurb: 'Technical Director building rapid prototypes for major enterprise clients.',
    description:
      'As a Technical Director at Infosys, I led the creation of rapid, high-fidelity prototypes for large corporate clients. I worked within a full enterprise pipeline alongside brilliant designers, engineers, and stakeholders to validate concepts quickly and translate them into production-ready directions.',
    tags: ['Technical Director', 'Prototyping', 'Enterprise', 'HTML', 'JavaScript'],
    live: '',
    code: '',
    badge: 'Enterprise',
    image: infosysImg
  },
	  {
	    title: 'Perry Marketing Analytics',
	    employer: 'Perry Marketing',
	    role: 'Analytics & Reporting',
	    blurb: 'Apps Script, BigQuery, and Looker Studio dashboards for account teams.',
	    description:
	      'At Perry Marketing I focus on analytics for account management—using Google Apps Script, BigQuery, and Looker Studio to stitch together data and build clear, informative infographics and dashboards that help account teams see performance at a glance.',
	    tags: ['Apps Script', 'BigQuery', 'Looker Studio', 'Analytics'],
	    live: '',
	    code: '',
	    badge: 'Analytics',
	    image: perryImg
	  },
  {
    title: 'Swell',
    blurb: 'Led web development across the Swell product ecosystem.',
    description: 'As lead web developer for Swell, I owned all web-facing properties: the web version of the app, the corporate website, and the developer documentation. I also contributed to the Flutter-based mobile app and handled UX/UI design to keep the experience consistent across platforms.',
    tags: ['Lead Developer', 'React', 'Next.js', 'Flutter', 'UX/UI'],
    live: '',
    code: '',
    badge: 'Lead',
    image: swellImg
  },
  {
    title: 'Taylored Powersports',
    blurb: 'WooCommerce storefront with custom PHP and UX for power sports shoppers.',
    description: 'A WooCommerce ecommerce site for a power sports brand. I handled the PHP store integration, vehicle product search, and UX design, focusing on clear navigation, product discovery, and a smooth checkout.',
    tags: ['PHP', 'WooCommerce', 'WordPress', 'UX Design'],
    live: 'https://tayloredpowersports.com/',
    code: '',
    badge: 'Client',
    image: tayloredImg
  }
];

export default function App() {
  const [active, setActive] = useState(null);
  const year = useMemo(() => new Date().getFullYear(), []);

  // Keyboard shortcuts: 1/2/3 to jump sections, ESC closes modal
  useEffect(() => {
    const onKeyDown = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.key === '1') window.location.hash = '#projects';
      if (e.key === '2') window.location.hash = '#about';
      if (e.key === '3') window.location.hash = '#contact';
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <Aurora />
      <Header
        name='Jason Contento'
        subtitle='Developer • Designer • Builder'
        nav={[
          { href: '#projects', label: 'Projects', kbd: '1' },
          { href: '#about', label: 'About', kbd: '2' },
          { href: '#contact', label: 'Contact', kbd: '3' }
        ]}
      />

      <div className='container'>
        <main id='top'>
          <Hero
            availability='Available for freelance & full-time'
            headlineTop='Make the web feel'
            headlineAccent='expensive'
            lead='I build fast, polished experiences: landing pages, product UIs, and interactive prototypes. I care about motion, accessibility, and performance.'
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

          <Section id='projects' title='Selected projects' subtitle='Click a card for details'>
            <ProjectsGrid projects={PROJECTS} onOpen={(p) => setActive(p)} />
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

          <Footer name='Your Name' year={year} />
        </main>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </>
  );
}
