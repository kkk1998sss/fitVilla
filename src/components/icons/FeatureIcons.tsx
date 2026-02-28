/**
 * Gym-related icons for feature cards. All 24x24, stroke-based, fitvilla styling.
 */
const iconClass = "h-8 w-8 flex-shrink-0 transition-colors duration-300 group-hover:text-fitvilla-cyan";

export function IconDumbbell() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 8h3v8H4zM17 8h3v8h-3zM7 11h10v2H7z" />
      <circle cx="5.5" cy="12" r="2" />
      <circle cx="18.5" cy="12" r="2" />
    </svg>
  );
}

export function IconCoach() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6M12 14v4M10 18h4" />
    </svg>
  );
}

export function IconZones() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
    </svg>
  );
}

export function IconBCA() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8" r="3" />
      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <path d="M9 12h6M12 9v6" />
    </svg>
  );
}

export function IconRecovery() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 18 Q7 14 10 12 Q12 10 14 12 Q17 14 16 18" />
      <path d="M12 14 Q11 11 14 9 Q16 7 18 9 Q20 11 19 14" />
      <path d="M4 14 Q3 11 6 9 Q8 7 10 9 Q12 11 11 14" />
    </svg>
  );
}

export function IconLocker() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="1" />
      <path d="M8 11V7a4 4 0 1 1 8 0v4" />
      <circle cx="12" cy="16" r="1.5" />
    </svg>
  );
}

export function IconCafe() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h14v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8z" />
      <path d="M6 2v4M10 2v4M14 2v4" />
    </svg>
  );
}

export function IconProtein() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 2h8v20H8z" />
      <path d="M8 6h8M8 10h8M8 14h8M8 18h5" />
      <path d="M12 2v4M12 18v4" />
    </svg>
  );
}

export function IconComfort() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <path d="M12 20v-4M10 16h4" />
      <path d="M12 8c-1.5 2-2 4-2 6a2 2 0 0 0 4 0c0-2-.5-4-2-6z" />
    </svg>
  );
}

const featureIcons: Record<string, React.ComponentType> = {
  technogym: IconDumbbell,
  coaches: IconCoach,
  zones: IconZones,
  bca: IconBCA,
  recovery: IconRecovery,
  lockers: IconLocker,
  cafe: IconCafe,
  protein: IconProtein,
  comfort: IconComfort,
};

export function FeatureIcon({ featureId }: { featureId: string }) {
  const Icon = featureIcons[featureId];
  if (!Icon) return null;
  return <Icon />;
}
