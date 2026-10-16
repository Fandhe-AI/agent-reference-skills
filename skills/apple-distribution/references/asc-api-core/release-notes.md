# App Store Connect API Release Notes

Learn about new features, deprecations, and breaking changes across App Store Connect API versions (1.0 through 4.5.1 as of this writing).

## Signature / Usage

```
GET https://developer.apple.com/documentation/appstoreconnectapi/app-store-connect-api-release-notes
```

## Options / Props

### Latest Version Highlights (4.5.1)

| Area | Change |
|------|--------|
| App Asset Library (upload) | `POST /v1/appAssetLibraryImages`, `POST /v1/appAssetLibraryVideos` |
| App Asset Library (read) | `GET /v1/apps/{id}/assetLibrary`, `GET /v1/appAssetLibraries/{id}/images`, `GET /v1/appAssetLibraries/{id}/videos` |
| App Asset Library placements | `POST /v1/appAssetLibraryPlacements`, `POST /v1/appAssetLibraryPlacementOrderingRequests` |
| Placements relationships | `GET /v1/appStoreVersionLocalizations/{id}/placements`, `GET /v1/appCustomProductPageLocalizations/{id}/placements`, `GET /v1/appEventLocalizations/{id}/placements`, `GET /v1/appStoreVersionExperimentTreatmentLocalizations/{id}/placements` |
| Asset specifications | `GET /v1/appAssetLibraryRefData` (supported placement types, dimensions, and limits) |
| iPhone Duo | New `IPHONE_DUO` display class in `AppAssetLibraryDisplayClass`; read its placement groups and screen dimensions via `GET /v1/appAssetLibraryRefData` |

### Deprecated in 4.5.1

| Deprecated Resource | Replacement |
|------|-------------|
| `app-screenshot-sets`, `app-screenshots`, `app-preview-sets`, `app-previews` | App Asset Library images / videos / placements (App Store version, custom product page, and experiment treatment media) |
| `app-event-screenshots`, `app-event-video-clips` | App Asset Library images / videos / placements (in-app event media) |

### 4.5 Highlights

| Area | Change |
|------|--------|
| App Performance | `GET /v1/apps/{id}/performanceOverviews` (aggregated performance overview data, including the metrics Xcode surfaces in its performance reports) |
| Multi-seat Subscriptions | `marketSettings` and `multiSeatStatus` attributes on `Subscription` (App Store, Apple School Manager, or Apple Business Manager markets; multiple seats) |
| Game Center Moderation | `GET /v2/gameCenterLeaderboards/{id}/gameCenterScoreModerations`, `PATCH /v1/gameCenterScoreModerations/{id}`, `GET /v1/gameCenterDetails/{id}/blockedPlayers`, `PATCH /v1/gameCenterDetailPlayers/{id}` |
| Age Rating Declarations | `koreaAgeRatingOverride` gained `ALL` and `TWELVE_PLUS` values |

### Deprecated in 4.5

- The `territories` relationship on app tags, `GET /v1/appTags/{id}/territories` (List Territories for an App Tag), and `GET /v1/appTags/{id}/relationships/territories` (List territory IDs for an app tag) are deprecated.
- On `GET /v1/apps/{id}/appTags` (List App Tags), the `include`, `fields[appTags]`, `fields[territories]`, and `limit[territories]` parameters no longer accept `territories` values.

### Previous Version Highlights (4.4.1)

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

- To move an existing integration from the deprecated 4.5.1 media resources, see the "Migrating to the App Asset Library" article.
- Each version's release notes page recommends updating server-side code to use new features and re-testing against API changes
- The full OpenAPI specification for the current API version is downloadable from the release notes page
- Individual version pages (e.g. App Store Connect API 4.4, 4.3.1, 3.0, 1.0; 4.5.1 / 4.5 / 4.4.1 are summarized above) are not mirrored here; consult https://developer.apple.com/documentation/appstoreconnectapi/app-store-connect-api-release-notes (per-version pages follow the `app-store-connect-api-<version>-release-notes` slug pattern, e.g. https://developer.apple.com/documentation/appstoreconnectapi/app-store-connect-api-4-5-1-release-notes) for a specific version's changelog

## Related

- [App Store Versions](./app-store-versions.md)
- [Error Handling](./error-handling.md)
- [Uploading Assets to App Store Connect](./uploading-assets.md)
