export type ClassType =
  | "spin"
  | "hiit"
  | "yoga"
  | "strength"
  | "recovery"
  | "boxing";

export interface ClassEvent {
  id: string;
  title: string;
  type: ClassType;
  start: Date;
  end: Date;
  location: string;
  instructor?: string;
}

const LOCATIONS = ["Sector 76", "Sector 133", "Mayur Vihar"] as const;

function addDays(d: Date, days: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + days);
  return out;
}

function setTime(d: Date, h: number, m: number): Date {
  const out = new Date(d);
  out.setHours(h, m, 0, 0);
  return out;
}

/** Generate sample class events for a given week (for demo). */
export function getSampleClassesForWeek(weekStart: Date): ClassEvent[] {
  const base = new Date(weekStart);
  base.setHours(0, 0, 0, 0);
  const events: ClassEvent[] = [];
  const types: { type: ClassType; title: string; duration: number }[] = [
    { type: "spin", title: "Spin", duration: 45 },
    { type: "hiit", title: "HIIT", duration: 40 },
    { type: "yoga", title: "Yoga", duration: 60 },
    { type: "strength", title: "Strength", duration: 50 },
    { type: "recovery", title: "Recovery", duration: 45 },
    { type: "boxing", title: "Boxing", duration: 50 },
  ];
  let id = 0;
  for (let d = 0; d < 7; d++) {
    const day = addDays(base, d);
    const dayOfWeek = day.getDay();
    if (dayOfWeek === 0) continue;
    const slots = [
      { h: 6, m: 0, typeIdx: 0 },
      { h: 7, m: 15, typeIdx: 1 },
      { h: 9, m: 0, typeIdx: 2 },
      { h: 12, m: 0, typeIdx: 3 },
      { h: 17, m: 30, typeIdx: 4 },
      { h: 18, m: 30, typeIdx: 5 },
    ];
    for (const slot of slots) {
      const start = setTime(new Date(day), slot.h, slot.m);
      const end = new Date(start.getTime() + types[slot.typeIdx].duration * 60 * 1000);
      events.push({
        id: `ev-${++id}`,
        title: types[slot.typeIdx].title,
        type: types[slot.typeIdx].type,
        start,
        end,
        location: LOCATIONS[d % 3],
        instructor: "Coach",
      });
    }
  }
  return events;
}

export function getClassColor(type: ClassType): string {
  const colors: Record<ClassType, string> = {
    spin: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    hiit: "bg-rose-500/20 text-rose-400 border-rose-500/40",
    yoga: "bg-violet-500/20 text-violet-400 border-violet-500/40",
    strength: "bg-fitvilla-cyan/20 text-fitvilla-cyan border-fitvilla-cyan/40",
    recovery: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    boxing: "bg-orange-500/20 text-orange-400 border-orange-500/40",
  };
  return colors[type] ?? "bg-white/10 text-white border-white/20";
}
