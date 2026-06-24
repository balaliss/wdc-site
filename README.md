# wissahickondatacollective.com

Business site for **Wissahickon Data Collective** — Integration OS consulting for healthtech.

Separate from [sbwebdev.net](https://sbwebdev.net) (personal portfolio + job search).

## Local dev

```bash
npm install
npm run dev    # http://localhost:4321
npm run build
```

## Deploy (Cloudflare Pages)

1. Create a **new** Cloudflare Pages project: `wdc-site` (do not reuse `sbwebdev`)
2. Copy `.env.example` → `.env` and set `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`
3. `npm run deploy`

Or push to GitHub repo `balaliss/wdc-site` with the same secrets as sbwebdev but `CLOUDFLARE_PAGES_PROJECT=wdc-site`.

## DNS (after Pages is live)

In Hostinger DNS for `wissahickondatacollective.com`:

- Point `@` and `www` to Cloudflare Pages (replace `*.cdn.hstgr.net` Website Builder records)
- Retire Hostinger Website Builder for this domain

## Content

- **Home:** Integration OS offer, ideal client, deliverables, proof (Transcarent, Persevere)
- **/services:** Full scope, boundaries, pricing band
- **Contact:** steve@wissahickondatacollective.com
