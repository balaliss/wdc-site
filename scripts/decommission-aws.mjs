#!/usr/bin/env node
/**
 * decommission-aws.mjs — Remove idle S3/CloudFront stack (~$1-2/mo).
 * Run ONLY after Cloudflare Pages is live on sbwebdev.net.
 *
 * Usage:
 *   node scripts/decommission-aws.mjs check
 *   node scripts/decommission-aws.mjs decommission --confirm
 */
import { execSync } from 'child_process';

const DIST_ID = 'E4WRP0QVRXZ0G';
const BUCKET = 'sbwebdev-portfolio-site';
const STACK = 'sbwebdev-portfolio';
const LIVE_URL = 'https://sbwebdev.net';

function run(cmd, { ignoreError = false } = {}) {
  try {
    return execSync(cmd, { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch (e) {
    if (ignoreError) return null;
    throw e;
  }
}

function cmdCheck() {
  console.log('AWS decommission preflight\n');

  try {
    run('aws sts get-caller-identity');
    console.log('AWS CLI: authenticated');
  } catch {
    console.error('AWS CLI not configured. Skip decommission or run aws configure.');
    process.exit(1);
  }

  const headers = run(`curl -sI "${LIVE_URL}"`, { ignoreError: true }) || '';
  const onCloudflare = /cloudflare|cf-ray/i.test(headers);
  const onBuilder = /hostingerwebsitebuilder|platform:\s*hostinger/i.test(headers);
  const onCloudFront = /cloudfront/i.test(headers);

  console.log(`Live ${LIVE_URL}:`);
  console.log('  Cloudflare:', onCloudflare ? 'yes' : 'no');
  console.log('  CloudFront:', onCloudFront ? 'yes' : 'no');
  console.log('  Website Builder:', onBuilder ? 'yes' : 'no');

  if (!onCloudflare) {
    console.error('\nBLOCKED: Cloudflare Pages cutover not detected. Decommission after verify-dns.mjs passes.');
    process.exit(1);
  }

  const dist = run(`aws cloudfront get-distribution --id ${DIST_ID} --query Distribution.Status --output text`, {
    ignoreError: true,
  });
  console.log(`\nCloudFront ${DIST_ID}: ${dist || 'not found'}`);

  const bucket = run(`aws s3 ls s3://${BUCKET} 2>&1 | head -3`, { ignoreError: true });
  console.log(`S3 ${BUCKET}:`, bucket ? 'exists' : 'empty or missing');

  console.log('\nReady for decommission. Run: node scripts/decommission-aws.mjs decommission --confirm');
}

function cmdDecommission() {
  if (!process.argv.includes('--confirm')) {
    console.error('Refusing without --confirm. Run check first.');
    process.exit(1);
  }
  cmdCheck();

  console.log('\nDecommissioning AWS resources...');

  // Disable CloudFront distribution (requires ETag — simplified: user may need console)
  console.log('1. Disable CloudFront distribution in AWS console (or use aws cloudfront update-distribution)');
  console.log('2. Empty S3 bucket:');
  run(`aws s3 rm s3://${BUCKET} --recursive`, { ignoreError: true });
  run(`aws s3 rb s3://${BUCKET}`, { ignoreError: true });
  console.log('3. Delete CloudFormation stack:');
  run(`aws cloudformation delete-stack --stack-name ${STACK} --region us-east-1`, { ignoreError: true });

  console.log('\nDone (partial — confirm CloudFront disabled in console).');
  console.log('Remove GitHub secrets: SBWEBDEV_AWS_* from career-ops repo if present.');
}

const cmd = process.argv[2];
if (cmd === 'check') cmdCheck();
else if (cmd === 'decommission') cmdDecommission();
else {
  console.log('Usage: node scripts/decommission-aws.mjs check|decommission --confirm');
  process.exit(1);
}
