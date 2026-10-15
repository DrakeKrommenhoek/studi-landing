import { ClassIcon, ClearIcon, MailIcon, NoPhotoIcon } from "./Icons";

const RULES = [
  { text: "W&L email only.", Icon: MailIcon },
  { text: "No photos. No age.", Icon: NoPhotoIcon },
  { text: "Groups only form inside a class.", Icon: ClassIcon },
  { text: "Everything clears at the end of each term.", Icon: ClearIcon },
];

export function Safety() {
  return (
    <section id="safety" aria-labelledby="safety-title" className="section wrap md:py-32">
      <div className="page-paper relative rounded-[3px_8px_8px_3px] px-6 pb-12 pt-14 shadow-[0_30px_50px_-30px_rgba(0,0,0,.7)] sm:px-12 md:px-16 md:pb-16 md:pt-20">
        <span className="tape -top-3 left-10 rotate-[-4deg]" aria-hidden="true" />
        <span className="tape -top-3 right-10 rotate-[5deg]" aria-hidden="true" />
        <h2 id="safety-title" className="h2 text-ink">
          Built to feel safe.
        </h2>
        <ul className="mt-12 grid gap-x-16 gap-y-10 sm:grid-cols-2 md:mt-14">
          {RULES.map(({ text, Icon }) => (
            <li key={text} className="flex items-start gap-5">
              <Icon className="h-11 w-11 flex-none text-ink" />
              <span className="pt-1.5 font-hand text-[1.563rem] leading-[1.15] text-ink">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
