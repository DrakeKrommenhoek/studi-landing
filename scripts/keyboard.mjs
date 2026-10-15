import { chromium } from "playwright";
const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
for (const [w, h] of [[1440, 900], [375, 812]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  console.log(`--- ${w}px`);
  for (let i = 0; i < 20; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase(),
        text: (el.getAttribute("title") || el.textContent || "").trim().slice(0, 40),
        outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`,
        size: `${Math.round(r.width)}x${Math.round(r.height)}`,
        inView: r.bottom > 0 && r.top < innerHeight,
      };
    });
    if (!info) { console.log(i + 1, "(left page)"); break; }
    console.log(i + 1, info.tag, JSON.stringify(info.text), info.outline, info.size, info.inView ? "" : "NOT IN VIEW");
    if (i === 0 && w === 1440) await page.screenshot({ path: "screenshots/1440-focus-skip-link.png" });
    if (i === 2 && w === 1440) await page.screenshot({ path: "screenshots/1440-focus-nav.png" });
    if (info.tag === "iframe") break;
  }
  await page.close();
}
await browser.close();
