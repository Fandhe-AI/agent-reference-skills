# In-App Purchase, Subscription, and Subscription Group Versions

Draft "version" containers (API 4.4.1) that group the localized metadata and review images going through App Review together, submitted via `reviewSubmissions` / `reviewSubmissionItems`.

## Signature / Usage

Create a draft version, attach a localization to it, then submit through review submissions:

```
POST /v1/inAppPurchaseVersions
{
  "data": {
    "type": "inAppPurchaseVersions",
    "relationships": {
      "inAppPurchase": { "data": { "type": "inAppPurchases", "id": "6446452615" } }
    }
  }
}

POST /v2/inAppPurchaseLocalizations
{
  "data": {
    "type": "inAppPurchaseLocalizations",
    "attributes": {
      "locale": "en-US",
      "name": "Seattle Neighborhood Coffee Map",
      "description": "This is a neighborhood map for helping to find awesome coffee shops."
    },
    "relationships": {
      "version": { "data": { "type": "inAppPurchaseVersions", "id": "${inAppPurchaseVersionId}" } }
    }
  }
}

POST /v1/reviewSubmissions
{ "data": { "type": "reviewSubmissions", "attributes": { "platform": "IOS" },
  "relationships": { "app": { "data": { "type": "apps", "id": "6446148572" } } } } }

POST /v1/reviewSubmissionItems
{ "data": { "type": "reviewSubmissionItems", "relationships": {
  "reviewSubmission": { "data": { "type": "reviewSubmissions", "id": "${reviewSubmissionId}" } },
  "inAppPurchaseVersion": { "data": { "type": "inAppPurchaseVersions", "id": "${inAppPurchaseVersionId}" } } } } }

PATCH /v1/reviewSubmissions/{id}
{ "data": { "type": "reviewSubmissions", "id": "${reviewSubmissionId}", "attributes": { "submitted": true } } }
```

Endpoints:

| Resource | Create version | Read / list | Localizations | Images |
|----------|----------------|-------------|---------------|--------|
| In-App Purchase | `POST /v1/inAppPurchaseVersions` (relationship `inAppPurchase`) | `GET /v1/inAppPurchaseVersions/{id}`, `GET /v2/inAppPurchases/{id}/versions` | `POST /v2/inAppPurchaseLocalizations`, `GET /v1/inAppPurchaseVersions/{id}/localizations` | `POST/GET/PATCH/DELETE /v2/inAppPurchaseImages[/{id}]` |
| Subscription | `POST /v1/subscriptionVersions` (relationship `subscription`) | `GET /v1/subscriptionVersions/{id}`, `GET /v1/subscriptions/{id}/versions` | `POST /v2/subscriptionLocalizations`, `GET /v1/subscriptionVersions/{id}/localizations` | `POST/GET/PATCH/DELETE /v2/subscriptionImages[/{id}]` |
| Subscription group | `POST /v1/subscriptionGroupVersions` (relationship `subscriptionGroup`) | `GET /v1/subscriptionGroupVersions/{id}`, `GET /v1/subscriptionGroups/{id}/versions` | `POST /v2/subscriptionGroupLocalizations` (attributes `locale`, `name`, `customAppName`), `GET /v1/subscriptionGroupVersions/{id}/localizations` | none (group versions carry only localizations) |

## Options / Props

Version `state` (on `InAppPurchaseVersion`, `SubscriptionVersion`, `SubscriptionGroupVersion` attributes):

| Value | Description |
|-------|-------------|
| PREPARE_FOR_SUBMISSION | Open for editing; add, change, or remove localizations and images |
| READY_FOR_REVIEW | Belongs to a review submission, waiting for the submission to be marked `submitted` |
| WAITING_FOR_REVIEW | Submission submitted; the version is queued |
| IN_REVIEW | App Review is actively reviewing |
| ACCEPTED / APPROVED | Passed review |
| REJECTED / DEVELOPER_REJECTED | Rejected by App Review, or withdrawn by you |
| REPLACED_WITH_NEW_VERSION | A newer version supersedes this one |

Review image upload (reserve, upload, commit), same shape for `subscriptionImages`:

| Step | Request |
|------|---------|
| Reserve | `POST /v2/inAppPurchaseImages` with attributes `fileName`, `fileSize` and relationship `version`; response returns `id` and `uploadOperations` |
| Upload | `PUT` the file bytes as described by `uploadOperations` |
| Commit | `PATCH /v2/inAppPurchaseImages/{id}` with `"attributes": { "uploaded": true }` |

## Notes

- Introduced in App Store Connect API 4.4.1. The pre-4.4.1 workflow that posts localizations and images directly to the parent resource (`POST /v1/inAppPurchaseLocalizations`, `POST /v1/inAppPurchaseImages`, `POST /v1/subscriptionLocalizations`, `POST /v1/subscriptionImages`, `POST /v1/subscriptionGroupLocalizations`) is deprecated but remains available for existing integrations.
- Versions are read-only after creation; to change contents, create a new version.
- The parent resource holds stable properties (product ID, type or duration, group, pricing); each version captures the reviewable metadata for one review cycle.
- Group-level localizations submit to App Review with the subscriptions they belong to. Submit a subscription group version independently only when changing group-level localization without changing any subscription in the group.
- Polling: before 4.4.1, status was read from the parent product; now poll the version `state` (`GET /v1/inAppPurchaseVersions/{id}` or the subscription / group equivalent).

### Migration (pre-4.4.1 to version-based v2)

| Deprecated (v1) | Replacement |
|-----------------|-------------|
| `POST /v1/inAppPurchaseLocalizations` | `POST /v2/inAppPurchaseLocalizations` (relates to an `inAppPurchaseVersion`; relationship key changes from `inAppPurchaseV2` to `version`) |
| `GET` / `PATCH` / `DELETE /v1/inAppPurchaseLocalizations/{id}` | same methods on `/v2/inAppPurchaseLocalizations/{id}` |
| `POST /v1/inAppPurchaseImages` | `POST /v2/inAppPurchaseImages` (relates to an `inAppPurchaseVersion`) |
| `GET` / `PATCH` / `DELETE /v1/inAppPurchaseImages/{id}` | same methods on `/v2/inAppPurchaseImages/{id}` |
| `POST /v1/inAppPurchaseSubmissions` | `POST /v1/reviewSubmissions` + `POST /v1/reviewSubmissionItems` with an `inAppPurchaseVersion` |
| `POST /v1/subscriptionLocalizations` | `POST /v2/subscriptionLocalizations` (relates to a `subscriptionVersion`) |
| `POST /v1/subscriptionImages` | `POST /v2/subscriptionImages` (relates to a `subscriptionVersion`) |
| `POST /v1/subscriptionSubmissions` | `POST /v1/reviewSubmissions` + `POST /v1/reviewSubmissionItems` with a `subscriptionVersion` |
| `POST /v1/subscriptionGroupLocalizations` | `POST /v2/subscriptionGroupLocalizations` (relates to a `subscriptionGroupVersion`) |
| `POST /v1/subscriptionGroupSubmissions` | `POST /v1/reviewSubmissions` + `POST /v1/reviewSubmissionItems` with a `subscriptionGroupVersion` |

- Nested read endpoints on the parent are also deprecated: `GET /v2/inAppPurchases/{id}/inAppPurchaseLocalizations`, `GET /v2/inAppPurchases/{id}/images`, `GET /v1/subscriptions/{id}/subscriptionLocalizations`, `GET /v1/subscriptions/{id}/images`, `GET /v1/subscriptionGroups/{id}/subscriptionGroupLocalizations` (and their `relationships` variants). Read through `/v1/<resource>Versions/{id}/localizations` and `.../images` instead.
- Unchanged in 4.4.1: `POST /v2/inAppPurchases`, `POST /v1/subscriptions`, `POST /v1/subscriptionGroups` (and GET / PATCH), pricing (`/v1/inAppPurchasePriceSchedules`, `/v1/subscriptionPricePoints`), `/v1/promotedPurchases`, and App Review screenshots (`/v1/inAppPurchaseAppStoreReviewScreenshots`, `/v1/subscriptionAppStoreReviewScreenshots`), which still target the parent product, not the version.

## Related

- [In-App Purchases](./in-app-purchases.md)
- [Subscriptions](./subscriptions.md)
- [Subscription Groups](./subscription-groups.md)
- [Promoted Purchases](./promoted-purchases.md)
