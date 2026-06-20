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

- **Astro** (statisk, null klient-JS som standard). Komponentbasert, rask,
  tilgjengelig, enkel å deploye og endre innhold i.
- Innhold ligger i `src/data/*.ts` for enkel utskifting.
- Én forside med ankerseksjoner (lav navigasjonsfriksjon for eldre brukere).
- Skrifter via Google Fonts med system-fallback (degraderer pent).

## Varige regler

- Norsk er standard for all brukervendt tekst.
- Booking eies av **Timma** – ikke bygg egen booking uten ny, tydelig begrunnelse
  (se `DECISIONS.md`).
- Placeholder-innhold skal være strukturelt ærlig og merket (se `TECH_DEBT.md`).
- Ikke regresjoner på tilgjengelighet. Ikke unødvendige avhengigheter.
- Hold dokumentasjonen i denne mappa oppdatert ved strukturelle endringer.

## Nåværende begrensninger

- Priser, åpningstider, produkter og tilbud er **placeholder** – må bekreftes.
- Ingen ekte bilder ennå (SVG-placeholdere brukes).
- Én side; ingen CMS. Innhold redigeres i `src/data`.
