"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { steps } from "@/lib/data";

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      className="section bg-subtle"
      aria-label="How it works"
    >
      <div className="section-container" style={{ maxWidth: 700 }}>
        <motion.div
          className="mb-8 sm:mb-12 md:mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <span className="section-label">How It Works</span>
          <h2 className="section-title mb-4">Three Simple Steps</h2>
          <p className="section-subtitle mx-auto">
            From booking to follow-up, we make the process straightforward and
            stress-free.
          </p>
        </motion.div>

        <div ref={ref} className="flex flex-col gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="timeline-step timeline-step-active"
              custom={i}
              variants={stepVariants}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
            >
              <div className="timeline-number">{step.number}</div>
              {i < steps.length - 1 && (
                <div className="timeline-connector">
                  <motion.div
                    className="timeline-connector-fill"
                    initial={{ height: 0 }}
                    animate={inView ? { height: "100%" } : { height: 0 }}
                    transition={{
                      delay: i * 0.3 + 0.5,
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1] as const,
                    }}
                  />
                </div>
              )}
              <h3
                className="font-display mb-2"
                style={{
                  fontSize: "var(--text-xl)",
                  fontWeight: 600,
                  color: "var(--fg)",
                }}
              >
                {step.title}
              </h3>
              <p className="card-desc">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
