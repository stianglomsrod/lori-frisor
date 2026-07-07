# AGENTS.md — Lori Frisør

Onboarding for a fresh AI agent or developer. Read this top-to-bottom; it is
self-contained. Deeper context lives in `PROJECT_DNA.md`, `DECISIONS.md`,
`HANDOFF.md`, and `RESEARCH_NOTES.md`.

## What this is

A polished, accessible, **static** marketing site for **Lori Frisør**, a hair
salon in Halden, Norway. Built with **Astro v6** (Node ≥22.12). The whole page is prerendered
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

Deploy target: **Vercel** (`@astrojs/vercel`), building from `main`.
**Prototype (live):** <https://lori-frisor.vercel.app/> — automatically served
with `X-Robots-Tag: noindex` via a host-conditional rule in
`scripts/patch-vercel-headers.mjs`. **Production domain** www.lorifrisor.no is
connected later (launch-day checklist in `HANDOFF.md`); the noindex rule stops
matching by itself once the real host serves the site. Canonical/sitemap/
JSON-LD already point at the real domain — nothing to change at launch.

## Project layout

```
src/
  components/   Astro UI components (Hero, Services, Pricing, Contact, Header,
                ConsentBanner, SocialIcon, NewTab, Placeholder…)
  cms/          Editable content (Keystatic-owned YAML) — moved from
                src/content/ (Astro-reserved dir; move silenced the
                auto-collections deprecation)
    no/         Norwegian content: homepage|services|products|offers.yaml
    en/         English content (same shape, translated)
    settings.yaml, opening-hours.yaml   SHARED across locales (root)
  data/         TS fallback defaults if content is missing
  i18n/         config.ts (locales, privacy paths) + ui.ts (UI microcopy)
  layouts/      BaseLayout.astro (SEO, OG/Twitter, hreflang, JSON-LD, consent)
  lib/          content.ts (Keystatic reader) + consent-client.ts (shared
                localStorage consent state for banner + map)
  pages/        index.astro (NO "/"), en/index.astro (EN "/en/"),
                personvern.astro + en/privacy.astro (privacy policy),
                404.astro, api/reserve.ts (reservation email endpoint)
  styles/       global.css (design tokens + base)
docs/compliance/       Filled-in guardrail artifacts (cookie register, data map,
                       release gate, …) — keep in sync with reality
scripts/               make-og.mjs (OG image), patch-vercel-headers.mjs
                       (security headers into Vercel build output), extract-logo.mjs
keystatic.config.ts    CMS schema (per-locale singletons)
astro.config.mjs       i18n + sitemap + Vercel adapter (imageService)
.github/workflows/ci.yml  typecheck + build on push/PR
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
- **Editable content** lives per-locale in `src/cms/no|en/`. `settings.yaml`
  and `opening-hours.yaml` are shared (address, phone, social list, hours,
  cancellation policy). Social is an editable LIST (platform + label + URL) —
  the owner can add TikTok etc. herself; JSON-LD `sameAs` follows it.
- The booking CTA label is a UI string (`t.cta.book`), not a content field.
- Each service has an optional **per-service Timma deep link** (`bookingUrl`);
  empty → the shared booking URL. Timma supports `?category=<id>&service=<id>`
  on the booking page; the owner copies the URL from the address bar.

### Add a new language (the only steps)

1. Add the code to `locales` in `src/i18n/config.ts` (+ label/lang/privacy maps).
2. Translate the dictionary in `src/i18n/ui.ts`.
3. Copy `src/cms/no/` → `src/cms/<code>/` and translate the YAML.
4. Add pages: `src/pages/<code>/index.astro` (+ a privacy page, see
   `en/privacy.astro`).
5. Add the per-locale singletons block in `keystatic.config.ts`.

Menu, language toggle, hreflang and SEO tags wire up automatically.

## Consent & privacy (do not regress)

- The ONLY non-essential third party is the Google Maps iframe. It must NEVER
  render before consent: `Contact.astro` injects it client-side after
  `lori:consent` (banner) or the contextual "Vis kart" button. Withdrawal
  (footer link → banner → "Kun nødvendige") removes the iframe immediately.
- Consent state lives in `localStorage` (`lori-consent-v1`); shared logic in
  `src/lib/consent-client.ts`. ONLY the banner writes; others dispatch
  `lori:consent-request`.
- Google Fonts stays external as a **documented accepted deviation**
  (DECISIONS D7, risk register #1). Don't "fix" without a decision.
- Any new third party (analytics, embeds) requires: consent gating, an entry in
  `docs/compliance/cookie_register.md`, a CSP update in
  `scripts/patch-vercel-headers.mjs`, and a privacy-page update — BEFORE deploy.

## Reservation endpoint (`/api/reserve`)

POST JSON → email to the salon via Brevo. Env vars: `BREVO_API_KEY` (required
to activate; without it the UI falls back to SMS links), `BREVO_SENDER`
(verified sender), `RESERVATION_TO` (optional override; default = contact email
from Keystatic settings). Protections: honeypot, origin check, length caps,
phone/email validation, per-instance rate limit. No storage server-side.
`RESERVE_FORM_PREVIEW=1` in `.env` force-renders the dialog locally.

## Keystatic (owner CMS)

- Local dev storage = no auth: anyone at `localhost:4321/keystatic` can edit.
- **Keystatic Cloud is configured** (`cloud.project: "lori/lori-frisor"`).
  The owner logs in at `/keystatic` with email (no GitHub account). Cloud
  content commits look like "Update src/cms/…" on main.

## Conventions & gotchas

- **Language for user-facing copy: Norwegian**, natural/idiomatic (avoid literal
  translations). Brand CTA is **"Bestill time" / "bestille"**.
- **OneDrive breaks the Vite watcher**: scoped CSS edits may not hot-reload even
  though HTML does — **restart the dev server** if styles look stale.
- `global.css` has `p { max-width: 60ch }` — it caps the width of _any_ `<p>`.
- Keep marketing pages prerendered; client JS stays tiny and purposeful
  (menu, reveal, consent, map mount, reservation dialog — nothing else).
- Links with `target="_blank"` get `<NewTab />` (hidden "(åpnes i ny fane)").
- Nav anchors are absolute (`/#tjenester`) so the menu works from subpages.
- `Placeholder.astro` builds `/_vercel/image` srcsets ONLY when
  `process.env.VERCEL` is set; local dev serves originals. New widths must be
  added to `imagesConfig.sizes` in `astro.config.mjs` too.
- Security headers/CSP live in `scripts/patch-vercel-headers.mjs` (runs in
  `npm run build`). Do NOT add a `vercel.json` — unsupported with the adapter's
  Build Output API.
- Don't create new doc markdown files unless asked. Mark placeholders clearly.
- After edits, run `npm run check` (keep 0/0/0) and `npm run build`.

## Current state (2026-07-04, branch feat/proff-oppgradering)

- Bilingual NO/EN site building green (check 0/0/0); pushed to GitHub
  (`stianglomsrod/lori-frisor`), Keystatic Cloud live — owner has made content
  edits (commits "Update src/cms/…" / older "Update src/content/…").
- This branch adds: consent solution + privacy pages, SEO pack (OG/Twitter/
  sitemap/JSON-LD/404), performance (LCP eager, responsive images), Keystatic
  handover fields (social list, day select, per-service booking links,
  cancellation text), reservation form + `/api/reserve` (Brevo) with SMS
  fallback, security headers, CI, and filled-in `docs/compliance/` artifacts.
- Before merge/launch: run the release gate (`docs/compliance/release_gate.md`)
  — Brevo setup + test email, Vercel function region `arn1`, MFA check, photo
  licences, axe re-test, owner confirms prices/content.
