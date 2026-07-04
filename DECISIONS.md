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
**Status 2026-07:** Delvis erstattet: Keystatic (`src/cms/*.yaml`) er nå
innholdskilden med `src/data/*.ts` som fallback; stockfoto ligger i
`public/images/` merket «Illustrasjonsfoto» i alt-tekst. «Plassholder»-merket
vises kun på rene SVG-plassholdere, aldri over ekte bilder.

## D7. Behold Google Fonts + Google Maps – med samtykke-gate (akseptert avvik)

**Beslutning (kundens valg, 2026-07-04):** Google Fonts beholdes eksternt, og
kart-iframen fra Google Maps beholdes – men kartet lastes **kun etter aktivt
samtykke** (banner eller «Vis kart»). Fonts lastes alltid og dokumenteres som
**akseptert avvik**.

**Vurderte alternativer:** (1) self-host fonts + kun kartlenke (mest privacy-
vennlig), (2) behold begge uten gate (ikke forsvarlig for cookies), (3) behold
begge med samtykke-gate på kartet ✅.

**Begrunnelse:** Eier/utvikler ønsker Google-integrasjonene. Maps-cookies krever
samtykke (ekomloven/Datatilsynet) og gates derfor teknisk; fonts setter ingen
cookies, men eksponerer IP – det er beskrevet åpent i personvernerklæringen med
berettiget interesse som grunnlag, og ført i `docs/compliance/risk_register.md`
(#1) med Fontsource som exit-plan (~1 time).

## D8. Samtykkeløsning: egenbygd minimal banner (ikke CMP)

**Beslutning:** Egenbygd banner (`ConsentBanner.astro`) + kontekstuell
«Vis kart»-knapp, valg lagret i `localStorage` (`lori-consent-v1`), én
konsentskategori (tredjeparts-innbygginger).

**Begrunnelse:** Siden har nøyaktig ÉN ikke-nødvendig tredjepart. En kommersiell
CMP (Cookiebot m.fl.) ville vært tyngre, dyrere og selv lastet tredjeparts-script.
Egenbygd oppfyller Datatilsynets krav målbart: aktivt valg, like lett å avslå
(to likeverdige knapper), like lett å trekke tilbake (footer-lenke; iframen
fjernes umiddelbart – verifisert i test). Revurder CMP hvis flere
sporingsteknologier noen gang legges til.

## D9. Produktreservasjon: e-postskjema via Brevo – ikke database/autobooking

**Beslutning:** «Reserver» åpner et lite skjema (navn, telefon, ev. e-post,
ønsket hentedag, melding) som sendes som **e-post til salongen** via
`/api/reserve` + Brevo (EU). Ingen database, ingen lagerkobling, ingen
nettbetaling. SMS-lenken beholdes som fallback (ingen JS, intet Brevo-oppsett,
eller sendefeil).

**Vurderte alternativer:** (1) kun SMS/tel som før, (2) e-postskjema ✅,
(3) ekte click-and-collect m/ database og Timma-lager.

**Begrunnelse:** Salongen er én ansatt – innboksen er arbeidsflaten. Skjemaet
senker terskelen (mange kvier seg for SMS), gir strukturert info (produkt +
tidspunkt automatisk med) og krever null nye systemer. Database/autobooking gir
ingen gevinst på denne størrelsen og ville dratt inn lager-synk og
personvern-byrde. Brevo valgt som EU-leverandør (dataminimering i
tredjelandsbildet); gratis-kvoten (300/dag) er langt over behovet.

## D10. Sosiale medier som redigerbar liste i Keystatic

**Beslutning:** `social` i innstillingene er en liste (plattform + valgfri
etikett + URL) i stedet for faste Facebook/Instagram-felter. Kjente plattformer
(Facebook, Instagram, TikTok, YouTube) får ikon; andre får nøytralt lenkeikon.

**Begrunnelse:** Eier skal kunne legge til TikTok m.m. selv uten utvikler
(clean handover). JSON-LD `sameAs` følger listen automatisk.

## D11. Timma-dyplenker per tjeneste via valgfritt felt

**Beslutning:** Hver tjeneste i Keystatic har et valgfritt felt «Egen
booking-lenke». Satt → tjenestekortet lenker dit; tomt → felles booking-lenke.

**Begrunnelse:** Timma støtter `?category=<id>&service=<id>` på bookingsiden.
Et redigerbart felt er robust mot at Timma endrer ID-er, og holder koden fri
for hardkodede ID-er.

**Oppdatering 2026-07-04 – verifisert og utfylt:** Parameterhåndteringen er
bekreftet i bookingsidens egen kildekode (`?category` settes som aktiv
kategori, `?service` legges som forhåndsvalgt tjeneste ved lasting), og hele
tjenestekatalogen med numeriske ID-er er hentet fra Timmas frontend-API
(`/api/customers/withservices/slug/lorifrisor/public`). Alle ti tjenestekort
har nå ferdig utfylte dyplenker i innholdet: kategorier med flere varianter
(Klipp, Farge, Striper, Bleking, Vipper/bryn) lenker til kategori-visning;
én-tjeneste-kategorier (Skjegg, Extension, Vask og føhn, Hodemassasje, Hårkur)
forhåndsvelger tjenesten. `scripts/timma-links.mjs` lister katalogen og
validerer at innholdets lenker fortsatt finnes.

**E2E-verifisert 2026-07-04:** Alle ti dyplenker testet headless (Playwright/
Chromium) mot bestill.timma.no – 10/10 PASS: tjeneste-lenkene viser tjenesten
forhåndsvalgt i oppsummeringen («Totalt»-rad), kategori-lenkene åpner riktig
kategori med variantene synlige og ingenting valgt. I tillegg manuelt bekreftet
i vanlig nettleser (Skjegg → Skjeggtrim ferdig avhuket på steg 1).

**Vurdert og forkastet – egen bookingflyt mot Timmas API:** API-et som er
funnet er Timmas *interne* frontend-API (udokumentert, uten avtale/nøkler);
å bygge egen booking på det ville vært skjørt, tvilsomt vilkårsmessig og
gjenskapt D1-problemene (betaling, påminnelser, no-show-logikk). Dyplenker gir
90 % av gevinsten for ~0 % av risikoen.
