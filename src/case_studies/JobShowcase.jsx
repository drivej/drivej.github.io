import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RoiCalculator from './RoiCalculator.jsx';
import heatPump from './heat-pump.jpg';
import jobSearchScreenshot from './job-search-chrome.jpg';
import jobScannerScreenshot from './job-scanner-chrome.jpg';
import landing from './st-jobs-images/landing.png';
import marketing from './st-jobs-images/marketing.png';
import jobResults from './st-jobs-images/job-search-result.png';
import jobDetails from './st-jobs-images/job-details.png';
import draftSearch from './st-jobs-images/job-smart-search.png';
import plans from './st-jobs-images/plans.png';
import './JobShowcase.css';

const productScreenshots = [
  { src: landing, title: 'Landing page', height: 904, alt: 'Marketing hero with the product promise and a WordPress story preview' },
  { src: marketing, title: 'How it works', height: 913, alt: 'Marketing page explaining how to find jobs, draft stories, and publish' },
  { src: jobResults, title: 'Job search results', height: 915, alt: 'Jobs table with readiness indicators, locations, and WordPress statuses' },
  { src: jobDetails, title: 'Job details and post preview', height: 916, alt: 'Job details with published status and a WordPress post preview' },
  { src: draftSearch, title: 'AI-assisted draft search', height: 909, alt: 'Draft search in progress with filters, token cost, and a cancel control' },
  { src: plans, title: 'Subscription plans', height: 920, alt: 'Subscription options with prices and monthly token allowances' },
];

const designPhases = [
  {
    label: 'Ready',
    stages: [
      { id: 'problem', title: 'Problem' },
      { id: 'personas', title: 'Personas' },
      { id: 'journey', title: 'Journeys' },
    ],
  },
  {
    label: 'Set',
    stages: [
      { id: 'discovery', title: 'Discovery' },
      { id: 'strategy', title: 'Strategy' },
    ],
  },
  {
    label: 'Go',
    stages: [
      { id: 'design', title: 'Design' },
      { id: 'impact', title: 'Outcomes' },
      { id: 'screenshots', title: 'Screenshots' },
    ],
  },
];

const designStages = designPhases.flatMap(({ label, stages }) =>
  stages.map(stage => ({ ...stage, phase: label })),
);

const sections = new Set(['main', ...designStages.map(({ id }) => id)]);

const sampleJobEvidence = {
  jobType: 'Heat pump replacement',
  summaryOfWork: 'System running after service.',
  invoice: {
    summary: 'Replaced outdoor heat pump.',
    items: ['Installed new heat pump', 'Tested heating and cooling'],
  },
  formSubmission: {
    attachment: 'installation-photo.jpg',
  },
};

const sourceReviewNotes = [
  { field: 'invoice', decision: 'Strong evidence', marks: '✓✓', note: 'The summary and line items say what was installed and tested. Use them to anchor the story.' },
  { field: 'jobType', decision: 'Useful context', marks: '✓', note: 'Names the service. Use it to orient the reader and verify the actual work against the invoice.' },
  { field: 'summaryOfWork', decision: 'Needs to be qualified', marks: '?', note: 'Suggests an outcome. Check the invoice or technician notes to confirm what was tested before using the claim.' },
  { field: 'formSubmission', decision: 'Skip for copy', marks: '×', note: 'A filename alone tells us little. Open and review the photo separately before using it.' },
];

function SectionLink({ section, className, current, children }) {
  return <Link className={className} aria-current={current ? 'location' : undefined} to={{ search: '?section=' + section }}>{children}</Link>;
}

function StageHeader({ section }) {
  const { phase, title } = designStages.find(({ id }) => id === section);
  return (
    <h2 className="stage-header">
      <span className="stage-phase">{phase}</span>
      {title}
    </h2>
  );
}

export default function JobShowcase() {
  const page = useRef(null);
  const location = useLocation();
  const requestedSection = new URLSearchParams(location.search).get('section');
  const previousSections = new Map([['evidence', 'discovery'], ['engineering', 'impact']]);
  const selectedSection = previousSections.get(requestedSection) ?? requestedSection;
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Job Showcase for ServiceTitan | Jason Contento';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    if (sections.has(selectedSection)) {
      const target = page.current.querySelector('#' + selectedSection);
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: 'instant' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.key, selectedSection]);

  useEffect(() => {
    const stageTargets = designStages.map(({ id }) => page.current.querySelector('#' + id));
    let frame = 0;

    function updateActiveSection() {
      frame = 0;
      const readingLine = 24;
      const activeTarget = stageTargets.findLast(target => target.getBoundingClientRect().top <= readingLine);
      setActiveSection(activeTarget?.id ?? null);
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    }

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [location.key]);

  return (
    <div className="job-showcase" ref={page}>
      <SectionLink className="skip" section="main">Skip to case study</SectionLink>
      <main id="main" tabIndex={-1}>
        <section className="showcase-hero">
          <div className="hero-back">
            <a href="/"><span aria-hidden="true">‹</span> Back</a>
          </div>
          <div className="wrap hero-grid">
            <div>
              <p className="case-study-label">Product design &amp; development case study</p>
              <h1>From field work<br />to <em>local&nbsp;proof.</em>
              </h1>
              <p className="lede">Content creators manually turn job records into project stories for local search visibility. Each story takes time to piece together. Can we leverage content creators expertise, business needs, and AI to optimize this production flow to create a marketable tool?</p>
              {/* <SectionLink className="hero-link" section="design">Explore the product screens ↓</SectionLink> */}
            </div>
            <div className="hero-art" aria-label="Illustrative completed job and resulting WordPress story">
              <div className="source-chip"><span>ST</span>
                <div><strong>Completed field job</strong><small>HVAC replacement · San Diego, CA</small>
                </div>
              </div>
              <div className="connector">↓</div>
              <article className="hero-card"><img src={heatPump} alt="Illustrative heat pump installation beside a house" width="1100" height="733" />
                <div><small>WORDPRESS PROJECT STORY</small>
                  <h2>Heat pump replacement in North&nbsp;Park</h2>
                  <p>San Diego, CA · 92104</p>
                </div>
              </article>
            </div>
          </div>
        </section>
        {/* <div className="wrap context">
          <div><span>Audience</span><strong>Local service businesses</strong>
          </div>
          <div><span>Product</span><strong>React SaaS + WordPress plugin</strong>
          </div>
          <div><span>Evidence</span><strong>Source, technical probes and plugin package</strong>
          </div>
        </div> */}
        <div className="process-layout">
          <nav className="process-rail" aria-label="Product design process">
            <h2>The Process</h2>
            <div className="process-phases">
              {designPhases.map(({ label, stages }) => (
                <div className="process-phase" key={label}>
                  <h3><span className="process-phase-arrow" aria-hidden="true">↓</span><span>{label}</span></h3>
                  <ol>
                    {stages.map(({ id, title }) => (
                      <li key={id}>
                        <SectionLink section={id} current={activeSection === id}>{title}</SectionLink>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </nav>
          <div className="process-content">
            <section className="wrap chapter" id="problem" tabIndex={-1}>
              <StageHeader section="problem" />
              <h2>The work is done.<br />The story needs to be&nbsp;told.</h2>
              <div className="two">
                <p className="intro">Service teams capture job data in the field with descriptions, statuses, and photos. A content creator needs to find qualified jobs, tease out a story, choose usable photos, and deploy to the correct WordPress page.</p>
                <div className="note">
                  <h3>Product design&nbsp;question</h3>
                  <p>How can we turn existing job data into publishable content while giving stake holders ownership of the process and a happy path to&nbsp;success?</p>
                </div>
              </div>
            </section>
            <section className="wrap chapter" id="personas" tabIndex={-1}>
              <StageHeader section="personas" />
              <h2>Two roles.<br />Different&nbsp;values.</h2>
              {/* <p className="muted">Working profiles to validate. On a small team, one person may fill both roles.</p> */}
              <div className="two personas">
                <article>
                  <h3 className="persona-heading">
                    <span className="persona-avatar" aria-hidden="true" />
                    <span>Content creators</span>
                  </h3>
                  <p>Creators familiar with their publishing tools want to spend less time gathering job details and assembling a draft. They need to see the source, edit the story, and decide what goes live.</p>
                  <p><strong>Design implications.</strong> The job list shows the fields creators need to choose what to review. The editor keeps the source evidence beside the draft so they can verify details and make changes without switching tools.</p>
                  <p><strong>Measuring Success.</strong> Active time per published story and how often drafts need substantial edits.</p>
                </article>
                <article>
                  <h3 className="persona-heading">
                    <span className="persona-avatar" aria-hidden="true" />
                    <span>Business owners and managers</span>
                  </h3>
                  <p>They decide whether to adopt the tool and make it part of the team’s publishing routine. They need to see whether it helps the team publish consistently and whether the time saved justifies the cost.</p>
                  <p><strong>Design implications.</strong> The marketing page explains how the workflow could save the team time and what setup involves. Guided onboarding helps owners or their administrators verify both connections and get the team to a first draft.</p>
                  <p><strong>Measuring Success.</strong> Publishing frequency and labor savings relative to cost.</p>
                </article>
              </div>
            </section>
            <section className="wrap chapter" id="journey" tabIndex={-1}>
              <StageHeader section="journey" />
              <h2>From first visit to repeat&nbsp;publishing.</h2>
              <p className="intro">The marketing page helps an owner decide if the product fits. The first published post gives the team a reason to return when new jobs come in. A higher plan would support teams that build a regular publishing cadence.</p>
              <figure className="first-post-flow lifecycle-flow">
                <figcaption>The journey from discovery to&nbsp;upgrade</figcaption>
                <ol role="list">
                  <li><strong>Visit the marketing page</strong><span>See what a finished story looks like, how the workflow works, and what plans cost.</span><small>Measure · Sign-up rate</small></li>
                  <li><strong>Get set up</strong><span>Verify WordPress and ServiceTitan access. Choose a starting plan before opening Jobs.</span><small>Measure · Setup and checkout completion</small></li>
                  <li><strong>Publish the first story</strong><span>Pick a job or start with an AI-generated draft, then review and confirm where the post appears.</span><small>Measure · Time to first published post</small></li>
                  <li><strong>Return for new jobs</strong><span>Review saved drafts and find the next project to feature.</span><small>Measure · Teams that publish again within 30 days</small></li>
                  <li><strong>Upgrade as usage grows</strong><span>Compare plan capacity with publishing volume and choose a higher tier when the team needs it.</span><small>Proposed · Track upgrades among repeat publishers</small></li>
                </ol>
                <p className="lifecycle-repeat"><span aria-hidden="true">↺</span> Each new batch of completed jobs brings the team back to review and publish again.</p>
              </figure>
              <div className="two onboarding-story">
                <div>
                  <h3>Why guided setup fits this&nbsp;journey</h3>
                  <p>A sample workspace can help someone explore, and a checklist can orient someone familiar with the tools. Here, teams need to verify the job source and publishing destination before they can see value. Guided connection checks help them resolve access issues in context. Inviting teammates is optional.</p>
                </div>
                <div className="note">
                  <h3>Give the upgrade a clear&nbsp;reason</h3>
                  <p>The proposed upgrade path connects the plan to work the team is already doing. Show how much capacity they’ve used and what a higher tier would add when their publishing volume grows.</p>
                </div>
              </div>
            </section>
            <section className="wrap chapter" id="discovery" tabIndex={-1}>
              <StageHeader section="discovery" />
              <article className="evidence">
                <h2>Which data sources<br />tell the&nbsp;story?</h2>
                {/* <p className="showcase-evidence-label">Conducted · technical discovery</p>
                <h3>Which source fields actually tell the&nbsp;story?</h3> */}
                <div className="two">
                  <p className="intro">The job records varied in how much of the work they explained. Some fields offered useful detail, others were blank, and some were useful only in certain jobs. We turned the questions content creators ask into a framework for choosing what to use. What tells us what actually happened? Which details support that account? Where does a creator need to fill in the gaps?</p>
                  <div className="note">
                    <h3>Design implication</h3>
                    <p>Bring the linked invoice into the review so creators can see which details support the story and where they need to fill in gaps.</p>
                  </div>
                </div>
              </article>
              <figure className="discovery-board">
                <div className="source-review">
                  <div className="source-review-record">
                    <h3>Raw data</h3>
                    <pre tabIndex={0} aria-label="Sample job data in JSON"><code>{JSON.stringify(sampleJobEvidence, null, 2)}</code></pre>
                  </div>
                  <div className="source-review-notes">
                    <h3>Review notes</h3>
                    <ul>
                      {sourceReviewNotes.map(({ field, decision, marks, note }) => (
                        <li key={field}>
                          <span className="source-review-mark" data-skip={marks === '×' ? '' : undefined} aria-hidden="true">{marks}</span>
                          <div>
                            <code>{field}</code>
                            <strong>{decision}</strong>
                            <p>{note}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </figure>
            </section>
            <section className="wrap chapter" id="strategy" tabIndex={-1}>
              <StageHeader section="strategy" />
              <h2>Unblock the workflow.<br />Keep creators in&nbsp;control.</h2>
              <div className="two">
                <p className="intro">Creators can hand-pick a job they already know or use AI to find a promising one. Both paths lead to the same review, where creators check the details and decide what goes live.</p>
                <div className="note">
                  <h3>Success looks like less&nbsp;rework</h3>
                  <p>Reduce the time it takes to publish a story while maintaining editorial quality. Support the user's decision process by providing clear feedback.</p>
                </div>
              </div>
              <div className="job-row-strategy">
                <h3>Give creators just enough to&nbsp;decide</h3>
                <p>The job row answers fundamental questions at a glance. Is there enough material for a story? Does it fit the service area? Has it already been drafted or published? But there wasn't quite enough data to complete the task. So, we worked with stakeholders to identify what makes a job worth featuring, then turned those criteria into a readiness signal alleviating much of the manual review process.</p>
                <figure className="job-row-wireframe">
                  <div className="wire">
                    <table aria-label="Job row wireframes showing two readiness states">
                      <thead>
                        <tr><th scope="col">Readiness</th><th scope="col">Image</th><th scope="col">Job</th><th scope="col">Location</th><th scope="col">WordPress</th></tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><span className="row-readiness ready"><span aria-hidden="true">✓</span> Ready</span></td>
                          <td><span className="job-row-image" aria-label="Image placeholder" role="img"></span></td>
                          <td><strong>Job title with fallback</strong><small>Job date</small></td>
                          <td>City, State<small>00000</small></td>
                          <td>No post yet</td>
                        </tr>
                        <tr>
                          <td><span className="row-readiness review"><span aria-hidden="true">!</span> Review</span></td>
                          <td><span className="job-row-image" aria-label="Image placeholder" role="img"></span></td>
                          <td><strong>Job title with fallback</strong><small>Job date · Limited source copy</small></td>
                          <td>City, State<small>00000</small></td>
                          <td>Draft</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </figure>
              </div>
              <div className="job-row-strategy two">
                <div>
                  <h3>Give subject-matter experts a say in the&nbsp;draft</h3>
                  <p>We invited stakeholders and subject-matter experts to tweak the instructions that generate a post. Content and SEO experts could bring their judgment about what makes a local story useful. People who knew the service work could help spot where a draft went beyond what the job record supported.</p>
                </div>
                <div className="note">
                  <h3>Turn feedback into a drafting&nbsp;rule</h3>
                  <p>For example, if a record names a service but leaves the work unclear, use the service as context and leave the outcome for the creator to verify. That gives every draft a better starting point and keeps the final editorial decision with the creator.</p>
                </div>
              </div>
              {/* <figure className="first-post-flow">
                <figcaption>From onboarding to the first published&nbsp;post</figcaption>
                <ol role="list">
                  <li><strong>Connect</strong><span>Set up WordPress and ServiceTitan</span></li>
                  <li><strong>Find a job</strong><span>Pick one or let AI find candidates</span></li>
                  <li><strong>Review the draft</strong><span>Check the facts, copy and photo</span></li>
                  <li><strong>Publish</strong><span>Verify the story on the intended page</span></li>
                </ol>
              </figure> */}
            </section>
            <section className="wrap chapter" id="design" tabIndex={-1}>
              <StageHeader section="design" />
              <h2>From choosing a job to reviewing the&nbsp;story.</h2>
              <p className="intro">I split the work between two screens. The job list helps creators decide what to open. The review screen brings the source, draft, and publishing destination together so they can decide what goes live.</p>
              <div className="wireboards">
                <figure>
                  <div className="wire">
                    <div className="wiretop">Jobs <span>Active website</span>
                    </div>
                    <div className="wirefilters"><span>Date range</span><span>ZIP code</span><span>Search</span>
                    </div>
                    <div className="wirerow"><i></i>✓ Job title / location <b>No post yet</b>
                    </div>
                    <div className="wirerow"><i></i>! Job title / location <b>Draft</b>
                    </div>
                    <div className="wirerow"><i></i>✓ Job title / location <b>Published</b>
                    </div>
                  </div>
                  <figcaption><strong>Choose a job.</strong> Filter by date and ZIP, then check readiness and WordPress status before opening a record.</figcaption>
                </figure>
                <figure>
                  <div className="wire">
                    <div className="wiretop">Job details <span>WordPress status</span>
                    </div>
                    <div className="wirecolumns">
                      <div>Source notes<i></i><i></i><i></i>
                        <div className="wirephoto">Featured image</div>
                      </div>
                      <div>Editable title<i></i>Project story<i></i><i></i><i></i>
                      </div>
                    </div>
                    <div className="wirefooter">Destination site <b>Save draft / Publish</b>
                    </div>
                  </div>
                  <figcaption><strong>Review the story.</strong> Compare the draft with the source notes and photo, then confirm the site before saving a draft or publishing.</figcaption>
                </figure>
              </div>
              <h3 className="subhead">Readiness at a&nbsp;glance</h3>
              <p>The check and warning sit at the start of each row. Shape and text distinguish the states even when color is hard to see.</p><br />
              <div className="two">
                <article>
                  <h4 className="row-readiness ready"><span aria-hidden="true">✓</span> Ready to review</h4>
                  <p>There’s enough source material and a usable photo to begin the editorial review.</p>
                </article>
                <article>
                  <h4 className="row-readiness review"><span aria-hidden="true">!</span> Needs a closer look</h4>
                  <p>Show what needs attention, such as thin source notes, so the creator can decide whether to dig further or move on.</p>
                </article>
              </div>
              <div hidden>
                <h3 className="subhead">Two ways to start in the live&nbsp;app</h3>
                <figure className="sample live-app-sample">
                  <img src={jobSearchScreenshot} width="1100" height="339" loading="lazy" alt="Job search with optional date and ZIP filters and columns for job, location, and WordPress status" />
                  <figcaption><strong>Manual selection.</strong> Creators can narrow the job list by date and ZIP before choosing which work to feature.</figcaption>
                </figure>
                <figure className="sample live-app-sample">
                  <img src={jobScannerScreenshot} width="1100" height="222" loading="lazy" alt="AI draft setup with ZIP filter, draft count, and token cost shown before starting" />
                  <figcaption><strong>AI-generated drafts.</strong> Creators choose how many drafts to look for and see the token cost before starting a scan.</figcaption>
                </figure>
              </div>
              <div hidden>
                <h3 className="subhead">The same job across three&nbsp;surfaces</h3>
                <figure className="sample">
                  <div className="app-window">
                    <div className="window-bar"><strong>Job Showcase</strong><span>Workspace / Jobs / Job details</span>
                    </div>
                    <div className="app-inner">
                      <div className="mock-title">
                        <div><small>COMPLETED JOB · DEMO-10482</small>
                          <h4>Heat pump&nbsp;replacement</h4>
                          <p>San Diego, CA · 92104</p>
                        </div><span className="pill">WordPress · No post</span>
                      </div>
                      <div className="appcols">
                        <div>
                          <h5>Source evidence</h5>
                          <p>Invoice work item · Heat pump replacement and system test.</p><img src={heatPump} alt="Sample selected heat pump installation photo" width="1100" height="733" loading="lazy" /><span className="photo-check">✓ Featured image selected</span>
                        </div>
                        <div>
                          <h5>Project story</h5><span className="field-label">Title</span>
                          <div className="fake-field">Heat pump replacement in North Park</div><span className="field-label">Excerpt</span>
                          <div className="fake-field">A new heat pump and post-installation system check for a home in North Park.</div>
                          <div className="fake-field subtle">Review the story against the job evidence before publishing.</div>
                        </div>
                      </div>
                      <div className="mock-actions"><span>Destination · North Park Heating</span>
                        <div><span className="mock-button">Save draft</span><span className="mock-button primary">Publish</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <figcaption><strong>SaaS app.</strong> Show the job evidence, editorial copy, image and destination in one review. Generating copy and publishing are separate actions. <a href="https://github.com/drivej/servicetitan_wp_jobs_plugin/blob/0d8547efcc27fd8659386cce48bbd936dc8e5846/src/client/JobDetails.tsx">Job Details source ↗</a>
                  </figcaption>
                </figure>
                <figure className="sample">
                  <div className="wp-window">
                    <div className="wp-top"><b>W</b> North Park Heating <span>WordPress admin · setup example</span>
                    </div>
                    <div className="wp-inner">
                      <div className="wp-admin">
                        <h4>ServiceTitan Jobs</h4>
                        <p><span className="pill">Plugin active</span> Advanced Custom Fields required</p>
                        <div className="fake-field"><span className="field-label">Page ZIP codes</span><strong>92104 · San Diego, CA</strong>
                        </div>
                        <pre><code>[servicetitan_jobs]</code>
                        </pre>
                        <p>The shortcode uses the page’s configured ZIPs, including inherited values when enabled.</p>
                      </div>
                      <div className="wp-public"><small>NORTH PARK HEATING / SERVICE AREA</small>
                        <h4>Recent work near&nbsp;you</h4>
                        <div className="public-card"><img src={heatPump} alt="Outdoor heat pump installed beside a home" width="1100" height="733" loading="lazy" />
                          <div><strong>Heat pump replacement in North Park</strong>
                            <p>A new heat pump and post-installation system check for a home in North Park.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <figcaption><strong>WordPress plugin.</strong> The admin controls location placement through page data. Visitors see the featured image, linked title and excerpt for published jobs that match the page. <a href="https://github.com/drivej/servicetitan_wp_jobs_plugin/blob/0d8547efcc27fd8659386cce48bbd936dc8e5846/wordpress-plugin/servicetitan-job-integration/servicetitan-job-integration.php">Plugin source ↗</a>
                  </figcaption>
                </figure>
                <figure className="sample">
                  <div className="marketing-window">
                    <div className="marketing-nav"><strong>Job Showcase for ServiceTitan</strong><span>How it works · Pricing · Sign in</span>
                    </div>
                    <div className="marketing-grid">
                      <div><small>BUILT FOR SERVICETITAN + WORDPRESS</small>
                        <h4>Your best work deserves to be&nbsp;<em>seen.</em>
                        </h4>
                        <p>Turn completed ServiceTitan jobs into local project stories for your WordPress site.</p><span className="mock-button primary">Get started →</span>
                      </div>
                      <div className="marketing-card"><span className="pill">Completed job</span><img src={heatPump} alt="Example HVAC installation used in the product marketing visual" width="1100" height="733" loading="lazy" /><strong>Comfort, restored.</strong><small>North Park, San Diego · 92104</small><hr /><span>ServiceTitan → Job story → WordPress</span>
                      </div>
                    </div>
                  </div>
                  <figcaption><strong>Product marketing site.</strong> Lead with a concrete outcome, show the three-step workflow, and put setup and pricing on the evaluation path. <a href="https://github.com/drivej/servicetitan_wp_jobs_plugin/blob/0d8547efcc27fd8659386cce48bbd936dc8e5846/src/client/MarketingPage.tsx">Marketing page source ↗</a>
                  </figcaption>
                </figure>
              </div>
            </section>
            <section className="wrap chapter" id="impact" tabIndex={-1}>
              <StageHeader section="impact" />
              <h2>A clearer path from job to published&nbsp;story.</h2>
              <div className="three">
                <article>
                  <h3>A head start for&nbsp;creators</h3>
                  <p>Creators can hand-pick a job or start with an AI-generated draft. Readiness cues help them see which jobs have enough material to review.</p>
                </article>
                <article>
                  <h3>Editorial control built&nbsp;in</h3>
                  <p>Source notes, the photo, and editable copy sit together. Creators can check the facts and choose when a story is ready to publish.</p>
                </article>
                <article>
                  <h3>A clear WordPress&nbsp;handoff</h3>
                  <p>Creators can confirm the destination before publishing, and the plugin places the story on matching service-area pages.</p>
                </article>
              </div>
              <div className="roi">
                <div>
                  <p className="showcase-evidence-label">Projected monthly savings · USD</p>
                  <h3>What could the time savings be&nbsp;worth?</h3>
                  <p>At 12 posts per month, saving 30 minutes per post would free up six hours. At $45 per hour and $120 in monthly costs, that projects $150 in net labor savings and 125% ROI.</p>
                  <p className="muted">The estimate covers labor savings and recurring costs. Adoption, actual time savings, and search impact still need to be measured.</p>
                </div>
                <div className="calculator"><RoiCalculator />
                </div>
              </div>
            </section>
            <section className="wrap chapter" id="screenshots" tabIndex={-1}>
              <StageHeader section="screenshots" />
              <div className="two screenshot-gallery">
                {productScreenshots.map(({ src, title, height, alt }) => (
                  <figure key={src}>
                    <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open ${title} screenshot in a new tab`}>
                      <img src={src} width="1176" height={height} loading="lazy" alt={alt} />
                    </a>
                    <figcaption>{title}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <footer>
        <div className="wrap footer"><span>Jason Contento · Product design &amp; engineering</span><Link to="/">Back to portfolio ↗</Link>
        </div>
      </footer>
    </div>
  );
}
