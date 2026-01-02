import { Icon } from "./Icon";

export function Hero({ availability, headlineTop, headlineAccent, lead, ctas, stats }) {
  return (
    <section className="hero">
      <div className="card hero-main">
        <div className="eyebrow">
          <span className="dot" /> {availability}
        </div>

        <h1>
          {headlineTop}{" "}
          <span className="accent">{headlineAccent}</span>.
        </h1>

        <p className="lead">{lead}</p>

        <div className="cta-row">
          {ctas.map((c) => (
            <a
              key={c.label}
              className={`btn ${c.variant === "primary" ? "primary" : ""}`}
              href={c.href}
              onClick={c.onClick}
            >
              <Icon name={c.icon} />
              {c.label}
            </a>
          ))}
        </div>
      </div>

      <aside className="card hero-side">
        {stats.map((s) => (
          <div key={s.title} className="stat">
            <b>{s.title}</b>
            <p>{s.text}</p>
          </div>
        ))}
      </aside>
    </section>
  );
}
