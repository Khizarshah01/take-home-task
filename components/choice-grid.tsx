"use client";

import { Check } from "lucide-react";
import type { Choice } from "@/lib/types";

export function ChoiceGrid({
  options,
  value,
  onChange,
  multi = false,
  noneValue,
}: {
  options: Choice[];
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
  multi?: boolean;
  noneValue?: string;
}) {
  const selected = Array.isArray(value) ? value : value ? [value] : [];

  const toggle = (item: string) => {
    if (!multi) {
      onChange(item);
      return;
    }
    if (item === noneValue) {
      onChange([item]);
      return;
    }
    const withoutNone = selected.filter((entry) => entry !== noneValue);
    onChange(
      withoutNone.includes(item)
        ? withoutNone.filter((entry) => entry !== item)
        : [...withoutNone, item],
    );
  };

  return (
    <div className="choice-grid">
      {options.map((option) => {
        const active = selected.includes(option.value);
        return (
          <button
            type="button"
            key={option.value}
            aria-pressed={active}
            onClick={() => toggle(option.value)}
            className={`choice ${active ? "choice-active" : ""}`}
          >
            <span>{option.label}</span>
            {active && <Check size={18} strokeWidth={2.5} />}
          </button>
        );
      })}
    </div>
  );
}
