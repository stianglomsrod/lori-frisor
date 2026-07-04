# Compliance-register – Lori Frisør

> Register over regulatoriske vurderinger (mal fra norwegian-software-guardrails).
> Ikke juridisk rådgivning.

**Prosjekt:** Lori Frisør nettside  **Samlet trafikklys:** 🟡 GUL (lav – på vei mot 🟢 når release-gaten er signert)  **Sist oppdatert:** 2026-07-04

| # | Område | Relevant? | Farge | Vurdering / status | Nødvendig tiltak/dokument | Ansvarlig | Frist |
|---|---|---|---|---|---|---|---|
| 1 | Personvern – roller | Ja | 🟢 | LORI-FRISØR AS (org.nr. 926 980 343) er behandlingsansvarlig for nettsiden. Studio/utvikler drifter på vegne av salongen. Timma er selvstendig behandlingsansvarlig for booking. | Personvernerklæring publisert (`/personvern`, `/en/privacy`) | Eier + utvikler | Gjort |
| 2 | Databehandleravtale | Ja | 🟡 | Underleverandører: Vercel (hosting, DPA aksepteres i vilkår), Brevo (e-post, DPA i vilkår), Google (fonts/maps – ikke databehandler, egen behandlingsansvarlig for maps-cookies), Keystatic Cloud + GitHub (kun eiers redigeringsdata). | Bekreft at Vercel-/Brevo-DPA er akseptert på kontoene ved oppsett | Utvikler | Før lansering |
| 3 | DPIA-screening | Ja | 🟢 | Lav risiko: ingen særlige kategorier, ingen systematisk overvåking, minimal databehandling (reservasjons-e-post). Full DPIA ikke nødvendig. | Screening dokumentert her | Utvikler | Gjort |
| 4 | Tredjelandsoverføring | Ja | 🟡 | Vercel/Google i USA (SCC og/eller EU-U.S. DPF). Brevo i EU. Vercel-funksjoner anbefales satt til region arn1 (Stockholm) i dashbordet. | Sett funksjonsregion i Vercel-dashbordet; noter DPF-status ved oppsett | Utvikler | Før lansering |
| 5 | Cookies/sporing + samtykke | Ja | 🟢 | Kun Google Maps er ikke-nødvendig tredjepart. Lastes utelukkende etter aktivt samtykke (banner eller «Vis kart»). Avslag like enkelt som aksept; tilbaketrekking i footer fjerner iframen umiddelbart. Ingen analytics/pixels. | `cookie_register.md` vedlikeholdes ved endringer | Utvikler | Løpende |
| 6 | Universell utforming (WCAG) | Ja | 🟢 | WCAG 2.2 AA-rettet: semantikk, fokus, kontrast, reduced-motion, skjema med etiketter, dialog med fokushåndtering. Axe: 0 brudd (før endringer); re-test etter denne runden anbefales. | `accessibility_checklist.md` + re-kjør axe før lansering | Utvikler | Før lansering |
| 7 | IKT-sikkerhet (baseline) | Ja | 🟢 | Statisk side + ett endepunkt. Sikkerhetsheadere (CSP m.fl.) injiseres i Vercel-config. Secrets kun som env-vars. Se `security_baseline.md`. | MFA på GitHub/Vercel/Keystatic/Brevo-kontoer bekreftes | Eier + utvikler | Før lansering |
| 8 | Digitalsikkerhetsloven | Nei | – | Frisørsalong er ikke omfattet virksomhet. | – | – | – |
| 9 | KI-forordningen | Nei | – | Ingen KI-funksjoner i løsningen. | – | – | – |
| 10 | Medisinsk utstyr / helse | Nei | – | Ingen helsefunksjoner. | – | – | – |
| 11 | Betaling/finans | Nei | – | Ingen betaling på siden; reservasjon betales i salong, booking hos Timma. | – | – | – |
| 12 | DSA / plattform / UGC | Nei | – | Ingen brukergenerert innhold. | – | – | – |
| 13 | Forbruker / markedsføring | Ja | 🟢 | «Fra»-priser tydelig merket veiledende; tilbud med fintrykk. Ingen nyhetsbrev/epost-markedsføring (ville krevd samtykke, mfl. § 15). | Priser bekreftes av eier før publisering | Eier | Før lansering |
| 14 | Barn / skole | Nei | – | Allmenn målgruppe, ingen barnespesifikke tjenester eller data. | – | – | – |
| 15 | eID / eIDAS | Nei | – | Ingen innlogging for sluttbrukere. | – | – | – |
| 16 | IP / opphavsrett / lisens | Ja | 🟡 | Foto i `public/images/` er stockbilder med ukjent lisensopphav (arvet i repoet). Merket «Illustrasjonsfoto» i alt-tekst. | Verifiser lisens eller erstatt med egne/lisensierte foto før lansering | Utvikler | Før lansering |
| 17 | Offentlig anskaffelse | Nei | – | Privat kunde. | – | – | – |

**Åpne punkter før 🟢:** rad 2 (DPA-bekreftelser), 4 (funksjonsregion + DPF-notat), 6 (axe-retest), 7 (MFA-bekreftelse), 13 (prisbekreftelse), 16 (fotolisens). Alle ligger også i `release_gate.md`.
