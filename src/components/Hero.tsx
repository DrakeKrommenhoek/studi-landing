import { DemoButton } from "./DemoButton";
import HeroAnimation from "./HeroAnimation";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="wrap pb-16 pt-12 md:pb-24 md:pt-16">
      <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div>
          <h1 id="hero-title" className="max-w-[14ch] font-hand text-[2.441rem] leading-[1.02] md:text-[3.815rem]">
            Swipe into study groups for your classes.
          </h1>
          <p className="mt-6 max-w-[30rem] text-[1.25rem] leading-normal text-on-desk-soft">
            Studi matches W&amp;L students to study groups, study spots, and Career Fellows. Fill a group of 3 and a room
            unlocks.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
            <DemoButton className="!min-h-[52px] !px-7 !text-[1.45rem]" />
            <a href="#how-it-works" className="text-link">
              See how it works
            </a>
          </div>
        </div>
        <HeroAnimation />
      </div>
    </section>
  );
}
