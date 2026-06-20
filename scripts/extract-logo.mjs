// Engangsskript: hent ut den faktiske logoen fra eierens bildefil.
// Slår ut hvit bakgrunn, beskjærer, og lager både normal- og lys-variant.
// Kjør: node scripts/extract-logo.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "bilder", "SmartSelect_20201231-161600_Word.jpg");
const OUT = join(root, "public");

const CREAM = [241, 234, 218]; // --color (lys variant for mørk bakgrunn)

const lum = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b;

// Slå ut hvit -> alfa. Bevarer gull og kull i full styrke.
function knockoutWhite(data, width, height) {
  const out = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const r = data[i * 4],
      g = data[i * 4 + 1],
      b = data[i * 4 + 2];
    const L = lum(r, g, b);
    let a;
    if (L >= 250) a = 0;
    else if (L <= 235) a = 255;
    else a = Math.round(((250 - L) / 15) * 255);
    out[i * 4] = r;
    out[i * 4 + 1] = g;
    out[i * 4 + 2] = b;
    out[i * 4 + 3] = a;
  }
  return out;
}

// Lys variant: kull/sort -> cream, gull beholdes.
function toLight(rgba, width, height) {
  const out = Buffer.from(rgba);
  for (let i = 0; i < width * height; i++) {
    const a = out[i * 4 + 3];
    if (a < 20) continue;
    const r = out[i * 4],
      g = out[i * 4 + 1],
      b = out[i * 4 + 2];
    if (lum(r, g, b) < 130) {
      out[i * 4] = CREAM[0];
      out[i * 4 + 1] = CREAM[1];
      out[i * 4 + 2] = CREAM[2];
    }
  }
  return out;
}

// Finn ikke-gjennomsiktig boks (alfa > terskel) innen et radintervall.
function bbox(rgba, width, height, rowStart = 0, rowEnd = height, t = 12) {
  let minX = width,
    minY = height,
    maxX = -1,
    maxY = -1;
  for (let y = rowStart; y < rowEnd; y++) {
    for (let x = 0; x < width; x++) {
      if (rgba[(y * width + x) * 4 + 3] > t) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { minX, minY, maxX, maxY };
}

// Per-rad maks-alfa for å finne innholdsbånd (emblem vs ordmerke).
function rowProfile(rgba, width, height) {
  const prof = new Array(height).fill(0);
  for (let y = 0; y < height; y++) {
    let m = 0;
    for (let x = 0; x < width; x++) {
      const a = rgba[(y * width + x) * 4 + 3];
      if (a > m) m = a;
    }
    prof[y] = m;
  }
  return prof;
}

async function save(rgba, width, height, box, file) {
  const w = box.maxX - box.minX + 1;
  const h = box.maxY - box.minY + 1;
  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .extract({ left: box.minX, top: box.minY, width: w, height: h })
    .png()
    .toFile(join(OUT, file));
  console.log(`✓ ${file}  ${w}x${h}`);
}

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width, height } = info;

const rgba = knockoutWhite(data, width, height);
const light = toLight(rgba, width, height);

// Full lockup (emblem + ordmerke)
const full = bbox(rgba, width, height);
await save(rgba, width, height, full, "lori-logo.png");
await save(light, width, height, full, "lori-logo-light.png");

// Splitt i bånd: finn største gjennomsiktige gap mellom emblem og ordmerke.
const prof = rowProfile(rgba, width, height);
let gapStart = -1,
  bestStart = -1,
  bestLen = 0,
  cur = 0;
for (let y = full.minY; y <= full.maxY; y++) {
  if (prof[y] < 12) {
    if (cur === 0) gapStart = y;
    cur++;
  } else {
    if (cur > bestLen) {
      bestLen = cur;
      bestStart = gapStart;
    }
    cur = 0;
  }
}
const splitY = bestStart + Math.floor(bestLen / 2);
console.log(`Splitt ved y=${splitY} (gap ${bestLen}px)`);

// Emblem = øvre bånd
const emblem = bbox(rgba, width, height, full.minY, splitY);
await save(rgba, width, height, emblem, "lori-emblem.png");
await save(light, width, height, emblem, "lori-emblem-light.png");
