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
| GET | `/v2/inAppPurchases/{id}/inAppPurchaseLocalizations` | List localizations for an in-app purchase (deprecated in 4.4.1) |
| GET | `/v2/inAppPurchases/{id}/pricePoints` | List all price points |
| GET | `/v2/inAppPurchases/{id}/relationships/pricePoints` | List price point IDs |
| GET | `/v2/inAppPurchases/{id}/iapPriceSchedule` | Read the price schedule |
| GET | `/v2/inAppPurchases/{id}/inAppPurchaseAvailability` | Read territory availability |
| GET | `/v2/inAppPurchases/{id}/promotedPurchase` | Read promoted purchase information |
| GET | `/v2/inAppPurchases/{id}/appStoreReviewScreenshot` | Read review screenshot information |
| GET | `/v2/inAppPurchases/{id}/images` | List in-app purchase images (deprecated in 4.4.1) |
| GET | `/v2/inAppPurchases/{id}/offerCodes` | Get offer codes |
| GET | `/v2/inAppPurchases/{id}/content` | Read hosted content information |

### Versions (4.4.1)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/inAppPurchaseVersions` | Create an in-app purchase version |
| GET | `/v1/inAppPurchaseVersions/{id}` | Read an in-app purchase version |
| GET | `/v1/inAppPurchaseVersions/{id}/image` | Read the image of a version |
| GET | `/v1/inAppPurchaseVersions/{id}/images` | List the images of a version |
| GET | `/v1/inAppPurchaseVersions/{id}/localizations` | List the localizations of a version |
| GET | `/v2/inAppPurchases/{id}/versions` | List the versions of an in-app purchase |

### Submission

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/inAppPurchaseSubmissions` | Create a review submission for an in-app purchase (deprecated in 4.4.1; use review-submissions) |

### Price Point Equalizations

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/inAppPurchasePricePoints/{id}/equalizations` | List price point equalizations across territories |

## Notes

- Use v2 endpoints (`/v2/inAppPurchases`) for all new integrations; v1 endpoints are deprecated.
- `inAppPurchaseType` values: `CONSUMABLE`, `NON_CONSUMABLE`, `NON_RENEWING_SUBSCRIPTION`.
- `POST /v1/inAppPurchaseSubmissions` is deprecated (4.4.1). Submit via `POST /v1/reviewSubmissionItems` that references an `inAppPurchaseVersion`: create a review submission for the app, add the version as an item, then mark the submission as submitted (three-step review-submissions flow).
- From 4.4.1, localizations and review images attach to a version (a draft container that groups the reviewable metadata and images) rather than directly to the in-app purchase. The pre-4.4.1 endpoints remain available for existing integrations; new work uses the version-based path. See the official article "Migrating In-App Purchase metadata to v2".

## Related

- [Subscriptions](./subscriptions.md)
- [App Price Points](./app-price-points.md)
