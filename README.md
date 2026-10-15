# Studi landing page

Landing page for Studi, a student prototype from BUS 3340 Design Thinking at Washington and Lee University.
Not an official W&L service.

- Live prototype: https://studi-demo-drake-krommenhoeks-projects.vercel.app
- Design rationale for each of the 13 principles: `DESIGN-NOTES.md`
- Build plan and animation timeline: `PLAN.md`

## Run it

```
npm install
npm run build
npm run start
```

## Checks (with `npm run start` running)

```
node scripts/shoot.mjs      # screenshots at 375, 768, 1440 in light, dark, reduced motion
node scripts/check.mjs      # iframe loads on desktop, never on mobile; animation frames
node scripts/keyboard.mjs   # tab order and focus rings
```
