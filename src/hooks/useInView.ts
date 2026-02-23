"use client";

import { useState, useEffect, useRef } from "react";

const DEFAULT_OPTIONS: IntersectionObserverInit = {
  rootMargin: "0px 0px -60px 0px",
  threshold: 0.1,
};

export function useInView(): [boolean, React.RefObject<HTMLDivElement | null>] {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, DEFAULT_OPTIONS);

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [inView, ref];
}
