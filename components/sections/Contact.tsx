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
import RoundedSlideButton from "@/components/ui/RoundedSlideButton";
import Toast from "@/components/ui/Toast";
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
  const [showToast, setShowToast] = useState(false);

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setForm(initialForm);
    setErrors({});
    setShowToast(true);
  };

  const Field = ({
    label,
    name,
    type = "text",
    placeholder,
    textarea,
  }: {
    label: string;
    name: keyof FormData;
    type?: string;
    placeholder: string;
    textarea?: boolean;
  }) => (
    <div>
      <label className="input-label" htmlFor={`contact-${name}`}>
        {label}
      </label>
      {textarea ? (
        <textarea
          id={`contact-${name}`}
          className={`input ${errors[name] ? "input-error" : ""}`}
          placeholder={placeholder}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          rows={4}
        />
      ) : (
        <input
          id={`contact-${name}`}
          type={type}
          className={`input ${errors[name] ? "input-error" : ""}`}
          placeholder={placeholder}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        />
      )}
      {errors[name] && <p className="input-error-text">{errors[name]}</p>}
    </div>
  );

  return (
    <>
      <section id="contact" className="section" aria-label="Contact us">
        <div className="section-container">
          <motion.div
            className="mb-16 text-center"
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

          <div className="grid gap-12 lg:grid-cols-2">
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
                <Field
                  label="Name"
                  name="name"
                  placeholder="Your full name"
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                />
                <div>
                  <label className="input-label">Preferred Date &amp; Time</label>
                  <FlipDateTimePicker
                    dateValue={form.preferredDate}
                    timeValue={form.preferredTime}
                    onDateChange={(d) =>
                      setForm({ ...form, preferredDate: d })
                    }
                    onTimeChange={(t) =>
                      setForm({ ...form, preferredTime: t })
                    }
                    error={errors.preferredDate}
                    variant="light"
                  />
                </div>
                <Field
                  label="Message"
                  name="message"
                  placeholder="Tell us how we can help…"
                  textarea
                />
                <RoundedSlideButton
                  icon={<Send size={16} />}
                  className="w-full mt-2"
                >
                  Send Message
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

      <Toast
        message="Message sent! We'll be in touch soon."
        visible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
