# Instant Bank Payments

Accept low cost US bank payments with instant confirmation, using Link.

## Signature / Usage

Instant Bank Payments are enabled automatically when Link is turned on (subject to eligibility). To explicitly offer ACH Direct Debit instead, include `us_bank_account` in the payment method types:

```text
allowed_payment_method_types (Checkout Session, 2026-09-30.endive)
payment_method_types (Checkout Session, versions before endive; PaymentIntent / SetupIntent in versions before endive)
```

Including `us_bank_account` there means Link never presents Instant Bank Payments.

## Options / Props

| Property | Value |
|----------|-------|
| Customer locations | United States |
| Presentment currency | USD |
| Payment confirmation | Instant |
| Payment method family | Bank debits |
| Recurring / off-session payments | Yes / Yes |
| Payout timing | 2-day settlement, same as card payments |
| Connect support | Yes |
| Refunds / partial refunds | Yes / Yes |
| Disputes | Yes |
| Manual capture | Yes |

Test institutions: Success, Disputed, Blocked, Bank (Non-OAuth), Bank (OAuth); failures: Down (Scheduled), Down (Unscheduled), Down (Error). For Non-OAuth, enter `options`, `mfa`, `confirm_mfa`, or `security_question` in the password or a later field to exercise login prompts; `error` ends the session and `incorrect` allows a retry.

## Notes

- Supported integrations: Checkout, Payment Links, hosted invoice page, Payment Element, Mobile Payment Element.
- Eligibility: US business with a history of Stripe usage (among other onboarding criteria); transactions below a dynamically set amount (default: only under 7500 USD); not shown if ACH Direct Debit is enabled for the transaction.
- ACH Direct Debit takes precedence. With dynamic payment methods, Link does not present Instant Bank Payments for any transaction eligible for ACH Direct Debit unless you restrict ACH eligibility with a payment method rule. Stripe recommends ACH Direct Debit for businesses that do not immediately fulfill goods and services and can wait up to 4 business days to confirm a payment.
- Settlement: Stripe guarantees authorized payments settle unless the customer initiates a dispute with their bank. Bank-initiated ACH returns do not debit your balance; customer-initiated disputes debit the payment amount and dispute fee, and are answered via the same Dashboard process as cardholder disputes.
- After the first authenticated transaction through Link, the saved bank account can be charged off-session without re-authentication.
- Stripe-funded incentives (cash back, promotional credits) are available in the US only; Stripe charges the full amount and deposits the promotion to the customer's bank within seven business days at no cost to you. Configure cash back display in Link settings.
- Not the same as ACH Direct Debit (`us_bank_account`): Instant Bank Payments confirm instantly and are protected from common ACH failures.
- Migration (dahlia → endive): the official page still lists `payment_method_types` for Checkout Session; it was removed from Checkout Session create in 2026-09-30.endive (use `allowed_payment_method_types`), and PaymentIntent / SetupIntent `payment_method_types` is no longer writable on endive.
- Source: https://docs.stripe.com/payments/link/instant-bank-payments (retrieved 2026-10).

## Related

- [Link in Payment Integrations](./link-payment-integrations.md)
- [Link with Checkout](./link-checkout.md)
- [Link in the Payment Element](./link-payment-element.md)
