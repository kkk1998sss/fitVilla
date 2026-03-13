import { NextResponse } from "next/server";
import {
  loadAnnouncement,
  saveAnnouncement,
  type StoredAnnouncement,
} from "@/lib/announcementStore";

export async function GET() {
  const announcement = loadAnnouncement();
  return NextResponse.json(announcement);
}

export async function POST(request: Request) {
  const body = (await request.json()) as { message: string };
  const next: StoredAnnouncement = {
    message: body.message ?? "",
    updatedAt: new Date().toISOString(),
  };
  saveAnnouncement(next);
  return NextResponse.json(next);
}

