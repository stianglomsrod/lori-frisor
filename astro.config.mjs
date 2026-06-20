// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import vercel from "@astrojs/vercel";

// Static, content-first marketing site for Lori Frisør.
// Marketing pages stay prerendered (zero client JS). Keystatic adds an
// admin UI at /keystatic (server-rendered) so the owner can edit content
// herself; edits commit to the repo and Vercel rebuilds automatically.
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
  integrations: [react(), keystatic()],
  adapter: vercel(),
});
