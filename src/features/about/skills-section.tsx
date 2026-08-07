"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfileContent } from "@/hooks/use-profile-content";

export function SkillsSection() {
  const { skills } = useProfileContent();

  return (
    <section
      aria-labelledby="skills-heading"
      className="mx-auto w-full max-w-5xl scroll-mt-16 px-4 pb-16 sm:pb-24"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => (
          <Card key={group.category} className="gap-3 py-5">
            <CardHeader className="px-5 py-0">
              <CardTitle className="text-sm font-medium">
                {group.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 py-0">
              <ul className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <Badge variant="outline">{skill}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}