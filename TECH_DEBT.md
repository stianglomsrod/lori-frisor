# TECH_DEBT – Lori Frisør

Placeholdere, snarveier, utsatte funksjoner og kjente begrensninger.

## Placeholder-innhold (må bekreftes/erstattes før publisering)

- **Priser** i `src/data/services.ts` (`priceFrom`) er _veiledende antakelser_.
- **Åpningstider** i `src/data/site.ts` (`openingHours`) er antatt.
- **Produkter** i `src/data/products.ts` er fiktive («Placeholder-merke»).
- **Tilbud** i `src/data/offers.ts` er eksempler (merket «Placeholder-tilbud»).
- **Bilder**: alle er dekorative SVG-placeholdere (`Placeholder.astro`), ikke foto.
- **Om-tekst** og hero-copy er utkast – bør gjennomgås med eier.
- Maps-lenke er et Google Maps-søk på adressen, ikke et innebygd kart/Place ID.

## Merkevare-assets

- Originale logofiler ligger i `/bilder` (JPG + PDF). Web-logoen er **nytegnet SVG**
  (`Logo.astro`, `public/favicon.svg`). Vurder å eksportere en ren vektor av
  originallogoen og bytte inn – behold `aria`-struktur.
- `/bilder` er kildemateriale; ikke referert direkte av siden ennå.

## Bevisste forenklinger (ikke feil, men verdt å vite)

- **Reserver-produkt** bruker `sms:`/`tel:`-lenker (lett variant), ikke ekte
  click-and-collect. Ingen betaling/lager. Se `DECISIONS.md` D4.
- Mobilmeny lukker ikke fokus-felle (ingen full focus-trap) – akseptabelt for en
  enkel meny; vurder focus-trap hvis menyen vokser.
- Én side; ingen CMS. Innhold redigeres i `src/data/*.ts`.
- Google Fonts lastes eksternt; degraderer til system-skrift offline. Vurder
  self-hosting (Fontsource) for ytelse/personvern ved lansering.

## Utsatte funksjoner (mulig neste fase)

- Ekte click-and-collect (ev. mot Timma varelager).
- Galleri / Instagram-feed med ekte bilder.
- Kundeomtaler / Google-rating.
- Innebygd kart (Google/Leaflet) i kontaktseksjonen.
- Flere sider (egen tjeneste-/prisside) om innholdet vokser.
- `@astrojs/sitemap` for automatisk sitemap (robots.txt peker allerede på en).
- Analyse/konverteringssporing (med samtykke).

## Kjente begrensninger

- Ingen e2e-/enhetstester (statisk markedsside; lav nytte nå).
- Visuell QA på ekte desktop-bredde (1440px) bør gjøres i ekstern nettleser før
  lansering – det innebygde panelet var upålitelig for brede skjermbilder.
