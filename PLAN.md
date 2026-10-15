# Studi landing page plan

## Sources
- `reference/prototype.html`: downloaded from the live prototype. Reference only, never imported.
- Pulled from it: color tokens (identical to the brief), owl SVG (viewBox 0 0 120 132), hand-drawn radius
  `255px 16px 225px 16px/16px 225px 16px 255px`, stamp style (4px double violet border, Courier bold,
  rotate -12deg, multiply blend), book page (rust cover, cream page with spine shade), catalog facts
  layout (Patrick Hand labels, Courier values), margin note (violet, rotate -2deg), seat dots, ruled slip.
- Prototype sends no `X-Frame-Options` or CSP header, so the iframe embed works.

## Component tree
```
app/layout.tsx            server  fonts (next/font/google), metadata, skip link
app/page.tsx              server  composes the 10 blocks below
app/icon.svg                      owl on rust
app/opengraph-image.tsx           ImageResponse: rust cover, cream "Studi" plate, tagline
components/
  Nav.tsx                 server  sticky. wordmark, desktop anchors, Try the demo
  Hero.tsx                server  Z-pattern 2 col. H1 is LCP
  HeroAnimation.tsx       CLIENT  the only client component. LazyMotion + domAnimation + m
  BeforeWith.tsx          server  desk vs paper, rows aligned with subgrid
  HowItWorks.tsx          server  3 numbered steps + static catalog slips
  Matches.tsx             server  3 catalog cards, Study groups is the lead (larger + stamp)
  Safety.tsx              server  taped paper sheet, 4 rules with line icons
  Timeline.tsx            server  Idea, Feedback, Pivot, Test
  TryIt.tsx               server  phone frame + lazy iframe (lg+), QR built at build time
  FinalCta.tsx            server  centered heading, button, owl
  Footer.tsx              server
  Owl.tsx, Stamp.tsx, DemoButton.tsx, Icons.tsx   server primitives
lib/site.ts                       DEMO_URL
```

## Blocks (10, the Simplicity cap)
1 Nav, 2 Hero, 3 What changes, 4 How it works, 5 One profile three matches, 6 Safety,
7 How we got here, 8 Try it, 9 Final CTA, 10 Footer.

## Type scale (ratio 1.25 from 16px)
16 / 20 / 25 / 31 / 39 / 49 / 61. Body copy 18px. H1 61 desktop, 39 mobile. H2 39 desktop, 31 mobile. H3 25.

## Hero animation timeline (6.7s loop)
| Phase | ms | What moves |
|---|---|---|
| rest  | 1200 | card at rest, 2 of 4 seats, cursor fades in on the card |
| drag  | 1100 | cursor and card slide right 56px, card tilts 5deg |
| stamp | 600  | card springs back. JOINED stamp scales 1.7 to 1 with overshoot, today's date |
| seat  | 500  | third seat dot fills with a small pop |
| slip  | 700  | taped slip slides up: "Room unlocked. Leyburn group study room B." |
| hold  | 1500 | hold |
| turn  | 1100 | page rotates on its spine to -180deg with shade, revealing the next card |
Then the next card becomes the top card (keyed remount, no visual jump) and the loop restarts.

Stops when: user pauses, hero is offscreen (IntersectionObserver), tab hidden (visibilitychange).
Reduced motion: final frame (stamped, 3 of 4, room unlocked), no loop, no pause button.

## Decisions on brief conflicts
- Mobile Try it button says "Try the demo", not "Open the demo", to keep one CTA phrase (Simplicity, Emphasis).
- All "Try the demo" buttons open the prototype URL in the same tab, so the label always means the same thing.
