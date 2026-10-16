# Embedded Onramp

Embed the Stripe onramp widget in your site: mint a session on the server, mount the UI on the client, and handle events, quotes, errors, and webhooks.

## Signature / Usage

```bash
npm install @stripe/stripe-js @stripe/crypto
```

```javascript
import {loadStripeOnramp} from '@stripe/crypto';

const stripeOnramp = await loadStripeOnramp('<<YOUR_PUBLISHABLE_KEY>>');
const onrampSession = stripeOnramp.createSession({
  clientSecret,
  appearance: {theme: 'dark'},
});
onrampSession.mount('#onramp-element');
```

Server-side session creation (one session per customer):

```bash
curl -X POST https://api.stripe.com/v1/crypto/onramp_sessions \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "wallet_addresses[ethereum]"="0xB00F0759DbeeF5E543Cc3E3B07A6442F5f3928a2"
```

Conversion quotes:

```bash
curl -G https://api.stripe.com/v1/crypto/onramp/quotes \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "source_amount"="200" \
  -d "destination_currencies[]"="usdc" \
  -d "destination_networks[]"="ethereum"
```

## Options / Props

Session states:

| Status | Description |
|--------|-------------|
| `initialized` | Minted; customer has not used it yet |
| `rejected` | KYC failure, sanctions screening, or fraud checks |
| `requires_payment` | Onboarded; at the payment page (stays here if payment fails) |
| `fulfillment_processing` | Payment succeeded; crypto not yet delivered |
| `fulfillment_complete` | Crypto delivery confirmed |

Quotes parameters (`GET /v1/crypto/onramp/quotes`):

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `source_currency` | string | `usd` | ISO-4217; only `usd` and `eur` |
| `source_amount` | string | `100.00` | Mutually exclusive with `destination_amount` |
| `destination_amount` | string | `null` | Requires a single `destination_currencies` and a single `destination_networks` value |
| `destination_currencies` | array | `null` | `btc`, `eth`, `sol`, `matic`, `usdc`, `xlm`; null = all supported |
| `destination_networks` | array | `null` | `bitcoin`, `ethereum`, `solana`, `polygon`, `stellar`; null = all |

Frontend events (`addEventListener` / `removeEventListener`; `'*'` matches all): `onramp_ui_loaded`, `onramp_session_updated`, and for modal overlay mode `onramp_ui_modal_opened`, `onramp_ui_modal_closed`; each has `payload: {session}`.

Pre-populate parameters: `wallet_addresses`, `lock_wallet_address`, `source_currency`, `source_amount`, `destination_network`, `destination_currency`, `destination_amount`, `destination_currencies`, `destination_networks`, `customer_ip_address`, and `customer_information` (`email`, `first_name`, `last_name`, `dob.{year,month,day}`, `address.{country,line1,line2,city,state,postal_code}`).

Common validation errors (HTTP 400):

| Error code | Condition |
|------------|-----------|
| `crypto_onramp_disabled` | Session minting disabled because of an incident |
| `crypto_onramp_unsupported_country` / `crypto_onramp_unsupportable_customer` | Customer unsupported based on `customer_ip_address` |
| `crypto_onramp_invalid_source_destination_pair` | Both `source_amount` and `destination_amount` set |
| `crypto_onramp_incomplete_destination_currency_and_network_pair` | Only one of `destination_currency` / `destination_network` set |
| `crypto_onramp_invalid_destination_currency_and_network_pair` | Invalid currency/network combination |
| `crypto_onramp_missing_source_currency` | `source_amount` without `source_currency` |
| `crypto_onramp_missing_destination_currency` | `destination_amount` without `destination_currency` |
| `crypto_onramp_no_wallet_address_to_lock` | `lock_wallet_address` true without `wallet_addresses` |
| `crypto_onramp_merchant_not_properly_setup` | `business_name` or `business_url` not set in the Dashboard |

## Notes

- Embedded onramp is only available in the EU and the US (excluding Hawaii). The Onramp API is in public preview; submit the onramp application first. Official server libraries do not cover the endpoints, so examples use curl.
- Load `js.stripe.com` and `crypto-js.stripe.com` scripts directly from Stripe; do not bundle or self-host (PCI compliance). `@stripe/crypto` wraps the global `StripeOnramp` as an ES module.
- Dark mode: pass `appearance: {theme: 'dark'}` to `createSession` or call `onrampSession.setAppearance({theme})`; default is light. Branding uses Checkout branding settings.
- The session creation endpoint returns errors if Stripe cannot create sessions; render the onramp only on HTTP 200 and provide a fallback UI. Pass `customer_ip_address` to pre-check supportability.
- `SSN` cannot be pre-filled. If `customer_information.dob` is provided, `year`, `month`, and `day` are all required.
- `client_secret` exposes wallet addresses: do not log it, embed it in URLs, or expose it beyond the customer; use TLS.
- Mobile web view: the official example hosts a route such as `/onramp/<client_secret>` and reads `client_secret` from the URL, which conflicts with the guidance above not to embed it in URLs (it can remain in access logs and browser history); prefer delivering it to the page without putting it in the URL. Listen to `onramp_session_updated`, and on `fulfillment_complete` or `rejected` redirect to the app via universal link.
- Webhook `crypto.onramp_session.updated` fires on every status change after creation (not on creation).
- Sandbox values: OTP `000000`, SSN `000000000`, address line 1 `address_full_match`, card `4242424242424242`. Sandbox amounts are overridden by preset limits.
- Quotes are informational; if a quote expires, the widget may show a slightly different quote. Fees are added on top of `source_amount` (`source_total_amount` includes fees).
- Source: https://docs.stripe.com/crypto/onramp/embedded (retrieved 2026-10).

## Related

- [Crypto Onramp Sessions](./onramp-sessions.md)
- [Stripe-Hosted Onramp](./onramp-stripe-hosted.md)
- [Embedded Components Onramp](./onramp-embedded-components.md)
