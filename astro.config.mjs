// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

// Static, content-first marketing site for Lori Frisør.
// Marketing pages stay prerendered (zero client JS beyond the small menu,
// consent and reservation scripts). Keystatic adds an admin UI at /keystatic
// (server-rendered) so the owner can edit content herself; edits commit to
// the repo and Vercel rebuilds automatically.
export default defineConfig({
  site: "https://www.lorifrisor.no",
  trailingSlash: "ignore",
  // Flerspråk: norsk er standard og bor på rot-URL («/»), engelsk på «/en/».
  // Nye språk legges til her + i src/i18n/config.ts.
  i18n: {
    locales: ["no", "en"],
    defaultLocale: "no",
    routing: { prefixDefaultLocale: false },
  },
  build: {
    inlineStylesheets: "auto",
  },
  integrations: [
    react(),
    keystatic(),
    // Sitemap med hreflang-par (robots.txt peker allerede på sitemap-index.xml).
    sitemap({
      filter: (page) => !page.includes("/404"),
      i18n: {
        defaultLocale: "no",
        locales: { no: "nb", en: "en" },
      },
    }),
  ],
  adapter: vercel({
    // Vercels bildeoptimalisering: Placeholder.astro bygger srcset mot
    // /_vercel/image slik at eier-opplastede foto serveres nedskalert.
    // Breddene her MÅ dekke OPT_WIDTHS i Placeholder.astro.
    imageService: true,
    imagesConfig: {
      sizes: [480, 800, 1200, 1600],
      formats: ["image/avif", "image/webp"],
      domains: [],
    },
  }),
});
