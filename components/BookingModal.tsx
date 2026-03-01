"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, X } from "lucide-react";
import { useBookingModalState, closeBookingModal } from "@/lib/hooks";
import { services } from "@/lib/data";
import RoundedSlideButton from "@/components/ui/RoundedSlideButton";
import Toast from "@/components/ui/Toast";

interface BookingForm {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}

const initial: BookingForm = {
  name: "",
  phone: "",
  service: "",
  date: "",
  time: "",
  notes: "",
};

export default function BookingModal() {
  const isOpen = useBookingModalState();
  const [form, setForm] = useState<BookingForm>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingForm, string>>>({});
  const [showToast, setShowToast] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.phone.trim()) e.phone = "Required";
    else if (!/^[+\d][\d\s\-()]{6,}$/.test(form.phone))
      e.phone = "Enter a valid phone number";
    if (!form.service) e.service = "Please select a service";
    if (!form.date) e.date = "Please choose a date";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setForm(initial);
    setErrors({});
    closeBookingModal();
    setShowToast(true);
  };

  const Field = ({
    label,
    name,
    type = "text",
    placeholder,
  }: {
    label: string;
    name: keyof BookingForm;
    type?: string;
    placeholder: string;
  }) => (
    <div>
      <label className="input-label" htmlFor={`booking-${name}`}>
        {label}
      </label>
      <input
        id={`booking-${name}`}
        type={type}
        className={`input ${errors[name] ? "input-error" : ""}`}
        placeholder={placeholder}
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
      />
      {errors[name] && <p className="input-error-text">{errors[name]}</p>}
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => closeBookingModal()}
            className="fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer p-4"
            style={{
              background: "rgba(15, 23, 42, 0.4)",
              backdropFilter: "blur(6px)",
            }}
          >
            <motion.div
              initial={{ scale: 0, rotate: "12.5deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg shadow-xl cursor-default relative overflow-hidden rounded-2xl"
              style={{
                background: "linear-gradient(135deg, var(--blue-600), var(--blue-800))",
              }}
            >
              {/* Decorative background icon */}
              <CalendarCheck
                className="absolute z-0 -top-16 -left-16 rotate-12"
                size={220}
                strokeWidth={0.5}
                style={{ color: "rgba(255,255,255,0.07)" }}
              />

              <div className="spring-modal relative z-10 p-8">
                {/* Close button */}
                <button
                  onClick={() => closeBookingModal()}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>

                {/* Header */}
                <div className="flex flex-col items-center mb-6">
                  <div
                    className="w-16 h-16 mb-3 rounded-full text-3xl grid place-items-center"
                    style={{
                      background: "var(--bg)",
                      color: "var(--blue-600)",
                    }}
                  >
                    <CalendarCheck size={28} />
                  </div>
                  <h2
                    className="text-2xl font-bold text-center text-white"
                    style={{ fontFamily: "var(--font-display), Georgia, serif" }}
                  >
                    Book an Appointment
                  </h2>
                  <p className="text-center text-white/70 text-sm mt-1">
                    Fill in the details below and we&apos;ll confirm your booking.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate>
                  <div className="flex flex-col gap-3">
                    <Field
                      label="Full Name"
                      name="name"
                      placeholder="Your full name"
                    />
                    <Field
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="+263 77 000 0000"
                    />

                    {/* Service select */}
                    <div>
                      <label
                        className="input-label"
                        htmlFor="booking-service"
                      >
                        Service
                      </label>
                      <select
                        id="booking-service"
                        className={`input ${errors.service ? "input-error" : ""}`}
                        value={form.service}
                        onChange={(e) =>
                          setForm({ ...form, service: e.target.value })
                        }
                      >
                        <option value="">Select a service…</option>
                        {services.map((s) => (
                          <option key={s.title} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="input-error-text">{errors.service}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Field
                        label="Preferred Date"
                        name="date"
                        type="date"
                        placeholder=""
                      />
                      <Field
                        label="Preferred Time"
                        name="time"
                        type="time"
                        placeholder=""
                      />
                    </div>

                    <div>
                      <label className="input-label" htmlFor="booking-notes">
                        Notes (optional)
                      </label>
                      <textarea
                        id="booking-notes"
                        className="input"
                        placeholder="Anything we should know…"
                        value={form.notes}
                        onChange={(e) =>
                          setForm({ ...form, notes: e.target.value })
                        }
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-3 mt-2">
                      <button
                        type="button"
                        onClick={() => closeBookingModal()}
                        className="w-full py-3 rounded-full font-semibold text-white transition-colors hover:bg-white/10"
                        style={{ background: "transparent" }}
                      >
                        Cancel
                      </button>
                      <RoundedSlideButton
                        icon={<CalendarCheck size={16} />}
                        className="w-full"
                        defaultBg="#ffffff"
                        defaultText="var(--blue-600)"
                        hoverBg="var(--blue-600)"
                        hoverText="#ffffff"
                        borderColor="#ffffff"
                      >
                        Confirm
                      </RoundedSlideButton>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toast
        message="Appointment request sent! We'll confirm shortly."
        visible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
