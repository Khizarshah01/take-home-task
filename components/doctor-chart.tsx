import type { FormState } from "@/lib/types";

export function DoctorChart({ data }: { data: FormState }) {
  const bool = (val: boolean | undefined) =>
    val === true ? "Yes" : val === false ? "No" : "—";
  const arr = (val: string[] | undefined) =>
    val?.length ? val.join(", ") : "—";

  return (
    <div className="doctor-chart">
      <div className="chart-section">
        <h3>A. Personal & Family History</h3>
        <dl>
          <div>
            <dt>Age Began</dt>
            <dd>{data.age_hair_loss_began || "—"}</dd>
          </div>
          <div>
            <dt>Duration</dt>
            <dd>{data.duration || "—"}</dd>
          </div>
          <div>
            <dt>Family History</dt>
            <dd>{arr(data.family_history)}</dd>
          </div>
          <div>
            <dt>Pattern</dt>
            <dd>{arr(data.pattern)}</dd>
          </div>
        </dl>
      </div>

      <div className="chart-section">
        <h3>B. Health & Hormones</h3>
        <dl>
          <div>
            <dt>Conditions</dt>
            <dd>{arr(data.diagnosed_conditions)}</dd>
          </div>
          {data.menstrual_cycle !== "Not applicable" && (
            <div>
              <dt>Menstrual Cycle</dt>
              <dd>{data.menstrual_cycle || "—"}</dd>
            </div>
          )}
          {data.pregnancy_related !== "Not applicable" && (
            <div>
              <dt>Pregnancy</dt>
              <dd>{data.pregnancy_related || "—"}</dd>
            </div>
          )}
          <div>
            <dt>Acne/Oily Skin</dt>
            <dd>{bool(data.adult_acne_oily_skin)}</dd>
          </div>
          <div>
            <dt>Excess Hair</dt>
            <dd>{bool(data.excess_body_facial_hair)}</dd>
          </div>
        </dl>
      </div>

      <div className="chart-section">
        <h3>C. Lifestyle & Triggers</h3>
        <dl>
          <div>
            <dt>Past 6 Months</dt>
            <dd>
              {data.no_recent_triggers ? "None" : arr(data.past_6_months)}
            </dd>
          </div>
          <div>
            <dt>Smoking</dt>
            <dd>
              {data.habits?.smoking ? data.habits.smoking_severity : "No"}
            </dd>
          </div>
          <div>
            <dt>Alcohol</dt>
            <dd>{bool(data.habits?.alcohol)}</dd>
          </div>
          <div>
            <dt>Hard Water</dt>
            <dd>{bool(data.habits?.hard_water)}</dd>
          </div>
          <div>
            <dt>Wash Frequency</dt>
            <dd>{data.habits?.hair_wash_frequency || "—"}</dd>
          </div>
          <div>
            <dt>Heat/Chemicals</dt>
            <dd>{bool(data.habits?.heating_tools_styling_chemicals)}</dd>
          </div>
          <div>
            <dt>Salon Treatments</dt>
            <dd>
              {data.habits?.salon_treatments
                ? data.habits.salon_treatment_detail
                : "No"}
            </dd>
          </div>
        </dl>
      </div>

      <div className="chart-section">
        <h3>D. Treatments</h3>
        <dl>
          <div className="full-width">
            <dt>Products Used</dt>
            <dd>
              {data.products?.filter((p) => p.used).length ? (
                <ul className="chart-list">
                  {data.products
                    .filter((p) => p.used)
                    .map((p) => (
                      <li key={p.product}>
                        <strong>{p.product}</strong> ({p.duration || "—"}) — Helped:{" "}
                        {bool(p.helped)}, Side effects: {bool(p.side_effects)}
                      </li>
                    ))}
                </ul>
              ) : (
                "None"
              )}
            </dd>
          </div>
          <div className="full-width">
            <dt>Procedures Done</dt>
            <dd>
              {data.procedures?.filter((p) => p.done).length ? (
                <ul className="chart-list">
                  {data.procedures
                    .filter((p) => p.done)
                    .map((p) => (
                      <li key={p.procedure}>
                        <strong>{p.procedure}</strong> ({p.sessions || "—"} sessions) — Helped:{" "}
                        {bool(p.helped)}
                      </li>
                    ))}
                </ul>
              ) : (
                "None"
              )}
            </dd>
          </div>
          {data.past_treatment_side_effects && (
            <div className="full-width">
              <dt>Side Effect Details</dt>
              <dd>{data.describe || "—"}</dd>
            </div>
          )}
        </dl>
      </div>

      <div className="chart-section">
        <h3>E. Consent</h3>
        <dl>
          <div>
            <dt>Sample Type</dt>
            <dd>{data.sample_type || "—"}</dd>
          </div>
          <div>
            <dt>Consent Given</dt>
            <dd>{bool(data.consent)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
