import { useEffect, useRef } from "react";

export function Section({ id, title, subtitle, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("on");
        });
      },
      { threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} className="reveal">
      <div className="section-head">
        <h2>{title}</h2>
        <span>{subtitle}</span>
      </div>
      {children}
    </section>
  );
}
