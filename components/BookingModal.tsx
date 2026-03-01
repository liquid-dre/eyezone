"use client";

import { useState, type FormEvent } from "react";
import { CalendarCheck } from "lucide-react";
import { useBookingModalState, closeBookingModal } from "@/lib/hooks";
import { services } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
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
      {isOpen && (
        <Dialog
          open
          onOpenChange={(open) => {
            if (!open) closeBookingModal();
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book an Appointment</DialogTitle>
              <DialogDescription>
                Fill in the details below and we&apos;ll confirm your booking.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col gap-4">
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

                <div className="grid grid-cols-2 gap-4">
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

                <RoundedSlideButton
                  icon={<CalendarCheck size={16} />}
                  className="w-full mt-2"
                >
                  Confirm Booking
                </RoundedSlideButton>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      <Toast
        message="Appointment request sent! We'll confirm shortly."
        visible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
