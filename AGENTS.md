# AGENTS.md — Lori Frisør

Onboarding for a fresh AI agent or developer. Read this top-to-bottom; it is
self-contained. Deeper context lives in `PROJECT_DNA.md`, `DECISIONS.md`,
`HANDOFF.md`, and `RESEARCH_NOTES.md`.

## What this is

A polished, accessible, **static** marketing site for **Lori Frisør**, a hair
salon in Halden, Norway. Built with **Astro v5**. The whole page is prerendered
(zero client JS on the marketing pages); only the `/keystatic` editor runs
server-side. The owner edits text/prices/images herself via Keystatic — no code.

Booking is **not** done on the site. Every "Bestill time" CTA links out to
Timma. See `DECISIONS.md` D1.

## Business facts (source of truth)

- Name: **Lori Frisør** · Address: **Torget 2, 1767 Halden**
- Phone: `45050677` (display `450 50 677`) · Email: `cindy@lori.no`
- Booking: <https://bestill.timma.no/lorifrisor>
- Facebook: facebook.com/LoriFrisor · Instagram: instagram.com/lorifrisor
- **Saturday + Sunday CLOSED** (Mon–Fri open).

## Commands

```bash
npm install
npm run dev      # http://localhost:4321  (Keystatic at /keystatic)
npm run build    # production build (Vercel adapter)
npm run preview
npm run check    # Astro + TypeScript typecheck — must stay 0/0/0
```

Deploy target: **Vercel** (`@astrojs/vercel`). Push to GitHub, import once, then
content edits auto-rebuild.

## Project layout

```
src/
  components/   Astro UI components (Hero, Services, Pricing, Contact, Header…)
  content/      Editable content (Keystatic-owned YAML)
    no/         Norwegian content: homepage|services|products|offers.yaml
    en/         English content (same shape, translated)
    settings.yaml, opening-hours.yaml   SHARED across locales (root)
  data/         TS fallback defaults if content is missing
  i18n/         config.ts (locales) + ui.ts (UI microcopy dictionary)
  layouts/      BaseLayout.astro (SEO, OG, hreflang, JSON-LD)
  lib/          content.ts (Keystatic reader, locale-aware getters)
  pages/        index.astro (NO "/") + en/index.astro (EN "/en/")
  styles/       global.css (design tokens + base)
keystatic.config.ts   CMS schema (per-locale singletons)
astro.config.mjs      i18n + Vercel adapter config
```

Path aliases (tsconfig): `@components`, `@data`, `@layouts`, `@lib`, `@i18n`.

## Internationalisation (NO default + EN)

- Routing: Astro i18n. `defaultLocale: "no"` with `prefixDefaultLocale: false`,
  so **Norwegian is at `/`** and **English at `/en/`**. Header has a `NO | EN`
  toggle (inline on desktop; inside the mobile menu panel on small screens).
- Components read the active locale via `resolveLocale(Astro.currentLocale)`
  (falls back to `"no"`).
- **Fixed UI strings** (buttons, section titles, table headers, day names) live
  in `src/i18n/ui.ts` → `useTranslations(locale)`. Templated bits are functions,
  e.g. `t.services.priceFrom(n)`, `t.footer.copyright(year)`.
- **Editable content** lives per-locale in `src/content/no|en/`. `settings.yaml`
  and `opening-hours.yaml` are shared (address, phone, social, hours).
- The booking CTA label is a UI string (`t.cta.book`), not a content field.

### Add a new language (the only steps)

1. Add the code to `locales` in `src/i18n/config.ts` (+ its label/lang maps).
2. Translate the dictionary in `src/i18n/ui.ts`.
3. Copy `src/content/no/` → `src/content/<code>/` and translate the YAML.
4. Add a page: `src/pages/<code>/index.astro` rendering `<Home />`.
5. Add the per-locale singletons block in `keystatic.config.ts`.

Menu, language toggle, hreflang and SEO tags wire up automatically.

## Keystatic (owner CMS)

- Local dev storage = no auth: anyone at `localhost:4321/keystatic` can edit.
- **Live editing on Vercel requires Keystatic Cloud** (local storage can't save
  on a read-only serverless filesystem). To enable: create a team + project at
  keystatic.cloud, connect this GitHub repo, replace the placeholder
  `cloud.project` (`"lori-frisor/nettside"`) in `keystatic.config.ts`, and invite
  the owner by email (free ≤3 users). An agent cannot mint a password/credential.

## Conventions & gotchas

- **Language for user-facing copy: Norwegian**, natural/idiomatic (avoid literal
  translations). Brand CTA is **"Bestill time" / "bestille"**.
- **OneDrive breaks the Vite watcher**: scoped CSS edits may not hot-reload even
  though HTML does — **restart the dev server** if styles look stale.
- `global.css` has `p { max-width: 60ch }` — it caps the width of _any_ `<p>`.
- Keep marketing pages prerendered (no client JS) unless explicitly required.
- Don't create new doc markdown files unless asked. Mark placeholders clearly.
- After edits, run `npm run check` (keep 0/0/0) and `npm run build`.

## Current state

- Bilingual NO/EN site complete and building green.
- Git repo on `main`, remote set to the Lori Frisør GitHub repo; **not yet
  pushed** (needs the owner's auth) and not yet imported to Vercel.
- Keystatic Cloud not yet configured (deferred until the site is live/stable).
