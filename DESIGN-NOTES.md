# Studi landing page: design notes

How the page applies the 13 principles from BUS 3340. Each note names the screenshot that shows it (all in `screenshots/`).

## Visual principles

**Consistency.** The page uses the prototype's exact color tokens, owl, hand-drawn button radius, violet JOINED stamp, and catalog-card layout, so moving from the landing page into the demo feels like one product. Fonts match our slides and the prototype: Patrick Hand for headlines, DM Sans for body, Courier Prime only inside catalog cards. Proof: `1440-light-fold.png` next to `1440-try-it.png` (the embedded prototype).

**Hierarchy.** There is one H1, one H2 per section, and a 1.25 type scale (61px H1 on desktop, 39px on mobile, 39px H2, 25px H3, 18px body). Size, then handwriting, then color tells you what to read first. Proof: `1440-light-full.png`.

**Proximity.** Inside each catalog card, the call number, title, rule, and two lines sit 4 to 12px apart. The cards themselves are 32px or more apart, more than 3x the space inside a card, so each card reads as one unit. Proof: the "One profile, three matches" cards in `1440-light-full.png` and `375-light-full.png`.

**Balance.** The hero is an asymmetric two-column layout: heavy type on the left, the tall phone animation on the right. Neither side is a mirror of the other, but their visual weight evens out. Proof: `1440-light-fold.png`.

**Contrast.** "What changes" puts each Before line on dark desk wood beside its With Studi answer on light cream paper, and each pair sits on the same row. All text passes WCAG AA, and Lighthouse Accessibility scores 100. Proof: `1440-light-full.png`, `1440-dark-full.png`, `reports/lighthouse-mobile-local.report.html`.

**Emphasis.** Note yellow is the one action color, and only the "Try the demo" buttons use it. In "One profile, three matches," the Study groups card is the lead: it is larger, raised, and the only card with a stamp. Proof: `1440-light-fold.png` and `1440-light-full.png`.

**Simplicity.** The page has exactly 10 blocks, no carousel, no hamburger menu, and one CTA phrase used everywhere. Each section makes one point with as few words as possible. Proof: `375-light-full.png`.

**White space.** Sections are 96px apart on desktop and 64px on mobile, and the Safety section gets extra room (128px) because it answers "is this creepy?" Paragraphs are capped at 65 characters a line. Proof: `1440-light-full.png` (the Safety sheet).

## UX principles

**Z pattern.** The eye moves from the Studi wordmark to the Try the demo button at top right, then diagonally across the animated phone to the headline, then across to the primary button. On mobile the headline, subhead, and buttons stack above the animation so the message comes first. Proof: `1440-light-fold.png` and `375-light-fold.png`.

**Speed and optimization.** First-load JS on the home route is 97.7KB, under the 150KB budget. Only the hero animation ships client JS, and its framer-motion features load in a separate chunk after hydration. All art is SVG, the QR code is generated at build time, fonts are self-hosted with `display: swap`, and the demo iframe is lazy. On mobile the iframe is never requested at all. Proof: `npm run build` output, Lighthouse reports in `reports/`.

**Mobile responsiveness.** The page was designed at 375px first, then 768px and 1440px. Three-column grids wait until 1024px, and tablet uses a text-beside-illustration row. No viewport scrolls horizontally (measured at 0px), and every tap target is 44px or larger. Proof: `375-light-full.png`, `768-light-full.png`, `1440-light-full.png`.

**Dynamic / variable.** The hero loops the core action: drag, JOINED stamp, third seat fills, room unlocks, page turns. Below it, the real prototype runs inside the page, the theme follows the system's dark mode, and the layout reflows at each breakpoint. Proof: `anim-600ms.png` through `anim-5900ms.png`, `1440-try-it.png`, and the `-dark-` screenshots.

**Accessibility.** The page uses semantic landmarks, a skip link, a yellow focus ring on every control, alt text on the QR code, and a text description of the animation for screen readers. The loop has a visible "Pause animation" button and stops when offscreen or when the tab is hidden. With reduced motion, the page shows the finished frame and nothing moves. Proof: `1440-focus-skip-link.png`, `1440-focus-nav.png`, `375-reduced-motion-fold.png`, `1440-reduced-motion-fold.png`.
