# Deploy sbwebdev.net on Cloudflare Pages

Static Astro site → **Cloudflare Pages** ($0/mo). Full git + CLI control from Cursor.

## Architecture

```
src/ + public/     Astro source
dist/              build output
GitHub main        auto-deploy via GitHub Actions
npm run deploy     manual CLI deploy via wrangler
sbwebdev.net       custom domain on Cloudflare Pages
```

## One-time setup

### 1. Cloudflare account + Pages project

1. Sign up at [cloudflare.com](https://cloudflare.com) (free)
2. **Workers & Pages** → Create application → Pages → Connect to Git
3. Select `balaliss/sbwebdev-site`
4. Build settings:
   - **Framework preset:** Astro (or None)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** 22 (Environment variable `NODE_VERSION=22` if needed)
5. Deploy — note preview URL: `https://sbwebdev.pages.dev` (name may vary)

### 2. API token for CLI + GitHub Actions

1. [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens) → Create Token
2. Use **Edit Cloudflare Workers** template (includes Pages Edit)
3. Copy **Account ID** from Workers & Pages overview (right sidebar)

**Local:**
```bash
cp .env.example .env
# Set CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID
```

**GitHub repo secrets** (Settings → Secrets → Actions):
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

### 3. Custom domain (keep registrar at Hostinger)

**Option A — Cloudflare nameservers (recommended):**

1. Cloudflare → Add site → `sbwebdev.net` → Free plan
2. Cloudflare shows two nameservers — set these at Hostinger → Domains → sbwebdev.net → DNS / Nameservers
3. Pages project → Custom domains → Add `sbwebdev.net` and `www.sbwebdev.net`
4. Cloudflare auto-provisions SSL

**Option B — Keep Hostinger DNS:**

1. Pages → Custom domains → add domain, follow CNAME/ALIAS instructions
2. At Hostinger DNS: point apex + www to Cloudflare Pages targets

### 4. Verify cutover

```bash
npm run status
node scripts/verify-dns.mjs
```

Live site should show Astro portfolio (not Website Builder).

## Ongoing deploy

```bash
npm run dev          # localhost:4321
npm run build
npm run deploy       # CLI
# OR
git push origin main # auto-deploy
npm run status
```

## Resume PDF

When `cv.md` changes in career-ops:

```bash
cp ../Code_Projects/apps/career-ops/site/public/resume.pdf public/resume.pdf
npm run build && npm run deploy
```

## Cancel Hostinger hosting

After DNS points to Cloudflare and site is verified:

1. Keep **domain registration** at Hostinger (~$10–15/yr renewal)
2. Cancel **Website Builder** and **Premium Web Hosting** in hPanel
3. See [docs/CANCEL-HOSTINGER.md](CANCEL-HOSTINGER.md)

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `MISSING_ENV` on CLI deploy | Create `.env` from `.env.example` |
| GitHub Action fails | Check `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` secrets |
| Still shows Builder | DNS propagation; wait up to 24h; hard refresh |
| 404 on `/work/*` | Rebuild — Astro directory format works natively on Pages (no .htaccess needed) |
