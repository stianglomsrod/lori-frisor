# Data map – Lori Frisør nettside

**Prosjekt:** Lori Frisør nettside  **Behandlingsansvarlig:** LORI-FRISØR AS (org.nr. 926 980 343)
**Databehandlere:** Vercel (hosting), Brevo (e-postutsending)  **Sist oppdatert:** 2026-07-04

## 1. Kategorier personopplysninger

| Datakategori | Særlig kategori? | Formål | Behandlingsgrunnlag | Kilde | Lagringssted | Lagringstid | Sletting |
|---|---|---|---|---|---|---|---|
| IP-adresse + tekniske logger | nei | Drift/sikkerhet | Berettiget interesse (art. 6(1)(f)) | Besøk på siden | Vercel (logger) | Kort (leverandørstyrt) | Automatisk |
| IP-adresse mot Google | nei | Skrifttyper (alltid); kart (etter samtykke) | Berettiget interesse (fonts) / samtykke (maps) | Besøk på siden | Google | Leverandørstyrt | – |
| Reservasjon: navn, telefon, ev. e-post og melding | nei | Legge klar produkt + kontakte kunden | Nødvendig for tiltak før avtale (art. 6(1)(b)) | Skjema på siden | Brevo (transitt) → salongens e-post (cindy@lori.no) | Til reservasjonen er håndtert | Manuelt av salong (rutine: slett når håndtert) |
| Samtykkevalg | nei | Huske cookie-valg | Strengt nødvendig | Besøkerens nettleser | Kun localStorage hos besøker | Til nettleserdata slettes | Av besøker |
| Eiers e-post/konto (Keystatic Cloud) | nei | Innhold-redigering | Avtale | Eier | Keystatic Cloud / GitHub | Kontoens levetid | Ved avvikling |

Ingen særlige kategorier. Ingen profilering. Ingen automatiserte avgjørelser.

## 2. Dataflyt

| Steg | Fra | Til | Data | Transport | Merknad |
|---|---|---|---|---|---|
| Sidevisning | Besøker | Vercel CDN | HTTP-forespørsel (IP, UA) | TLS | Statisk innhold |
| Fontlasting | Besøker | Google Fonts | IP, UA | TLS | Akseptert avvik (DECISIONS D7) |
| Kart (kun etter samtykke) | Besøker | Google Maps | IP, UA, maps-cookies | TLS | Iframe injiseres klient-side |
| Reservasjon | Besøker | /api/reserve (Vercel-funksjon) | Skjemafelter | TLS | Validering + honeypot + rate-limit |
| Reservasjon videre | Vercel-funksjon | Brevo API → salongens innboks | Skjemafelter + tidsstempel | TLS | Ingen lagring i funksjonen |
| Booking | Besøker | Timma (deep-link) | – (kun navigasjon) | TLS | Timma er egen behandlingsansvarlig |

## 3. Underleverandører

| Leverandør | Tjeneste | Data | Lokasjon | Avtale | Overføringsgrunnlag |
|---|---|---|---|---|---|
| Vercel Inc. | Hosting/CDN/funksjoner | Trafikkdata, logger | USA (funksjonsregion kan settes til arn1/Stockholm) | DPA i vilkår | SCC / EU-U.S. DPF |
| Google | Fonts + Maps | IP; maps-cookies etter samtykke | USA/global | – (egen behandlingsansvarlig for maps) | SCC / EU-U.S. DPF |
| Brevo (Sendinblue SAS) | Transaksjons-e-post | Reservasjonsdata i transitt | EU (Frankrike) | DPA i vilkår | – (EØS) |
| Keystatic Cloud / GitHub | Innholdsredigering (kun eier) | Eiers konto + innholdsfiler | USA | Vilkår | SCC / DPF |

## 4. Tredjelandsoverføring

- **Skjer overføring ut av EØS?** Ja (Vercel, Google, GitHub – USA).
- **Grunnlag:** SCC og/eller EU-U.S. Data Privacy Framework (leverandøravhengig).
- **TIA:** Forenklet vurdering – lav risiko gitt datamengde/-sensitivitet (trafikkdata, ingen særlige kategorier). Eier: utvikler.
- **Flagg:** Ingen overføring uten kartlagt grunnlag identifisert.

## 5. Registrertes rettigheter

Henvendelser til cindy@lori.no (beskrevet i personvernerklæringen). Innsyn/retting/sletting
håndteres manuelt av salongen; reservasjons-e-poster slettes når de er håndtert. Klageadgang
til Datatilsynet er opplyst på personvernsiden.
