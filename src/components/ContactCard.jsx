export function ContactCard({ email, links }) {
  return (
    <div className="card list">
      <div className="item">
        <div>
          <b>Email</b>
          <p>
            <a className="pilllink" href={`mailto:${email}`}>
              {email}
            </a>
          </p>
        </div>
        <a className="btn" href={`mailto:${email}?subject=Portfolio%20inquiry`}>
          Send
        </a>
      </div>

      <div className="item">
        <div>
          <b>Links</b>
          <p>
            {links.map((l, idx) => (
              <span key={l.href}>
                <a className="pilllink" href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
                {idx < links.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
