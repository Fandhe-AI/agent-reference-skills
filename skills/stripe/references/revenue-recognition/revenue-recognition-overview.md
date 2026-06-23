# Revenue Recognition

Automates accrual accounting for revenue recognition in compliance with ASC 606 / IFRS 15. Generates double-entry journal entries for every Stripe transaction and recognizes revenue ratably over service periods.

## Signature / Usage

```bash
# Enable via Dashboard (30-day free trial available)
# Navigate to: https://dashboard.stripe.com/revenue-recognition

# Test in Sandbox mode before production
# Sandbox generates test revenue reports without real transactions
```

## How It Works

Revenue Recognition processes each Stripe transaction into journal entries following double-entry bookkeeping. Revenue is earned over the service period, not at payment time.

**Example — $120 one-time payment with 12-month service period:**

| Entry | Debit | Credit | Amount |
|-------|-------|--------|--------|
| Invoice finalized | AccountsReceivable | DeferredRevenue | $120.00 |
| Payment received | Cash | AccountsReceivable | $120.00 |
| Each month (×12) | DeferredRevenue | Revenue | $10.00 |

**Default behavior by transaction type:**

| Transaction Type | Default Recognition |
|-----------------|---------------------|
| Subscription invoice line item | Ratably over service period |
| Invoice line item (no service period) | Immediately on invoice finalization |
| One-time payment (no invoice) | Immediately on payment receipt |
| Usage-based billing | As usage is consumed |

## Chart of Accounts

### Income Statement Accounts

| Account | Type | Purpose |
|---------|------|---------|
| Revenue | Credit | Earned recognized revenue |
| Refunds | Debit (contra-revenue) | Offsets previously recognized revenue |
| Chargebacks | Debit (contra-revenue) | Offsets previously recognized revenue |
| Fees | Debit (expense) | Stripe processing fees |

### Balance Sheet Accounts

| Account | Type | Purpose |
|---------|------|---------|
| Cash | Debit (asset) | Net cash received (net of fees) |
| Accounts Receivable | Debit (asset) | Amounts billed but unpaid |
| Deferred Revenue | Credit (liability) | Billed but unearned revenue |
| Unearned Receivables | Debit (asset) | Revenue recognized before invoicing |
| Contract Assets | Debit (asset) | Revenue from contracts before billing |
| External Assets | Debit (asset) | Payments received outside Stripe |

## Accounting Rules

Rules control how revenue is processed per transaction. Stripe provides sensible defaults; custom rules handle edge cases.

**Default rules:**
1. Invoice line items with a service period → amortized over that period
2. Invoice line items with no service period → recognized on finalization
3. Payments without invoices → recognized on receipt

**Custom rule use cases:**
- Classify amounts as taxes or pass-through fees
- Exclude test customers or specific invoices
- Apply custom amortization schedules
- Split a single transaction into multiple recognition treatments

**Rule priority:** Only one rule applies per transaction. Higher position in the rule list = higher priority. Rules apply to reports within 24 hours.

## Reports

Access via Dashboard → Revenue Recognition → Statements.

| Report | Purpose |
|--------|---------|
| Trial Balance | Verify debit/credit balances; audit transaction activity |
| Period Summary | Billing activity, recognition, and deferred revenue changes |
| Income Statement | Revenue, expenses, and net profit for a period |
| Balance Sheet | Assets and liabilities at a point in time |
| Accounts Receivable Aging | Unpaid invoices and customer payment behavior |
| Debits and Credits | Detailed journal entries by event type |
| Revenue Waterfall | Projected recognizable revenue over time |

**CSV export groupings:** Summary, Products, Prices, Customers, Invoices, Line Items, Metadata, Event Types, Invoice Event Types, Line Item Event Types.

Reports are generated within up to 24 hours of transaction activity.

## Configuration Notes

- **Multi-currency:** Transactions are converted to the account's settlement currency. Exchange rate differences are tracked in the `FxLoss` account.
- **Refunds/Chargebacks:** Generate negative revenue entries. The recognized portion goes to a negative revenue account; the unearned portion reduces deferred revenue.
- **Subscription upgrades/downgrades:** Proration creates negative line items; revenue reversals are recorded for previously recognized amounts.
- **External invoices (paid outside Stripe):** Recorded to `External Assets`; returns go to `External Refund` (contra-revenue).
- **Long-term deferred revenue:** Enabled by default; separates obligations beyond 12 months.

## Notes

- Dashboard data may take up to 4 hours to reflect new transactions.
- Custom rules with an effective date overlapping a closed accounting period apply retrospectively. Open accounting periods before adding rules to avoid unintended corrections.
- Stripe Billing subscriptions require no additional configuration; revenue recognition is automatic.
- For non-Stripe billing (third-party or manual invoicing), create custom rules or use the Data Import feature to add service period data.

## Related

- [README](./README.md)
