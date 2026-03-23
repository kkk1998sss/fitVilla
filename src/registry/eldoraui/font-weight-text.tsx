"use client";

type FontWeightTextProps = {
  text: string;
  className?: string;
  fontSize?: number;
  minWeight?: number;
  maxWeight?: number;
  animationDuration?: number;
  delayMultiplier?: number;
};

function cn(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function FontWeightText({
  text,
  className = "",
  fontSize = 24,
  minWeight = 400,
  maxWeight = 800,
  animationDuration = 1.8,
  delayMultiplier = 0.06,
}: FontWeightTextProps) {
  const chars = text.split("");

  return (
    <span className={cn("inline-block whitespace-nowrap", className)} aria-label={text}>
      {chars.map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="inline-block"
          style={{
            fontSize: `${fontSize}px`,
            animationName: "fv-font-weight-pulse",
            animationDuration: `${animationDuration}s`,
            animationDelay: `${index * delayMultiplier}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
            fontWeight: minWeight,
            ["--fv-min-weight" as string]: minWeight,
            ["--fv-max-weight" as string]: maxWeight,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

