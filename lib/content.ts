// ─────────────────────────────────────────────────────────────────────────────
// EDIT EVERYTHING HERE. This is the single source of content for the site.
// Search for "TODO" to find the values you still need to fill in.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Abdulhadi Nasir Bashir",
  role: "Full-Stack Software Engineer",
  // The one-line pitch shown under the name.
  tagline: "I design and ship complete production systems — from database schema to containerized deployment.",
  email: "abdulhadiny@gmail.com",
  github: "https://github.com/Abdulhadiny",
  // TODO: add your LinkedIn URL (or leave "" to hide the link).
  linkedin: "",
  // TODO: set your location, e.g. "Kano, Nigeria".
  location: "Nigeria",
  // Shown next to the availability dot in the hero.
  availability: "Open to remote & full-time software engineer roles",
};

export const intro =
  "Full-stack engineer working primarily in the TypeScript / React / Next.js ecosystem, with real range into two backend persistence models, native mobile with on-device machine learning, and generative-AI integration. I build role-secured, transaction-safe line-of-business systems, and treat testing, security hardening, and CI/CD as part of delivery rather than an afterthought.";

// role: the honest ownership label. type: "live" (public repo + demo) or "case-study" (client-owned, private).
export type Project = {
  name: string;
  role: string;
  type: "live" | "case-study";
  summary: string;
  stack: string[];
  meta?: string; // small badge, e.g. "40 tests"
  links?: { label: string; href: string }[];
  caseStudy?: {
    context: string;
    contribution: string;
    highlights: { title: string; body: string }[];
  };
};

export const projects: Project[] = [
  {
    name: "Transleto",
    role: "Sole author",
    type: "live",
    summary:
      "A collaborative translation-workflow platform that replaces ad-hoc processes with a structured, role-based, auditable pipeline — featuring a trigram-powered translation memory and full document round-tripping.",
    stack: ["Next.js 16", "TypeScript", "PostgreSQL / Prisma", "NextAuth v5", "pg_trgm", "Vitest"],
    meta: "40 tests",
    links: [
      // TODO: replace "#" with the deployed demo URL once it's live.
      { label: "Live demo", href: "#" },
      // TODO: replace with the public GitHub repo URL.
      { label: "GitHub", href: "#" },
    ],
  },
  {
    name: "RentFlow",
    role: "Sole author",
    type: "live",
    summary:
      "A staff-facing ERP for an event-rental business managing the full lifecycle across multiple stores — a transactional inventory ledger, bookings, condition-based returns, payment reconciliation, and P&L.",
    stack: ["Next.js 16", "React 19", "Prisma 7", "Neon", "React Query", "Vitest"],
    meta: "17 tests",
    links: [
      // TODO: replace "#" with the deployed demo URL once it's live.
      { label: "Live demo", href: "#" },
      // TODO: replace with the public GitHub repo URL.
      { label: "GitHub", href: "#" },
    ],
  },
  {
    name: "Procurement & Purchase-Order Platform",
    role: "Lead engineer",
    type: "case-study",
    summary:
      "A platform for a distribution business that runs on Local Purchase Orders — modeling the full order lifecycle as a state machine and handling money correctly on both sides of every transaction.",
    stack: ["Next.js 16", "Server Actions", "PostgreSQL / Prisma", "NextAuth v5", "Zod", "Docker"],
    meta: "Code private",
    caseStudy: {
      context:
        "The business buys from suppliers and sells onward, dispatching trucks between locations. Tracked in spreadsheets it broke down: order numbers collided, deliveries weren't matched to orders, and — the expensive one — payments weren't reconciled correctly because two different withholding taxes applied.",
      contribution:
        "As lead engineer and largest contributor, I built the data model, the server-action API layer, the role-based access control, and the financial computation and reconciliation logic.",
      highlights: [
        {
          title: "Dual-sided reconciliation with two withholding taxes",
          body: "An order settles only when both payment directions are paid, each net of the tax withheld on that side. I isolated this into a pure, tolerance-aware predicate — an earlier version applied one tax to both sides and silently mis-stated balances.",
        },
        {
          title: "Race-free sequential order numbers",
          body: "Human-readable order numbers can collide under concurrency, so I generate them with a database transaction and an atomic per-year counter — no duplicates are possible.",
        },
        {
          title: "A state machine you can't bypass",
          body: "Every transition is guarded server-side: only submitted orders can be approved, orders can't be cancelled with weighed-in trucks, and dispatch is blocked on completed orders.",
        },
        {
          title: "Context-aware, location-scoped authorization",
          body: "Some permissions depend on where the user is — a destination operator can weigh a truck only when its location matches theirs — enforced at both the action entry point and the query layer.",
        },
      ],
    },
  },
  {
    name: "Manufacturing & Inventory ERP",
    role: "Core engineer",
    type: "case-study",
    summary:
      "An internal ERP for a recycling manufacturer modeling the full physical pipeline — waste to crushed, blended, packaged, finished goods — through to sales and finance, with automated operations and a complete audit trail.",
    stack: ["Next.js 16", "PostgreSQL / Prisma", "NextAuth", "node-cron", "SendGrid", "GitHub Actions"],
    meta: "Code private",
    caseStudy: {
      context:
        "A recycling manufacturer needed to track physical stock as it changes form through a five-stage pipeline, while running the money side — supplier payments, sales, wallets, expenses, and P&L. The hard requirements: stock accuracy under concurrency, no double-charged payments, and correct dates on UTC infrastructure.",
      contribution:
        "As a core engineer and the largest single contributor, I focused on the transactional inventory and payment engines, the scheduled-operations subsystem, and application security hardening.",
      highlights: [
        {
          title: "Transactional inventory ledger",
          body: "Crediting or debiting a store updates the quantity, appends an immutable transaction record, and writes an audit entry in one transaction — and the engine can join a larger operation atomically while refusing to over-draw stock.",
        },
        {
          title: "Exactly-once payments via idempotency keys",
          body: "Payments carry an idempotency key backed by a unique column, so a double-submitted request collapses to a single recorded payment — while advancing the linked sale's status in the same transaction.",
        },
        {
          title: "Resilient scheduled operations",
          body: "A node-cron scheduler runs recurring alerts and reports, tracks each run, and reconciles runs left 'in progress' after a crash to failed on restart — self-healing rather than silently stuck.",
        },
        {
          title: "Security hardening as part of delivery",
          body: "A strict CSP and header suite, error-message allow-listing so internal errors never leak, and a CI gate that fails pull requests on high/critical npm audit findings.",
        },
      ],
    },
  },
];

export const differentiators = [
  {
    title: "Whole-product ownership",
    body: "Sole author of complete applications and lead/top contributor on several more — schema, API, auth, and deployment, not just features.",
  },
  {
    title: "Two database paradigms",
    body: "Comfortable in both relational (PostgreSQL / Prisma) and document (MongoDB / Mongoose) modeling, with disciplined schema design.",
  },
  {
    title: "Financial-systems correctness",
    body: "Interactive transactions, idempotency keys, append-only ledgers, decimal money, and tolerance-aware reconciliation.",
  },
  {
    title: "Applied ML & AI",
    body: "On-device face recognition with TensorFlow Lite in Flutter, and generative-AI flows with Google Genkit (Gemini).",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Dart", "SQL"] },
  { group: "Frontend", items: ["React 19", "Next.js", "Tailwind CSS", "shadcn/ui", "Redux Toolkit / RTK Query", "TanStack React Query"] },
  { group: "Backend & Data", items: ["Node.js", "PostgreSQL", "Prisma", "MongoDB", "Mongoose", "REST APIs", "Zod"] },
  { group: "Auth & Security", items: ["NextAuth", "JWT", "bcrypt", "RBAC", "CSP / security headers"] },
  { group: "Mobile & ML", items: ["Flutter", "TensorFlow Lite", "Google ML Kit", "Google Genkit (Gemini)"] },
  { group: "DevOps", items: ["Docker", "GitHub Actions", "CI/CD", "Vercel", "Dependabot"] },
];
