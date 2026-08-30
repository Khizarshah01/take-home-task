"use client";

import { FormEvent } from "react";
import { ChevronRight, LockKeyhole } from "lucide-react";

export function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <main className="shell intro-shell">
      <section className="intro-card">
        <div className="intro-copy">
          <h1>Before your appointment.</h1>
          <p>
            A few focused questions about your hair and scalp help your doctor
            prepare for your visit.
          </p>
        </div>
        <form
          onSubmit={(event: FormEvent) => {
            event.preventDefault();
            onStart();
          }}
          className="intro-form"
        >
          <button className="primary">
            Start <ChevronRight size={20} />
          </button>
        </form>
        <p className="privacy">
          <LockKeyhole size={14} /> Shared only with your care team.
        </p>
      </section>
    </main>
  );
}
