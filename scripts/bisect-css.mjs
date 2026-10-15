import { chromium } from "playwright";
import fs from "fs";
const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
async function run(name, rewrite) {
  const times = [];
  for (let k = 0; k < 3; k++) {
    const ctx = await browser.newContext({ viewport: { width: 412, height: 823 }, deviceScaleFactor: 1.75, isMobile: true });
    const page = await ctx.newPage();
    await page.route(/\.css$/, async (r) => {
      const res = await r.fetch();
      r.fulfill({ response: res, body: rewrite((await res.text())), contentType: "text/css" });
    });
    await page.route(/\.js$/, (r) => r.abort());
    const cdp = await ctx.newCDPSession(page);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await browser.startTracing(page, { path: "reports/c.json", categories: ["devtools.timeline"] });
    await page.goto("http://localhost:3000/", { waitUntil: "load" });
    await page.waitForTimeout(1500);
    await browser.stopTracing();
    const ev = JSON.parse(fs.readFileSync("reports/c.json")).traceEvents.filter((e) => e.name === "Layout" && e.dur);
    times.push(Math.round(ev.reduce((s, e) => s + e.dur / 1000, 0)));
    await ctx.close();
  }
  console.log(name.padEnd(16), times.join(" / "));
}
const HAND = '@font-face{font-family:__Patrick_Hand_Fallback_x;src:local("Arial");size-adjust:81.43%}';
const BODY = '@font-face{font-family:__DM_Sans_Fallback_x;src:local("Arial");size-adjust:104.53%}';
await run("none", (c) => c);
await run("hand-local", (c) => c + HAND + "h1{font-family:var(--font-hand),__Patrick_Hand_Fallback_x}");
await run("hand+body", (c) => c + HAND + BODY + "h1{font-family:var(--font-hand),__Patrick_Hand_Fallback_x}body{font-family:var(--font-body),__DM_Sans_Fallback_x}");
await browser.close();
