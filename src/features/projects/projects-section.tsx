"use client";

import { useState } from "react";
import { ExternalLink, FolderGit } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { GithubIcon } from "@/components/shared/brand-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfileContent } from "@/hooks/use-profile-content";
import type { ProjectCategory } from "@/types/content";

const filters: { value: ProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "automation", label: "Automation" },
  { value: "ai", label: "AI" },
  { value: "tool", label: "Tools" },
  { value: "open-source", label: "Open Source" },
];

export function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const { projects } = useProfileContent();

  const visible =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section
      aria-labelledby="projects-heading"
      id="projects"
      className="mx-auto w-full max-w-5xl scroll-mt-16 px-4 py-16 sm:py-24"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built"
          description="A selection of projects that show how I think, engineer, and test."
        />

        <div
          role="group"
          aria-label="Filter projects by category"
          className="flex flex-wrap gap-1"
        >
          {filters.map((item) => (
            <Button
              key={item.value}
              variant={filter === item.value ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(item.value)}
              aria-pressed={filter === item.value}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <Card
            key={project.title}
            className="gap-4 py-5 transition-shadow hover:shadow-md"
          >
            <CardHeader className="gap-2 px-5 py-0">
              <div className="flex items-center justify-between gap-2">
                <FolderGit className="size-4 text-muted-foreground" />
                {project.featured && <Badge>Featured</Badge>}
              </div>
              <CardTitle asChild className="text-base">
                <h3>{project.title}</h3>
              </CardTitle>
              <p className="text-sm text-pretty text-muted-foreground">
                {project.description}
              </p>
            </CardHeader>

            <CardContent className="flex flex-wrap gap-1.5 px-5 py-0">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </CardContent>

            <CardFooter className="gap-1 px-5 py-0">
              {project.github && (
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubIcon className="size-3.5" />
                    GitHub
                  </a>
                </Button>
              )}
              {project.demo && (
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="size-3.5" />
                    Live Demo
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
