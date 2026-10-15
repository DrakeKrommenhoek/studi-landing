import { chromium } from "playwright";
import fs from "fs";
const html = await (await fetch("http://localhost:3000")).text();
const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const sections = [...html.matchAll(/<section[^>]*aria-labelledby="([^"]+)"/g)].map((m) => m[1]);
function without(id) {
  const start = html.indexOf(`aria-labelledby="${id}"`);
  const s = html.lastIndexOf("<section", start);
  const e = html.indexOf("</section>", start) + 10;
  return html.slice(0, s) + html.slice(e);
}
async function run(name, body) {
  const times = [];
  for (let k = 0; k < 2; k++) {
    const ctx = await browser.newContext({ viewport: { width: 412, height: 823 }, deviceScaleFactor: 1.75, isMobile: true });
    const page = await ctx.newPage();
    await page.route("http://localhost:3000/", (r) => r.fulfill({ body, contentType: "text/html" }));
    await page.route(/\.js$/, (r) => r.abort());
    const cdp = await ctx.newCDPSession(page);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await browser.startTracing(page, { path: "reports/d.json", categories: ["devtools.timeline"] });
    await page.goto("http://localhost:3000/", { waitUntil: "load" });
    await page.waitForTimeout(1500);
    await browser.stopTracing();
    const ev = JSON.parse(fs.readFileSync("reports/d.json")).traceEvents.filter((e) => e.name === "Layout" && e.dur);
    times.push(Math.round(ev.reduce((s, e) => s + e.dur / 1000, 0)));
    await ctx.close();
  }
  console.log(name.padEnd(16), times.join(" / "));
}
await run("full", html);
for (const id of sections) await run("-" + id, without(id));
await browser.close();
