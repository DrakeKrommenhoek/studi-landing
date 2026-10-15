import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/components/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        desk: "var(--desk)",
        "desk-deep": "var(--desk-deep)",
        "on-desk": "var(--on-desk)",
        "on-desk-soft": "var(--on-desk-soft)",
        cover: "var(--cover)",
        "cover-deep": "var(--cover-deep)",
        "on-cover": "var(--on-cover)",
        paper: "var(--paper)",
        "paper-2": "var(--paper-2)",
        slip: "var(--slip)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        rule: "var(--rule)",
        stamp: "var(--stamp)",
        note: "var(--note)",
        tape: "var(--tape)",
        focus: "var(--focus)",
      },
      fontFamily: {
        hand: ["var(--font-hand)", "Segoe Print", "cursive"],
        body: ["var(--font-body)", "sans-serif"],
        type: ["var(--font-type)", "Courier New", "monospace"],
      },
      borderRadius: {
        hand: "255px 16px 225px 16px/16px 225px 16px 255px",
      },
      maxWidth: {
        page: "1120px",
        measure: "65ch",
      },
    },
  },
  plugins: [],
};
export default config;
