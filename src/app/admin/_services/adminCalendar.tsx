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

type UseAdminCalendarResult = {
  events: AdminCalendarEvent[];
  addEvent: (ev: Omit<AdminCalendarEvent, "id">) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  eventsByDay: Map<string, AdminCalendarEvent[]>;
};

export function useAdminCalendar(): UseAdminCalendarResult {
  const [events, setEvents] = useState<AdminCalendarEvent[]>([]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/api/admin/calendar");
        if (!res.ok) return;
        const data = (await res.json()) as AdminCalendarEvent[];
        if (!cancelled) setEvents(data);
      } catch {
        // ignore
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const addEvent = async (ev: Omit<AdminCalendarEvent, "id">) => {
    try {
      const res = await fetch("/api/admin/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ev),
      });
      if (!res.ok) return;
      const created = (await res.json()) as AdminCalendarEvent;
      setEvents((prev) => [...prev, created]);
    } catch {
      // ignore
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await fetch("/api/admin/calendar", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
    } catch {
      // ignore
    }
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

  return { events, addEvent, deleteEvent, eventsByDay };
}


