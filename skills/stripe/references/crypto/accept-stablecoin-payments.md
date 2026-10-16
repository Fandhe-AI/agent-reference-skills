# Accept Stablecoin Payments

Start accepting stablecoins by enabling the Crypto payment method, with dynamic payment methods, Checkout, or a Direct API (Payment Intents) integration.

## Signature / Usage

Direct API: create a PaymentIntent, then confirm with Stripe.js using the `crypto` payment method type.

```javascript
const { error } = await stripe.confirmPayment({
  clientSecret: clientSecret,
  confirmParams: {
    payment_method_data: {
      type: 'crypto',
    },
    return_url: `${window.location.href}`,
  },
});
```

Checkout: enable crypto in the Dashboard and make sure all `line_items` use `usd`.

```bash
curl https://api.stripe.com/v1/checkout/sessions \
  -u <<YOUR_SECRET_KEY>>: \
  -d mode=payment \
  -d "line_items[0][price_data][currency]"=usd \
  -d "line_items[0][price_data][product_data][name]"=T-shirt \
  -d "line_items[0][price_data][unit_amount]"=2000 \
  -d "line_items[0][quantity]"=1 \
  --data-urlencode success_url="https://example.com/success"
```

Create the PaymentIntent (server-side):

```bash
curl https://api.stripe.com/v1/payment_intents \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d amount=1099 \
  -d currency=usd \
  -d "automatic_payment_methods[enabled]=true"
```

Manual redirect (optional): confirm the PaymentIntent with a `return_url`, then redirect to `next_action.redirect_to_url.url` when status is `requires_action`.

```bash
curl https://api.stripe.com/v1/payment_intents/pi_xxx/confirm \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "payment_method=pm_xxx" \
  --data-urlencode "return_url=https://shop.example.com/crtA6B28E1"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `payment_method_data.type` | string | `crypto` for Pay with Crypto |
| `return_url` | string | Where Stripe redirects the customer after payment |
| `payment_intent` (return query) | string | PaymentIntent ID appended to `return_url` |
| `payment_intent_client_secret` (return query) | string | Client secret appended to `return_url` |
| `automatic_tax[enabled]` | boolean | Checkout Session parameter to calculate tax (Stripe Tax) |

## Notes

- Availability: businesses in all US states except New York. Request **Stablecoins and Crypto** under Payment methods in the Dashboard; status shows Pending until Stripe approves.
- With dynamic payment methods (Payment Links, hosted Checkout, Embedded Checkout Forms, Elements), no further changes are needed. If you specify `payment_method_types`, see the dashboard payment methods migration guide.
- Funds settle in your Stripe balance in USD; the default presentment currency is USD.
- Listen for `payment_intent.succeeded` via webhook rather than relying on client callbacks.
- Testing: use sandbox with testnet assets. Stripe recommends MetaMask, Polygon Amoy testnet (chain ID `80002`, currency `POL`), and the Circle faucet (faucet.circle.com, 20 USDC) plus a POL faucet for gas. Testnet transactions can take a few minutes.
- Refund test tokens may use a different contract than the payment token; check the refund `transaction_hash` on a block explorer.
- Stripe Tax uses amount, currency, product details, and customer location regardless of card or stablecoin; no separate configuration. For Elements/Direct API see Stripe Tax with PaymentIntents.
- Source: https://docs.stripe.com/payments/accept-stablecoin-payments (payment-ui=direct-api and payment-ui=checkout variants, retrieved 2026-10).

## Related

- [Stablecoin Payments](./stablecoin-payments.md)
