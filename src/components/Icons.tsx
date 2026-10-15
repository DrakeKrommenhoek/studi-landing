type IconProps = { className?: string };

function Line({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function MailIcon(p: IconProps) {
  return (
    <Line {...p}>
      <path d="M7 13.5c0-1.2 1-2 2.1-2h29.6c1.2 0 2.2.9 2.2 2.1v20.8c0 1.2-1 2.1-2.2 2.1H9.2C8 36.5 7 35.6 7 34.4Z" />
      <path d="M8 13.5 24 26l16-12.6" />
    </Line>
  );
}

export function NoPhotoIcon(p: IconProps) {
  return (
    <Line {...p}>
      <path d="M8 16.5c0-1.4 1.1-2.5 2.5-2.5h5l2.7-4h11.6l2.7 4h5c1.4 0 2.5 1.1 2.5 2.5v18c0 1.4-1.1 2.5-2.5 2.5h-27C9.1 37 8 35.9 8 34.5Z" />
      <circle cx="24" cy="25" r="6.5" />
      <path d="M7 41 41 7" />
    </Line>
  );
}

export function ClassIcon(p: IconProps) {
  return (
    <Line {...p}>
      <path d="M24 13c-4-3-10-3.6-15-2.5v25c5-1.1 11-.5 15 2.5 4-3 10-3.6 15-2.5v-25c-5-1.1-11-.5-15 2.5Z" />
      <path d="M24 13v25" />
    </Line>
  );
}

export function ClearIcon(p: IconProps) {
  return (
    <Line {...p}>
      <rect x="8" y="10" width="32" height="29" rx="2.5" />
      <path d="M8 18h32M16 6.5v6M32 6.5v6" />
      <path d="m18 25 12 8M30 25l-12 8" />
    </Line>
  );
}
