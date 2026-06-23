# Crypto Onramp Sessions

API for creating and managing fiat-to-crypto onramp sessions. Stripe acts as merchant of record, handling KYC, fraud, chargebacks, and regulatory compliance.

## Signature / Usage

```bash
# Create a session (server-side)
curl -X POST https://api.stripe.com/v1/crypto/onramp_sessions \
  -u <<YOUR_SECRET_KEY>>: \
  -d "wallet_addresses[ethereum]"="0xB00F0759DbeeF5E543Cc3E3B07A6442F5f3928a2" \
  -d "source_currency"="usd" \
  -d "destination_currency"="eth" \
  -d "destination_network"="ethereum"
```

## Options / Props

### Session creation parameters

| Name | Type | Description |
|------|------|-------------|
| `wallet_addresses` | object | Destination wallet addresses keyed by network (e.g., `ethereum`, `solana`) |
| `lock_wallet_address` | boolean | Prevent the customer from changing the wallet address |
| `source_currency` | string | Fiat source currency: `usd` or `eur` |
| `source_amount` | string | Fiat amount to spend (mutually exclusive with `destination_amount`) |
| `destination_network` | string | Default blockchain network (e.g., `ethereum`, `solana`, `bitcoin`) |
| `destination_currency` | string | Default cryptocurrency (e.g., `eth`, `usdc`, `btc`) |
| `destination_amount` | string | Crypto amount to purchase (mutually exclusive with `source_amount`) |
| `destination_networks` | array | Restrict available networks |
| `destination_currencies` | array | Restrict available currencies |
| `customer_ip_address` | string | Customer IP for pre-validation fraud check |
| `customer_information` | object | Pre-fill fields: `email`, `first_name`, `last_name`, `dob`, `address` |

### Session object fields

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Session ID (prefix `cos_`) |
| `client_secret` | string | Authenticates the client-side widget; keep confidential |
| `status` | string | Current session state (see below) |
| `redirect_url` | string | Stripe-hosted URL for redirect integration |
| `transaction_details` | object | Currencies, networks, amounts, and wallet address |
| `livemode` | boolean | `true` in live mode |

### Status values

| Status | Description |
|--------|-------------|
| `initialized` | Session created; customer has not started |
| `requires_payment` | Customer registered and ready to pay |
| `fulfillment_processing` | Payment complete; crypto delivery pending |
| `fulfillment_complete` | Crypto successfully delivered to wallet |
| `rejected` | KYC failed or compliance screening blocked the session |

## Notes

- `source_amount` and `destination_amount` are mutually exclusive — set one or neither
- `client_secret` contains wallet addresses and private data; never expose it in URLs or logs
- Use TLS on all pages that handle the `client_secret`
- Pass `customer_ip_address` to enable pre-session fraud screening before the widget loads
- `SSN` cannot be pre-filled via `customer_information`
- Webhooks fire `crypto.onramp_session.updated` on every status change
- Application approval (submitted via Dashboard) is required before going live; sandbox is available immediately

## Integration methods

### Embedded widget (JavaScript)

```javascript
const stripeOnramp = StripeOnramp("<<YOUR_PUBLISHABLE_KEY>>");

const onrampSession = stripeOnramp.createSession({
  clientSecret: "cos_..._secret_...",
  appearance: { theme: "dark" },
});

onrampSession.mount("#onramp-element");

onrampSession.addEventListener("onramp_session_updated", (event) => {
  if (event.payload.session.status === "fulfillment_complete") {
    console.log("Purchase complete");
  }
});
```

### Stripe-hosted redirect

```javascript
// Frontend-only, no API key required
const standaloneOnramp = window.StripeOnramp.Standalone({
  source_currency: "usd",
  amount: { source_amount: "100" },
  destination_networks: ["ethereum"],
  destination_currencies: ["usdc"],
});
window.location.href = standaloneOnramp.getUrl();
```

### Conversion quotes (no session required)

```bash
curl -G https://api.stripe.com/v1/crypto/onramp/quotes \
  -u <<YOUR_SECRET_KEY>>: \
  -d "source_amount"="200" \
  -d "destination_currencies[]"="eth" \
  -d "destination_networks[]"="ethereum"
```

## Supported currencies & networks

| Currency | Networks |
|----------|---------|
| ETH | ethereum |
| BTC | bitcoin |
| SOL | solana |
| USDC | ethereum, solana, polygon, avalanche, base, stellar |
| MATIC / POL | polygon |
| AVAX | avalanche |
| XLM | stellar |

## Sandbox test values

| Screen | Value |
|--------|-------|
| OTP | `000000` |
| SSN | `000000000` |
| Address line 1 | `address_full_match` |
| Card | `4242 4242 4242 4242` |

## Related

- [Crypto Onramp overview](./onramp-overview.md)
