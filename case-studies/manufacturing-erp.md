# Manufacturing & Inventory ERP

**Role:** Core engineer (top contributor) · **Type:** Client project (code private) · **Year:** 2026

An internal ERP for a **plastics recycling and manufacturing business** that models the full physical pipeline — from raw waste purchase through crushing, blending, packaging, and finished-goods production, to sales and finance — with role-based access, automated operations, and a complete audit trail.

> *About this case study:* the code is owned by the client and is not public. This is my written account of the system and the parts I built; the snippets below are simplified and anonymized for illustration. A private walkthrough is available on request.

---

## Context

A recycling manufacturer needed to track physical stock as it changes form through a five-stage pipeline (waste → crushed → blended → packaged → finished goods), while also running the money side — supplier payments, customer sales and wallets, expenses, and profit-and-loss. The hard requirements were **stock accuracy under concurrent operations**, **no double-charged payments**, and **correct dates** for a business operating in West Africa on UTC infrastructure.

## What it does

Covers supply (waste purchase, supplier payments), inventory (multi-store stock with an immutable transaction ledger), recycling and production records, sales and customer wallets, invoices/receipts, expenses and financial reporting, notifications, and a full audit log — behind permission-string RBAC. A background scheduler drives recurring alerts and reports.

## My role

I was a **core engineer and the largest single contributor** on the team. My focus areas were the transactional inventory and payment engines, the scheduled-operations subsystem, and application security hardening — described below.

## Engineering highlights

### 1. Transactional inventory ledger
Stock is never mutated on its own. Crediting or debiting a store updates the stock quantity, appends an **immutable transaction record**, and writes an **audit entry** — all in one database transaction. The engine accepts an optional transaction client so it can **join a larger operation** (e.g. a sale that debits several items) atomically, and it refuses to over-draw:

```ts
// Simplified & anonymized.
async function debit({ storeId, itemId, quantity, tx }) {
  const run = async (t) => {
    const stock = await t.stock.findFirst({ where: { storeId, itemId } });
    if (!stock || stock.currentQty < quantity) {
      throw new Error(`Insufficient stock in ${storeId}`);
    }
    const updated = await t.stock.update({
      where: { id: stock.id },
      data:  { currentQty: { decrement: quantity } },
    });
    await t.stockTransaction.create({ data: { storeId, itemId, type: "debit", quantity } });
    await audit.log({ table: "stock", recordId: updated.id, newValues: updated, tx: t });
    return updated;
  };
  // Join an outer transaction if given; otherwise open our own.
  return tx ? run(tx) : db.$transaction(run);
}
```

### 2. Exactly-once payments via idempotency keys
Double-submitted payment requests (a user double-clicking, a retried network call) must not charge twice. Payments carry an **idempotency key backed by a unique database column**, so a repeated request collapses to a single recorded payment. Recording a payment also advances the linked sale's status (`outstanding → partial → reconciled`) in the same transaction.

### 3. Resilient scheduled operations
A `node-cron` scheduler, booted once via the app's instrumentation hook, runs recurring jobs — payment-due alerts, inventory-threshold checks, and daily/weekly email reports — all pinned to the business's timezone. Each run is tracked in a `SchedulerJobRun` table, and **runs left "in progress" after a crash are reconciled to failed on restart**, so the scheduler is self-healing rather than silently stuck.

### 4. Timezone correctness baked into infrastructure
Date-typed columns compared across a West-Africa business (UTC+1) running on UTC servers produced off-by-a-day bugs. I forced the database session timezone to UTC at the connection-pool level and standardized date handling to the business timezone, making `date >= X AND date <= Y` queries deterministic regardless of where the server runs.

### 5. Security hardening as part of delivery
A strict Content-Security-Policy and full security-header suite; **error-message allow-listing** so internal errors never leak to clients (only vetted messages surface, everything else returns a generic response); a fail-safe audit trail that records before/after values without ever breaking the main transaction; and a **CI security gate** that fails pull requests on high/critical `npm audit` findings, with Dependabot enabled.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · PostgreSQL · Prisma (driver adapter) · NextAuth (JWT, bcrypt, RBAC) · TanStack React Query · Zod · Tailwind CSS · shadcn/ui · Recharts · `@react-pdf/renderer` · SendGrid · node-cron · Docker (multi-stage) · GitHub Actions → GHCR → SSH deploy.

## Outcome

A single system replacing scattered spreadsheets across the whole operation, where stock and money are transactional and auditable, payments can't double-charge, recurring alerts and reports run themselves, and date logic is correct by construction — shipped through a hardened, containerized CI/CD pipeline.
