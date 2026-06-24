# Migration status — Cloudflare Pages

Last updated: 2026-06-23

## Done

- [x] Astro site in `~/Desktop/sbwebdev.net`
- [x] Deploy tooling: `deploy.mjs pages`, `npm run deploy`, GitHub Actions workflow
- [x] GitHub repo: https://github.com/balaliss/sbwebdev-site
- [x] Docs: DEPLOY-CLOUDFLARE, DNS-CUTOVER, CANCEL-HOSTINGER, DECOMMISSION-AWS
- [x] career-ops `profile.yml` → `deploy_method: cloudflare-pages`
- [x] Local build verified (`npm run build`)

## Blocked — requires your Cloudflare API token

GitHub Action failed: `CLOUDFLARE_API_TOKEN` not set in repo secrets.

**Fix (5 min):**

1. [Create Cloudflare API token](https://dash.cloudflare.com/profile/api-tokens) — Edit Cloudflare Workers template
2. Copy Account ID from Cloudflare dashboard sidebar
3. GitHub → [balaliss/sbwebdev-site/settings/secrets/actions](https://github.com/balaliss/sbwebdev-site/settings/secrets/actions):
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
4. Re-run failed workflow OR: `git commit --allow-empty -m "trigger deploy" && git push`
5. Cloudflare → Workers & Pages → Create project → Connect Git (if not auto-created)

Or run locally after `cp .env.example .env`:

```bash
node scripts/setup-cloudflare-pages.mjs
npm run deploy
```

## DNS cutover — pending Cloudflare Pages live URL

Current DNS (Hostinger): `@` + `www` → `connect.hostinger.com` (Website Builder)

See [DNS-CUTOVER.md](DNS-CUTOVER.md) after Pages project exists.

## Cancel Hostinger hosting — after cutover verified

See [CANCEL-HOSTINGER.md](CANCEL-HOSTINGER.md). Do not cancel until `node scripts/verify-dns.mjs` passes.

## AWS decommission — after Cloudflare live

Run `node scripts/decommission-aws.mjs check` then `decommission --confirm`.

Idle stack: CloudFront `E4WRP0QVRXZ0G`, S3 `sbwebdev-portfolio-site`.
