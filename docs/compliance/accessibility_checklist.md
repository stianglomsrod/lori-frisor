# WCAG / universell utforming – sjekkliste og testlogg

**Prosjekt:** Lori Frisør nettside  **Målnivå:** WCAG 2.2 AA  **Testet av:** Claude (agent) + tidligere axe-skann  **Dato:** 2026-07-04

| Område | Kontrollpunkt | Metode | Status | Avvik/plan |
|---|---|---|---|---|
| Persepsjon | Tekstalternativer for bilder/ikoner | Manuell | ✅ | Stockfoto merket «Illustrasjonsfoto: …» i alt-tekst; dekor er `aria-hidden`; SVG-plassholdere `role="presentation"` |
| Persepsjon | Kontrast tekst/bakgrunn (AA) | Kontrastverktøy + axe | ✅ | Gull kun som fyll m/ mørk tekst; bronse for gulltekst på lys bunn; mørk modus egne tokens |
| Persepsjon | Fungerer uten farge alene | Manuell | ✅ | Status/feil formidles med tekst, ikke kun farge |
| Betjening | Full tastaturnavigasjon, ingen felle | Tastatur | ✅ | Meny med Esc-lukking + fokusretur; `<dialog>` gir innebygd fokushåndtering og Esc; banner er ikke-blokkerende |
| Betjening | Synlig fokusindikator | Manuell | ✅ | Global `:focus-visible` med høykontrast-token (egen mørk modus-variant) |
| Betjening | Klikkmål store nok | Manuell/mobil | ✅ | Knapper ≥44 px; kompakt header-CTA 40 px + luft (aksepteres, over WCAG 2.2-minimum 24 px) |
| Forståelig | Skjemaetiketter og feilmeldinger | Manuell | ✅ | Alle felt har `<label for>`; feil vises i `role="status"`-region med tekst + alternativ handling (SMS) |
| Forståelig | Konsistent navigasjon + språkattributt | Manuell | ✅ | `<html lang="nb"/"en">` per rute; hreflang-par; språkbytte beholder anker |
| Robust | Gyldig semantikk / ARIA korrekt | Kodegjennomgang | ✅ | Landemerker, tabeller m/ caption+scope, `aria-expanded/controls`, `aria-current`, stretched-link-mønster m/ `aria-describedby` |
| Robust | Skjermlesergjennomgang av hovedflyt | Skjermleser | ⬜ | Anbefalt før lansering (NVDA: forside → booking, reservasjonsdialog, samtykke) |
| Mobil | Responsiv, zoom uten tap | Mobilviewport | ✅ | Verifisert 375 px; ingen horisontal scroll; banner stabler knapper |
| Nytt innhold | Samtykkebanner | Manuell | ✅ | Ikke-modal region m/ `aria-label`; åpnes via footer med fokus til første knapp; ingen fokusfelle |
| Nytt innhold | Kart-plassholder | Manuell | ✅ | Ekvivalent alternativ alltid tilgjengelig («Åpne kartet i Google Maps»-lenke), fungerer uten JS |
| Nytt innhold | Lenker som åpner ny fane | Manuell | ✅ | Skjult «(åpnes i ny fane)»-hint på alle `target="_blank"`-lenker |

**Kritiske avvik lukket eller akseptert med plan:** ja – ingen kjente kritiske avvik.
**Gjenstående før lansering:** kjør axe-core på nytt (ny DOM) + én NVDA-gjennomgang. Loggfør resultatet her.
**Tilgjengelighetserklæring (offentlig sektor):** ikke påkrevd (privat virksomhet), men siden følger kravene i praksis.
