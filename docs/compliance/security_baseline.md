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
