import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="170"
      height="34"
      viewBox="0 0 170 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M26.333 11.25c0-4.66-3.79-8.45-8.45-8.45S9.433 6.59 9.433 11.25c0 1.94.66 3.73 1.76 5.18l6.69 8.23 6.69-8.23c1.1-1.45 1.76-3.24 1.76-5.18Z"
        stroke="hsl(var(--primary))"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.25 2.8c-4.14 0-7.5 3.36-7.5 7.5 0 4.14 3.36 7.5 7.5 7.5"
        stroke="hsl(var(--primary))"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.9 11.25a2.35 2.35 0 0 1-2.35-2.35"
        stroke="hsl(var(--accent))"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
