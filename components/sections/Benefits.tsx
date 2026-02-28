"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { benefits } from "@/lib/data";

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Benefits() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="benefits" className="section" aria-label="Why choose The Eye Zone">
      <div className="section-container">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">Why The Eye Zone</span>
          <h2 className="section-title mb-4">
            A Different Standard of Eye Care
          </h2>
          <p className="section-subtitle mx-auto">
            We combine specialist expertise with a warm, patient-first approach
            to deliver care you can trust.
          </p>
        </motion.div>

        <div
          ref={ref}
          className="grid gap-8"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          }}
        >
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              className="flex gap-5"
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
            >
              <div className="card-icon flex-shrink-0">
                <benefit.icon size={22} />
              </div>
              <div>
                <h3
                  className="font-display mb-2"
                  style={{
                    fontSize: "var(--text-lg)",
                    fontWeight: 600,
                    color: "var(--fg)",
                  }}
                >
                  {benefit.title}
                </h3>
                <p className="card-desc">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
