"use client";

const SESSION_KEY = "github-profile-admin-auth";

export function isAdminAuthenticated() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEY) === "true";
}

const listeners = new Set<() => void>();

export function subscribeAuth(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

export function getAuthSnapshot() {
  return isAdminAuthenticated();
}

export function signInAdmin() {
  sessionStorage.setItem(SESSION_KEY, "true");
  listeners.forEach((listener) => listener());
}
