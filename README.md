# MakeMethod

Educational manufacturing decision-support app. Explore materials and processes, run a preliminary advisor shortlist, and compare illustrative tooling/unit cost models.

Milestone 1 migrates the HTML prototype into a Next.js App Router app with TypeScript, Tailwind CSS, and shadcn/ui.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123) or [http://localhost:43123](http://localhost:43123).

If the Advisor looks fine but **nothing is clickable** (stuck on Consumer product, Next does nothing), stop the server, clear the cache, and restart:

```bash
rm -rf .next
npm run dev
```

`next.config.ts` allows both `127.0.0.1` and `localhost` as Next.js 16 `allowedDevOrigins` so client hydration works on either host.

Production build:

```bash
npm run build
npm start
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Home hero + feature entry points |
| `/materials` | Materials library with search |
| `/materials/[id]` | Material detail (pros/cons, compatible processes) |
| `/processes` | Processes library with search |
| `/processes/[id]` | Process detail (steps, compatible materials) |
| `/advisor` | Multi-step Manufacturing Advisor wizard → preliminary shortlist |
| `/cost-explorer` | Quantity slider, bar comparison, editable assumptions |

## Data

Prototype datasets live under `src/data/` (`materials`, `processes`, `costs`). Costs are illustrative planning inputs, not supplier quotes.

## Milestone scope

Milestone 1 preserves the prototype’s navigation, data, and interactions. The multi-step advisor wizard, expanded catalogs, and recommendation engine are later milestones.
