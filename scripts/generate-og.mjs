import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const vercelDomain =
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL;
const domain = vercelDomain ? `https://${vercelDomain}` : 'kira_2026.in';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0f172a"/>
      <stop offset="1" stop-color="#0b1120"/>
    </linearGradient>
    <radialGradient id="glow1" cx="0.15" cy="0.1" r="0.75">
      <stop offset="0" stop-color="#6366f1" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#6366f1" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.9" cy="0.95" r="0.8">
      <stop offset="0" stop-color="#22d3ee" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#22d3ee" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="tile" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1e293b"/>
      <stop offset="1" stop-color="#182235"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>

  <!-- subtle grid -->
  <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
    <line x1="0" y1="210" x2="1200" y2="210"/>
    <line x1="0" y1="420" x2="1200" y2="420"/>
    <line x1="400" y1="0" x2="400" y2="630"/>
    <line x1="800" y1="0" x2="800" y2="630"/>
  </g>

  <!-- header: brand -->
  <rect x="60" y="56" width="72" height="72" rx="20" fill="#1e293b" stroke="#22d3ee" stroke-opacity="0.5"/>
  <text x="96" y="103" font-family="Georgia, serif" font-size="44" font-weight="bold" text-anchor="middle" fill="#67e8f9">K</text>
  <text x="152" y="100" font-family="Helvetica Neue, Arial, sans-serif" font-size="40" font-weight="bold" fill="#ffffff">Kira_2026</text>
  <text x="152" y="122" font-family="Helvetica Neue, Arial, sans-serif" font-size="20" letter-spacing="2" fill="#7dd3fc">INNOVATION CHALLENGE</text>

  <!-- headline -->
  <text x="60" y="252" font-family="Georgia, serif" font-size="64" font-weight="bold" fill="#ffffff">Discover. Build. Demo.</text>
  <text x="60" y="300" font-family="Helvetica Neue, Arial, sans-serif" font-size="27" fill="#cbd5e1">A working method for choosing winning hackathon</text>
  <text x="60" y="336" font-family="Helvetica Neue, Arial, sans-serif" font-size="27" fill="#cbd5e1">problem statements — pain-first, built in a weekend.</text>

  <!-- dashboard panel (top-10 finalists motif) -->
  <rect x="680" y="180" width="460" height="330" rx="24" fill="#0b1526" stroke="#334155"/>
  <rect x="702" y="202" width="416" height="46" rx="12" fill="#1e293b"/>
  <circle cx="722" cy="225" r="9" fill="#22d3ee"/>
  <text x="742" y="233" font-family="Helvetica Neue, Arial, sans-serif" font-size="20" font-weight="bold" fill="#e2e8f0">Top 10 Finalists</text>
  <text x="1102" y="233" font-family="Helvetica Neue, Arial, sans-serif" font-size="18" text-anchor="end" fill="#22d3ee">10 teams ▸</text>

  <g font-family="Helvetica Neue, Arial, sans-serif">
    <rect x="702" y="266" width="196" height="54" rx="12" fill="url(#tile)"/>
    <text x="716" y="300" font-size="20" font-weight="bold" fill="#67e8f9">A Clear</text>

    <rect x="914" y="266" width="204" height="54" rx="12" fill="url(#tile)"/>
    <text x="928" y="300" font-size="20" font-weight="bold" fill="#f0abfc">Rescue Bite</text>

    <rect x="702" y="334" width="196" height="54" rx="12" fill="url(#tile)"/>
    <text x="716" y="368" font-size="20" font-weight="bold" fill="#c4b5fd">Byte Me</text>

    <rect x="914" y="334" width="204" height="54" rx="12" fill="url(#tile)"/>
    <text x="928" y="368" font-size="20" font-weight="bold" fill="#fda4af">Crisis CRUSHERS</text>

    <rect x="702" y="402" width="196" height="54" rx="12" fill="url(#tile)"/>
    <text x="716" y="436" font-size="20" font-weight="bold" fill="#5eead4">Alpha Squad</text>

    <rect x="914" y="402" width="204" height="54" rx="12" fill="url(#tile)"/>
    <text x="928" y="436" font-size="20" font-weight="bold" fill="#fdba74">Jarvis Unit</text>

    <rect x="702" y="470" width="416" height="26" rx="13" fill="#1e293b"/>
    <text x="910" y="488" font-size="16" text-anchor="middle" fill="#94a3b8">+ 4 more finalist teams</text>
  </g>

  <!-- footer -->
  <line x1="60" y1="548" x2="1140" y2="548" stroke="#334155"/>
  <text x="60" y="586" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" fill="#7dd3fc">${domain}</text>
  <text x="1140" y="586" font-family="Helvetica Neue, Arial, sans-serif" font-size="20" text-anchor="end" fill="#94a3b8">Kira_2026 · Innovation Challenge</text>
</svg>`;

const out = join(__dirname, '..', 'public', 'imagery', 'og-cover.png');
await sharp(Buffer.from(svg)).png().toFile(out);
const info = await sharp(out).metadata();
console.log('Wrote', out, info.width + 'x' + info.height, info.size + ' bytes');
