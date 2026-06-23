# Testing

Tools and methods for testing Stripe integrations in a sandbox environment without affecting live data. Covers test cards, webhook testing via Stripe CLI, and test clocks for simulating time-based billing scenarios.

## Signature / Usage

```bash
# Webhook testing: forward events to local endpoint
stripe listen --forward-to localhost:4242/webhook

# Trigger a specific event manually
stripe trigger payment_intent.succeeded

# Create a PaymentIntent using a test card PaymentMethod
curl https://api.stripe.com/v1/payment_intents \
  -u "sk_test_...:" \
  -d amount=500 \
  -d currency=usd \
  -d payment_method=pm_card_visa \
  -d "payment_method_types[]=card"
```

## Options / Props

### Test card numbers

| Brand | Card Number | CVC | Date |
|-------|-------------|-----|------|
| Visa | `4242 4242 4242 4242` | Any 3 digits | Any future date |
| Visa (Debit) | `4000 0566 5566 5556` | Any 3 digits | Any future date |
| Mastercard | `5555 5555 5555 4444` | Any 3 digits | Any future date |
| American Express | `3782 822463 10005` | Any 4 digits | Any future date |
| Discover | `6011 1111 1111 1117` | Any 3 digits | Any future date |

### PaymentMethod test tokens

| Token | Description |
|-------|-------------|
| `pm_card_visa` | Visa card |
| `pm_card_mastercard` | Mastercard |
| `pm_card_amex` | American Express |
| `pm_card_discover` | Discover |
| `pm_card_jcb` | JCB |
| `pm_card_unionpay` | UnionPay |

### Test clocks

Test clocks allow time-based simulation of Billing objects (subscriptions, invoices, trials) without waiting for real time to pass.

| Constraint | Details |
|------------|---------|
| Maximum time advancement | 2 subscription intervals per advance |
| Customer eligibility | Customers with 3+ subscriptions or complex profiles cannot use "Run simulation" |
| Available via | Dashboard (Subscriptions page → Run simulation) or API |

## Notes

- Always use **test API keys** (`sk_test_...`) in sandbox; never use real card details.
- Do not use raw card numbers in code — use `PaymentMethod` objects or tokens instead.
- To simulate a user's geographic location, set customer email to `test+location_XX@example.com` (ISO 3166-1 alpha-2 country code).
- Do **not** use the sandbox for load testing; rate limits apply. See the [rate limits docs](https://docs.stripe.com/rate-limits) instead.
- `stripe listen` outputs a webhook signing secret used to verify signatures locally; this secret differs from the one in the Dashboard.
- Test clocks automatically clean up associated customers and subscriptions upon deletion (sandbox only).
- Workbench Shell can run `stripe listen` to view events but cannot forward them to a local endpoint — use Stripe CLI for that.

## Related

- [stripe-cli.md](./stripe-cli.md)
