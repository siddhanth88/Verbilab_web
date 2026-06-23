export const BLOGS = [
  {
    slug: 'audit-every-call-not-samples',
    title: 'Why Enterprises Should Audit Every Call — Not 2% Samples',
    date: 'June 2026',
    readTime: '5 min',
    excerpt:
      'Manual QA was built for a world of smaller call volumes. Applied AI makes full-coverage audit practical — here’s what changes when you stop sampling.',
    body: [
      'Most contact centres still rely on manual QA that reviews a tiny fraction of calls. That made sense when listening was slow and expensive. It makes less sense when AI can score transcripts in seconds and surface risk before it becomes a compliance incident.',
      'Sampling creates blind spots. The calls you skip may be the ones with mis-selling, policy breaches, or customer frustration that shows up later as churn or regulatory attention. Full audit coverage doesn’t replace human reviewers — it gives them a complete map instead of a random slice.',
      'Verbilab Call Audit is built for this shift: ingest audio or transcripts, apply your scorecard, flag exceptions, and route issues to the right team. Supervisors spend time on high-signal reviews, not hunting for which 3% to listen to this week.',
      'The business case is straightforward: fewer escaped defects, faster coaching loops, and audit trails that stand up when leadership or regulators ask what you knew and when.',
    ],
  },
  {
    slug: 'ai-workflow-automation-for-bpo',
    title: 'AI Workflow Automation for BPO: Less Copy-Paste, More Outcomes',
    date: 'June 2026',
    readTime: '6 min',
    excerpt:
      'BPO teams lose hours to swivel-chair work between CRM, dialler, and ticketing tools. Applied AI automates the handoffs that slow agents down.',
    body: [
      'BPO operations run on repetition — logging outcomes, updating CRM fields, tagging dispositions, escalating exceptions. Much of it is rules-based, yet still done by hand because systems don’t talk to each other cleanly.',
      'Workflow automation with AI doesn’t mean replacing agents. It means removing the low-value steps between meaningful conversations: summarising calls, pre-filling forms, routing tickets, and triggering follow-ups when keywords or sentiment cross a threshold.',
      'The best automations start narrow — one queue, one after-call workflow, one integration — then expand once teams trust the outputs. Verbilab designs for operational reality: human-in-the-loop where judgment matters, straight-through processing where it doesn’t.',
      'Measured right, automation shows up as faster handle times, fewer errors, and supervisors who spend less time chasing status updates and more time improving performance.',
    ],
  },
  {
    slug: 'compliance-ready-ai-audit-trails',
    title: 'Compliance-Ready AI: Building Audit Trails Enterprises Trust',
    date: 'May 2026',
    readTime: '5 min',
    excerpt:
      'Regulated teams can’t adopt AI that’s a black box. Here’s how to design auditability into applied AI from day one.',
    body: [
      'Compliance teams ask the same questions about AI: What decision was made? On what evidence? Who reviewed it? Can we reproduce it six months from now?',
      'Applied AI for operations must answer those questions with structured logs — transcript excerpts, score breakdowns, rule hits, reviewer actions, and timestamps. Black-box scores are a non-starter in BFSI, healthcare-adjacent workflows, and any environment with external audit pressure.',
      'Verbilab products are oriented around traceability: what was flagged, why, and what happened next. That’s how AI moves from “interesting pilot” to “approved production system.”',
      'Start with retention and access policies that match your industry, then layer automation on top of evidence you’d be comfortable showing an auditor.',
    ],
  },
  {
    slug: 'from-call-transcripts-to-decisions',
    title: 'From Call Transcripts to Decisions: Turning Voice Data Into Action',
    date: 'May 2026',
    readTime: '4 min',
    excerpt:
      'Transcripts are only useful when they feed dashboards, alerts, and workflows. Here’s the path from raw calls to operational decisions.',
    body: [
      'Enterprises record millions of minutes of calls. Most of that voice data sits in storage, queried only when something goes wrong. The gap isn’t transcription — it’s operationalisation.',
      'The pipeline looks like this: capture → transcribe → score → aggregate → alert → act. Scoring against business rules turns conversations into KPIs. Aggregation shows trends by team, product, or region. Alerts push exceptions to supervisors before they compound.',
      'Verbilab sits in the middle of that stack — not as a generic analytics toy, but as applied AI wired to how ops teams actually work: QA, risk, coaching, and compliance.',
      'When transcripts drive decisions, leadership stops debating anecdotes and starts managing from a shared, evidence-based view of the floor.',
    ],
  },
  {
    slug: 'applied-ai-vs-generic-chatbots',
    title: 'Applied AI vs Generic Chatbots: What Enterprises Actually Need',
    date: 'April 2026',
    readTime: '5 min',
    excerpt:
      'Chatbots get the headlines. Applied AI gets the P&L impact. Here’s how to tell the difference before you buy.',
    body: [
      'Generic chatbots answer FAQs. Applied AI changes how work gets done — auditing calls, automating handoffs, scoring risk, and feeding systems of record with structured outputs.',
      'The buying mistake we see often: procuring a horizontal AI platform and asking ops to “find use cases.” The alternative is starting from a painful, measurable problem — QA coverage, compliance gaps, manual after-call work — and shipping a product-shaped solution.',
      'Verbilab is a studio of applied AI products for that second path. Call Audit for coverage. Workflow automation for throughput. Comply-oriented tooling for teams that need defensible trails.',
      'If your goal is brand novelty, a chatbot might be enough. If your goal is operational lift, you need systems that integrate, measure, and improve — not another conversation layer on the side.',
    ],
  },
]

export function getBlogBySlug(slug) {
  return BLOGS.find((b) => b.slug === slug)
}
