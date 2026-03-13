import { NextResponse } from "next/server";
import {
  loadCalendarEvents,
  saveCalendarEvents,
  type StoredCalendarEvent,
} from "@/lib/calendarStore";

export async function GET() {
  const events = loadCalendarEvents();
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Omit<StoredCalendarEvent, "id">;
  const events = loadCalendarEvents();
  const newEvent: StoredCalendarEvent = {
    ...body,
    id: `admin-ev-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  };
  events.push(newEvent);
  saveCalendarEvents(events);
  return NextResponse.json(newEvent, { status: 201 });
}

export async function DELETE(request: Request) {
  const { id } = (await request.json()) as { id: string };
  const events = loadCalendarEvents();
  const next = events.filter((ev) => ev.id !== id);
  saveCalendarEvents(next);
  return NextResponse.json({ ok: true });
}

