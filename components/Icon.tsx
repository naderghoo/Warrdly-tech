const paths: Record<string, React.ReactNode> = {
  box: (<><path d="M3 7l9-4 9 4-9 4-9-4z" /><path d="M3 7v10l9 4 9-4V7" /><path d="M12 11v10" /></>),
  truck: (<><path d="M3 6h11v10H3z" /><path d="M14 10h4l3 3v3h-7" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>),
  drop: <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />,
  store: (<><path d="M4 9l1-5h14l1 5" /><path d="M4 9h16v11H4z" /><path d="M9 20v-6h6v6" /></>),
  gear: (<><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></>),
  code: <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />,
  swap: <path d="M4 8h14l-4-4M20 16H6l4 4" />,
  cap: (<><path d="M2 9l10-5 10 5-10 5-10-5z" /><path d="M6 11v5c3 2 9 2 12 0v-5" /></>),
  buoy: (<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><path d="M5.6 5.6l3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6" /></>),
  cloud: <path d="M7 18h10a4 4 0 0 0 0-8 6 6 0 0 0-11.5 1.5A3.5 3.5 0 0 0 7 18z" />,
  check: <path d="M5 12l5 5 9-10" />,
  shield: (<><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>),
  globe: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" /></>),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chat: <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19.1L4 20z" />,
  mail: (<><path d="M3 6h18v12H3z" /><path d="M3 7l9 6 9-6" /></>),
  pin: (<><path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></>),
  calendar: (<><path d="M4 6h16v14H4z" /><path d="M4 10h16M9 3v4M15 3v4" /></>),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  user: (<><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></>),
  calc: (<><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8M8 11h2M14 11h2M8 15h2M14 15h2M8 18.5h2M14 18.5h2" /></>),
};

export function Icon({
  name,
  size = 24,
  stroke = 2,
  className = "",
}: {
  name: string;
  size?: number;
  stroke?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

/** Arrow pointing "forward" — flips automatically in RTL */
export function Forward({ size = 18 }: { size?: number }) {
  return <Icon name="arrow" size={size} className="rtl:-scale-x-100" />;
}
