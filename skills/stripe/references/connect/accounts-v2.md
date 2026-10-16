# Accounts v2 API

Create connected accounts with a unified identity across Stripe. v2 `Account` objects use role-based configurations (`merchant`, `customer`, `recipient`) instead of the fixed shape of v1 `Account`.

## Signature / Usage

```bash
curl -X POST https://api.stripe.com/v2/core/accounts \
  -H "Authorization: Bearer <<YOUR_SECRET_KEY>>" \
  -H "Stripe-Version: 2026-09-30.preview" \
  --json '{
    "contact_email": "jenny.rosen@example.com",
    "display_name": "Jenny Rosen",
    "dashboard": "full",
    "identity": {
        "business_details": {
            "registered_name": "Furever"
        },
        "country": "us",
        "entity_type": "company"
    },
    "configuration": {
        "merchant": {
            "capabilities": {
                "card_payments": {
                    "requested": true
                }
            }
        }
    },
    "defaults": {
        "currency": "usd",
        "responsibilities": {
            "fees_collector": "stripe",
            "losses_collector": "stripe"
        },
        "locales": [
            "en-US"
        ]
    },
    "include": [
        "configuration.merchant",
        "identity",
        "requirements"
    ]
  }'
```

Using Accounts as customers: any request with a `customer` parameter also accepts `customer_account` (ID of a v2 `Account` with the `customer` configuration).

```bash
curl https://api.stripe.com/v1/setup_intents \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d customer_account=acct_123 \
  -d "automatic_payment_methods[enabled]=true" \
  -d confirm=true \
  --data-urlencode "return_url=https://example.com/return" \
  -d usage=off_session
```

## Options / Props

Common configurations:

| Name | Type | Description |
|------|------|-------------|
| `merchant` | configuration | Accept payments from customers. Includes `card_payments` and `stripe_balance.payouts` (replacing v1 `payouts`) capabilities |
| `customer` | configuration | Lets your platform charge an `Account` as a customer; usable instead of a `Customer` object for subscriptions or invoices |
| `recipient` | configuration | Receive funds transfers. Includes `stripe_balance.stripe_transfers` (replacing v1 `transfers`), required for indirect charges |

## Notes

- v2 `Accounts` provide flexible configurations (each capability belongs to a configuration), centralized identity data (adding a configuration does not re-collect existing requirements), and a single API for connected accounts and customers (Customers API not needed in most cases).
- By default, Accounts v2 calls return values for certain properties and null for others regardless of actual values; request more with the `include` parameter. Specifying `requirements` in `include` returns default requirements for a new `Account`.
- Some features do not yet directly support v2 `Accounts`. Passing a v2 `Account` ID to an Accounts v1 endpoint returns a v1-structured `Account`, but updates still apply to the v2 object.
- With Accounts v1 you cannot pass an `Account` ID where a `Customer` ID is expected; charging connected accounts with subscriptions requires separate `Customer` objects.
- Existing platforms can use the v2 API to manage Accounts created with v1 (including assigning the `customer` configuration). Stripe discourages maintaining both versions indefinitely.
- Use Accounts v1 for: OAuth authentication of connected accounts; signing accounts to a recipient service agreement; requesting or managing `treasury`, `card_issuing_*`, deprecated capabilities (e.g. `legacy_payments`), deprecated payment methods, and certain payment methods in public or private preview.
- Use Global payouts for cross-border payouts.

## Related

- [connected-account-configuration.md](./connected-account-configuration.md)
- [accounts.md](./accounts.md)
- [account-links.md](./account-links.md)
