const ROWS = [
  { before: "Solo study rooms fill up near finals.", with: "Groups of 3 get a room." },
  { before: "Asking a classmate you don't know feels awkward.", with: "You join a session, not a person." },
  { before: "Career help means scrolling Handshake for an open slot.", with: "Career Fellows matched to what you need." },
];

// Rows share a subgrid so each "before" sits level with its answer.
export function BeforeWith() {
  return (
    <section aria-labelledby="change-title" className="section wrap">
      <h2 id="change-title" className="h2">
        What changes
      </h2>
      <div className="mt-10 grid overflow-hidden rounded-[8px] shadow-[0_24px_40px_-28px_rgba(0,0,0,.7)] md:grid-cols-2 md:grid-rows-[auto_repeat(3,auto)]">
        <div className="grid gap-6 bg-desk-deep px-6 py-10 text-on-desk sm:px-10 md:row-span-4 md:grid-rows-subgrid md:gap-y-7 md:py-12">
          <h3 className="h3 text-on-desk-soft">Before</h3>
          {ROWS.map((r) => (
            <p key={r.before} className="flex gap-4 text-[1.125rem] leading-snug">
              <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 flex-none text-on-desk-soft" aria-hidden="true">
                <path d="M4 4.5 16 15.5M15.5 4 4.5 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
              <span>{r.before}</span>
            </p>
          ))}
        </div>
        <div className="page-paper grid gap-6 px-6 py-10 sm:px-10 md:row-span-4 md:grid-rows-subgrid md:gap-y-7 md:py-12">
          <h3 className="h3 text-ink">With Studi</h3>
          {ROWS.map((r) => (
            <p key={r.with} className="flex gap-4 text-[1.25rem] font-medium leading-snug">
              <svg viewBox="0 0 20 20" className="mt-1.5 h-4 w-4 flex-none text-stamp" aria-hidden="true">
                <path
                  d="M3 10.5c1.8 1.4 3.3 3 4.6 4.8C9.8 10.8 13 7 17 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{r.with}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
