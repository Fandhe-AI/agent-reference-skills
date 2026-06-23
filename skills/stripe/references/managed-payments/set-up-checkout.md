# Setup with Checkout

Step-by-step guide to integrating Managed Payments into a new Stripe Checkout flow for one-time payments and subscriptions.

## Signature / Usage

```bash
# Subscription
curl https://api.stripe.com/v1/checkout/sessions \
  -u "YOUR_SECRET_KEY:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=1" \
  -d "managed_payments[enabled]=true" \
  -d mode=subscription \
  --data-urlencode "success_url=https://example.com/success"

# One-time payment
curl https://api.stripe.com/v1/checkout/sessions \
  -u "YOUR_SECRET_KEY:" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=1" \
  -d "managed_payments[enabled]=true" \
  -d mode=payment \
  --data-urlencode "success_url=https://example.com/success"
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `managed_payments[enabled]` | boolean | Yes | Activates Managed Payments on the session |
| `mode` | string | Yes | `payment` or `subscription` |
| `line_items[].price` | string | Yes | Price ID; the product must have a Managed Payments–eligible tax code |
| `success_url` | string | Yes | Redirect URL after successful payment |

## Notes

- Enable Managed Payments in Dashboard Settings and accept the Managed Payments Terms before creating sessions
- Requires API version `2025-03-31.basil` or later
- Products must have eligible tax codes; set `tax_code` on the product when creating it
- Webhook events to handle: `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`
- Test with card `4242 4242 4242 4242` and varying billing addresses to verify tax calculation
- Parameters not compatible with Managed Payments: `automatic_tax`, `tax_id_collection`, `payment_method_types`, `shipping_address_collection`, Connect-related fields (`application_fee_*`, `on_behalf_of`, `transfer_data`)

## Related

- [Overview](./overview.md)
- [Payment Links](./payment-links.md)
- [Tax Compliance](./tax-compliance.md)
- [Eligibility](./eligibility.md)
