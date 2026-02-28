"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/* ── useScrollPosition ─────────────────────────────── */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
}

/* ── useActiveSection ──────────────────────────────── */
export function useActiveSection(sectionIds: string[], offset = 120) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return active;
}

/* ── useMouseParallax ──────────────────────────────── */
export function useMouseParallax(sensitivity = 0.02) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) * sensitivity;
      const y = (e.clientY - window.innerHeight / 2) * sensitivity;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [sensitivity]);

  return position;
}

/* ── useMediaQuery ─────────────────────────────────── */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

/* ── useBookingModal (global state via callback) ───── */
type ModalListener = (open: boolean) => void;
const listeners = new Set<ModalListener>();
let modalOpen = false;

export function openBookingModal() {
  modalOpen = true;
  listeners.forEach((l) => l(true));
}

export function closeBookingModal() {
  modalOpen = false;
  listeners.forEach((l) => l(false));
}

export function useBookingModalState() {
  const [isOpen, setIsOpen] = useState(modalOpen);

  useEffect(() => {
    const listener: ModalListener = (open) => setIsOpen(open);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);

  return isOpen;
}

/* ── useInView (simple) ────────────────────────────── */
export function useInView(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
