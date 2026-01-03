export function ProjectsGrid({ projects, onOpen }) {
  return (
    <div className='grid projects'>
      {projects.map((p) => (
        <article key={p.title} className='card project' role='button' tabIndex={0} onClick={() => onOpen(p)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? onOpen(p) : null)}>
          <div className='project-cover' aria-hidden='true' style={p.image ? { backgroundImage: `url(${p.image})` } : undefined} />

          {p.badge ? <span className='tag'>{p.badge}</span> : null}
          <h3>{p.employer ? p.employer : p.title}</h3>
          {p.role ? <div className='project-roleline'>{p.role}</div> : null}
          <p>{p.blurb}</p>

          <div className='tagrow'>
            {p.tags.slice(0, 3).map((t) => (
              <span key={t} className='tag'>
                {t}
              </span>
            ))}
          </div>

          <div className='corner' aria-hidden='true'>
            ↗
          </div>
        </article>
      ))}
    </div>
  );
}
