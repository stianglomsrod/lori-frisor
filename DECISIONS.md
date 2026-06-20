# DECISIONS – Lori Frisør

Større produkt-/UX-/tekniske beslutninger med begrunnelse.

## D1. Booking: behold Timma, integrer via dyp-lenke (IKKE egen booking)

**Beslutning:** Nettsiden bygger ikke egen bookingflyt. Alle «Bestill time»-CTA-er
peker til den eksisterende Timma-widgeten (`bestill.timma.no/lorifrisor`).

**Vurderte alternativer:**

1. Behold Timma + lenke ✅ (valgt)
2. Delvis innebygd Timma (iframe i siden)
3. Egen booking ❌

**Begrunnelse (kost/nytte vs. forretningsverdi):**

- **Driftsbyrde / ansattflyt:** Timma er allerede salongens arbeidsverktøy
  (kalender, kasse, varelager, påminnelser). Egen booking ville splittet flyten.
- **Pålitelighet:** Moden plattform (9 000+ salonger, 11 mill. bookinger).
- **Kundekjennskap:** Eksisterende kunder kjenner allerede flyten.
- **Tid til verdi / vedlikehold:** Marketing-laget kan leveres raskt; ingen
  betaling/avbestilling/no-show-logikk å bygge og vedlikeholde.
- **Lock-in:** Timma har ingen bindingstid; lav risiko.
- **Kompleksitet vs. verdi:** Egen booking gir ingen forretningsgevinst nå.
- iframe-innbygging (alt. 2) ble valgt bort pga. dårligere mobil-UX, høyde-/scroll-
  problemer og reCAPTCHA/3.parts-cookies. Dyp-lenke (ny fane) er enklest og mest
  robust. Kan revurderes om Timma tilbyr et stabilt embed.

## D2. Stack: Astro (statisk)

**Beslutning:** Astro, statisk output, null klient-JS som standard.
**Begrunnelse:** Innholdsdrevet marketing-side → ytelse, tilgjengelighet og SEO er
viktigst. Astro gir komponentstruktur + nær null JS + enkel statisk deploy + lett
innholdsutskifting. Kun ~1 liten script (mobilmeny). Ingen tung rammeverk-runtime.

## D3. Informasjonsarkitektur: én side med ankerseksjoner

**Beslutning:** Forside med Hero → Trust → Tjenester → Priser → Tilbud → Produkter
→ Om → Kontakt. Header-nav scroller til ankere.
**Begrunnelse:** Lav navigasjonsfriksjon for eldre brukere; alt er «ett sveip unna».
Lett å utvide til egne sider senere uten å rive om.

## D4. Produktsalg: «Reserver – hent i salong» (ikke netthandel ennå)

**Beslutning:** Kuratert produktutvalg med reservasjon via forhåndsutfylt SMS/tlf;
betaling skjer i salongen.
**Begrunnelse:** Løser «svakt produktsalg» med et lett førstesteg uten netthandel-
byrde (betaling, lager, frakt, retur). Skaper interesse + signal. Kan senere
oppgraderes til ekte click-and-collect, ev. mot Timma sitt varelager.

## D5. Merkevare & logo: gull + kull, nytegnet saks-logo

**Beslutning:** Adopter salongens faktiske identitet (gull/kull, serif, saks) i
stedet for en generisk palett. Logoen er nytegnet som ren SVG med **saks-motiv
beholdt** for gjenkjennelse hos eier.
**Begrunnelse:** Autentisk og gjenkjennbart; SVG er skarp, lett og temabar.
Tilgjengelighet løst ved å bruke gull som fyll (mørk tekst) og en mørkere bronse
for gull-farget tekst på lys bakgrunn.

## D6. Placeholdere som SVG, innhold i data-filer

**Beslutning:** Bilder er dekorative SVG-placeholdere; tekst/priser/produkter ligger
i `src/data/*.ts`.
**Begrunnelse:** Ingen binære dummy-assets i repo; alt er strukturelt ærlig, merket
og trivielt å bytte ut. Se `TECH_DEBT.md`.
