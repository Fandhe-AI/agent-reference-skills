# App Store Versions

Manage versions of your app available in the App Store, including creation, modification, build attachment, and review submission.

## Signature / Usage

```bash
# List all versions for an app
GET https://api.appstoreconnect.apple.com/v1/apps/{id}/appStoreVersions

# Read a specific version
GET https://api.appstoreconnect.apple.com/v1/appStoreVersions/{id}

# Create a new version
POST https://api.appstoreconnect.apple.com/v1/appStoreVersions

# Modify a version
PATCH https://api.appstoreconnect.apple.com/v1/appStoreVersions/{id}

# Delete an unsubmitted version
DELETE https://api.appstoreconnect.apple.com/v1/appStoreVersions/{id}

# Attach a build to a version
PATCH https://api.appstoreconnect.apple.com/v1/appStoreVersions/{id}/relationships/build
```

## Options / Props

### `POST /v1/appStoreVersions` Request Body (`AppStoreVersionCreateRequest`)

| Field | Type | Description |
|-------|------|-------------|
| `data.type` | `"appStoreVersions"` | Resource type |
| `data.attributes.platform` | string | `IOS`, `MAC_OS`, `TV_OS`, `VISION_OS` |
| `data.attributes.versionString` | string | Version number (e.g., `"1.2.0"`) |
| `data.attributes.releaseType` | string | `MANUAL`, `AFTER_APPROVAL`, `SCHEDULED` |
| `data.attributes.earliestReleaseDate` | date-time | For scheduled release |
| `data.relationships.app` | object | Associated app relationship |

### Key Relationship Endpoints

| Relationship | Endpoint |
|-------------|----------|
| Attach/read build | `GET` / `PATCH /v1/appStoreVersions/{id}/relationships/build` |
| Version localizations | `GET /v1/appStoreVersions/{id}/appStoreVersionLocalizations` |
| Review details | `GET /v1/appStoreVersions/{id}/appStoreReviewDetail` |
| Phased release | `GET /v1/appStoreVersions/{id}/appStoreVersionPhasedRelease` |
| Customer reviews | `GET /v1/appStoreVersions/{id}/customerReviews` |
| Experiments (v2) | `GET /v1/appStoreVersions/{id}/appStoreVersionExperimentsV2` |

## Notes

- `AppStoreVersionState` enum is deprecated; use `AppVersionState` instead
- A version must have a build attached (`relationships/build`) before it can be submitted for review
- `DELETE` is only allowed for versions not yet submitted
- Media for `appStoreVersionLocalizations` moved from screenshot / preview sets to App Asset Library placements: `GET /v1/appStoreVersionLocalizations/{id}/placements` (4.5; announced in the 4.5.1 release notes). The screenshot / preview set resources are deprecated (see the App Asset Library pages)
- The v1 experiments resource (`appStoreVersionExperiments`: `POST /v1/appStoreVersionExperiments`, `GET` / `PATCH` / `DELETE /v1/appStoreVersionExperiments/{id}`, `GET /v1/appStoreVersions/{id}/appStoreVersionExperiments`) is deprecated; use `appStoreVersionExperimentsV2`
- The `appStoreVersionSubmissions` resource (`AppStoreVersionSubmission`, `DELETE /v1/appStoreVersionSubmissions/{id}`) is deprecated; submit versions through `reviewSubmissions` and `reviewSubmissionItems` instead

## Related

- [Understanding the App Asset Library](../asc-app-asset-library/understanding-the-app-asset-library.md)
- [Apps](./apps.md)
- [App Infos](./app-infos.md)
- [Builds](./builds.md)
