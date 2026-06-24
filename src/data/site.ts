export const site = {
  name: 'Wissahickon Data Collective',
  title: 'Wissahickon Data Collective — Integration OS for Healthtech',
  tagline: 'Fractional platform lead for teams that cannot hire full-time yet',
  email: 'steve@wissahickondatacollective.com',
  founderName: 'Steven Balalis',
  founderUrl: 'https://sbwebdev.net',
  location: 'Lansdale, PA · Remote US',
  linkedin: 'https://linkedin.com/in/stevenbalalis',
  url: 'https://wissahickondatacollective.com',
  discoveryMailto:
    'mailto:steve@wissahickondatacollective.com?subject=Integration%20OS%20%E2%80%94%2020%20min%20discovery',
} as const;

export const consultingOffer = {
  name: 'Integration OS Retainer',
  headline: 'Turn integration chaos into a weekly operating rhythm',
  summary:
    'Month-to-month fractional engagement for healthtech and B2B SaaS teams stuck without a platform or integration lead. Intake gates, SLO/SLA framework, escalation tiers, observability review cadence — an operating model your team runs, not a deck.',
  priceRange: '$6–10K / month',
  hoursCap: 'Max 10 billable hrs/week',
  pilot: '90-day pilot · 2-week exit notice',
  schedule: 'Async-first · live sync Tue/Thu mornings ET',
  capacity: 'One client at a time',
} as const;

export const idealClient = [
  'VP Ops or Head of Data at mid-market healthtech (30–150 employees)',
  '20+ integrations or partner pipelines, no dedicated platform owner',
  'Reactive firefighting — no intake standards, escalation tiers, or reliability targets',
  'Cannot justify or fill a full-time integration/platform lead yet',
] as const;

export const deliverables = [
  {
    week: 'Week 1',
    artifact: 'Integration health audit',
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
    artifact: 'Weekly operating review',
    done: 'Cadence runs without you driving every ticket',
  },
] as const;

export const scopeBoundaries = {
  includes: [
    'Integration and platform operating cadence',
    'Intake, SLO/SLA, escalation, observability review rhythm',
    'Weekly operating review facilitation and async program ownership',
  ],
  excludes: [
    'Full CTO scope — no hiring, equity, or board work',
    'Open-ended embedding beyond 10 billable hrs/week',
    'Production engineering or hands-on pipeline builds',
  ],
} as const;

export const caseStudies = [
  {
    slug: 'transcarent',
    title: 'Data Integration Portfolio',
    company: 'Transcarent',
    meta: 'Led integration platform delivery',
    metric: '20+ programs · 30+ partners',
    excerpt:
      'Led delivery for a healthcare data integration portfolio — SLO/SLA governance, observability, and a P0 warehouse migration.',
    href: '/work/transcarent',
    external: null,
  },
  {
    slug: 'persevere',
    title: 'B2B Platform Operations',
    company: 'Persevere Now',
    meta: 'Led 14-person platform team',
    metric: '14 direct reports · A/B onboarding',
    excerpt:
      'Led platform roadmap, Scrum backlog, and a 14-person team for a B2B SaaS platform — including A/B tests that reduced onboarding drop-off.',
    href: '/work/persevere',
    external: null,
  },
] as const;

export const howIWork = [
  {
    title: 'Set technical direction',
    body: 'Align the team on the system problem, reliability targets, and what shipped means before committing engineering time.',
  },
  {
    title: 'Make systems visible',
    body: 'Dashboards, intake standards, and delivery cadence so engineering, analytics, and leadership share one picture of platform health.',
  },
  {
    title: 'Ship in slices',
    body: 'Phased plans for migrations and integrations — dependencies tracked, scope bounded, outcomes measured each sprint.',
  },
  {
    title: 'Run the cadence',
    body: 'Weekly operating reviews that leadership actually uses — not status theater, not slide decks.',
  },
] as const;
