"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type ListFieldType =
  | "text"
  | "textarea"
  | "checkbox"
  | "tags"
  | "select";

export interface ListFieldConfig {
  key: string;
  label: string;
  type?: ListFieldType;
  options?: string[];
  placeholder?: string;
  className?: string;
}

interface ListEditorProps<T> {
  items: T[];
  fields: ListFieldConfig[];
  onChange: (items: T[]) => void;
  createItem: () => T;
  addLabel: string;
}

function stringValue(value: unknown): string {
  if (Array.isArray(value)) return value.join(", ");
  if (value === undefined || value === null) return "";
  return String(value);
}

export function ListEditor<T extends object>({
  items,
  fields,
  onChange,
  createItem,
  addLabel,
}: ListEditorProps<T>) {
  const updateItem = (index: number, key: string, value: unknown) => {
    onChange(
      items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item
      )
    );
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const renderField = (
    field: ListFieldConfig,
    item: T,
    index: number
  ): React.ReactNode => {
    const value = (item as Record<string, unknown>)[field.key];

    switch (field.type) {
      case "textarea":
        return (
          <div className={field.className}>
            <Label>{field.label}</Label>
            <Textarea
              value={stringValue(value)}
              onChange={(event) =>
                updateItem(index, field.key, event.target.value)
              }
              placeholder={field.placeholder}
              rows={3}
            />
          </div>
        );
      case "checkbox":
        return (
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={Boolean(value)}
              onChange={(event) =>
                updateItem(index, field.key, event.target.checked)
              }
              className="size-4 rounded border-border accent-foreground"
            />
            {field.label}
          </label>
        );
      case "tags":
        return (
          <div className={field.className}>
            <Label>{field.label}</Label>
            <Input
              value={stringValue(value)}
              onChange={(event) =>
                updateItem(
                  index,
                  field.key,
                  event.target.value
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean)
                )
              }
              placeholder={field.placeholder ?? "Comma-separated values"}
            />
          </div>
        );
      case "select":
        return (
          <div className={field.className}>
            <Label>{field.label}</Label>
            <select
              value={stringValue(value)}
              onChange={(event) => updateItem(index, field.key, event.target.value)}
              className="border-input bg-transparent flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs outline-none"
            >
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      default:
        return (
          <div className={field.className}>
            <Label>{field.label}</Label>
            <Input
              value={stringValue(value)}
              onChange={(event) => updateItem(index, field.key, event.target.value)}
              placeholder={field.placeholder}
            />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-3 rounded-lg border border-border bg-background p-4"
        >
          <div className="flex items-center justify-between">
            <Badge variant="secondary">Item {index + 1}</Badge>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Move item up"
                disabled={index === 0}
                onClick={() => moveItem(index, -1)}
              >
                <ArrowUp className="size-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Move item down"
                disabled={index === items.length - 1}
                onClick={() => moveItem(index, 1)}
              >
                <ArrowDown className="size-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Remove item"
                onClick={() => removeItem(index)}
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.key} className={field.className ?? undefined}>
                {renderField(field, item, index)}
              </div>
            ))}
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => onChange([...items, createItem()])}
      >
        <Plus className="size-4" />
        {addLabel}
      </Button>
    </div>
  );
}
