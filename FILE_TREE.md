# FILE_TREE – Lori Frisør

Oppdater denne når filer legges til, flyttes eller fjernes.

```text
lori 2/
├── astro.config.mjs            # Astro-konfig (statisk, site-URL)
├── package.json                # Scripts + avhengigheter (astro)
├── tsconfig.json               # Strict TS + path-aliaser (@components, @data, @layouts)
├── .gitignore
├── README.md                   # Hurtigstart
├── PROJECT_DNA.md              # Kilde til sannhet (mål, prinsipper, regler)
├── DECISIONS.md                # Større beslutninger (inkl. Timma vs egen booking)
├── RESEARCH_NOTES.md           # Research: Timma-side, Timma-selskap, UX-mønstre
├── TECH_DEBT.md                # Placeholdere, forenklinger, utsatt arbeid
├── HANDOFF.md                  # Kjøring, status, neste steg for ny agent
├── VISUAL_REVIEW.md            # Visuell vurdering + iterasjoner + a11y-skann
├── IMPLEMENTATION_REPORT.md    # Konsis sluttrapport
├── FILE_TREE.md                # Denne fila
│
├── bilder/                     # Eier sine merkevareressurser (kilde, ikke web-assets)
│   ├── logo saks.jpg           # Gull saks-logo (hovedreferanse)
│   ├── mørk bakgrunn.jpg       # Logo på mørk bakgrunn
│   ├── SmartSelect_*.jpg
│   ├── 18403707_*_n.jpg
│   ├── LORI LOGO WINDOW top.pdf
│   ├── LORI LOGO WINDOW BOTTOM.pdf
│   └── LOGO POSTERBOARD TOP.pdf
│
├── docs/
│   └── screenshots/            # Review-skjermbilder (desktop/mobil/meny/full)
│
├── public/
│   ├── favicon.svg             # Gull saks-favicon på kull
│   └── robots.txt
│
└── src/
    ├── data/                   # ALT redigerbart innhold ligger her
    │   ├── site.ts             # Navn, kontakt, åpningstider, nav, booking-URL
    │   ├── services.ts         # Tjenester + veiledende priser
    │   ├── products.ts         # Produktutvalg (placeholder)
    │   └── offers.ts           # Tilbud/kampanjer (placeholder)
    ├── layouts/
    │   └── BaseLayout.astro    # <head>, SEO/OG, fonts, LocalBusiness JSON-LD, skip-link
    ├── components/
    │   ├── Logo.astro          # Nytegnet SVG-logo (saks + ordmerke)
    │   ├── Placeholder.astro   # Dekorativ SVG-bildeplassholder
    │   ├── Header.astro        # Sticky header + tilgjengelig mobilmeny
    │   ├── Hero.astro          # Verdiløfte + primær-CTA
    │   ├── TrustBar.astro      # Adresse / telefon / tider
    │   ├── Services.astro      # Tjenestekort-rutenett
    │   ├── Pricing.astro       # Prisbord + konsultasjonsnote
    │   ├── Offers.astro        # Tilbudskort (skjules om tomt)
    │   ├── Products.astro      # Produktkort + «Reserver – hent i salong»
    │   ├── About.astro         # Kort historie/tillit
    │   ├── Contact.astro       # Adresse, åpningstider, sosialt, CTA
    │   └── Footer.astro        # Footer-nav + kontakt
    ├── pages/
    │   └── index.astro         # Forsiden (setter sammen alle seksjoner)
    └── styles/
        └── global.css          # Designtokens, typografi, knapper, a11y-hjelpere
```
