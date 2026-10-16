# App Events and Metadata

Create, schedule, and manage in-app events (`appEvents`) shown on your App Store product page, and their localized metadata (`appEventLocalizations`).

## Signature / Usage

```
POST   https://api.appstoreconnect.apple.com/v1/appEvents
GET    https://api.appstoreconnect.apple.com/v1/apps/{id}/appEvents
GET    https://api.appstoreconnect.apple.com/v1/appEvents/{id}
PATCH  https://api.appstoreconnect.apple.com/v1/appEvents/{id}
DELETE https://api.appstoreconnect.apple.com/v1/appEvents/{id}
GET    https://api.appstoreconnect.apple.com/v1/appEvents/{id}/localizations
GET    https://api.appstoreconnect.apple.com/v1/appEvents/{id}/relationships/localizations

POST   https://api.appstoreconnect.apple.com/v1/appEventLocalizations
GET    https://api.appstoreconnect.apple.com/v1/appEventLocalizations/{id}
PATCH  https://api.appstoreconnect.apple.com/v1/appEventLocalizations/{id}
DELETE https://api.appstoreconnect.apple.com/v1/appEventLocalizations/{id}
```

## Options / Props

### App event endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/appEvents` | Create an in-app event (`AppEventCreateRequest`) |
| GET | `/v1/apps/{id}/appEvents` | List all in-app events for an app |
| GET | `/v1/appEvents/{id}` | Read in-app event information |
| PATCH | `/v1/appEvents/{id}` | Modify an in-app event (`AppEventUpdateRequest`) |
| DELETE | `/v1/appEvents/{id}` | Delete an in-app event and its related metadata |
| GET | `/v1/appEvents/{id}/localizations` | List all localizations |
| GET | `/v1/appEvents/{id}/relationships/localizations` | List localization IDs |

### `AppEvent.Attributes` (introduced at 1.7)

| Name | Type | Description |
|------|------|-------------|
| `referenceName` | string | Reference name |
| `badge` | string | `LIVE_EVENT`, `PREMIERE`, `CHALLENGE`, `COMPETITION`, `NEW_SEASON`, `MAJOR_UPDATE`, `SPECIAL_EVENT` |
| `deepLink` | uri | Deep link |
| `eventState` | string | `DRAFT`, `READY_FOR_REVIEW`, `WAITING_FOR_REVIEW`, `IN_REVIEW`, `REJECTED`, `ACCEPTED`, `APPROVED`, `PUBLISHED`, `PAST`, `ARCHIVED` |
| `primaryLocale` | string | Primary locale |
| `priority` | string | `HIGH`, `NORMAL` |
| `purchaseRequirement` | string | `NO_COST_ASSOCIATED`, `IN_APP_PURCHASE` |
| `purpose` | string | `APPROPRIATE_FOR_ALL_USERS`, `ATTRACT_NEW_USERS`, `KEEP_ACTIVE_USERS_INFORMED`, `BRING_BACK_LAPSED_USERS` |
| `territorySchedules` | [object] | Per-territory schedule: start, end, publish dates, and targeted territories |
| `archivedTerritorySchedules` | [object] | Previously active per-territory schedules |

### App event localization endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/appEventLocalizations` | Add a localization for an in-app event |
| GET | `/v1/appEventLocalizations/{id}` | Read localization information |
| PATCH | `/v1/appEventLocalizations/{id}` | Update localized metadata |
| DELETE | `/v1/appEventLocalizations/{id}` | Delete a localization |
| GET | `/v1/appEventLocalizations/{id}/placements` | List related asset library placements |
| GET | `/v1/appEventLocalizations/{id}/relationships/placements` | List placement IDs |
| GET (deprecated) | `/v1/appEventLocalizations/{id}/appEventScreenshots` | List screenshots |
| GET (deprecated) | `/v1/appEventLocalizations/{id}/appEventVideoClips` | List video clips |
| GET (deprecated) | `/v1/appEventLocalizations/{id}/relationships/appEventScreenshots` and `.../appEventVideoClips` | List IDs |

An `AppEventLocalization` holds the localized name, short description, and long description of an event in one language.

## Notes

- Deprecated in App Store Connect API 4.5.1: the in-app event screenshot and video clip resources and their relationships (`app-event-screenshots`, `app-event-video-clips`). Manage in-app event media with the App Asset Library and placements instead.
- `AppEventAssetType` is a string type for the asset type of an app event.
- Source: https://developer.apple.com/documentation/appstoreconnectapi/app-events-and-metadata , https://developer.apple.com/documentation/appstoreconnectapi/app-events

## Related

- [Custom Product Pages and Localizations](./custom-product-pages.md)
- [Territories](./territories.md)
