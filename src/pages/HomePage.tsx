const infosysImg = new URL('../assets/infosys.png', import.meta.url).href;
// const npmImg = new URL('../assets/Npm-logo.png', import.meta.url).href;
const tayloredImg = new URL('../assets/taylored.png', import.meta.url).href;

import cvPdf from '../assets/Jason_Contento_CV.pdf';
import macysImg from '../assets/macys.png';
// import npmImg from '../assets/Npm-logo.png';
import perryImg from '../assets/perry.png';
import swellImg from '../assets/swell.png';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import profileImg from '../assets/profile.png';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className='container'>
      <main id='top'>
        <Hero
          availability='Available for freelance & full-time'
          headlineTop='Practical'
          headlineAccent='frontend + UX'
          lead='I design and build maintainable frontends, dashboards, and product UIs that are straightforward, performant, and reliable in production.'
          ctas={[
            {
              variant: 'primary',
              href: cvPdf,
              label: 'Download Resume',
              icon: 'download'
            },
            {
              variant: 'secondary',
              href: '#projects',
              label: 'See projects',
              icon: 'plus',
              onClick: (e) => {
                e.preventDefault();
                scrollToSection('projects');
              }
            },
            {
              variant: 'secondary',
              href: '#contact',
              label: 'Contact me',
              icon: 'mail',
              onClick: (e) => {
                e.preventDefault();
                scrollToSection('contact');
              }
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
        ></div>

        <Section id='labinfo' title='The Lab' subtitle='Fun stuff'>
          <div className='card list'>
            <h3>Before this gets too serious...</h3>
            <p>The lab is where the fun stuff is. Check it out!</p>
            <p>
              <Link className='btn primary' to='/lab'>
                Visit the Lab
              </Link>
            </p>
          </div>
        </Section>

        <Section id='projects' title='Experience' subtitle='Click a card for details'>
          <ProjectsGrid projects={PROJECTS} />
        </Section>

        <Section id='tools' title='Tooling' subtitle='Open-source utilities I maintain'>
          <div className='card list'>
            {/* <img src={npmImg} alt='npm logo' width={100} /> */}
            <h3>GQL Type Safety Plugin</h3>
            <p>Quite possibly the nerdiest code I've ever written. This was initially created as a way to force VS Code to give me hints when building GQL object style queries.</p>

            <p>A lightweight plugin for GraphQL Code Generator that makes fragments easy to define, reuse, and keep in sync. It keeps your fragments DRY and type‑safe as your schema grows, centralizing shared field selections so queries, mutations, and generated TypeScript types all stay aligned.</p>
            <p>
              <a href='https://www.npmjs.com/package/@drivej/graphql-codegen-fragments-plugin' target='_blank' rel='noreferrer' className='btn primary'>
                @drivej/graphql-codegen-fragments-plugin
              </a>
            </p>
          </div>
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

        <Section id='hello' title='Full disclosure...' subtitle='*This is an accurate likeness'>
          <div style={{display:'flex', gap:30}}>
            <div
              className='card'
              style={{
                border: '4px solid white', //
                aspectRatio: '1.5/2',
                backgroundImage: `url(${profileImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                minHeight: 200,
                maxWidth: 200
              }}
            >
              {/* <div style={{ aspectRatio: '1.5/2', backgroundImage: `url(${profileImg})`, backgroundSize: 'cover', backgroundPosition: 'center', width: 100 }}></div> */}
            </div>
            <div>
              <p>I am an acutual human being - not an AI avatar. So I do show up at the office sometimes looking something like this...</p>
              <h4>Favorite Things: </h4>
              <ul style={{lineHeight:1.5}}>
                <li>My wife &amp; kids <small>(*required by law to list this here)</small></li>
                <li>Building anything</li>
                <li>Italy</li>
                <li>Pizza</li>
              </ul>
              <h4>Meh List: </h4>
              <ul style={{lineHeight:1.5}}>
                <li>Artichokes</li>
                <li>Paperwork</li>
                <li>Delayed flights</li>
              </ul>
            </div>
          </div>
        </Section>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2>Portal Modal</h2>
          <p>This modal is rendered outside the app's root DOM node!</p>
        </Modal>
      </main>
      <Footer />
    </div>
  );
}
