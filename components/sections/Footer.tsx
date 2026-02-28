"use client";

import { Eye } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div
        className="section-container flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ padding: "var(--space-xl)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: 28,
              height: 28,
              background: "var(--blue-600)",
              color: "#fff",
            }}
          >
            <Eye size={14} />
          </div>
          <span
            className="font-display"
            style={{ fontWeight: 700, fontSize: "var(--text-sm)", color: "var(--fg)" }}
          >
            The Eye Zone
          </span>
        </div>
        <p
          style={{
            fontSize: "var(--text-xs)",
            color: "var(--neutral-400)",
          }}
        >
          &copy; {new Date().getFullYear()} The Eye Zone. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="#" className="footer-link">
            Privacy
          </a>
          <a href="#" className="footer-link">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
