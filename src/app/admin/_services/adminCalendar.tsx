 "use client";

import { useEffect, useMemo, useState } from "react";

export type AdminCalendarEvent = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  dateKey: string; // YYYY-M-D (matches formatDateKey from public calendar)
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
};

const STORAGE_KEY = "fitvilla-admin-calendar";

type UseAdminCalendarResult = {
  events: AdminCalendarEvent[];
  addEvent: (ev: Omit<AdminCalendarEvent, "id">) => void;
  eventsByDay: Map<string, AdminCalendarEvent[]>;
};

export function useAdminCalendar(): UseAdminCalendarResult {
  const [events, setEvents] = useState<AdminCalendarEvent[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as AdminCalendarEvent[];
      setEvents(parsed);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch {
      // ignore
    }
  }, [events]);

  const addEvent = (ev: Omit<AdminCalendarEvent, "id">) => {
    setEvents((prev) => [
      ...prev,
      {
        ...ev,
        id: `admin-ev-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      },
    ]);
  };

  const eventsByDay = useMemo(() => {
    const map = new Map<string, AdminCalendarEvent[]>();
    for (const e of events) {
      if (!map.has(e.dateKey)) map.set(e.dateKey, []);
      map.get(e.dateKey)!.push(e);
    }
    for (const arr of map.values()) {
      arr.sort((a, b) => a.startTime.localeCompare(b.startTime));
    }
    return map;
  }, [events]);

  return { events, addEvent, eventsByDay };
}

