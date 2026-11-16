import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './JobShowcase.css';
import './MacysTimeLogging.css';

const phases = [
  {
    label: 'Ready',
    stages: [
      { id: 'problem', title: 'Problem' },
      { id: 'people', title: 'People' }
    ]
  },
  {
    label: 'Set',
    stages: [
      { id: 'journey', title: 'Workflow' },
      { id: 'strategy', title: 'Strategy' }
    ]
  },
  {
    label: 'Go',
    stages: [
      { id: 'design', title: 'Solution' },
      { id: 'impact', title: 'Outcomes' }
    ]
  }
];
const stages = phases.flatMap((phase) => phase.stages.map((stage) => ({ ...stage, phase: phase.label })));

function Workflow({ reporting = false }) {
  const steps = reporting
    ? [
        ['Time records', 'Information captured through the adopted tool'],
        ['Employee reports', 'The next phase requested by the processing team']
      ]
    : [
        ['Log time', 'Employees enter their time in the internal tool'],
        ['Generate spreadsheets', 'Software prepares the printable output'],
        ['Print & process', 'The existing team continues its legacy process']
      ];
  return (
    <figure className='first-post-flow'>
      <figcaption>{reporting ? 'Requested next phase' : 'Initial workflow'}</figcaption>
      <ol role='list'>
        {steps.map(([title, text]) => (
          <li key={title}>
            <strong>{title}</strong>
            <span>{text}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export default function MacysTimeLogging() {
  const page = useRef(null);
  const location = useLocation();
  const [active, setActive] = useState(null);
  const section = new URLSearchParams(location.search).get('section');

  useEffect(() => {
    const previous = document.title;
    document.title = 'Macy’s Time Logging | Jason Contento';
    return () => {
      document.title = previous;
    };
  }, []);

  useEffect(() => {
    const target = page.current.querySelector('#' + (stages.some((stage) => stage.id === section) ? section : 'main'));
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: 'instant' });
  }, [location.key, section]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setActive(stages.findLast((stage) => page.current.querySelector('#' + stage.id).getBoundingClientRect().top <= 24)?.id ?? null);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  const chapter = (id, title, children) => {
    const stage = stages.find((item) => item.id === id);
    return (
      <section className='wrap chapter' id={id} tabIndex={-1}>
        <h2 className='stage-header'>
          <span className='stage-phase'>{stage.phase}</span>
          {stage.title}
        </h2>
        <h2>{title}</h2>
        {children}
      </section>
    );
  };

  return (
    <div className='job-showcase macys-case-study' ref={page}>
      <Link className='skip' to='?section=problem'>
        Skip to case study
      </Link>
      <main id='main' tabIndex={-1}>
        <section className='showcase-hero'>
          <div className='hero-back'>
            <Link to='/'>
              <span aria-hidden='true'>‹</span> Back
            </Link>
          </div>
          <div className='wrap hero-grid'>
            <div>
              <p className='case-study-label'>Product design case study</p>
              <h1>
                A simpler way
                <br />
                to <em>log time.</em>
              </h1>
              <p className='lede'>
                Building Macy’s time-logging tool taught me that great UX doesn’t happen in a vacuum—sometimes business priorities must take the lead. My initial discovery focused too narrowly on simplifying employee time entry, overlooking the downstream reporting team’s needs until after launch. Now, I always map data across every handoff, involve operational stakeholders early, and adapt when business goals reshape the problem.
                {/* Designing a time logging experience for Macy’s taught me to look beyond the immediate user. I focused first on making employee time entry easier and supporting an existing print workflow. After adoption, the team handling those prints asked for help with reporting, exposing a gap in my discovery. Their feedback reinforced a lesson I carry forward: follow the information through each handoff, involve the people who use it downstream, and stay open to revisiting the problem. */}
              </p>
              <Link className='hero-link' to='?section=problem'>
                Explore the case study ↓
              </Link>
            </div>
            <div className='macys-workflow-art' aria-label='Project progression: employee time entries, printable spreadsheets, then a request for employee reports'>
              <span className='macys-brand'>
                macy’s <span aria-hidden='true'>★</span>
              </span>
              <div>
                <small>01 / Capture</small>
                <strong>Employee time</strong>
                <span>Internal time logging</span>
              </div>
              <div>
                <small>02 / Simplify</small>
                <strong>Printable spreadsheets</strong>
                <span>Support the existing process</span>
              </div>
              <div className='macys-next'>
                <small>03 / Extend</small>
                <strong>Employee reports</strong>
                <span>Requested after adoption</span>
              </div>
            </div>
          </div>
        </section>
        <div className='process-layout'>
          <nav className='process-rail' aria-label='Case study process'>
            <h2>The Process</h2>
            <div className='process-phases'>
              {phases.map((phase) => (
                <div className='process-phase' key={phase.label}>
                  <h3>
                    <span className='process-phase-arrow' aria-hidden='true'>
                      ↓
                    </span>
                    <span>{phase.label}</span>
                  </h3>
                  <ol>
                    {phase.stages.map((stage) => (
                      <li key={stage.id}>
                        <Link to={'?section=' + stage.id} aria-current={active === stage.id ? 'location' : undefined}>
                          {stage.title}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </nav>
          <div className='process-content'>
            {chapter(
              'problem',
              'Start with the work people already do.',
              <div className='two'>
                <p className='intro'>Employee time information needed to move through an established, print-based process. The first opportunity was practical: give employees a place to log time and generate the spreadsheets that process required.</p>
                <aside className='note'>
                  <h3>The design question</h3>
                  <p>How could the time logging experience serve employees while giving the processing team an output that fit their existing workflow?</p>
                </aside>
              </div>
            )}
            {chapter(
              'people',
              'One workflow. Two groups of users.',
              <div className='two personas'>
                <article>
                  <h3>Employees logging time</h3>
                  <p>Employees needed to record time in and out for each day, including lunch breaks. Repeating those entries across a week made a routine task tedious. The experience needed to make recurring schedules easier to enter and missing weeks easier to notice.</p>
                </article>
                <article>
                  <h3>The team handling the prints</h3>
                  <p>This team worked with the generated spreadsheets and the next stage of the data. After adoption, they identified another opportunity: streamlining reports for the higher-ups.</p>
                </article>
              </div>
            )}
            {chapter(
              'journey',
              'A digital entry point. A familiar handoff.',
              <>
                <p className='intro'>The initial tool connected employee time entry to printable spreadsheets. It simplified an existing step while preserving the handoff to the team responsible for processing the output.</p>
                <Workflow />
                {/* <p className='muted'>Workflow illustrations are reconstructions of the project description, rather than original application screens.</p> */}
              </>
            )}
            {chapter(
              'strategy',
              'Let adoption reveal the next opportunity.',
              <div className='two'>
                <article>
                  <h3>First, solve the immediate need</h3>
                  <p>I shaped the initial experience around two connected needs: employees logging time and the processing team receiving spreadsheets they could print for the legacy process.</p>
                </article>
                <article>
                  <h3>Then, follow the data downstream</h3>
                  <p>Employee adoption brought the processing team into the conversation. Their request expanded the problem from capturing time and preparing prints to building reports for individual employees.</p>
                </article>
              </div>
            )}
            {chapter(
              'design',
              'Less repetition. Fewer overlooked weeks.',
              <>
                <p className='intro'>The design opportunity was in the everyday details. Recording a workday meant entering time in and out around lunch, then repeating that sequence throughout the week. I focused on making that routine easier and helping employees notice missing entries.</p>
                <div className='two'>
                  <article>
                    <h3>Enter once, reuse across the week</h3>
                    <p>Employees could clone time-in and time-out entries for each day in the current week, including lunch breaks. For recurring schedules, this turned a series of repetitive entries into a reusable daily pattern.</p>
                    <p>The shortcut matched how employees thought about their schedules: a familiar workday repeated across the week.</p>
                  </article>
                  <article>
                    <h3>Bring missing time into view</h3>
                    <p>An alert surfaced when the previous week was blank. Employees could notice the gap while already in the time logging experience and return to the week that needed attention.</p>
                    <p>This helped prevent a common follow-up loop: management would flag a missing timesheet to the team manager, who then had to ask the employee to resubmit it. Surfacing the blank week directly to the employee reduced the need for that back-and-forth.</p>
                  </article>
                </div>
                <aside className='note'>
                  <h3>A lesson in looking beyond the immediate user</h3>
                  <p>I focused on making time entry easier for employees and producing the spreadsheets the existing process required. When the team handling those prints asked for help with reporting, it exposed a gap in my discovery: I had not looked far enough into how people used the information after that handoff.</p>
                  <p>Their feedback helped me see the limits of my initial framing. I took away a clear lesson: involve the people receiving an output earlier, understand their tasks, and use what they reveal to revisit the scope. Employee adoption mattered, but it was also a chance to recognize where my design process could improve.</p>
                </aside>
              </>
            )}
            {chapter(
              'impact',
              'Adoption created a path forward.',
              <>
                <div className='two'>
                  <p className='intro'>Employees adopted the time logging tool. The team handling its printed output then asked for help with employee reporting—evidence that the experience had become useful enough to prompt a request for the next phase.</p>
                  <aside className='note'>
                    <h3>What this project demonstrates</h3>
                    <p>A focused internal tool can become a starting point for improving a broader business process. Understanding who uses its output helps reveal where to go next.</p>
                  </aside>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <footer>
        <div className='wrap footer'>
          <Link to='/'>← Back to portfolio</Link>
          <Link to='/case-studies/job-showcase'>ServiceTitan case study →</Link>
        </div>
      </footer>
    </div>
  );
}
