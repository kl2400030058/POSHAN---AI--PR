
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
        <linearGradient id="apple-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary) / 0.8)" />
            <stop offset="100%" stopColor="hsl(var(--primary))" />
        </linearGradient>
        <linearGradient id="leaf-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(var(--accent) / 0.9)" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
         <linearGradient id="text-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--foreground))" />
          <stop offset="100%" stopColor="hsl(var(--foreground) / 0.8)" />
        </linearGradient>
        <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
            <feOffset dx="1" dy="2" result="offsetblur"/>
            <feComponentTransfer>
                <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
      </defs>
      <g transform="translate(2, 2)" filter="url(#drop-shadow)">
        <path d="M20.6,12.2c-0.1-3.2,2.3-5.5,5.1-5.6c2.8,0,4.4,2,5.2,4.1c-2.4,1.4-4.8,3.5-5.6,6.2C24.5,17.1,22.4,14.7,20.6,12.2z" fill="url(#leaf-gradient)" transform="rotate(-15, 25, 10)"/>
        <path d="M16.5,30C23.4,30,29,24.4,29,17.5C29,10.6,23.4,5,16.5,5C9.6,5,4,10.6,4,17.5C4,24.4,9.6,30,16.5,30z" fill="url(#apple-gradient)" />
        <path d="M21.2,5.5c0,0-1.2-1.4-3.5-1.4s-4,1.2-4.7,2.2" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <text
        x="42"
        y="26"
        className="font-headline text-2xl font-semibold"
        fill="url(#text-gradient)"
      >
        PoshanAI
      </text>
    </svg>
  );
}
