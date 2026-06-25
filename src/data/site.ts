export const site = {
  name: 'Wissahickon Data Collective',
  title: 'Wissahickon Data Collective — AI & Tech Consulting for Healthtech',
  tagline: 'Fractional AI, tech implementation, and program leadership for healthtech teams',
  email: 'steve@wissahickondatacollective.com',
  founderName: 'Steven Balalis',
  founderUrl: 'https://sbwebdev.net',
  location: 'Lansdale, PA · Remote US',
  linkedin: 'https://linkedin.com/in/stevenbalalis',
  url: 'https://wissahickondatacollective.com',
  discoveryMailto:
    'mailto:steve@wissahickondatacollective.com?subject=Discovery%20Call%20%E2%80%94%2020%20min',
} as const;

// ─── Services ────────────────────────────────────────────────────────────────

export const services = [
  {
    slug: 'ai-implementation',
    name: 'AI Implementation Sprint',
    tagline: 'From AI curiosity to running workflow in 30 days',
    summary:
      'A focused engagement that takes your healthtech team from "we should use AI" to a live, scoped AI workflow with clear ownership and measurable results. Includes a stack audit, use-case prioritization, vendor/tool selection, and managed implementation with training handoff.',
    priceRange: '$8–12K',
    engagement: 'Fixed-scope · 4–6 weeks',
    deliverables: [
      'AI readiness audit — current stack, team skill gaps, compliance constraints',
      'Use-case shortlist with ROI scoring (3 ranked options)',
      'Vendor / tool selection memo',
      'Implemented pilot workflow with documentation',
      'Team training session + async playbook',
    ],
    bestFor: 'Teams that have budget and buy-in but no roadmap for where to start with AI',
  },
  {
    slug: 'integration-os',
    name: 'Integration OS Retainer',
    tagline: 'Turn integration chaos into a weekly operating rhythm',
    summary:
      'Month-to-month fractional engagement for healthtech teams stuck without a platform or integration lead. Intake gates, SLO/SLA framework, escalation tiers, observability review cadence — and AI-assisted triage and reporting built into the operating model from day one.',
    priceRange: '$6–10K / month',
    engagement: 'Max 10 hrs/week · 90-day pilot · 2-week exit notice',
    deliverables: [
      'Integration health audit — top 3 pain points agreed with sponsor',
      'Operating model doc — intake, ownership, escalation tiers',
      'SLO/SLA draft + observability agenda',
      'Weekly operating review cadence (runs without you driving every ticket)',
      'AI-assisted triage and status reporting layer',
    ],
    bestFor: '30–150 person healthtech teams with 20+ integrations and no dedicated platform lead',
  },
  {
    slug: 'fractional-tpm',
    name: 'Fractional TPM',
    tagline: 'Senior program leadership without the full-time headcount',
    summary:
      'On-demand technical program management for complex healthtech initiatives — platform migrations, partner onboarding programs, compliance-driven tech projects, or AI rollouts that need disciplined delivery ownership. You get requirements, phased plans, dependency tracking, and stakeholder communication — shipped.',
    priceRange: '$5–8K / month',
    engagement: 'Async-first · flexible hrs · rolling month-to-month',
    deliverables: [
      'Initiative scoping doc with goals, constraints, and success metrics',
      'Phased delivery plan with dependencies and owners',
      'Stakeholder communication cadence',
      'Risk register and escalation playbook',
      'AI-generated status reporting and retro artifacts',
    ],
    bestFor: 'Teams with a funded initiative but no TPM bandwidth to own end-to-end delivery',
  },
] as const;

// ─── Legacy offer (used by existing pages) ────────────────────────────────────
export const consultingOffer = {
  name: 'AI & Tech Consulting',
  headline: 'Fractional AI, integration, and program leadership for healthtech',
  summary:
    'Three focused services for healthtech teams that need AI implementation, integration ops, or technical program management — without hiring full-time. Every engagement is AI-delivered: faster strategy, sharper requirements, better QA.',
  priceRange: 'From $5K / month',
  hoursCap: 'Flexible scope per engagement',
  pilot: '90-day pilot · 2-week exit notice',
  schedule: 'Async-first · live sync Tue/Thu mornings ET',
  capacity: 'Two client slots available',
} as const;

// ─── Ideal client ─────────────────────────────────────────────────────────────
export const idealClient = [
  'VP of Ops, Head of Data, or CTO at a 30–200 person healthtech company',
  'Running 20+ integrations, a platform migration, or an AI pilot with no dedicated owner',
  'Cannot justify or fill a full-time platform lead, TPM, or AI engineer yet',
  'Needs delivery momentum — not a slide deck, a retainer that compounds every sprint',
] as const;

// ─── First-month deliverables (Integration OS) ───────────────────────────────
export const deliverables = [
  {
    week: 'Week 1',
    artifact: 'Audit + intake map',
    done: 'Top 3 pain points agreed with sponsor',
  },
  {
    week: 'Week 2',
    artifact: 'Operating model doc',
    done: 'Intake gates, ownership, escalation tiers signed off',
  },
  {
    week: 'Week 3',
    artifact: 'SLO/SLA draft + observability agenda',
    done: 'First weekly operating review held',
  },
  {
    week: 'Week 4+',
    artifact: 'AI-assisted weekly review',
    done: 'Cadence runs without you driving every ticket',
  },
] as const;

// ─── Scope boundaries ─────────────────────────────────────────────────────────
export const scopeBoundaries = {
  includes: [
    'AI use-case assessment, tool selection, and workflow implementation',
    'Integration and platform operating cadence (intake, SLO/SLA, escalation)',
    'Technical program management — requirements, phased plans, delivery ownership',
    'AI-assisted status reporting, triage notes, and retro artifacts',
  ],
  excludes: [
    'Full CTO scope — no equity, hiring authority, or board work',
    'Hands-on engineering or pipeline builds',
    'Open-ended embedding beyond agreed hour cap',
    'Legal, compliance, or HIPAA advisory (will refer)',
  ],
} as const;

// ─── Case studies ─────────────────────────────────────────────────────────────
export const caseStudies = [
  {
    slug: 'transcarent',
    title: 'AI-Enabled Integration Portfolio',
    company: 'Transcarent',
    meta: 'Technical Program Manager',
    metric: '20+ programs · 30+ partners · AI-assisted ops',
    excerpt:
      'Led delivery for a healthcare data integration portfolio — SLO/SLA governance, observability dashboard, Redshift-to-Databricks migration, and AI enablement workshops for the integration team.',
    href: '/work/transcarent',
    external: null,
  },
  {
    slug: 'persevere',
    title: 'B2B Platform Operations',
    company: 'Persevere Now',
    meta: 'Platform Program Lead',
    metric: '14 direct reports · A/B onboarding',
    excerpt:
      'Led platform roadmap, Scrum backlog, and a 14-person team for a B2B SaaS platform — including A/B tests that reduced onboarding drop-off.',
    href: '/work/persevere',
    external: null,
  },
] as const;

// ─── How we work ──────────────────────────────────────────────────────────────
export const howIWork = [
  {
    title: 'AI-delivered, not AI-assisted',
    body: 'Every engagement uses multi-agent AI for strategy reviews, requirements drafts, QA, and status reports. You get senior-level output faster and at a fraction of traditional consulting rates.',
  },
  {
    title: 'Set technical direction first',
    body: 'Align the team on the problem, reliability targets, and what "done" means before any engineering time is committed.',
  },
  {
    title: 'Make systems visible',
    body: 'Dashboards, intake standards, and delivery cadence so engineering, analytics, and leadership share one picture of platform health.',
  },
  {
    title: 'Ship in slices',
    body: 'Phased plans for AI rollouts, migrations, and integrations — dependencies tracked, scope bounded, outcomes measured each sprint.',
  },
] as const;

// ─── AI differentiator ───────────────────────────────────────────────────────
export const aiDifferentiator = {
  headline: 'Consulting that uses AI to deliver consulting',
  body: 'Most consultants charge premium rates for work that hasn\'t changed in 20 years. Every WDC engagement is powered by multi-agent AI systems — for strategy reviews, requirements documents, QA passes, and status artifacts. The result: senior-quality output at faster turnaround and lower cost than a traditional firm.',
  points: [
    'Multi-agent AI review on every major deliverable before it hits your inbox',
    'AI-generated status reports, triage notes, and retro artifacts included',
    'Async-first model means you\'re not paying for hour-long meetings',
  ],
} as const;
