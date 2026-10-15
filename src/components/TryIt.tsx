import QRCode from "qrcode";
import { DEMO_URL } from "@/lib/site";
import { DemoButton } from "./DemoButton";

export async function TryIt() {
  // Built once at build time; ships as plain SVG markup with no client code.
  const qr = await QRCode.toString(DEMO_URL, {
    type: "svg",
    margin: 1,
    errorCorrectionLevel: "M",
    color: { dark: "#4A2422", light: "#FFFAF2" },
  });

  return (
    <section id="try-it" aria-labelledby="try-title" className="section wrap">
      <h2 id="try-title" className="h2">
        Try it
      </h2>

      <div className="mt-8 lg:hidden">
        <p className="max-w-measure text-on-desk-soft">
          The full prototype runs in your browser. Use your W&amp;L email. Any 6 digits works for the code.
        </p>
        <DemoButton className="mt-7 w-full !min-h-[60px] !text-[1.6rem] sm:w-auto sm:!px-12" />
      </div>

      <div className="mt-12 hidden items-center gap-20 lg:flex">
        <div
          className="flex-none overflow-hidden rounded-[44px] bg-desk-deep outline-offset-[14px] focus-within:outline focus-within:outline-[3px] focus-within:outline-focus"
          style={{ boxShadow: "0 0 0 10px var(--desk-deep), 0 40px 80px -30px rgba(0,0,0,.75)" }}
        >
          <iframe
            src={DEMO_URL}
            title="Studi interactive prototype"
            loading="lazy"
            width={390}
            height={800}
            className="block h-[800px] w-[390px] border-0"
          />
        </div>
        <div className="max-w-[360px]">
          <p className="max-w-[30ch] text-[1.25rem] leading-normal text-on-desk-soft">
            The phone on the left is the live prototype. Drag the pages or use the arrow keys.
          </p>
          <figure className="slip relative mt-10 w-[280px] rotate-[-2deg] rounded-[3px] p-6">
            <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[3deg]" aria-hidden="true" />
            <div role="img" aria-label="QR code that opens the Studi prototype" dangerouslySetInnerHTML={{ __html: qr }} />
            <figcaption className="mt-4 font-hand text-[1.25rem] leading-snug">
              Scan to try it on your phone. Use your W&amp;L email. Any 6 digits works for the code.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
