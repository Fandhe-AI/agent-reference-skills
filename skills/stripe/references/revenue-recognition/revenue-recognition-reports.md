# Revenue Recognition Reports

Generate and export revenue reports using Stripe Revenue Recognition. Reports are viewable in the Dashboard and exportable as CSV.

## Signature / Usage

Integration requirements (from the docs): model subscriptions with products, prices, and customers; set taxes via the `default_tax_rates` attribute (not as line items); set discounts via the `discount` object (not as invoice items).

```bash
# Dashboard overview
https://dashboard.stripe.com/revenue-recognition
# Statements tab (financial reports, CSV download)
https://dashboard.stripe.com/revenue-recognition/statements
```

## Dashboard overview charts

Default charts:

- **Recognized revenue**: net recognized revenue.
- **Deferred revenue**: ending balance of deferred revenue per month.
- **Booked revenue**: revenue recorded when an invoice is finalized, including monthly totals booked but not necessarily recognized.

Optional charts (add via **Add**): Top products by net recognized revenue, Top customers by net recognized revenue, Top products by booked revenue, Top customers by booked revenue, AR aging trend.

Customize: **Add** opens the chart catalog; **Edit** enables drag-to-reorder and removal (including defaults); **Reset** restores default order. Selections persist across sessions and can be saved per account.

Other views: recognized revenue breakdown (by source, with adjustments for refunds, disputes, and contra revenue); revenue waterfall (expected recognizable revenue over time, based on historical billings only; does not model future billings).

## Statements

| Report Type | Description |
| --- | --- |
| Trial balance | Prepare for book closing; confirm debit and credit balances are equal. Select **Net change** amounts to audit detailed activity. |
| Period summary | Billing activity, revenue recognition, and deferred revenue changes. |
| Income statement | Revenue, expenses, and net income over a period. |
| Balance sheet | Assets and liabilities at a specific time. |
| Accounts receivable aging | Outstanding invoices categorized by age. |
| Debits and credits | Detailed transaction entries; **Entries** filter shows all transactions or isolates corrections. |

## CSV export formats

| Report format | Description |
| --- | --- |
| Summary | Summary of revenue recognition for the selected period. |
| Product | Organized by product. |
| Price | Organized by price, including pricing metadata and intervals. |
| Customer | Organized by customer, including name, email, and address. |
| Invoice | Organized by invoice, including charges, refunds, and dispute IDs. |
| Line item | Organized by line item, including charges, refunds, and dispute IDs at line item level. |
| Metadata | Grouped by selected metadata object type and key (charge, customer, invoice, invoice item, product, or subscription metadata). |
| Event type | Debits and credits reports only; organized by event type. |
| Invoice event type | Debits and credits reports only; by invoice and event type. |
| Line item event type | Debits and credits reports only; by line item and event type. |
| QuickBooks format | Debits and credits report only; importable into QuickBooks Online. Entries grouped by accounting period and currency, debits and credits netted by account. |

## Notes

- Expect a 4-hour delay before data displays in the Dashboard.
- All report information is accessible after data import.
- By default, exported reports include data for all currencies.
- Revenue from usage-based billing is recognized in full when invoices finalize or when the accounting period closes.
- Monthly charts use color to differentiate open and closed accounting periods; figures in open periods continue to change until the period closes.
- Activity breakdown: select **Net change** amounts in the trial balance to see the underlying transactions.
- Revenue recognition requirements vary by business location and goods or services sold; configure your account accordingly.
- Source: https://docs.stripe.com/revenue-recognition/reports (retrieved 2026-10).

## Related

- [Revenue Recognition API](./revenue-recognition-api.md)
- [Revenue Recognition Rules](./revenue-recognition-rules.md)
- [Revenue Recognition](./revenue-recognition-overview.md)
