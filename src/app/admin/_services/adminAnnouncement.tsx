"use client";

import { useEffect, useState } from "react";

export type AdminAnnouncement = {
  message: string;
  updatedAt: string | null;
};

export type AdminAnnouncementStatus = "" | "saving" | "saved";

type UseAdminAnnouncementResult = {
  announcement: AdminAnnouncement | null;
  status: AdminAnnouncementStatus;
  setMessage: (message: string) => void;
};

export function useAdminAnnouncement(): UseAdminAnnouncementResult {
  const [announcement, setAnnouncement] = useState<AdminAnnouncement | null>(null);
  const [status, setStatus] = useState<AdminAnnouncementStatus>("");
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);

  // Load existing announcement
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/api/admin/announcement");
        if (!res.ok) return;
        const data = (await res.json()) as AdminAnnouncement;
        if (!cancelled) setAnnouncement(data);
      } catch {
        // ignore
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Debounced save when message changes
  useEffect(() => {
    if (pendingMessage === null) return;
    setStatus("saving");
    const id = window.setTimeout(async () => {
      try {
        const res = await fetch("/api/admin/announcement", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: pendingMessage }),
        });
        if (!res.ok) return;
        const data = (await res.json()) as AdminAnnouncement;
        setAnnouncement(data);
        setStatus("saved");
        window.setTimeout(() => setStatus(""), 2000);
      } catch {
        // ignore errors for now
      }
    }, 400);
    return () => window.clearTimeout(id);
  }, [pendingMessage]);

  const setMessage = (message: string) => {
    setAnnouncement((prev) => ({
      message,
      updatedAt: prev?.updatedAt ?? null,
    }));
    setPendingMessage(message);
  };

  return { announcement, status, setMessage };
}

