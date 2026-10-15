import { chromium } from "playwright";
const URL = process.env.URL || "http://localhost:3000";
const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });

// Desktop: iframe loads once scrolled into view
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(URL, { waitUntil: "networkidle" });
  for (const t of [600, 2300, 3200, 4400, 5900]) {
    await page.waitForTimeout(t === 600 ? 600 : t - [600, 2300, 3200, 4400, 5900][[600, 2300, 3200, 4400, 5900].indexOf(t) - 1]);
    await page.locator('#top div[aria-hidden="true"]').first().screenshot({ path: `screenshots/anim-${t}ms.png` });
  }
  await page.locator("#try-it").scrollIntoViewIfNeeded();
  await page.waitForTimeout(4000);
  const frame = page.frames().find((f) => f.url().includes("studi-demo"));
  console.log("desktop iframe loaded:", !!frame, frame ? await frame.title() : "");
  await page.screenshot({ path: "screenshots/1440-try-it.png" });
  await page.close();
}
// Mobile: iframe never requested even after scrolling the whole page
{
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  let hits = 0;
  page.on("request", (r) => r.url().includes("studi-demo") && hits++);
  await page.goto(URL, { waitUntil: "networkidle" });
  for (let y = 0; y < 8000; y += 600) {
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(150);
  }
  await page.waitForTimeout(1500);
  console.log("mobile demo requests after full scroll:", hits);
  await page.close();
}
await browser.close();
