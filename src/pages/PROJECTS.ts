import macysImg from '../assets/macys.png';
import perryImg from '../assets/perry.png';
import swellImg from '../assets/swell.png';
const infosysImg = new URL('../assets/infosys.png', import.meta.url).href;
const tayloredImg = new URL('../assets/taylored.png', import.meta.url).href;

export const PROJECTS = [
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
    description: 'As Technical Director at Infosys, I led the creation of ecom websites for corporate clients. I worked within a full enterprise pipeline alongside brilliant designers, engineers, and stakeholders to validate concepts quickly and translate them into production-ready products.',
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
