# Review Submissions and Items

Create and manage submissions to App Review (`reviewSubmissions`) that group items for review: an App Store version, version experiments, custom product page versions, in-app events, and other reviewable versions (`reviewSubmissionItems`).

## Signature / Usage

```
POST   https://api.appstoreconnect.apple.com/v1/reviewSubmissions
GET    https://api.appstoreconnect.apple.com/v1/reviewSubmissions?filter[app]={appId}
GET    https://api.appstoreconnect.apple.com/v1/reviewSubmissions/{id}
PATCH  https://api.appstoreconnect.apple.com/v1/reviewSubmissions/{id}
GET    https://api.appstoreconnect.apple.com/v1/reviewSubmissions/{id}/items
GET    https://api.appstoreconnect.apple.com/v1/reviewSubmissions/{id}/relationships/items
GET    https://api.appstoreconnect.apple.com/v1/apps/{id}/relationships/reviewSubmissions

POST   https://api.appstoreconnect.apple.com/v1/reviewSubmissionItems
PATCH  https://api.appstoreconnect.apple.com/v1/reviewSubmissionItems/{id}
DELETE https://api.appstoreconnect.apple.com/v1/reviewSubmissionItems/{id}
```

## Options / Props

### Review submission endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/reviewSubmissions` | Create a review submission for a specific app (`ReviewSubmissionCreateRequest`; 201 returns `ReviewSubmissionResponse`) |
| GET | `/v1/reviewSubmissions` | List recent and current review submissions for an app |
| GET | `/v1/reviewSubmissions/{id}` | Read review submission information |
| PATCH | `/v1/reviewSubmissions/{id}` | Edit the details or contents of a review submission (`ReviewSubmissionUpdateRequest`) |
| GET | `/v1/reviewSubmissions/{id}/items` | List the items in a review submission |
| GET | `/v1/reviewSubmissions/{id}/relationships/items` | List item IDs |
| GET | `/v1/apps/{id}/relationships/reviewSubmissions` | List review submission IDs for an app |

### Query parameters — `GET /v1/reviewSubmissions`

| Name | Type | Description |
|------|------|-------------|
| `filter[app]` | [string] | Required. App resource ID(s) |
| `filter[platform]` | [string] | `IOS`, `MAC_OS`, `TV_OS`, `VISION_OS` |
| `filter[state]` | [string] | `READY_FOR_REVIEW`, `WAITING_FOR_REVIEW`, `IN_REVIEW`, `UNRESOLVED_ISSUES`, `CANCELING`, `COMPLETING`, `COMPLETE` |
| `fields[reviewSubmissions]` | [string] | `platform`, `submittedDate`, `state`, `app`, `items`, `appStoreVersionForReview`, `submittedByActor`, `lastUpdatedByActor` |
| `fields[reviewSubmissionItems]` | [string] | `state`, `appStoreVersion`, `appCustomProductPageVersion`, `appStoreVersionExperiment`, `appStoreVersionExperimentV2`, `appEvent`, `appAssetLibraryImage`, `appAssetLibraryVideo`, `backgroundAssetVersion`, `gameCenterAchievementVersion`, `gameCenterActivityVersion`, `gameCenterChallengeVersion`, `gameCenterLeaderboardSetVersion`, `gameCenterLeaderboardVersion`, `inAppPurchaseVersion`, `subscriptionVersion`, `subscriptionGroupVersion` |
| `fields[actors]` | [string] | `actorType`, `userFirstName`, `userLastName`, `userEmail`, `apiKeyId` |
| `include` | [string] | `app`, `items`, `appStoreVersionForReview`, `submittedByActor`, `lastUpdatedByActor` |
| `limit` | integer | Maximum 200 |
| `limit[items]` | integer | Maximum 50 |

(`fields[apps]` and `fields[appStoreVersions]` are also accepted; see the official page for their value lists.)

### `ReviewSubmission.Attributes` (introduced at 1.7)

| Name | Type | Description |
|------|------|-------------|
| `platform` | Platform | Apple platform string |
| `state` | string | `READY_FOR_REVIEW`, `WAITING_FOR_REVIEW`, `IN_REVIEW`, `UNRESOLVED_ISSUES`, `CANCELING`, `COMPLETING`, `COMPLETE` |
| `submittedDate` | date-time | When the submission was submitted |

### Review submission item endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/reviewSubmissionItems` | Create a review submission item (`ReviewSubmissionItemCreateRequest`) |
| PATCH | `/v1/reviewSubmissionItems/{id}` | Update a review submission item (`ReviewSubmissionItemUpdateRequest`) |
| DELETE | `/v1/reviewSubmissionItems/{id}` | Remove a review submission item |

### `ReviewSubmissionItem.Attributes`

| Name | Type | Description |
|------|------|-------------|
| `state` | string | `READY_FOR_REVIEW`, `ACCEPTED`, `APPROVED`, `REJECTED`, `REMOVED` |

### `ReviewSubmissionItem.Relationships` (introduced at 3.6)

`appStoreVersion`, `appCustomProductPageVersion`, `appStoreVersionExperiment`, `appStoreVersionExperimentV2`, `appEvent`, `appAssetLibraryImage`, `appAssetLibraryVideo`, `backgroundAssetVersion`, `gameCenterAchievementVersion`, `gameCenterActivityVersion`, `gameCenterChallengeVersion`, `gameCenterLeaderboardSetVersion`, `gameCenterLeaderboardVersion`, `inAppPurchaseVersion`, `subscriptionGroupVersion`, `subscriptionVersion`.

## Notes

- The `platform` attribute is no longer required for `POST /v1/reviewSubmissions`. You can optionally add `platform` with `PATCH /v1/reviewSubmissions/{id}`.
- Deprecated: the `appStoreVersionSubmissions` resource (`AppStoreVersionSubmission`, `DELETE /v1/appStoreVersionSubmissions/{id}`), the older equivalent of clicking Submit for Review. Use `reviewSubmissions` and `reviewSubmissionItems` instead.
- Incomplete submissions (missing required information) return an error when submitted to App Review.
- The exact JSON bodies of the create and update requests are not documented on this page (see the official App Store Connect API page for the request schema); `ReviewSubmissionCreateRequest.Data` contains the resource type and the app relationship.

## Related

- [App Store Review Details and Attachments](./app-store-review-details.md)
- [App Store Versions](../asc-api-core/app-store-versions.md)
- [App Store Version Experiments](./app-store-version-experiments.md)
- [Custom Product Pages and Localizations](./custom-product-pages.md)
- [App Events and Metadata](./app-events.md)
