import { PCOS } from "./options";
import type { FormState } from "./types";

export function hasPcos(data: FormState) {
  return data.diagnosed_conditions?.includes(PCOS) ?? false;
}

export function canContinue(args: {
  question: number;
  age: string;
  data: FormState;
  showFemaleHealth: boolean;
  periodsMatter: boolean | null;
}) {
  const { question, age, data, showFemaleHealth, periodsMatter } = args;
  const habits = data.habits ?? {};

  switch (question) {
    case 0:
      return Number(age) >= 1 && Number(age) <= 100;
    case 1:
      return Boolean(data.duration);
    case 2:
      return Boolean(data.family_history?.length);
    case 3:
      return Boolean(data.pattern?.length);
    case 4:
      return Boolean(data.diagnosed_conditions?.length);
    case 5:
      return showFemaleHealth
        ? Boolean(data.menstrual_cycle)
        : periodsMatter !== null;
    case 6:
      return showFemaleHealth ? Boolean(data.pregnancy_related) : true;
    case 7:
      return data.adult_acne_oily_skin !== undefined;
    case 8:
      return data.excess_body_facial_hair !== undefined;
    case 9:
      return Boolean(data.past_6_months?.length) || data.no_recent_triggers === true;
    case 10:
      return (
        habits.smoking !== undefined &&
        habits.alcohol !== undefined &&
        habits.hard_water !== undefined &&
        Boolean(habits.hair_wash_frequency) &&
        habits.heating_tools_styling_chemicals !== undefined &&
        habits.salon_treatments !== undefined &&
        (!habits.smoking || Boolean(habits.smoking_severity)) &&
        (!habits.salon_treatments || Boolean(habits.salon_treatment_detail?.trim()))
      );
    case 11:
      return (
        data.products?.every(
          (item) =>
            !item.used ||
            (Boolean(item.duration) &&
              item.helped !== undefined &&
              item.side_effects !== undefined),
        ) ?? false
      );
    case 12:
      return (
        data.procedures?.every(
          (item) =>
            !item.done || (Boolean(item.sessions) && item.helped !== undefined),
        ) ?? false
      );
    case 13:
      return (
        data.past_treatment_side_effects !== undefined &&
        (!data.past_treatment_side_effects || Boolean(data.describe?.trim()))
      );
    case 14:
      return Boolean(data.sample_type);
    case 15:
      return data.consent !== undefined;
    default:
      return false;
  }
}
