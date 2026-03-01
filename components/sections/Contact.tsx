"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { toast } from "sonner";
import RoundedSlideButton from "@/components/ui/RoundedSlideButton";
import FlipDateTimePicker from "@/components/ui/FlipDateTimePicker";

interface FormData {
  name: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  preferredDate: "",
  preferredTime: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!form.email.trim()) e.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email";
    if (!form.message.trim()) e.message = "Please enter a message";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate() || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Failed to send");
      }
      setForm(initialForm);
      setErrors({});
      toast.success("Message sent! We'll be in touch soon.");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong — please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section id="contact" className="section" aria-label="Contact us">
        <div className="section-container">
          <motion.div
            className="mb-8 sm:mb-12 md:mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <span className="section-label">Get in Touch</span>
            <h2 className="section-title mb-4">Contact Us</h2>
            <p className="section-subtitle mx-auto">
              Have a question or ready to book? Reach out — we&apos;d love to hear
              from you.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:gap-12 lg:grid-cols-2">
            {/* Contact form */}
            <motion.form
              className="contact-form-card"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
              noValidate
            >
              <div className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label className="input-label" htmlFor="contact-name">
                    Name <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className={`input ${errors.name ? "input-error" : ""}`}
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  {errors.name && <p className="input-error-text">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="input-label" htmlFor="contact-email">
                    Email <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className={`input ${errors.email ? "input-error" : ""}`}
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  {errors.email && <p className="input-error-text">{errors.email}</p>}
                </div>

                <div>
                  <label className="input-label">Preferred Date &amp; Time</label>
                  <FlipDateTimePicker
                    dateValue={form.preferredDate}
                    timeValue={form.preferredTime}
                    onDateChange={(d) =>
                      setForm((prev) => ({ ...prev, preferredDate: d }))
                    }
                    onTimeChange={(t) =>
                      setForm((prev) => ({ ...prev, preferredTime: t }))
                    }
                    error={errors.preferredDate}
                    variant="light"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="input-label" htmlFor="contact-message">
                    Message <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    className={`input ${errors.message ? "input-error" : ""}`}
                    placeholder="Tell us how we can help…"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                  />
                  {errors.message && <p className="input-error-text">{errors.message}</p>}
                </div>
                <RoundedSlideButton
                  icon={<Send size={16} />}
                  className="w-full mt-2"
                  disabled={submitting}
                >
                  {submitting ? "Sending…" : "Send Message"}
                </RoundedSlideButton>
              </div>
            </motion.form>

            {/* Info */}
            <motion.div
              className="flex flex-col gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
            >
              <div className="flex gap-4 items-start">
                <div className="card-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4
                    style={{
                      fontWeight: 600,
                      fontSize: "var(--text-base)",
                      color: "var(--fg)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Location
                  </h4>
                  <p className="card-desc">
                    29 Fife Avenue, Avenues, 00000, Harare, Zimbabwe
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="card-icon">
                  <Phone size={20} />
                </div>
                <div>
                  <h4
                    style={{
                      fontWeight: 600,
                      fontSize: "var(--text-base)",
                      color: "var(--fg)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Phone
                  </h4>
                  <p className="card-desc">+263 24 2250335</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="card-icon">
                  <Mail size={20} />
                </div>
                <div>
                  <h4
                    style={{
                      fontWeight: 600,
                      fontSize: "var(--text-base)",
                      color: "var(--fg)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Email
                  </h4>
                  <p className="card-desc">info@theeyezone.co.zw</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="card-icon">
                  <Clock size={20} />
                </div>
                <div>
                  <h4
                    style={{
                      fontWeight: 600,
                      fontSize: "var(--text-base)",
                      color: "var(--fg)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Hours
                  </h4>
                  <p className="card-desc">
                    Monday – Friday: 8:00 AM – 5:00 PM
                    <br />
                    Saturday: 8:00 AM – 1:00 PM
                    <br />
                    Sunday &amp; Public Holidays: Closed
                  </p>
                </div>
              </div>

              {/* Social links */}
              <div>
                <h4
                  style={{
                    fontWeight: 600,
                    fontSize: "var(--text-base)",
                    color: "var(--fg)",
                    marginBottom: "var(--space-md)",
                  }}
                >
                  Follow Us
                </h4>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="social-icon"
                    aria-label="Facebook"
                  >
                    <Facebook size={18} />
                  </a>
                  <a
                    href="#"
                    className="social-icon"
                    aria-label="Instagram"
                  >
                    <Instagram size={18} />
                  </a>
                  <a
                    href="#"
                    className="social-icon"
                    aria-label="Twitter"
                  >
                    <Twitter size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
