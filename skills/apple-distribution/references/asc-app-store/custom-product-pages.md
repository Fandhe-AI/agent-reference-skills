# Custom Product Pages and Localizations

Create and manage custom product pages (alternate App Store product page variants for marketing campaigns), their versions, and version-specific localizations.

## Signature / Usage

```
# Custom product pages
POST   https://api.appstoreconnect.apple.com/v1/appCustomProductPages
GET    https://api.appstoreconnect.apple.com/v1/apps/{id}/appCustomProductPages
GET    https://api.appstoreconnect.apple.com/v1/appCustomProductPages/{id}
PATCH  https://api.appstoreconnect.apple.com/v1/appCustomProductPages/{id}
DELETE https://api.appstoreconnect.apple.com/v1/appCustomProductPages/{id}
GET    https://api.appstoreconnect.apple.com/v1/appCustomProductPages/{id}/appCustomProductPageVersions
GET    https://api.appstoreconnect.apple.com/v1/appCustomProductPages/{id}/relationships/appCustomProductPageVersions

# Versions
POST   https://api.appstoreconnect.apple.com/v1/appCustomProductPageVersions
GET    https://api.appstoreconnect.apple.com/v1/appCustomProductPageVersions/{id}
PATCH  https://api.appstoreconnect.apple.com/v1/appCustomProductPageVersions/{id}
GET    https://api.appstoreconnect.apple.com/v1/appCustomProductPageVersions/{id}/appCustomProductPageLocalizations
GET    https://api.appstoreconnect.apple.com/v1/appCustomProductPageVersions/{id}/relationships/appCustomProductPageLocalizations

# Localizations
POST   https://api.appstoreconnect.apple.com/v1/appCustomProductPageLocalizations
GET    https://api.appstoreconnect.apple.com/v1/appCustomProductPageLocalizations/{id}
PATCH  https://api.appstoreconnect.apple.com/v1/appCustomProductPageLocalizations/{id}
DELETE https://api.appstoreconnect.apple.com/v1/appCustomProductPageLocalizations/{id}
```

## Options / Props

### Custom product pages

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/appCustomProductPages` | Create a custom product page (`AppCustomProductPageCreateRequest`) |
| GET | `/v1/apps/{id}/appCustomProductPages` | List all custom product pages for an app |
| GET | `/v1/appCustomProductPages/{id}` | Read custom product page information |
| PATCH | `/v1/appCustomProductPages/{id}` | Update the name and visibility status |
| DELETE | `/v1/appCustomProductPages/{id}` | Delete a custom product page |
| GET | `/v1/appCustomProductPages/{id}/appCustomProductPageVersions` | List versions |
| GET | `/v1/appCustomProductPages/{id}/relationships/appCustomProductPageVersions` | Get all version IDs |

`AppCustomProductPage.Attributes` (introduced at 1.7):

| Name | Type | Description |
|------|------|-------------|
| `name` | string | Page name |
| `url` | uri | Page URL |
| `visible` | boolean | Page visibility |

### Custom product page versions

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/appCustomProductPageVersions` | Add a version for a custom product page |
| GET | `/v1/appCustomProductPageVersions/{id}` | Read version information |
| PATCH | `/v1/appCustomProductPageVersions/{id}` | Modify a version |
| GET | `/v1/appCustomProductPageVersions/{id}/appCustomProductPageLocalizations` | List localizations |
| GET | `/v1/appCustomProductPageVersions/{id}/relationships/appCustomProductPageLocalizations` | List localization IDs |

`AppCustomProductPageVersion.Attributes`:

| Name | Type | Description |
|------|------|-------------|
| `deepLink` | uri | Deep link |
| `state` | string | `PREPARE_FOR_SUBMISSION`, `READY_FOR_REVIEW`, `WAITING_FOR_REVIEW`, `IN_REVIEW`, `ACCEPTED`, `APPROVED`, `REPLACED_WITH_NEW_VERSION`, `REJECTED` |
| `version` | string | Version string |

### Custom product page localizations

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/appCustomProductPageLocalizations` | Create a localization |
| GET | `/v1/appCustomProductPageLocalizations/{id}` | Read localization information |
| PATCH | `/v1/appCustomProductPageLocalizations/{id}` | Update the promotional text |
| DELETE | `/v1/appCustomProductPageLocalizations/{id}` | Delete a localization |
| GET | `/v1/appCustomProductPageLocalizations/{id}/searchKeywords` | List keywords |
| GET / POST / DELETE | `/v1/appCustomProductPageLocalizations/{id}/relationships/searchKeywords` | List, assign, or remove search keyword IDs |
| GET | `/v1/appCustomProductPageLocalizations/{id}/placements` | List asset library placements |
| GET | `/v1/appCustomProductPageLocalizations/{id}/relationships/placements` | List placement IDs |
| GET (deprecated) | `/v1/appCustomProductPageLocalizations/{id}/appScreenshotSets` | List app screenshot sets |
| GET (deprecated) | `/v1/appCustomProductPageLocalizations/{id}/appPreviewSets` | List app preview sets |
| GET (deprecated) | `/v1/appCustomProductPageLocalizations/{id}/relationships/appScreenshotSets` and `.../appPreviewSets` | List set IDs |

## Notes

- Deprecated in App Store Connect API 4.5.1: custom product page screenshot sets and app preview sets (and their relationships on the localization). Manage custom product page media with the App Asset Library and placements instead.
- You can update the Promotional Text of a custom product page localization at any time.
- Screenshot and app preview collections for custom product pages (`appCustomProductPageScreenshotSets`, `appCustomProductPageScreenshots`, `appCustomProductPageAppPreviewSets`, `appCustomProductPageAppPreviews`) are listed in the section index but not summarised here.
- `AppCustomProductPageLocalizationInlineCreate` and `AppCustomProductPageVersionInlineCreate` are inline objects for creating a localization or version while creating a related resource.
- Source: https://developer.apple.com/documentation/appstoreconnectapi/custom-product-pages-and-localizations , https://developer.apple.com/documentation/appstoreconnectapi/app-custom-product-pages

## Related

- [App Events and Metadata](./app-events.md)
- [App Store Review Details](./app-store-review-details.md)
- [App Store Versions](../asc-api-core/app-store-versions.md)
