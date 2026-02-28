"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  getSampleClassesForWeek,
  getClassColor,
  type ClassEvent,
} from "@/content/classes";

type ViewMode = "day" | "week" | "month";

const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getWeekStart(d: Date): Date {
  const x = new Date(d);
  const day = x.getDay();
  x.setDate(x.getDate() - day);
  x.setHours(0, 0, 0, 0);
  return x;
}

function getMonthStart(d: Date): Date {
  const x = new Date(d);
  x.setDate(1);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDateKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export default function CalendarPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const weekStart = useMemo(() => getWeekStart(cursor), [cursor]);
  const monthStart = useMemo(() => getMonthStart(cursor), [cursor]);

  const events = useMemo(() => getSampleClassesForWeek(weekStart), [weekStart]);

  const eventsByDay = useMemo(() => {
    const map = new Map<string, ClassEvent[]>();
    for (const e of events) {
      const key = formatDateKey(e.start);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(e);
    }
    for (const arr of map.values()) {
      arr.sort((a, b) => a.start.getTime() - b.start.getTime());
    }
    return map;
  }, [events]);

  const goPrev = () => {
    if (viewMode === "day") setCursor((c) => addDays(c, -1));
    if (viewMode === "week") setCursor((c) => addDays(c, -7));
    if (viewMode === "month") {
      setCursor((c) => {
        const x = new Date(c);
        x.setMonth(x.getMonth() - 1);
        return x;
      });
    }
  };

  const goNext = () => {
    if (viewMode === "day") setCursor((c) => addDays(c, 1));
    if (viewMode === "week") setCursor((c) => addDays(c, 7));
    if (viewMode === "month") {
      setCursor((c) => {
        const x = new Date(c);
        x.setMonth(x.getMonth() + 1);
        return x;
      });
    }
  };

  const goToday = () => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    setCursor(t);
  };

  const title =
    viewMode === "day"
      ? `${cursor.getDate()} ${MONTH_NAMES[cursor.getMonth()]} ${cursor.getFullYear()}`
      : viewMode === "week"
        ? `Week of ${weekStart.getDate()} ${MONTH_NAMES[weekStart.getMonth()]}`
        : `${MONTH_NAMES[monthStart.getMonth()]} ${monthStart.getFullYear()}`;

  const dayEvents = eventsByDay.get(formatDateKey(cursor)) ?? [];

  const monthDays = useMemo(() => {
    const start = getMonthStart(cursor);
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
  }, [cursor]);

  return (
    <div className="fixed inset-0 z-[60] flex min-h-screen flex-col bg-black">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-black/95 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/classes"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-fitvilla-muted transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Back to classes"
          >
            <svg
              className="h-5 w-5"
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
          </Link>
          <h1 className="text-lg font-bold text-white sm:text-xl">
            Class schedule
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex rounded-lg border border-white/10 bg-white/5 p-0.5">
            {(["day", "week", "month"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`rounded-md px-3 py-2 text-xs font-medium capitalize transition-colors sm:px-4 sm:text-sm ${
                  viewMode === mode
                    ? "bg-fitvilla-cyan text-black"
                    : "text-fitvilla-light/80 hover:text-white"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={goPrev}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-fitvilla-muted transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Previous"
            >
              <svg
                className="h-5 w-5"
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
              className="hidden rounded-lg border border-white/20 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white/10 sm:block"
            >
              Today
            </button>
            <button
              type="button"
              onClick={goNext}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-fitvilla-muted transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Next"
            >
              <svg
                className="h-5 w-5"
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
      </header>

      {/* Title bar */}
      <div className="shrink-0 border-b border-white/5 px-4 py-2 sm:px-6">
        <p className="text-sm font-semibold text-fitvilla-cyan">{title}</p>
      </div>

      {/* Calendar area - full remaining height */}
      <div className="min-h-0 flex-1 overflow-auto p-4 sm:p-6">
        {viewMode === "day" && (
          <div className="mx-auto max-w-2xl">
            <div className="space-y-2">
              {dayEvents.length === 0 ? (
                <div className="rounded-xl border border-white/10 bg-white/5 py-12 text-center text-fitvilla-muted">
                  No classes scheduled for this day.
                </div>
              ) : (
                dayEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className={`rounded-xl border px-4 py-3 ${getClassColor(ev.type)}`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-semibold">{ev.title}</span>
                      <span className="text-xs opacity-90">
                        {formatTime(ev.start)} – {formatTime(ev.end)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs opacity-80">{ev.location}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {viewMode === "week" && (
          <div className="flex h-full min-h-[400px] flex-col overflow-auto rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="grid grid-cols-8 shrink-0 border-b border-white/10">
              <div className="border-r border-white/10 p-2 text-xs font-medium text-fitvilla-muted" />
              {WEEKDAY_NAMES.map((_, i) => {
                const d = addDays(weekStart, i);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setCursor(d);
                      setViewMode("day");
                    }}
                    className={`border-r border-white/10 p-2 text-center last:border-r-0 ${
                      isSameDay(d, cursor)
                        ? "bg-fitvilla-cyan/20 text-fitvilla-cyan"
                        : "text-white"
                    }`}
                  >
                    <span className="block text-[10px] uppercase sm:text-xs">
                      {WEEKDAY_NAMES[d.getDay()]}
                    </span>
                    <span className="mt-0.5 block text-lg font-bold">
                      {d.getDate()}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="flex-1 overflow-auto">
              {[6, 7, 8, 9, 10, 11, 12, 17, 18, 19].map((hour) => (
                <div
                  key={hour}
                  className="grid grid-cols-8 border-b border-white/5 text-sm"
                >
                  <div className="border-r border-white/10 py-1 pr-2 text-right text-xs text-fitvilla-muted">
                    {hour === 12 ? "12 PM" : hour < 12 ? `${hour} AM` : `${hour - 12} PM`}
                  </div>
                  {Array.from({ length: 7 }).map((_, dayIdx) => {
                    const day = addDays(weekStart, dayIdx);
                    const key = formatDateKey(day);
                    const dayEvs = (eventsByDay.get(key) ?? []).filter(
                      (e) => e.start.getHours() === hour
                    );
                    return (
                      <div
                        key={dayIdx}
                        className="border-r border-white/5 p-1 last:border-r-0"
                      >
                        {dayEvs.map((ev) => (
                          <div
                            key={ev.id}
                            className={`mb-1 rounded border px-2 py-1 text-xs ${getClassColor(ev.type)}`}
                          >
                            <span className="font-medium">{ev.title}</span>
                            <span className="block truncate opacity-80">
                              {ev.location}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {viewMode === "month" && (
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-7 gap-px rounded-xl border border-white/10 bg-white/10 overflow-hidden">
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
                  return <div key={`e-${i}`} className="min-h-[100px] bg-black/50" />;
                }
                const key = formatDateKey(d);
                const dayEvs = (eventsByDay.get(key) ?? []).slice(0, 3);
                const isCurrent = isSameDay(d, cursor);
                return (
                  <div
                    key={key}
                    className="min-h-[100px] border-t border-white/5 bg-black p-2"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setCursor(d);
                        setViewMode("day");
                      }}
                      className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                        isCurrent
                          ? "bg-fitvilla-cyan text-black"
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      {d.getDate()}
                    </button>
                    <div className="space-y-1">
                      {dayEvs.map((ev) => (
                        <div
                          key={ev.id}
                          className={`truncate rounded border px-1.5 py-0.5 text-[10px] ${getClassColor(ev.type)}`}
                        >
                          {formatTime(ev.start)} {ev.title}
                        </div>
                      ))}
                      {(eventsByDay.get(key)?.length ?? 0) > 3 && (
                        <span className="text-[10px] text-fitvilla-muted">
                          +{(eventsByDay.get(key)?.length ?? 0) - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
