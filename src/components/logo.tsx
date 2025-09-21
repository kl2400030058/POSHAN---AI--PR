import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="170" height="34" viewBox="0 0 170 34" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M19.136 3.064C19.136 3.064 8.848 9.344 11.456 22.336C14.064 35.328 27.52 28.192 27.52 28.192" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.88 12.288C18.88 12.288 24.32 6.4 30.72 10.24" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="42" y="26" className="font-headline text-2xl font-semibold" fill="hsl(var(--foreground))">
        PoshanAI
      </text>
    </svg>
  );
}
