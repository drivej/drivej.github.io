import { useState } from 'react';

export function ProjectsGrid({ projects }) {
  return (
    <div className='grid projects'>
      {projects.map((p) => (
        <ProjectBlock key={p.title} project={p} />
      ))}
    </div>
  );
}

const ProjectBlock = ({ project }) => {
  const [isClamped, setIsClamped] = useState(true);
  const toggleLineClamp = () => setIsClamped(!isClamped);
  const p = project;
  const onOpen = () => {
    if (project.link) {
      window.open(project.link, '_blank');
    }
  };

  return (
    <article key={p.title} className='card project' role='button' tabIndex={0} onClick={() => onOpen(p)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? onOpen(p) : null)}>
      <div className='project-cover' aria-hidden='true' style={p.image ? { backgroundImage: `url(${p.image})` } : undefined} />

      <h3>{p.employer ? p.employer : p.title}</h3>
      {p.role ? <div className='project-roleline'>{p.role}</div> : null}
      {/* <p>{p.blurb}</p> */}
      <hr />
      <p
        onClick={(e) => { e.stopPropagation(); toggleLineClamp(); }}
        style={{
          lineClamp: isClamped ? 8 : 'none', //
          lineHeight: '1.2em',
          WebkitLineClamp: isClamped ? 8 : 'none',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical'
        }}
      >
        {p.description}
      </p>

      <div className='tagrow'>
        {p.badge ? <span className='tag'>{p.badge}</span> : null}
        {p.tags.map((t) => (
          <span key={t} className='tag'>
            {t}
          </span>
        ))}
      </div>

      <div className='corner' aria-hidden='true'>
        ↗
      </div>
    </article>
  );
};
