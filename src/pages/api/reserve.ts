/**
 * Produktreservasjon → e-post til salongen.
 *
 * Bevisst enkelt for en énmannssalong: ingen database, ingen autobooking –
 * bare en ryddig e-post med produkt, kundens kontaktinfo og tidspunkt.
 * Sending skjer via Brevo (EU-leverandør, api.brevo.com).
 *
 * Miljøvariabler (settes i Vercel-prosjektet):
 *  - BREVO_API_KEY   (påkrevd – uten denne svarer endepunktet 503 og
 *                     nettsiden faller tilbake til SMS-lenker)
 *  - BREVO_SENDER    (valgfri – verifisert avsenderadresse i Brevo;
 *                     standard: nettside@lorifrisor.no)
 *  - RESERVATION_TO  (valgfri – overstyrer mottaker; standard: e-posten i
 *                     «Salong & kontakt» i Keystatic)
 *
 * Vern: honningkrukke-felt, lengdegrenser, telefon-/e-postvalidering,
 * same-origin-sjekk og enkel takstbegrensning per IP (best effort på
 * serverless). Ingen opplysninger lagres her – de går kun videre som e-post.
 */
import type { APIRoute } from "astro";
import settingsRaw from "../../cms/settings.yaml?raw";

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-()]{5,}$/;

// Mottaker fra Keystatic-innstillingene (bundles inn ved bygg via ?raw).
const settingsEmail = (() => {
  const m = settingsRaw.match(/^\s*email:\s*(.+)\s*$/m);
  const v = m?.[1]?.trim().replace(/^['"]|['"]$/g, "");
  return v && EMAIL_RE.test(v) ? v : null;
})();

// Enkel takstbegrensning per IP (per serverless-instans, best effort).
const RATE_WINDOW_MS = 10 * 60_000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();
const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((ts) => now - ts < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
};

const field = (data: Record<string, unknown>, key: string, max: number): string =>
  typeof data[key] === "string" ? (data[key] as string).trim().slice(0, max) : "";

const escapeHtml = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const apiKey = import.meta.env.BREVO_API_KEY;
  if (!apiKey) return json(503, { ok: false, error: "not_configured" });

  // Kun kall fra egen side (skjemaet vårt sender alltid Origin).
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== new URL(request.url).host) {
        return json(403, { ok: false, error: "origin" });
      }
    } catch {
      return json(403, { ok: false, error: "origin" });
    }
  }

  let ip = "ukjent";
  try {
    ip = clientAddress;
  } catch {
    /* clientAddress kan mangle i enkelte kjøretidsmiljøer */
  }
  if (isRateLimited(ip)) return json(429, { ok: false, error: "rate_limited" });

  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return json(400, { ok: false, error: "bad_json" });
  }

  // Honningkrukke: roboter fyller ut det skjulte feltet. Svar stille «ok».
  if (field(data, "website", 200)) return json(200, { ok: true });

  const product = field(data, "product", 120);
  const name = field(data, "name", 80);
  const phone = field(data, "phone", 24);
  const email = field(data, "email", 120);
  const when = field(data, "when", 40);
  const message = field(data, "message", 600);

  if (!product || !name) return json(400, { ok: false, error: "missing" });
  if (!PHONE_RE.test(phone)) return json(400, { ok: false, error: "phone" });
  if (email && !EMAIL_RE.test(email)) return json(400, { ok: false, error: "email" });

  const to = import.meta.env.RESERVATION_TO || settingsEmail;
  if (!to) return json(503, { ok: false, error: "no_recipient" });
  // Avsenderadressen må være verifisert i Brevo-kontoen.
  const sender = import.meta.env.BREVO_SENDER || "nettside@lorifrisor.no";

  const timestamp = new Intl.DateTimeFormat("nb-NO", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Oslo",
  }).format(new Date());

  const rows: [string, string][] = [
    ["Produkt", product],
    ["Navn", name],
    ["Telefon", phone],
    ["E-post", email || "–"],
    ["Ønsket henting", when || "Så snart som mulig"],
    ["Melding", message || "–"],
    ["Sendt", timestamp],
  ];
  const textContent = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const htmlContent = `<h2 style="margin:0 0 12px">Ny produktreservasjon</h2>
<table style="border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;vertical-align:top">${k}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>
<p style="color:#666;font-size:13px">Sendt fra reservasjonsskjemaet på nettsiden. Kunden betaler i salongen ved henting.</p>`;

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { name: "Lori Frisør – nettsiden", email: sender },
      to: [{ email: to }],
      ...(email ? { replyTo: { email, name } } : {}),
      subject: `Reservasjon: ${product} (${name})`,
      htmlContent,
      textContent,
    }),
  });

  if (!res.ok) {
    console.error("Brevo-feil", res.status, await res.text().catch(() => ""));
    return json(502, { ok: false, error: "send_failed" });
  }
  return json(200, { ok: true });
};
