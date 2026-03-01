"use client";

import { useRef } from "react";
import { motion, useInView, MotionConfig } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { benefits } from "@/lib/data";
import type { LucideIcon } from "lucide-react";

/*
 * ─── Blue shade classes ──────────────────────────────────────────
 * To change the blue colours, edit this array.
 * Each entry applies to one card in order.
 *
 * You can use any Tailwind colour class (e.g. "bg-cyan-300")
 * or an arbitrary hex value like "bg-[#1e40af]".
 */
const blueShades = [
  "bg-sky-200",    // Card 1 – lightest
  "bg-sky-300",    // Card 2
  "bg-blue-300",   // Card 3
  "bg-blue-400",   // Card 4
  "bg-indigo-300", // Card 5 – deepest
];

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
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                delay: i * 0.12,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Card
                title={benefit.title}
                subtitle={benefit.description}
                icon={benefit.icon}
                className={blueShades[i % blueShades.length]}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({
  title,
  subtitle,
  icon: Icon,
  className,
}: {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <MotionConfig
      transition={{
        type: "spring",
        bounce: 0.5,
      }}
    >
      <motion.div
        whileHover="hovered"
        className={twMerge(
          "group w-full border-2 border-black bg-blue-300",
          className
        )}
      >
        <motion.div
          initial={{ x: 0, y: 0 }}
          variants={{ hovered: { x: -8, y: -8 } }}
          className={twMerge(
            "-m-0.5 border-2 border-black bg-blue-300",
            className
          )}
        >
          <motion.div
            initial={{ x: 0, y: 0 }}
            variants={{ hovered: { x: -8, y: -8 } }}
            className={twMerge(
              "relative -m-0.5 flex h-72 flex-col justify-between overflow-hidden border-2 border-black bg-blue-300 p-8",
              className
            )}
          >
            {/* Icon – top-left corner, visible on hover */}
            <div className="absolute left-4 top-4 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100">
              <Icon size={28} strokeWidth={2.5} />
            </div>

            <p className="mt-6 flex items-center text-2xl font-medium uppercase">
              {title}
            </p>

            <div>
              <p className="transition-[margin] duration-300 ease-in-out group-hover:mb-10">
                {subtitle}
              </p>
              <button className="absolute bottom-2 left-2 right-2 translate-y-full border-2 border-black bg-white px-4 py-2 text-black opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                LEARN MORE
              </button>
            </div>

            <motion.svg
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 25,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
              style={{
                top: "0",
                right: "0",
                x: "50%",
                y: "-50%",
                scale: 0.75,
              }}
              width="200"
              height="200"
              className="pointer-events-none absolute z-10 rounded-full"
            >
              <path
                id={`circlePath-${title.replace(/\s/g, "")}`}
                d="M100,100 m-100,0 a100,100 0 1,0 200,0 a100,100 0 1,0 -200,0"
                fill="none"
              />
              <text>
                <textPath
                  href={`#circlePath-${title.replace(/\s/g, "")}`}
                  fill="black"
                  className="fill-black text-2xl font-black uppercase opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                >
                  LEARN MORE &bull; LEARN MORE &bull; LEARN MORE &bull; LEARN MORE &bull;
                </textPath>
              </text>
            </motion.svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
}
