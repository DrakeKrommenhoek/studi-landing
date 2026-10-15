import { Stamp } from "./Stamp";

type Card = { call: string; title: string; lines: [string, string]; lead?: boolean };

const CARDS: Card[] = [
  {
    call: "LEY 3 Q",
    title: "Your Studi spot",
    lines: ["Tell us how you focus. We pick the spot.", "Works on day one, before your classmates join."],
  },
  {
    call: "LEY G",
    title: "Study groups",
    lines: ["Groups form inside a class.", "3 people unlock a private room."],
    lead: true,
  },
  {
    call: "CPD 301",
    title: "Career Fellows",
    lines: ["Peer advisors matched to what you need.", "Handshake shows who's free. Studi shows who fits."],
  },
];

// Library catalog cards: typed call number, red rule, punched hole at the foot.
function CatalogCard({ card }: { card: Card }) {
  return (
    <article
      className={`slip relative flex h-full flex-col rounded-[4px] px-6 pb-12 pt-5 ${
        card.lead ? "lg:-mt-6 lg:px-8 lg:pb-14 lg:pt-7" : ""
      }`}
    >
      <p className="font-type text-[15px] font-bold tracking-wide text-ink-soft">{card.call}</p>
      <h3 className={`mt-1 font-hand leading-[1.1] ${card.lead ? "text-[1.953rem] md:text-[2.441rem]" : "text-[1.563rem] md:text-[1.953rem]"}`}>
        {card.title}
      </h3>
      <hr className="mb-4 mt-3 h-0.5 border-0 bg-rule opacity-85" />
      <ul className={`space-y-2 leading-snug ${card.lead ? "text-[1.2rem]" : ""}`}>
        {card.lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      {card.lead ? <Stamp label="GROUPS OF 3" detail="ROOM UNLOCKS" className="mt-6 self-start -rotate-6 opacity-90" /> : null}
      <span className="absolute bottom-4 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-desk shadow-[inset_0_2px_3px_rgba(0,0,0,.4)]" aria-hidden="true" />
    </article>
  );
}

export function Matches() {
  return (
    <section aria-labelledby="matches-title" className="section wrap">
      <h2 id="matches-title" className="h2">
        One profile, three matches
      </h2>
      <div className="mt-14 grid max-w-[560px] items-start gap-8 lg:max-w-none lg:grid-cols-[1fr_1.3fr_1fr]">
        <div className="lg:rotate-[-1deg]">
          <CatalogCard card={CARDS[0]} />
        </div>
        <CatalogCard card={CARDS[1]} />
        <div className="lg:rotate-[1deg]">
          <CatalogCard card={CARDS[2]} />
        </div>
      </div>
    </section>
  );
}
