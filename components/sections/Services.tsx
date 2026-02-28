"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { services } from "@/lib/data";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="section bg-subtle" aria-label="Services">
      <div className="dots-pattern" />
      <div className="section-container relative z-10">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <span className="section-label">What We Offer</span>
          <h2 className="section-title mb-4">Our Services</h2>
          <p className="section-subtitle mx-auto">
            Expert eye care across a wide range of specialities, all under one roof.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          }}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              className="card card-hover"
              variants={cardVariants}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty(
                  "--mouse-x",
                  `${e.clientX - rect.left}px`
                );
                e.currentTarget.style.setProperty(
                  "--mouse-y",
                  `${e.clientY - rect.top}px`
                );
              }}
            >
              <div className="card-glow" />
              <div className="relative z-10">
                <div className="card-icon mb-4">
                  <service.icon size={22} />
                </div>
                <h3 className="card-title mb-2">{service.title}</h3>
                <p className="card-desc">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
