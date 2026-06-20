# RESEARCH_NOTES – Lori Frisør

Forskning gjort før designbeslutninger. Fokus: hva som faktisk passer Lori, ikke
trend-jag.

## 1. Nåværende Lori-touchpoint (Timma-widget)

URL: https://bestill.timma.no/lorifrisor — inspisert visuelt (skjermbilde).
Det er en **ren booking-widget**, ikke en nettside. Se `VISUAL_REVIEW.md` for
full vurdering. Kort: sterk på transaksjon, fraværende på merkevare, historie,
priser, produkter, tillit og oppdagelse.

Forretningsdata hentet derfra (fasit for `src/data/site.ts`):

- Adresse: Torget 2, 1767 Halden · Tlf: 45050677 · E-post: cindy@lori.no
- Facebook: /LoriFrisor · Instagram: /lorifrisor
- Tjenester: Klipp, Farge, Striper/Balayage/foilayage, Bleking, Skjegg,
  Hår extension, Vask og føhn, Vipper/bryn, Hodemassasje, Hårkur
- Avbestilling: senest 24 t før, ellers full belastning.

## 2. Timma som selskap/plattform (research)

- Timma Oy (Helsinki). Nordisk (FI, SE, EE, NO, LV, DK). Del av **EG** (2024).
- ~9 000 salonger, 24 000 aktive fagpersoner, 11 mill. bookinger, 1,1 mill brukere.
- **Timma Pro** = alt-i-ett: online booking, kassesystem (POS), varelager,
  påminnelser/bekreftelser, **Timma Pay** (betalingsterminal, Klarna, gavekort),
  markedsføring og **Markedsplass** (kanal som gir ~+5 700 kr/mnd per behandler).
- 30 dagers gratis prøve, **ingen bindingstid**. NPS 89,4 %.
- Har eget nettside-produkt «Genie Nettsider» (konkurrent-kontekst).

**Implikasjon:** Timma er en moden, utbredt, lav-risiko bookingmotor med
betaling/lager/påminnelser innebygd. Egen booking er ikke begrunnet nå. Nettsiden
skal være markedsførings-/oppdagelseslaget som peker inn i Timma.
(Se beslutning i `DECISIONS.md`.)

## 3. Mønstre fra gode salong-/lokale tjenestesider (destillert)

Gjennomgang av vanlige beste praksis for frisør/barber/skjønnhet og lokale
tjenestebedrifter med sterk konvertering:

**Det som funker (tatt i bruk):**

- Vedvarende, åpenbar primær-CTA «Bestill time» (header + hero + gjentatt).
- Hero med klart verdiløfte + sted, ikke bare et bilde.
- Tidlig «trust bar»: adresse, telefon, åpningstider innen rekkevidde.
- Tjenester som skannbare kort med kort nytteorientert tekst.
- **Transparente priser** (eller «fra»-priser) bygger tillit, særlig lokalt.
- Tilbud som tydelige, tidsavgrensede kort.
- Produkter som «ta-med-hjem»-utvalg knyttet til salongens autoritet.
- Sterk kontakt/finn-oss-seksjon med kart-lenke, klikkbar telefon, åpningstider.
- LocalBusiness structured data for lokalt søk.

**Anti-mønstre (unngått):**

- Karuseller/sliders med viktig innhold skjult.
- Auto-spillende video / tung animasjon.
- Vage «Velkommen»-helter uten verdi eller handling.
- Skjult pris bak «kontakt oss» uten noen veiledning.
- Lav kontrast «elegant» grå-på-grå tekst.
- Cookie-/popup-vegger før innhold.
- Egenbygd booking som dupliserer en velfungerende plattform.

## 4. Tilgjengelighet / universell utforming (anvendt)

Basert på WCAG 2.2 AA-praksis:

- Semantisk HTML, landemerker (`header/main/nav/footer/section`), logisk H1→H3.
- Synlige fokusmarkører, hopp-til-innhold-lenke, tastaturvennlig meny (Esc lukker).
- Kontrast AA: gull brukes som _fyll_ med mørk tekst; gull-_tekst_ erstattes av
  mørkere bronse på lys bakgrunn for å bestå kontrast.
- Berøringsmål ≥ 44px, mobil-først, `prefers-reduced-motion` respektert.
- Dekorative bilder/ikoner `aria-hidden`; informativt får tekstalternativ.

## 5. Produktsalg-problemet (innsikt → grep)

Produktsalg er svakt. Full netthandel/click-and-collect er ikke begrunnet ennå
(drift, betaling, lager, retur). Valgt **lettere førstesteg**: et kuratert
produktutvalg med «**Reserver – hent i salong**» (forhåndsutfylt SMS/telefon,
betaling i salong). Skaper interesse og data uten netthandel-byrde, og kan senere
kobles mot Timma sitt varelager. (Se `DECISIONS.md`.)
