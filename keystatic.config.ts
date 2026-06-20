import { config, fields, singleton } from "@keystatic/core";

/**
 * Keystatic – redigeringsverktøyet for Lori Frisør.
 *
 * Eieren logger inn på /keystatic og endrer tekst, priser og bilder selv.
 * Endringene lagres som vanlige filer i prosjektet (src/content/*.yaml +
 * bilder i public/images), og Vercel bygger siden på nytt automatisk.
 *
 * Lagring:
 *  - Lokalt (utvikling): leser/skriver filer direkte på maskinen.
 *  - I drift (cloud): eieren redigerer via keystatic.cloud UTEN GitHub-konto.
 *    Koble repoet på https://keystatic.cloud og bytt ut prosjekt-IDen under.
 */
export default config({
  storage:
    process.env.NODE_ENV === "development"
      ? { kind: "local" }
      : {
          kind: "cloud",
        },
  // TODO (overlevering): opprett team + prosjekt på https://keystatic.cloud,
  // koble til dette GitHub-repoet, og bytt ut verdien under med «team/prosjekt».
  cloud: { project: "lori-frisor/nettside" },
  ui: {
    brand: { name: "Lori Frisør" },
    navigation: {
      Innhold: ["homepage", "services", "products", "offers"],
      Salong: ["settings", "openingHours"],
    },
  },
  singletons: {
    settings: singleton({
      label: "Salong & kontakt",
      path: "src/content/settings",
      format: { data: "yaml" },
      schema: {
        name: fields.text({
          label: "Navn på salong",
          validation: { length: { min: 1 } },
        }),
        tagline: fields.text({
          label: "Slagord",
          description: "Kort linje som beskriver salongen.",
        }),
        description: fields.text({
          label: "Beskrivelse (SEO)",
          description: "Brukes av Google og i delinger. 1–2 setninger.",
          multiline: true,
        }),
        city: fields.text({ label: "By" }),
        url: fields.url({ label: "Nettadresse (URL)" }),
        contact: fields.object(
          {
            addressStreet: fields.text({ label: "Gateadresse" }),
            addressZip: fields.text({ label: "Postnummer" }),
            addressCity: fields.text({ label: "Poststed" }),
            phone: fields.text({
              label: "Telefon (kun tall)",
              description: "Uten mellomrom, f.eks. 45050677.",
            }),
            phoneDisplay: fields.text({
              label: "Telefon (visning)",
              description: "Slik nummeret vises, f.eks. 450 50 677.",
            }),
            email: fields.text({ label: "E-post" }),
          },
          { label: "Kontaktinformasjon" },
        ),
        social: fields.object(
          {
            facebook: fields.url({ label: "Facebook-lenke" }),
            instagram: fields.url({ label: "Instagram-lenke" }),
          },
          { label: "Sosiale medier" },
        ),
        booking: fields.object(
          {
            url: fields.url({ label: "Booking-lenke (Timma)" }),
            label: fields.text({
              label: "Knappetekst",
              defaultValue: "Bestill time",
            }),
          },
          { label: "Booking" },
        ),
      },
    }),

    openingHours: singleton({
      label: "Åpningstider",
      path: "src/content/opening-hours",
      format: { data: "yaml" },
      schema: {
        days: fields.array(
          fields.object({
            day: fields.text({ label: "Dag" }),
            hours: fields.text({
              label: "Tider",
              description: "F.eks. «09:00–17:00» eller «Stengt».",
            }),
            closed: fields.checkbox({
              label: "Stengt",
              description: "Huk av hvis salongen er stengt denne dagen.",
              defaultValue: false,
            }),
          }),
          {
            label: "Dager",
            itemLabel: (props) =>
              `${props.fields.day.value} – ${props.fields.hours.value}`,
          },
        ),
      },
    }),

    homepage: singleton({
      label: "Forsidetekst",
      path: "src/content/homepage",
      format: { data: "yaml" },
      schema: {
        hero: fields.object(
          {
            eyebrow: fields.text({
              label: "Liten overskrift",
              defaultValue: "Frisør i Halden",
            }),
            titleStart: fields.text({
              label: "Tittel (første del)",
              defaultValue: "Velstelt hår,",
            }),
            titleAccent: fields.text({
              label: "Tittel (uthevet del)",
              defaultValue: "uten stress",
            }),
            lead: fields.text({ label: "Ingress", multiline: true }),
            bullets: fields.array(fields.text({ label: "Punkt" }), {
              label: "Korte trygghetspunkter",
              itemLabel: (props) => props.value,
            }),
            image: fields.image({
              label: "Hovedbilde",
              directory: "public/images",
              publicPath: "/images/",
            }),
            imageAlt: fields.text({
              label: "Bildebeskrivelse (alt-tekst)",
              description: "Beskriv bildet for skjermlesere og SEO.",
            }),
          },
          { label: "Toppseksjon (hero)" },
        ),
        about: fields.object(
          {
            eyebrow: fields.text({
              label: "Liten overskrift",
              defaultValue: "Om oss",
            }),
            title: fields.text({ label: "Tittel" }),
            body: fields.text({ label: "Brødtekst", multiline: true }),
            points: fields.array(fields.text({ label: "Punkt" }), {
              label: "Punktliste",
              itemLabel: (props) => props.value,
            }),
            image: fields.image({
              label: "Bilde",
              directory: "public/images",
              publicPath: "/images/",
            }),
            imageAlt: fields.text({ label: "Bildebeskrivelse (alt-tekst)" }),
          },
          { label: "Om oss-seksjon" },
        ),
      },
    }),

    services: singleton({
      label: "Tjenester & priser",
      path: "src/content/services",
      format: { data: "yaml" },
      schema: {
        items: fields.array(
          fields.object({
            title: fields.text({ label: "Tjeneste" }),
            description: fields.text({ label: "Beskrivelse", multiline: true }),
            priceFrom: fields.integer({
              label: "Fra-pris (kr)",
              description: "La stå tom for «pris etter konsultasjon».",
              validation: { isRequired: false },
            }),
            category: fields.select({
              label: "Kategori",
              options: [
                { label: "Hår", value: "Hår" },
                { label: "Farge", value: "Farge" },
                { label: "Skjegg", value: "Skjegg" },
                { label: "Behandling", value: "Behandling" },
                { label: "Vipper & bryn", value: "Vipper & bryn" },
              ],
              defaultValue: "Hår",
            }),
          }),
          {
            label: "Tjenester",
            itemLabel: (props) =>
              `${props.fields.title.value}${
                props.fields.priceFrom.value
                  ? ` – fra ${props.fields.priceFrom.value} kr`
                  : ""
              }`,
          },
        ),
      },
    }),

    products: singleton({
      label: "Produkter",
      path: "src/content/products",
      format: { data: "yaml" },
      schema: {
        items: fields.array(
          fields.object({
            name: fields.text({ label: "Produktnavn" }),
            brand: fields.text({ label: "Merke" }),
            description: fields.text({ label: "Beskrivelse", multiline: true }),
            price: fields.integer({ label: "Pris (kr)" }),
            category: fields.select({
              label: "Kategori",
              options: [
                { label: "Pleie", value: "Pleie" },
                { label: "Styling", value: "Styling" },
                { label: "Farge", value: "Farge" },
                { label: "Verktøy", value: "Verktøy" },
              ],
              defaultValue: "Pleie",
            }),
            featured: fields.checkbox({
              label: "Fremhevet (vises med «Anbefalt»)",
              defaultValue: false,
            }),
            image: fields.image({
              label: "Produktbilde",
              directory: "public/images",
              publicPath: "/images/",
            }),
          }),
          {
            label: "Produkter",
            itemLabel: (props) => props.fields.name.value,
          },
        ),
      },
    }),

    offers: singleton({
      label: "Tilbud",
      path: "src/content/offers",
      format: { data: "yaml" },
      schema: {
        items: fields.array(
          fields.object({
            badge: fields.text({
              label: "Etikett",
              description: "F.eks. «Ny hos oss».",
            }),
            title: fields.text({ label: "Tittel" }),
            description: fields.text({ label: "Beskrivelse", multiline: true }),
            fineprint: fields.text({
              label: "Fintrykk (valgfritt)",
              validation: { isRequired: false },
            }),
          }),
          {
            label: "Tilbud",
            description: "Tom liste skjuler hele tilbudsseksjonen.",
            itemLabel: (props) => props.fields.title.value,
          },
        ),
      },
    }),
  },
});
