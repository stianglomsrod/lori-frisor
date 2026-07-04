# HANDOFF – Lori Frisør

For neste agent/utvikler. Les `PROJECT_DNA.md` først, så denne.
Sist oppdatert: 2026-07-04 (branch `feat/proff-oppgradering`).

## Kjøre prosjektet

Krever Node 22+ (`.nvmrc` = 22; utviklet på Node 24, Vercel kjører 22).

```bash
npm install      # installer avhengigheter
npm run dev      # lokal dev-server (http://localhost:4321, Keystatic på /keystatic)
npm run build    # produksjonsbygg (Vercel Build Output + sikkerhetsheadere)
npm run preview  # forhåndsvis bygget
npm run check    # Astro/TypeScript-typesjekk — hold 0/0/0
```

Deploy: Vercel (`@astrojs/vercel`). Push til GitHub → automatisk bygg.
`npm run build` kjører også `scripts/patch-vercel-headers.mjs` som legger
sikkerhetsheadere/CSP inn i `.vercel/output/config.json` (ikke bruk
`vercel.json` – støttes ikke sammen med adapterens Build Output API).

## Status (hva som er gjort på denne branchen)

- ✅ Samtykkeløsning etter Datatilsynets krav: banner + «Vis kart»-gate for
  Google Maps (ingen tredjeparts-cookies før aktivt valg; tilbaketrekking
  fjerner iframen umiddelbart). Verifisert i nettleser.
- ✅ Personvernerklæring på `/personvern` + `/en/privacy` (LORI-FRISØR AS,
  org.nr. 926 980 343 – slått opp i Enhetsregisteret).
- ✅ SEO: `og:image` (generert `public/og.jpg`), Twitter-kort, sitemap m/
  hreflang, gyldig LocalBusiness JSON-LD (Mo–Fr-koder, priceRange, hasMap),
  404-side.
- ✅ Ytelse: hero = eager + fetchpriority; responsive bilder via Vercels
  bildeoptimalisering (`/_vercel/image`-srcset bygges i `Placeholder.astro`).
- ✅ Keystatic-utvidelser: SoMe som liste (TikTok m.m.), åpningsdag som
  select, valgfri Timma-dyplenke per tjeneste, redigerbar avbestillingsregel.
- ✅ Produktreservasjon: dialog-skjema → `/api/reserve` → e-post via Brevo,
  med SMS-fallback. Se «Reservasjonsoppsett» under.
- ✅ Kodehygiene: `sharp` deklarert, innhold flyttet `src/content` → `src/cms`
  (Astro-reservert mappe), JSON-LD escapes, CI-workflow, `.nvmrc`/engines.
- ✅ Compliance-artefakter i `docs/compliance/` (register, cookies, data map,
  UU-sjekkliste, sikkerhetsbaseline, risiko, release gate).

## Reservasjonsoppsett (én gang, ~15 min)

1. Opprett gratis Brevo-konto (brevo.com) og verifiser en avsenderadresse
   (f.eks. `nettside@lorifrisor.no` – krever DNS-verifisering av domenet,
   eller bruk en adresse dere eier).
2. I Vercel-prosjektet → Settings → Environment Variables:
   - `BREVO_API_KEY` = API-nøkkelen (Production)
   - `BREVO_SENDER` = den verifiserte avsenderadressen
   - (valgfritt) `RESERVATION_TO` – ellers brukes e-posten fra Keystatic
3. Redeploy og send en testreservasjon. Uten nøkkel viser siden SMS-lenker
   (bevisst fallback) – ingenting brekker.

## Andre driftspunkter

- **Vercel funksjonsregion:** sett `arn1` (Stockholm) i prosjektinnstillingene
  (Functions → Region) for EØS-nær behandling.
- **Keystatic Cloud:** konfigurert (`cloud.project: "lori/lori-frisor"`), eier
  redigerer på `/keystatic` med e-postinnlogging. Innholds-commits fra Cloud
  ser ut som «Update src/cms/…».
- **Timma-dyplenker:** åpne bestill.timma.no/lorifrisor, klikk deg til en
  tjeneste, kopier adressen (inneholder `?category=…&service=…`) og lim inn i
  Keystatic → Tjenester → «Egen booking-lenke».
- **CI:** `.github/workflows/ci.yml` bygger + typesjekker push/PR mot main.

## Hvor man endrer innhold

Uendret prinsipp: eier bruker Keystatic (`/keystatic`); filene ligger nå i
`src/cms/*.yaml` (flyttet fra `src/content/` som er Astro-reservert).
Fallback-standarder for utviklere: `src/data/*.ts`. UI-mikrotekst:
`src/i18n/ui.ts`. Farger/typografi: `src/styles/global.css`.

## Anbefalte neste steg (prioritert)

1. Release-gaten (`docs/compliance/release_gate.md`): Brevo-test, region,
   MFA, fotolisens, axe-retest, eiers pris-/innholdsbekreftelse.
2. Ekte foto fra salongen (hero, om, produkter) – behold beskrivende alt-tekster.
3. Merge `feat/proff-oppgradering` → main og deploy; kjør Rich Results-test på
   forsiden (Google) og del-forhåndsvisning (Facebook Sharing Debugger).
4. Vurder kundeomtaler/Google-rating som neste tillitslag.
