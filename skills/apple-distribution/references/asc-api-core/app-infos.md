# App Infos

Read and modify app metadata that applies across all versions of an app (categories, content ratings, localized descriptions).

## Signature / Usage

```bash
# List all app infos for an app
GET https://api.appstoreconnect.apple.com/v1/apps/{id}/appInfos

# Read a specific app info
GET https://api.appstoreconnect.apple.com/v1/appInfos/{id}

# Modify app info
PATCH https://api.appstoreconnect.apple.com/v1/appInfos/{id}
```

## Options / Props

### `PATCH /v1/appInfos/{id}` Request Body (`AppInfoUpdateRequest`)

| Field | Type | Description |
|-------|------|-------------|
| `data.type` | `"appInfos"` | Resource type |
| `data.id` | string | App info ID |
| `data.attributes` | object | Fields to update |
| `data.relationships` | object | Category/subcategory relationships |

### Key Relationship Endpoints

| Relationship | Endpoint |
|-------------|----------|
| App info localizations | `GET /v1/appInfos/{id}/appInfoLocalizations` |
| Age rating declaration | `GET /v1/appInfos/{id}/ageRatingDeclaration` |
| Localization IDs | `GET /v1/appInfos/{id}/relationships/appInfoLocalizations` |

## Notes

- Each app may have multiple `AppInfo` records (one per live/editable state)
- Modifying primary/secondary categories goes through the `relationships` in the PATCH body
- Age rating declaration is a sub-resource accessed via its own endpoint

## Related

- [Apps](./apps.md)
- [App Store Versions](./app-store-versions.md)
