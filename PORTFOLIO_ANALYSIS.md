# Engineering Portfolio Analysis

**Prepared as hiring-packet source material for a truthful Software Engineer resume.**
Analysis date: 2026-08-05. Subject: **Abdulhadi Nasir Bashir** (git identities `Abdulhadiny` / `abdulhadiny@gmail.com` and `Abdulhadi Nasir Bashir`). Scope: 10 repositories (9 Next.js web apps + 1 Flutter mobile app), all from the **`hubuktech`** GitHub org. *(The Claude subscription belongs to Abdulrahman Sulaiman, CEO — the analysis subject is the engineer above, not the account owner.)*

> **Attribution basis.** These are **collaborative agency repositories**. This report is scoped to **what the subject personally authored**, measured by git commit attribution across both of his identities (`git log --author "(?i)abdulhadi"`). The subject is the **sole or primary author of nearly the entire portfolio**:

| Repository | Your commits / total | Your role (by commit volume) | Resume weight |
|---|---|---|---|
| **transleto** | **20 / 20** (100%) | **Sole author** | Flagship — full ownership |
| **a-and-s-deco** | **17 / 17** (100%) | **Sole author** | Flagship — full ownership |
| **rexcel-website** | **15 / 15** (100%) | **Sole author** | Full ownership (small site) |
| **knbs_erosion** | **22 / 35** (62%) | **Lead contributor** | Primary author |
| **KAMATS_WEB** | **152 / 264** (57%) | **Lead contributor** | Flagship — primary author |
| **cromad_website** | **48 / 93** (51%) | **Lead contributor** | Primary author |
| **KD-SONS** | **32 / 62** (51%) | **Lead contributor** | Flagship — primary author |
| **PensionVerify** | **19 / 42** (45%) | **Top contributor** (most of any) | Major contributor |
| **MAI-FITILA** | **54 / 128** (42%) | **Top contributor** (most of any) | Major contributor |
| **KNeCouncil** | **92 / 275** (33%) | **2nd of ~4** (lead was another dev) | Major contributor |

> Counts merge the subject's two git identities. In the 7 sole/lead repos you are the largest contributor; in PensionVerify and MAI-FITILA you are the single largest contributor though the repo is shared; in KNeCouncil you are the second-largest of ~4. **Being top committer is reported as a factual commit-volume signal, not as a claim of people-management or formal team-lead authority — git alone does not evidence that.** No user counts, traffic, scale, revenue, uptime, or business metrics are asserted anywhere — none is present in the repositories. Git author dates read as 2025–2026 and are treated as recorded values.

---

## 1. Executive Engineering Assessment

**What type of engineer is this?** A **full-stack product engineer and primary builder** in the **TypeScript / React / Next.js (App Router)** ecosystem, who ships **complete line-of-business systems end to end** — and who owns them: you are the sole or top author of 9 of 10 repos here. Your range spans **two backend persistence models** (relational **PostgreSQL/Prisma** *and* document **MongoDB/Mongoose**), **native mobile with on-device machine learning** (**Flutter/Dart**), **generative AI** (Genkit/Gemini), and **geospatial dashboards** (Leaflet). The consistent output is ERPs, workflow tools, and dashboards for organizations in Kano State, Nigeria.

**What you enjoy building (per evidence):** data-heavy, role-gated internal systems with real domain logic — inventory ledgers, procurement/LPO lifecycles, financial reconciliation, translation and meeting/approval workflows, and a biometric verification pipeline. You reach repeatedly for **auth → RBAC → validation → transactional write → audit-log** as a backbone, and you gravitate to **state machines** and **append-only ledgers**.

**Strongest area (evidenced):** **End-to-end full-stack ownership with correct data modeling and authorization.** You independently designed and shipped complete apps — a translation-workflow platform with Postgres trigram translation memory (transleto, 100% you), an event-rental ERP with dual Prisma driver adapters and transactional engines (a-and-s-deco, 100% you), and you led two large multi-developer ERPs (KAMATS_WEB, KD-SONS). A distinctive standout is **applied on-device ML** in the PensionVerify Flutter app (you are its top contributor).

**Engineering maturity (evidenced):** **Strong mid-level trending Senior.** Positive signals throughout your commits: consistent **PR-based feature-branch Git workflow**, **containerized multi-stage Docker**, **GitHub Actions CI/CD** (build gate → registry → SSH `docker compose`), **Dependabot**, security-header/CSP hardening (including CSP nonces in KAMATS), and deliberate schema design (composite uniques, targeted indexes, `Decimal` money types, idempotency keys). The breadth — relational + document + mobile-ML + AI + geospatial — combined with **sole ownership of multiple full apps** is above typical mid-level.

**Noticeable gaps (evidenced) — and honest about ownership:**
- **Automated testing is essentially absent** across all 10 repos, including the ones you solely authored. No unit/integration/e2e suites. KAMATS_WEB (which you lead) installs Vitest + Testing-Library + MSW but has **zero test files**; PensionVerify has one stale widget test. This is the biggest gap and it's within your control to close.
- **Secrets hygiene lapses** in repos you lead: `knbs_erosion` (62% yours) commits live KoBoToolbox API tokens and a Slack webhook to source; `KNeCouncil` commits `.env.local` values in its README.
- **Build-quality shortcuts:** `ignoreBuildErrors`/`ignoreDuringBuilds` in `next.config.ts` (KNeCouncil, rexcel-website).
- **Declared-but-unused dependencies** (PensionVerify: `flutter_secure_storage`, `envied`; cromad: gsap/three.js/anime.js; rexcel: nodemailer) — don't list these as demonstrated skills.

---

## 2. Repository-by-Repository Analysis

> Each entry ends with **Your contribution** scoped to commit evidence.

### 2.1 transleto — *translation workflow platform* (you: SOLE author, 20/20)
- **Purpose / problem:** A collaborative **EN↔HA translation workflow management system** replacing an ad-hoc Google-Docs/email process with a structured, role-based, auditable pipeline (admin / translator / reviewer). *(PRODUCT.md, implementation plan)*
- **Primary tech:** Next.js 16, React 19, TypeScript, **Prisma 6 + PostgreSQL**, **NextAuth v5** + `@auth/prisma-adapter`, bcryptjs (cost 12), Zod, Tailwind v4, **mammoth** (DOCX→HTML) + **docx.js** (HTML→DOCX), Google Cloud Translation API.
- **Architecture:** App Router; **31 API route handlers** (14 GET / 12 POST / 9 PATCH / 2 DELETE) across projects, tasks, glossary, translation-memory, users, dashboard, notifications, activity; reusable authz guards; centralized Zod schema module; service libs.
- **Database design:** 11 models, 5 enums, self-referential multi-role user relations (`AssignedTasks`/`ReviewedTasks`), cascade/set-null delete semantics, composite unique + query-tuned indexes.
- **Auth & authz:** NextAuth v5 Credentials + JWT; inactive-account lockout; `requireRole()` guards (12 routes) + row-level ownership checks (a translator can only submit their own task; a reviewer only reviews their assigned task).
- **Interesting details (all yours):** **Translation Memory via PostgreSQL `pg_trgm` trigram similarity** (configurable threshold, idempotent upsert, usage tracking, auto-populated on approval); **glossary/termbase** with forbidden-terms arrays + approval workflow; **DOCX round-tripping** — parse DOCX/HTML into ordered typed segments and reconstruct translated output in original structure; **multi-format export** (CSV/JSON/DOCX/reconstructed) with output escaping; Google Translate AI suggestions with graceful fallback; audit trail (13 action types) + notifications.
- **Security:** bcrypt cost 12, RBAC + row-level ownership, Zod validation, CSV-injection escaping, **parameterized raw SQL** (`$queryRawUnsafe` with positional params) for TM search.
- **Testing:** None. **Deployment:** Prisma scripts only; no Docker/CI in this repo. *(Documented Supabase→Prisma pivot; schema is ahead of committed migrations.)*
- **Your contribution:** **Sole author (20/20).** Fullest possible personal claim — architecture, schema, TM engine, DOCX pipeline, auth, all yours.

### 2.2 a-and-s-deco — *event-rental operations ERP* (you: SOLE author, 17/17)
- **Purpose / problem:** Staff-facing **event-decoration rental ERP** (multi-store inventory ledger, events/bookings, quotes, damage reconciliation, payments, P&L, RBAC, audit; NGN).
- **Primary tech:** Next.js 16, React 19, TypeScript, **Prisma 7 + PostgreSQL with dual driver adapters (pg local / Neon serverless, runtime-selected)**, **NextAuth v5**, bcryptjs (cost 12), **TanStack React Query**, @react-pdf/renderer, **Cloudinary**, **OneSignal** push, Tailwind v4 + shadcn/ui.
- **Architecture:** `(auth)`/`(dashboard)` groups; **Server-Actions-first** (~47 `"use server"` functions); **domain "engine" layer** (`InventoryEngine`/`RentalEngine`/`FinanceEngine`) with composable `tx` clients; 22 models, 11 enums.
- **Interesting details (all yours):** atomic multi-store inventory ledger (stock + transaction + audit in one Prisma tx); rental lifecycle with **condition-based return routing** (MAIN/DAMAGED/LOST); **damage reconciliation** generating a quote + write-off expenses idempotently; payment reconciliation auto-advancing status; **React Query notification center polling a Server Action as its `queryFn`**; server-rendered PDF quotes; **11-query `Promise.all` dashboard aggregation**; a **Neon-WebSocket schema-deploy script** to bypass a TCP:5432 firewall block.
- **Auth & authz:** NextAuth v5 + bcrypt; JWT 30-min; `checkPermission()` gate at **34 mutation entry points**; middleware route protection; `usePermissions()` client hook; Role/Permission join model.
- **Security:** bcrypt cost 12, anti-enumeration login, audit trail (fail-safe). *Honest gaps (yours to note):* audit `ipAddress` hardcoded; some read actions/PDF route not permission-gated; mixed Zod/manual validation.
- **Testing:** None. **Deployment:** Vercel + Neon (README/adapter); no committed Docker/CI.
- **Your contribution:** **Sole author (17/17).** Full personal claim on a complete, layered ERP.

### 2.3 rexcel-website — *consultancy marketing site* (you: SOLE author, 15/15)
- Small **static-export** (`output:'export'`) marketing site (Next.js 16, shadcn/ui tooling, framer-motion, per-page SEO/OpenGraph). Genuine highlight: a **dependency-free interactive canvas globe** (rotating dot-grid + animated arcs + geo markers, no three.js) and **scroll-triggered animated counters**.
- *Honest notes:* `nodemailer` is a dead dependency (contact is `mailto`); shadcn configured but no `ui/` primitives generated; `ignoreBuildErrors` on. Smallest repo — scope accordingly.
- **Your contribution:** **Sole author (15/15).**

### 2.4 KAMATS_WEB — *alum management & transparency ERP front-end* (you: LEAD, 152/264, 57%)
- **A large authenticated supply-chain / inventory ERP front-end** (not a marketing site): requisitions → POs → GRN → lots/inventory → transfers → dispatch → consumption/dosage → quality (DVR + inspections) → tenders → reporting/audit.
- **Primary tech:** Next.js 16, React 19, TypeScript, **Redux Toolkit + RTK Query**, Axios, react-hook-form + Zod, Radix + Tailwind v4, TanStack Table, Recharts, jsPDF, `xss`, ZainPay. **316 TS/TSX files, 101 pages, 33 feature slices.**
- **Notable engineering:** custom **RTK Query `axiosBaseQuery`** (token refresh, response-envelope unwrapping, pagination detection, typed error normalization, per-request silent-error); **dual-tenant auth** (staff + supplier portal); **RBAC / segregation of duties**; **CSP-nonce security middleware** in `proxy.ts` (`strict-dynamic`, session-cookie route guard) + full header suite + `xss` sanitization; 54-file **MSW mock layer**; **CI security gate** (`npm audit` failing PRs on high/critical); hardened multi-stage Docker (npm removed from runtime).
- **Testing:** Vitest + Testing-Library + MSW installed, **zero test files**. *Flag: `@microsoft/signalr` present but SignalR was explicitly disabled — no active realtime.*
- **Your contribution:** **Lead contributor — 152 of 264 commits (57%),** the largest of ~5 authors, spanning permission enforcement, supply flow, caching, tenders, and security-audit fixes (per branch/PR names).

### 2.5 KD-SONS — *procurement / LPO management* (you: LEAD, 32/62, 51%)
- **Purpose / problem:** Procurement system managing **Local Purchase Orders** through a full lifecycle (draft → submit → approve/reject/change-request → dispatch → weigh → pay → auto-reconcile) across a company/branch/location hierarchy, with dual-sided financial logic (cost, delivery & supplier margins, **two withholding taxes**).
- **Primary tech:** Next.js 16, React 19, TypeScript, **Prisma 7 + PostgreSQL**, **NextAuth v5**, bcryptjs, Zod 4, Tailwind v4 + shadcn/ui, TanStack Table, **S3 SDK against MinIO**, SendGrid, jsPDF.
- **Architecture:** **Server-Actions-first** (62 `"use server"` functions); 11 Zod modules; 12 models, 7 enums (9-state `LpoStatus`), 19 relations, `Decimal` precision, a dedicated `LpoSequence` per-year counter.
- **Interesting details:** **race-free atomic LPO numbering** (`$transaction` + upsert-increment); **transactional audit logging** (optional `tx`, 31 call sites); **rollback-safe post-commit** email/notification; unit-normalized (KG/TON) financial math; **dual-sided auto-reconciliation** as a pure tolerance-aware predicate; LPO **state-machine transition guards**; **edge-safe/Node-split** NextAuth config with `isActive` re-check on token refresh; typed permission registry (5 roles, ~40 keys) with **location-scoped permissions**.
- **Security:** full CSP/header suite; stable Server-Action encryption key; upload allowlists; **CI security gate** + Dependabot; non-root Docker.
- **Testing:** None. **Deployment:** multi-stage Docker (standalone, non-root, conditional `prisma migrate deploy`); GitHub Actions → registry → SSH `docker compose`.
- **Your contribution:** **Lead contributor — 32 of 62 commits (51%),** the largest author; CRUD, suppliers module, RBAC enforcement, auth+audit on reads, and financial computations attributed to your work.

### 2.6 knbs_erosion — *geospatial erosion dashboard* (you: LEAD, 22/35, 62%)
- **Geospatial dashboard** of soil-erosion site statistics across the 44 LGAs of **Kano State, Nigeria** for the WECCMA agency (KoBoToolbox surveys → KPIs, map, charts, budget/repair tracking, feedback intake, Excel export). *(Corrects "Kenya/KNBS".)*
- **Primary tech:** Next.js 15, React 19, TypeScript, Tailwind v4, **Recharts**, **Leaflet + react-leaflet + marker clustering**, **papaparse**, **ExcelJS + file-saver**, SweetAlert2.
- **Data/viz:** clustered erosion-site map (SSR-safe via dynamic `ssr:false`, animated fly-to, photo popups); 12+ Recharts visualizations from `useMemo`-derived datasets; repair-tracker table with lightbox; **client-side multi-sheet XLSX** (13 LGA-pivoted worksheets, ragged-row normalization).
- **API design:** 3 cached route handlers proxying KoBoToolbox `data.json` (cursor pagination to 10k, **5-min in-memory TTL cache**, typed errors).
- **Security:** ⚠️ **hardcoded KoBo API tokens committed to source** + a **committed Slack webhook** — a real secrets-hygiene finding; since you lead this repo, treat it as a personal lesson (rotate + move to secrets). Positives: non-root Docker, Dependabot, merged dependency-security PRs.
- **Testing:** None (CI runs `yarn build` only). **Deployment:** multi-stage Alpine Docker; Actions → registry → SSH → Slack.
- **Your contribution:** **Lead contributor — 22 of 35 commits (62%),** the largest author.

### 2.7 cromad_website — *tech-academy marketing site* (you: LEAD, 48/93, 51%)
- Public brochure site for a tech academy (Next.js 15, Turbopack, Tailwind v4, Flowbite-React, Google Forms lead capture; Dockerized CI/CD + Slack). Honest read: **standard multi-section marketing site** with responsive work — heavy animation/3D deps (gsap/three.js/anime.js) are **installed but unused**, so don't claim them.
- **Your contribution:** **Lead contributor — 48 of 93 commits (51%),** the largest of ~9 authors.

### 2.8 PensionVerify_MobileApp — *biometric pension verification* (you: TOP contributor, 19/42, 45%)
- **Purpose / problem:** A **Flutter** app verifying pension recipients via **on-device facial recognition with liveness detection** (Kano State).
- **Primary tech:** **Flutter / Dart**, **TensorFlow Lite** (`tflite_flutter`, MobileFaceNet 112×112 → 192-dim), **Google ML Kit** face detection, `camera`, `dio` (multipart), `archive` (ZIP), `connectivity_plus`, Material 3. ~8k LOC.
- **On-device ML / CV:** ML Kit → **randomized head-pose + blink + smile liveness challenges**, blink state machine, **frame-variance anti-spoofing**; MobileFaceNet TFLite with **runtime tensor-shape introspection**, [-1,1] normalization, **L2-normalized embeddings compared by cosine similarity**; multi-frame threshold with `requiresManualReview`; manual **YUV_420_888 → NV21** conversion.
- **Media & networking:** ~10 FPS front-camera streaming → per-challenge capture → **ZIP** → **`dio` multipart upload** with progress + retry/backoff; **persistent self-healing upload queue** (SharedPreferences, timer retries, TTL, restart recovery); layered connectivity gating.
- **Auth & security:** JWT login with **manual token decoding**; biometric frames processed **on-device**; frames cleaned up after upload. *Gaps:* `flutter_secure_storage` + `envied` declared but unused; `certificate_pinning.dart` is an empty stub.
- **Testing:** One stale widget test — effectively none.
- **Your contribution:** **Top contributor — 19 of 42 commits (45%),** the single largest author in a 3-developer repo. The FaceNet/TFLite migration, ZIP+upload flow, and connectivity gating appear in the history you led.

### 2.9 MAI-FITILA — *recycling & manufacturing ERP* (you: TOP contributor, 54/128, 42%)
- **Internal inventory, production & finance ERP** for a plastics-recycler modeling a 5-stage pipeline (waste → crushed → blended → packaged → finished goods), RBAC, audit, financial reporting (NGN, `Africa/Lagos`).
- **Primary tech:** Next.js 16, React 19, TypeScript, **Prisma 7 + PostgreSQL**, **NextAuth v4** (JWT, 30-min, bcrypt), TanStack React Query, Zod, Tailwind v4 + shadcn/ui, Recharts, **@react-pdf/renderer**, **SendGrid**, **node-cron**.
- **Architecture & data:** **39 models, 6 enums, 14 SQL migrations**; service-engine layer (inventory/reconciliation/pnl/aging/invoice/receipt/notification/scheduler); UUID PKs, `Decimal(14,2)` money, **DB-backed idempotency keys**, polymorphic references, append-only ledgers, targeted indexes.
- **API & authz:** **65 route handlers**; Zod (25 shared schemas) in 30 routes; permission-string **RBAC** via `authorize()` in **63 files**; clamped pagination; server-authoritative recomputation.
- **Interesting details:** instrumentation-hook **node-cron scheduler** (4 jobs, run-tracking + stale-run recovery); composable transactional inventory engine; idempotent payments; DB session TZ forced to UTC; **PDF** docs + WhatsApp share; **SendGrid** with `EmailLog`.
- **Security:** strict **CSP + header suite**; error-message **allow-listing**; non-root Docker + healthcheck; **CI security gate** + Dependabot.
- **Testing:** None. **Deployment:** multi-stage Docker → **GHCR** → SSH `docker compose` with version-skew protection.
- **Your contribution:** **Top contributor — 54 of 128 commits (42%),** the single largest author in a multi-developer team.

### 2.10 KNeCouncil — *government meeting-automation platform* (you: MAJOR, 92/275, 33%)
- **Government executive-council meeting-automation system** for Kano State ("for government use only"): council-member/secretary/governor logins, memo submissions with PDF uploads + public/private comments, meeting lifecycle, secretariat review, AI summarization.
- **Primary tech:** Next.js 15, React 19, TypeScript, **MongoDB via Mongoose 8**, **custom JWT auth** (`jsonwebtoken` + `bcryptjs`), **Google Genkit AI** (Gemini 2.0 Flash), TanStack React Query, Zod, Tailwind 3.4 + shadcn/ui.
- **Data & API:** 5 Mongoose models (Memo with **9-state** enum + embedded comments; Meeting; Session with **TTL index**; binary File storage); **20 route handlers**; cached/singleton Mongoose connection.
- **Auth & authz (distinctive):** custom JWT with **HTTP-only + SameSite-strict secure cookies**, `requireAuth(allowedRoles?)` HOF middleware, **query-level role-scoped data access**. *(2FA/OTP is dev-mock.)*
- **AI / QR:** 3 Genkit flows (summarize/extract/resolution) via Server Actions; **QR-code attendance** — printable QR ID cards + **live camera scanning** (`jsQR` + `getUserMedia`) with time-gating; PDF + Excel exports; cron meeting-lifecycle state machine.
- **Security:** bcrypt, secure cookies, `passwordHash` stripped, non-root Docker, TTL sessions. *Gaps:* `.env.local` in README; `files/[id]` auth commented out; `ignoreBuildErrors`.
- **Testing:** None. **Deployment:** multi-stage Docker; Docker Hub + SSH staging (Actions); Firebase App Hosting; Vercel cron.
- **Your contribution:** **Major contributor — 92 of 275 commits (33%),** second-largest of ~4 (the top author was another developer). Claim as a major project you co-built, not sole work.

---

## 3. Cross-Repository Pattern Analysis

Patterns you apply repeatedly (frequency = repos exhibiting it, nearly all authored/led by you):

- **Next.js App Router + React 19 + TypeScript** — 9/9 web repos. Your universal base.
- **Tailwind + shadcn/ui (Radix/Base UI) design systems** — ~8/9; `lucide-react`, `cn` (clsx/tailwind-merge), toasts recur.
- **Credentials auth + bcrypt + RBAC with server-side enforcement** — 6 repos (NextAuth v4/v5 ×4 authored by you; custom JWT in KNeCouncil; RTK auth in KAMATS). Signature move: **query-level data scoping**, not just UI gating.
- **The "action recipe": auth → Zod validate → transactional write → audit-log → revalidate/notify** — near-identical in your KD-SONS, a-and-s-deco, MAI-FITILA.
- **Prisma + PostgreSQL with disciplined schema design** — 4 repos: `Decimal` money, composite uniques, targeted indexes, enum state machines, idempotency keys, append-only ledgers.
- **Domain "engine"/service layer** with composable `tx` clients — a-and-s-deco, MAI-FITILA, KD-SONS.
- **State machines** (memo, LPO, task, meeting) with per-transition guards — KNeCouncil, KD-SONS, transleto.
- **PDF + Excel generation** — 6 repos.
- **Multi-stage Docker (Alpine, standalone, non-root) + GitHub Actions → registry → SSH `docker compose`** — 6 repos. Your consistent DevOps pattern.
- **Dependabot + `npm audit` CI gate + CSP/header hardening** — 3–4 repos (KAMATS strongest, with CSP nonces).
- **PR-based feature-branch workflow, conventional commits** — all 10 repos.
- **No automated tests** — 10/10 (your most consistent *negative* pattern).

---

## 4. Technical Skills Inventory

Confidence = evidence strength. "★" marks skills you personally authored/led.

| Skill | Evidence found | Confidence | Frequency | Where (★ = you authored/led) |
|---|---|---|---|---|
| TypeScript | Primary language, all web repos | High | Very frequent | All ★ |
| React 19 | Core UI everywhere | High | Very frequent | All ★ |
| Next.js (App Router) | RSC, route handlers, server actions | High | Very frequent | All ★ |
| Dart / Flutter | ~8k LOC mobile app | High | 1 repo | PensionVerify ★ (top contributor) |
| PostgreSQL + Prisma | 4 schemas, migrations, indexes, `Decimal` | High | Frequent | transleto ★, a-and-s-deco ★, KD-SONS ★, MAI-FITILA ★ |
| MongoDB + Mongoose | 5 models, TTL index, embedded docs | High | 1 repo | KNeCouncil ★ (co-authored) |
| NextAuth (v4/v5) | Credentials + JWT + bcrypt | High | 4 repos | transleto ★, a-and-s-deco ★, KD-SONS ★, MAI-FITILA ★ |
| Custom JWT auth | Sign/verify, secure cookies, HOF guard | High | 1 repo | KNeCouncil ★ |
| RBAC / authorization | Permission registries, role guards, data scoping | High | 5 repos | KD-SONS ★, a-and-s-deco ★, MAI-FITILA ★, KNeCouncil ★, KAMATS ★ |
| Zod validation | Shared schemas, cross-field refine | High | 6+ repos | transleto ★, KD-SONS ★, a-and-s-deco ★, MAI-FITILA ★, KAMATS ★ |
| Redux Toolkit + RTK Query | Feature-sliced state/data, custom baseQuery | High | 1 repo | KAMATS ★ (lead) |
| TanStack React Query | Server-state, polling, cache invalidation | High | 3 repos | a-and-s-deco ★, MAI-FITILA ★, KNeCouncil ★ |
| On-device ML (TFLite + ML Kit) | MobileFaceNet embeddings, liveness | High | 1 repo | PensionVerify ★ |
| Generative AI (Genkit / Gemini) | 3 typed flows via Server Actions | High | 1 repo | KNeCouncil ★ (co-authored) |
| DOCX pipeline (mammoth/docx.js) | Parse + reconstruct documents | High | 1 repo | transleto ★ |
| Postgres `pg_trgm` fuzzy search | Translation-memory reuse | High | 1 repo | transleto ★ |
| Geospatial / Leaflet | Clustered maps, fly-to | High | 1 repo | knbs_erosion ★ (lead) |
| Data viz (Recharts) | Dashboards/charts | High | 5 repos | knbs ★, MAI-FITILA ★, KNeCouncil ★, KD-SONS ★, KAMATS ★ |
| PDF / Excel generation | jsPDF, @react-pdf, ExcelJS | High | 6 repos | Most ★ |
| Docker (multi-stage) | Standalone, non-root, healthcheck | High | 6 repos | KD-SONS ★, MAI-FITILA ★, KAMATS ★, knbs ★, cromad ★, KNeCouncil ★ |
| GitHub Actions CI/CD | Build gate → registry → SSH deploy | High | 6 repos | Same 6 ★ |
| Security hardening (CSP/headers, npm audit, CSP nonce) | Header suites, audit gate | High | 3–4 repos | KAMATS ★, KD-SONS ★, MAI-FITILA ★ |
| DB transactions / idempotency | Interactive tx, idempotency keys, ledgers | High | 3 repos | KD-SONS ★, MAI-FITILA ★, a-and-s-deco ★ |
| Third-party integrations | SendGrid, Cloudinary, MinIO/S3, OneSignal, Google Translate | High | Several | ★ across your repos |
| Git PR workflow | Feature branches, merged PRs, conventional commits | High | All | All ★ |
| Automated testing | **No real suites anywhere** | **Low/none** | 0 repos | — |

---

## 5. Engineering Competencies

- **Frontend Engineering — High ★.** React 19 / App Router across 9 apps you authored/led; complex UI (QR scanner, canvas globe, dashboards).
- **Backend Engineering — High ★.** REST handlers + Server Actions; you authored both MongoDB (KNeCouncil) and PostgreSQL (transleto, a-and-s-deco, KD-SONS) backends; service-engine layering.
- **API Design — High ★.** 20–65 endpoints per app; uniform result envelopes; pagination; boundary validation.
- **Database Design — High ★.** Relational (Prisma) and document (Mongoose) — both authored by you, with money precision, composite uniques, indexes, migrations, idempotency, TTL indexes.
- **Authentication — High ★.** NextAuth v4/v5 (authored) + custom JWT with secure cookies (authored) + manual JWT decode in Flutter.
- **Authorization — High ★.** RBAC with server-side enforcement and query-level data scoping across your repos; location-scoped permissions.
- **State Management — High ★.** RTK Query (KAMATS, lead), React Query (3 repos, authored), `setState` in Flutter.
- **Performance Optimization — Medium.** Targeted indexes, pagination, TTL caching, `Promise.all` fan-out, model pre-warming, connection singletons — real but tactical; no profiling/load-testing.
- **Accessibility — Low/Medium.** Radix/shadcn baseline; no explicit a11y work.
- **Responsive Design — High ★.** Dedicated responsiveness work; mobile detection; Tailwind utilities.
- **Testing — Low.** **No automated tests in any repo, including your sole-authored ones.** Clearest weakness.
- **Error Handling — High ★.** Consistent try/catch → typed JSON; error-message allow-listing; graceful API fallbacks; fail-safe audit/notifications.
- **Logging / Observability — Medium.** Audit-log subsystems recur; scheduler run-tracking; but leftover `console.log` and no structured logging/metrics/tracing.
- **Deployment — High ★.** Multi-stage Docker + GitHub Actions → registry → SSH `docker compose` across 6 repos you built; multi-target (Firebase/Vercel) in KNeCouncil.
- **Security — Medium/High ★.** Strong: CSP/headers, CSP nonce, `npm audit` gates, Dependabot, non-root images, secure cookies, bcrypt. Weak (yours to fix): committed secrets (knbs, KNeCouncil README), some commented-out auth, `ignoreBuildErrors`.
- **Documentation — Medium ★.** Strong product docs where present (transleto, KNeCouncil, PensionVerify); several repos ship default READMEs.
- **Maintainability — Medium/High ★.** Consistent layered architecture, shared validators, typed clients — offset by zero tests and some inconsistency.
- **Scalability — Medium.** Stateless JWT, standalone containers, indexed queries, TTL caching — reasonable; no horizontal-scale evidence.
- **Code Organization — High ★.** Feature-sliced / domain-grouped structures; clear layer separation.
- **System Design — Medium/High ★.** Coherent end-to-end systems with state machines, ledgers, background jobs — authored by you.
- **Developer Experience — Medium ★.** Typed API clients, query-key factories, seed/reset scripts, MSW mocks, reusable component libraries.
- **Git Workflow — High ★.** Feature-branch + PR + conventional commits + Dependabot; you're the top author on most repos.

---

## 6. Strong Resume Bullet Candidates

> Organized by ownership strength. **Tier 1 (sole author)** = fullest personal claim. **Tier 2 (lead / primary author, >50%)**. **Tier 3 (top/major contributor)**. All bullets are metric-free by design — add real numbers only if substantiated.

### Tier 1 — Sole author (transleto, a-and-s-deco, rexcel-website)
1. Designed and built a full **translation-workflow management platform** end-to-end in **Next.js 16, React 19, TypeScript, and PostgreSQL/Prisma** — 31 API routes, 11-model schema, role-based translator/reviewer workflow.
2. Engineered a **translation-memory reuse engine** using PostgreSQL **`pg_trgm` trigram similarity** with configurable thresholds, idempotent upserts, and usage tracking, auto-populated on translation approval.
3. Built **document round-tripping** — parsing DOCX/HTML into ordered typed segments (mammoth + `DOMParser`) and reconstructing translated output in the original structure via docx.js — with CSV/JSON/DOCX multi-format export and output escaping.
4. Implemented a **code-enforced task state machine** (Not Started → In Progress → Submitted → Approved/Rejected) with per-transition guards and **row-level ownership checks** beyond role.
5. Integrated the **Google Cloud Translation API** for AI-assisted suggestions with graceful fallback, and secured the app with **NextAuth v5 (JWT, bcrypt cost-12)** plus parameterized raw SQL.
6. Independently built an **event-rental operations ERP** (Next.js 16, React 19, Prisma 7/PostgreSQL) with a **Server-Actions-first architecture** (~47 actions) and a transactional **domain-engine layer** (inventory/rental/finance) using composable Prisma `tx` clients.
7. Designed a **22-model, 11-enum PostgreSQL schema** with composite-unique stock rows, cascade relations, and `Decimal(18,2)` money, and implemented an **atomic multi-store inventory ledger** (stock + transaction + audit in one transaction).
8. Modeled a full rental lifecycle with **condition-based return routing** and **idempotent damage reconciliation** (auto-generating quotes + write-off expenses), plus **automated payment reconciliation** with derived statuses.
9. Built a **React Query notification center** that polls a Next.js **Server Action as its `queryFn`** with cache-invalidating mutations, and **server-rendered PDF quotes** via `@react-pdf/renderer`.
10. Engineered a **dual Prisma driver-adapter** setup (node-postgres locally, **Neon** serverless in production) and a WebSocket schema-deploy script to work around TCP-port firewall restrictions.
11. Applied **RBAC with a `checkPermission` gate at 34 mutation entry points**, NextAuth v5 middleware route protection, and a system-wide **fail-safe audit-logging** layer capturing before/after JSON snapshots.
12. Built a statically-exported (`output:'export'`) marketing site with a **dependency-free interactive canvas globe** (rotating dot-grid, animated arcs, geo markers — no 3D library), scroll-triggered animated counters, and disciplined per-page **SEO/OpenGraph** metadata.

### Tier 2 — Lead / primary author (KAMATS_WEB, KD-SONS, knbs_erosion, cromad_website)
13. Led development of an authenticated **Next.js 16 / React 19 supply-chain ERP front-end** (procurement, inventory/lot tracking, transfers, quality inspection, dispatch, tenders, reporting) across 100+ pages using a **feature-sliced Redux Toolkit + RTK Query** architecture (33 domain slices).
14. Engineered a custom **RTK Query `axiosBaseQuery`** integrating token refresh, response-envelope unwrapping, pagination detection, typed error normalization, and per-request silent-error handling.
15. Implemented **application security hardening in Next.js middleware**: per-request **CSP nonce** with `strict-dynamic`, session-cookie route guarding, a full security-header suite, and `xss`-based input sanitization.
16. Enforced **role-based access control and segregation of duties** across endpoints, and built a separate **supplier self-service portal** with dual-tenant auth.
17. Led a full-lifecycle **procurement / Local-Purchase-Order platform** (Next.js 16, PostgreSQL/Prisma) with **62 type-safe React Server Actions**, each following an **auth → RBAC → Zod-validation → transaction → audit-log → revalidation** pipeline.
18. Engineered **fixed-point (`Decimal`) financial computations** — per-unit cost normalization (KG/TON), bidirectional profit margins, and dual withholding-tax handling — with an **auto-reconciliation engine** implemented as a pure, tolerance-aware settlement predicate.
19. Built **race-free sequential document numbering** via a transactional per-year sequence table, and a **transactional audit trail** (31 call sites) with **rollback-safe post-commit** email/notifications.
20. Implemented **NextAuth v5** with an **edge-safe/Node-split config** for middleware and **active-user re-validation on every token refresh**; hardened the app with a **CI security gate** (blocking `npm audit` + Next.js config audit).
21. Built a **geospatial soil-erosion analytics dashboard** (Next.js 15, **Leaflet** clustered maps, 12+ **Recharts** visualizations, **ExcelJS** multi-sheet export) with cached, paginated **KoBoToolbox** API proxies (cursor pagination to 10k records, 5-minute TTL cache).
22. Developed a responsive multi-section marketing site (Next.js 15, Turbopack, Tailwind v4, Flowbite-React) with external Google Forms lead capture and containerized CI/CD with Slack notifications.

### Tier 3 — Top / major contributor (PensionVerify, MAI-FITILA, KNeCouncil)
23. As top contributor, engineered an **on-device facial-verification pipeline in Flutter/Dart** using **MobileFaceNet (TensorFlow Lite)** — L2-normalized embeddings matched by **cosine similarity** with a multi-frame decision threshold, keeping biometric processing on-device.
24. Built a **real-time liveness-detection system** on **Google ML Kit** with randomized head-pose/blink/smile challenges, a blink state machine, and a **frame-variance anti-spoofing** check.
25. Implemented the **camera capture-to-upload pipeline**: throttled front-camera streaming with manual **YUV_420_888 → NV21** conversion, **ZIP archiving**, and **`dio` multipart upload** with progress + retry/backoff.
26. Designed a **persistent, self-healing upload queue** (SharedPreferences-backed, timer retries, TTL eviction, restart recovery) with **connectivity gating** for offline resilience.
27. As the largest contributor, built core of a full-stack **recycling/manufacturing ERP** (Next.js 16, React 19, PostgreSQL/Prisma; 39-model schema, 14 migrations, 65 route handlers) with **transactional inventory and reconciliation engines** using **DB-backed idempotency keys**.
28. Implemented **node-cron scheduled jobs** (payment/inventory alerts, daily/weekly **SendGrid** email reports) with per-run tracking and restart recovery, plus **PDF** invoice/receipt generation and a strict **CSP + security-header suite**.
29. Co-built a government executive-council meeting-automation platform (Next.js 15, **MongoDB/Mongoose**) with a **custom JWT authentication system** (secure HTTP-only cookies, role-guard middleware) and **query-level role-scoped data access**.
30. Integrated **Google Genkit AI (Gemini 2.0 Flash)** flows for meeting-memo summarization via Server Actions, and built a **QR-code attendance system** — printable QR ID cards plus **live in-browser camera scanning** (`jsQR` + `getUserMedia`) with time-gated check-in.
31. Modeled a **9-state memo approval workflow** coordinated with a meeting-lifecycle state machine (with automatic status reversion), and delivered PDF + Excel register exports.

### Cross-cutting (supported across your repos)
32. Designed **relational and document database schemas** with `Decimal` money precision, composite unique constraints, targeted indexes, and enum-encoded state machines.
33. Applied a repeatable **auth → validate → transact → audit → revalidate** pattern for data-mutation safety across multiple systems.
34. Built **RBAC with server-side enforcement and query-level data scoping** (not just UI gating) across five systems.
35. Delivered **containerized deployments** with multi-stage Docker (non-root, standalone, healthchecks) and **GitHub Actions** pipelines (build gate → registry → SSH `docker compose`) across six repos.
36. Practiced **dependency-security hygiene** with Dependabot and blocking `npm audit` CI gates; implemented **security-header/CSP suites** including per-request CSP nonces.
37. Integrated **third-party services** — SendGrid, Cloudinary, MinIO/S3, OneSignal, Google Cloud Translation, Google Genkit — behind typed service layers.
38. Modeled and enforced **domain state machines** (memo, LPO, task, meeting lifecycles) with per-transition guards.
39. Implemented **PDF and Excel report generation** across six business systems (jsPDF, @react-pdf/renderer, ExcelJS).
40. Built **audit-logging subsystems** capturing before/after JSON snapshots, designed to fail safe so logging never breaks a transaction.
41. Worked across the full stack in a **multi-developer, PR-based** workflow (feature branches, conventional commits, code review, Dependabot) as the primary or top author of most repositories.
42. Designed and shipped **three complete applications solo** (translation-workflow platform, event-rental ERP, marketing site) from schema to deployment.

---

## 7. Technical Strengths (Top 10)

1. **End-to-end full-stack ownership** — you solely built 3 complete apps and led 4 more; not "contributed to," but "designed and shipped."
2. **Dual-paradigm data modeling** — you authored both **PostgreSQL/Prisma** (transleto, a-and-s-deco, KD-SONS, MAI-FITILA) and **MongoDB/Mongoose** (KNeCouncil) schemas — a strong differentiator.
3. **Authentication & RBAC depth** — custom JWT (secure cookies, HOF guards) *and* NextAuth v4/v5, with **query-level role scoping**, all in your commits.
4. **Transactional integrity & financial correctness** — interactive transactions, append-only ledgers, `Decimal` money, idempotency keys, tolerance-aware reconciliation (your KD-SONS, a-and-s-deco, MAI-FITILA work).
5. **Applied on-device ML / computer vision** — MobileFaceNet TFLite + ML Kit liveness + anti-spoofing (you're PensionVerify's top contributor); an uncommon, high-signal skill.
6. **Breadth of integration** — Genkit/Gemini AI, Google Translate, Leaflet geospatial, DOCX pipelines, SendGrid/Cloudinary/OneSignal — all shipped by you.
7. **Domain state-machine design** — multi-state memo/LPO/task/meeting workflows with enforced transitions.
8. **DevOps & containerization** — consistent multi-stage Docker + GitHub Actions → registry → SSH deploy across six of your repos.
9. **Security-conscious configuration** — CSP/header suites, CSP nonces, `npm audit` gates, Dependabot, non-root images (strongest in your KAMATS, KD-SONS, MAI-FITILA work).
10. **Clean, repeatable architecture** — feature-sliced/domain-grouped code, shared validators, typed API clients, service-engine layering — applied consistently across the portfolio.

---

## 8. Growth Areas (evidence-based)

- **Automated testing (highest priority).** No unit/integration/e2e tests in any repo, including your sole-authored apps. Adding a real Vitest/Jest + Testing-Library suite (and CI running it) to transleto or KD-SONS would be the single biggest credibility upgrade — KAMATS already has the tooling installed.
- **Secrets management.** Repos you lead commit live secrets (knbs KoBo tokens + Slack webhook; KNeCouncil README env values). Rotate the exposed keys now and move to `.env`/secret managers — this is a red flag reviewers specifically look for.
- **Build-quality gates.** Remove `ignoreBuildErrors`/`ignoreDuringBuilds`; let type/lint failures block CI.
- **Observability.** Move from `console.log` to structured logging; add metrics/tracing. Your audit logs are good; runtime observability is missing.
- **Validation consistency.** Standardize on Zod at the API boundary everywhere (KNeCouncil validates manually; a-and-s-deco mixes Zod and manual `FormData`).
- **Performance evidence.** No profiling/load-testing/caching-strategy docs. Measured optimization work would substantiate a scalability claim.
- **Accessibility.** Radix/shadcn give a baseline; no explicit a11y work — a gap for product roles.
- **Trim dependency bloat / dead deps.** Several repos install libraries never used (three.js/gsap, nodemailer, Flutter secure_storage/envied); remove them and don't list them as skills.
- **Depth vs. breadth.** The portfolio is broad and you own most of it; the fastest seniority signal now is *depth of rigor* — tests, observability, and a design doc on one flagship (transleto or KD-SONS).

---

## 9. Seniority Assessment

**Overall (evidence-based): strong Mid-level trending Senior — Senior-credible for full-stack product roles.**

**Reasoning:**
- **Clear senior signals:** you **solely designed and shipped three complete applications** (a translation-workflow platform with a non-trivial `pg_trgm` TM engine and DOCX round-tripping; an event-rental ERP with dual Prisma adapters and transactional engines; a marketing site), and you are the **lead/primary author of two large multi-developer ERPs** (KAMATS_WEB at 152 commits, KD-SONS) and the **top contributor** on a Flutter ML app and a manufacturing ERP. That is ownership, breadth (relational + document + mobile-ML + AI + geospatial), and end-to-end delivery — beyond typical mid-level.
- **What holds back a clean "Senior" label (on repo evidence):**
  - **No test culture anywhere** — senior engineers are expected to own testing/quality gates.
  - A few **maturity lapses** in repos you lead (committed secrets, `ignoreBuildErrors`) that senior review would catch.
  - No evidence of **performance/scale rigor** (profiling, load tests) or formal design docs.
  - Being top committer is a real signal but is **not** evidence of formal tech-lead/management authority; don't claim that from git alone.
- **How to present:** target **Senior / SWE II–III** roles for full-stack product engineering, data modeling, or applied-ML positions, leaning on your **three solo apps** and **two lead-authored ERPs**, and speak to your specific commits. Closing the testing gap (plus fixing the committed secrets) is what converts "trending Senior" into "clearly Senior."

---

## 10. ATS Keyword Inventory

Only keywords supported by repository evidence. *(★ = you authored/led the work.)*

**Languages:** TypeScript ★, JavaScript ★, Dart ★, SQL ★, HTML, CSS.

**Frameworks / Runtimes:** Next.js (App Router) ★, React 19 ★, React Server Components ★, React Server Actions ★, Node.js (22/24) ★, Flutter ★, Express-style route handlers ★.

**Libraries:** Redux Toolkit ★, RTK Query ★, TanStack React Query ★, TanStack Table ★, react-hook-form ★, Zod ★, Recharts ★, Leaflet / react-leaflet ★, framer-motion ★, shadcn/ui ★, Radix UI ★, Tailwind CSS ★, @react-pdf/renderer ★, jsPDF ★, ExcelJS ★, papaparse ★, mammoth ★, docx.js ★, qrcode / jsQR ★, TensorFlow Lite (tflite_flutter) ★, Google ML Kit (face detection) ★, dio ★, Axios ★, Flowbite-React ★, SweetAlert2 ★.

**Databases / Data:** PostgreSQL ★, Prisma ORM ★, MongoDB ★, Mongoose (ODM) ★, Neon (serverless Postgres) ★, `pg_trgm` trigram search ★, database indexing ★, migrations ★, TTL indexes ★, aggregation pipelines ★.

**Cloud / Integrations:** Google Genkit ★, Google Gemini 2.0 Flash ★, Google Cloud Translation API ★, SendGrid ★, Cloudinary ★, MinIO / AWS S3 SDK ★, OneSignal ★, Firebase App Hosting, Vercel ★, ZainPay.

**DevOps:** Docker ★, multi-stage builds ★, Docker Compose ★, GitHub Actions ★, CI/CD ★, GHCR / Docker Hub ★, SSH deployment ★, Dependabot ★, npm audit (security gate) ★, Turbopack ★, standalone output ★.

**Architecture:** REST APIs ★, Server Actions ★, RBAC / authorization ★, JWT authentication ★, feature-sliced architecture ★, service/engine layering ★, state machines ★, append-only ledgers ★, idempotency ★, middleware ★, SSR / static export ★, multi-app workspace ★.

**Testing:** *(honest)* Vitest, Testing Library, MSW — **tooling installed (KAMATS) but no test suites present**; represent as "familiarity," not coverage.

**Developer Tools:** Git ★, GitHub (PR workflow) ★, ESLint ★, VS Code, Prisma Studio ★, Genkit dev server ★.

**Engineering Practices:** authentication & authorization ★, role-based access control ★, input validation ★, audit logging ★, security headers / Content-Security-Policy ★, CSP nonces ★, database transactions ★, error handling ★, responsive design ★, containerization ★, CI/CD ★, dependency-security management ★, on-device machine learning ★, computer vision ★, biometric verification ★, data visualization ★, geospatial mapping ★, PDF/Excel reporting ★, agile/PR-based collaboration ★.

---

### Appendix — How to use this document
- Lead the resume with **Tier 1 (solo apps)** and **Tier 2 (lead-authored ERPs)** — these are your strongest, fully defensible claims.
- You can speak to **every repo except KNeCouncil in depth as the primary author**; in KNeCouncil you're a major co-author (be precise about that in interviews).
- The **fastest credibility upgrade**: add a real automated-test suite + CI to one Tier-1 app, and rotate/relocate the committed secrets in knbs_erosion and KNeCouncil.
- Do **not** import any user/scale/revenue/"projects delivered" numbers — none are substantiated by the repositories.
