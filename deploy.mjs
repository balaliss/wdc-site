#!/usr/bin/env node
/**
 * deploy.mjs — Build and deploy wissahickondatacollective.com to Cloudflare Pages.
 *
 * Usage:
 *   node deploy.mjs pages [--dry-run] [--skip-build]   Build + wrangler pages deploy
 *   node deploy.mjs build
 *   node deploy.mjs status
 *   node deploy.mjs preview
 */

import { existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync, spawn } from 'child_process';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const DIST_DIR = join(ROOT, 'dist');
const ENV_FILE = join(ROOT, '.env');
const LIVE_URL = 'https://wissahickondatacollective.com';
const PAGES_PROJECT = process.env.CLOUDFLARE_PAGES_PROJECT || 'wdc-site';

function parseArgs(argv) {
  const args = argv.slice(2);
  const cmd = args[0];
  const flags = { dryRun: false, skipBuild: false };
  for (const a of args.slice(1)) {
    if (a === '--dry-run') flags.dryRun = true;
    if (a === '--skip-build') flags.skipBuild = true;
  }
  return { cmd, flags };
}

export function resolveCloudflareConfig() {
  if (existsSync(ENV_FILE)) {
    dotenv.config({ path: ENV_FILE, override: true });
  }
  const apiToken = process.env.CLOUDFLARE_API_TOKEN?.trim();
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
  const project = process.env.CLOUDFLARE_PAGES_PROJECT?.trim() || PAGES_PROJECT;

  if (!apiToken) {
    const err = new Error('MISSING_ENV');
    err.hint =
      'Copy .env.example → .env and set CLOUDFLARE_API_TOKEN (Pages Edit permission).\n' +
      'Or push to main — GitHub Actions deploys automatically when CLOUDFLARE_API_TOKEN is in repo secrets.';
    throw err;
  }

  return { apiToken, accountId, project };
}

function commandExists(cmd) {
  try {
    execSync(`command -v ${cmd}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function preflightDist() {
  if (!existsSync(join(DIST_DIR, 'index.html'))) {
    const err = new Error('MISSING_DIST');
    err.hint = 'Run `npm run build` first.';
    throw err;
  }
}

function cmdBuild() {
  execSync('npm run build', {
    cwd: ROOT,
    stdio: 'inherit',
    env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
  });
  if (!existsSync(join(DIST_DIR, 'index.html'))) process.exit(1);
}

export function planPagesDeploy(config, { dryRun = false } = {}) {
  preflightDist();
  return {
    source: DIST_DIR,
    project: config.project,
    accountId: config.accountId,
    dryRun,
  };
}

function deployViaWrangler(plan, config) {
  if (!commandExists('npx')) {
    const err = new Error('NO_NPX');
    err.hint = 'Node.js npx is required for wrangler deploy.';
    throw err;
  }

  const env = {
    ...process.env,
    CLOUDFLARE_API_TOKEN: config.apiToken,
    ASTRO_TELEMETRY_DISABLED: '1',
  };
  if (config.accountId) env.CLOUDFLARE_ACCOUNT_ID = config.accountId;

  const args = [
    'wrangler',
    'pages',
    'deploy',
    plan.source,
    '--project-name',
    plan.project,
    '--commit-dirty=true',
  ];
  if (config.accountId) args.push('--branch', 'main');

  execSync(`npx ${args.map((a) => (a.includes(' ') ? `"${a}"` : a)).join(' ')}`, {
    cwd: ROOT,
    stdio: 'inherit',
    env,
  });
}

function cmdPages(flags) {
  let config;
  try {
    config = resolveCloudflareConfig();
  } catch (e) {
    console.error(e.hint || e.message);
    process.exit(1);
  }

  if (!flags.skipBuild) cmdBuild();
  else preflightDist();

  const plan = planPagesDeploy(config, { dryRun: flags.dryRun });

  if (flags.dryRun) {
    console.log(`Dry run — would deploy ${plan.source} → Cloudflare Pages project "${plan.project}"`);
    return;
  }

  console.log(`Deploying ${plan.source} → Cloudflare Pages (${plan.project}) ...`);
  try {
    deployViaWrangler(plan, config);
    console.log(`\nDone. Check ${LIVE_URL} or your *.pages.dev preview URL.`);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

function cmdStatus() {
  console.log(`Site — ${LIVE_URL}\n`);
  console.log(`Hosting: Cloudflare Pages (project: ${PAGES_PROJECT})`);
  console.log('Deploy: npm run deploy  OR  git push origin main');

  if (existsSync(join(DIST_DIR, 'index.html'))) {
    const st = statSync(join(DIST_DIR, 'index.html'));
    console.log(`\nBuilt dist/index.html: ${st.mtime.toISOString()} (${st.size} bytes)`);
  } else {
    console.log('\nNot built — run npm run build');
  }

  console.log('\nLive check:');
  try {
    const headers = execSync(`curl -sI "${LIVE_URL}"`, { encoding: 'utf-8', timeout: 15000 });
    const server = headers.match(/^server:\s*(.+)$/im)?.[1]?.trim() || 'unknown';
    const cfRay = headers.match(/^cf-ray:\s*(.+)$/im)?.[1]?.trim();
    const builder = /hostingerwebsitebuilder|platform:\s*hostinger/i.test(headers);
    const cloudflare = /cloudflare/i.test(headers) || Boolean(cfRay);

    console.log(`  Server: ${server}`);
    if (cfRay) console.log(`  CF-Ray: ${cfRay}`);
    console.log(`  Cloudflare Pages: ${cloudflare ? 'likely yes' : 'no'}`);
    console.log(`  Website Builder: ${builder ? 'YES (needs DNS cutover)' : 'no'}`);

    const bodySnippet = execSync(`curl -sL "${LIVE_URL}" | head -c 500`, {
      encoding: 'utf-8',
      timeout: 15000,
    });
    const astroLive = /Steven Balalis|Engineering leadership/i.test(bodySnippet);
    const builderLive = /Website Builder|Drive Your Business Forward/i.test(bodySnippet);
    if (astroLive) console.log('  Content: Astro portfolio detected');
    else if (builderLive) console.log('  Content: Hostinger Website Builder (cutover pending)');
  } catch (e) {
    console.log(`  Check failed: ${e.message}`);
  }
}

function cmdPreview() {
  if (!existsSync(join(DIST_DIR, 'index.html'))) cmdBuild();
  console.log('Preview at http://localhost:4321 (Ctrl+C to stop)\n');
  const child = spawn('npm', ['run', 'preview'], { cwd: ROOT, stdio: 'inherit' });
  process.on('SIGINT', () => {
    child.kill('SIGINT');
    process.exit(0);
  });
}

function usage() {
  console.log(`Usage:
  node deploy.mjs pages [--dry-run] [--skip-build]   Build + Cloudflare Pages deploy
  node deploy.mjs build                              Astro build only
  node deploy.mjs status                             Local build + live check
  node deploy.mjs preview                            Astro preview server

Git push to main also deploys via GitHub Actions (see .github/workflows/deploy.yml).`);
}

function main() {
  const { cmd, flags } = parseArgs(process.argv);
  switch (cmd) {
    case 'pages':
    case 'deploy':
      cmdPages(flags);
      break;
    case 'build':
      cmdBuild();
      break;
    case 'status':
      cmdStatus();
      break;
    case 'preview':
      cmdPreview();
      break;
    default:
      usage();
      process.exit(cmd ? 1 : 0);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
