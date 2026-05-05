import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Fleet from "@/components/sections/Fleet";
import Booking from "@/components/sections/Booking";
import { Pricing } from "@/components/sections/Pricing";
import { About } from "@/components/sections/About";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Fleet />
        <Booking />
        <Pricing />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
