import { DEMO_URL } from "@/lib/site";

// The only element on the page that uses the note-yellow action color.
export function DemoButton({ className = "" }: { className?: string }) {
  return (
    <a href={DEMO_URL} className={`btn-demo ${className}`}>
      Try the demo
    </a>
  );
}
