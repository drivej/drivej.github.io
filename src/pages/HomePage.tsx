import { useState } from 'react';
import { Link } from 'react-router-dom';
import cvPdf from '../assets/Jason_Contento_CV.pdf';
import profileImg from '../assets/profile.png';
import { AboutGrid } from '../components/AboutGrid';
import { ContactCard } from '../components/ContactCard';
import { Footer } from '../components/Footer';
import { Hero } from '../components/Hero';
import { Modal } from '../components/Modal';
import { ProjectsGrid } from '../components/ProjectsGrid';
import { Section } from '../components/Section';
import { PROJECTS } from './PROJECTS';

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
          lead='I design and build websites, web-apps, maintainable frontends, dashboards, and product UIs that are straightforward, performant, and reliable in production.'
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
            { title: '20+ years', text: 'Shipping web products and design systems.' },
            { title: 'Performance-first', text: 'KISS builds, clean CSS, (mostly) sensible animations.' },
            { title: 'Toolbox', text: 'TypeScript • React • Node • Figma • AI • PHP' }
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
            <h2>Before this gets too serious...</h2>
            <p className='lead'>The lab is where the fun stuff is. Check it out!</p>
            <p>
              <Link className='btn primary' to='/lab'>
                Visit the Lab
              </Link>
            </p>
          </div>
        </Section>

        <Section id='projects' title='Experience' subtitle='Click image to launch'>
          <ProjectsGrid projects={PROJECTS} />
        </Section>

        <Section id='previous_work' title='Other Work' subtitle='Various projects'>
          <div className='card list'>
            {/* <img src={npmImg} alt='npm logo' width={100} /> */}
            <h3>Websites</h3>
            <ul>
              <li>Sunday in the Park with George (Broadway show, nominated for a Webby)</li>
              <li>Blue Man Group</li>
              <li>Lion King (Broadway show)</li>
              <li>Phantom of the Opera (Flash seating chart)</li>
              <li>Mary Poppins (Broadway show)</li>
              <li>August: Osage County (Broadway show)</li>
              <li>Stomp (Broadway show)</li>
              <li style={{ color: '#59bbc6' }}>
                I know what you're thinking, "Really, you worked on all these well known broadway show's websites?". I can barely believe it myself. I was in NYC for a long time and was lucky enough to work with <i>Situation Marketing</i>, an agency who designed websites for major theaters. These were all Flash sites,
                which was my specialty for a long time. So, when they needed something special, they brought me in.
              </li>
            </ul>
            <h3>Web Ads</h3>
            <ul>
              <li>Emigrant Bank</li>
              <li>Cohen's Fashion Optical</li>
              <li>Trump University</li>
              <li>Grey Goose</li>
              <li>Maxell</li>
            </ul>
          </div>
        </Section>

        <Section id='tools' title='Tooling' subtitle='Open-source utilities I maintain'>
          <div className='card list'>
            {/* <img src={npmImg} alt='npm logo' width={100} /> */}
            <h3>GQL Type Safety Plugin</h3>
            <p>Quite possibly the nerdiest code I've ever written. This was initially created as a way to force VS Code to give me hints when building GQL object style queries.</p>

            <p>
              A lightweight plugin for GraphQL Code Generator that makes fragments easy to define, reuse, and keep in sync. It keeps your fragments DRY and type‑safe as your schema grows, centralizing shared field selections so queries, mutations, and generated TypeScript types all stay aligned.{' '}
              <span style={{ color: '#59bbc6' }}>And... breath. That was a long run on sentence.</span>
            </p>
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
          <div style={{ display: 'flex', gap: 30 }}>
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
              <p>I am an acutual human being - not an AI avatar. So I do show up to work looking something like this...</p>
              <h4>Favorite Things: </h4>
              <ul>
                <li>
                  My wife &amp; kids <small>(*required by law to list this here)</small>
                </li>
                <li>Building anything</li>
                <li>Italy</li>
                <li>Pizza</li>
              </ul>
              <h4>Meh List: </h4>
              <ul>
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
