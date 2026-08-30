import type { FormState } from "@/lib/types";
import { DoctorChart } from "./doctor-chart";

export function ResultScreen({
  data,
  onRestart,
}: {
  data: FormState;
  onRestart: () => void;
}) {
  return (
    <main className="shell result-shell">
      <section className="result-card" style={{ padding: "42px", justifyContent: "flex-start", overflowY: "auto", height: "100%" }}>
        <p style={{ textAlign: "center", marginBottom: "24px" }}>
          Your clinician can now review a complete, structured intake before
          your visit.
        </p>

        <DoctorChart data={data} />

        <details className="dev-payload">
          <summary>Developer Payload (JSON)</summary>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </details>

        <button className="secondary" onClick={onRestart} style={{ width: "100%" }}>
          Start again
        </button>
      </section>
    </main>
  );
}
