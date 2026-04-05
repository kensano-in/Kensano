# Aegis — Life Control System (MVP)

## 1) Product Identity

- **Name:** Aegis
- **Tagline:** *Your day, executed before you overthink it.*
- **Core idea:** Aegis is a real-time **Attention + Energy + Decision OS** that gives users one smart next action every time they open it.

It does not ask users to plan their entire life. It continuously removes friction by turning chaos into one clear move.

---

## 2) Human Hook

### Why users return 5–20x/day
Users return when friction spikes:
- “What should I do right now?”
- “I’m mentally foggy.”
- “I’m avoiding a decision.”
- “I have 8 things open and no traction.”

Aegis answers in 2 seconds with a single directive:
**Do this now for 7 minutes.**

### Psychological trigger
- **Control restoration:** uncertainty collapses into a clear command.
- **Micro-dopamine:** instant completion loops (7-minute wins) create quick reward cycles.
- **Cognitive relief:** reduces decision fatigue by replacing options with one committed path.

### If they stop using it
Without Aegis, users feel the return of “open loops” and drifting days:
- more hesitation,
- more tab-switching,
- less momentum,
- less emotional control.

The loss is not data — it is **daily command clarity**.

---

## 3) Core Features (Max 5)

## 1. **Pulse Check** (3 sec)
User taps current state:
- Focus: Low / Medium / High
- Energy: Low / Medium / High
- Mood: Calm / Anxious / Flat

Aegis instantly recalibrates recommendations.

## 2. **Next Move Engine** (1 tap)
Core panel outputs one action card:
- action title,
- duration (5 / 7 / 12 min),
- mode (Deep / Admin / Recovery).

Tap **Execute** starts timer + auto-locks other suggestions.

## 3. **Decision Drop** (5–10 sec)
For indecision moments.
User types two options in one line:
“Ship draft now vs refine for 30 min.”

Aegis returns:
- recommended option,
- confidence,
- reason in <12 words,
- immediate first step.

## 4. **State Shift Protocol** (1 tap)
When user is stuck:
- “Reset in 90s” breathing + posture cue + micro-command.
- Ends with a forced next action.

This turns emotional noise into action momentum.

## 5. **Momentum Ledger** (2 sec glance)
A minimal timeline of executed blocks across the day.
Not habits — **proof of command streak**:
- number of directives executed,
- recovery speed after distraction,
- daily control score.

---

## 4) UI/UX System (Futuristic)

### Visual language
- **Dark-first** (#05070A background)
- Glass layers with soft blur and 1px inner highlights
- Neon accents: cyan (#3CF2FF), violet (#7A5CFF), electric blue (#3B82FF)
- Typography: tight, uppercase labels + spacious numeric readouts

### Layout concept
- **Central Core Orb** (status + next action readiness)
- **Floating Cards** around orb:
  - Next Move (primary)
  - Decision Drop
  - State Shift
  - Momentum Ledger
- Bottom magnetic nav with 3 icons only: Home / Log / Settings

### Micro-interactions
- Hover: subtle elevation + edge glow
- Tap: 120ms press compression, then spring release
- Success: ripple ring from center orb + haptic-like flash animation
- Timer complete: ambient pulse, no loud interruption

### 3D/parallax feel
- Mouse/gyro parallax on background gradient mesh
- Core orb rotates 2–4 degrees with cursor drift
- Layer depth via CSS transform + blur planes (or lightweight Three.js sphere)

---

## 5) Tech Stack (One-Night Friendly)

- **Frontend:** Next.js (App Router) + React + TypeScript
- **Styling:** Tailwind CSS + custom design tokens
- **Animation:** Framer Motion
- **Backend/Auth/Data:** Supabase (Auth + Postgres + Realtime optional)
- **Optional AI:** OpenAI API for Decision Drop + Next Move scoring
- **Deployment:** Vercel

Lean model:
- one `sessions` table,
- one `state_logs` table,
- one `directives` table.

---

## 6) Page Structure

## 1. Landing Page (3-second hook)
Above the fold:
- Headline: **“Stop managing tasks. Start executing life.”**
- Live mock of Next Move card updating every few seconds
- CTA: **Enter Command Mode**

## 2. Main Dashboard (Core system)
Single-screen control center:
- Pulse Check at top
- Next Move in center (largest card)
- Secondary actions below
- Momentum strip at bottom

## 3. Daily interaction flow
When user opens app:
1. Tap Pulse (2–3 sec)
2. Receive Next Move (instant)
3. Execute block (5–12 min)
4. Mark done (1 tap)
5. App issues next directive or recovery protocol

Total overhead per visit: 3–10 seconds.

## 4. Zero-friction onboarding
- No long questionnaire
- Ask only:
  1) wake window,
  2) primary life domain (work/health/study),
  3) current biggest daily bottleneck.
- Then instantly drop user into live dashboard with first directive.

---

## 7) Unique Edge

### Killer mechanic
**Adaptive Single Directive Loop**
Most tools show lists. Aegis shows only one context-aware next action and suppresses everything else until complete.

This eliminates option paralysis and creates action inevitability.

### Emotional hook
**“I feel held together.”**
Aegis becomes the calm external executive function users lean on when their internal one is overloaded.

Not motivation. **Operational stability.**

---

## 8) One-Night Execution Plan (12 Hours)

### Hour 1–2: Concept + Setup
- Define brand tokens, screen map, and data schema
- Bootstrap Next.js + Tailwind + Supabase project
- Build reusable glass card + neon button components

### Hour 3–6: UI Skeleton
- Implement landing page + dashboard shell
- Build central orb and floating card layout
- Add responsive behavior (desktop + mobile)

### Hour 7–9: Core Features
- Pulse Check state capture
- Next Move Engine logic (rule-based first, AI optional)
- Decision Drop endpoint + response card
- Momentum Ledger write/read

### Hour 10–12: Polish + Motion
- Framer Motion transitions + micro-interactions
- Depth/parallax effects
- Final performance pass + deploy to Vercel
- Add analytics events for opens, execute taps, completions

---

## MVP Guardrails (to avoid feature bloat)

- No calendar sync in v1
- No social/community features
- No large note-taking surface
- No complex project management

Aegis v1 wins by one thing only:
**fast state-to-action conversion, repeatedly, all day.**
