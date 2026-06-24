# Pre-deploy verification (2026-06-23)

Local build passed. Production deploy pending **Cloudflare API token** in GitHub secrets.

## Build output

| Route | dist file |
|-------|-----------|
| `/` | `dist/index.html` |
| `/writing` | `dist/writing/index.html` |
| `/work/transcarent` | `dist/work/transcarent/index.html` |
| `/work/persevere` | `dist/work/persevere/index.html` |
| `/work/network-funnel` | `dist/work/network-funnel/index.html` |
| `/resume.pdf` | `public/resume.pdf` (copied to dist on build) |

## Live site (current)

Still **Hostinger Website Builder** (`connect.hostinger.com` DNS).

## Unblock deploy

1. Add `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` to GitHub repo secrets
2. Re-run GitHub Action or `npm run deploy` locally
3. Attach custom domain in Cloudflare Pages
4. DNS cutover — [DNS-CUTOVER.md](DNS-CUTOVER.md)

## After cutover, verify

```bash
npm run status
node scripts/verify-dns.mjs
curl -sI https://sbwebdev.net/work/transcarent | head -3
```

Expect Cloudflare headers + Astro portfolio content.
