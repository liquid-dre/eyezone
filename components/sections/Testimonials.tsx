"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(testimonials.length / perPage);
  const visible = testimonials.slice(page * perPage, page * perPage + perPage);

  return (
    <section
      id="testimonials"
      className="section"
      aria-label="Patient testimonials"
    >
      <div className="section-container">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <span className="section-label">Testimonials</span>
          <h2 className="section-title mb-4">What Our Patients Say</h2>
          <p className="section-subtitle mx-auto">
            Real experiences from people who trust us with their eye health.
          </p>
        </motion.div>

        <div ref={ref}>
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              className="grid gap-6"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
            >
              {visible.map((t, i) => (
                <motion.div
                  key={t.initials + i}
                  className="testimonial-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    inView
                      ? {
                          opacity: 1,
                          y: 0,
                          transition: {
                            delay: i * 0.1,
                            duration: 0.5,
                            ease: [0.16, 1, 0.3, 1] as const,
                          },
                        }
                      : {}
                  }
                >
                  <Quote
                    size={24}
                    style={{
                      color: "var(--blue-200)",
                      marginBottom: "var(--space-md)",
                    }}
                  />
                  <p className="testimonial-text mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="testimonial-avatar">{t.initials}</div>
                    <div>
                      <div className="testimonial-author">{t.name}</div>
                      <div className="testimonial-role">{t.context}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination dots + arrows */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="social-icon"
                style={{ opacity: page === 0 ? 0.4 : 1 }}
                aria-label="Previous testimonials"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className="rounded-full transition-all"
                    style={{
                      width: page === i ? 24 : 8,
                      height: 8,
                      background:
                        page === i ? "var(--blue-500)" : "var(--neutral-200)",
                    }}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="social-icon"
                style={{ opacity: page === totalPages - 1 ? 0.4 : 1 }}
                aria-label="Next testimonials"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
