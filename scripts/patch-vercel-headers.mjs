// Legger sikkerhetsheadere inn i Vercels Build Output-konfig etter bygg.
//
// Hvorfor ikke vercel.json? Astro-adapteren bruker Build Output API og
// genererer .vercel/output/config.json selv; headers/routes i vercel.json
// er ikke støttet i kombinasjon og kan gi inkonsistent oppførsel. Denne
// filen patcher derfor config.json direkte (kjøres av `npm run build`).
//
// NB: Rutene må KUN inneholde felter Vercel-skjemaet kjenner (src, headers,
// continue, has/missing, …) – egne markørfelter avvises ved deploy.
// Idempotens løses derfor strukturelt: vi fjerner eksisterende ruter som
// setter «våre» headere før vi legger inn ferske.
//
// Header-ruter bruker `continue: true` og påvirker ikke selve rutingen.
// CSP settes kun på markedssidene – /keystatic (React-admin) og /api
// holdes utenfor slik at redigeringsverktøyet aldri brekker.
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG = join(root, ".vercel", "output", "config.json");

const baseHeaders = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "SAMEORIGIN",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
};

const csp = [
  "default-src 'self'",
  // Astro inliner små scripts (meny, samtykke, kart) – derfor 'unsafe-inline'.
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src https://fonts.gstatic.com",
  "img-src 'self' data:",
  // Google Maps-iframen (lastes kun etter samtykke).
  "frame-src https://maps.google.com https://www.google.com",
  "connect-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
].join("; ");

/** Kjenner igjen ruter dette scriptet har laget (strukturelt, uten markør). */
const isOurs = (route) => {
  if (!route || typeof route !== "object" || route.continue !== true) return false;
  const h = route.headers;
  if (!h || typeof h !== "object") return false;
  return (
    "X-Content-Type-Options" in h ||
    "Content-Security-Policy" in h ||
    "X-Robots-Tag" in h
  );
};

let raw;
try {
  raw = await readFile(CONFIG, "utf8");
} catch {
  console.log("patch-vercel-headers: fant ikke", CONFIG, "– hopper over.");
  process.exit(0);
}

const config = JSON.parse(raw);
config.routes ??= [];

// Idempotent: fjern våre gamle ruter før vi legger inn på nytt.
config.routes = config.routes.filter((r) => !isOurs(r));

const headerRoutes = [
  {
    src: "/(.*)",
    headers: baseHeaders,
    continue: true,
  },
  {
    src: "/(?!keystatic|api)(.*)",
    headers: { "Content-Security-Policy": csp },
    continue: true,
  },
  // Prototypen (lori-frisor.vercel.app) skal ikke indekseres av søkemotorer.
  // Regelen gjelder alle host-er UNNTATT det ekte domenet – den dagen
  // (www.)lorifrisor.no pekes mot prosjektet, forsvinner noindex av seg selv.
  {
    src: "/(.*)",
    missing: [{ type: "host", value: "(www\\.)?lorifrisor\\.no" }],
    headers: { "X-Robots-Tag": "noindex, nofollow" },
    continue: true,
  },
];

config.routes = [...headerRoutes, ...config.routes];

await writeFile(CONFIG, JSON.stringify(config, null, 2));
console.log("patch-vercel-headers: la til sikkerhetsheadere i config.json");
