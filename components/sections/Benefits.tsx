"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  CheckCircle2,
  ArrowUpRight,
  Eye,
  Activity,
  Zap,
} from "lucide-react";
import { easeOut } from "@/lib/motion";

/* ── Animation Variants ──────────────────────────────── */

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

/* ── Spotlight Feature ───────────────────────────────── */

const spotlightItems = [
  "Specialist-Led Care",
  "Modern Diagnostics",
  "Patient-Centred Approach",
  "Clear Communication",
  "Convenient Scheduling",
];

function SpotlightFeature() {
  return (
    <ul
      style={{
        marginTop: "var(--space-lg)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-sm)",
      }}
    >
      {spotlightItems.map((item, index) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.4 + index * 0.08,
            duration: 0.4,
            ease: easeOut,
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-sm)",
          }}
        >
          <CheckCircle2
            size={16}
            style={{ color: "var(--blue-500)", flexShrink: 0 }}
          />
          <span
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--neutral-600)",
              lineHeight: "var(--leading-normal)",
            }}
          >
            {item}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

/* ── Counter Animation ───────────────────────────────── */

function CounterAnimation({
  start = 0,
  end = 98,
  suffix = "%",
}: {
  start?: number;
  end?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let currentFrame = 0;

    const counter = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const easedProgress = 1 - (1 - progress) ** 3;
      setCount(Math.min(start + (end - start) * easedProgress, end));
      if (currentFrame === totalFrames) clearInterval(counter);
    }, frameRate);

    return () => clearInterval(counter);
  }, [inView, start, end]);

  return (
    <div
      ref={ref}
      style={{ display: "flex", alignItems: "baseline", gap: "2px" }}
    >
      <span
        className="font-display"
        style={{
          fontSize: "var(--text-5xl)",
          fontWeight: 700,
          color: "var(--fg)",
          lineHeight: 1,
        }}
      >
        {count.toFixed(0)}
      </span>
      <span
        className="font-display"
        style={{
          fontSize: "var(--text-3xl)",
          fontWeight: 600,
          color: "var(--blue-600)",
        }}
      >
        {suffix}
      </span>
    </div>
  );
}

/* ── Progress Bar ────────────────────────────────────── */

function ProgressBar({
  value,
  color = "var(--blue-500)",
  delay = 0,
}: {
  value: number;
  color?: string;
  delay?: number;
}) {
  return (
    <div className="bento-progress-track">
      <motion.div
        className="bento-progress-fill"
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: easeOut, delay }}
        style={{ background: color }}
      />
    </div>
  );
}

/* ── Metrics Feature ─────────────────────────────────── */

const diagnosticMetrics = [
  { label: "OCT Imaging", value: 99.2, icon: Eye, color: "var(--blue-500)" },
  {
    label: "Visual Field Analysis",
    value: 98.5,
    icon: Activity,
    color: "var(--blue-600)",
  },
  {
    label: "Retinal Photography",
    value: 99.1,
    icon: Zap,
    color: "var(--blue-400)",
  },
];

function MetricsFeature() {
  return (
    <div
      style={{
        marginTop: "var(--space-lg)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-md)",
      }}
    >
      {diagnosticMetrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.4 + index * 0.12,
            duration: 0.4,
            ease: easeOut,
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-xs)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "var(--text-sm)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-xs)",
                fontWeight: 500,
                color: "var(--neutral-700)",
              }}
            >
              <metric.icon size={14} />
              {metric.label}
            </div>
            <span style={{ fontWeight: 600, color: "var(--fg)" }}>
              {metric.value}%
            </span>
          </div>
          <ProgressBar
            value={metric.value}
            color={metric.color}
            delay={0.5 + index * 0.15}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ── Timeline Feature ────────────────────────────────── */

const journeySteps = [
  { step: "01", event: "Book your appointment online or by phone" },
  { step: "02", event: "Comprehensive eye examination" },
  { step: "03", event: "Clear diagnosis & treatment plan" },
  { step: "04", event: "Personalised follow-up care" },
];

function TimelineFeature() {
  return (
    <div style={{ position: "relative", marginTop: "var(--space-lg)" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "9px",
          width: "2px",
          background: "var(--border)",
        }}
      />
      {journeySteps.map((item, index) => (
        <motion.div
          key={item.step}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.4 + index * 0.12,
            duration: 0.4,
            ease: easeOut,
          }}
          style={{
            position: "relative",
            display: "flex",
            gap: "var(--space-md)",
            marginBottom:
              index < journeySteps.length - 1 ? "var(--space-lg)" : "0",
          }}
        >
          <div
            style={{
              zIndex: 1,
              width: "20px",
              height: "20px",
              flexShrink: 0,
              borderRadius: "50%",
              border: "2px solid var(--blue-300)",
              background: "var(--bg)",
              marginTop: "2px",
            }}
          />
          <div>
            <div
              style={{
                fontWeight: 600,
                fontSize: "var(--text-sm)",
                color: "var(--blue-600)",
              }}
            >
              Step {item.step}
            </div>
            <div
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--neutral-500)",
                lineHeight: "var(--leading-relaxed)",
              }}
            >
              {item.event}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Vision Chart Animation ──────────────────────────── */

const visionRows = [
  { letters: "E", size: "2.5rem" },
  { letters: "F  P", size: "2rem" },
  { letters: "T  O  Z", size: "1.5rem" },
  { letters: "L  P  E  D", size: "1.125rem" },
  { letters: "P  E  C  F  D", size: "0.875rem" },
  { letters: "E  D  F  C  Z  P", size: "0.6875rem" },
];

function VisionChartAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      style={{
        marginTop: "var(--space-md)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--space-sm)",
        padding: "var(--space-lg) var(--space-md)",
        background: "var(--neutral-50)",
        borderRadius: "var(--radius-lg)",
        fontWeight: 700,
        color: "var(--fg)",
        letterSpacing: "0.15em",
        overflow: "hidden",
      }}
    >
      {visionRows.map((row, index) => (
        <motion.div
          key={row.letters}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            inView
              ? { opacity: 1 - index * 0.08, scale: 1 }
              : { opacity: 0, scale: 0.8 }
          }
          transition={{
            delay: 0.3 + index * 0.18,
            duration: 0.45,
            ease: easeOut,
          }}
          style={{ fontSize: row.size, lineHeight: 1.3 }}
        >
          {row.letters}
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        style={{
          marginTop: "var(--space-sm)",
          fontSize: "var(--text-xs)",
          fontWeight: 500,
          color: "var(--neutral-400)",
          letterSpacing: "0.05em",
        }}
      >
        20/20 Visual Acuity
      </motion.div>
    </div>
  );
}

/* ── Bento Card ──────────────────────────────────────── */

function BentoCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [2, -2]);
  const rotateY = useTransform(x, [-100, 100], [-2, 2]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * 100);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * 100);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={`bento-card ${className}`.trim()}
      variants={fadeInUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div
        style={{
          transform: "translateZ(20px)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

/* ── Main Export ──────────────────────────────────────── */

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="section"
      aria-label="Why choose The Eye Zone"
    >
      <div className="section-container">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }}
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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-lg)",
          }}
        >
          {/* Row 1: Benefits spotlight (2 cols) + Patient satisfaction counter (1 col) */}
          <div className="bento-row bento-row-3">
            <motion.div className="bento-col-span-2" variants={fadeInUp}>
              <BentoCard>
                <div className="bento-card-header">
                  <h3 className="bento-card-title">Why choose us</h3>
                  <ArrowUpRight size={18} className="bento-card-arrow" />
                </div>
                <p className="bento-card-desc">
                  Every patient receives personalised attention from qualified
                  specialists using the latest diagnostic technology.
                </p>
                <SpotlightFeature />
              </BentoCard>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <BentoCard>
                <div className="bento-card-header">
                  <h3 className="bento-card-title">Patient Satisfaction</h3>
                  <ArrowUpRight size={18} className="bento-card-arrow" />
                </div>
                <p className="bento-card-desc">
                  Trusted by thousands of patients across Harare
                </p>
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "var(--space-xl)",
                  }}
                >
                  <CounterAnimation />
                  <div style={{ marginTop: "var(--space-sm)" }}>
                    <ProgressBar value={98} delay={0.8} />
                  </div>
                  <p
                    style={{
                      marginTop: "var(--space-sm)",
                      fontSize: "var(--text-xs)",
                      color: "var(--neutral-400)",
                    }}
                  >
                    Based on 2,000+ patient reviews
                  </p>
                </div>
              </BentoCard>
            </motion.div>
          </div>

          {/* Row 2: Diagnostics metrics + Patient journey timeline + Vision chart */}
          <div className="bento-row bento-row-3">
            <motion.div variants={fadeInUp}>
              <BentoCard>
                <div className="bento-card-header">
                  <h3 className="bento-card-title">Diagnostic Precision</h3>
                  <ArrowUpRight size={18} className="bento-card-arrow" />
                </div>
                <p className="bento-card-desc">
                  State-of-the-art imaging for accurate, efficient evaluations
                </p>
                <MetricsFeature />
              </BentoCard>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <BentoCard>
                <div className="bento-card-header">
                  <h3 className="bento-card-title">Your Journey</h3>
                  <ArrowUpRight size={18} className="bento-card-arrow" />
                </div>
                <p className="bento-card-desc">
                  A seamless experience from booking to follow-up care
                </p>
                <TimelineFeature />
              </BentoCard>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <BentoCard>
                <div className="bento-card-header">
                  <h3 className="bento-card-title">Visual Clarity</h3>
                  <ArrowUpRight size={18} className="bento-card-arrow" />
                </div>
                <p className="bento-card-desc">
                  Precision testing for perfect vision at every distance
                </p>
                <VisionChartAnimation />
              </BentoCard>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
