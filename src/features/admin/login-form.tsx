"use client";

import { useState } from "react";
import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInAdmin } from "@/lib/admin-auth";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "admin123";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password === ADMIN_PASSWORD) {
      signInAdmin();
    } else {
      setError("Invalid password. Please try again.");
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6 px-4 py-24">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex size-12 items-center justify-center rounded-full border border-border bg-muted">
          <Lock className="size-5 text-muted-foreground" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Admin Login</h1>
        <p className="text-sm text-muted-foreground">
          Enter the admin password to manage site content.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="admin-password">Password</Label>
          <Input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError(null);
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "admin-password-error" : undefined}
            autoFocus
          />
          {error && (
            <p id="admin-password-error" role="alert" className="text-xs text-destructive">
              {error}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
    </div>
  );
}
