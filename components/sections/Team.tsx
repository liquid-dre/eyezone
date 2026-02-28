"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const credentials = [
  "MBChB, FCS(Ophth) — Fellowship-trained ophthalmologist",
  "Over 15 years of clinical experience",
  "Special interests: cataracts, glaucoma, paediatric ophthalmology",
  "Member of the Ophthalmological Society of Southern Africa",
  "Committed to continuing medical education",
];

const team = [
  { initials: "AN", name: "Nurse Practitioner", role: "Clinical assessments & patient support" },
  { initials: "TC", name: "Optometrist", role: "Refractions & contact lens fitting" },
  { initials: "MW", name: "Patient Coordinator", role: "Scheduling & care navigation" },
];

export default function Team() {
  return (
    <section id="team" className="section bg-subtle" aria-label="Our team">
      <div className="section-container">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <span className="section-label">Our Team</span>
          <h2 className="section-title mb-4">Meet Your Specialist</h2>
          <p className="section-subtitle mx-auto">
            Led by an experienced ophthalmologist and supported by a dedicated
            clinical team.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-start">
          {/* Doctor profile */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="profile-image-placeholder mb-6">
              <div className="profile-lens-mask" />
              {/* Abstract person silhouette */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                aria-hidden="true"
              >
                <svg
                  width="180"
                  height="220"
                  viewBox="0 0 180 220"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="90" cy="70" r="40" fill="rgba(255,255,255,0.2)" />
                  <ellipse
                    cx="90"
                    cy="190"
                    rx="70"
                    ry="50"
                    fill="rgba(255,255,255,0.15)"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 }}
          >
            <span className="badge mb-4">Lead Specialist</span>
            <h3
              className="font-display mt-4 mb-2"
              style={{
                fontSize: "var(--text-3xl)",
                fontWeight: 600,
                color: "var(--fg)",
              }}
            >
              Dr. A. Ndoro
            </h3>
            <p
              style={{
                fontSize: "var(--text-lg)",
                color: "var(--neutral-500)",
                marginBottom: "var(--space-xl)",
              }}
            >
              Consultant Ophthalmologist
            </p>

            <div className="flex flex-col gap-3 mb-10">
              {credentials.map((c) => (
                <div key={c} className="flex items-start gap-3">
                  <CheckCircle
                    size={18}
                    style={{
                      color: "var(--blue-500)",
                      marginTop: 3,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "var(--text-base)",
                      color: "var(--neutral-600)",
                      lineHeight: "var(--leading-relaxed)",
                    }}
                  >
                    {c}
                  </span>
                </div>
              ))}
            </div>

            {/* Support staff */}
            <h4
              className="font-display mb-4"
              style={{
                fontSize: "var(--text-lg)",
                fontWeight: 600,
                color: "var(--fg)",
              }}
            >
              Support Team
            </h4>
            <div className="flex flex-col gap-4">
              {team.map((member) => (
                <div key={member.name} className="flex items-center gap-3">
                  <div className="testimonial-avatar" style={{ width: "2.25rem", height: "2.25rem", fontSize: "var(--text-xs)" }}>
                    {member.initials}
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "var(--text-sm)",
                        color: "var(--fg)",
                      }}
                    >
                      {member.name}
                    </div>
                    <div
                      style={{
                        fontSize: "var(--text-xs)",
                        color: "var(--neutral-400)",
                      }}
                    >
                      {member.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
