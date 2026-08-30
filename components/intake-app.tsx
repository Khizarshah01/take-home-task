"use client";

import { useMemo, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { sectionForQuestion } from "@/lib/options";
import { canContinue, hasPcos } from "@/lib/validation";
import { useForm } from "./form-context";
import { IntroScreen } from "./intro-screen";
import { QuestionBody } from "./question-body";
import { ResultScreen } from "./result-screen";

function titleFor(
  question: number,
  hasPCOS: boolean,
  periodsMatter: boolean | null,
) {
  if (question === 5 && !hasPCOS && periodsMatter === null) {
    return "Do periods or pregnancy matter for your hair?";
  }

  const titles: Record<number, string> = {
    0: "Age when hair loss began",
    1: "Duration",
    2: "Family history",
    3: "Pattern",
    4: "Diagnosed conditions",
    5: "Menstrual cycle",
    6: "Pregnancy-related hair loss",
    7: "Acne or oily skin in adulthood",
    8: "Excess body or facial hair growth",
    9: "In the past 6 months",
    10: "Habits",
    11: "Products",
    12: "In-clinic procedures",
    13: "Side effects or poor response to past treatment",
    14: "Preferred sample type",
    15: "Consent to sample collection and genetic analysis",
  };
  return titles[question] ?? "";
}

function noteFor(question: number) {
  if (question === 0) return "An estimate is completely fine.";
  if ([2, 3, 4, 9].includes(question)) return "Select all that apply.";
  if (question === 10) return "These can influence hair and scalp health.";
  return "";
}

export function IntakeApp() {
  const { data, updateData, currentStep, nextStep, prevStep, goToStep } =
    useForm();
  const [age, setAge] = useState(data.age_hair_loss_began?.toString() ?? "");
  const [periodsMatter, setPeriodsMatter] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const question = currentStep - 1;
  const pcos = hasPcos(data);
  const showFemaleHealth = pcos || periodsMatter === true;
  const hadProductSideEffects = data.products?.some((p) => p.used && p.side_effects) || false;

  useEffect(() => {
    if (question === 13 && hadProductSideEffects && data.past_treatment_side_effects !== true) {
      updateData({ past_treatment_side_effects: true });
    }
  }, [question, hadProductSideEffects, data.past_treatment_side_effects, updateData]);

  const ready = useMemo(
    () =>
      canContinue({
        question,
        age,
        data,
        showFemaleHealth,
        periodsMatter,
      }),
    [age, data, periodsMatter, question, showFemaleHealth],
  );

  if (submitted) {
    return (
      <ResultScreen
        data={data}
        onRestart={() => {
          setSubmitted(false);
          goToStep(0);
        }}
      />
    );
  }

  if (currentStep === 0) {
    return <IntroScreen onStart={() => goToStep(1)} />;
  }

  const goBack = () => {
    if (
      (question === 7 || question === 6) &&
      !showFemaleHealth &&
      periodsMatter === false
    ) {
      goToStep(5);
      setPeriodsMatter(null);
      return;
    }
    prevStep();
  };

  const goNext = () => {
    if (question === 15) {
      setSubmitted(true);
      return;
    }
    if (question === 0) {
      updateData({ age_hair_loss_began: Number(age) });
    }
    nextStep();
  };

  return (
    <main className="shell">
      <section className="intake-card">
        <header className="topbar">
          <button
            type="button"
            className="back"
            onClick={goBack}
            aria-label="Go back"
          >
            <ChevronLeft size={22} />
          </button>
        </header>
        <div className="progress-wrap">
          <div className="progress-label">
            <span>{sectionForQuestion(question)}</span>
            <span>{question + 1} of 16</span>
          </div>
          <div className="progress">
            <i style={{ width: `${((question + 1) / 16) * 100}%` }} />
          </div>
        </div>
        <div className="question-area">
          <h2>{titleFor(question, pcos, periodsMatter)}</h2>
          <p className="question-note">{noteFor(question)}</p>
          <QuestionBody
            question={question}
            age={age}
            onAgeChange={setAge}
            data={data}
            onChange={updateData}
            hasPCOS={pcos}
            showFemaleHealth={showFemaleHealth}
            periodsMatter={periodsMatter}
            onPeriodsMatter={setPeriodsMatter}
            skipFemaleQuestions={() => goToStep(8)}
          />
        </div>
        <footer className="action-bar">
          <button
            type="button"
            className="primary"
            disabled={!ready}
            onClick={goNext}
          >
            {question === 15 ? "Review my intake" : "Continue"}{" "}
            <ChevronRight size={20} />
          </button>
        </footer>
      </section>
    </main>
  );
}
