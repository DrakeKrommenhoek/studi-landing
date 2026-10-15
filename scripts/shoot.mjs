import { chromium } from "playwright";

const URL = process.env.URL || "http://localhost:3000";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const sizes = [
  [375, 812],
  [768, 1024],
  [1440, 900],
];
const browser = await chromium.launch({ executablePath: CHROME });

async function shot(name, w, h, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, ...opts });
  const page = await ctx.newPage();
  const demoRequests = [];
  page.on("request", (r) => r.url().includes("studi-demo") && demoRequests.push(r.url()));
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(opts.wait ?? 2600);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  await page.screenshot({ path: `screenshots/${name}-fold.png` });
  await page.screenshot({ path: `screenshots/${name}-full.png`, fullPage: true });
  console.log(`${name}: horizontal overflow ${overflow}px, demo requests before scroll ${demoRequests.length}`);
  await ctx.close();
}

for (const [w, h] of sizes) {
  await shot(`${w}-light`, w, h, { colorScheme: "light" });
  await shot(`${w}-dark`, w, h, { colorScheme: "dark" });
}
await shot("375-reduced-motion", 375, 812, { reducedMotion: "reduce", colorScheme: "light" });
await shot("1440-reduced-motion", 1440, 900, { reducedMotion: "reduce", colorScheme: "light" });
await browser.close();
