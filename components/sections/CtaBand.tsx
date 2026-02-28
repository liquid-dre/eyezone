"use client";

import { motion } from "framer-motion";
import { CalendarCheck, MessageCircle } from "lucide-react";
import { openBookingModal } from "@/lib/hooks";

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
          <button
            onClick={openBookingModal}
            className="btn-white"
            aria-label="Book an appointment"
          >
            <CalendarCheck size={18} />
            Book an Appointment
          </button>
          <a
            href="https://wa.me/263770000000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-white-outline"
            aria-label="Contact via WhatsApp"
          >
            <MessageCircle size={18} />
            WhatsApp Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
