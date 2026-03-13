"use client";

import { useAdminAnnouncement } from "../_services/adminAnnouncement";

export default function AdminSchedulePage() {
  const { announcement, status, setMessage } = useAdminAnnouncement();

  if (!announcement) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-slate-400">Loading schedule tools…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Schedule & Announcements
          </h1>
          <p className="mt-1 text-xs text-slate-300">
            Keep members updated about special classes, holiday timings or schedule changes.
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
            status === "saved"
              ? "bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-500/50"
              : status === "saving"
                ? "bg-amber-500/20 text-amber-100 ring-1 ring-amber-500/50"
                : "bg-slate-700/70 text-slate-200 ring-1 ring-slate-600/60"
          }`}
        >
          {status === "saved" ? "Saved" : status === "saving" ? "Saving…" : "Autosave idle"}
        </span>
      </div>

      <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-sky-500/10 p-6 shadow-xl shadow-black/40 backdrop-blur-xl">
        <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-100/90">
          Announcements
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-[2fr,1fr]">
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-100/90">
              Schedule Note / Announcement
            </label>
            <textarea
              value={announcement.message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full resize-none rounded-2xl border border-emerald-500/40 bg-black/40 px-3 py-2 text-sm text-emerald-50 outline-none ring-emerald-400/50 placeholder:text-emerald-200/60 focus:border-emerald-400/80 focus:ring-2"
              placeholder="Example: Yoga classes will run on a special extended schedule this week due to the festival season…"
            />
            <button
              type="button"
              onClick={() => setMessage("")}
              className="mt-2 inline-flex items-center rounded-full border border-emerald-500/40 bg-black/40 px-3 py-1.5 text-[11px] font-medium text-emerald-100 transition hover:bg-emerald-500/20"
            >
              Clear banner
            </button>
          </div>
          <div className="rounded-2xl border border-emerald-500/30 bg-black/40 p-3 text-xs text-emerald-50/90">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-200">
              How this appears
            </p>
            <ul className="mt-2 space-y-1 text-[11px]">
              <li>• Shown as a banner on the main site above the quick-view calendar.</li>
              <li>• Use it for holiday timings, special events or urgent updates.</li>
              <li>• Clearing the text will hide the banner for visitors.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


