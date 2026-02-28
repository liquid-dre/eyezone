"use client";

import { motion } from "framer-motion";

export default function FloatingOrbs() {
  return (
    <div aria-hidden="true">
      <motion.div
        className="orb orb-blue"
        style={{ width: 500, height: 500, top: "-10%", right: "-10%" }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -25, 15, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="orb orb-blue-light"
        style={{ width: 400, height: 400, bottom: "5%", left: "-8%" }}
        animate={{
          x: [0, -20, 25, 0],
          y: [0, 20, -15, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="orb orb-blue"
        style={{ width: 250, height: 250, top: "40%", left: "30%" }}
        animate={{
          x: [0, 15, -10, 0],
          y: [0, -10, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
}
