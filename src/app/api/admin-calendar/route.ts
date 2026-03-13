import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src", "data", "adminCalendar.json");

async function readEvents() {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    return JSON.parse(raw) as any[];
  } catch {
    return [];
  }
}

async function writeEvents(events: any[]) {
  await fs.writeFile(DATA_PATH, JSON.stringify(events, null, 2), "utf8");
}

export async function GET() {
  const events = await readEvents();
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const incoming = await request.json();
  const events = await readEvents();
  const idx = events.findIndex((e) => e.id === incoming.id);
  if (idx >= 0) {
    events[idx] = incoming;
  } else {
    events.push(incoming);
  }
  await writeEvents(events);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
  }
  const events = await readEvents();
  const filtered = events.filter((e) => e.id !== id);
  await writeEvents(filtered);
  return NextResponse.json({ ok: true });
}

