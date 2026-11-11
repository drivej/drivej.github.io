import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
import cvPdf from '../assets/Jason_Contento_CV.pdf';
import { HappySwamp } from '../components/HappySwamp';
import { Icon } from '../components/Icon';
import './HomePage_v3.scss';

// Switch to 'colors' to restore the original animated hero background.
const heroBackground: 'grass' | 'colors' = 'grass';

export default function HomePageStateStreet() {
  const experienceRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = experienceRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)));
      const shift = reducedMotion.matches ? 50 : 20 + progress * 60;
      section.style.setProperty('--glass-position', `${shift}%`);
      section.style.setProperty('--city-offset', `${reducedMotion.matches ? 0 : (progress - 0.5) * 80}px`);
      section.style.setProperty('--card-position', `${reducedMotion.matches ? 50 : 75 - progress * 50}%`);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    reducedMotion.addEventListener('change', scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      reducedMotion.removeEventListener('change', scheduleUpdate);
    };
  }, []);
  return (
    <div className='bootstrap-scope'>
      <main className='homepage-v3'>
        <header className={`v3-hero v3-hero--${heroBackground}`}>
          {heroBackground === 'grass' && (
            <div className='v3-hero-grass' aria-hidden='true'>
              <HappySwamp style={{ width: '100%', height: '100%' }} windSpeed={0.65} grassHeightScale={1.3} fireflySpeed={0.6} />
            </div>
          )}
          <div className='v3-wrap'>
            <h1>Jason Contento</h1>
            <p className='v3-role'><span title="Experience Design">XD</span> | Prototyping | UX Engineering</p>
            <nav className='v3-contact-links' aria-label='Contact and résumé'>
              {[
                { label: 'Email', url: 'mailto:drivej@hotmail.com' },
                { label: 'LinkedIn', url: 'https://www.linkedin.com/in/jason-contento-9826597/' },
                { label: 'GitHub', url: 'https://github.com/drivej' }
              ].map(({ label, url }) => (
                <a key={label} className='v3-contact-link glass-border' href={url} aria-label={label} title={label} {...(label !== 'Email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <span aria-hidden='true'>
                    <SocialIcon as='span' url={url} bgColor='transparent' fgColor='currentColor' style={{ width: 36, height: 36 }} />
                  </span>
                </a>
              ))}
              <a className='v3-contact-link v3-resume-link glass-border' href={cvPdf} target='_blank' rel='noopener noreferrer' aria-label='Download Resume' title='Download Resume'>
                <span className='v3-link-icon' aria-hidden='true'>
                  <Icon name='download' />
                </span>
                Resume
              </a>
            </nav>
          </div>
        </header>
        {/* <div className='v3-section-divider' aria-hidden='true' /> */}
        <article className='v3-wrap v3-content'>
          <section>
            <div className='section-inner'>
              <h2>Experience design for complex products</h2>
              <p>I bring 15+ years of experience building web products, a Fine Arts background, and a UX engineering perspective. I connect visual design with working software, helping clients and engineering teams turn complex requirements into clear, usable experiences.</p>
              <p>My experience includes substantial business analysis: understanding specific business use cases, clarifying requirements with stakeholders, and building prototypes to work through how the software should behave. I turn those findings into working software in collaboration with clients and engineering teams. I am based in the greater NYC area and comfortable collaborating onsite or remotely.</p>
            </div>
          </section>

          <section ref={experienceRef} className='experience' aria-labelledby='selected-experience-title'>
            <div className='section-inner v3-wrap'>
              <h2 id='selected-experience-title'>Selected Experience</h2>
              <div className='experience-cards'>
                <div className='experience-card-frame'>
                  <article className='experience-card'>
                    <h3>Infosys</h3>
                    <p className='experience-role'>Technical Director</p>
                    <p>Bridged client and engineering teams, prototyping web systems and validating features before handing them off for full development. Helped major brands integrate new experiences with their existing infrastructure.</p>
                  </article>
                </div>
                <div className='experience-card-frame'>
                  <article className='experience-card'>
                    <h3>Macy’s</h3>
                    <p className='experience-role'>Development Manager</p>
                    <p>Led development for special-event websites, including the Thanksgiving Day Parade, Fourth of July Fireworks, and Black Friday. Delivered engaging customer experiences in a fast-paced environment with demanding deadlines.</p>
                  </article>
                </div>
                <div className='experience-card-frame'>
                  <article className='experience-card'>
                    <h3>Swell</h3>
                    <p className='experience-role'>Lead Developer</p>
                    <p>Built and maintained three web properties for an audio-based social platform, including its web app. Worked through cross-browser audio challenges and coordinated with the mobile team to bring the app experience to the web.</p>
                  </article>
                </div>
              </div>
            </div>
          </section>
          <section aria-labelledby='projects-title'>
            <div className='section-inner'>
              <h2 id='projects-title'>Understanding business workflows</h2>
              <p>My work starts with understanding the business use case: what people need to accomplish, how information moves, and which decisions the software needs to support. Business analysis and prototyping help me turn those details into an experience that clients and engineering teams can evaluate together.</p>
              <h3>Requirements &amp; user journeys</h3>
              <p>I work with stakeholders to clarify goals, map the steps in a task, and understand the rules and dependencies behind it. This creates a shared basis for design and development.</p>
              <h3>Prototypes that clarify behavior</h3>
              <p>I build prototypes to make ideas tangible, work through interactions, and surface questions early. Reviewing working flows helps teams refine requirements and agree on what to build.</p>
              <h3>From business needs to implementation</h3>
              <p>I connect client conversations with technical decisions, helping teams translate specific use cases into usable software. My design and development background helps me carry that understanding through to implementation.</p>
            </div>
          </section>

          <section className='v3-details' aria-label='Skills, technology, values, and experience'>
            <div className='section-inner'>
              <div>
                <h2>Skills</h2>
                <p>Experience design, UX/UI, visual design, information architecture, interaction design, business analysis, requirements discovery, prototyping, client collaboration, project planning, team leadership, and frontend implementation.</p>
              </div>
              <div>
                <h2>Technology</h2>
                <p>Figma, AI coding assistants, React, HTML, CSS, JavaScript, TypeScript, Node.js, GraphQL, SQL, and PHP.</p>
              </div>
              <div>
                <h2>Values</h2>
                <p>Alignment, Prioritization, Accountability</p>
              </div>
              <div>
                <h2>Experience</h2>
                <p>15+ years developing, testing and shipping web products</p>
              </div>
            </div>
          </section>

          <section aria-labelledby='process-title'>
            <div className='section-inner'>
              <h2 id='process-title'>From discovery to a working experience</h2>
              <h3>Discovery</h3>
              <p>Understand the user’s task, business goal, data, and constraints with product managers and domain experts. Map user journeys and define personas around real responsibilities, decisions, and pain points.</p>
              <h3>Ideation &amp; design</h3>
              <p>Explore alternative flows, then develop wireframes and high-fidelity interfaces. Use typography, layout, and visual hierarchy to clarify complex data, working within shared components and accessibility requirements.</p>
              <h3>Prototyping</h3>
              <p>Build interactive prototypes to make behavior tangible. Use AI-assisted development to explore alternatives and iterate, with human review of the resulting experience and implementation.</p>
              <h3>User &amp; manager feedback</h3>
              <p>Review task flows with users and align priorities with product managers and stakeholders. Use interviews, usability testing, and available analytics to identify what needs to change. Personas can help explore scenarios early; feedback from real users remains essential.</p>
              <h3>Implementation &amp; iteration</h3>
              <p>Partner with engineers to clarify states, interactions, and reusable components. Check keyboard access, readable content, error handling, and responsive behavior, and refine the experience as feedback arrives.</p>
            </div>
          </section>

          <div className='v3-section-divider' aria-hidden='true' />

          <section>
            <div className='section-inner'>
              <h2>Interests &amp; Hobbies</h2>
              <p>Motorcycles, Woodworking, Painting, Guitar, Travel</p>
            </div>
          </section>


        </article>
        {/* <div className='v3-section-divider' aria-hidden='true' /> */}
        <section className='v3-final-thoughts' aria-labelledby='final-thoughts-title'>
          <div className='section-inner v3-wrap'>
            <h2 id='final-thoughts-title'>Design that connects to delivery</h2>
            <p className='v3-thoughts-intro'>I bring a designer’s eye, an engineer’s understanding of implementation, and a manager’s focus on shared priorities.</p>
            <h3>Make complex work understandable</h3>
            <p>My experience bridging corporate clients and engineering teams has taught me to make ideas concrete, surface constraints early, and explain decisions clearly. I bring that same care to data clarity, accessibility, and the details that help people work confidently.</p>
            <h3>Use AI with purpose</h3>
            <p>I use AI to explore ideas, prototype, and reduce repetitive work. I remain responsible for reviewing the output, checking assumptions, and testing the experience. The value is more time to investigate the problem and improve the product.</p>
            <p className='v3-lab-easter-egg'>
              <Link to='/lab'>
                Still curious? Visit the lab <span aria-hidden='true'>↗</span>
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
