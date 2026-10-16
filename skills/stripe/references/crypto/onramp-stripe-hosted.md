# Stripe-Hosted Onramp

Redirect users to the standalone onramp hosted at crypto.link.com, either via a frontend-generated redirect URL or a backend-minted session with a `redirect_url`.

## Signature / Usage

```html
<head>
  <title>Onramp</title>
  <script src="https://js.stripe.com/endive/stripe.js"></script>
  <script src="https://crypto-js.stripe.com/crypto-onramp-outer.js"></script>
</head>
```

```js
const standaloneOnramp = window.StripeOnramp.Standalone({
  source_currency: 'usd',
  amount: {source_amount: '42'},
  destination_networks: ['ethereum', 'bitcoin'],
  destination_currencies: ['eth', 'btc'],
  destination_currency: 'btc',
  destination_network: 'bitcoin'
});
const redirectUrl = standaloneOnramp.getUrl();
```

Mint a session with a `redirect_url` (backend):

```bash
curl -X POST https://api.stripe.com/v1/crypto/onramp_sessions \
  -u "<<YOUR_SECRET_KEY>>:"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `source_currency` | string | Fiat currency (`usd`, `eur`) |
| `amount` | object | Fixed amount: `{source_amount: 42}` or `{destination_amount: 42}`; only one |
| `destination_currencies` | array | Restrict cryptocurrencies, e.g. `['eth', 'usdc']` |
| `destination_networks` | array | Restrict networks, e.g. `['ethereum', 'polygon']` |
| `destination_network` | string | Default network, e.g. `ethereum` |
| `destination_currency` | string | Default cryptocurrency, e.g. `eth` |

| Option | Overview | Best for |
|--------|----------|----------|
| Generate a redirect URL | Frontend, no Stripe account; customize suggested amount, currency, network | Lightweight integration, light customization, no branding |
| Mint a session with a redirect URL | Backend with Stripe account; full customization including destination wallet address | Fully customized, branded onramp |

## Notes

- Application approval is required before access, including testing environments: submit the onramp application in the Dashboard (most reviewed within 48 hours), then develop in a sandbox.
- Load `js.stripe.com` and `crypto-js.stripe.com` scripts directly from Stripe domains; do not bundle or self-host (PCI compliance; the integration might break without warning).
- Currencies available in the US and EU (subject to change): ETH (Ethereum, Base), SOL, POL, MATIC, BTC, AVAX, XLM, USDC (Ethereum, Solana, Polygon, Avalanche, Base, Stellar). XLM, USDC (Stellar), USDC (Avalanche), USDC (Polygon) are unavailable in New York. ETH (Base), MATIC, AVAX, USDC (Solana), USDC (Polygon), USDC (Avalanche), USDC (Base) are unsupported in the EU.
- The session response includes `id` (`cos_...`), `client_secret`, `status: "initialized"`, `redirect_url`, and `transaction_details`.
- Source: https://docs.stripe.com/crypto/onramp/stripe-hosted (retrieved 2026-10).

## Related

- [Crypto Onramp Sessions](./onramp-sessions.md)
- [Embedded Onramp](./onramp-embedded.md)
