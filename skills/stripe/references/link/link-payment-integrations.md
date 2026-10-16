# Link in Payment Integrations

Use Link with dynamic payment methods and other integrations: either as a payment method (`link`) or within a card-specific integration (`card`).

## Signature / Usage

Saved non-card Link payment method in a card integration (fixed values highlighted by the docs):

```json
{
  "id": "pm_12HA3WGPaV5rx8y34duNXgUp",
  "object": "payment_method",
  "type": "card",
  "card": {
    "brand": "link",
    "display_brand": "other",
    "exp_month": 12,
    "exp_year": 2040,
    "funding": "unknown",
    "last4": "0000",
    "checks": {
      "address_line1_check": null,
      "address_postal_code_check": null,
      "cvc_check": null
    },
    "country": "US",
    "networks": {
      "available": ["link"],
      "preferred": null
    },
    "generated_from": null,
    "three_d_secure_usage": {
      "supported": false
    },
    "wallet": {
      "dynamic_last4": null,
      "link": {},
      "type": "link"
    }
  },
  ...
}
```

## Options / Props

| Integration | PaymentMethod object | How to include |
|-------------|----------------------|----------------|
| Link as a payment method (recommended) | `type` is `link` | Use dynamic payment methods, or pass `link` in `allowed_payment_method_types` |
| Link with card integrations | `type` is `card`, wallet type is `link` | Pass `card` in `allowed_payment_method_types` |

Fixed values for non-card Link payments (e.g. Instant Bank Payments) in a card integration: brand `link`; available networks only `link`; last 4 `0000`; expiration `12/2040`; funding `unknown`; display brand `other`; all check results null.

## Notes

- Enable Link under **Wallets** in payment method settings; Stripe then shows Link automatically for eligible transactions. All Link transactions confirm immediately and settle to the Stripe balance on the same timeline as card payments.
- Both integrations accept all Link-supported payment methods, including credit and debit cards, Instant Bank Payments, and Klarna.
- Link as a payment method lets customers select a backup payment source; if the initial attempt fails and the customer approved the backup, Link retries with it automatically.
- Limitations of Link as a payment method: no Interchange+ (IC+) pricing (billed at a single blended rate); no extended authorization, incremental authorization, or overcapture. Use a card integration if these matter or if you need card brand / last 4.
- Passing `link` in `allowed_payment_method_types` always treats Link as a payment method, even if `card` is also passed. To handle Link payments as card payments, do not pass `link`.
- A card integration does not offer a backup payment source during checkout.
- If your UI renders card details, Stripe recommends identifying non-card payments as Link payments instead of rendering the fixed values.
- Source: https://docs.stripe.com/payments/link/link-payment-integrations (retrieved 2026-10).

## Related

- [Instant Bank Payments](./instant-bank-payments.md)
- [Link with Checkout](./link-checkout.md)
- [Link in the Payment Element](./link-payment-element.md)
- [Link in the Express Checkout Element](./link-express-checkout-element.md)
