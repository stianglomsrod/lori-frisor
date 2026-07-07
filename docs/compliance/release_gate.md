# Release gate – Lori Frisør nettside

> Kjøres før (re-)lansering. Alle relevante gates skal være **OK** eller ha en
> dokumentert, akseptert avviksplan. Eiers sign-off kreves.

**Prosjekt:** Lori Frisør nettside  **Release:** v0.2 «proff-oppgradering»  **Dato:** 2026-07-04 (forberedt)

| Gate | Kontrollspørsmål | Status | Eier |
|---|---|---|---|
| Scope | Features klassifisert (🟡 lav → 🟢 ved grønn gate). Ingen røde. | ✅ | Utvikler |
| Kontrakt | SOW/avtale med salongen om drift/eierskap | ⬜ avklares mellom studio og salong | Stian |
| Personvern | Personvernerklæring publisert (NO+EN); data map + underleverandører dokumentert | ✅ (dok) / ⬜ DPA-bekreftelser ved kontooppsett | Utvikler |
| DPIA | Screening gjort – full DPIA ikke nødvendig (lav risiko, ingen særlige kategorier) | ✅ | Utvikler |
| Cookies | Register finnes; ikke-nødvendig tredjepart (Maps) blokkeres før samtykke – verifisert i bygg + nettleser | ✅ | Utvikler |
| UU/WCAG | Sjekkliste oppdatert; axe-retest utført 2026-07-04: **0 brudd** på 4 tilstander (én kontrastfeil funnet og fikset). NVDA-runde anbefalt, ikke blokkerende. | ✅ | Utvikler |
| Sikkerhet | Headere/CSP i bygget; endepunkt-vern aktivt; MFA på kontoer bekreftes | ⬜ MFA-bekreftelse | Eier + utvikler |
| KI | Ikke relevant | ✅ | – |
| Helse/betaling/regulert | Ikke relevant | ✅ | – |
| Forbruker/markedsføring | Priser/tilbud/åpningstider bekreftet av eier (placeholder fjernet) | ⬜ eier bekrefter | Eier (Cindy) |
| Open source/IP | Avhengigheter: Astro 6 + vercel 10-oppgradering lukket `x-astro-path`-CVE + Astro-XSS-CVE-er (2026-07-09); gjenstående audit-funn er byggtid/dev-only og ikke reachable. **Fotolisenser: hero avklart (Pexels), about+produkt gjenstår** | ⬜ fotolisens | Utvikler |
| Drift | CI grønn; Brevo-oppsett testet med ekte e-post; Vercel funksjonsregion arn1 satt; rollback = git revert | ⬜ Brevo-test + region | Utvikler |
| Eiers aksept | Cindy godkjenner innhold + kjente avvik (Google Fonts-avviket) | ⬜ | Eier (Cindy) |

**Sign-off produksjonssetting:** ______ (navn/rolle/dato)

**Kjente avvik ved lansering:** Google Fonts lastes eksternt (akseptert avvik, se
`DECISIONS.md` D7 og risikoregister #1). Exit: Fontsource self-hosting, estimat ~1 time.
