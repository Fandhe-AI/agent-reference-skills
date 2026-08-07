# Sandbox Testers

Manage sandbox Apple IDs used to test in-app purchases and subscriptions in the Xcode sandbox environment.

## Signature / Usage

```bash
# List sandbox testers
GET https://api.appstoreconnect.apple.com/v2/sandboxTesters

# Modify a sandbox tester
PATCH https://api.appstoreconnect.apple.com/v2/sandboxTesters/{id}

# Clear purchase history for a sandbox tester
POST https://api.appstoreconnect.apple.com/v2/sandboxTestersClearPurchaseHistoryRequest
```

## Options / Props

### `SandboxTesterV2.Attributes`

| Field | Type | Description |
|-------|------|-------------|
| `acAccountName` | string | Apple ID account name |
| `firstName` | string | Tester's first name |
| `lastName` | string | Tester's last name |
| `territory` | `TerritoryCode` | App Store territory code for the tester |
| `applePayCompatible` | boolean | Whether the tester supports Apple Pay |
| `interruptPurchases` | boolean | Whether purchases should be interrupted (for testing failure flows) |
| `subscriptionRenewalRate` | string | Accelerated renewal rate for testing subscriptions (see allowed values) |

### `subscriptionRenewalRate` Allowed Values

| Value | Description |
|-------|-------------|
| `MONTHLY_RENEWAL_EVERY_ONE_HOUR` | Renew every hour |
| `MONTHLY_RENEWAL_EVERY_THIRTY_MINUTES` | Renew every 30 minutes |
| `MONTHLY_RENEWAL_EVERY_FIFTEEN_MINUTES` | Renew every 15 minutes |
| `MONTHLY_RENEWAL_EVERY_FIVE_MINUTES` | Renew every 5 minutes |
| `MONTHLY_RENEWAL_EVERY_THREE_MINUTES` | Renew every 3 minutes |

### Query Parameters — `GET /v2/sandboxTesters`

| Parameter | Description |
|-----------|-------------|
| `fields[sandboxTesters]` | Fields to return (`firstName`, `lastName`, `acAccountName`, `territory`, `applePayCompatible`, `interruptPurchases`, `subscriptionRenewalRate`) |
| `limit` | Max per page (max: 200, default: 50) |

## Notes

- This resource uses API version `v2` (`/v2/sandboxTesters`), unlike most other App Store Connect API resources which are on `v1`.
- Requires a Team API key; individual keys cannot manage sandbox testers.
- Changes made via the API can take up to 1 hour to appear in the sandbox environment.

## Related

- [User Invitations](./user-invitations.md)
- [In-App Purchases](../asc-testflight-iap/in-app-purchases.md)
