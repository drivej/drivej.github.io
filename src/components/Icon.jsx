export function Icon({ name }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    viewBox: "0 0 24 24",
  };

  if (name === "plus") {
    return (
      <svg {...common}>
        <path d="M12 5v14" />
        <path d="M19 12H5" />
      </svg>
    );
  }
  if (name === "mail") {
    return (
      <svg {...common}>
        <path d="M4 4h16v16H4z" />
        <path d="M22 6l-10 7L2 6" />
      </svg>
    );
  }
  if (name === "download") {
    return (
      <svg {...common}>
        <path d="M12 3v12" />
        <path d="M7 10l5 5 5-5" />
        <path d="M5 21h14" />
      </svg>
    );
  }
  return null;
}
