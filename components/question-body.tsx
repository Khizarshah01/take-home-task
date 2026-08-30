"use client";

import { HeartPulse } from "lucide-react";
import {
  CONDITIONS,
  CONDITIONS_NONE,
  DURATION,
  FAMILY,
  FAMILY_NONE,
  MENSTRUAL,
  NOT_APPLICABLE,
  PATTERNS,
  PERIODS_GATE,
  PREGNANCY,
  SAMPLE_TYPES,
  TRIGGERS,
} from "@/lib/options";
import type { FormState } from "@/lib/types";
import { ChoiceGrid } from "./choice-grid";
import { HabitsForm } from "./habits-form";
import { ProcedureRows, ProductRows } from "./treatment-rows";
import { YesNo } from "./yes-no";

export function QuestionBody({
  question,
  age,
  onAgeChange,
  data,
  onChange,
  hasPCOS,
  showFemaleHealth,
  periodsMatter,
  onPeriodsMatter,
  skipFemaleQuestions,
}: {
  question: number;
  age: string;
  onAgeChange: (value: string) => void;
  data: FormState;
  onChange: (patch: Partial<FormState>) => void;
  hasPCOS: boolean;
  showFemaleHealth: boolean;
  periodsMatter: boolean | null;
  onPeriodsMatter: (value: boolean) => void;
  skipFemaleQuestions: () => void;
}) {
  if (question === 0) {
    return (
      <label className="age-input">
        <input
          autoFocus
          type="number"
          min="1"
          max="99"
          inputMode="numeric"
          value={age}
          onChange={(event) => onAgeChange(event.target.value.slice(0, 2))}
          placeholder="25"
        />
        <span>years old</span>
      </label>
    );
  }

  if (question === 1) {
    return (
      <ChoiceGrid
        options={DURATION}
        value={data.duration}
        onChange={(value) => onChange({ duration: value as string })}
      />
    );
  }

  if (question === 2) {
    return (
      <ChoiceGrid
        options={FAMILY}
        value={data.family_history}
        multi
        noneValue={FAMILY_NONE}
        onChange={(value) => onChange({ family_history: value as string[] })}
      />
    );
  }

  if (question === 3) {
    return (
      <ChoiceGrid
        options={PATTERNS}
        value={data.pattern}
        multi
        onChange={(value) => onChange({ pattern: value as string[] })}
      />
    );
  }

  if (question === 4) {
    return (
      <ChoiceGrid
        options={CONDITIONS}
        value={data.diagnosed_conditions}
        multi
        noneValue={CONDITIONS_NONE}
        onChange={(value) =>
          onChange({ diagnosed_conditions: value as string[] })
        }
      />
    );
  }

  if (question === 5 && !hasPCOS && periodsMatter === null) {
    return (
      <ChoiceGrid
        options={PERIODS_GATE}
        value={undefined}
        onChange={(value) => {
          if (value === "yes") {
            onPeriodsMatter(true);
            return;
          }
          onPeriodsMatter(false);
          onChange({
            menstrual_cycle: NOT_APPLICABLE,
            pregnancy_related: NOT_APPLICABLE,
          });
          skipFemaleQuestions();
        }}
      />
    );
  }

  if (question === 5 && showFemaleHealth) {
    return (
      <ChoiceGrid
        options={MENSTRUAL}
        value={data.menstrual_cycle}
        onChange={(value) => onChange({ menstrual_cycle: value as string })}
      />
    );
  }

  if (question === 6 && showFemaleHealth) {
    return (
      <ChoiceGrid
        options={PREGNANCY}
        value={data.pregnancy_related}
        onChange={(value) => onChange({ pregnancy_related: value as string })}
      />
    );
  }

  if (question === 7) {
    return (
      <YesNo
        value={data.adult_acne_oily_skin}
        onChange={(value) => onChange({ adult_acne_oily_skin: value })}
      />
    );
  }

  if (question === 8) {
    return (
      <YesNo
        value={data.excess_body_facial_hair}
        onChange={(value) => onChange({ excess_body_facial_hair: value })}
      />
    );
  }

  if (question === 9) {
    return (
      <>
        <ChoiceGrid
          options={TRIGGERS}
          value={data.past_6_months}
          multi
          onChange={(value) =>
            onChange({
              past_6_months: value as string[],
              no_recent_triggers: false,
            })
          }
        />
        <button
          type="button"
          onClick={() =>
            onChange({ past_6_months: [], no_recent_triggers: true })
          }
          className={`none-button ${data.no_recent_triggers ? "active" : ""}`}
        >
          None of these
        </button>
      </>
    );
  }

  if (question === 10) {
    return <HabitsForm data={data} onChange={onChange} />;
  }

  if (question === 11) {
    return (
      <ProductRows
        products={data.products ?? []}
        onChange={(products) => onChange({ products })}
      />
    );
  }

  if (question === 12) {
    return (
      <ProcedureRows
        procedures={data.procedures ?? []}
        onChange={(procedures) => onChange({ procedures })}
      />
    );
  }

  if (question === 13) {
    const inferred = data.products?.some((p) => p.used && p.side_effects) || false;
    
    return (
      <>
        {!inferred && (
          <YesNo
            value={data.past_treatment_side_effects}
            onChange={(value) =>
              onChange({
                past_treatment_side_effects: value,
                describe: value ? data.describe : "",
              })
            }
          />
        )}
        {data.past_treatment_side_effects && (
          <label className="text-field" style={{ marginTop: inferred ? "0" : undefined }}>
            <span>
              {inferred 
                ? "We noticed you had side effects from your past treatments. Tell us a little more." 
                : "Tell us a little more"}
            </span>
            <textarea
              autoFocus
              value={data.describe ?? ""}
              onChange={(event) => onChange({ describe: event.target.value })}
              placeholder="For example, itching after a topical treatment"
            />
          </label>
        )}
      </>
    );
  }

  if (question === 14) {
    return (
      <ChoiceGrid
        options={SAMPLE_TYPES}
        value={data.sample_type}
        onChange={(value) => onChange({ sample_type: value as string })}
      />
    );
  }

  if (question === 15) {
    return (
      <>
        <div className="consent">
          <HeartPulse size={22} />
          <p>
            I understand that my sample will be used for genetic analysis
            related to hair and scalp health.
          </p>
        </div>
        <YesNo
          value={data.consent}
          onChange={(value) => onChange({ consent: value })}
        />
      </>
    );
  }

  return null;
}
