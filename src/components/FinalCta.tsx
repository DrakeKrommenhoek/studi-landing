import { DemoButton } from "./DemoButton";
import { Owl } from "./Owl";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="section wrap">
      <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:justify-center sm:gap-12 sm:text-left">
        <Owl className="w-28 flex-none text-on-desk md:w-36" />
        <div className="flex flex-col items-center gap-7 sm:items-start">
          <h2 id="cta-title" className="font-hand text-[2.441rem] leading-[1.05] md:text-[3.052rem]">
            Ideas don&apos;t grow alone.
          </h2>
          <DemoButton className="!min-h-[52px] !px-8 !text-[1.45rem]" />
        </div>
      </div>
    </section>
  );
}
