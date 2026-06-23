# Managed Payments Overview

Stripe's Merchant of Record (MoR) solution for selling digital products globally. Stripe acts as the merchant of record, handling indirect tax compliance, fraud prevention, chargeback management, and transaction-level customer support.

## Signature / Usage

Enable Managed Payments by setting `managed_payments[enabled]=true` when creating a Checkout Session or Payment Link.

```bash
curl https://api.stripe.com/v1/checkout/sessions \
  -u "YOUR_SECRET_KEY:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=1" \
  -d "managed_payments[enabled]=true" \
  -d mode=subscription \
  --data-urlencode "success_url=https://example.com/success"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `managed_payments[enabled]` | boolean | Set to `true` to activate Managed Payments on a Checkout Session or Payment Link |
| `tax_code` | string | Eligible tax code assigned to the product; must be a Managed Payments–eligible category |
| `mode` | string | `payment` (one-time) or `subscription` (recurring) |

## Notes

- Requires API version `2025-03-31.basil` or later
- Stripe (via Link) appears as the merchant of record on customer receipts and statements; statement descriptor shows as `LINK.COM* [your descriptor]`
- Adaptive Pricing is enabled by default — prices are automatically converted to the customer's local currency
- Supported integrations: Checkout and Payment Links only; Connect platforms, embedded components, and manual invoice flows are not supported
- Custom domains are not supported; all customer-facing communications are sent by Link
- Dashboard email settings do not override Link-managed receipt and subscription emails

## Related

- [Eligibility](./eligibility.md)
- [Setup with Checkout](./set-up-checkout.md)
- [Tax Compliance](./tax-compliance.md)
- [Payment Links](./payment-links.md)
