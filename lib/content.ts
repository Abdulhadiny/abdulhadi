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
  linkedin: "https://www.linkedin.com/in/abdulhadi-n-bashir",
  // TODO: set your location, e.g. "Kano, Nigeria".
  location: "Kano, Nigeria",
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
    role: "Developer",
    type: "live",
    summary:
      "A collaborative translation-workflow platform that replaces ad-hoc processes with a structured, role-based, auditable pipeline — featuring a trigram-powered translation memory and full document round-tripping.",
    stack: ["Next.js 16", "TypeScript", "PostgreSQL / Prisma", "NextAuth v5", "pg_trgm", "Vitest"],
    meta: "",
    links: [
      // TODO: replace "#" with the deployed demo URL once it's live.
      { label: "Live demo", href: "https://transleto.vercel.app/login" },
      // TODO: replace with the public GitHub repo URL.
      { label: "GitHub", href: "https://github.com/Abdulhadiny/transleto" },
    ],
  },
  {
    name: "AS Deco",
    role: "Developer",
    type: "live",
    summary:
      "A staff-facing ERP for an event-rental business managing the full lifecycle across multiple stores — a transactional inventory ledger, bookings, condition-based returns, payment reconciliation, and P&L.",
    stack: ["Next.js 16", "React 19", "Prisma 7", "Neon", "React Query", "Vitest"],
    meta: "",
    links: [
      // TODO: replace "#" with the deployed demo URL once it's live.
      { label: "Live demo", href: "https://as-deco-rho.vercel.app/login" },
      // TODO: replace with the public GitHub repo URL.
      { label: "GitHub", href: "https://github.com/Abdulhadiny/as-deco" },
    ],
  },
  {
    name: "KAMATS",
    role: "Software Engineer",
    type: "case-study",
    summary:
      "A production supply-chain and procurement ERP covering procurement, inventory, transfers, quality inspection, weighbridge, dispatch, and tender workflows, with role-based authorization, auditability, and transactional business operations.",
    stack: [
      "C# / .NET",
      "EF Core",
      "PostgreSQL",
      "Next.js",
      "TypeScript",
      "RTK Query",
      "Docker",
    ],
    meta: "Production ERP",
    caseStudy: {
      context:
        "A production ERP supporting operational workflows across procurement, inventory, logistics, quality inspection, weighbridge, dispatch, and tender management.",
      contribution:
        "I led development of the operator-facing Next.js application while also contributing substantially to backend .NET domain services. My work included authorization, business-rule enforcement, auditability, data-integrity fixes, and transactional workflow reliability.",
      highlights: [
        {
          title: "Role-based authorization and segregation of duties",
          body:
            "Implemented and tested role-based permissions and operational scope restrictions, including segregation-of-duties controls across business workflows.",
        },
        {
          title: "Data-integrity remediation",
          body:
            "Investigated and fixed 7 high-severity data-integrity issues and added regression coverage around authorization, supplier isolation, and business-rule enforcement.",
        },
        {
          title: "Audit instrumentation",
          body:
            "Added audit instrumentation across 13 domain services covering 54 business events, improving traceability of operational actions.",
        },
        {
          title: "Transactional and concurrency reliability",
          body:
            "Worked on goods-receipt processing issues involving transaction boundaries and concurrency-token handling to maintain reliable state under concurrent operations.",
        },
        {
          title: "Typed frontend API integration",
          body:
            "Built the frontend API layer using RTK Query and OpenAPI-generated TypeScript contracts, including token refresh and normalized error handling.",
        },
      ],
    },
  },
  {
    name: "CromaChain Procurement & Logistics Platform",
    role: "Software Engineer",
    type: "case-study",
    summary:
      "A procurement and logistics platform that models the complete purchase-order lifecycle from requisition and approval through truck dispatch, weigh-in, payment, and reconciliation.",
    stack: [
      "Next.js 16",
      "TypeScript",
      "Server Actions",
      "PostgreSQL / Prisma",
      "NextAuth",
      "Zod",
      "Docker",
    ],
    meta: "Production ERP",
    links: [
      // TODO: replace "#" with the deployed demo URL once it's live.
      { label: "Live demo", href: "https://croma-chain.demo.hubuk.ng/login" },
      // TODO: replace with the public GitHub repo URL.
      { label: "GitHub", href: "#" },
    ],
    caseStudy: {
      context:
        "The business manages procurement and physical goods movement across locations. The platform replaces fragmented operational processes with a controlled workflow covering requisitions, approvals, dispatch, weighing, payments, and reconciliation.",
      contribution:
        "I independently designed and built the platform's relational data model, server-side business logic, authorization layer, workflow enforcement, and financial reconciliation logic.",
      highlights: [
        {
          title: "End-to-end procurement workflow",
          body:
            "Built the workflow from requisition and approval through truck dispatch, weigh-in, payment, and final reconciliation.",
        },
        {
          title: "Server-side workflow enforcement",
          body:
            "Implemented approximately 59 server actions following an authentication → permission → validation → transaction → audit pipeline.",
        },
        {
          title: "Location-scoped RBAC",
          body:
            "Implemented role-based authorization across seven roles, with permissions scoped to operational locations where required.",
        },
        {
          title: "Two-sided payment reconciliation",
          body:
            "Built reconciliation logic covering the payment obligations on both sides of the transaction, including the applicable withholding-tax deductions and settlement conditions.",
        },
        {
          title: "Transactional business operations",
          body:
            "Designed the PostgreSQL/Prisma data model and transactional service logic around the application's core procurement and logistics operations.",
        },
      ],
    },
  },
  {
    name: "CromERP Inventory, Production & Finance ERP",
    role: "Software Engineer",
    type: "case-study",
    summary:
      "An ERP-style application for a plastics recycling and manufacturing business covering supply, recycling, production, inventory, sales, finance, invoices, receipts, notifications, and audit trails.",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "PostgreSQL / Prisma",
      "NextAuth",
      "Docker",
      "GitHub Actions",
    ],
    meta: "Production ERP",
    links: [
      // TODO: replace "#" with the deployed demo URL once it's live.
      { label: "Live demo", href: "https://croma-erp.demo.hubuk.ng/login" },
      // TODO: replace with the public GitHub repo URL.
      { label: "GitHub", href: "#" },
    ],
    caseStudy: {
      context:
        "A plastics recycling and manufacturing business needed a single operational system to track raw-material purchasing, physical stock transformation, production, sales, supplier and customer payments, expenses, and financial reporting.",
      contribution:
        "I built the core business application across its operational domains, including the relational data model, server-side authorization, transactional inventory and payment workflows, auditability, financial reporting, and deployment setup.",
      highlights: [
        {
          title: "Transactional inventory engine",
          body:
            "Implemented inventory operations so stock movements, transaction records, and audit entries are handled atomically while preventing invalid stock deductions.",
        },
        {
          title: "Multi-stage manufacturing inventory",
          body:
            "Modeled inventory across the physical production pipeline from waste through crushed, blended, packaged, and finished goods, with stock tracked across five stores.",
        },
        {
          title: "Payment reconciliation and ledgers",
          body:
            "Implemented supplier and customer payment workflows with running ledgers and reconciliation logic across the application's financial operations.",
        },
        {
          title: "Role-based access control",
          body:
            "Implemented server-side RBAC and permission enforcement across operational modules and user roles.",
        },
        {
          title: "Operational reporting",
          body:
            "Implemented financial and operational capabilities including expenses, P&L reporting, invoices, receipts, notifications, and audit records.",
        },
        {
          title: "Containerized production deployment",
          body:
            "Configured the application as a standalone Docker deployment with PostgreSQL/Prisma migrations and a production deployment workflow using GitHub Actions, GHCR, and Docker Compose.",
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
