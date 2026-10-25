import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
import cvPdf from '../assets/Jason_Contento_CV.pdf';
import { HappySwamp } from '../components/HappySwamp';
import { Icon } from '../components/Icon';
import './HomePage_v3.scss';

// Switch to 'colors' to restore the original animated hero background.
const heroBackground: 'grass' | 'colors' = 'grass';

export default function HomePage_v3() {
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
            <p className='v3-role'>Development Manager | Frontend Developer | UX Engineer</p>
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
              <h2>About</h2>
              <p>
                I am a frontend manager/developer and UX engineer with full-stack experience, based in the greater NYC area. I am looking for onsite or remote work, part or full-time. I have extensive experience working with high value clients, developing websites and web applications. I have experience with React,
                NodeJS, CSS, JavaScript, TypeScript, GQL, Figma, Canva, and more. I value integrity above all else. I can balance speed, quality and effort to produce the best results. I am a team player who is 100% dedicated to the mission.
              </p>
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
          <section className='v3-details'>
            <div className='section-inner'>
              <div>
                <h2>Skills</h2>

                <p>Management, Planning, Interfacing with clients, UX/UI, React, NodeJS, CSS, JavaScript, TypeScript, GQL, Figma, Canva, PHP, SQL, WebGL, WebAudio</p>
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

            <div className='v3-section-divider' aria-hidden='true' />

            <div className='v3-interview'>
              <div className='section-inner'>
                <h2>Let's start the conversation...</h2>
                <div>
                  <ul>
                    <h3>
                      <i>Tell me a little about your self.</i>
                    </h3>{' '}
                    <p>Thank you for meeting with me. My name is Jason Contento. I am a frontend developer focusing on React. I approach projects through a UX lens. I earned a Fine Arts degree, so visual consistency and design language are important to me. </p>
                    <h3>
                      <i>Talk about your previous work experience.</i>
                    </h3>
                    <p>My latest role was lead dev for a social platform that used audio as the message medium. I worked heavily with the Web Audio API, normalizing between browsers with a wide range of support. I managed 3 web properties, one of which was a web version of the Flutter App. </p>{' '}
                    <p>
                      I was a Technical Director at Infosys, working with major brands, building out web systems that integrate into their existing infrastructure. In that role, I did rapid prototyping / POC's for projects and features before handing off to the larger dev team for implementation. I was a bridge between
                      our corporate clients and our internal team.
                    </p>
                    <p>
                      I was a dev manager for Macy's (MCOM) for many years on special projects. For example, we built websites for: Macy's Day Parade, 4th of July Fireworks, Black Friday, Macy's Flower Show and many other special events. This was a fast paced environment with a high level of execution often leveraging
                      the latest web technologies to create engaging experiences for the customers.
                    </p>
                    <h3>
                      <i>Do you have any questions for us?</i>
                    </h3>
                    <p>
                      To be frank, AI drives job applications. Please don't be offended if I need a quick who, what, where, why for the position. My goal is to assess if I am a good fit for the role at your company as much as you want to know if I am willing and able to do the job. I will be upfront about what aspects
                      of the work I am ready for and which may require ramp up. I'm comfortable being transparent about my expectations and concerns.
                    </p>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <div className='v3-section-divider' aria-hidden='true' />

          <section>
            <div className='section-inner'>
              <h2>Interests &amp; Hobbies</h2>
              <p>Motorcycles, Woodworking, Painting, Guitar, Travel</p>
            </div>
          </section>

          {/* <section>
            <h2>Portfolio</h2>
            <p>
              <a href='/hp2'>HomePage_v2</a> (current)
            </p>
            <p>
              <a href='/hp3'>HomePage_v3</a> (this page)
            </p>
          </section>
*/}
        </article>
        {/* <div className='v3-section-divider' aria-hidden='true' /> */}
        <section className='v3-final-thoughts' aria-labelledby='final-thoughts-title'>
          <div className='section-inner v3-wrap'>
            <h2 id='final-thoughts-title'>Final Thoughts</h2>
            <p className='v3-thoughts-intro'>The tools keep changing. My focus is still on solving useful problems with people who care about the result.</p>

            <h3>Development is more than writing code</h3>
            <p>I care about understanding what we are building, who it serves, and what success looks like. Choosing a framework is one decision among many. Knowing when to simplify, what to prioritize, and how to leave a system understandable for the next developer matters just as much.</p>

            <h3>AI is part of the toolbox</h3>
            <p>
              I use AI to explore ideas, prototype, and move through repetitive work faster. I still take responsibility for what ships. That means reviewing the code, checking assumptions, testing the experience, and understanding the tradeoffs. I want to use the time saved to improve the product and give more
              attention to the details.
            </p>

            <h3>Good teams need clarity and trust</h3>
            <p>
              I am comfortable working onsite or remotely. In either setting, I value clear priorities, shared ownership, and honest communication. In person, a quick conversation can untangle a problem. Across locations and time zones, written decisions and thoughtful handoffs help everyone keep moving. I try to make
              progress visible, raise concerns early, and give people the context they need to do their best work.
            </p>

            <h3>Keep learning. Keep it practical.</h3>
            <p>I enjoy experimenting with new technology, but I weigh it against the needs of the project and the team maintaining it. I bring curiosity, a design perspective, and a willingness to get into the details. My goal is to build something useful, ship it with care, and keep making it better.</p>
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
