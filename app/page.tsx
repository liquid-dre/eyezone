"use client";

import Navbar from "@/components/Navbar";
import BookingModal from "@/components/BookingModal";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Benefits from "@/components/sections/Benefits";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import Team from "@/components/sections/Team";
import CtaBand from "@/components/sections/CtaBand";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Benefits />
        <HowItWorks />
        <Testimonials />
        <Team />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      <BookingModal />
    </>
  );
}
