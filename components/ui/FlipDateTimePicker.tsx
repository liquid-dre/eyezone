"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  format,
  parse,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameDay,
  isSameMonth,
  isBefore,
  startOfDay,
} from "date-fns";
import { ChevronLeft, ChevronRight, Clock, CalendarDays, Info } from "lucide-react";

/* ── Clinic schedule ──────────────────────────────── */
const CLINIC_HOURS: Record<
  number,
  { open: string; close: string; label: string } | null
> = {
  0: null,
  1: { open: "8:00 AM", close: "5:00 PM", label: "Full Day" },
  2: { open: "8:00 AM", close: "5:00 PM", label: "Full Day" },
  3: { open: "8:00 AM", close: "5:00 PM", label: "Full Day" },
  4: { open: "8:00 AM", close: "5:00 PM", label: "Full Day" },
  5: { open: "8:00 AM", close: "5:00 PM", label: "Full Day" },
  6: { open: "8:00 AM", close: "1:00 PM", label: "Half Day" },
};

const TIME_SLOTS_WEEKDAY = [
  "8:00 AM",  "8:30 AM",  "9:00 AM",  "9:30 AM",
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM",  "1:30 PM",
  "2:00 PM",  "2:30 PM",  "3:00 PM",  "3:30 PM",
  "4:00 PM",  "4:30 PM",
];

const TIME_SLOTS_SATURDAY = [
  "8:00 AM",  "8:30 AM",  "9:00 AM",  "9:30 AM",
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM",
];

const WEEKDAY_HEADERS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

/* ── Calendar weeks computation ───────────────────── */
function getCalendarWeeks(month: Date): (Date | null)[][] {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);

  const weeks: (Date | null)[][] = [];
  let cursor = calStart;

  while (isBefore(cursor, addDays(calEnd, 1))) {
    const week: (Date | null)[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(isSameMonth(cursor, monthStart) ? new Date(cursor) : null);
      cursor = addDays(cursor, 1);
    }
    weeks.push(week);
  }

  return weeks;
}

/* ── Props ────────────────────────────────────────── */
interface FlipDateTimePickerProps {
  /** ISO date string "YYYY-MM-DD" or "" */
  dateValue: string;
  /** Time string like "8:00 AM" or "" */
  timeValue: string;
  onDateChange: (iso: string) => void;
  onTimeChange: (time: string) => void;
  error?: string;
}

/* ── Component ────────────────────────────────────── */
export default function FlipDateTimePicker({
  dateValue,
  timeValue,
  onDateChange,
  onTimeChange,
  error,
}: FlipDateTimePickerProps) {
  const selectedDate = dateValue
    ? parse(dateValue, "yyyy-MM-dd", new Date())
    : null;

  const [currentMonth, setCurrentMonth] = useState(
    startOfMonth(selectedDate ?? new Date())
  );
  const [flipIndex, setFlipIndex] = useState(0);
  const [calendarOpen, setCalendarOpen] = useState(true);

  const today = startOfDay(new Date());
  const weeks = useMemo(() => getCalendarWeeks(currentMonth), [currentMonth]);

  const handleSelectDate = (date: Date) => {
    const iso = format(date, "yyyy-MM-dd");
    onDateChange(iso);
    setFlipIndex((pv) => pv + 1);
    setCalendarOpen(false);
    if (dateValue && iso !== dateValue) onTimeChange("");
  };

  const dayOfWeek = selectedDate ? selectedDate.getDay() : null;
  const clinicHours =
    dayOfWeek !== null ? CLINIC_HOURS[dayOfWeek] : undefined;
  const isClosed = dayOfWeek !== null && !clinicHours;
  const timeSlots =
    dayOfWeek === 6 ? TIME_SLOTS_SATURDAY : TIME_SLOTS_WEEKDAY;
  const displayDate = selectedDate ?? new Date();

  return (
    <div className="flex flex-col gap-3">
      {/* ── Flip Display ──────────────────────────── */}
      <div className="flex flex-col items-center">
        <div className="w-fit overflow-hidden rounded-xl border-2 border-white/20 bg-white/10">
          <div className="flex items-center justify-between gap-12 px-3 py-1">
            <span className="text-sm uppercase tracking-wide text-white/90">
              {format(displayDate, "LLLL")}
            </span>
            <button
              type="button"
              onClick={() => setCalendarOpen((pv) => !pv)}
              className="text-white/70 transition-colors hover:text-white"
            >
              {calendarOpen ? (
                <ChevronLeft size={16} />
              ) : (
                <CalendarDays size={16} />
              )}
            </button>
          </div>
          <div className="relative z-0 h-28 w-44 shrink-0">
            <AnimatePresence mode="sync">
              {/* Top half */}
              <motion.div
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                  zIndex: -flipIndex,
                  backfaceVisibility: "hidden",
                }}
                key={flipIndex}
                transition={{ duration: 0.75, ease: "easeInOut" }}
                initial={{ rotateX: "0deg" }}
                animate={{ rotateX: "0deg" }}
                exit={{ rotateX: "-180deg" }}
                className="absolute inset-0"
              >
                <div
                  className="grid h-full w-full place-content-center rounded-lg bg-white text-5xl font-semibold"
                  style={{ color: "var(--blue-800)" }}
                >
                  {selectedDate ? format(selectedDate, "do") : "\u2014"}
                </div>
              </motion.div>
              {/* Bottom half */}
              <motion.div
                style={{
                  clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
                  zIndex: flipIndex,
                  backfaceVisibility: "hidden",
                }}
                key={(flipIndex + 1) * 2}
                initial={{ rotateX: "180deg" }}
                animate={{ rotateX: "0deg" }}
                exit={{ rotateX: "0deg" }}
                transition={{ duration: 0.75, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div
                  className="relative grid h-full w-full place-content-center rounded-lg bg-white text-5xl font-semibold"
                  style={{ color: "var(--blue-800)" }}
                >
                  {selectedDate ? format(selectedDate, "do") : "\u2014"}
                  <span
                    className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-xs"
                    style={{ color: "var(--neutral-500)" }}
                  >
                    {format(displayDate, "yyyy")}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Calendar Grid ─────────────────────────── */}
      <AnimatePresence>
        {calendarOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-xl bg-white p-3">
              {/* Month nav */}
              <div className="mb-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
                  className="rounded p-1 transition-colors"
                  style={{ color: "var(--blue-600)" }}
                >
                  <ChevronLeft size={16} />
                </button>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--fg)" }}
                >
                  {format(currentMonth, "MMMM yyyy")}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
                  className="rounded p-1 transition-colors"
                  style={{ color: "var(--blue-600)" }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Weekday headers */}
              <div className="grid grid-cols-7 mb-1">
                {WEEKDAY_HEADERS.map((wd) => (
                  <div
                    key={wd}
                    className="py-1 text-center text-xs font-medium"
                    style={{ color: "var(--neutral-400)" }}
                  >
                    {wd}
                  </div>
                ))}
              </div>

              {/* Date cells */}
              {weeks.map((week, wi) => (
                <div key={wi} className="grid grid-cols-7">
                  {week.map((date, di) => {
                    if (!date) {
                      return <div key={`e${wi}${di}`} className="h-7" />;
                    }

                    const isPast = isBefore(date, today);
                    const isSunday = date.getDay() === 0;
                    const isSelected =
                      selectedDate !== null && isSameDay(date, selectedDate);
                    const isToday = isSameDay(date, today);
                    const disabled = isPast || isSunday;

                    return (
                      <button
                        key={`d${wi}${di}`}
                        type="button"
                        disabled={disabled}
                        onClick={() => handleSelectDate(date)}
                        className="h-7 rounded-md text-sm transition-all"
                        style={{
                          background: isSelected
                            ? "var(--blue-600)"
                            : "transparent",
                          color: isSelected
                            ? "#fff"
                            : isToday
                              ? "var(--blue-600)"
                              : disabled
                                ? "var(--neutral-300)"
                                : "var(--fg)",
                          fontWeight: isSelected || isToday ? 600 : 400,
                          cursor: disabled ? "not-allowed" : "pointer",
                          opacity: disabled ? 0.4 : 1,
                        }}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Read-only Day Info ─────────────────────── */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-2"
        >
          <ReadOnlyField label="Day" value={format(selectedDate, "EEEE")} />
          <ReadOnlyField
            label="Hours"
            value={
              clinicHours
                ? `${clinicHours.open} \u2013 ${clinicHours.close}`
                : "Closed"
            }
          />
          <ReadOnlyField
            label="Status"
            value={isClosed ? "Closed" : clinicHours!.label}
            valueColor={isClosed ? "#fca5a5" : "#6ee7b7"}
          />
        </motion.div>
      )}

      {/* ── Time Slots ────────────────────────────── */}
      {selectedDate && !isClosed && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-2 flex items-center gap-1.5">
            <Clock size={14} className="text-white/70" />
            <span className="text-sm font-medium text-white/85">
              Select a time
            </span>
          </div>
          <div
            className="grid grid-cols-3 gap-1.5 max-h-36 overflow-y-auto rounded-xl p-2"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            {timeSlots.map((slot) => {
              const active = timeValue === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => onTimeChange(slot)}
                  className="rounded-lg px-2 py-1.5 text-xs font-medium transition-all"
                  style={{
                    background: active ? "#ffffff" : "rgba(255,255,255,0.1)",
                    color: active
                      ? "var(--blue-700)"
                      : "rgba(255,255,255,0.8)",
                    boxShadow: active ? "var(--shadow-sm)" : "none",
                  }}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* ── Closed warning ─────────────────────────── */}
      {selectedDate && isClosed && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 rounded-lg px-3 py-2"
          style={{ background: "rgba(239, 68, 68, 0.15)" }}
        >
          <Info size={14} style={{ color: "#fca5a5" }} className="shrink-0" />
          <p className="text-xs" style={{ color: "#fecaca" }}>
            The clinic is closed on Sundays. Please select another day.
          </p>
        </motion.div>
      )}

      {error && <p className="input-error-text">{error}</p>}
    </div>
  );
}

/* ── Read-only field chip ─────────────────────────── */
function ReadOnlyField({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div
      className="rounded-lg px-3 py-2 text-center"
      style={{ background: "rgba(255,255,255,0.08)" }}
    >
      <p
        className="mb-0.5 text-[10px] uppercase tracking-wider"
        style={{ color: "rgba(255,255,255,0.45)" }}
      >
        {label}
      </p>
      <p
        className="text-sm font-semibold"
        style={{ color: valueColor ?? "#ffffff" }}
      >
        {value}
      </p>
    </div>
  );
}
