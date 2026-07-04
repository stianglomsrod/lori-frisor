/**
 * Tjenester (hentet fra Lori sin Timma-profil).
 * `priceFrom` er PLACEHOLDER-veiledende priser i NOK og må bekreftes av salongen.
 * Endelig pris settes etter konsultasjon (hårlengde/tykkelse/ønske).
 */

export type Service = {
  /** Brukes som ankerid og nøkkel. */
  id: string;
  title: string;
  description: string;
  /** Veiledende «fra»-pris i hele kroner. null = pris etter konsultasjon. */
  priceFrom: number | null;
  /** Estetisk/kategorisering for ev. filtrering senere. */
  category: "Hår" | "Farge" | "Skjegg" | "Behandling" | "Vipper & bryn";
  /**
   * Valgfri dyplenke til akkurat denne tjenesten i Timma
   * (f.eks. «…/lorifrisor?category=123&service=456»). Tom = felles booking-lenke.
   */
  bookingUrl?: string | null;
};

export const services: Service[] = [
  {
    id: "klipp",
    title: "Klipp",
    description:
      "Klipp og forming tilpasset hårtype og ansiktsform. Vask og enkel føhn inkludert.",
    priceFrom: 545,
    category: "Hår",
  },
  {
    id: "farge",
    title: "Farge",
    description:
      "Helfarge eller ansatsfarge for friskt, jevnt resultat. Pris etter hårlengde.",
    priceFrom: 895,
    category: "Farge",
  },
  {
    id: "striper",
    title: "Striper / Balayage / Foilayage",
    description:
      "Naturlige slynger eller markerte striper for dybde og lysere preg.",
    priceFrom: 1495,
    category: "Farge",
  },
  {
    id: "bleking",
    title: "Bleking",
    description:
      "Lysning for et lyst uttrykk. Vi vurderer hårets tilstand før behandling.",
    priceFrom: 1295,
    category: "Farge",
  },
  {
    id: "skjegg",
    title: "Skjegg",
    description: "Trimming og forming av skjegg for et velstelt uttrykk.",
    priceFrom: 295,
    category: "Skjegg",
  },
  {
    id: "extension",
    title: "Hår extension",
    description:
      "Lengde og fylde med extensions. Konsultasjon avtales på forhånd.",
    priceFrom: null,
    category: "Behandling",
  },
  {
    id: "vask-fohn",
    title: "Vask og føhn",
    description: "Vask, pleie og føhn for et frisktstylet resultat.",
    priceFrom: 395,
    category: "Hår",
  },
  {
    id: "vipper-bryn",
    title: "Vipper / bryn",
    description: "Forming og farge av bryn og vipper som rammer inn blikket.",
    priceFrom: 395,
    category: "Vipper & bryn",
  },
  {
    id: "hodemassasje",
    title: "Hodemassasje",
    description: "Avslappende hodemassasje som en del av behandlingen.",
    priceFrom: 245,
    category: "Behandling",
  },
  {
    id: "harkur",
    title: "Hårkur",
    description: "Næringsrik kur som gir glød, fukt og bedre håndterbart hår.",
    priceFrom: 245,
    category: "Behandling",
  },
];
