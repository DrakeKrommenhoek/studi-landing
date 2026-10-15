"use client";

import { LazyMotion, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Phase = "rest" | "drag" | "stamp" | "seat" | "slip" | "hold" | "turn";

const ORDER: Phase[] = ["rest", "drag", "stamp", "seat", "slip", "hold", "turn"];
const DURATION: Record<Phase, number> = {
  rest: 1200,
  drag: 1100,
  stamp: 600,
  seat: 500,
  slip: 700,
  hold: 1500,
  turn: 1100,
};

type Session = { code: string; title: string; when: string; where: string; fit: string; why: string; room: string };

const SESSIONS: Session[] = [
  {
    code: "BUS 3340",
    title: "Prototype build night",
    when: "Tonight, 7:00 to 9:00 pm",
    where: "Leyburn Library",
    fit: "94% fit.",
    why: "Matches your evenings.",
    room: "Leyburn group study room B",
  },
  {
    code: "ECON 2003",
    title: "Problem set review",
    when: "Thursday, 4:00 to 6:00 pm",
    where: "Leyburn Library",
    fit: "91% fit.",
    why: "Matches your afternoons.",
    room: "Leyburn group study room C",
  },
];

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const STAMP_EASE = [0.2, 1.5, 0.4, 1] as const;
const PAGE_INSET = "absolute bottom-[10px] left-[9px] right-[18px] top-[8px] rounded-[2px_8px_8px_2px]";

// domAnimation loads in its own chunk after hydration, keeping it off the critical path.
const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

const reached = (phase: Phase, step: Phase) => ORDER.indexOf(phase) >= ORDER.indexOf(step);

function Seats({ filled, popThird }: { filled: number; popThird: boolean }) {
  return (
    <span className="inline-flex gap-1">
      {[0, 1, 2, 3].map((i) => (
        <m.i
          key={i}
          className={`seat ${i < filled ? "seat-on" : ""}`}
          animate={i === 2 && popThird ? { scale: [1, 1.6, 1] } : { scale: 1 }}
          transition={{ duration: 0.4 }}
        />
      ))}
    </span>
  );
}

function CardFace({ s, filled, popThird = false }: { s: Session; filled: number; popThird?: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col pb-3.5 pl-7 pr-[18px] pt-[18px]">
      <div className="flex items-center justify-between font-type text-[14px] text-ink-soft">
        <span>{s.code}</span>
        <Seats filled={filled} popThird={popThird} />
      </div>
      <p className="mt-1.5 font-hand text-[29px] leading-[1.05] text-ink">{s.title}</p>
      <hr className="my-3 h-0.5 border-0 bg-rule opacity-85" />
      <dl className="grid grid-cols-[52px_1fr] gap-x-2 gap-y-1.5">
        <dt className="font-hand text-[17px] leading-tight text-ink-soft">When</dt>
        <dd className="font-type text-[14px] leading-snug text-ink">{s.when}</dd>
        <dt className="font-hand text-[17px] leading-tight text-ink-soft">Where</dt>
        <dd className="font-type text-[14px] leading-snug text-ink">{s.where}</dd>
      </dl>
      <p className="mt-3.5 -rotate-2 font-hand text-[19px] leading-[1.15] text-stamp">
        <b className="text-[24px] font-normal">{s.fit}</b> {s.why}
      </p>
    </div>
  );
}

export default function HeroAnimation() {
  const [phase, setPhase] = useState<Phase>("rest");
  const [loop, setLoop] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [date, setDate] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = new Date();
    setDate(`${MONTHS[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setTabVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  const running = !userPaused && onScreen && tabVisible && !reduced;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => {
      if (phase === "turn") {
        setLoop((l) => l + 1);
        setPhase("rest");
      } else {
        setPhase(ORDER[ORDER.indexOf(phase) + 1]);
      }
    }, DURATION[phase]);
    return () => window.clearTimeout(t);
  }, [phase, running]);

  // Reduced motion shows the finished state and nothing moves.
  const shown: Phase = reduced ? "hold" : phase;
  const top = SESSIONS[loop % SESSIONS.length];
  const next = SESSIONS[(loop + 1) % SESSIONS.length];
  const instant = { duration: 0 };
  const dragging = shown === "drag";
  const stamped = reached(shown, "stamp");
  const seated = reached(shown, "seat");
  const slipped = reached(shown, "slip");
  const turning = shown === "turn";
  const cursorOn = shown === "rest" || dragging;

  return (
    <div ref={rootRef} className="flex flex-col items-center gap-4">
      <p id="hero-animation-desc" className="sr-only">
        Animation of the Studi app. A catalog card for a BUS 3340 session called Prototype build night, tonight from 7:00 to
        9:00 pm at Leyburn Library, shows 2 of 4 seats taken and a note reading 94% fit, matches your evenings. A cursor
        drags the card right, a violet JOINED stamp lands on it, a third seat fills, and a slip slides up reading Room
        unlocked, Leyburn group study room B. The page then turns to the next session.
      </p>
      <LazyMotion features={loadFeatures} strict>
        <div
          aria-hidden="true"
          className="relative flex h-[540px] w-[284px] flex-col gap-3 rounded-[34px] bg-desk px-3 pb-4 pt-5 sm:h-[580px] sm:w-[300px]"
          style={{ boxShadow: "0 0 0 9px var(--desk-deep), 0 40px 80px -30px rgba(0,0,0,.7)" }}
        >
          <div className="flex items-baseline justify-between px-1 font-hand text-on-desk">
            <span className="text-[22px] leading-none">Study groups</span>
            <span className="text-[15px] leading-none text-on-desk-soft">Swipe right to join</span>
          </div>

          <div className="relative flex-1 rounded-[8px_14px_14px_8px] bg-cover shadow-[0_18px_30px_-18px_rgba(0,0,0,.65)]">
            <div
              className={`${PAGE_INSET} page-paper`}
              style={{ boxShadow: "2px 0 0 var(--paper-2), 4px 0 0 var(--paper), 6px 0 0 var(--paper-2)" }}
            >
              <CardFace s={next} filled={2} />
            </div>

            <m.div
              key={loop}
              className={PAGE_INSET}
              initial={false}
              animate={dragging ? { x: 56, rotate: 5 } : { x: 0, rotate: 0 }}
              transition={
                reduced ? instant : dragging ? { duration: 1.1, ease: "easeInOut" } : { type: "spring", stiffness: 420, damping: 22 }
              }
            >
              <m.div
                className="page-paper relative h-full w-full overflow-hidden rounded-[inherit]"
                style={{ transformOrigin: "left center", transformPerspective: 1500, backfaceVisibility: "hidden" }}
                initial={false}
                animate={{ rotateY: turning ? -180 : 0 }}
                transition={turning ? { duration: 1.1, ease: [0.45, 0, 0.3, 1] } : instant}
              >
                <CardFace s={top} filled={seated ? 3 : 2} popThird={seated && !reduced} />

                <m.div
                  className="absolute right-4 top-[56%] z-10"
                  initial={false}
                  animate={stamped ? { opacity: 0.92, scale: 1, rotate: -12 } : { opacity: 0, scale: 1.7, rotate: -12 }}
                  transition={reduced ? instant : stamped ? { duration: 0.4, ease: STAMP_EASE } : instant}
                >
                  <span className="stamp">
                    JOINED
                    <small>{date || " "}</small>
                  </span>
                </m.div>

                <m.div
                  className="slip absolute bottom-4 left-4 right-3 rounded-[3px] px-4 pb-3 pt-4"
                  initial={false}
                  animate={slipped ? { y: 0, opacity: 1, rotate: -1.2 } : { y: 36, opacity: 0, rotate: -1.2 }}
                  transition={reduced ? instant : slipped ? { duration: 0.5, ease: "easeOut" } : instant}
                >
                  <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[-3deg]" />
                  <p className="font-hand text-[22px] leading-none">Room unlocked.</p>
                  <p className="mt-1.5 font-type text-[14px] leading-snug">{top.room}</p>
                </m.div>

                <m.div
                  className="pointer-events-none absolute inset-0 rounded-[inherit]"
                  style={{ background: "linear-gradient(90deg, rgba(40,20,10,0), rgba(40,20,10,.5))" }}
                  initial={false}
                  animate={{ opacity: turning ? 1 : 0 }}
                  transition={turning ? { duration: 1.1 } : instant}
                />
              </m.div>

              {!reduced && (
                <m.svg
                  viewBox="0 0 30 36"
                  className="absolute left-[46%] top-[44%] z-20 h-9 w-[30px]"
                  initial={false}
                  animate={{ opacity: cursorOn ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: shown === "rest" ? 0.3 : 0 }}
                >
                  <path
                    d="M4.5 3.2c-.3 7.6.2 15.6-.2 23.3 2.1-1.8 4.1-3.8 6.3-5.6 1.4 3.2 2.9 6.6 4.5 9.8l4.4-2.1c-1.5-3.2-3.1-6.3-4.6-9.5 3-.1 6-.2 9.1-.6C18.5 12.9 11.3 8.3 4.5 3.2Z"
                    fill="var(--slip)"
                    stroke="var(--ink)"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </m.svg>
              )}
            </m.div>
          </div>

          <div className="grid grid-cols-[1fr_1.5fr] gap-2.5 font-hand text-[19px] leading-none">
            <span className="rounded-hand border-2 border-on-desk-soft py-2.5 text-center text-on-desk">Skip</span>
            <span className="rounded-hand bg-stamp py-2.5 text-center text-[#FFFDF8]">Join group</span>
          </div>
        </div>
      </LazyMotion>

      {!reduced && (
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          className="mt-2 inline-flex min-h-[44px] items-center gap-2 rounded-hand border-2 border-on-desk-soft px-4 font-hand text-[18px] leading-none text-on-desk hover:bg-desk-deep"
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true" fill="currentColor">
            {userPaused ? <path d="M4 2.5v11l9-5.5z" /> : <path d="M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z" />}
          </svg>
          {userPaused ? "Play animation" : "Pause animation"}
        </button>
      )}
    </div>
  );
}
