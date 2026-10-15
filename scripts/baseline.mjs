import { chromium } from "playwright";
import fs from "fs";
const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
for (const [name, html] of [["plain", "<p>hello world</p>"], ["cursive", "<p style='font-family:cursive'>hello</p><p style='font-family:monospace'>hi</p>"]]) {
  const ctx = await browser.newContext({ viewport: { width: 412, height: 823 } });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await browser.startTracing(page, { path: "reports/base.json", categories: ["devtools.timeline"] });
  await page.setContent(html);
  await page.waitForTimeout(500);
  await browser.stopTracing();
  const ev = JSON.parse(fs.readFileSync("reports/base.json")).traceEvents.filter((e) => e.name === "Layout" && e.dur);
  console.log(name, ev.map((e) => Math.round(e.dur / 1000) + "ms").join(" "));
  await ctx.close();
}
await browser.close();
