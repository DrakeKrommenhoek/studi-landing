import { BeforeWith } from "@/components/BeforeWith";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Matches } from "@/components/Matches";
import { Nav } from "@/components/Nav";
import { Safety } from "@/components/Safety";
import { Timeline } from "@/components/Timeline";
import { TryIt } from "@/components/TryIt";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <BeforeWith />
        <HowItWorks />
        <Matches />
        <Safety />
        <Timeline />
        <TryIt />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
