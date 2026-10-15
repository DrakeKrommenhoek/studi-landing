const STEPS = [
  { label: "Idea", line: "Swipe to find a study buddy." },
  { label: "Feedback", line: "Saying \"two strangers assigned a room\" out loud sounded like a blind date." },
  { label: "Pivot", line: "Swipe on sessions instead. Groups of 3 or more, only inside a class." },
  { label: "Test", line: "Classmates scanned a QR code and ran the full prototype in class." },
];

export function Timeline() {
  return (
    <section aria-labelledby="story-title" className="section wrap">
      <h2 id="story-title" className="h2">
        How we got here
      </h2>
      <div className="relative mt-12">
        {/* The thread: vertical on mobile, horizontal on desktop */}
        <span
          className="absolute bottom-2 left-[9px] top-2 border-l-2 border-dashed border-on-desk-soft lg:bottom-auto lg:left-2 lg:right-2 lg:top-[9px] lg:border-l-0 lg:border-t-2"
          aria-hidden="true"
        />
        <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
        {STEPS.map((s, i) => (
          <li key={s.label} className="relative pl-10 lg:pl-0 lg:pt-10">
            <span
              className={`absolute left-0 top-1 h-5 w-5 rounded-full border-2 border-on-desk lg:top-0 ${
                s.label === "Pivot" ? "bg-on-desk" : "bg-desk"
              }`}
              aria-hidden="true"
            />
            <h3 className="h3">
              <span className="sr-only">Step {i + 1}: </span>
              {s.label}
            </h3>
            <p className="mt-2 max-w-[30ch] text-on-desk-soft">{s.line}</p>
          </li>
        ))}
        </ol>
      </div>
    </section>
  );
}
