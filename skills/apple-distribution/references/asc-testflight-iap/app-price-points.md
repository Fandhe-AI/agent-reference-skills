# App Price Points

Available price tiers and territory-specific customer prices and proceeds for apps and in-app purchases.

## Signature / Usage

```
GET /v3/appPricePoints/{id}
GET /v3/appPricePoints/{id}/equalizations
GET /v1/apps/{id}/appPricePoints
GET /v2/inAppPurchases/{id}/pricePoints
GET /v1/inAppPurchasePricePoints/{id}/equalizations
```

## Options / Props

### App Price Points (v3)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v3/appPricePoints/{id}` | Read details about a specific app price point |
| GET | `/v3/appPricePoints/{id}/equalizations` | List equivalent app price points across territories |
| GET | `/v1/apps/{id}/appPricePoints` | List all available price points for an app |

**Query parameters for `GET /v1/apps/{id}/appPricePoints`:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `filter[territory]` | [string] | Filter by territory codes (e.g. `USA`, `CAN`) |
| `include` | [string] | `app`, `territory` |
| `fields[appPricePoints]` | [string] | `customerPrice`, `proceeds`, `app`, `equalizations`, `territory` |
| `limit` | integer | Max 200 |

### In-App Purchase Price Points

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v2/inAppPurchases/{id}/pricePoints` | List all price points for an in-app purchase |
| GET | `/v1/inAppPurchasePricePoints/{id}/equalizations` | List all equalizations for an IAP price point |

## Notes

- `customerPrice` is the price displayed to the user; `proceeds` is the amount Apple remits to you.
- Price point IDs are opaque base64-encoded strings combining app, territory, and price tier.
- Use `filter[territory]` to narrow results to specific storefronts.

## Related

- [In-App Purchases](./in-app-purchases.md)
- [Sales and Finance Reports](./sales-finance-reports.md)
