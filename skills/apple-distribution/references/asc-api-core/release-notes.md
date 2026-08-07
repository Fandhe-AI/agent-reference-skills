# App Store Connect API Release Notes

Learn about new features, deprecations, and breaking changes across App Store Connect API versions (1.0 through 4.4.1 as of this writing).

## Signature / Usage

```
GET https://developer.apple.com/documentation/appstoreconnectapi/app-store-connect-api-release-notes
```

## Options / Props

### Latest Version Highlights (4.4.1)

| Area | Change |
|------|--------|
| In-App Purchase Versioning | `POST /v1/inAppPurchaseVersions`, `GET /v1/inAppPurchaseVersions/{id}`, `GET /v2/inAppPurchases/{id}/versions` |
| Subscription Versioning | `POST /v1/subscriptionVersions`, `GET /v1/subscriptionVersions/{id}`, `GET /v1/subscriptions/{id}/versions` |
| Subscription Group Versioning | `POST /v1/subscriptionGroupVersions`, `GET /v1/subscriptionGroupVersions/{id}`, `GET /v1/subscriptionGroups/{id}/versions` |
| App Review Submission | `POST /v1/reviewSubmissionItems` referencing `inAppPurchaseVersion` / `subscriptionVersion` / `subscriptionGroupVersion` |
| Subscription Price Points | `GET /v1/subscriptionPricePoints/{id}/adjustedEqualizations`, filterable by `filter[upfrontPricePointId]` / `filter[planType]` |
| Age Rating Declarations | Added `socialMedia` / `socialMediaAgeRestricted` boolean attributes |

### Deprecated in 4.4.1

| Deprecated Resource | Replacement |
|------|-------------|
| `in-app-purchase-localizations-v1` | v2 endpoint scoped to `InAppPurchaseVersion` |
| `in-app-purchase-images-v1` | v2 endpoint scoped to `InAppPurchaseVersion` |
| `in-app-purchase-submissions` | `review-submissions` |
| `subscription-localizations-v1` | v2 endpoint scoped to `SubscriptionVersion` |
| `subscription-images-v1` | v2 endpoint scoped to `SubscriptionVersion` |
| `subscription-group-localizations-v1` | v2 endpoint scoped to `SubscriptionGroupVersion` |
| `subscription-and-subscription-group-submissions` | `review-submissions` |

## Notes

- Each version's release notes page recommends updating server-side code to use new features and re-testing against API changes
- The full OpenAPI specification for the current API version is downloadable from the release notes page
- Individual version pages (e.g. App Store Connect API 4.4, 4.3.1, 3.0, 1.0) are not mirrored here; consult `developer.apple.com/documentation/appstoreconnectapi/app-store-connect-api-<version>-release-notes` for a specific version's changelog

## Related

- [App Store Versions](./app-store-versions.md)
- [Error Handling](./error-handling.md)
- [Uploading Assets to App Store Connect](./uploading-assets.md)
