"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Menu, ArrowRight, CalendarCheck } from "lucide-react";
import { navItems } from "@/lib/data";
import { useScrollPosition, useActiveSection, openBookingModal } from "@/lib/hooks";
import RoundedSlideButton from "@/components/ui/RoundedSlideButton";

const sectionIds = [
  "services",
  "benefits",
  "how-it-works",
  "testimonials",
  "team",
  "contact",
];

export default function Navbar() {
  const scrollY = useScrollPosition();
  const active = useActiveSection(sectionIds);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = scrollY > 50;

  // Colors swap: white text on dark hero, dark text once scrolled
  const textColor = scrolled ? "var(--fg)" : "#ffffff";
  const linkColor = scrolled ? "var(--neutral-600)" : "rgba(255,255,255,0.8)";
  const activeColor = scrolled ? "var(--blue-600)" : "#ffffff";
  const hoverColor = scrolled ? "var(--blue-600)" : "#ffffff";

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`nav ${scrolled ? "nav-scrolled" : ""}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        className="flex items-center justify-between mx-auto"
        style={{ maxWidth: "var(--container-lg)" }}
      >
        {/* Left: hamburger + logo + nav links */}
        <div className="flex items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="block lg:hidden text-2xl"
            style={{ background: "none", border: "none", color: textColor, cursor: "pointer", transition: "color 0.3s" }}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <Menu size={24} />
          </motion.button>

          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 text-decoration-none"
            aria-label="The Eye Zone — home"
          >
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: 36,
                height: 36,
                background: "var(--blue-600)",
                color: "#fff",
              }}
            >
              <Eye size={20} />
            </div>
            <span
              className="font-display"
              style={{
                fontSize: "var(--text-lg)",
                fontWeight: 700,
                color: textColor,
                letterSpacing: "-0.02em",
                transition: "color 0.3s",
              }}
            >
              The Eye Zone
            </span>
          </a>

          {/* Desktop nav links with flip animation */}
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            return (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className="hidden lg:block h-[30px] overflow-hidden"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 500,
                  fontSize: "var(--text-sm)",
                }}
              >
                <motion.div whileHover={{ y: -30 }}>
                  <span
                    className="flex items-center h-[30px]"
                    style={{
                      color: active === id ? activeColor : linkColor,
                      transition: "color 0.3s",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="flex items-center h-[30px]"
                    style={{ color: hoverColor }}
                  >
                    {item.label}
                  </span>
                </motion.div>
              </button>
            );
          })}
        </div>

        {/* Right: Book Now button */}
        <div className="hidden lg:block">
          <RoundedSlideButton
            onClick={openBookingModal}
            icon={<CalendarCheck size={16} />}
            defaultBg={scrolled ? "var(--blue-600)" : "transparent"}
            defaultText={scrolled ? "#ffffff" : "#ffffff"}
            hoverBg="#ffffff"
            hoverText="var(--blue-700)"
            borderColor={scrolled ? "var(--blue-600)" : "#ffffff"}
          >
            Book Now
          </RoundedSlideButton>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute left-0 right-0 top-full origin-top flex flex-col gap-4"
            style={{
              padding: "var(--space-lg) var(--space-md)",
              background: "rgba(255, 255, 255, 0.97)",
              backdropFilter: "blur(20px)",
              boxShadow: "var(--shadow-lg)",
              borderBottom: "1px solid var(--border-light)",
            }}
          >
            {navItems.map((item) => (
              <motion.button
                key={item.href}
                variants={menuLinkVariants}
                onClick={() => handleNav(item.href)}
                className="h-[30px] overflow-hidden font-medium text-lg flex items-start gap-2"
                style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
              >
                <motion.span variants={menuLinkArrowVariants}>
                  <ArrowRight className="h-[30px]" style={{ color: "var(--fg)" }} />
                </motion.span>
                <motion.div whileHover={{ y: -30 }}>
                  <span
                    className="flex items-center h-[30px]"
                    style={{ color: "var(--neutral-500)" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="flex items-center h-[30px]"
                    style={{ color: "var(--blue-600)" }}
                  >
                    {item.label}
                  </span>
                </motion.div>
              </motion.button>
            ))}

            {/* Mobile Book Now */}
            <motion.div variants={menuLinkVariants} style={{ marginTop: "var(--space-sm)" }}>
              <RoundedSlideButton
                onClick={() => {
                  setMobileOpen(false);
                  openBookingModal();
                }}
                icon={<CalendarCheck size={18} />}
                defaultBg="var(--blue-600)"
                defaultText="#ffffff"
                hoverBg="#ffffff"
                hoverText="var(--blue-700)"
                className="w-full"
              >
                Book Now
              </RoundedSlideButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const menuVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren" as const,
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren" as const,
      staggerChildren: 0.1,
    },
  },
};

const menuLinkVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: -10,
    opacity: 0,
  },
};

const menuLinkArrowVariants = {
  open: {
    x: 0,
  },
  closed: {
    x: -4,
  },
};
