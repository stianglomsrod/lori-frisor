# TECH_DEBT – Lori Frisør

Placeholdere, snarveier, utsatte funksjoner og kjente begrensninger.
Sist oppdatert: 2026-07-04 (branch `feat/proff-oppgradering`).

## Må gjøres før/ved lansering (se også `docs/compliance/release_gate.md`)

- **Brevo-oppsett** for reservasjonsskjemaet: opprett konto, verifiser
  avsenderadresse, sett `BREVO_API_KEY` (+ ev. `BREVO_SENDER`) i Vercel.
  Uten nøkkel viser siden SMS-lenker (bevisst fallback). Send en testreservasjon.
- **Vercel funksjonsregion**: sett til `arn1` (Stockholm) i prosjektinnstillingene
  (adapteren styrer ikke region; dashbord-innstillingen gjelder).
- **Fotolisens**: bildene i `public/images/` er stock med uavklart opphav (arvet).
  Verifiser lisens eller erstatt med egne/lisensierte foto. Alt-tekster er merket
  «Illustrasjonsfoto» inntil ekte foto er på plass.
- ~~Axe-retest~~ ✅ utført 2026-07-04: 0 brudd på 4 tilstander (én arvet
  kontrastfeil i footer funnet og fikset). NVDA-gjennomgang anbefales fortsatt
  (manuell). Logg i `docs/compliance/accessibility_checklist.md`.
- **MFA** bekreftes på GitHub/Vercel/Keystatic Cloud/Brevo.
- **Timma-dyplenker**: eier (eller Stian) henter lenke per tjeneste fra
  bestill.timma.no og limer inn i Keystatic → «Egen booking-lenke».

## Placeholder-innhold (må bekreftes/erstattes før publisering)

- **Priser** (`src/cms/*/services.yaml`) er veiledende antakelser fra Timma-profilen.
- **Produkter** er fiktive («Placeholder-merke»); **tilbud** er eksempler.
- **Foto**: stockbilder (se over) – hero/om/produkter bør få ekte bilder.
- **Om-/hero-tekst** er utkast – gjennomgås med eier.

## Bevisste forenklinger (ikke feil, men verdt å vite)

- **Google Fonts eksternt** = akseptert avvik (kundens valg). Dokumentert i
  `DECISIONS.md` D7 + risikoregister #1. Exit: Fontsource (~1 time).
- **Samtykkevalg logges kun hos besøkeren** (localStorage) – dataminimering;
  ingen server-side samtykkelogg på denne risikoprofilen.
- **Rate-limit i `/api/reserve`** er per serverless-instans (best effort).
  Honeypot + Brevo-kvote tar resten. Oppgrader til KV-basert limit ved behov.
- **Mobilmeny uten full fokus-felle** – panel er ikke-modalt; Esc lukker.
- **`p { max-width: 60ch }`** i global.css gjelder alle `<p>`.
- **CSP** settes ved bygg (`scripts/patch-vercel-headers.mjs`). Ny tredjepart
  (f.eks. Instagram-embed) krever bevisst CSP-endring + cookie-registeret.

## Utsatte funksjoner (mulig neste fase)

- Ekte click-and-collect mot Timma-varelager (kun hvis produktsalget tar av).
- Galleri / Instagram-feed (NB: ny tredjepart → samtykke + CSP + cookie-register).
- Kundeomtaler / Google-rating.
- Flere sider (egen prisside) om innholdet vokser.
- Analyse (i så fall privacy-first, f.eks. selv-hostet Plausible/Umami, og
  fortsatt uten cookies – ellers samtykke).

## Kjente begrensninger

- Ingen e2e-tester (statisk markedsside; CI dekker typer + bygg).
- `npm audit` feiler i dette utviklingsmiljøet fordi npm-registry er satt til
  `http://` (miljøproblem, ikke prosjektet): fiks med
  `npm config set registry https://registry.npmjs.org/`.
- Node 24 lokalt vs. Node 22 på Vercel (advarsel i bygg; `.nvmrc` sier 22).
