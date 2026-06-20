# Lori Frisør

Nettside-konsept og pilot for **Lori Frisør**, en frisørsalong i Halden.
Bygget med [Astro](https://astro.build) – statisk, raskt og tilgjengelig.

## Kom i gang

```bash
npm install
npm run dev      # http://localhost:4321
```

| Kommando          | Hva den gjør                      |
| ----------------- | --------------------------------- |
| `npm run dev`     | Lokal utviklingsserver            |
| `npm run build`   | Statisk produksjonsbygg → `dist/` |
| `npm run preview` | Forhåndsvis bygget                |
| `npm run check`   | Astro/TypeScript-typesjekk        |

## Innhold endres i `src/data/`

`site.ts` (kontakt, åpningstider, booking-URL), `services.ts`, `products.ts`,
`offers.ts`. Booking håndteres av Timma – alle «Bestill time»-knapper lenker dit.

## Dokumentasjon

- `PROJECT_DNA.md` – mål, prinsipper, regler (les først)
- `DECISIONS.md` – beslutninger (inkl. Timma vs egen booking)
- `RESEARCH_NOTES.md` – research
- `VISUAL_REVIEW.md` – visuell vurdering + tilgjengelighet
- `TECH_DEBT.md` – placeholdere og utsatt arbeid
- `HANDOFF.md` – status og neste steg
- `FILE_TREE.md` – prosjektstruktur

> Merk: priser, åpningstider, produkter, tilbud og bilder er **placeholder** og må
> bekreftes med salongen før publisering. Se `TECH_DEBT.md`.
