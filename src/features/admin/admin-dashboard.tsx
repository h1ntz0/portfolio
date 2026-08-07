"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Download,
  RotateCcw,
  Save,
  Upload,
} from "lucide-react";
import Link from "next/link";

import { ListEditor } from "@/features/admin/list-editor";
import { TextAreaField, TextField } from "@/features/admin/field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { restoreDefaultContent, updateContent, useProfileContent } from "@/hooks/use-profile-content";
import { loadContent } from "@/lib/content-store";
import type { ProfileContent, Project, RoadmapItem } from "@/types/content";

const projectCategories = ["web", "automation", "ai", "tool", "open-source"];
const learningTypes = ["course", "book", "practice", "project"];
const roadmapStatuses = ["planned", "in-progress", "done"];

const socialIconsList = ["GitHub", "LinkedIn", "Instagram", "Discord", "Email"];

export function AdminDashboard() {
  const content = useProfileContent();
  const [draft, setDraft] = useState<ProfileContent>(content);
  const [saved, setSaved] = useState(false);

  const setDraftSection = <K extends keyof ProfileContent>(
    key: K,
    value: ProfileContent[K]
  ) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    updateContent(draft);
    setSaved(true);
  };

  const handleReset = () => {
    restoreDefaultContent();
    setDraft(loadContent());
    setSaved(false);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "profile-content.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as ProfileContent;
        setDraft({ ...content, ...parsed });
        setSaved(false);
      } catch {
        window.alert("Could not parse the selected JSON file.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  const updateList = <K extends keyof ProfileContent>(
    key: K,
    items: unknown[]
  ) => {
    setDraftSection(key, items as ProfileContent[K]);
  };

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon-sm" asChild>
            <Link href="/" aria-label="Back to home">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Edit content — changes are stored in this browser and applied
              instantly.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            className="relative overflow-hidden"
          >
            <Upload className="size-4" />
            Import
            <input
              type="file"
              accept="application/json"
              onChange={handleImport}
              className="absolute inset-0 cursor-pointer opacity-0"
              aria-label="Import content from JSON"
            />
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="size-4" />
            Export
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="size-4" />
            Reset
          </Button>
          <Button onClick={handleSave}>
            <Save className="size-4" />
            {saved ? "Saved!" : "Save changes"}
          </Button>
        </div>
      </div>

      {saved && (
        <p
          role="status"
          className="mt-4 rounded-lg border border-border bg-muted/50 px-4 py-2 text-sm"
        >
          Changes saved. The public site will reflect them after you visit it.
        </p>
      )}

      <div className="mt-8 flex flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle asChild>
              <h2 className="text-base">Profile</h2>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              id="admin-name"
              label="Name"
              value={draft.name}
              onChange={(value) => setDraftSection("name", value)}
            />
            <TextField
              id="admin-role"
              label="Role"
              value={draft.role}
              onChange={(value) => setDraftSection("role", value)}
            />
            <TextAreaField
              id="admin-headline"
              label="Hero headline"
              value={draft.headline}
              onChange={(value) => setDraftSection("headline", value)}
              className="sm:col-span-2"
            />
            <TextAreaField
              id="admin-status"
              label="Current status"
              value={draft.status}
              onChange={(value) => setDraftSection("status", value)}
              className="sm:col-span-2"
            />
            <TextAreaField
              id="admin-quote"
              label="Favorite quote"
              value={draft.quote}
              onChange={(value) => setDraftSection("quote", value)}
              className="sm:col-span-2"
            />
            <TextAreaField
              id="admin-bio"
              label="Bio (one paragraph per line)"
              value={draft.bio.join("\n")}
              onChange={(value) =>
                setDraftSection(
                  "bio",
                  value
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean)
                )
              }
              rows={6}
              className="sm:col-span-2"
            />
            <TextField
              id="admin-values"
              label="Values (comma-separated)"
              value={draft.values.join(", ")}
              onChange={(value) =>
                setDraftSection(
                  "values",
                  value
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean)
                )
              }
              className="sm:col-span-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle asChild>
              <h2 className="text-base">Social links</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ListEditor
              items={draft.socials}
              onChange={(items) => updateList("socials", items)}
              createItem={() => ({ label: "GitHub", href: "" })}
              addLabel="Add social link"
              fields={[
                {
                  key: "label",
                  label: "Label",
                  type: "select",
                  options: socialIconsList,
                },
                { key: "href", label: "URL", placeholder: "https://..." },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle asChild>
              <h2 className="text-base">Education</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ListEditor
              items={draft.education}
              onChange={(items) => updateList("education", items)}
              createItem={() => ({
                degree: "",
                school: "",
                period: "",
                description: "",
              })}
              addLabel="Add education"
              fields={[
                { key: "degree", label: "Degree" },
                { key: "school", label: "School" },
                { key: "period", label: "Period", placeholder: "2016 – 2020" },
                { key: "description", label: "Description", type: "textarea", className: "sm:col-span-2" },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle asChild>
              <h2 className="text-base">Experience</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ListEditor
              items={draft.experience}
              onChange={(items) => updateList("experience", items)}
              createItem={() => ({
                role: "",
                company: "",
                period: "",
                description: "",
                highlights: [],
              })}
              addLabel="Add experience"
              fields={[
                { key: "role", label: "Role" },
                { key: "company", label: "Company" },
                { key: "period", label: "Period" },
                { key: "description", label: "Description", type: "textarea", className: "sm:col-span-2" },
                { key: "highlights", label: "Highlights (comma-separated)", type: "tags", className: "sm:col-span-2" },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle asChild>
              <h2 className="text-base">Skills</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ListEditor
              items={draft.skills}
              onChange={(items) => updateList("skills", items)}
              createItem={() => ({ category: "", skills: [] })}
              addLabel="Add skill group"
              fields={[
                { key: "category", label: "Category", placeholder: "Frontend" },
                { key: "skills", label: "Skills (comma-separated)", type: "tags" },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle asChild>
              <h2 className="text-base">Projects</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ListEditor
              items={draft.projects}
              onChange={(items) => updateList("projects", items)}
              createItem={(): Project => ({
                title: "",
                description: "",
                category: "web",
                technologies: [],
                github: "",
                demo: "",
                featured: false,
              })}
              addLabel="Add project"
              fields={[
                { key: "title", label: "Title" },
                { key: "category", label: "Category", type: "select", options: projectCategories },
                { key: "description", label: "Description", type: "textarea", className: "sm:col-span-2" },
                { key: "technologies", label: "Technologies", type: "tags", className: "sm:col-span-2" },
                { key: "github", label: "GitHub URL", placeholder: "https://github.com/..." },
                { key: "demo", label: "Live demo URL", placeholder: "https://..." },
                { key: "featured", label: "Featured", type: "checkbox" },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle asChild>
              <h2 className="text-base">Learning</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ListEditor
              items={draft.learning}
              onChange={(items) => updateList("learning", items)}
              createItem={() => ({
                title: "",
                type: "course",
                date: "",
                description: "",
              })}
              addLabel="Add learning item"
              fields={[
                { key: "title", label: "Title" },
                { key: "type", label: "Type", type: "select", options: learningTypes },
                { key: "date", label: "Date", placeholder: "2025" },
                { key: "description", label: "Description", type: "textarea", className: "sm:col-span-2" },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle asChild>
              <h2 className="text-base">Certifications</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ListEditor
              items={draft.certifications}
              onChange={(items) => updateList("certifications", items)}
              createItem={() => ({ name: "", issuer: "", year: "", credentialUrl: "" })}
              addLabel="Add certification"
              fields={[
                { key: "name", label: "Name" },
                { key: "issuer", label: "Issuer" },
                { key: "year", label: "Year" },
                { key: "credentialUrl", label: "Credential URL", placeholder: "https://..." },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle asChild>
              <h2 className="text-base">Roadmap</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ListEditor
              items={draft.roadmap}
              onChange={(items) => updateList("roadmap", items)}
              createItem={(): RoadmapItem => ({ topic: "", status: "planned", note: "" })}
              addLabel="Add roadmap item"
              fields={[
                { key: "topic", label: "Topic", className: "sm:col-span-2" },
                { key: "status", label: "Status", type: "select", options: roadmapStatuses },
                { key: "note", label: "Note", type: "textarea", className: "sm:col-span-2" },
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
