"use client";

import { GraduationCap, Quote } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { useProfileContent } from "@/hooks/use-profile-content";

export function AboutSection() {
  const { bio, quote, values, education } = useProfileContent();

  return (
    <section
      aria-labelledby="about-heading"
      id="about"
      className="mx-auto w-full max-w-5xl scroll-mt-16 px-4 py-16 sm:py-24"
    >
      <SectionHeading
        eyebrow="About Me"
        title="Quality-first software engineering"
        description="A short introduction to who I am, what I believe in, and how I work."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          {bio.map((paragraph) => (
            <p key={paragraph} className="text-pretty text-muted-foreground">
              {paragraph}
            </p>
          ))}

          <blockquote className="mt-2 border-l-2 border-border pl-4">
            <Quote className="mb-2 size-4 text-muted-foreground" />
            <p className="text-sm text-pretty italic">{quote}</p>
          </blockquote>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h3 className="mb-3 text-sm font-medium">What I value</h3>
            <ul className="flex flex-wrap gap-2">
              {values.map((value) => (
                <li key={value}>
                  <Badge variant="secondary">{value}</Badge>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium">Education</h3>
            <ul className="flex flex-col gap-4">
              {education.map((item) => (
                <li
                  key={item.degree}
                  className="rounded-lg border border-border bg-card p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <GraduationCap className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{item.degree}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.school}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-pretty text-muted-foreground">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
