import { useMemo } from "react";

export function Footer() {
  // scroll to top action
  const scrollToTop = () => {
    const labScroller = document.querySelector('.lab-blocks');
    if (labScroller instanceof HTMLElement) {
      // lab is a special case
      labScroller.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className='footer'>
      <div>© {year} Contento Interactive</div>
      <div>
        Built with React •{' '}
        <span className='pilllink' onClick={scrollToTop} style={{ cursor: 'pointer' }}>
          Back to top
        </span>
      </div>
    </footer>
  );
}
