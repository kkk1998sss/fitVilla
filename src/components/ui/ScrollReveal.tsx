"use client";

import { useInView } from "@/hooks/useInView";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3;
}

export function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  const [inView, ref] = useInView();

  const delayClass = delay === 0 ? "" : delay === 1 ? "delay-100" : delay === 2 ? "delay-200" : "delay-300";

  return (
    <div
      ref={ref}
      className={`[contain:layout] transition-[transform,opacity] duration-700 ease-out ${delayClass} ${
        inView
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0 will-change-[transform,opacity]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
