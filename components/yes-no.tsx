"use client";

export function YesNo({
  value,
  onChange,
  label,
}: {
  value: boolean | undefined;
  onChange: (value: boolean) => void;
  label?: string;
}) {
  return (
    <div className="yes-no" aria-label={label}>
      <button
        type="button"
        className={value === true ? "selected-yes" : ""}
        aria-pressed={value === true}
        onClick={() => onChange(true)}
      >
        Yes
      </button>
      <button
        type="button"
        className={value === false ? "selected-no" : ""}
        aria-pressed={value === false}
        onClick={() => onChange(false)}
      >
        No
      </button>
    </div>
  );
}
