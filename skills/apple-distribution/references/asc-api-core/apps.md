# Apps

Manage apps registered to your team in App Store Connect.

## Signature / Usage

```bash
# List all apps
GET https://api.appstoreconnect.apple.com/v1/apps

# Read a single app
GET https://api.appstoreconnect.apple.com/v1/apps/{id}

# Modify an app
PATCH https://api.appstoreconnect.apple.com/v1/apps/{id}
```

## Options / Props

### Query Parameters — `GET /v1/apps`

| Parameter | Description |
|-----------|-------------|
| `filter[bundleId]` | Filter by bundle ID |
| `filter[id]` | Filter by app ID |
| `filter[name]` | Filter by app name |
| `filter[sku]` | Filter by SKU |
| `filter[appStoreVersions.platform]` | Filter by platform (`IOS`, `MAC_OS`, `TV_OS`, `VISION_OS`) |
| `filter[appStoreVersions.appVersionState]` | Filter by version state (`ACCEPTED`, `IN_REVIEW`, `READY_FOR_REVIEW`, etc.) |
| `filter[reviewSubmissions.state]` | Filter by review submission state |
| `fields[apps]` | Comma-separated app fields to return |
| `include` | Relationships to include (e.g., `appStoreVersions`, `builds`, `appInfos`) |
| `sort` | Sort field: `name`, `-name`, `bundleId`, `-bundleId`, `sku`, `-sku` |
| `limit` | Max resources per page (max: 200) |

### Key App Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | string | App name |
| `bundleId` | string | App bundle identifier |
| `sku` | string | App SKU |
| `primaryLocale` | string | App primary locale |
| `isOrEverWasMadeForKids` | boolean | Kids category flag |
| `contentRightsDeclaration` | string | Third-party content declaration |

## Notes

- `GET /v1/apps` returns up to 200 apps per page; use `meta.paging` for navigation
- App resource ID (numeric string) is used in all relationship endpoints
- Related sub-resources are accessible via `GET /v1/apps/{id}/{relationship}` paths

### Key Relationship Endpoints

| Relationship | Endpoint |
|-------------|----------|
| App Infos | `GET /v1/apps/{id}/appInfos` |
| App Store Versions | `GET /v1/apps/{id}/appStoreVersions` |
| Builds | `GET /v1/apps/{id}/builds` |
| Beta Groups | `GET /v1/apps/{id}/betaGroups` |
| Pre-release Versions | `GET /v1/apps/{id}/preReleaseVersions` |
| Customer Reviews | `GET /v1/apps/{id}/customerReviews` |

## Related

- [App Infos](./app-infos.md)
- [App Store Versions](./app-store-versions.md)
- [Builds](./builds.md)
- [Pagination](./pagination.md)
