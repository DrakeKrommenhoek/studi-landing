import { DemoButton } from "./DemoButton";

const LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#safety", label: "Safety" },
  { href: "#try-it", label: "Try it" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 bg-desk-deep shadow-[0_1px_0_rgba(0,0,0,.25)]">
      <nav aria-label="Main" className="wrap flex items-center gap-4 py-2">
        <a href="#top" className="inline-flex min-h-[44px] items-center font-hand text-[2rem] leading-none text-on-desk">
          Studi
        </a>
        <ul className="ml-auto hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="inline-flex min-h-[44px] items-center px-3 text-base text-on-desk-soft underline-offset-4 hover:text-on-desk hover:underline"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <DemoButton className="ml-auto !min-h-[44px] !px-5 !text-[1.15rem] lg:ml-4" />
      </nav>
    </header>
  );
}
