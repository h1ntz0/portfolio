"use client";

import { BookOpen, FolderGit, GraduationCap, Wrench } from "lucide-react";

import { useProfileContent } from "@/hooks/use-profile-content";
import type { LearningType } from "@/types/content";

const typeMeta: Record<LearningType, { icon: typeof BookOpen; label: string }> =
  {
    course: { icon: GraduationCap, label: "Course" },
    book: { icon: BookOpen, label: "Book" },
    practice: { icon: Wrench, label: "Practice" },
    project: { icon: FolderGit, label: "Project" },
  };

export function LearningTimeline() {
  const { learning } = useProfileContent();

  return (
    <ol className="flex flex-col gap-8 border-l border-border pl-6">
      {learning.map((item) => {
        const meta = typeMeta[item.type];
        const Icon = meta.icon;

        return (
          <li key={item.title} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[31px] flex size-5 items-center justify-center rounded-full border border-border bg-background"
            >
              <Icon className="size-2.5" />
            </span>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold">{item.title}</h3>
              <span className="text-xs text-muted-foreground">{item.date}</span>
            </div>
            <p className="mt-1 text-xs font-medium text-muted-foreground">
              {meta.label}
            </p>
            <p className="mt-1 text-sm text-pretty text-muted-foreground">
              {item.description}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
