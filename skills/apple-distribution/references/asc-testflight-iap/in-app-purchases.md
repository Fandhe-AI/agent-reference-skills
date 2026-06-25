# In-App Purchases (v2)

Create and manage consumable, non-consumable, and non-renewing subscription in-app purchases.

## Signature / Usage

```
POST   /v2/inAppPurchases
GET    /v2/inAppPurchases/{id}
PATCH  /v2/inAppPurchases/{id}
DELETE /v2/inAppPurchases/{id}
GET    /v1/apps/{id}/inAppPurchasesV2
```

## Options / Props

### Core CRUD

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v2/inAppPurchases` | Create an in-app purchase |
| GET | `/v2/inAppPurchases/{id}` | Read in-app purchase information |
| PATCH | `/v2/inAppPurchases/{id}` | Modify an in-app purchase (e.g. update reference name) |
| DELETE | `/v2/inAppPurchases/{id}` | Delete an in-app purchase |
| GET | `/v1/apps/{id}/inAppPurchasesV2` | List all in-app purchases for an app |

### Related Resources

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v2/inAppPurchases/{id}/inAppPurchaseLocalizations` | List localizations for an in-app purchase |
| GET | `/v2/inAppPurchases/{id}/pricePoints` | List all price points |
| GET | `/v2/inAppPurchases/{id}/relationships/pricePoints` | List price point IDs |
| GET | `/v2/inAppPurchases/{id}/iapPriceSchedule` | Read the price schedule |
| GET | `/v2/inAppPurchases/{id}/inAppPurchaseAvailability` | Read territory availability |
| GET | `/v2/inAppPurchases/{id}/promotedPurchase` | Read promoted purchase information |
| GET | `/v2/inAppPurchases/{id}/appStoreReviewScreenshot` | Read review screenshot information |
| GET | `/v2/inAppPurchases/{id}/images` | List in-app purchase images |
| GET | `/v2/inAppPurchases/{id}/offerCodes` | Get offer codes |
| GET | `/v2/inAppPurchases/{id}/content` | Read hosted content information |

### Submission

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/inAppPurchaseSubmissions` | Create a review submission for an in-app purchase |

### Price Point Equalizations

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/inAppPurchasePricePoints/{id}/equalizations` | List price point equalizations across territories |

## Notes

- Use v2 endpoints (`/v2/inAppPurchases`) for all new integrations; v1 endpoints are deprecated.
- `inAppPurchaseType` values: `CONSUMABLE`, `NON_CONSUMABLE`, `NON_RENEWING_SUBSCRIPTION`.
- Submit via `POST /v1/inAppPurchaseSubmissions` to trigger App Review.

## Related

- [Subscriptions](./subscriptions.md)
- [App Price Points](./app-price-points.md)
