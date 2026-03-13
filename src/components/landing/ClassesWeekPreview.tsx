"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAdminCalendar, type AdminCalendarEvent } from "@/app/admin/_services/adminCalendar";

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

function formatDateKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function parseDateKey(dateKey?: string): Date | null {
  if (!dateKey || typeof dateKey !== "string") return null;
  const parts = dateKey.split("-");
  if (parts.length !== 3) return null;
  const [yearStr, monthStr, dayStr] = parts;
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return null;
  return new Date(year, month, day);
}

export function ClassesWeekPreview() {
  const { events, eventsByDay } = useAdminCalendar();
  const [selectedEvent, setSelectedEvent] = useState<AdminCalendarEvent | null>(null);
  const [upcomingToday, setUpcomingToday] = useState<AdminCalendarEvent[]>([]);
  const [now, setNow] = useState<Date>(() => new Date());

  // Compute all upcoming classes for *today* (closest future start times)
  useEffect(() => {
    if (!events || events.length === 0) {
      setUpcomingToday([]);
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayKeyLocal = formatDateKey(today);
    const positioned = events
      .filter((ev) => ev.dateKey === todayKeyLocal)
      .map((ev) => {
        const date = parseDateKey(ev.dateKey);
        if (!date || !ev.startTime) return null;
        const [h, m] = ev.startTime.split(":").map((x) => parseInt(x, 10));
        date.setHours(h || 0, m || 0, 0, 0);
        return { ev, start: date };
      })
      .filter((x): x is { ev: AdminCalendarEvent; start: Date } => !!x);

    const nowTime = new Date();
    const upcoming = positioned
      .filter(({ start }) => start.getTime() > nowTime.getTime())
      .sort((a, b) => a.start.getTime() - b.start.getTime())
      .map(({ ev }) => ev);

    setUpcomingToday(upcoming);
  }, [events]);

  // Global ticking clock used for per-class countdowns
  useEffect(() => {
    const id = window.setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const days = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const result: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      result.push(d);
    }
    return result;
  }, []);

  const todayKey = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return formatDateKey(t);
  }, []);

  const todayEvents = useMemo(
    () => eventsByDay.get(todayKey) ?? [],
    [eventsByDay, todayKey]
  );

  const formatCountdownForEvent = (ev: AdminCalendarEvent): string => {
    const targetDate = parseDateKey(ev.dateKey);
    if (!targetDate || !ev.startTime) return "";
    const [h, m] = ev.startTime.split(":").map((x) => parseInt(x, 10));
    targetDate.setHours(h || 0, m || 0, 0, 0);
    const diff = targetDate.getTime() - now.getTime();
    const totalSeconds = Math.max(0, Math.floor(diff / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    return `${minutes}m ${seconds}s`;
  };


  return (
    <section
      aria-labelledby="classes-week-preview-heading"
      className="scroll-mt-24 border-t border-white/10 bg-black px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2
              id="classes-week-preview-heading"
              className="text-xl font-semibold tracking-tight text-white sm:text-2xl"
            >
              This Week&apos;s Classes (Quick View)
            </h2>
            <p className="mt-1 text-sm text-fitvilla-light/80">
              Snapshot of upcoming classes added in the admin panel.
            </p>
          </div>
          <Link
            href="/classes/calendar"
            className="rounded-full border border-fitvilla-cyan/60 bg-fitvilla-cyan/10 px-4 py-2 text-xs font-semibold text-fitvilla-cyan transition hover:bg-fitvilla-cyan hover:text-black"
          >
            Open full calendar
          </Link>
        </div>

        {upcomingToday.length > 0 && (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
            {upcomingToday.map((ev) => (
              <button
                key={ev.id}
                type="button"
                onClick={() => setSelectedEvent(ev)}
                className="min-w-[220px] flex-1 rounded-2xl border border-fitvilla-cyan/40 bg-gradient-to-r from-fitvilla-cyan/15 via-fitvilla-cyan/5 to-transparent px-4 py-3 text-left text-xs text-fitvilla-light/90 ring-0 transition hover:border-fitvilla-cyan/70 hover:bg-fitvilla-cyan/20 sm:text-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fitvilla-cyan">
                      Upcoming today
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {ev.title}
                    </p>
                    {parseDateKey(ev.dateKey) && (
                      <p className="mt-0.5 text-[11px] text-fitvilla-light/80">
                        {ev.startTime} – {ev.endTime}
                        {ev.location ? ` · ${ev.location}` : ""}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="rounded-full bg-black/70 px-3 py-1 text-[11px] font-semibold text-fitvilla-cyan ring-1 ring-fitvilla-cyan/60">
                      Starts in: {formatCountdownForEvent(ev)}
                    </span>
                    {ev.description && (
                      <p className="max-w-xs text-right text-[11px] text-fitvilla-light/70">
                        {ev.description}
                      </p>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-[11px] text-fitvilla-light/70 underline underline-offset-2">
                  View full class details
                </p>
              </button>
            ))}
          </div>
        )}

        {/* Inline strip of all classes scheduled today */}
        {todayEvents.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-fitvilla-light/80 sm:text-xs">
            <span className="mr-1 font-semibold text-fitvilla-cyan">
              Today&apos;s classes:
            </span>
            {todayEvents.map((ev) => (
              <button
                key={ev.id}
                type="button"
                onClick={() => setSelectedEvent(ev)}
                className="flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-left transition hover:border-fitvilla-cyan/60 hover:bg-fitvilla-cyan/10 hover:text-fitvilla-cyan"
              >
                <span className="font-semibold">{ev.startTime}</span>
                <span className="truncate max-w-[120px] sm:max-w-[160px]">
                  {ev.title}
                </span>
                {ev.location && (
                  <span className="hidden text-[10px] text-fitvilla-muted sm:inline">
                    · {ev.location}
                  </span>
                )}
                <span className="text-[10px] text-fitvilla-light/70 sm:text-[11px]">
                  ({formatCountdownForEvent(ev)})
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="mt-6 overflow-x-auto">
          <div className="min-w-full rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:p-4">
            <div className="grid min-w-[640px] grid-cols-7 gap-2 text-xs sm:text-sm">
              {days.map((d) => {
                const key = formatDateKey(d);
                const dayEvents = eventsByDay.get(key) ?? [];
                const label = WEEKDAY_NAMES[d.getDay()];
                return (
                  <div
                    key={key}
                    className="flex flex-col rounded-xl border border-white/10 bg-black/60 p-2"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-fitvilla-muted">
                        {label}
                      </span>
                      <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-fitvilla-light/80">
                        {d.getDate()}
                      </span>
                    </div>
                    <div className="mt-2 space-y-1">
                      {dayEvents.length === 0 ? (
                        <p className="text-[11px] text-fitvilla-muted/70">No classes</p>
                      ) : (
                        dayEvents.slice(0, 3).map((ev) => (
                          <button
                            key={ev.id}
                            type="button"
                            onClick={() => setSelectedEvent(ev)}
                            className="w-full rounded-lg border border-fitvilla-cyan/40 bg-fitvilla-cyan/10 px-2 py-1 text-left text-[11px] text-fitvilla-cyan"
                          >
                            <span className="font-semibold">{ev.startTime}</span>{" "}
                            <span className="truncate">{ev.title}</span>
                          </button>
                        ))
                      )}
                      {dayEvents.length > 3 && (
                        <p className="text-[10px] text-fitvilla-muted">
                          +{dayEvents.length - 3} more
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Event details popup for quick view */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/95 p-5 shadow-2xl shadow-black/70">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fitvilla-cyan">
                  Class details
                </p>
                {parseDateKey(selectedEvent.dateKey) && (
                  <p className="text-[11px] text-slate-400">
                    {parseDateKey(selectedEvent.dateKey)!.getDate()}{" "}
                    {
                      MONTH_NAMES[
                        parseDateKey(selectedEvent.dateKey)!.getMonth()
                      ]
                    }{" "}
                    {parseDateKey(selectedEvent.dateKey)!.getFullYear()}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
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
              <h2 className="text-base font-semibold text-white">
                {selectedEvent.title}
              </h2>
              <p className="text-xs text-fitvilla-light/90">
                {selectedEvent.startTime} – {selectedEvent.endTime}
              </p>
              <p className="text-xs text-fitvilla-light/80">
                Location:{" "}
                <span className="font-medium">
                  {selectedEvent.location ?? "FitVilla"}
                </span>
              </p>
              {selectedEvent.description && (
                <p className="text-xs text-fitvilla-light/80">
                  Notes:{" "}
                  <span className="font-medium">
                    {selectedEvent.description}
                  </span>
                </p>
              )}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium text-slate-100 hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
