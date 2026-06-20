# HANDOFF – Lori Frisør

For neste agent/utvikler. Les `PROJECT_DNA.md` først, så denne.

## Kjøre prosjektet

Krever Node 18+ (utviklet på Node 24).

```bash
npm install      # installer avhengigheter
npm run dev      # lokal dev-server (http://localhost:4321)
npm run build    # produksjonsbygg (Vercel-adapter)
npm run preview  # forhåndsvis bygget
npm run check    # Astro/TypeScript-typesjekk
```

Deploy: prosjektet bruker `@astrojs/vercel`-adapteren og er ment for **Vercel**.
Forsiden er fortsatt forhåndsrendret (statisk, null klient-JS); kun
redigeringsverktøyet `/keystatic` kjører server-side. Koble GitHub-repoet til
Vercel én gang – deretter bygges siden automatisk hver gang innhold endres.

## Hva som er bygget

En komplett, responsiv, tilgjengelig **forside** for Lori Frisør (Astro, statisk):

- Header m/ sticky nav + tilgjengelig mobilmeny
- Hero m/ verdiløfte og primær-CTA «Bestill time» (→ Timma)
- Trust-bar (adresse/telefon/tider)
- Tjenester (kort), Priser (bord), Tilbud (kort), Produkter (m/ «Reserver»)
- Om, Kontakt (åpningstider, kart-lenke, sosialt), Footer
- SEO/OG-metadata + LocalBusiness structured data
- WCAG 2.2 AA-rettet (axe: 0 violations) – se `VISUAL_REVIEW.md`

Booking gjøres **ikke** på siden – alle CTA peker til Timma. Se `DECISIONS.md` D1.

## Hvor man endrer innhold

### For eier: redigeringsverktøyet (Keystatic)

Eieren endrer tekst, priser og bilder selv – uten kode og uten utvikler:

- **Lokalt under utvikling:** gå til `http://localhost:4321/keystatic`.
- **På den publiserte siden:** gå til `https://<domenet>/keystatic`.

Endringer lagres som vanlige filer i prosjektet (`src/content/*.yaml` + bilder i
`public/images/`), og Vercel bygger siden på nytt automatisk. Bilder lastes opp
direkte i verktøyet.

**Engangsoppsett for innlogging uten GitHub-konto (Keystatic Cloud):**

1. Logg inn på <https://keystatic.cloud> og opprett et team + prosjekt.
2. Koble prosjektet til dette GitHub-repoet.
3. Bytt ut `cloud.project` i `keystatic.config.ts` (nå `"lori-frisor/nettside"`)
   med din ekte `"team/prosjekt"`-verdi.
4. Inviter eier som bruker (gratis for inntil 3 brukere). Da kan hun logge inn
   på `/keystatic` med e-post – helt uten GitHub-konto.

### For utvikler: standardverdier og struktur

`src/content/*.yaml` er innholdet eieren redigerer. `src/lib/content.ts` leser
dette og faller tilbake på standardverdiene i `src/data/*.ts` hvis en fil
mangler. Selve skjemaet (hva eier ser i verktøyet) defineres i
`keystatic.config.ts`.

- `settings.yaml` – navn, kontakt, sosialt, **booking-URL**
- `opening-hours.yaml` – **åpningstider** (huk av «Stengt» per dag)
- `homepage.yaml` – hero- og om-tekst + bilder
- `services.yaml` – tjenester + **veiledende priser**
- `products.yaml` – produktutvalg + bilder
- `offers.yaml` – tilbud (tom liste skjuler hele seksjonen)

Navigasjon ligger fortsatt i koden (`src/data/site.ts` → `navLinks`).
Farger/typografi: `src/styles/global.css` (CSS-variabler øverst i `:root`).
Logo: `src/components/Logo.astro` + `public/favicon.svg`.

## Hvor placeholdere finnes (må erstattes)

Se `TECH_DEBT.md` for full liste. Kort: priser, åpningstider, produkter, tilbud,
alle bilder (SVG-placeholdere), om-/hero-tekst, kart-lenke.

## Status

- ✅ Bygger rent (`npm run build`, `npm run check`: 0 feil).
- ✅ Tilgjengelighet: axe-core 0 violations; kontrast manuelt verifisert.
- ✅ Visuelt gjennomgått på desktop + mobil (se `docs/screenshots/`).
- ⚠️ Innhold er delvis placeholder – ikke publiser før eier har bekreftet
  priser, åpningstider, produkter og bilder.

## Anbefalte neste steg (prioritert)

1. Hent ekte foto (hero, salong, produkter) + bekreft priser/åpningstider.
2. Bytt SVG-logo mot eksportert vektor av originalen om ønskelig.
3. Få eier til å godkjenne copy (hero, om, tilbud).
4. Vurder kundeomtaler/Google-rating for ekstra tillit.
5. Vurder `@astrojs/sitemap` og self-hostede fonts (Fontsource) før lansering.
6. Ekstern visuell QA på 1440px-skjerm (innebygd panel var upålitelig for brede skudd).
7. Sett opp Keystatic Cloud-prosjektet (se over) og deploy til Vercel + koble domenet.
