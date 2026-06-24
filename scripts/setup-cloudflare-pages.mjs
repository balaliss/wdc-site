#!/usr/bin/env node
/**
 * setup-cloudflare-pages.mjs — One-time Cloudflare Pages + GitHub secrets checklist.
 * Run after creating a Cloudflare account.
 */
import { execSync } from 'child_process';

const steps = [
  '1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git',
  '2. Select balaliss/sbwebdev-site, branch main',
  '3. Build: npm run build | Output: dist | Node 22',
  '4. Create API token (Edit Cloudflare Workers template) at dash.cloudflare.com/profile/api-tokens',
  '5. GitHub → balaliss/sbwebdev-site → Settings → Secrets → Actions:',
  '     CLOUDFLARE_API_TOKEN',
  '     CLOUDFLARE_ACCOUNT_ID',
  '6. Local CLI: cp .env.example .env and fill same values',
  '7. Test: npm run deploy:dry then npm run deploy',
  '8. Pages → Custom domains → add sbwebdev.net + www.sbwebdev.net',
  '9. DNS: use Cloudflare nameservers (see docs/DEPLOY-CLOUDFLARE.md)',
  '10. Verify: npm run status && node scripts/verify-dns.mjs',
];

console.log('Cloudflare Pages setup checklist\n');
for (const s of steps) console.log(s);

try {
  const repo = execSync('gh repo view balaliss/sbwebdev-site --json url -q .url', {
    encoding: 'utf-8',
  }).trim();
  console.log(`\nRepo: ${repo}`);
} catch {
  console.log('\nRepo: push to GitHub first');
}

console.log('\nAfter secrets are set, re-run failed GitHub Action or push a commit.');
