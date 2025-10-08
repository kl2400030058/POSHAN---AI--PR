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
        d="M17.0002 4.25C13.4377 4.25 10.5418 7.14582 10.5418 10.7083C10.5418 12.6322 11.2743 14.3756 12.4835 15.6558L17.0002 20.4L21.5168 15.6558C22.726 14.3756 23.4585 12.6322 23.4585 10.7083C23.4585 7.14582 20.5627 4.25 17.0002 4.25Z"
        stroke="hsl(var(--primary))"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.0002 4.25C15.5627 5.69249 14.6668 7.56291 14.6668 9.58333C14.6668 12.6458 17.0002 15.1667 17.0002 17.8333"
        stroke="hsl(var(--primary))"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.8333 11.625C20.8333 13.9167 19.1441 15.8333 17 15.8333C14.8559 15.8333 13.1667 13.9167 13.1667 11.625"
        stroke="hsl(var(--accent))"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
       <path 
        d="M17 20.4V29.75" 
        stroke="hsl(var(--primary))" 
        stroke-width="2.5" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
      <path 
        d="M12.875 25.5H21.125" _
        stroke="hsl(var(--primary))" 
        stroke-width="2.5" 
        stroke-linecap="round" 
        stroke-linejoin="round"
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
