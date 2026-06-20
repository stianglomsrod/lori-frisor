/**
 * PLACEHOLDER-produkter for å vise frem salgsutvalget.
 * Bytt ut navn, merke, pris og bilde med ekte produkter salongen fører.
 * `reserve: true` lar kunden reservere for henting i salong (lett variant av
 * click-and-collect — ingen nettbetaling i denne fasen).
 */

export type Product = {
  id: string;
  name: string;
  brand: string;
  /** Kort nytteorientert beskrivelse. */
  description: string;
  price: number;
  /** Kategori vist som liten etikett. */
  category: "Pleie" | "Styling" | "Farge" | "Verktøy";
  /** Fremhevet i utvalget (badge «Anbefalt»). */
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "fukt-sjampo",
    name: "Fuktgivende sjampo",
    brand: "Placeholder-merke",
    description: "Mild sjampo for tørt og farget hår. Gir fukt uten å tynge.",
    price: 289,
    category: "Pleie",
    featured: true,
  },
  {
    id: "reparerende-balsam",
    name: "Reparerende balsam",
    brand: "Placeholder-merke",
    description:
      "Styrker og glatter slitne lengder for mykere, glansfullt hår.",
    price: 309,
    category: "Pleie",
  },
  {
    id: "varmebeskytter",
    name: "Varmebeskytter",
    brand: "Placeholder-merke",
    description: "Beskytter mot føhn og rettetang opptil 230°C.",
    price: 245,
    category: "Styling",
  },
  {
    id: "tekstur-spray",
    name: "Teksturspray",
    brand: "Placeholder-merke",
    description: "Lett saltspray for naturlig volum og matt finish.",
    price: 259,
    category: "Styling",
    featured: true,
  },
  {
    id: "fargebevarende-sjampo",
    name: "Fargebevarende sjampo",
    brand: "Placeholder-merke",
    description: "Holder fargen lengre og motvirker uønskede toner.",
    price: 279,
    category: "Farge",
  },
  {
    id: "rund-borste",
    name: "Keramisk rundbørste",
    brand: "Placeholder-merke",
    description: "For glatt føhnresultat og enkel forming hjemme.",
    price: 349,
    category: "Verktøy",
  },
];
