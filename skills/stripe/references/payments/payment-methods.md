# PaymentMethods

Represents a customer's payment instrument. Combined with PaymentIntent or SetupIntent to create payments or save payment details for future use.

## Signature / Usage

```bash
# Create a PaymentMethod (use Stripe.js on the client side in production)
curl https://api.stripe.com/v1/payment_methods \
  -u "sk_test_YOUR_SECRET_KEY:" \
  -d type=card \
  -d "card[number]=4242424242424242" \
  -d "card[exp_month]=8" \
  -d "card[exp_year]=2026" \
  -d "card[cvc]=314"
```

## Options / Props

### Create (`POST /v1/payment_methods`)

| Name | Type | Description |
|------|------|-------------|
| `type` | enum (required) | Payment method type (e.g., `card`, `us_bank_account`, `sepa_debit`) |
| `billing_details` | object | Billing info: `name`, `email`, `phone`, `address` |
| `allow_redisplay` | enum | `always`, `limited`, or `unspecified` — controls reuse in checkout flows |
| `metadata` | object | Arbitrary key-value pairs |

Type-specific hashes (e.g., `card`, `us_bank_account`, `sepa_debit`) contain fields like `number`, `exp_month`, `exp_year`, `cvc`, `iban`, `routing_number`, etc.

### Object Attributes

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Unique identifier (e.g., `pm_...`) |
| `object` | string | Always `"payment_method"` |
| `type` | enum | The payment method type |
| `customer` | string | Associated Customer ID if saved |
| `created` | timestamp | Unix timestamp of creation |
| `livemode` | boolean | `true` for live mode |
| `metadata` | object | Custom key-value pairs |

### Supported `type` Values (selected)

| Category | Types |
|----------|-------|
| Cards & wallets | `card`, `apple_pay`, `google_pay`, `link`, `paypal`, `amazon_pay`, `cashapp` |
| Bank debits | `us_bank_account`, `sepa_debit`, `bacs_debit`, `acss_debit`, `au_becs_debit` |
| Bank redirects | `ideal`, `bancontact`, `giropay`, `eps`, `p24`, `sofort`, `fpx` |
| Buy Now Pay Later | `klarna`, `afterpay_clearpay`, `affirm` |
| Voucher / cash | `boleto`, `oxxo`, `konbini`, `multibanco` |
| Regional | `alipay`, `wechat_pay`, `paynow`, `promptpay`, `pix`, `upi`, `grabpay` |

## Notes

- Use **Stripe.js** (`stripe.createPaymentMethod()`) on the client to handle sensitive card data — never send raw card numbers through your server.
- **Immediate notification** payment methods (cards): PaymentIntent transitions to `succeeded` or `requires_payment_method` immediately.
- **Delayed notification** payment methods (ACH, some bank transfers): PaymentIntent stays `processing`; use webhooks to await `payment_intent.succeeded`.
- Listen to `payment_intent.processing`, `payment_intent.succeeded`, and `payment_intent.payment_failed` webhooks; do not poll.
- Reusable methods (cards, bank accounts) can be saved to a Customer for future charges without re-authorization.

## Related

- [PaymentIntents](./payment-intents.md)
- [Charges](./charges.md)
