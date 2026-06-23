# Tax Compliance

How Managed Payments handles indirect tax (sales tax, VAT, GST) for digital product sales globally. Stripe calculates, collects, registers, files, and remits taxes on the merchant's behalf in 80+ countries.

## Signature / Usage

Tax handling is automatic when `managed_payments[enabled]=true`. Assign an eligible tax code to each product to determine the correct tax treatment.

```bash
curl https://api.stripe.com/v1/products \
  -u "YOUR_SECRET_KEY:" \
  -d "name=Basic subscription" \
  -d tax_code={{TAX_CODE}} \
  -d "default_price_data[unit_amount]=1000" \
  -d "default_price_data[currency]=usd" \
  -d "default_price_data[recurring][interval]=month"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `tax_code` | string | Managed Payments–eligible tax category assigned to the product |
| `tax_behavior` | string | `exclusive` (tax added on top, default) or `inclusive` (tax included in price). Configurable in Dashboard > Tax settings |

## Notes

- Stripe handles all indirect tax obligations in supported jurisdictions: calculates, collects, registers, files, and remits
- Coverage: 80+ countries for cross-border sales; domestic sales excluded for Singapore (B2B only) and Japan (all domestic)
- For jurisdictions not covered by Managed Payments, Stripe Tax is automatically applied at no additional calculation fee
- When using Stripe Tax for unsupported jurisdictions, invoices display the merchant's business name rather than "Link"
- Refund tax handling: the full amount including original tax is returned to the customer; in certain jurisdictions Stripe retains and remits the original tax, reducing your account balance by that amount
- Do not use `automatic_tax` or `tax_id_collection` parameters — Managed Payments manages these internally

## Related

- [Overview](./overview.md)
- [Eligibility](./eligibility.md)
- [Setup with Checkout](./set-up-checkout.md)
