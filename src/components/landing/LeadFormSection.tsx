"use client";

import { useState, useEffect } from "react";
import { leadFormHeading, freeTrialCta } from "@/content/site";
import { LOCATION_OPTIONS } from "@/lib/constants";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

interface LeadFormSectionProps {
  id?: string;
  formIdSuffix?: string;
}

export function LeadFormSection({ id, formIdSuffix = "" }: LeadFormSectionProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const suffix = formIdSuffix ? `-${formIdSuffix}` : "";
  const headingId = `lead-form-heading${suffix}`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="scroll-mt-20 border-t border-white/10 bg-black px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-xl">
        <h2
          id={headingId}
          className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          {leadFormHeading}
        </h2>
        {mounted ? (
          <form
            className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-5">
              <Input
                label="Name"
                id={`name${suffix}`}
                type="text"
                placeholder="Your name"
                required
                className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder:text-fitvilla-muted focus:border-fitvilla-cyan focus:outline-none focus:ring-1 focus:ring-fitvilla-cyan"
              />
              <Input
                label="Phone"
                id={`phone${suffix}`}
                type="tel"
                placeholder="Your phone number"
                required
                className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder:text-fitvilla-muted focus:border-fitvilla-cyan focus:outline-none focus:ring-1 focus:ring-fitvilla-cyan"
              />
              <Select
                label="Location"
                id={`location${suffix}`}
                options={LOCATION_OPTIONS}
                required
                className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white focus:border-fitvilla-cyan focus:outline-none focus:ring-1 focus:ring-fitvilla-cyan"
              />
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-fitvilla-cyan py-3.5 font-semibold text-black transition-all hover:bg-fitvilla-glow hover:shadow-[0_0_20px_rgba(45,212,228,0.35)] focus:outline-none focus:ring-2 focus:ring-fitvilla-cyan focus:ring-offset-2 focus:ring-offset-black"
            >
              {freeTrialCta}
            </button>
          </form>
        ) : (
          <div
            className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8"
            style={{ minHeight: 220 }}
            aria-hidden
          />
        )}
      </div>
    </section>
  );
}
