# Stablecoin Payments

Accept stablecoins (USDC and others) from customers worldwide; completed payments settle in your Stripe balance in your local currency. Customers choose their stablecoin, wallet, and network on crypto.stripe.com.

## Signature / Usage

Enable the payment method in the Dashboard, then Stripe shows it automatically in Checkout, Elements, Payment Links, and Invoicing. For Connect accounts without full Dashboard access, check the capability:

```text
Account.capabilities.crypto_payments == "active"
```

## Options / Props

| Property | Value |
|----------|-------|
| Customer locations | Global (excludes sanctioned countries) |
| Presentment currency | USD (other currencies in private preview) |
| Accepted tokens | USDC (Tempo, Ethereum, Solana, Polygon, Base), USDP (Ethereum and Solana, US-only), USDG (Ethereum, US-only) |
| Payment confirmation | Customer-authenticated |
| Recurring payments | Yes (Stripe Billing: invoices and subscriptions) |
| Refunds / Partial refunds | Yes / Yes |
| Dispute support | No |
| Manual capture | Not supported |
| Connect support | Yes (all charge types; `crypto_payments` capability) |
| Payout timing | Varies by network |
| Product support | Connect, Checkout, Elements, Billing |

## Notes

- Payment flow: customer selects Crypto at checkout, Stripe redirects to crypto.stripe.com to select currency/network and connect a wallet, the customer is notified of completion, then optionally redirected back to your site.
- Business locations: US; private preview for businesses in the EU, Hong Kong, Mexico, and Switzerland (listed countries include AT, BE, BG, CH, CY, CZ, DE, DK, EE, ES, FI, FR, GI, GR, HK, HR, HU, IE, IT, LI, LT, LU, LV, MT, MX, NL, NO, PL, PT, RO, SE, SI).
- Limitations: payments settle in your local currency; refunds are always returned as stablecoins to the customer's original wallet; customer limit is 10,000 USD per transaction.
- Disputes: the customer authenticates the payment, so chargebacks that withdraw funds from your account do not occur.
- Connect: each connected account must have the crypto payment method enabled.
- This is the stablecoin payment method (Payment Intents / Checkout). The fiat-to-crypto onramp is a separate product; see the onramp pages.
- Source: https://docs.stripe.com/payments/stablecoin-payments (retrieved 2026-10).

## Related

- [Accept Stablecoin Payments](./accept-stablecoin-payments.md)
- [Crypto Onramp Sessions](./onramp-sessions.md)
