/**
 * PLACEHOLDER-tilbud / kampanjer.
 * Hold listen kort (1–3). Tomt array skjuler hele seksjonen automatisk.
 * Bytt ut med ekte, tidsavgrensede tilbud fra salongen.
 */

export type Offer = {
  id: string;
  /** Kort etikett, f.eks. «Nyhet» eller «Kampanje». */
  badge: string;
  title: string;
  description: string;
  /** Valgfri fintrykk, f.eks. gyldighetsperiode. */
  fineprint?: string;
};

export const offers: Offer[] = [
  {
    id: "ny-kunde",
    badge: "Ny hos oss",
    title: "20 % på første klipp",
    description:
      "Er det første gang du besøker oss? Da får du 20 % på din første klipp.",
    fineprint: "Gjelder nye kunder. Oppgi ved bestilling. Placeholder-tilbud.",
  },
  {
    id: "farge-pleie",
    badge: "Kampanje",
    title: "Hårkur på kjøpet ved farge",
    description:
      "Book farge eller striper og få en pleiende hårkur inkludert i behandlingen.",
    fineprint: "Begrenset periode. Placeholder-tilbud.",
  },
];
