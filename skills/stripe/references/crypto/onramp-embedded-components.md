# Embedded Components Onramp

Build a native onramp flow in your app or website using the `@stripe/crypto` SDK: Link authentication, KYC, wallet and payment-method collection, then session creation and checkout.

## Signature / Usage

```javascript
import { loadCryptoOnrampAndInitialize } from '@stripe/crypto';

const onramp = await loadCryptoOnrampAndInitialize('pk_test_...', {
  theme: 'stripe',
});
```

Server client (private-preview API version):

```javascript
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: `${Stripe.API_VERSION};crypto_onramp_beta=v2`,
});
```

Checkout step:

```javascript
const result = await onramp.performCheckout(sessionId, async (onrampSessionId) => {
  const { client_secret } = await fetch(`/checkout/${onrampSessionId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }).then(r => r.json());
  return client_secret;
});
```

## Options / Props

Flow overview:

| Stage | Client SDK | Server API |
|-------|-----------|------------|
| Authentication | `registerLinkUser`, `authenticate` | `POST https://login.link.com/v1/link_auth_intent`, `POST .../link_auth_intent/{id}/tokens` |
| Identity | `submitKycInfo`, `verifyDocuments` | `GET /v1/crypto/customers/{customerId}` |
| Wallet | `registerWalletAddress`, `deleteWalletAddress` | `GET /v1/crypto/customers/{customerId}/crypto_consumer_wallets` |
| Payment method | `collectPaymentMethod` | `GET /v1/crypto/customers/{customerId}/payment_tokens` |
| Session | none | `POST /v1/crypto/onramp_sessions` (`ui_mode=headless`) |
| Checkout | `performCheckout` | `POST /v1/crypto/onramp_sessions/{sessionId}/checkout` |

OnrampCoordinator methods:

| Method | Returns | Description |
|--------|---------|-------------|
| `registerLinkUser(email, phone, country, fullName?)` (object form `{email, phone, country, fullName}` in the guide example) | `Promise<RegisterLinkUserResult>` (`created`) | Create a Link account |
| `authenticate(linkAuthIntentId, onCompletion)` | `Promise<HTMLElement \| null>` | OTP consent; result `success` / `abandoned` / `declined`; `crypto_customer_id` on success |
| `submitKycInfo(params)` | `Promise<void>` | Submit `KycInfo` |
| `registerWalletAddress(walletAddress, network)` | `Promise<CryptoConsumerWallet>` | Register a wallet |
| `deleteWalletAddress(walletId)` | `Promise<void>` | Remove a wallet |
| `collectPaymentMethod(options, onCompletion)` | `Promise<HTMLElement>` | Payment Element; callback gives `cryptoPaymentToken`, `paymentMethodDetails` |
| `verifyDocuments()` | `Promise<DocumentVerificationResult>` | Hosted ID document and selfie flow |
| `performCheckout(onrampSessionId, checkout)` | `Promise<CheckoutResult>` (`successful`) | Run checkout, handles 3DS |
| `destroy()` | `void` | Clean up |

`collectPaymentMethod` options: `payment_method_types` (`'card'`, `'us_bank_account'`), `wallets.applePay` / `wallets.googlePay` (`'auto'` | `'never'`).

`KycInfo`: `given_name`, `surname`, `address` (`country` required; `city`, `line1`, `line2`, `postal_code`, `state`, `town`), `id_number` (`type: 'us_ssn'`, `value`), `date_of_birth` (`day`, `month`, `year`), `nationalities`, `birth_country`, `birth_city`.

`CryptoNetwork` values: `solana`, `base`, `ethereum`, `tempo`, `sui`, `arbitrum`, `worldchain`, `polygon`, `celo`.

LinkAuthIntent OAuth scopes:

| Scope | Description |
|-------|-------------|
| `kyc.status:read` | Read the customer's KYC verification status |
| `crypto:ramp` | Add crypto wallets to deposit from the customer's account on their behalf |
| `auth.persist_login:read` | Create authentication tokens for seamless sign-in (Android, iOS, React Native) |

## Notes

- Availability: US excluding New York per the web guide (the overview lists US and EU countries, not New York). The Embedded Components API is in private preview: no API calls succeed until onboarding is complete, including in a sandbox. Onboarding includes feature-gate enrollment, enabling Link as a payment method, and obtaining the OAuth client ID and secret from Stripe. Server-side bindings are only in private-preview SDK releases.
- A Link account is required. Store the access token on your backend and send it as the `Stripe-OAuth-Token` header; do not send OAuth tokens to the client. Access tokens expire in 1 hour; refresh via `POST https://login.link.com/auth/token` with `grant_type=refresh_token`.
- Always call the session checkout endpoint from inside the `performCheckout` callback (it may be invoked more than once, e.g. after 3DS). Calling it directly may appear to succeed in a sandbox, but the transaction is not finalized until `performCheckout` returns success. ACH also needs `mandate_data` with the user's IP address and user agent.
- `destination_network` (singular) pins the network; `destination_networks` (array) must be set when `wallet_address` is set. Pass `source_amount` or `destination_amount`, not both.
- EU: set `payment_method_types` to `['card']` and `source_currency` to `eur`; EU KYC needs extra fields such as `nationalities` and `birth_country`.
- A `crypto_onramp_missing_document_verification` 400 error means an identity challenge is required: submit L1 KYC if the customer is only L0, then `verifyDocuments` for L2, then retry session creation.
- Status progression: `initialized` > `requires_payment` > `fulfillment_processing` > `fulfillment_complete` (or `rejected`). Webhook `crypto.onramp_session.updated` tracks asynchronous fulfillment.
- Sandbox test values: OTP `000000`, KYC name `John Verified`, SSN `000000000`, address line 1 `address_full_match`, state as two-letter code, card `4242 4242 4242 4242`. Use 100 USD or less. Sandbox testnets: USDC on Solana (US), Ethereum (US, EU), Base (US). Live mode requires a physical device for mobile SDKs.
- Fee subsidization (Stripe bills you for the fees) requires embedded components and is mutually exclusive with revenue share.
- Platform SDKs beyond web (React Native, Android, iOS) exist per the overview; only the Web guide was captured here.
- Distinct from the widget-based Embedded onramp (`createSession` / `mount`).
- Sources: https://docs.stripe.com/crypto/onramp/embedded-components (overview) and https://docs.stripe.com/crypto/onramp/embedded-components-integration-guide (platform=web), retrieved 2026-10.

## Related

- [Embedded Onramp](./onramp-embedded.md)
- [Crypto Onramp Sessions](./onramp-sessions.md)
