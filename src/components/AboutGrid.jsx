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
            <b>Recently...</b>
            <br />
            <p>Big data analytics aggregation and visualization. More on the nerd-side of UI but equally graitifying.</p>
          </div>
          {/* <a className="pilllink" href="#contact">
            Let’s talk →
          </a> */}
        </div>

        <div className="item">
          <div>
            <b>Attitude...</b>
            <p>I'm here for the mission. If leadership and execution align, I'm in. Otherwise, I will respectfully make my case with sound reasoning for course correction.</p>
          </div>
        </div>

        <div className="item">
          <div>
            <b>Life Advice...</b>
            <p>Don't take life advice from a stranger's CV.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
