"use client";

import { motion } from "framer-motion";

interface LensArcsProps {
  className?: string;
}

export default function LensArcs({ className = "" }: LensArcsProps) {
  return (
    <div className={`lens-arcs ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.circle
          cx="400"
          cy="400"
          r="200"
          stroke="var(--blue-200)"
          strokeWidth="1"
          strokeOpacity="0.4"
          fill="none"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <motion.circle
          cx="400"
          cy="400"
          r="300"
          stroke="var(--blue-200)"
          strokeWidth="0.5"
          strokeOpacity="0.25"
          fill="none"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
        />
        <motion.circle
          cx="400"
          cy="400"
          r="380"
          stroke="var(--blue-100)"
          strokeWidth="0.5"
          strokeOpacity="0.15"
          fill="none"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeOut", delay: 0.5 }}
        />
        {/* Refraction arcs */}
        <motion.path
          d="M200 400 Q400 200 600 400"
          stroke="var(--blue-300)"
          strokeWidth="0.75"
          strokeOpacity="0.3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.8 }}
        />
        <motion.path
          d="M200 400 Q400 600 600 400"
          stroke="var(--blue-300)"
          strokeWidth="0.75"
          strokeOpacity="0.3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 1 }}
        />
      </svg>
    </div>
  );
}
