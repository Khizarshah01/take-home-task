import type { Choice, FormState } from "./types";

export const choices = (values: string[]): Choice[] =>
  values.map((value) => ({ label: value, value }));

export const FAMILY: Choice[] = choices([
  "Father had hair loss",
  "Mother had hair loss",
  "Siblings with thinning or baldness",
  "No known family history",
]);

export const PATTERNS: Choice[] = choices([
  "Receding hairline",
  "Thinning at crown",
  "Widening part line",
  "Diffuse thinning",
  "Patchy loss",
  "Sudden excessive shedding",
]);

export const CONDITIONS: Choice[] = choices([
  "PCOS/PCOD",
  "Thyroid disorder",
  "Diabetes",
  "Autoimmune disease",
  "Anemia",
  "None",
]);

export const DURATION: Choice[] = [
  { label: "Less than 6 months", value: "Less than 6 months" },
  { label: "6-12 months", value: "6-12 months" },
  { label: "Over a year", value: "Over a year" },
];

export const TRIGGERS: Choice[] = [
  {
    label: "Crash dieting or major weight loss",
    value: "Crash dieting or major weight loss",
  },
  {
    label: "High stress or emotional trauma",
    value: "High stress or emotional trauma",
  },
  {
    label: "Fever with illness (COVID, dengue, typhoid)",
    value: "Fever with illness (COVID, Dengue, Typhoid)",
  },
  { label: "Recent surgery", value: "Recent surgery" },
  {
    label: "Change in location, water or air quality",
    value: "Change in location/water/air quality",
  },
];

export const MENSTRUAL: Choice[] = choices([
  "Regular",
  "Irregular",
  "Menopausal",
]);

export const PREGNANCY: Choice[] = [
  { label: "Currently pregnant", value: "Currently pregnant" },
  { label: "Postpartum (under 1 year)", value: "Postpartum <1 year" },
  { label: "Not applicable", value: "Not applicable" },
];

export const PERIODS_GATE: Choice[] = [
  { label: "Yes", value: "yes" },
  { label: "Does not apply", value: "no" },
];

export const SMOKING_SEVERITY: Choice[] = [
  { label: "Under 5 a day", value: "Mild <5/day" },
  { label: "5-10 a day", value: "Moderate 5-10/day" },
  { label: "Over 10 a day", value: "Severe >10/day" },
];

export const WASH_FREQUENCY: Choice[] = [
  { label: "Daily", value: "Daily" },
  { label: "Alternate days", value: "Alternate Days" },
  { label: "Weekly", value: "Weekly" },
];

export const PRODUCT_DURATION: Choice[] = [
  { label: "Under 3 months", value: "<3mo" },
  { label: "3-6 months", value: "3-6mo" },
  { label: "Over 6 months", value: ">6mo" },
];

export const PROCEDURE_SESSIONS: Choice[] = [
  { label: "1-3", value: "1-3" },
  { label: "4-6", value: "4-6" },
  { label: "Over 6", value: ">6" },
];

export const SAMPLE_TYPES: Choice[] = [
  { label: "Saliva", value: "Saliva" },
  { label: "Blood", value: "Blood" },
  { label: "Either is fine", value: "Either" },
];

export const PRODUCT_NAMES = [
  "OTC/Medicated Shampoos",
  "Hair Oils/Serums",
  "Topical Minoxidil",
  "Oral Minoxidil",
  "Supplements",
] as const;

export const PROCEDURE_NAMES = [
  "PRP/GFC/iPRF",
  "Stem Cells/Exosomes",
  "Hair Transplant",
  "Other",
] as const;

export const PCOS = "PCOS/PCOD";
export const FAMILY_NONE = "No known family history";
export const CONDITIONS_NONE = "None";
export const NOT_APPLICABLE = "Not applicable";

export const SECTIONS = [
  "A - Personal & Family Hair Loss History",
  "B - Hormonal & Health Influences",
  "C - Lifestyle & Environmental Triggers",
  "D - Current Hair Care & Treatments",
  "E - Sample Collection & Consent",
] as const;

export function sectionForQuestion(question: number) {
  if (question < 4) return SECTIONS[0];
  if (question < 9) return SECTIONS[1];
  if (question < 11) return SECTIONS[2];
  if (question < 14) return SECTIONS[3];
  return SECTIONS[4];
}

export function emptyForm(): FormState {
  return {
    form: "GenoRoot Hair & Scalp Intake",
    family_history: [],
    pattern: [],
    diagnosed_conditions: [],
    past_6_months: [],
    habits: {},
    products: PRODUCT_NAMES.map((product) => ({ product, used: false })),
    procedures: PROCEDURE_NAMES.map((procedure) => ({
      procedure,
      done: false,
    })),
  };
}

export const HABIT_ROWS: Array<{
  label: string;
  key: "smoking" | "alcohol" | "hard_water" | "heating_tools_styling_chemicals" | "salon_treatments";
}> = [
  { label: "Smoking", key: "smoking" },
  { label: "Alcohol", key: "alcohol" },
  { label: "Hard water for hair wash", key: "hard_water" },
  { label: "Heat tools or styling chemicals", key: "heating_tools_styling_chemicals" },
  { label: "Salon treatments (keratin, rebonding, etc.)", key: "salon_treatments" },
];
