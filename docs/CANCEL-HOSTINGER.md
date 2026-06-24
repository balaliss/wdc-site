# Cancel Hostinger hosting (keep domain)

After sbwebdev.net serves the Astro site from Cloudflare Pages.

## Keep

- **Domain registration** for sbwebdev.net (renewal ~$10–15/yr)
- Optional: Titan email if you want to keep the mailbox (you said it's mostly spam)

## Cancel

1. hPanel → **Websites** → remove/disconnect **Website Builder** for sbwebdev.net
2. **Premium Web Hosting** — already `non_renewing` on your account (expires 2027-10-05); no action needed unless you want early cancellation
3. Do **not** delete the domain itself
4. **Titan Business** email ($19/yr) — cancel separately if you want to drop unused mail

## DNS after cutover

If using Cloudflare nameservers, DNS is managed in Cloudflare — not Hostinger.

If keeping Hostinger DNS only, ensure apex + www point to Cloudflare Pages (see [DEPLOY-CLOUDFLARE.md](DEPLOY-CLOUDFLARE.md)).

## Verify before canceling

```bash
npm run status          # Content: Astro portfolio detected
node scripts/verify-dns.mjs   # PASS — Cloudflare Pages
curl -sI https://sbwebdev.net/work/transcarent | head -3
```
