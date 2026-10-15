export function Stamp({ label, detail, className = "" }: { label: string; detail?: string; className?: string }) {
  return (
    <span className={`stamp ${className}`} aria-hidden="true">
      {label}
      {detail ? <small>{detail}</small> : null}
    </span>
  );
}
