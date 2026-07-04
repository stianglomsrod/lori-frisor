// Genererer delingsbildet public/og.jpg (1200×630) fra hero-bildet.
// Nøktern beskjæring + diskré merkevarestripe nederst med salongnavnet,
// slik at delinger på Facebook/Instagram/meldingsapper ser proffe ut.
//
// Kjør på nytt når hero-bildet byttes:  node scripts/make-og.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "public", "images", "hero-salon.jpg");
const OUT = join(root, "public", "og.jpg");

const W = 1200;
const H = 630;
const BAR = 92; // merkevarestripe i bunnen

// Tekststripe som SVG (gull navn + kull bakgrunn – salongens identitet).
const overlay = Buffer.from(`
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="${H - BAR}" width="${W}" height="${BAR}" fill="#26211C" fill-opacity="0.92"/>
    <text x="48" y="${H - BAR / 2}" dominant-baseline="central"
      font-family="Georgia, 'Times New Roman', serif" font-size="40"
      fill="#C6A53F" letter-spacing="1">LORI FRISØR</text>
    <text x="${W - 48}" y="${H - BAR / 2}" dominant-baseline="central" text-anchor="end"
      font-family="Arial, Helvetica, sans-serif" font-size="24"
      fill="#F0E9DD">Torget 2, Halden</text>
  </svg>
`);

const img = await sharp(SRC)
  .resize(W, H, { fit: "cover", position: "attention" })
  .composite([{ input: overlay }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(OUT);

console.log(`OK: ${OUT} (${img.width}×${img.height}, ${Math.round(img.size / 1024)} kB)`);
