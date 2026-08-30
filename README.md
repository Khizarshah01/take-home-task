# GenoRoot — hair & scalp intake

Waiting-room web app for a hair clinic. The patient never sees the paper form. The doctor does: a complete 16-question chart plus JSON, before they walk in.

Made-up patients only. No login. No admin. Nothing is stored on a server.

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

## What I would do with one more week

1. Playwright (or a small node test) that fills Priya and Rohan and asserts every schema key and enum.
2. Waiting-room autosave (`localStorage`, time-limited) so a refresh does not restart the visit.
3. Printable clinician one-pager — the chart, not the JSON.
4. Optional English / Hinglish toggle (English stays default).
5. If speech is needed: Grok STT **only** on free-text (salon name, Q14 describe), never as the whole form. Mic never required to finish.

## Deploy

Vercel, from this folder. No `XAI_API_KEY` or other secrets. Keep keys out of the repo if you add any later (`.env.local`, gitignored).
