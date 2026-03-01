"use client";

import { motion } from "framer-motion";
import { CalendarCheck, MessageCircle } from "lucide-react";
import RoundedSlideButton from "@/components/ui/RoundedSlideButton";

export default function CtaBand() {
  return (
    <section className="cta-band section" aria-label="Call to action">
      <div
        className="section-container relative z-10 flex flex-col items-center text-center"
      >
        <motion.span
          className="section-label section-label-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          Ready to See Clearly?
        </motion.span>
        <motion.h2
          className="section-title section-title-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
        >
          Book Your Appointment Today
        </motion.h2>
        <motion.p
          className="section-subtitle section-subtitle-white mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
        >
          Schedule your visit online or reach us on WhatsApp for a quick
          consultation.
        </motion.p>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <RoundedSlideButton
            href="#contact"
            icon={<CalendarCheck size={18} />}
            defaultBg="#ffffff"
            defaultText="var(--blue-600)"
            hoverBg="var(--blue-600)"
            hoverText="#ffffff"
            borderColor="#ffffff"
          >
            Book an Appointment
          </RoundedSlideButton>
          <RoundedSlideButton
            href="https://wa.me/263770000000"
            target="_blank"
            rel="noopener noreferrer"
            icon={<MessageCircle size={18} />}
            defaultBg="transparent"
            defaultText="#ffffff"
            hoverBg="#ffffff"
            hoverText="var(--blue-600)"
            borderColor="rgba(255,255,255,0.3)"
          >
            WhatsApp Us
          </RoundedSlideButton>
        </motion.div>
      </div>
    </section>
  );
}
