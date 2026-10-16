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

### Age Rating Declaration Attributes (selected)

Attributes of `AgeRatingDeclaration` (`GET /v1/appInfos/{id}/ageRatingDeclaration`).

| Attribute | Type | Description |
|-----------|------|-------------|
| `koreaAgeRatingOverride` | string | An override you set for the app's calculated age rating in Korea. Set this value to the age rating that corresponds to the rating the `gracRatingClassificationNumber` represents. Allowed values: `NONE`, `ALL`, `TWELVE_PLUS`, `FIFTEEN_PLUS`, `NINETEEN_PLUS` (`ALL` and `TWELVE_PLUS` added in 4.5) |
| `gracRatingClassificationNumber` | string | The rating classification number provided by Game Rating and Administration Committee (GRAC) |
| `ageRatingOverrideV2` | string | An override you set for the app's calculated age rating. Allowed values: `NONE`, `NINE_PLUS`, `THIRTEEN_PLUS`, `SIXTEEN_PLUS`, `EIGHTEEN_PLUS`, `UNRATED` |
| `ageRatingOverride` | string | Deprecated; use `ageRatingOverrideV2` instead. Allowed values: `NONE`, `NINE_PLUS`, `THIRTEEN_PLUS`, `SIXTEEN_PLUS`, `SEVENTEEN_PLUS`, `UNRATED` |
| `socialMedia` | boolean | Whether the app includes social media features (added in 4.4.1) |
| `socialMediaAgeRestricted` | boolean | Whether the app's social media features are age restricted (added in 4.4.1) |
| `ageAssurance` | boolean | Whether the app uses age assurance to verify a person's age |
| `developerAgeRatingInfoUrl` | uri | The URL where people can find more information about how you determine the app's age rating |

## Notes

- Each app may have multiple `AppInfo` records (one per live/editable state)
- Modifying primary/secondary categories goes through the `relationships` in the PATCH body
- Age rating declaration is a sub-resource accessed via its own endpoint

## Related

- [Apps](./apps.md)
- [App Store Versions](./app-store-versions.md)
