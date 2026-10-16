# Update Checkout Integration for Managed Payments

Update an existing Stripe Checkout integration (hosted or embedded, `payment` or `subscription` mode) to use Managed Payments by setting product tax codes, enabling `managed_payments[enabled]`, and removing unsupported parameters.

## Signature / Usage

```bash
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price]=price_xxx" \
  -d "line_items[0][quantity]=1" \
  -d "managed_payments[enabled]=true" \
  -d mode=subscription \
  --data-urlencode "success_url=https://example.com/success"
```

Set a tax code on a product (inline products use `product_data[tax_code]`):

```bash
curl https://api.stripe.com/v1/products/prod_xxx \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d tax_code=txcd_10000000
```

## Options / Props

Parameters to remove from Checkout Session creation (subscription mode):

| Category | Parameter | Reason |
|----------|-----------|--------|
| Adaptive Pricing | `adaptive_pricing` | Always enabled |
| Tax | `automatic_tax`, `tax_id_collection`, `subscription_data.default_tax_rates` | Managed Payments handles tax |
| Payment methods | `payment_method_configuration`, `payment_method_types` | Controlled via dynamic payment methods |
| Customer update | `customer_update[name]`, `customer_update[address]` | Name and billing address are required for tax; existing customer is updated |
| Shipping | `shipping_address_collection`, `shipping_options` | Digital products only |
| Connect | `subscription_data.application_fee_percent`, `subscription_data.on_behalf_of`, `subscription_data.transfer_data` | Connect not supported |
| Post-sale | `subscription_data.invoice_settings`, `invoice_creation` | Managed Payments handles invoicing and emails |

Parameters to remove (one-time payment mode):

| Category | Parameter |
|----------|-----------|
| Tax | `automatic_tax`, `tax_id_collection` |
| Payment methods | `excluded_payment_method_types`, `adaptive_pricing`, `payment_method_configuration`, `payment_method_types` |
| Customer update | `customer_update[name]`, `customer_update[address]` |
| Shipping | `shipping_address_collection`, `shipping_options`, `payment_intent_data.shipping` |
| Connect | `payment_intent_data.application_fee_amount`, `payment_intent_data.on_behalf_of`, `payment_intent_data.transfer_data`, `payment_intent_data.transfer_group` |
| Post-sale | `invoice_creation`, `payment_intent_data.statement_descriptor`, `payment_intent_data.statement_descriptor_suffix`, `payment_intent_data.receipt_email` |

## Notes

- Managed Payments can only be enabled for new subscriptions purchased through a Managed Payments Checkout Session; existing subscriptions are not eligible.
- Prerequisites: enable Managed Payments in the Dashboard, accept the Managed Payments terms of service, meet the eligibility requirements, and use API version `2025-03-31.basil` or later.
- Select a tax code labeled `Eligible for Managed Payments`.
- Prices use the `tax_behavior` set on the price; if unspecified, tax is added on top of the price by default. Change the default in Dashboard Tax settings (**Include tax in prices**).
- Test with card `4242 4242 4242 4242` and different billing addresses. In sandbox mode, receipt emails are not sent automatically; use **Send receipt** under **Receipt history**.
- Link test: create a Link account in one Checkout Session, then reuse the same email in another and authenticate with passcode `000000`. Test purchases do not appear in the Link app.
- A subscription purchased through Managed Payments only authorizes Managed Payments to charge the payment method; obtain consent for charges outside Managed Payments.
- If you have no existing Checkout integration, use the new-integration setup guide instead (see set-up-checkout).
- Source: https://docs.stripe.com/payments/managed-payments/update-checkout

## Related

- [Set up with Checkout](./set-up-checkout.md)
- [Eligibility](./eligibility.md)
- [Tax Compliance](./tax-compliance.md)
- [How Managed Payments Works](./how-it-works.md)
