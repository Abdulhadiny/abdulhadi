# Abdulhadi Nasir Bashir
**Software Engineer** — Full-Stack (Next.js / React / TypeScript) · Node.js · PostgreSQL & MongoDB · Flutter

abdulhadiny@gmail.com · github.com/Abdulhadiny · `[Location]` · `[Phone]` · `[LinkedIn]`
<sub>Fill in the bracketed fields before sending.</sub>

---

Full-stack engineer who **ships complete production systems end to end** — schema to containerized deployment. **Sole author of 3 apps and lead/top contributor on 5 more**, spanning relational and document databases, on-device machine learning, and generative AI. Builds role-secured, transaction-safe software and treats security hardening and CI/CD as part of delivery.

**Core skills:** TypeScript · JavaScript · Dart · SQL · Next.js (App Router) · React 19 · Server Actions · Node.js · Flutter · PostgreSQL/Prisma · MongoDB/Mongoose · Redux Toolkit/RTK Query · React Query · NextAuth · JWT · RBAC · Zod · Tailwind/shadcn · TensorFlow Lite · Google ML Kit · Google Genkit (Gemini) · Docker · GitHub Actions · CI/CD

---

## Experience — Software Engineer, HubukTech · 2025 – Present

Primary or top contributor across a portfolio of production web and mobile applications for government and enterprise clients.

**KAMATS — Supply-Chain & Inventory ERP** · *lead contributor* · Next.js 16, React 19, TypeScript, Redux Toolkit, RTK Query
- **Led** an authenticated ERP front-end across **100+ pages and 33 feature-sliced domains** (procurement, inventory/lot tracking, transfers, quality inspection, dispatch, tenders).
- **Engineered** a custom RTK Query `axiosBaseQuery` (token refresh, response-envelope unwrapping, typed error normalization) and **hardened** the app with a **per-request CSP nonce**, session-cookie route guards, and a CI `npm audit` gate.

**Transleto — Translation Workflow Platform** · *sole author* · Next.js 16, PostgreSQL/Prisma, NextAuth v5, mammoth, docx.js
- **Built** a role-based translation platform end to end — **31 API routes, 11-model schema**, code-enforced task state machine, and row-level ownership checks.
- **Engineered** a translation-memory reuse engine on **PostgreSQL `pg_trgm` trigram similarity** and **DOCX round-tripping** that parses and reconstructs documents in original structure.

**PensionVerify — Biometric Verification Mobile App** · *top contributor* · Flutter, Dart, TensorFlow Lite (MobileFaceNet), Google ML Kit
- **Engineered** an **on-device facial-verification pipeline** — L2-normalized MobileFaceNet embeddings matched by cosine similarity — keeping biometric data on-device.
- **Built** real-time **liveness detection with anti-spoofing** (randomized pose/blink/smile challenges) and a self-healing offline upload queue with retry, TTL eviction, and restart recovery.

**KD-SONS — Procurement / LPO Platform** · *lead contributor* · Next.js 16, PostgreSQL/Prisma, NextAuth v5, Zod
- **Led** a full-lifecycle LPO platform on **62 type-safe React Server Actions**, each following an auth → RBAC → validation → transaction → audit-log pipeline.
- **Engineered** fixed-point `Decimal` financial computations (bidirectional margins, dual withholding tax) with a **tolerance-aware auto-reconciliation engine** and location-scoped RBAC (5 roles, ~40 permissions).

**KNeCouncil — Government Meeting-Automation Platform** · *major co-author* · Next.js 15, MongoDB/Mongoose, custom JWT, Google Genkit (Gemini)
- **Co-built** a council system with **custom JWT auth** (secure HTTP-only cookies, role-guard middleware) and **query-level role-scoped data access**.
- **Integrated** Google Genkit (Gemini) AI summarization via Server Actions and a **QR-code attendance system** with live in-browser camera scanning.

<sub>Also **sole author** of A&S Deco, an event-rental ERP (Prisma 7/PostgreSQL, dual pg/Neon driver adapters, transactional inventory-ledger engines, React Query).</sub>

---

## Engineering & Delivery

- **Databases:** Designed both **relational (PostgreSQL/Prisma)** and **document (MongoDB/Mongoose)** schemas — `Decimal` money precision, composite uniques, targeted indexes, enum state machines, idempotency keys, TTL indexes, migrations.
- **Security:** RBAC with server-side enforcement and query-level scoping; NextAuth v4/v5 and custom JWT with bcrypt; CSP + security-header suites with nonces; Dependabot and blocking `npm audit` CI gates.
- **DevOps:** Multi-stage Docker (non-root, standalone, healthchecks) and GitHub Actions CI/CD (build gate → registry → SSH `docker compose`) across 6 services; Vercel, Firebase App Hosting.
- **Integrations & UI:** Google Genkit, Google Cloud Translation, SendGrid, Cloudinary, MinIO/S3, OneSignal; dashboards and reporting with Recharts, Leaflet, ExcelJS, and @react-pdf/renderer.
- **Practices:** PR-based feature-branch Git workflow, conventional commits, Zod input validation, fail-safe audit logging. Test tooling (Vitest, Testing Library, MSW) configured.
