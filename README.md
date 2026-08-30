# GenoRoot — hair & scalp intake

Waiting-room web app for a hair clinic. The patient never sees the paper form. The doctor does: a complete 16-question chart plus JSON, before they walk in.

Made-up patients only. No login. No admin. Nothing is stored on a server.

Schema contract: [haikustudio.ai/hiring/intake-schema.json](https://haikustudio.ai/hiring/intake-schema.json). Field *names* are not graded; coverage and stored option strings match that JSON.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

Works on a phone and a laptop. No install for reviewers once it is deployed (Vercel).

## What the patient does vs what the doctor gets

The patient taps through short screens. The last screen is the form from the brief (sections A–E), then a JSON payload under “Developer Payload”.

| # | Field | How it is answered |
|---|---|---|
| 1 | Age hair loss began | Large number. Estimate is fine. |
| 2 | Duration | Three chips. Values: `Less than 6 months` / `6-12 months` / `Over a year`. |
| 3 | Family history | Multi. `No known family history` is exclusive. |
| 4 | Pattern | Multi chips (locations + shedding). |
| 5 | Diagnosed conditions | Multi. `None` is exclusive. **PCOS/PCOD** opens Q6–Q7. |
| 6–7 | Cycle / pregnancy | Never “Male / Female”. Never a name. After Q5: *Do periods or pregnancy matter for your hair?* Yes → ask both. Does not apply → both stored as `Not applicable`. |
| 8–9 | Acne, extra hair | Yes / No. |
| 10 | Past 6 months | Multi, or none. Empty + none is a valid fill. |
| 11 | Habits | Yes/No rows. Smoking yes → `Mild <5/day` / `Moderate 5-10/day` / `Severe >10/day`. Salon yes → which treatment. Wash: `Daily` / `Alternate Days` / `Weekly`. |
| 12 | Products | “What have you tried?” Untouched rows stay `used: false`. Details (duration `<3mo` / `3-6mo` / `>6mo`, helped, side effects) only for what they tapped. |
| 13 | Procedures | Same pattern. Unused rows stay `done: false`. |
| 14 | Past treatment side effects | If any product had side effects, **Yes is inferred**. They only describe. Otherwise they answer Yes/No. |
| 15–16 | Sample, consent | Saliva / Blood / Either. Consent yes/no. `false` is still a filled field. |

## Choices — models, services, bought vs built

**No model in production.** A voice copilot or an LLM extracting the whole form would have been one chat box. The brief asked to think *per question*. Browser speech is weak on Hinglish in a noisy clinic, and a gender-from-name API is the wrong clever (Indian names, privacy, wrong skip of Q6–Q7). So: taps, skip logic, infer-and-confirm.

| Bought | Why |
|---|---|
| Next.js (App Router) + React + TypeScript | One deployable web app, phone + laptop, no native install. |
| Vercel | Reviewers open a link. No env vars required. |
| Lucide icons | Chevrons, lock, consent — not worth drawing. |

| Built | Why |
|---|---|
| Step graph + PCOS / “does this apply?” gate | Q6–Q7 without asking sex. |
| Product / procedure “tried these” | The grid fills itself; unused = no. |
| Q14 prefill from product side effects | Infer, then confirm with a description. |
| Doctor chart + JSON | The fixed output: the form, fully filled, as structured data. |
| Option lists in `lib/options.ts` | Display labels can be friendly; **saved values match the hiring schema**. |

`clsx`, `framer-motion`, and `tailwind-merge` are in `package.json` from the original scaffold. The UI does not depend on them for the intake flow.

## How I checked the form actually fills

Manual, two made-up patients, phone-width and laptop. After each run I opened the chart and the JSON and checked every schema key.

**Priya (PCOS path)** — Q6–Q7 are asked.

- Age began 28, duration over a year, mother, crown + part line
- PCOS/PCOD + thyroid → menstrual irregular, pregnancy not applicable
- Acne yes, extra hair yes, stress in last 6 months
- No smoking/alcohol, hard water yes, wash alternate days, no heat/salon
- Oils + topical minoxidil (minoxidil: helped yes, side effects yes) → Q14 already Yes, she only describes itching
- No procedures, saliva, consent yes

JSON must contain `menstrual_cycle: "Irregular"`, all five product rows (unused `used: false`), all four procedure rows (`done: false`), `past_treatment_side_effects: true` with a description.

**Rohan (skip 6–7)** — “Does not apply” on the periods/pregnancy gate.

- Receding + crown, father, no diagnosed conditions
- Q6 and Q7 stored as `Not applicable` without ever asking sex
- Smoking mild, topical minoxidil only, no side effects, Q14 answered No
- Saliva, consent yes

JSON must contain `menstrual_cycle` and `pregnancy_related` as `Not applicable`, smoking_severity `Mild <5/day`, unused products still present as `used: false`.

Also checked: family `None` cannot sit next to father; conditions `None` cannot sit next to thyroid; Continue stays disabled until the current screen is valid; back from acne after a skip returns to conditions.

I did not add an automated suite in this pass. That is the first item in “one more week.”

## What I would do with one more week

1. Playwright (or a small node test) that fills Priya and Rohan and asserts every schema key and enum.
2. Waiting-room autosave (`localStorage`, time-limited) so a refresh does not restart the visit.
3. Printable clinician one-pager — the chart, not the JSON.
4. Optional English / Hinglish toggle (English stays default).
5. If speech is needed: Grok STT **only** on free-text (salon name, Q14 describe), never as the whole form. Mic never required to finish.

## Deploy

Vercel, from this folder. No `XAI_API_KEY` or other secrets. Keep keys out of the repo if you add any later (`.env.local`, gitignored).
