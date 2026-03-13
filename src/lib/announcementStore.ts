import fs from "fs";
import path from "path";

export type StoredAnnouncement = {
  message: string;
  updatedAt: string | null;
};

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "announcement.json");

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(FILE_PATH)) {
    const initial: StoredAnnouncement = { message: "", updatedAt: null };
    fs.writeFileSync(FILE_PATH, JSON.stringify(initial, null, 2), "utf8");
  }
}

export function loadAnnouncement(): StoredAnnouncement {
  try {
    ensureFile();
    const raw = fs.readFileSync(FILE_PATH, "utf8");
    const parsed = JSON.parse(raw) as StoredAnnouncement;
    if (!parsed || typeof parsed.message !== "string") {
      return { message: "", updatedAt: null };
    }
    return parsed;
  } catch {
    return { message: "", updatedAt: null };
  }
}

export function saveAnnouncement(announcement: StoredAnnouncement): void {
  ensureFile();
  fs.writeFileSync(FILE_PATH, JSON.stringify(announcement, null, 2), "utf8");
}

