import { FormProvider } from "@/components/form-context";
import { IntakeApp } from "@/components/intake-app";

export default function Home() {
  return (
    <FormProvider>
      <IntakeApp />
    </FormProvider>
  );
}
