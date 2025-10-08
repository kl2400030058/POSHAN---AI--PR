
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
      <g>
        <circle cx="17" cy="17" r="4" fill="hsl(var(--primary))" />
        <g stroke="hsl(var(--primary))" strokeWidth="2.5">
          <ellipse cx="17" cy="17" rx="15" ry="6" />
          <ellipse cx="17" cy="17" rx="15" ry="6" transform="rotate(60 17 17)" />
          <ellipse cx="17" cy="17" rx="15" ry="6" transform="rotate(120 17 17)" />
        </g>
      </g>
      <text
        x="42"
        y="26"
        className="font-headline text-2xl font-semibold"
        fill="hsl(var(--foreground))"
      >
        PoshanAI
      </text>
    </svg>
  );
}
