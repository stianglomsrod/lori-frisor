# Risiko- og tiltaksregister – Lori Frisør nettside

**Prosjekt:** Lori Frisør nettside  **Sist oppdatert:** 2026-07-04
Sannsynlighet (S) og konsekvens (K): 1 lav – 5 høy. Nivå = S × K.

| # | Risiko | Kategori | S | K | Nivå | Tiltak | Restrisiko | Eier | Status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Google Fonts eksponerer besøkers IP for Google uten samtykke | Personvern | 3 | 2 | 6 | Dokumentert som akseptert avvik (DECISIONS D7) med personverntekst; alternativ (self-host) beskrevet som exit | Lav | Utvikler | Akseptert av kunde/utvikler 2026-07-04 |
| 2 | Kart-iframe setter Google-cookies | Personvern | – | – | – | **Lukket:** lastes kun etter aktivt samtykke; tilbaketrekking fjerner iframe | – | Utvikler | Lukket |
| 3 | Spam/misbruk av reservasjonsskjema | Sikkerhet | 3 | 2 | 6 | Honeypot, rate-limit, validering, origin-sjekk; Brevo-kvote begrenser volum | Lav | Utvikler | Tiltak aktive |
| 4 | Stockfoto med uavklart lisens i produksjon | Regulatorisk/IP | 2 | 3 | 6 | **Delvis avklart 2026-07-09:** hero-salon.jpg identifisert via EXIF som Pexels-foto av Max Vakhtbovych (pexels.com/@max-artbovich) – Pexels-lisens tillater kommersiell bruk uten attribusjon. Kreditering bevart her; EXIF (fotografnavn) strippet tapsfritt fra filen. Gjenstår: about-salon.jpg (viser personer!) og produktfotoene har ukjent kilde – verifiser eller erstatt med egne foto | Lav–middels | Utvikler | Delvis avklart – rest på release-gate |
| 5 | Eier redigerer innhold som knekker bygget | Drift | 2 | 3 | 6 | Keystatic validerer felt (select for dag m.m.); CI bygger hver push; fallback-innhold i `src/data` | Lav | Utvikler | Tiltak aktive |
| 6 | Brevo-avsender ikke verifisert → reservasjoner feiler stille for kunden | Drift | 2 | 3 | 6 | UI viser feilmelding + SMS-fallback ved feil; oppsettsjekk i HANDOFF; test ved lansering | Lav | Utvikler | Åpen – på release-gate |
| 7 | Placeholder-priser/-tilbud oppfattes som reelle | Forbruker | 2 | 3 | 6 | Merket i innhold + TECH_DEBT; eier bekrefter priser før lansering (release-gate) | Lav | Eier | Åpen – på release-gate |
| 8 | Vercel-funksjoner kjører i USA-region (persondata i transitt) | Personvern | 2 | 2 | 4 | Sett funksjonsregion arn1 i Vercel-dashbordet (dokumentert i HANDOFF) | Lav | Utvikler | Åpen – på release-gate |
| 9 | CSP brekker fremtidige tredjeparter (f.eks. Instagram-embed) | Drift | 2 | 2 | 4 | CSP samlet i ett script med kommentarer; ny tredjepart = bevisst CSP-endring + cookie-registeroppdatering | Lav | Utvikler | Tiltak aktive |

**Åpne høyrisiko-punkter (nivå ≥ 15):** ingen.
**Beslutninger:** #1 akseptert (kundens ønske om å beholde Google Fonts, dokumentert med hvorfor + exit-plan). Øvrige åpne punkter reduseres via release-gaten.
