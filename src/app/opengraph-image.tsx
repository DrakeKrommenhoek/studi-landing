import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Studi. Ideas don't grow alone.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Pull only the glyphs we need from Patrick Hand at build time. Falls back to the default font offline.
async function handFont() {
  try {
    const text = encodeURIComponent("Studi Ideas don't grow alone. Study groups at W&L");
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Patrick+Hand&text=${text}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const font = await handFont();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#6A5843",
          fontFamily: font ? "Patrick Hand" : "sans-serif",
        }}
      >
        <div
          style={{
            width: 880,
            height: 500,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 40,
            background: "#B65E3C",
            borderRadius: "10px 24px 24px 10px",
            borderLeft: "22px solid #8E4529",
            boxShadow: "8px 8px 0 #EBD3C2, 14px 14px 0 #FCEEE4",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "#FCEEE4",
              color: "#4A2422",
              padding: "18px 70px 26px",
              borderRadius: 8,
              border: "4px solid #8E4529",
            }}
          >
            <div style={{ fontSize: 150, lineHeight: 1 }}>Studi</div>
            <div style={{ fontSize: 34, color: "#7D574E" }}>Study groups at W&amp;L</div>
          </div>
          <div style={{ fontSize: 58, color: "#FFF4EA" }}>Ideas don&apos;t grow alone.</div>
        </div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "Patrick Hand", data: font, style: "normal", weight: 400 }] : [] },
  );
}
