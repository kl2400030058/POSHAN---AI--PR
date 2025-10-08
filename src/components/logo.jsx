
export function Logo(props) {
  return (
    <svg
      width="170"
      height="34"
      viewBox="0 0 170 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <radialGradient
          id="atom-gradient"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(17 17) rotate(90) scale(16)"
        >
          <stop stopColor="hsl(var(--primary))" />
          <stop offset="1" stopColor="hsl(var(--primary) / 0.7)" />
        </radialGradient>
        <linearGradient id="text-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--foreground))" />
          <stop offset="100%" stopColor="hsl(var(--foreground) / 0.8)" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="hsl(var(--foreground) / 0.1)" />
        </filter>
      </defs>
      <g filter="url(#shadow)">
        <g transform="rotate(15 17 17)">
            <ellipse
            cx="17"
            cy="17"
            rx="15"
            ry="6"
            stroke="url(#atom-gradient)"
            strokeWidth="2.5"
            />
            <ellipse
            cx="17"
            cy="17"
            rx="15"
            ry="6"
            transform="rotate(60 17 17)"
            stroke="url(#atom-gradient)"
            strokeWidth="2.5"
            />
            <ellipse
            cx="17"
            cy="17"
            rx="15"
            ry="6"
            transform="rotate(120 17 17)"
            stroke="url(#atom-gradient)"
            strokeWidth="2.5"
            />
            <circle cx="17" cy="17" r="4" fill="url(#atom-gradient)" />
        </g>
      </g>
      <text
        x="42"
        y="26"
        className="font-headline text-2xl font-semibold"
        fill="url(#text-gradient)"
        style={{ textShadow: "1px 1px 2px hsl(var(--foreground) / 0.1)"}}
      >
        PoshanAI
      </text>
    </svg>
  );
}
