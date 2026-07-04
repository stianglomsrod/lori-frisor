# Cookie- og sporingsregister – Lori Frisør

> Ikke-nødvendige scripts lastes **ikke** før gyldig samtykke.

**Prosjekt:** Lori Frisør nettside  **Sist oppdatert:** 2026-07-04

| Navn | Type | Kategori | Formål | Leverandør | Varighet | Part | Krever samtykke? | Lastes før samtykke? |
|---|---|---|---|---|---|---|---|---|
| `lori-consent-v1` | localStorage | Strengt nødvendig | Husker besøkerens samtykkevalg | Egen (førstepart) | Til nettleserdata slettes | Førstepart | nei | ja (er selve valget) |
| Google Maps-kapsler (NID m.fl.) | Cookies (i iframe) | Funksjonell (tredjepart) | Kart i kontaktseksjonen | Google | Styres av Google | Tredjepart | ja | **nei** – iframen injiseres først etter samtykke |
| Google Fonts | – (ingen cookies) | – | Skrifttyper; IP-adresse eksponeres for Google ved lasting | Google | – | Tredjepart | nei (ikke kapsel; omtalt i personvernerklæringen) | ja (fonter lastes alltid – dokumentert akseptert avvik, se DECISIONS D7) |
| Keystatic (kun `/keystatic`) | localStorage/cookies | Strengt nødvendig (admin) | Innlogging/økt for eierens redigeringsverktøy | Keystatic Cloud | Økt | Tredjepart | nei (verktøy for eier, ikke besøkende) | kun på admin-ruten |

Ingen analyse-, markedsførings- eller sporingsteknologi er i bruk.

## Samtykkemekanisme

- **Løsning:** Egenbygd, minimal banner (`src/components/ConsentBanner.astro`) + kontekstuell «Vis kart»-knapp i kontaktseksjonen.
- **Standard = avvis ikke-nødvendige:** ja – ingenting tredjeparts lastes før aktivt valg.
- **Like enkelt å avslå som å godta:** ja – to likeverdige knapper, ett klikk hver, ingen skjulte valg.
- **Trekke tilbake:** ja – «Administrer informasjonskapsler» i footer åpner banneret igjen; ved avslag fjernes kart-iframen umiddelbart (verifisert).
- **Logg av samtykke:** valget (ja/nei + tidsstempel) lagres kun lokalt hos besøkeren (`lori-consent-v1`). Ingen serverlogg – dataminimering; tilstrekkelig for denne risikoprofilen.

## Verifikasjon (2026-07-04)

- Bygget HTML inneholder **ingen** `<iframe>`/tredjeparts-script før samtykke (grep mot `.vercel/output/static/index.html`: 0 treff).
- Aksept → iframe injiseres; avslag via footer → iframe fjernes og plassholder gjenopprettes (testet i nettleser).
