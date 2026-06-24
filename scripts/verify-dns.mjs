#!/usr/bin/env node
/** verify-dns.mjs — Check sbwebdev.net points to Cloudflare Pages (not Website Builder). */
import { execSync } from 'child_process';

const DOMAIN = 'sbwebdev.net';
const URL = `https://${DOMAIN}`;

let headers = '';
try {
  headers = execSync(`curl -sI "${URL}"`, { encoding: 'utf-8', timeout: 15000 });
} catch (e) {
  console.error(`DNS check — ${DOMAIN}`);
  console.error('  curl failed:', e.message);
  process.exit(1);
}

const lower = headers.toLowerCase();
const onBuilder =
  lower.includes('hostingerwebsitebuilder') || /platform:\s*hostinger/.test(lower);
const onCloudFront = lower.includes('cloudfront');
const onCloudflare = lower.includes('cloudflare') || lower.includes('cf-ray:');

let body = '';
try {
  body = execSync(`curl -sL "${URL}" | head -c 800`, { encoding: 'utf-8', timeout: 15000 });
} catch {
  /* ignore */
}

const astroLive = /Steven Balalis|Engineering leadership/i.test(body);
const builderLive = /Drive Your Business Forward|Website Builder/i.test(body);

console.log(`DNS check — ${DOMAIN}`);
console.log('  Cloudflare:', onCloudflare ? 'yes' : 'no');
console.log('  CloudFront (legacy AWS):', onCloudFront ? 'YES (unexpected)' : 'no');
console.log('  Website Builder:', onBuilder ? 'YES (needs cutover)' : 'no');
console.log('  Content — Astro portfolio:', astroLive ? 'yes' : 'no');
console.log('  Content — Builder:', builderLive ? 'yes' : 'no');

const pass = onCloudflare && astroLive && !onBuilder && !builderLive;
console.log(pass ? 'PASS' : 'PENDING — complete DNS cutover (see docs/DEPLOY-CLOUDFLARE.md)');
process.exit(pass ? 0 : 1);
