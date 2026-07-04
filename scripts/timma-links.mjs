// Henter Lori Frisørs tjenestekatalog fra Timma og skriver ut gyldige
// dyplenker (?category=<subCategoryId>&service=<serviceId>), samt varsler om
// bookingUrl-er i innholdet som peker på ID-er som ikke lenger finnes.
//
// Kjør ved behov (f.eks. hvis Timma-tjenester legges til/fjernes):
//   node scripts/timma-links.mjs
//
// Endepunktet er Timmas eget frontend-API (samme kall som bookingsiden gjør).
// Det er udokumentert og kan endres – dette scriptet LESER kun og skriver
// ingenting tilbake; dyplenkene i src/cms/*/services.yaml oppdateres manuelt.
// Parameterhåndteringen er verifisert i bookingsidens kildekode:
//   ?category=<id> → aktiv kategori · ?service=<id> → forhåndsvalgt tjeneste
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const SLUG = "lorifrisor";
const API = `https://bestill.timma.no/api/customers/withservices/slug/${SLUG}/public?subCategories=true`;
const BASE = `https://bestill.timma.no/${SLUG}`;

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const res = await fetch(API, { headers: { accept: "application/json" } });
if (!res.ok) {
  console.error(`Timma-API svarte ${res.status} – prøv igjen senere.`);
  process.exit(1);
}
const data = await res.json();

console.log(`Salong: ${data.name}\n`);
const validParams = new Set();
for (const cat of data.subCategories ?? []) {
  const services = (cat.services ?? []).filter((s) => !s.hideFromWebReservation);
  if (services.length === 0) continue;
  const catId = services[0].subCategoryId;
  validParams.add(`category=${catId}`);
  console.log(`Kategori ${catId}  (${services.length} tjenester)  →  ${BASE}?category=${catId}`);
  for (const s of services.sort((a, b) => (a.orderNumber ?? 0) - (b.orderNumber ?? 0))) {
    validParams.add(`category=${catId}&service=${s.serviceId}`);
    const price = Math.round((s.price ?? 0) / 100);
    console.log(
      `   ${String(s.serviceId).padStart(5)}  ${(s.nameNo ?? s.nameFi ?? "?").padEnd(46)} ${String(price).padStart(5)} kr  →  ${BASE}?category=${catId}&service=${s.serviceId}`,
    );
  }
}

// Kontroller at dyplenkene i innholdet fortsatt er gyldige.
console.log("\n--- Sjekk av bookingUrl-er i src/cms/*/services.yaml ---");
let problems = 0;
for (const file of ["src/cms/no/services.yaml", "src/cms/en/services.yaml"]) {
  const yaml = await readFile(join(root, file), "utf8");
  for (const m of yaml.matchAll(/bookingUrl:\s*(\S+)/g)) {
    const url = m[1];
    const params = url.split("?")[1] ?? "";
    if (!validParams.has(params)) {
      console.log(`  ⚠ ${file}: «${params}» finnes ikke lenger i Timma-katalogen`);
      problems++;
    }
  }
}
console.log(problems === 0 ? "  Alle dyplenker er gyldige ✓" : `  ${problems} lenke(r) må oppdateres`);
