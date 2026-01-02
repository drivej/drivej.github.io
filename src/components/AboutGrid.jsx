export function AboutGrid() {
  return (
    <div className="grid two">
      <div className="card list">
        <div className="item">
          <div>
            <b>Focus</b>
            <p>Front-end engineering, interaction design, and product polish.</p>
          </div>
        </div>
        <div className="item">
          <div>
            <b>Principles</b>
            <p>Iterate fast, measure impact, keep it accessible.</p>
          </div>
        </div>
        <div className="item">
          <div>
            <b>Stack</b>
            <p>React, TypeScript, CSS, Node.</p>
          </div>
        </div>
      </div>

      <div className="card list">
        <div className="item">
          <div>
            <b>Recent</b>
            <br />
            <small>2024–2026</small>
            <p>Building delightful interfaces and helping teams raise their UI bar.</p>
          </div>
          <a className="pilllink" href="#contact">
            Let’s talk →
          </a>
        </div>

        <div className="item">
          <div>
            <b>Services</b>
            <p>Landing pages • UI rebuilds • Prototypes • Design systems</p>
          </div>
        </div>

        <div className="item">
          <div>
            <b>Fun</b>
            <p>Micro-interactions, typography, and turning “meh” into “wow”.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
