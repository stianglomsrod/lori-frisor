import { config, fields, singleton } from "@keystatic/core";
import { contentLocales, localeLabel, type Locale } from "./src/i18n/config";


/**
 * Keystatic – redigeringsverktøyet for Lori Frisør.
 *
 * Eieren logger inn på /keystatic og endrer tekst, priser og bilder selv.
 * Endringene lagres som vanlige filer i prosjektet og Vercel bygger på nytt.
 *
 * Flerspråk:
 *  - «Salong & kontakt» og «Åpningstider» er felles for alle språk
 *    (adresse, telefon, sosiale medier osv. er like uansett språk).
 *  - Innhold (forside, tjenester, produkter, tilbud) finnes per språk og
 *    er gruppert i menyen som «Innhold – Norsk» / «Innhold – English».
 *  - Nytt språk: se src/i18n/config.ts, og legg til en blokk i `singletons`
 *    + i `singletons`-objektet under (følg mønsteret for «_no» / «_en»).
 */

// Kategorivalg per språk – holder kortene konsistente i hver språkversjon.
const serviceCategories: Record<Locale, { label: string; value: string }[]> = {
  no: ["Hår", "Farge", "Skjegg", "Behandling", "Vipper & bryn"].map((v) => ({
    label: v,
    value: v,
  })),
  en: ["Hair", "Colour", "Beard", "Treatment", "Lashes & brows"].map((v) => ({
    label: v,
    value: v,
  })),
};

const productCategories: Record<Locale, { label: string; value: string }[]> = {
  no: ["Pleie", "Styling", "Farge", "Verktøy"].map((v) => ({
    label: v,
    value: v,
  })),
  en: ["Care", "Styling", "Colour", "Tools"].map((v) => ({
    label: v,
    value: v,
  })),
};

// --- Skjema-byggere (gjenbrukes for hvert språk) ---------------------------

const homepageSchema = () => ({
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
});

const servicesSchema = (categories: { label: string; value: string }[]) => ({
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
        options: categories,
        defaultValue: categories[0].value,
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
});

const productsSchema = (categories: { label: string; value: string }[]) => ({
  items: fields.array(
    fields.object({
      name: fields.text({ label: "Produktnavn" }),
      brand: fields.text({ label: "Merke" }),
      description: fields.text({ label: "Beskrivelse", multiline: true }),
      price: fields.integer({ label: "Pris (kr)" }),
      category: fields.select({
        label: "Kategori",
        options: categories,
        defaultValue: categories[0].value,
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
});

const offersSchema = () => ({
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
});

// --- Felles innstillinger (språkuavhengig) ---------------------------------

const settings = singleton({
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
          label: "Knappetekst (norsk)",
          defaultValue: "Bestill time",
        }),
      },
      { label: "Booking" },
    ),
  },
});

const openingHours = singleton({
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
});

// --- Per-språk innhold ------------------------------------------------------

const homepage_no = singleton({
  label: `Forside (${localeLabel.no})`,
  path: "src/content/no/homepage",
  format: { data: "yaml" },
  schema: homepageSchema(),
});
const services_no = singleton({
  label: `Tjenester & priser (${localeLabel.no})`,
  path: "src/content/no/services",
  format: { data: "yaml" },
  schema: servicesSchema(serviceCategories.no),
});
const products_no = singleton({
  label: `Produkter (${localeLabel.no})`,
  path: "src/content/no/products",
  format: { data: "yaml" },
  schema: productsSchema(productCategories.no),
});
const offers_no = singleton({
  label: `Tilbud (${localeLabel.no})`,
  path: "src/content/no/offers",
  format: { data: "yaml" },
  schema: offersSchema(),
});

const homepage_en = singleton({
  label: `Forside (${localeLabel.en})`,
  path: "src/content/en/homepage",
  format: { data: "yaml" },
  schema: homepageSchema(),
});
const services_en = singleton({
  label: `Tjenester & priser (${localeLabel.en})`,
  path: "src/content/en/services",
  format: { data: "yaml" },
  schema: servicesSchema(serviceCategories.en),
});
const products_en = singleton({
  label: `Produkter (${localeLabel.en})`,
  path: "src/content/en/products",
  format: { data: "yaml" },
  schema: productsSchema(productCategories.en),
});
const offers_en = singleton({
  label: `Tilbud (${localeLabel.en})`,
  path: "src/content/en/offers",
  format: { data: "yaml" },
  schema: offersSchema(),
});

// Meny: gruppér innhold per språk automatisk fra språkoppsettet.
const contentNavigation = Object.fromEntries(
  contentLocales.map((loc) => [
    `Innhold – ${localeLabel[loc]}`,
    [`homepage_${loc}`, `services_${loc}`, `products_${loc}`, `offers_${loc}`],
  ]),
);

export default config({
  storage:
    process.env.NODE_ENV === "development"
      ? { kind: "local" }
      : {
          kind: "cloud",
        },
  // TODO (overlevering): opprett team + prosjekt på https://keystatic.cloud,
  // koble til dette GitHub-repoet, og bytt ut verdien under med «team/prosjekt».
  cloud: { project: "lori/lori-frisor" },
  ui: {
    brand: { name: "Lori Frisør" },
    navigation: {
      Salong: ["settings", "openingHours"],
      ...contentNavigation,
    },
  },
  singletons: {
    settings,
    openingHours,
    homepage_no,
    services_no,
    products_no,
    offers_no,
    homepage_en,
    services_en,
    products_en,
    offers_en,
  },
});
