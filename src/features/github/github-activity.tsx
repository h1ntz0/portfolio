"use client";

import { useQuery } from "@tanstack/react-query";
import { Activity, FolderGit, Users } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { GithubIcon } from "@/components/shared/brand-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

interface GitHubUser {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  stargazers_count: number;
  pushed_at: string;
}

const username = siteConfig.githubUsername;

function useGitHubProfile() {
  return useQuery<GitHubUser>({
    queryKey: ["github-user", username],
    queryFn: async (): Promise<GitHubUser> => {
      const response = await fetch(
        `https://api.github.com/users/${username}`,
        { headers: { Accept: "application/vnd.github+json" } }
      );
      if (!response.ok) throw new Error("Failed to fetch GitHub profile");
      const data: GitHubUser = await response.json();
      return data;
    },
    enabled: Boolean(username),
  });
}

function useGitHubRepos() {
  return useQuery<GitHubRepo[]>({
    queryKey: ["github-repos", username],
    queryFn: async (): Promise<GitHubRepo[]> => {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=pushed&per_page=6`,
        { headers: { Accept: "application/vnd.github+json" } }
      );
      if (!response.ok) throw new Error("Failed to fetch repositories");
      const data: GitHubRepo[] = await response.json();
      return data;
    },
    enabled: Boolean(username),
  });
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: typeof Users;
}) {
  return (
    <Card className="gap-2 py-4">
      <CardHeader className="px-4 py-0">
        <CardTitle className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Icon className="size-3.5" />
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-0">
        <p className="text-2xl font-bold tabular-nums">{value}</p>
      </CardContent>
    </Card>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function GitHubActivitySection() {
  const userQuery = useGitHubProfile();
  const reposQuery = useGitHubRepos();
  const repos = reposQuery.data;

  if (!username) return null;

  return (
    <section
      aria-labelledby="github-heading"
      className="mx-auto w-full max-w-5xl scroll-mt-16 px-4 py-16 sm:py-24"
    >
      <SectionHeading
        eyebrow="GitHub Activity"
        title="Live from GitHub"
        description={`Recent activity from @${username}.`}
      />

      <div className="mt-10 flex flex-col gap-6">
        {userQuery.isLoading ? (
          <div
            aria-label="Loading GitHub profile"
            className="grid gap-4 sm:grid-cols-3"
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-24 animate-pulse rounded-xl border border-border bg-muted"
              />
            ))}
          </div>
        ) : userQuery.isError ? (
          <p className="rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
            Could not load GitHub data right now.{" "}
            <a
              className="underline underline-offset-4"
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View profile directly
            </a>
            .
          </p>
        ) : userQuery.data ? (
          <>
            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard
                label="Public repositories"
                value={userQuery.data.public_repos}
                icon={FolderGit}
              />
              <StatCard
                label="Followers"
                value={userQuery.data.followers}
                icon={Users}
              />
              <StatCard
                label="Following"
                value={userQuery.data.following}
                icon={Users}
              />
            </div>

            <div>
              <h3 className="mb-4 flex items-center gap-2 text-sm font-medium">
                <Activity className="size-4 text-muted-foreground" />
                Recently active repositories
              </h3>

              {reposQuery.isLoading ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-24 animate-pulse rounded-xl border border-border bg-muted"
                    />
                  ))}
                </div>
              ) : reposQuery.isError ? (
                <p className="text-sm text-muted-foreground">
                  Could not load repositories.
                </p>
              ) : repos ? (
                <ul className="grid gap-3 sm:grid-cols-2">
                  {repos.map((repo) => (
                    <li key={repo.id}>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-full flex-col gap-2 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/50"
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-2 font-medium">
                            <GithubIcon className="size-3.5 text-muted-foreground" />
                            {repo.name}
                          </span>
                          {repo.language && (
                            <Badge variant="secondary">{repo.language}</Badge>
                          )}
                        </span>
                        <span className="line-clamp-2 text-sm text-muted-foreground">
                          {repo.description ?? "No description"}
                        </span>
                        <span className="mt-auto text-xs text-muted-foreground">
                          Pushed {formatDate(repo.pushed_at)}
                          {repo.stargazers_count > 0 &&
                            ` · ${repo.stargazers_count} stars`}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="flex justify-center">
              <Button variant="outline" asChild>
                <a
                  href={userQuery.data.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon className="size-4" />
                  View full profile
                </a>
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
