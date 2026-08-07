"use client";

import { Award, Map, Target } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfileContent } from "@/hooks/use-profile-content";
import { LearningTimeline } from "@/features/learning/learning-timeline";
import type { RoadmapStatus } from "@/types/content";

const roadmapStatusMeta: Record<
  RoadmapStatus,
  { label: string; variant: "default" | "secondary" | "outline" }
> = {
  "in-progress": { label: "In Progress", variant: "default" },
  planned: { label: "Planned", variant: "secondary" },
  done: { label: "Done", variant: "outline" },
};

export function LearningSection() {
  const { certifications, roadmap } = useProfileContent();

  return (
    <section
      aria-labelledby="learning-heading"
      id="learning"
      className="mx-auto w-full max-w-5xl scroll-mt-16 px-4 py-16 sm:py-24"
    >
      <SectionHeading
        eyebrow="Learning Journey"
        title="Always learning, always improving"
        description="A record of courses, books, practice, and the roadmap ahead."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <h3 className="mb-6 flex items-center gap-2 text-sm font-medium">
            <Target className="size-4 text-muted-foreground" />
            Recent learning
          </h3>
          <LearningTimeline />
        </div>

        <div className="flex flex-col gap-10">
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-medium">
              <Award className="size-4 text-muted-foreground" />
              Certifications
            </h3>
            <ul className="flex flex-col gap-3">
              {certifications.map((cert) => (
                <li key={cert.name}>
                  <Card className="gap-1 py-4">
                    <CardHeader className="gap-0.5 px-4 py-0">
                      <CardTitle asChild className="text-sm font-medium">
                        <h4>{cert.name}</h4>
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {cert.issuer} · {cert.year}
                      </p>
                    </CardHeader>
                  </Card>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-medium">
              <Map className="size-4 text-muted-foreground" />
              Roadmap
            </h3>
            <ul className="flex flex-col gap-3">
              {roadmap.map((item) => {
                const status = roadmapStatusMeta[item.status];

                return (
                  <li
                    key={item.topic}
                    className="flex items-start justify-between gap-3 rounded-lg border border-border bg-card p-3"
                  >
                    <div>
                      <p className="text-sm font-medium">{item.topic}</p>
                      {item.note && (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {item.note}
                        </p>
                      )}
                    </div>
                    <Badge variant={status.variant} className="shrink-0">
                      {status.label}
                    </Badge>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
