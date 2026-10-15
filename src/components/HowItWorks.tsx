import { Stamp } from "./Stamp";

function SignInSlip() {
  return (
    <div className="slip rounded-[3px] px-5 pb-5 pt-4">
      <p className="font-type text-[14px] text-ink-soft">W&amp;L email</p>
      <p className="mt-1 border-b-2 border-ink-soft pb-1 font-type text-[15px]">you@mail.wlu.edu</p>
      <p className="mt-4 font-type text-[14px] text-ink-soft">6-digit code</p>
      <div className="mt-1.5 flex gap-1.5">
        {["4", "8", "1", "", "", ""].map((d, i) => (
          <span
            key={i}
            className="flex h-8 w-7 items-center justify-center rounded-[3px] border-2 border-ink-soft font-type text-[15px]"
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProfileSlip() {
  const chips = [
    { label: "Quiet", on: false },
    { label: "Talk it out", on: false },
    { label: "A mix", on: true },
    { label: "Evenings", on: true },
    { label: "90 min", on: false },
    { label: "Leyburn", on: true },
  ];
  return (
    <div className="slip rounded-[3px] px-5 pb-5 pt-4">
      <p className="font-type text-[14px] text-ink-soft">BUS 3340 / ECON 2003</p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {chips.map((c) => (
          <li
            key={c.label}
            className={`rounded-hand border-2 px-3 pb-1 pt-0.5 font-hand text-[17px] ${
              c.on ? "border-ink bg-ink text-slip" : "border-ink-soft text-ink"
            }`}
          >
            {c.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SessionSlip() {
  return (
    <div className="page-paper relative overflow-hidden rounded-[2px_8px_8px_2px] pb-5 pl-6 pr-5 pt-4">
      <div className="flex items-center justify-between font-type text-[14px] text-ink-soft">
        <span>BUS 3340</span>
        <span className="inline-flex gap-1" aria-hidden="true">
          <i className="seat seat-on" />
          <i className="seat seat-on" />
          <i className="seat seat-on" />
          <i className="seat" />
        </span>
      </div>
      <p className="mt-1 font-hand text-[23px] leading-tight">Prototype build night</p>
      <hr className="my-2.5 h-0.5 border-0 bg-rule opacity-85" />
      <p className="font-type text-[14px]">Tonight, 7:00 to 9:00 pm</p>
      <Stamp label="JOINED" className="mt-3 -rotate-6 !text-lg opacity-90" />
    </div>
  );
}

const STEPS = [
  { title: "Sign in with your W&L email.", line: "Only W&L students get in.", art: <SignInSlip /> },
  { title: "Build your profile in 60 seconds.", line: "Classes, study style, best time, favorite spot.", art: <ProfileSlip /> },
  { title: "Swipe to join.", line: "Swipe right on a session for your class. 3 people unlock a room.", art: <SessionSlip /> },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="section wrap">
      <h2 id="how-title" className="h2">
        How it works
      </h2>
      <ol className="mt-12 grid gap-14 lg:grid-cols-3 lg:gap-10">
        {STEPS.map((s, i) => (
          <li key={s.title} className="flex flex-col md:grid md:grid-cols-[1fr_320px] md:items-start md:gap-x-12 lg:flex">
            <div>
              <span className="font-hand text-[3.052rem] leading-none text-on-desk-soft" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="h3 mt-2">{s.title}</h3>
              <p className="mt-2 max-w-[30ch] text-on-desk-soft">{s.line}</p>
            </div>
            <div className={`mt-6 max-w-[320px] md:mt-3 lg:mt-6 ${["-rotate-1", "rotate-[0.8deg]", "-rotate-[0.5deg]"][i]}`} aria-hidden="true">
              {s.art}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
