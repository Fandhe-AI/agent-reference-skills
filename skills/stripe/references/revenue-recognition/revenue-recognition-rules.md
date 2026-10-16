# Revenue Recognition Rules

Customize rules to handle revenue treatments specific to your business, configured in the Dashboard.

## Signature / Usage

```bash
# Configure rules in the Dashboard
https://dashboard.stripe.com/revenue-recognition/rules
```

Example uses of a rule:

- Categorize an invoice line item as a tax or fee.
- Book a transaction amount or invoice line item as a passthrough fee.
- Exclude transactions from specific customers or test invoices.
- Amortize revenue over a specified time period relative to payment or invoice finalization date.
- Recognize revenue after a specific time period to model a future fulfillment schedule.
- Allocate multiple revenue treatments to a single transaction amount.

## Default rules

- Invoice line items with service periods: amount amortizes evenly over the service period. Without a period, the amount is recognized entirely when the invoice finalizes.
- Other payments not made through an invoice: recognized immediately upon payment if no service period or fulfillment information exists, or by imported service period or fulfillment data.

## Custom rules

Custom rules override default behaviors. Rules can apply to: Products, Customers, Invoice line items, Other payments (charges not associated with invoices), Credit Notes.

## Rule ordering and hierarchy

Each transaction can have only one rule applied. When a transaction matches multiple rules' "Apply-to" criteria, the higher a rule is ranked in the list, the higher its priority. Reorder with **Change rule order**.

## Notes

- Rules are typically applied to reports within 24 hours. A rule successfully applied in the latest report has `active` status; otherwise it remains `processing`.
- If a new rule's effective period overlaps a closed accounting period, applying it retroactively generates corrections. To prevent this, open the accounting period before adding the rule.
- Periodically review rules for hierarchy and effective period as billing models and customer types change.

## Related

- [Revenue Recognition Reports](./revenue-recognition-reports.md)
- [Revenue Recognition](./revenue-recognition-overview.md)
