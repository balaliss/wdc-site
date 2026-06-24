# AWS stack decommission (optional)

The S3 + CloudFront stack was an earlier hosting experiment (~$1–2/mo). Production is **Cloudflare Pages**.

## Before decommissioning

1. Confirm Cloudflare cutover: `npm run status` shows Astro portfolio
2. Confirm: `node scripts/verify-dns.mjs` passes
3. Do **not** decommission if DNS still points to CloudFront

## Resources to remove (career-ops reference)

| Resource | ID / name |
|----------|-----------|
| CloudFront distribution | `E4WRP0QVRXZ0G` |
| S3 bucket | `sbwebdev-portfolio-site` |
| ACM certificate | see `career-ops/site/aws/.acm-arn` |
| CloudFormation stack | `sbwebdev-portfolio` |

Full steps: `career-ops/site/aws/DECOMMISSION.md`

## GitHub

Remove AWS deploy secrets from `career-ops` repo if present:
- `SBWEBDEV_AWS_ACCESS_KEY_ID`
- `SBWEBDEV_AWS_SECRET_ACCESS_KEY`
- `SBWEBDEV_CLOUDFRONT_DIST_ID`

## CLI (when ready)

```bash
# Requires AWS CLI configured
aws cloudfront get-distribution --id E4WRP0QVRXZ0G
aws s3 rm s3://sbwebdev-portfolio-site --recursive
aws s3 rb s3://sbwebdev-portfolio-site
# Disable/delete CloudFront distribution, then delete stack
```

Run only after Cloudflare Pages is live on sbwebdev.net.
