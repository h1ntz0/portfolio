"use client";

import { useSyncExternalStore } from "react";

import { AdminDashboard } from "@/features/admin/admin-dashboard";
import { LoginForm } from "@/features/admin/login-form";
import {
  getAuthSnapshot,
  subscribeAuth,
} from "@/lib/admin-auth";

export default function AdminPage() {
  const authenticated = useSyncExternalStore(
    subscribeAuth,
    getAuthSnapshot,
    () => false
  );

  if (!authenticated) {
    return <LoginForm />;
  }

  return <AdminDashboard />;
}
