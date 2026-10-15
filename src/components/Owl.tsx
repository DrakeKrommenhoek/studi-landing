// The owl from the prototype, drawn with currentColor so it takes the color of its context.
export function Owl({ className, label }: { className?: string; label?: string }) {
  return (
    <svg
      viewBox="0 0 120 132"
      fill="none"
      stroke="currentColor"
      strokeWidth={3.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <path d="M31 42 C27 28 31 18 37 12 C42 22 47 28 53 30 C58 28 62 28 67 30 C73 28 78 22 83 12 C89 18 93 28 89 42 C99 60 97 88 90 102 C82 118 70 122 60 122 C50 122 38 118 30 102 C23 88 21 60 31 42 Z" />
      <circle cx="46" cy="54" r="13" />
      <circle cx="74" cy="54" r="13" />
      <path d="M59 54 h2" />
      <circle cx="47" cy="56" r="4.6" fill="currentColor" stroke="none" />
      <circle cx="73" cy="56" r="4.6" fill="currentColor" stroke="none" />
      <path d="M55 67 L60 75 L65 67 Z" />
      <path d="M34 80 C38 96 46 104 54 107" />
      <path d="M86 80 C82 96 74 104 66 107" />
      <path d="M52 88 q3 3 6 0 M62 88 q3 3 6 0 M57 96 q3 3 6 0" />
      <path d="M50 122 v6 M56 122 v6 M64 122 v6 M70 122 v6" />
    </svg>
  );
}
