// ─────────────────────────────────────────────────────────────────────────────
// EDIT EVERYTHING HERE. This is the single source of content for the site.
// Search for "TODO" to find the values you still need to fill in.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Abdulhadi Nasir Bashir",
  role: "Full-Stack Software Engineer",
  tagline: "I build procurement, inventory and finance software in C#/.NET and TypeScript.",
  email: "abdulhadiny@gmail.com",
  github: "https://github.com/Abdulhadiny",
  linkedin: "https://www.linkedin.com/in/abdulhadi-n-bashir",
  location: "Kano, Nigeria",
  availability: "Open to remote and full-time roles · UTC+1",
};

export const intro =
  "Software engineer at Hubuk Technology in Kano, building business software for government and commercial clients: procurement, stock control, payments and approvals. I write C# with EF Core on the backend and TypeScript with Next.js on the front end, over PostgreSQL. Most of my attention goes to the parts that are costly to get wrong: permissions, stock and money movements, and the audit trail.";

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
      "A translation workflow system for English–Hausa teams. Tasks move through a state machine enforced on the server, with ownership checks, a shared glossary, an audit log, and a translation memory that suggests past translations by PostgreSQL trigram similarity.",
    stack: ["Next.js 16", "TypeScript", "PostgreSQL / Prisma", "NextAuth v5", "pg_trgm", "Vitest"],
    meta: "40 tests",
    links: [
      // TODO: replace "#" with the deployed demo URL once it's live.
      { label: "Live demo", href: "https://transleto.vercel.app/login" },
      // TODO: replace with the public GitHub repo URL.
      { label: "GitHub", href: "https://github.com/Abdulhadiny/transleto" },
    ],
  },
  {
    name: "AS Deco",
    role: "Sole author",
    type: "live",
    summary:
      "Staff ERP for an event-rental business with several stores: bookings, stock by store and location, condition-based returns, payments, expenses and P&L. Every stock change writes its ledger row and audit entry in the same database transaction.",
    stack: ["Next.js 16", "React 19", "Prisma 7", "PostgreSQL (Neon)", "React Query", "Vitest"],
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
    role: "Front-end lead",
    type: "case-study",
    summary:
      "Supply-chain and procurement ERP in production for a Nigerian state government: procurement, tenders, weighbridge, lot and bag tracking, stock transfers, quality inspection and dispatch.",
    stack: ["C# / .NET 10", "ASP.NET Core", "EF Core", "PostgreSQL", "Next.js", "TypeScript", "RTK Query", "xUnit"],
    meta: "In production",
    caseStudy: {
      context:
        "One system for a state government's stores, covering tendering, weighbridge readings, goods receipt by lot and bag, transfers between stores, quality inspection and dispatch. The .NET backend has 45 controllers and 58 entities; the operator app has 109 pages.",
      contribution:
        "I wrote most of the Next.js operator app and I am one of three engineers on the .NET backend. My backend work is mostly the rules: who may do what, in which store, and whether the stock records stay correct.",
      highlights: [
        {
          title: "Permissions and segregation of duties",
          body:
            "Wrote the permission catalogue and the store-scoping service, then enforced both on every endpoint. Officers see and act only on their assigned stores, and procurement steps that are meant to check each other belong to different roles. xUnit suites cover endpoint authorization, permission mirroring, store-scope query translation and supplier-account isolation.",
        },
        {
          title: "Data-integrity fixes",
          body:
            "Fixed seven high-severity defects in stock consumption, transfer dispatch and transfer receipt, working from a written breakage analysis. Added an optimistic-concurrency token to store balances and shipped the regression tests in the same commit as the fixes.",
        },
        {
          title: "Goods receipt",
          body:
            "Wrapped goods-receipt creation in a database transaction and fixed a concurrency-token bug that was blocking receipts outright. Gave bulk receiving a 120-second timeout after tracing why a 400-bag session outlasted the default: every bag writes an audit event, and aborting midway rolls the whole server transaction back.",
        },
        {
          title: "Audit events",
          body:
            "Added 54 audit events across 13 domain services. They are written to a per-store, hash-chained audit ledger kept in a separate database from operational data.",
        },
        {
          title: "The shared-cookie logout bug",
          body:
            "Staff and supplier portals set the same session cookie, so the edge proxy could not tell users apart and some sessions ended in logouts nobody could explain. I replaced the shared cookie with an explicit session audience and chose to treat old cookies as no session at all, which cost every user one sign-in when it shipped.",
        },
        {
          title: "Typed API layer",
          body:
            "Built the front end's data layer on RTK Query with a custom base query for token refresh, response unwrapping and typed errors. Request and response types are generated from the backend's OpenAPI spec.",
        },
      ],
    },
  },
  {
    name: "CromaChain",
    role: "Software Engineer",
    type: "case-study",
    summary:
      "Procurement and logistics platform covering the whole purchase order: requisition, approval, truck dispatch, weigh-in, payment and reconciliation.",
    stack: ["Next.js 16", "TypeScript", "Server Actions", "PostgreSQL / Prisma", "NextAuth", "Zod", "Docker"],
    // TODO: change to "In production" only if the client uses it live.
    meta: "Client project",
    links: [{ label: "Live demo", href: "https://croma-chain.demo.hubuk.ng/login" }],
    caseStudy: {
      context:
        "The business buys goods and moves them between locations by truck. The platform replaces scattered processes with one controlled workflow for requisitions, approvals, dispatch, weighing, payments and reconciliation.",
      contribution:
        "I designed and built it alone: the data model, server logic, access control, workflow rules and reconciliation.",
      highlights: [
        {
          title: "One pipeline for every write",
          body:
            "Each of the 59 server actions runs the same steps in order: authenticate, check permission, validate, run the transaction, write the audit entry.",
        },
        {
          title: "Location-scoped roles",
          body: "Seven roles, with permissions limited to the locations each user is assigned to.",
        },
        {
          title: "Two-sided reconciliation",
          body:
            "An order reconciles automatically only when payments in both directions clear, net of two different withholding taxes. This replaced an earlier rule that applied one tax figure to both sides and misstated the supplier balance.",
        },
        {
          title: "Schema and transactions",
          body:
            "A 12-model PostgreSQL schema through Prisma. A payment and the reconciliation check that follows it run inside one interactive transaction.",
        },
      ],
    },
  },
  {
    name: "CromERP",
    role: "Software Engineer",
    type: "case-study",
    summary:
      "Inventory, production and finance system for a plastics recycling and manufacturing business: purchasing, recycling, production, sales, payments, expenses and reporting.",
    stack: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL / Prisma", "NextAuth", "Docker", "GitHub Actions"],
    // TODO: change to "In production" only if the client uses it live.
    meta: "Client project",
    links: [{ label: "Live demo", href: "https://croma-erp.demo.hubuk.ng/login" }],
    caseStudy: {
      context:
        "A plastics recycler turns waste into finished goods in stages, and needed one system to follow both the material and the money: purchases, stock at each stage, production, sales, supplier and customer payments, expenses and reporting.",
      contribution:
        "I built the core application: data model, server-side access control, inventory and payment logic, reporting and the deployment setup.",
      highlights: [
        {
          title: "Five-stage stock",
          body: "Stock is tracked through waste, crushed, blended, packaged and finished goods, at five stores.",
        },
        {
          // Only add "stock can never go negative" if a database constraint or row lock enforces it.
          title: "Atomic stock movements",
          body: "A stock movement, its ledger row and its audit entry commit together or not at all.",
        },
        {
          title: "Payments and ledgers",
          body:
            "Supplier and customer payment workflows with running ledgers, plus expenses, invoices, receipts and a profit-and-loss view.",
        },
        {
          title: "Access control",
          body:
            "Server-side permission checks on every module, with separate access for administrators, production managers and directors.",
        },
        {
          // TODO: keep only if you wrote the workflow file yourself.
          title: "Deployment",
          body:
            "Standalone Docker image shipped through GitHub Actions, GHCR and Docker Compose, with Prisma migrations applied on release.",
        },
      ],
    },
  },
];

export const differentiators = [
  {
    title: "Sole-authored systems",
    body: "I wrote CromaChain, Transleto and AS Deco alone: schema, server logic, access control and interface.",
  },
  {
    title: "Two backend stacks",
    body: "C# with ASP.NET Core and EF Core on KAMATS; TypeScript with Prisma or Drizzle elsewhere. PostgreSQL under both.",
  },
  {
    title: "Access control",
    body: "Wrote the permission models for KAMATS (store-scoped roles, segregation of duties, xUnit-tested) and CromaChain (seven location-scoped roles). Both enforced on the server.",
  },
  {
    title: "Stock and money logic",
    body: "Stock movements that commit with their ledger and audit rows, optimistic concurrency on shared balances, and reconciliation across two withholding taxes.",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["C#", "TypeScript", "JavaScript", "SQL"] },
  { group: "Backend", items: ["ASP.NET Core", "EF Core", "Node.js", "Next.js server actions", "REST APIs", "OpenAPI", "NextAuth", "Zod"] },
  { group: "Data", items: ["PostgreSQL", "Prisma", "Drizzle"] },
  { group: "Frontend & mobile", items: ["React 19", "Next.js", "Redux Toolkit / RTK Query", "TanStack Query", "Tailwind CSS", "shadcn/ui", "Flutter"] },
  { group: "Testing", items: ["xUnit", "Vitest", "Testing Library", "MSW"] },
  { group: "Delivery", items: ["Docker", "GitHub Actions", "Git", "Vercel"] },
];
