"use client";

import { useState, useEffect } from "react";

const SCROLL_THRESHOLD = 120;

export function useScrollPosition(): number {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll(); // initial
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
}

export function useNavbarScrolled(): boolean {
  const scrollY = useScrollPosition();
  return scrollY > SCROLL_THRESHOLD;
}
