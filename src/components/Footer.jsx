export function Footer({ name, year }) {
  return (
    <footer className="footer">
      <div>© {year} {name}</div>
      <div>
        Built with React • <a className="pilllink" href="#top">Back to top</a>
      </div>
    </footer>
  );
}
