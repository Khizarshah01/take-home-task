"use client";

import { HABIT_ROWS, SMOKING_SEVERITY, WASH_FREQUENCY } from "@/lib/options";
import type { FormState, Habits } from "@/lib/types";
import { ChoiceGrid } from "./choice-grid";
import { YesNo } from "./yes-no";

export function HabitsForm({
  data,
  onChange,
}: {
  data: FormState;
  onChange: (patch: Partial<FormState>) => void;
}) {
  const habits = data.habits ?? {};
  const set = (patch: Habits) => onChange({ habits: { ...habits, ...patch } });

  return (
    <div className="habit-list">
      {HABIT_ROWS.map(({ label, key }) => (
        <div className="habit-row" key={key}>
          <span>{label}</span>
          <YesNo
            label={label}
            value={habits[key]}
            onChange={(value) => set({ [key]: value })}
          />
          {key === "smoking" && habits.smoking && (
            <ChoiceGrid
              options={SMOKING_SEVERITY}
              value={habits.smoking_severity}
              onChange={(value) => set({ smoking_severity: value as string })}
            />
          )}
          {key === "salon_treatments" && habits.salon_treatments && (
            <input
              className="inline-input"
              value={habits.salon_treatment_detail ?? ""}
              onChange={(event) =>
                set({ salon_treatment_detail: event.target.value })
              }
              placeholder="Which treatment?"
            />
          )}
        </div>
      ))}
      <div className="habit-row frequency">
        <span>Hair wash frequency</span>
        <ChoiceGrid
          options={WASH_FREQUENCY}
          value={habits.hair_wash_frequency}
          onChange={(value) =>
            set({ hair_wash_frequency: value as string })
          }
        />
      </div>
    </div>
  );
}
