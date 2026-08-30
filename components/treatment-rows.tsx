"use client";

import {
  PROCEDURE_NAMES,
  PROCEDURE_SESSIONS,
  PRODUCT_DURATION,
  PRODUCT_NAMES,
} from "@/lib/options";
import type { ProcedureRow, ProductRow } from "@/lib/types";
import { ChoiceGrid } from "./choice-grid";
import { YesNo } from "./yes-no";

export function ProductRows({
  products,
  onChange,
}: {
  products: ProductRow[];
  onChange: (products: ProductRow[]) => void;
}) {
  const update = (index: number, patch: Partial<ProductRow>) => {
    onChange(products.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  };

  const selected = products.filter(p => p.used).map(p => p.product);

  return (
    <div className="treatment-list">
      <ChoiceGrid
        options={PRODUCT_NAMES.map(name => ({ label: name, value: name }))}
        value={selected}
        multi
        onChange={(values) => {
          const vals = Array.isArray(values) ? values : [values];
          onChange(
            products.map((row) => ({
              ...row,
              used: vals.includes(row.product),
            }))
          );
        }}
      />
      
      <div style={{ marginTop: selected.length ? "32px" : "0" }}>
        {products.map((row, index) => {
          if (!row.used) return null;
          return (
            <div className="treatment-row" key={row.product}>
              <div className="treatment-title" style={{ paddingBottom: "16px" }}>
                <span style={{ fontWeight: 750, color: "var(--forest)", borderBottom: "2px solid var(--forest)" }}>
                  {row.product} Details
                </span>
              </div>
              <div className="treatment-detail">
                <span>How long?</span>
                <ChoiceGrid
                  options={PRODUCT_DURATION}
                  value={row.duration}
                  onChange={(value) => update(index, { duration: value as string })}
                />
                <span>Did it help?</span>
                <YesNo
                  value={row.helped}
                  onChange={(helped) => update(index, { helped })}
                />
                <span>Any side effects?</span>
                <YesNo
                  value={row.side_effects}
                  onChange={(side_effects) => update(index, { side_effects })}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ProcedureRows({
  procedures,
  onChange,
}: {
  procedures: ProcedureRow[];
  onChange: (procedures: ProcedureRow[]) => void;
}) {
  const update = (index: number, patch: Partial<ProcedureRow>) => {
    onChange(
      procedures.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    );
  };

  const selected = procedures.filter(p => p.done).map(p => p.procedure);

  return (
    <div className="treatment-list">
      <ChoiceGrid
        options={PROCEDURE_NAMES.map(name => ({ label: name, value: name }))}
        value={selected}
        multi
        onChange={(values) => {
          const vals = Array.isArray(values) ? values : [values];
          onChange(
            procedures.map((row) => ({
              ...row,
              done: vals.includes(row.procedure),
            }))
          );
        }}
      />

      <div style={{ marginTop: selected.length ? "32px" : "0" }}>
        {procedures.map((row, index) => {
          if (!row.done) return null;
          return (
            <div className="treatment-row" key={row.procedure}>
              <div className="treatment-title" style={{ paddingBottom: "16px" }}>
                <span style={{ fontWeight: 750, color: "var(--forest)", borderBottom: "2px solid var(--forest)" }}>
                  {row.procedure} Details
                </span>
              </div>
              <div className="treatment-detail">
                <span>Sessions</span>
                <ChoiceGrid
                  options={PROCEDURE_SESSIONS}
                  value={row.sessions}
                  onChange={(value) => update(index, { sessions: value as string })}
                />
                <span>Did it help?</span>
                <YesNo
                  value={row.helped}
                  onChange={(helped) => update(index, { helped })}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
