# Sikkerhetsbaseline – Lori Frisør nettside

> Basert på NSM grunnprinsipper / ISO 27001-prinsipper, forenklet for en statisk
> markedsside med ett API-endepunkt og et eier-CMS.

**Prosjekt:** Lori Frisør nettside  **Ansvarlig:** Utvikler (Stian)  **Sist oppdatert:** 2026-07-04

## Identitet og tilgang
- [ ] MFA på GitHub-, Vercel-, Keystatic Cloud- og Brevo-kontoene *(bekreftes av kontoeiere før lansering)*
- [x] Least privilege: eier har kun Keystatic-tilgang (innhold), ikke repo/infrastruktur
- [x] Ingen delte kontoer; eier inviteres på egen e-post i Keystatic Cloud
- [x] `/keystatic` krever Keystatic Cloud-innlogging i produksjon (lokal modus kun i dev)

## Data og hemmeligheter
- [x] TLS overalt (Vercel-standard); ingen data i ro utover e-post hos salongen
- [x] Secrets kun som miljøvariabler i Vercel (`BREVO_API_KEY` m.fl.); `.env` er gitignorert; `.env.example` dokumenterer uten verdier
- [x] Dataminimering: reservasjonsskjemaet samler kun det salongen trenger; ingen database
- [x] Ingen produksjonsdata brukes som testdata

## Applikasjonsvern
- [x] Sikkerhetsheadere injiseres i Vercel-config ved bygg (`scripts/patch-vercel-headers.mjs`): nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy + CSP på markedssidene (keystatic/api unntatt)
- [x] `/api/reserve`: same-origin-sjekk, honeypot, feltlengder, telefon-/e-postvalidering, enkel rate-limit per IP, stille OK til bots
- [x] JSON-LD escapes (`</script>`-injeksjon via CMS-felt nøytralisert)
- [x] Eksterne lenker med `rel="noopener"`

## Logging og deteksjon
- [x] Vercel-funksjonslogger dekker endepunktet (feil logges med `console.error`)
- [ ] Varsling ved gjentatte 5xx *(valgfritt: slå på Vercel-varsler)*

## Motstandsdyktighet
- [x] Innhold versjonert i git (Keystatic committer alle endringer) → full historikk/rollback
- [x] Statisk arkitektur: forsiden fungerer selv om funksjoner feiler; reservasjon faller tilbake til SMS
- [x] Avhengigheter deklarert (inkl. `sharp`); Dependabot/`npm audit` anbefales kjørt jevnlig
- [x] CI (GitHub Actions) bygger og typesjekker hver push/PR mot main

## Hendelseshåndtering
- [x] Kontaktpunkt: utvikler (repo-eier) + salong (cindy@lori.no)
- [x] Rutine: ved mistanke om brudd på persondata – vurder varslingsplikt (72 t til Datatilsynet), dokumentér i dette registeret
- [x] Rollback: revert commit → Vercel redeployer automatisk

**Restpunkter før lansering:** MFA-bekreftelse på alle kontoer; vurder Vercel-varsling.

## Sikkerhetsaudit (secure-dev-guardrails, 2026-07-09)

Reaktiv gjennomgang av angrepsflatene (API-endepunkt, admin, secrets, supply
chain, injection). Ikke en erstatning for ekstern pentest.

**Solid:** ingen SQL/NoSQL/kommando-injection-flate (ingen DB/shell); secrets
kun server-side (`BREVO_API_KEY` ikke `PUBLIC_`, ikke i klient-bundle, ikke i
git-historikk); e-postmottaker ikke bruker-styrt (ingen open relay); JSON-LD
`</script>`-escaping på plass; e-post-HTML escapes; input-validering med
allowlist-regex + lengdetak + honningkrukke; trygg feilhåndtering (ingen
stacktrace til klient); sikkerhetsheadere + CSP. Astro-XSS-CVE-ene for
`define:vars`/navngitte slots/server islands er **ikke reachable** (funksjonene
brukes ikke – verifisert).

**Funn og status:**
- [MIDDELS] `x-astro-path` path-override (GHSA-mr6q-rp88-fx84) i
  `@astrojs/vercel@8` → patchet i `@astrojs/vercel@10.0.2` (krever Astro 6).
  Berører on-demand-ruter (`/api/reserve`, `/keystatic`). Begrenset utnyttbarhet
  her (ingen sti-basert autz å omgå; Keystatic bruker Cloud-OAuth). **Anbefalt:
  koordinert oppgradering Astro 5→6 + vercel 8→10 (innen Keystatics peer-range,
  stopp før 7) med egen testrunde.** Åpen – eierbeslutning.
- [LAV→FIKSET] Origin-sjekk i `/api/reserve` kunne omgås ved å utelate
  Origin-header. Strammet: manglende Origin avvises nå (403). Verifisert.
- [LAV→FIKSET] Manglet eksplisitt body-størrelsestak før parsing. Lagt til
  8 kB-tak (413). Verifisert.
- [LAV] Takstgrense er per serverless-instans (best effort). Akseptert;
  Brevo-kvote + honningkrukke begrenser skade. Vurder KV/captcha ved behov.
- [INFO] CSP bruker `script-src 'unsafe-inline'` (nødvendig for Astros inline-
  scripts). Hardening: nonce/hash-basert CSP. Lav prioritet (ingen bruker-HTML).
- [INFO] Dev-only CVE-er (yaml ReDoS, esbuild fil-lesing) – kun byggkjede, ikke
  prod-runtime.
