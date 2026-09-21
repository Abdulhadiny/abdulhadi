# Procurement & Purchase-Order Platform

**Role:** Lead engineer (primary contributor) · **Type:** Client project (code private) · **Year:** 2026

A management platform for a distribution/logistics business that runs on **Local Purchase Orders (LPOs)** — replacing spreadsheet tracking with a system that models the full order lifecycle as a state machine and, critically, handles the money correctly on both sides of every transaction.

> *About this case study:* the code is owned by the client and is not public. This is my written account of the system I led; the snippets below are simplified and anonymized for illustration. A private walkthrough is available on request.

---

## Context

The business buys goods from suppliers and sells them onward, dispatching trucks between locations. Tracked in spreadsheets, this broke down in predictable ways: purchase-order numbers collided, truck deliveries weren't matched to orders, and — the expensive one — payments weren't reconciled correctly because **two different withholding taxes** applied (one when the business pays a supplier, one when a customer pays the business). Getting that wrong silently misreports balances.

## What it does

Manages the complete LPO lifecycle — `Draft → Submitted → Approved → In Transit → Delivered → Reconciled` (plus rejection and change-request paths) — across a company / branch / location hierarchy, with suppliers, products, trucks, dispatch/weigh-in, and bidirectional payments. It computes cost, delivery margin, supplier margin, and both withholding taxes, and auto-reconciles an order once both payment sides are settled.

## My role

I was the **lead engineer and largest contributor** on the project. I built the data model, the server-action API layer, the role-based access control, and — the focus below — the financial computation and reconciliation logic.

## Engineering highlights

### 1. Dual-sided reconciliation with two withholding taxes
An order is only "settled" when **both** payment directions are paid, each net of the tax withheld on *that* side. I isolated this into a **pure, testable predicate** with a small tolerance for the rounding that comes from `Decimal` money aggregations. An earlier version applied the same tax to both sides, which mis-stated the supplier balance whenever the two taxes differed — factoring it into one function made the rule explicit and correct:

```ts
// Simplified & anonymized. Both sides must clear, each net of its own withholding tax.
const TOLERANCE = 0.01; // absorb Decimal→Number rounding

function isFullyPaid(order): boolean {
  const paidToSupplier =
    Number(order.paidToSupplier) >= Number(order.supplierTotal) - Number(order.supplierWht) - TOLERANCE;
  const paidByCustomer =
    Number(order.paidByCustomer) >= Number(order.customerTotal) - Number(order.customerWht) - TOLERANCE;
  return paidToSupplier && paidByCustomer;
}
```

The auto-reconcile step re-reads the order **inside the caller's transaction** so it sees the just-incremented payment totals rather than a stale snapshot, then flips the order and its trucks to `Reconciled` in the same atomic operation.

### 2. Race-free sequential order numbers
Human-readable, gap-free LPO numbers can collide when two users submit at the same moment. I generate them with a **database transaction plus an atomic per-year counter**, so concurrency can never produce a duplicate:

```ts
const sequence = await tx.lpoSequence.upsert({
  where:  { year: currentYear },
  update: { lastNumber: { increment: 1 } }, // atomic — no read-then-write race
  create: { year: currentYear, lastNumber: 1 },
});
const lpoNumber = formatLpoNumber(currentYear, sequence.lastNumber);
```

### 3. A state machine you can't bypass
Every transition is guarded server-side: only a `Submitted` order can be approved or rejected; only `Draft`/`Change-Requested` orders can be edited; an order can't be cancelled while it has weighed-in trucks; dispatch is blocked on cancelled/delivered/reconciled orders. The rules live in code, not just in the UI.

### 4. Context-aware, location-scoped authorization
Beyond simple roles, some permissions depend on **where** the user is. A destination operator can weigh a truck **only when the truck's location matches their assigned location** — enforced both at the action entry point and at the query layer, so operators only ever see and act on their own location's data.

### 5. Consistent, auditable mutations
Every write follows the same pipeline — **authenticate → check permission → validate (Zod) → database transaction → audit-log → revalidate** — with the audit entry committed in the *same* transaction as the change, and side effects like supplier emails fired only *after* commit so a rolled-back order never sends a false notification.

## Stack

Next.js 16 (App Router, React Server Actions) · React 19 · TypeScript · PostgreSQL · Prisma · NextAuth v5 (JWT, bcrypt) · Zod · Tailwind CSS · shadcn/ui · Docker · GitHub Actions CI/CD.

## Outcome

The business moved from error-prone spreadsheets to a system where stock movement and money movement are transactional, auditable, and reconciled automatically — with financial correctness (dual withholding tax, tolerance-aware settlement) verified rather than assumed.
