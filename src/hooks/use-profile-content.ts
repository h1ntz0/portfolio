"use client";

import { useSyncExternalStore } from "react";

import { loadContent, saveContent, resetContent, STORAGE_KEY } from "@/lib/content-store";
import type { ProfileContent } from "@/types/content";

let cached: ProfileContent | null = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function invalidate() {
  cached = null;
  emit();
}

function getSnapshot(): ProfileContent {
  if (cached === null) cached = loadContent();
  return cached;
}

function subscribe(callback: () => void) {
  listeners.add(callback);

  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) invalidate();
  };
  const onContentUpdated = () => invalidate();

  window.addEventListener("storage", onStorage);
  window.addEventListener("content-updated", onContentUpdated);

  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("content-updated", onContentUpdated);
  };
}

export function useProfileContent(): ProfileContent {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function updateContent(content: ProfileContent) {
  saveContent(content);
  window.dispatchEvent(new Event("content-updated"));
}

export function restoreDefaultContent() {
  resetContent();
  window.dispatchEvent(new Event("content-updated"));
}
