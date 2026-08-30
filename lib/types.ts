export type Habits = {
  smoking?: boolean;
  smoking_severity?: string;
  alcohol?: boolean;
  hard_water?: boolean;
  hair_wash_frequency?: string;
  heating_tools_styling_chemicals?: boolean;
  salon_treatments?: boolean;
  salon_treatment_detail?: string;
};

export type ProductRow = {
  product: string;
  used: boolean;
  duration?: string;
  helped?: boolean;
  side_effects?: boolean;
};

export type ProcedureRow = {
  procedure: string;
  done: boolean;
  sessions?: string;
  helped?: boolean;
};

export type FormState = {
  form?: string;
  age_hair_loss_began?: number;
  duration?: string;
  family_history?: string[];
  pattern?: string[];
  diagnosed_conditions?: string[];
  menstrual_cycle?: string;
  pregnancy_related?: string;
  adult_acne_oily_skin?: boolean;
  excess_body_facial_hair?: boolean;
  past_6_months?: string[];
  no_recent_triggers?: boolean;
  habits?: Habits;
  products?: ProductRow[];
  procedures?: ProcedureRow[];
  past_treatment_side_effects?: boolean;
  describe?: string;
  sample_type?: string;
  consent?: boolean;
};

export type Choice = { label: string; value: string };
