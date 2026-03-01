"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, CalendarCheck, ChevronRight, Sparkles, Activity, Clock } from "lucide-react";
import FloatingOrbs from "@/components/visuals/FloatingOrbs";
import LensArcs from "@/components/visuals/LensArcs";
import TrueFocus from "@/components/ui/TrueFocus";
import { useMouseParallax } from "@/lib/hooks";
import { openBookingModal } from "@/lib/hooks";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

const trustItems = [
  { icon: Sparkles, text: "Specialist Care" },
  { icon: Activity, text: "Modern Diagnostics" },
  { icon: Clock, text: "Same-Week Appointments" },
];

export default function Hero() {
  const mouse = useMouseParallax(0.015);

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image */}
      <div className="hero-bg">
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="hero-overlay" />
        <FloatingOrbs />
        <motion.div
          style={{ x: mouse.x * 2, y: mouse.y * 2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <LensArcs className="w-[700px] h-[700px] opacity-60" />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        style={{ maxWidth: "var(--container)" }}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp}>
          <span className="badge badge-white mb-6 inline-flex">
            <Sparkles size={12} />
            Harare&apos;s Premier Eye Clinic
          </span>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="font-display mb-6"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 600,
            lineHeight: "var(--leading-tight)",
            letterSpacing: "-0.03em",
            color: "#ffffff",
          }}
        >
          <h1 className="mb-2">Your Vision Deserves</h1>
          <TrueFocus
            sentence="Expert Care"
            blurAmount={3}
            borderColor="var(--blue-300)"
            glowColor="rgba(147, 197, 253, 0.6)"
            animationDuration={0.5}
            pauseBetweenAnimations={1.5}
          />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="section-subtitle mx-auto mb-10"
          style={{ maxWidth: 560, color: "rgba(255, 255, 255, 0.85)" }}
        >
          Comprehensive ophthalmology services in a modern, comfortable setting.
          From routine exams to specialist consultations — see the world more clearly.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={openBookingModal}
            className="btn-primary"
            aria-label="Book an appointment"
          >
            <CalendarCheck size={18} />
            Book an Appointment
          </button>
          <button
            onClick={scrollToServices}
            className="btn-secondary"
            aria-label="View services"
          >
            View Services
            <ChevronRight size={16} />
          </button>
        </motion.div>

        {/* Trust strip */}
        <motion.div variants={fadeUp} className="trust-strip">
          {trustItems.map((item) => (
            <div key={item.text} className="trust-item" style={{ color: "rgba(255,255,255,0.8)" }}>
              <span className="trust-item-icon" style={{ background: "rgba(255,255,255,0.1)", color: "var(--blue-300)" }}>
                <item.icon size={14} />
              </span>
              {item.text}
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="scroll-indicator-mouse" style={{ borderColor: "rgba(255,255,255,0.35)" }}>
            <div className="scroll-indicator-dot" style={{ background: "rgba(255,255,255,0.7)" }} />
          </div>
          <span className="scroll-indicator-text" style={{ color: "rgba(255,255,255,0.5)" }}>Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
