import { profileContent } from "@/lib/content";
import type { ProfileContent } from "@/types/content";

export const STORAGE_KEY = "github-profile-content";

export function loadContent(): ProfileContent {
  if (typeof window === "undefined") return profileContent;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return profileContent;
    const parsed = JSON.parse(raw) as Partial<ProfileContent>;
    return { ...profileContent, ...parsed };
  } catch {
    return profileContent;
  }
}

export function saveContent(content: ProfileContent) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

export function resetContent() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
