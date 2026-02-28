"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Menu, X, CalendarCheck } from "lucide-react";
import { navItems } from "@/lib/data";
import { useScrollPosition, useActiveSection, openBookingModal } from "@/lib/hooks";

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

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`nav ${scrolled ? "nav-scrolled" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className="flex items-center justify-between mx-auto"
          style={{ maxWidth: "var(--container-lg)" }}
        >
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
                color: scrolled ? "var(--fg)" : "var(--fg)",
                letterSpacing: "-0.02em",
              }}
            >
              The Eye Zone
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              return (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className={`nav-link ${active === id ? "nav-link-active" : ""}`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <button
              onClick={openBookingModal}
              className="btn-primary"
              style={{ padding: "0.625rem 1.5rem", fontSize: "var(--text-sm)" }}
            >
              <CalendarCheck size={16} />
              Book Now
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex items-center justify-center"
            style={{
              width: 40,
              height: 40,
              background: "none",
              border: "none",
              color: "var(--fg)",
              cursor: "pointer",
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[99] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0"
              style={{ background: "rgba(15,23,42,0.4)", backdropFilter: "blur(4px)" }}
              onClick={() => setMobileOpen(false)}
            />
            {/* Panel */}
            <motion.div
              className="absolute top-0 right-0 h-full w-72 bg-white flex flex-col"
              style={{
                boxShadow: "var(--shadow-xl)",
                padding: "var(--space-2xl) var(--space-xl)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                style={{
                  alignSelf: "flex-end",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--neutral-500)",
                  marginBottom: "var(--space-xl)",
                }}
              >
                <X size={24} />
              </button>

              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNav(item.href)}
                    className="nav-link"
                    style={{
                      textAlign: "left",
                      padding: "var(--space-sm) 0",
                      fontSize: "var(--text-lg)",
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="mt-auto">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openBookingModal();
                  }}
                  className="btn-primary w-full"
                >
                  <CalendarCheck size={18} />
                  Book Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
