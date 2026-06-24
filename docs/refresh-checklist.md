# Refresh checklist — sbwebdev.net

Audit date: 2026-06-23

## Sources compared

| Source | Notes |
|--------|-------|
| Live Website Builder | Hero, services, contact — visual Builder layout; migrating to Astro |
| career-ops `cv.md` | Canonical metrics and experience bullets |
| Astro scaffold (this repo) | Case studies: Transcarent, Persevere, Network Funnel |

## Pages

| Page | Status | Action |
|------|--------|--------|
| `/` Homepage | Updated | Hero for EM/Tech Lead/Applied AI; case study cards; how I work; open-to section |
| `/work/transcarent` | OK | Metrics match cv: 20+ programs, 30+ partners, 15–20 issues/week |
| `/work/persevere` | OK | 14 reports, B2B platform, A/B onboarding |
| `/work/network-funnel` | Updated | Demo rebuild noted; case study on site |
| `/writing` | OK | Substack + career-ops links |
| `/resume.pdf` | Copy from career-ops | Regenerate when cv changes |

## Metrics synced from cv.md

- Transcarent: 20+ programs, 30+ partners, 15–20 prod issues/week, Redshift→Databricks
- Persevere: 14 direct reports, B2B SaaS, A/B onboarding
- Certs: PSPO I, LSSBB, AWS CP, Salesforce AI Associate, AWS AI Practitioner (in progress)
- Education: M.S. AI/ML Eastern U. in progress (2026)

## Design refresh

- [x] Typography: DM Sans + Fraunces (Google Fonts)
- [x] Refined color palette (warm neutral + teal accent, dark-mode friendly)
- [x] Stronger hero hierarchy and CTA row (resume, LinkedIn, email, Substack)
- [x] Card hover states and spacing
- [x] og-image.svg + favicon aligned to EM/Tech Lead positioning
- [ ] User approval via `npm run dev` before production deploy

## Pre-deploy

- [ ] hPanel: migrate off Website Builder (see HOSTINGER-MIGRATION.md)
- [ ] `.env` with SFTP credentials
- [ ] `npm run build && npm run deploy`
