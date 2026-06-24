# DNS cutover — sbwebdev.net → Cloudflare Pages

Snapshot from Hostinger DNS (2026-06-23):

| Type | Name | Current value | Action after Pages setup |
|------|------|---------------|--------------------------|
| ALIAS | @ | connect.hostinger.com | **Remove** — Cloudflare manages apex via nameservers |
| CNAME | www | connect.hostinger.com | **Remove** — Cloudflare manages www |
| MX | @ | mx1.titan.email (10), mx2.titan.email (20) | **Keep** if using Titan mail; Cloudflare will import |
| TXT | @ | SPF for Titan | **Keep** if using Titan mail |
| TXT | titan1._domainkey | DKIM | **Keep** if using Titan mail |

## Recommended path: Cloudflare nameservers

1. Cloudflare → Add site → `sbwebdev.net` → Free plan
2. Cloudflare scans existing records — confirm MX/SPF/DKIM imported (optional if not using email)
3. Pages project → Custom domains → Add `sbwebdev.net` and `www.sbwebdev.net`
4. Hostinger → Domains → sbwebdev.net → **Change nameservers** to Cloudflare pair (e.g. `ada.ns.cloudflare.com`, `bob.ns.cloudflare.com`)
5. Wait for propagation (minutes to 24h)
6. Verify:

```bash
npm run status
node scripts/verify-dns.mjs
curl -sI https://sbwebdev.net/work/transcarent | head -3
```

## Alternative: Keep Hostinger DNS (no nameserver change)

1. Pages → Custom domains → add `sbwebdev.net` — Cloudflare shows required CNAME/ALIAS targets
2. Hostinger DNS → replace `@` ALIAS and `www` CNAME with Cloudflare Pages targets
3. Do **not** delete MX records unless abandoning Titan email

## Current live state

- Apex + www → `connect.hostinger.com` (Website Builder)
- GitHub repo ready: https://github.com/balaliss/sbwebdev-site
- Astro build verified locally; deploy pending Cloudflare API token / Git integration
