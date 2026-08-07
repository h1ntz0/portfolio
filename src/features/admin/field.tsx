"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FieldProps = {
  id: string;
  label: string;
  type?: "text" | "email" | "url" | "number";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function TextField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  className,
}: FieldProps) {
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

type TextAreaFieldProps = Omit<FieldProps, "type"> & { rows?: number };

export function TextAreaField({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  className,
}: TextAreaFieldProps) {
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  );
}
