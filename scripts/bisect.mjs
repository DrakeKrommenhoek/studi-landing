import { chromium } from "playwright";
import fs from "fs";
const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
async function run(name, block, css) {
  const ctx = await browser.newContext({ viewport: { width: 412, height: 823 }, deviceScaleFactor: 1.75, isMobile: true });
  const page = await ctx.newPage();
  if (block) await page.route(block, (r) => r.abort());
  if (css) await page.addInitScript((c) => document.addEventListener("DOMContentLoaded", () => { const s = document.createElement("style"); s.textContent = c; document.head.append(s); }), css);
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await browser.startTracing(page, { path: "reports/b.json", categories: ["devtools.timeline"] });
  await page.goto("http://localhost:3000", { waitUntil: "load" });
  await page.waitForTimeout(3000);
  await browser.stopTracing();
  const ev = JSON.parse(fs.readFileSync("reports/b.json")).traceEvents.filter((e) => e.name === "Layout" && e.dur);
  const tot = ev.reduce((s, e) => s + e.dur / 1000, 0);
  console.log(name.padEnd(14), "total", Math.round(tot), "top", ev.map((e) => Math.round(e.dur / 1000)).sort((a, b) => b - a).slice(0, 4).join(","));
  await ctx.close();
}
await run("baseline");
await run("arial-only", null, "*{font-family:Arial!important}");
await run("arial-only2", null, "*{font-family:Arial!important}");
await run("baseline3");
await browser.close();
