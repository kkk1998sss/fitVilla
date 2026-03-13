import fs from "fs";
import path from "path";

export type StoredCalendarEvent = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  dateKey: string;
  startTime: string;
  endTime: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "adminCalendar.json");

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, "[]", "utf8");
  }
}

export function loadCalendarEvents(): StoredCalendarEvent[] {
  try {
    ensureFile();
    const raw = fs.readFileSync(FILE_PATH, "utf8");
    const parsed = JSON.parse(raw) as StoredCalendarEvent[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveCalendarEvents(events: StoredCalendarEvent[]): void {
  ensureFile();
  fs.writeFileSync(FILE_PATH, JSON.stringify(events, null, 2), "utf8");
}

