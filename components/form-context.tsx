"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { emptyForm } from "@/lib/options";
import type { FormState } from "@/lib/types";

type FormContextValue = {
  data: FormState;
  updateData: (patch: Partial<FormState>) => void;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
};

const FormContext = createContext<FormContextValue | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<FormState>(emptyForm);
  const [currentStep, setCurrentStep] = useState(0);

  const updateData = (patch: Partial<FormState>) => {
    setData((prev) => ({ ...prev, ...patch }));
  };

  return (
    <FormContext.Provider
      value={{
        data,
        updateData,
        currentStep,
        nextStep: () => setCurrentStep((step) => step + 1),
        prevStep: () => setCurrentStep((step) => Math.max(0, step - 1)),
        goToStep: setCurrentStep,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
}
