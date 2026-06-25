# Builds

List and manage processed binary uploads in App Store Connect for TestFlight distribution and App Store submission.

## Signature / Usage

```bash
# List builds
GET https://api.appstoreconnect.apple.com/v1/builds

# Read a single build
GET https://api.appstoreconnect.apple.com/v1/builds/{id}

# Modify a build (e.g., set expired flag)
PATCH https://api.appstoreconnect.apple.com/v1/builds/{id}

# Add beta group access to a build
POST https://api.appstoreconnect.apple.com/v1/builds/{id}/relationships/betaGroups

# Assign individual testers to a build
POST https://api.appstoreconnect.apple.com/v1/builds/{id}/relationships/individualTesters
```

## Options / Props

### Query Parameters — `GET /v1/builds`

| Parameter | Description |
|-----------|-------------|
| `filter[app]` | Filter by app ID |
| `filter[version]` | Filter by build version string |
| `filter[preReleaseVersion.version]` | Filter by pre-release version |
| `filter[preReleaseVersion.platform]` | Filter by platform (`IOS`, `MAC_OS`, `TV_OS`, `VISION_OS`) |
| `filter[processingState]` | `PROCESSING`, `FAILED`, `INVALID`, `VALID` |
| `filter[betaAppReviewSubmission.betaReviewState]` | `WAITING_FOR_REVIEW`, `IN_REVIEW`, `REJECTED`, `APPROVED` |
| `filter[buildAudienceType]` | `INTERNAL_ONLY`, `APP_STORE_ELIGIBLE` |
| `filter[expired]` | Boolean — filter by expiration status |
| `include` | Relationships: `app`, `preReleaseVersion`, `betaGroups`, `appStoreVersion`, `buildBetaDetail`, `icons`, etc. |
| `sort` | `version`, `-version`, `uploadedDate`, `-uploadedDate`, `preReleaseVersion`, `-preReleaseVersion` |
| `limit` | Max resources per page (max: 200) |

### Key Relationship Endpoints

| Relationship | Endpoint |
|-------------|----------|
| List individual testers | `GET /v1/builds/{id}/individualTesters` |
| Beta review submission status | `GET /v1/builds/{id}/betaAppReviewSubmission` |
| App encryption declaration | `GET /v1/builds/{id}/appEncryptionDeclaration` |
| Build beta details | `GET /v1/builds/{id}/buildBetaDetail` |
| Beta build localizations | `GET /v1/builds/{id}/betaBuildLocalizations` |
| Build icons | `GET /v1/builds/{id}/icons` |

## Notes

- Builds are uploaded via Xcode, Transporter, or the `altool` CLI; they cannot be created via API
- `processingState: VALID` indicates a build is ready for TestFlight or App Store use
- Attaching an encryption declaration: `PATCH /v1/builds/{id}/relationships/appEncryptionDeclaration`
- Usage metrics: `GET /v1/builds/{id}/metrics/betaBuildUsages`

## Related

- [Apps](./apps.md)
- [App Store Versions](./app-store-versions.md)
- [Pagination](./pagination.md)
