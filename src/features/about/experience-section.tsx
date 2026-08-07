"use client";

import { Check } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { useProfileContent } from "@/hooks/use-profile-content";

export function ExperienceSection() {
  const { experience } = useProfileContent();

  return (
    <section
      aria-labelledby="experience-heading"
      className="mx-auto w-full max-w-5xl scroll-mt-16 px-4 pb-16 sm:pb-24"
    >
      <SectionHeading
        eyebrow="Experience"
        title="My professional journey"
        description="From manual testing to engineering with a quality mindset."
      />

      <ol className="mt-10 flex flex-col gap-8 border-l border-border pl-6">
        {experience.map((item) => (
          <li key={`${item.company}-${item.period}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[31px] size-2.5 rounded-full border border-border bg-background"
            />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h3 className="font-semibold">{item.role}</h3>
                <p className="text-sm text-muted-foreground">{item.company}</p>
              </div>
              <span className="text-xs text-muted-foreground">
                {item.period}
              </span>
            </div>
            <p className="mt-2 text-sm text-pretty text-muted-foreground">
              {item.description}
            </p>
            <ul className="mt-3 flex flex-col gap-1.5">
              {item.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Check className="mt-0.5 size-3.5 shrink-0 text-foreground/60" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}