# Connected Account Configuration (Accounts v2)

Configure funds flows, loss liability, Dashboard access, and KYC responsibility of connected accounts by setting properties when creating Accounts v2 objects.

## Signature / Usage

```bash
curl -X POST https://api.stripe.com/v2/core/accounts \
  -H "Authorization: Bearer <<YOUR_SECRET_KEY>>" \
  -H "Stripe-Version: 2026-09-30.preview" \
  --json '{
    "dashboard": "express",
    "configuration": { "merchant": { "capabilities": { "card_payments": { "requested": true } } } },
    "defaults": {
      "responsibilities": {
        "fees_collector": "application",
        "losses_collector": "application"
      }
    }
  }'
```

(Illustrative combination assembled from the properties below; the source page documents them in tables, not as a single example.)

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `defaults.responsibilities.fees_collector` | enum | How Stripe collects payment fees for direct charges. `application`: platform collects application fees, Stripe collects payment fees from the platform. `stripe`: Stripe collects payment fees directly from the connected account. (For destination or separate charges, Stripe always collects fees from the platform.) |
| `defaults.responsibilities.losses_collector` | enum | Responsibility for negative balances. `application`: platform is responsible and manages risk. `stripe`: Stripe is liable for the connected account's negative balances (platform still liable for its own platform account). |
| `defaults.responsibilities.requirements_collector` | enum | `stripe` or `application`. Read-only: calculated from `losses_collector` and `dashboard`; cannot be set. |
| `dashboard` | enum | `express`: limited Stripe Express Dashboard, brandable. `full`: full Stripe Dashboard. `none`: no Dashboard access; platform provides all Stripe-related functionality. |

Accounts v1 controller property map:

| Accounts v1 Property | Accounts v2 Property |
|------|------|
| `controller.fees.payer` | `defaults.responsibilities.fees_collector` |
| `controller.losses.payments` | `defaults.responsibilities.losses_collector` |
| `controller.requirement_collection` | `defaults.responsibilities.requirements_collector` (auto-calculated, not settable) |
| `controller.stripe_dashboard.type` | `dashboard` |

## Notes

- `defaults.responsibilities` must be defined when adding the Merchant configuration to an account and cannot be updated later.
- `dashboard` must be set (if its existing value is null) when adding the Merchant configuration, and when requesting the `stripe_transfers` feature for the Recipient configuration.
- Restrictions: if `losses_collector` is `application`, `fees_collector` must also be `application`. For destination charges, Stripe recommends setting both to `application`.
- Regardless of the `dashboard` setting, the platform can use Connect embedded components to offer similar functionality in a custom interface.
- KYC: Stripe collects requirements in most configurations. The platform is responsible only when `losses_collector` is `application` and `dashboard` is `none`. Take this on only if prepared to handle the operational complexity of verification and requirement updates.
- Application fee behavior for direct charges: if the fee collector is `stripe` (v2) or fee payer is `account` (v1), Stripe deducts its processing fee and the application fee, then pays the platform; set the application fee to include only the platform fee. If the fee collector is `application`, set the application fee to include both the platform fee and the Stripe processing fee (e.g. processing 1.00 + platform 1.50: application fee 1.50 when Stripe collects, 2.50 when the platform collects).
- Changing the pricing model or fee collector configuration can cause connected accounts to be charged too much or too little; review application fees and pricing model before changing responsibilities.
- Source: https://docs.stripe.com/connect/accounts-v2/connected-account-configuration (retrieved 2026-10).

## Related

- [accounts-v2.md](./accounts-v2.md)
- [accounts.md](./accounts.md)
- [charge-types.md](./charge-types.md)
