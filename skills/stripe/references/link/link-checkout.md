# Link with Checkout

Use Link with Stripe's prebuilt checkout page (also works with Payment Links) so customers can save and reuse payment information.

## Signature / Usage

```curl
curl https://api.stripe.com/v1/checkout/sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "line_items[0][price_data][unit_amount]=2000" \
  -d "line_items[0][price_data][product_data][name]=T-shirt" \
  -d "line_items[0][price_data][currency]=usd" \
  -d "line_items[0][quantity]=1" \
  -d mode=payment \
  --data-urlencode "success_url=https://example.com/success"
```

With dynamic payment methods, enable Link in payment method settings and omit the manual payment method list (`payment_method_types` in versions before endive; removed from Checkout Session create in 2026-09-30.endive).

## Options / Props

| Name | Description |
|------|-------------|
| `allowed_payment_method_types` | When listing manually on 2026-09-30.endive: add `link`, also include `card`, and use the same currency across all `line_items` (versions before endive use `payment_method_types`; on endive passing `payment_method_types` to Checkout Session create returns 400) |

Sandbox one-time passcodes:

| Value | Outcome |
|-------|---------|
| Any other 6 digits not listed below | Success |
| 000001 | Error, code invalid |
| 000002 | Error, code expired |
| 000003 | Error, max attempts exceeded |

## Notes

- No additional fees; same pricing as other card payments. The payment's `payment_method.type` is `link`.
- If you collect card details for future usage with Setup Intents, list payment methods manually instead of using dynamic payment methods.
- When switching an existing integration to dynamic payment methods, remove the `payment_method_types` parameter (versions before endive; already removed on endive); cards and wallets then turn on automatically. The currency restricts the methods the customer sees.
- Do not store real user data in sandbox Link accounts; treat them as publicly available (tied to your publishable key). Link supports credit cards, debit cards, and qualified US bank account purchases.
- Connect: Link is automatically available to connected accounts using Checkout through a platform. Platforms manage Link in Link settings; connected accounts manage it in their own Dashboard settings.
- Disable Link in payment method settings, individually for each payment method configuration; changes may take a few minutes to take effect.
- Migration (dahlia → endive): the official Link page still shows `payment_method_types`; Checkout Session create removed it in 2026-09-30.endive (see checkout-sessions.md).
- Source docs show the manual-list case with a Ruby snippet only; the Ruby example shown there omits `payment_method_types`.
- Source: https://docs.stripe.com/payments/link/checkout-link (retrieved 2026-10).

## Related

- [Link in Payment Integrations](./link-payment-integrations.md)
- [Instant Bank Payments](./instant-bank-payments.md)
- [Link in the Payment Element](./link-payment-element.md)
