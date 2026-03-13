 "use client";

import { useMemo, useState } from "react";
import { useAdminCalendar } from "../_services/adminCalendar";

type ViewMode = "month";

const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getMonthStart(d: Date): Date {
  const x = new Date(d);
  x.setDate(1);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addMonths(d: Date, n: number): Date {
  const x = new Date(d);
  x.setMonth(x.getMonth() + n);
  return x;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDateKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export default function AdminCalendarPage() {
  const [viewMode] = useState<ViewMode>("month");
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("06:00");
  const [endTime, setEndTime] = useState("07:00");

  const { eventsByDay, addEvent, deleteEvent } = useAdminCalendar();
  const BRANCHES = ["Sector 76", "Sector 133", "Mayur Vihar"] as const;
  const [selectedBranch, setSelectedBranch] = useState<(typeof BRANCHES)[number] | "other">(
    "Sector 76"
  );

  const monthStart = useMemo(() => getMonthStart(cursor), [cursor]);

  const monthDays = useMemo(() => {
    const start = monthStart;
    const firstDay = start.getDay();
    const daysInMonth = new Date(
      start.getFullYear(),
      start.getMonth() + 1,
      0
    ).getDate();
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const result: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) result.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const x = new Date(start);
      x.setDate(d);
      result.push(x);
    }
    while (result.length < totalCells) result.push(null);
    return result;
  }, [monthStart]);

  const titleBar = `${MONTH_NAMES[monthStart.getMonth()]} ${monthStart.getFullYear()}`;

  const openModalForDate = (d: Date) => {
    setSelectedDate(d);
    setTitle("");
    setLocation("");
    setSelectedBranch("Sector 76");
    setDescription("");
    setStartTime("06:00");
    setEndTime("07:00");
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!selectedDate || !title.trim()) {
      return;
    }
    const finalLocation =
      selectedBranch === "other"
        ? location.trim() || undefined
        : selectedBranch;
    addEvent({
      title: title.trim(),
      description: description.trim() || undefined,
      location: finalLocation,
      dateKey: formatDateKey(selectedDate),
      startTime,
      endTime,
    });
    setModalOpen(false);
  };

  const goPrevMonth = () => setCursor((c) => addMonths(c, -1));
  const goNextMonth = () => setCursor((c) => addMonths(c, 1));
  const goToday = () => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    setCursor(t);
  };

  return (
    <div className="space-y-4">
      {/* Header within admin shell */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Class Calendar
          </h1>
          <p className="mt-1 text-xs text-slate-300">
            Same calendar layout as members see, but with the ability to add
            and manage class events.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={goPrevMonth}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-fitvilla-muted transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Previous month"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={goToday}
            className="hidden rounded-lg border border-white/20 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10 sm:inline-flex"
          >
            Today
          </button>
          <button
            type="button"
            onClick={goNextMonth}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-fitvilla-muted transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Next month"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Title bar */}
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/60 px-3 py-2 text-sm">
        <span className="font-semibold text-fitvilla-cyan">{titleBar}</span>
        <span className="text-[11px] text-slate-400">
          Click any day to add a class
        </span>
      </div>

      {/* Calendar area (month view, same style as public) */}
      {viewMode === "month" && (
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-7 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
            {WEEKDAY_NAMES.map((name) => (
              <div
                key={name}
                className="bg-black py-2 text-center text-xs font-semibold uppercase text-fitvilla-muted"
              >
                {name}
              </div>
            ))}
            {monthDays.map((d, i) => {
              if (!d) {
                return (
                  <div key={`e-${i}`} className="min-h-[100px] bg-black/50" />
                );
              }
              const key = formatDateKey(d);
                const dayEvs = eventsByDay.get(key) ?? [];
              const isCurrent = isSameDay(d, cursor);
              return (
                <div
                  key={key}
                  className="min-h-[110px] border-t border-white/5 bg-black p-2"
                >
                  <button
                    type="button"
                    onClick={() => openModalForDate(d)}
                    className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                      isCurrent
                        ? "bg-fitvilla-cyan text-black"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {d.getDate()}
                  </button>
                  <div className="space-y-1">
                    {dayEvs.slice(0, 3).map((ev) => (
                      <div
                        key={ev.id}
                        className="flex items-center gap-1 truncate rounded border border-fitvilla-cyan/40 bg-fitvilla-cyan/10 px-1.5 py-0.5 text-[10px] text-fitvilla-cyan"
                      >
                        <span className="flex-1 truncate">
                          {ev.startTime} {ev.title}
                        </span>
                        <button
                          type="button"
                          onClick={() => void deleteEvent(ev.id)}
                          className="rounded-full bg-black/40 px-1 text-[10px] text-rose-300 hover:bg-rose-500/30 hover:text-white"
                          aria-label="Delete class"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {dayEvs.length > 3 && (
                      <span className="text-[10px] text-fitvilla-muted">
                        +{dayEvs.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Popup modal for adding event, similar to Google Calendar */}
      {modalOpen && selectedDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/95 p-5 shadow-2xl shadow-black/70">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fitvilla-cyan">
                  New Class
                </p>
                <p className="text-[11px] text-slate-400">
                  {selectedDate.getDate()}{" "}
                  {MONTH_NAMES[selectedDate.getMonth()]}{" "}
                  {selectedDate.getFullYear()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-sm text-white outline-none ring-fitvilla-cyan/40 placeholder:text-slate-500 focus:border-fitvilla-cyan/60 focus:ring-2"
                  placeholder="Class title (e.g. Morning Yoga)"
                  autoFocus
                />
              </div>
              <div className="flex gap-2 text-xs">
                <div className="flex-1">
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Start
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full rounded-lg border border-white/15 bg-black/60 px-2 py-1.5 text-xs text-white outline-none ring-fitvilla-cyan/40 focus:border-fitvilla-cyan/60 focus:ring-2"
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    End
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full rounded-lg border border-white/15 bg-black/60 px-2 py-1.5 text-xs text-white outline-none ring-fitvilla-cyan/40 focus:border-fitvilla-cyan/60 focus:ring-2"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Location
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedBranch}
                    onChange={(e) =>
                      setSelectedBranch(e.target.value as (typeof BRANCHES)[number] | "other")
                    }
                    className="w-40 rounded-xl border border-white/15 bg-black/60 px-2 py-2 text-xs text-white outline-none ring-fitvilla-cyan/40 focus:border-fitvilla-cyan/60 focus:ring-2"
                  >
                    {BRANCHES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                    <option value="other">Other…</option>
                  </select>
                  {selectedBranch === "other" && (
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="flex-1 rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white outline-none ring-fitvilla-cyan/40 placeholder:text-slate-500 focus:border-fitvilla-cyan/60 focus:ring-2"
                      placeholder="Custom location"
                    />
                  )}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Notes
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full resize-none rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white outline-none ring-fitvilla-cyan/40 placeholder:text-slate-500 focus:border-fitvilla-cyan/60 focus:ring-2"
                  placeholder="Optional details like coach name, capacity, or special focus."
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 font-medium text-slate-200 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-full bg-fitvilla-cyan px-4 py-2 font-semibold text-black hover:bg-fitvilla-glow hover:shadow-[0_0_20px_rgba(45,212,228,0.6)]"
              >
                Save class
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

