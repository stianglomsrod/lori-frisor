# Lori Frisør

Nettside og pilot for **Lori Frisør**, en frisørsalong i Halden.
Bygget med [Astro](https://astro.build) – statisk, raskt og tilgjengelig – med
[Keystatic](https://keystatic.com) som redigeringsverktøy for eieren.

## Kom i gang

```bash
npm install
npm run dev      # http://localhost:4321  (Keystatic på /keystatic)
```

| Kommando          | Hva den gjør                                            |
| ----------------- | ------------------------------------------------------- |
| `npm run dev`     | Lokal utviklingsserver                                  |
| `npm run build`   | Produksjonsbygg (Vercel) + sikkerhetsheadere            |
| `npm run preview` | Forhåndsvis bygget                                      |
| `npm run check`   | Astro/TypeScript-typesjekk (hold 0/0/0)                 |

## Innhold

Eieren redigerer alt innhold i **Keystatic** (`/keystatic`): tekster, priser,
produkter, tilbud, åpningstider, sosiale medier og booking-lenker. Filene
lagres i `src/cms/*.yaml`. Utvikler-fallbacks ligger i `src/data/*.ts`.
Booking eies av **Timma** – alle «Bestill time»-knapper lenker dit, med
valgfri dyplenke per tjeneste.

Produktreservasjon sendes som e-post til salongen via `/api/reserve` (Brevo);
uten oppsett faller siden tilbake til SMS-lenker. Se `HANDOFF.md`.

## Personvern og samtykke

Kun nødvendig lagring før aktivt valg: Google Maps-kartet lastes først etter
samtykke (banner eller «Vis kart»), og valget kan trekkes tilbake i footeren.
Personvernerklæring: `/personvern` og `/en/privacy`. Compliance-artefakter
(cookie-register, data map, release gate m.m.): `docs/compliance/`.

## Dokumentasjon

- `PROJECT_DNA.md` – mål, prinsipper, regler (les først)
- `AGENTS.md` – onboarding for utviklere/agenter (les som nr. 2)
- `DECISIONS.md` – beslutninger med begrunnelse (D1–D11)
- `HANDOFF.md` – status, oppsett (Brevo/Vercel) og neste steg
- `TECH_DEBT.md` – placeholdere og gjenstående punkter
- `docs/compliance/` – utfylte guardrail-artefakter + release gate
- `docs/EIER-VEILEDNING.md` – veiledning for salongens eier
- `RESEARCH_NOTES.md`, `VISUAL_REVIEW.md`, `FILE_TREE.md`

> Merk: priser, produkter, tilbud og foto er fortsatt **placeholder/stock** og
> må bekreftes med salongen før publisering. Se `TECH_DEBT.md` og release-gaten.
