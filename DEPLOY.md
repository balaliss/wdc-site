# Deploy sbwebdev.net

Production: **Cloudflare Pages** ($0/mo). See [docs/DEPLOY-CLOUDFLARE.md](docs/DEPLOY-CLOUDFLARE.md) for full setup.

## Quick start

```bash
npm install
npm run dev          # http://localhost:4321
npm run build
npm run deploy       # CLI → Cloudflare Pages (needs .env)
npm run status       # local build + live check
```

## Publish changes

- **Git push:** `git push origin main` → GitHub Actions deploys automatically
- **CLI:** `npm run deploy` after setting `CLOUDFLARE_API_TOKEN` in `.env`

## Domain

- Registrar: Hostinger (keep registration, cancel hosting after cutover)
- DNS + hosting: Cloudflare Pages
- Cutover checklist: [docs/CANCEL-HOSTINGER.md](docs/CANCEL-HOSTINGER.md)
