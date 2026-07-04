# FILE_TREE – Lori Frisør

Oppdater denne når filer legges til, flyttes eller fjernes.
Sist regenerert: 2026-07-04.

```text
lori/
├── astro.config.mjs            # Astro: i18n, sitemap, Vercel-adapter (imageService)
├── keystatic.config.ts         # CMS-skjema (per-språk singletons, src/cms-stier)
├── package.json                # Scripts + avhengigheter (astro, keystatic, sharp, sitemap)
├── tsconfig.json               # Strict TS + path-aliaser
├── .nvmrc                      # Node 22 (= Vercel-runtime)
├── .env.example                # Dokumenterte miljøvariabler (Brevo m.m.)
├── .gitignore
├── .github/workflows/ci.yml    # CI: npm run check + build på push/PR
│
├── README.md                   # Hurtigstart + dokumentkart
├── PROJECT_DNA.md              # Kilde til sannhet (mål, prinsipper, varige regler)
├── AGENTS.md                   # Onboarding for agenter/utviklere (les som nr. 2)
├── DECISIONS.md                # Beslutninger D1–D11 (Timma, samtykke, Brevo, …)
├── RESEARCH_NOTES.md           # Research: Timma, UX-mønstre, tilgjengelighet
├── TECH_DEBT.md                # Placeholdere, aksepterte avvik, gjenstående
├── HANDOFF.md                  # Status, driftsoppsett, neste steg
├── VISUAL_REVIEW.md            # Visuelle gjennomganger + a11y-skann
├── IMPLEMENTATION_REPORT.md    # Historisk sluttrapport for v0.1-piloten
├── FILE_TREE.md                # Denne fila
│
├── bilder/                     # Eiers merkevareressurser (kilde, ikke web-assets)
│
├── docs/
│   ├── EIER-VEILEDNING.md      # Veiledning for salongens eier (Keystatic m.m.)
│   ├── compliance/             # Utfylte guardrail-artefakter
│   │   ├── compliance_register.md
│   │   ├── cookie_register.md
│   │   ├── data_map.md
│   │   ├── accessibility_checklist.md
│   │   ├── security_baseline.md
│   │   ├── risk_register.md
│   │   └── release_gate.md
│   └── screenshots/            # Review-skjermbilder
│
├── public/
│   ├── favicon.svg / favicon.png / apple-touch-icon.png
│   ├── lori-emblem*.png        # Logo-varianter (utpakket fra eiers filer)
│   ├── og.jpg                  # Delingsbilde 1200×630 (scripts/make-og.mjs)
│   ├── robots.txt              # Peker på sitemap-index.xml (genereres ved bygg)
│   └── images/                 # Innholdsbilder (Keystatic laster opp hit)
│
├── scripts/
│   ├── extract-logo.mjs        # Engangs: logo fra eiers JPG → PNG-varianter
│   ├── make-og.mjs             # Genererer public/og.jpg fra hero-bildet
│   └── patch-vercel-headers.mjs# Sikkerhetsheadere/CSP → .vercel/output/config.json
│
└── src/
    ├── cms/                    # ALT eier-redigerbart innhold (Keystatic-YAML)
    │   ├── settings.yaml       # Navn, kontakt, SoMe-liste, booking, avbestilling
    │   ├── opening-hours.yaml  # Åpningstider (dag som select)
    │   ├── no/                 # homepage|services|products|offers.yaml (norsk)
    │   └── en/                 # samme struktur (engelsk)
    ├── data/                   # TS-fallbacks hvis innholdsfil mangler
    │   ├── site.ts             # + SocialLink-typer
    │   ├── services.ts         # + valgfri bookingUrl (Timma-dyplenke)
    │   ├── products.ts
    │   └── offers.ts
    ├── i18n/
    │   ├── config.ts           # Locales, hreflang, localePrivacy-stier
    │   └── ui.ts               # Mikrotekst NO/EN (inkl. samtykke, skjema, 404)
    ├── layouts/
    │   └── BaseLayout.astro    # SEO/OG/Twitter, hreflang, JSON-LD (escapet),
    │                           # theme-color, samtykkebanner, reveal-script
    ├── lib/
    │   ├── content.ts          # Keystatic-lesere + fallbacks (typet)
    │   └── consent-client.ts   # Delt localStorage-logikk for samtykke
    ├── components/
    │   ├── Header.astro        # Sticky nav, mobil-CTA, språkvelger, absolutte ankere
    │   ├── Hero.astro          # LCP-bilde eager + fetchpriority
    │   ├── TrustBar.astro      # Adresse/tlf + åpningsdager UTLEDET av innholdet
    │   ├── Services.astro      # Kort m/ per-tjeneste booking-lenke
    │   ├── Pricing.astro       # Prisbord
    │   ├── Offers.astro        # Tilbudskort (skjules om tomt)
    │   ├── Products.astro      # Produktkort + reservasjonsdialog (m/ SMS-fallback)
    │   ├── About.astro
    │   ├── Contact.astro       # Kontakt + samtykke-gatet Google Maps
    │   ├── Footer.astro        # Nav, SoMe-liste, personvern + «Administrer kapsler»
    │   ├── ConsentBanner.astro # Nøkternt samtykkebanner (Datatilsynet-krav)
    │   ├── LanguageToggle.astro# Språkbytte m/ anker-bevaring + undersidestier
    │   ├── Logo.astro
    │   ├── Placeholder.astro   # Bilderamme: SVG-fallback, srcset via /_vercel/image
    │   ├── SocialIcon.astro    # Ikoner for SoMe-plattformer
    │   └── NewTab.astro        # Skjult «(åpnes i ny fane)»-hint
    ├── pages/
    │   ├── index.astro         # Norsk forside («/»)
    │   ├── en/index.astro      # Engelsk forside («/en/»)
    │   ├── personvern.astro    # Personvernerklæring (norsk)
    │   ├── en/privacy.astro    # Privacy policy (engelsk)
    │   ├── 404.astro
    │   └── api/reserve.ts      # Reservasjon → e-post (Brevo), SSR-endepunkt
    └── styles/
        └── global.css          # Designtokens, typografi, knapper, a11y, dark mode
```
