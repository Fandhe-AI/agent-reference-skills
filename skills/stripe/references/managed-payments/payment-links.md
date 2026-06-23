# Payment Links with Managed Payments

Create no-code payment links for digital products with Managed Payments enabled, using the Dashboard or the Payment Links API.

## Signature / Usage

```bash
curl https://api.stripe.com/v1/payment_links \
  -u "YOUR_SECRET_KEY:" \
  -d "managed_payments[enabled]=true" \
  -d "line_items[0][price]={{PRICE_ID}}" \
  -d "line_items[0][quantity]=1"
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `managed_payments[enabled]` | boolean | Yes | Activates Managed Payments on this payment link |
| `line_items[].price` | string | Yes | Price ID; product must have an eligible tax code |
| `line_items[].quantity` | integer | Yes | Number of units |

### Unsupported Parameters (must be omitted)

| Parameter | Reason |
|-----------|--------|
| `automatic_tax`, `tax_id_collection` | Managed Payments handles tax |
| `payment_method_types` | Dynamic payment methods are used |
| `shipping_address_collection`, `shipping_options` | Digital products only |
| `application_fee_*`, `on_behalf_of`, `transfer_data` | Connect not supported |
| `subscription_data.invoice_settings`, `invoice_creation` | Managed Payments handles billing |
| `payment_intent_data.statement_descriptor*` | Stripe manages on behalf of business |
| `custom_text` | Standardized checkout only |
| `submit_type='donate'`, `submit_type='book'` | Only standard submit types supported |

## Notes

- Requires API version `2025-03-31.basil` or later
- Once a payment link is created, the Managed Payments status is immutable — you cannot enable or disable it on an existing link; create a new link instead
- Creating Managed Payments–enabled links via the Stripe iOS app is not supported; use the web dashboard or API
- `tax_behavior` on prices can be `exclusive` (default, tax added on top) or `inclusive` (tax included in displayed price)
- Test by loading the payment link URL with different billing addresses to verify tax calculations; use card `4242 4242 4242 4242`

## Related

- [Overview](./overview.md)
- [Setup with Checkout](./set-up-checkout.md)
- [Tax Compliance](./tax-compliance.md)
