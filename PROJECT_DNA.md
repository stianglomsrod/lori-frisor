# PROJECT_DNA – Lori Frisør

> Kilde til sannhet for produktmål, prinsipper, teknisk retning og varige regler.
> Les denne først hvis du er en ny agent/utvikler på prosjektet.

## Hva dette er

Nettside-konsept og pilot for **Lori Frisør**, en frisørsalong i Halden, Norge.
To formål samtidig:

1. Reell pilot for salongen.
2. Porteføljekvalitet-case for et lite studio som vil betjene små/mellomstore
   norske frisørsalonger.

## Produktmål

Forbedre kundereisen rundt:

- forstå salongen og bli trygg på den
- finne tjenester/behandlinger
- forstå prisstruktur
- se tilbud/kampanjer
- oppdage produkter (produktsalg er i dag svakt)
- ta neste steg: **booke time** eller vise produktinteresse

Primær konvertering: **Bestill time** (via Timma). Sekundært: produktinteresse.

## Brukere

Én sammenhengende opplevelse for blandet aldersgruppe – **ikke** to varianter.
Den skal være: rolig, åpenbar, visuelt sterk, mobil-først, konverteringsrettet,
forståelig ved første øyekast. Enkel nok for eldre, stilig nok for yngre.

## Designprinsipper

- Mobil-først, lav kognitiv belastning, tydelig hierarki.
- Stor, lettlest typografi (basis 18px, serif-display + humanist sans).
- Rolig varm palett bygget på salongens egen identitet (gull + kull).
- Få, tydelige call-to-action. Gjenta «Bestill time».
- Universell utforming er førsteklasses krav (WCAG 2.2 AA-nivå i praksis).
- Native semantikk før ARIA.

## Merkevare (fra eier sine logofiler i /bilder)

- Identitet: elegant **gull saks-motiv** + serif ordmerke «LORI FRISØR» på kull.
- Palett i koden:
  - Kull/charcoal `#26211C` (tekst) / `#2B2926` (mørke seksjoner)
  - Gull `#C6A53F` (fyll/CTA, mørk tekst oppå)
  - Bronse `#7A5C12` (gull-farget _tekst_ på lys bakgrunn – AA-sikker)
  - Cream `#FAF7F1`, Sand `#F0E9DD` (bakgrunner)
- Logoen er **nytegnet som SVG** (saks-motiv beholdt for gjenkjennelse). Kan
  byttes til eksportert vektor av originalen senere.

## Teknisk retning

- **Astro** (statisk, minimalt klient-JS: meny, samtykke, kart-mount,
  reservasjonsdialog). Komponentbasert, rask, tilgjengelig.
- Innhold redigeres av eier i **Keystatic** (`src/cms/*.yaml`);
  `src/data/*.ts` er utvikler-fallback.
- Én forside med ankerseksjoner (lav navigasjonsfriksjon for eldre brukere),
  pluss personvernside og 404.
- Skrifter via Google Fonts med system-fallback – **dokumentert akseptert
  avvik** (se `DECISIONS.md` D7).

## Varige regler

- Norsk er standard for all brukervendt tekst.
- Booking eies av **Timma** – ikke bygg egen booking uten ny, tydelig begrunnelse
  (se `DECISIONS.md`).
- **Ingen tredjeparts-innbygging/sporing lastes før aktivt samtykke.** Ny
  tredjepart krever samtidig oppdatering av cookie-register, CSP og
  personvernerklæring (se `AGENTS.md` → «Consent & privacy»).
- Placeholder-innhold skal være strukturelt ærlig og merket (se `TECH_DEBT.md`).
- Ikke regresjoner på tilgjengelighet. Ikke unødvendige avhengigheter.
- Hold dokumentasjonen i denne mappa oppdatert ved strukturelle endringer.

## Nåværende begrensninger

- Priser, produkter og tilbud er **placeholder** – må bekreftes av eier.
- Foto er **stock/illustrasjonsfoto** (lisens uavklart) – byttes til egne bilder.
- Reservasjons-e-post krever engangsoppsett av Brevo (ellers SMS-fallback).
