# VISUAL_REVIEW – Lori Frisør

Egen visuell gjennomgang av (A) eksisterende Timma-touchpoint og (B) den nye siden.
Skjermbilder ligger i `docs/screenshots/`.

## A. Vurdering av nåværende Timma-side (bestill.timma.no/lorifrisor)

Inspisert visuelt via skjermbilde + tilgjengelighetssnapshot.

**Hva den gjør bra**

- Effektiv, fokusert bookingflyt (5 steg: tjeneste → tid → info → bekreft).
- Tydelig stegindikator; mobilvennlig; språkbytte (NO/EN).
- Kontaktinfo og avbestillingsregler synlige.

**Hvor den kommer til kort (som «nettside» betraktet)**

- **Ingen merkevare:** kun teksten «Lori Frisør», ingen logo, farger eller stemning.
- **Ingen historie/tillit:** intet «om oss», bilder, omtaler eller stedsfølelse.
- **Ingen priser** vist før man er inne i flyten.
- **Ingen produkter / tilbud / oppdagelse.**
- **Ingen åpningstider/kart** ved første øyekast.
- Fungerer godt som _booking-endepunkt_, men ikke som salongens _nettside_.

**Konklusjon:** Behold Timma til transaksjon; bygg et markedsførings-/oppdagelses-
lag rundt det (denne siden). Se `DECISIONS.md` D1.

## B. Gjennomgang av den nye siden

Bygget, kjørt lokalt og inspisert på desktop og mobil.

### Styrker

- **Merkevare:** gull/kull + saks-logo gir umiddelbar gjenkjennelse og premium ro.
- **Hierarki:** stor serif-hero med tydelig verdiløfte + to CTA-er; logisk flyt
  nedover siden.
- **Lesbarhet:** 18px basis, god linjehøyde, høy kontrast.
- **CTA-synlighet:** gull «Bestill time» i header, hero, priser, tilbud, kontakt,
  footer.
- **Mobil:** ren stablet layout, berøringsvennlig meny, prominente knapper.
- **Oppdagelse:** tjenestekort, prisbord, tilbudskort (mørke m/ gull), produktkort
  med «Reserver».

### Svakheter funnet → endringer gjort under review

1. **Mobilmeny-ikon** viste «>» i åpen tilstand i stedet for ren «X».
   → Fikset kryss-transform i `Header.astro`.
2. **Footer-CTA strøk på kontrast** (axe «serious»): generell `.site-footer a`-regel
   overstyrte knappens mørke tekst → lys tekst på gull.
   → Scopet til `.site-footer a:not(.btn)` i `Footer.astro`. Axe: 0 brudd etterpå.
3. Tidlig terrakotta-palett erstattet med salongens **gull/kull** etter at eier
   delte logofiler (mer autentisk og gjenkjennbart).

### Automatisk tilgjengelighetsskann (axe-core, WCAG 2.0/2.1/2.2 A+AA)

- **0 violations**, 28 passes.
- «Incomplete» (axe kunne ikke auto-avgjøre) gjaldt kun tekst over gradient/bilde.
  Manuelt verifisert kontrast består AA:
  - Hero-tekst på lys gradient ≈ 13:1 (ink) / 5,2:1 (bronse aksent, stor tekst).
  - Tilbudskort hvit tekst på mørk gradient ≈ 9–12:1; fintrykk ≈ 5,7:1.
  - Resten er `aria-hidden` dekor (placeholder-tagger, pil-spans).

### Gjenstående visuelle risikoer / åpne spørsmål

- SVG-placeholdere er bevisst abstrakte; ekte foto vil løfte førsteinntrykket
  betydelig (særlig hero og produkter).
- Priser/åpningstider er placeholder og må bekreftes før publisering.
- Desktop-bredde i det innebygde nettleserpanelet var ustabil å fange (DPR-skala);
  desktop-hero og full side er verifisert, men en ekstern visuell QA på 1440px
  anbefales før lansering.

## Skjermbilder

- `docs/screenshots/desktop-hero.png` – desktop header + hero
- `docs/screenshots/mobile-hero.png` – mobil header + hero
- `docs/screenshots/mobile-menu.png` – åpen mobilmeny (tilgjengelig)
- `docs/screenshots/full-page.png` – hele forsiden

## C. Verifisering av proff-oppgraderingen (2026-07-04, i nettleser)

Interaktivt testet i dev-server (desktop + 375 px mobil, mørk modus):

- **Samtykkebanner:** vises kun ved første besøk; «Godta alle» og «Kun
  nødvendige» er likeverdige (ett klikk hver); valget lagres
  (`lori-consent-v1`) og banneret vises ikke igjen.
- **Kart-gate:** uten samtykke = ingen `<iframe>` i DOM (også bekreftet i bygget
  HTML: 0 treff). «Vis kart» gir kontekstuelt samtykke → iframe med riktig
  tittel/adresse. Footer → «Administrer informasjonskapsler» → «Kun
  nødvendige» **fjerner iframen umiddelbart** og gjenoppretter plassholderen.
- **Reservasjonsdialog:** åpner med produktnavn forhåndsutfylt, fokus til
  Navn-feltet, alle felt med etiketter; sendefeil (uten Brevo-nøkkel) gir norsk
  feilmelding i `role="status"` + fungerende SMS-reservelenke; submit
  reaktiveres.
- **Mobilheader:** kompakt gull «Bestill» synlig ved siden av Meny-knappen;
  banner-knappene stabler pent på smal skjerm.
- **Språkbytte på personvernsiden** peker riktig på `/en/privacy/`.
- **Konsoll:** ingen feil eller advarsler.
- **Bygget HTML:** gyldig JSON-LD `openingHours` (Mo–Fr + normaliserte
  klokkeslett), `priceRange`, `og:image`/Twitter-kort, `srcset` mot
  `/_vercel/image`, hero med `fetchpriority="high"`, 0 «Plassholder»-badges
  over foto, sitemap med hreflang (404 ekskludert).
