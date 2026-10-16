# App Store Version Phased Releases

Release app updates to customers in stages (`appStoreVersionPhasedReleases`). Not available for the first version of an app, only for subsequent releases.

## Signature / Usage

```
POST   https://api.appstoreconnect.apple.com/v1/appStoreVersionPhasedReleases
PATCH  https://api.appstoreconnect.apple.com/v1/appStoreVersionPhasedReleases/{id}
DELETE https://api.appstoreconnect.apple.com/v1/appStoreVersionPhasedReleases/{id}
```

Read the phased release of a version with `GET /v1/appStoreVersions/{id}/appStoreVersionPhasedRelease`.

## Options / Props

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/appStoreVersionPhasedReleases` | Enable phased release for an App Store version (`AppStoreVersionPhasedReleaseCreateRequest`) |
| PATCH | `/v1/appStoreVersionPhasedReleases/{id}` | Pause or resume a phased release, or immediately release the app (`AppStoreVersionPhasedReleaseUpdateRequest`) |
| DELETE | `/v1/appStoreVersionPhasedReleases/{id}` | Cancel a planned phased release that has not been started |

### `AppStoreVersionPhasedRelease.Attributes` (introduced at 1.2)

| Name | Type | Description |
|------|------|-------------|
| `phasedReleaseState` | PhasedReleaseState | Progress of the phased release |
| `currentDayNumber` | integer | Current day number (no description in the source) |
| `startDate` | date-time | Start date |
| `totalPauseDuration` | integer | Total pause duration |

### `PhasedReleaseState`

| Value | Meaning |
|-------|---------|
| `INACTIVE` | The phased release has not started |
| `ACTIVE` | The app version is released; the App Store releases the update over a 7-day period to a randomly selected percentage of users. Applies to macOS and iOS devices with automatic updates enabled; users can also manually download the version |
| `PAUSED` | The App Store paused the phased release at your request |
| `COMPLETE` | The update has been released to all devices with automatic updates enabled |

## Notes

- Use `PATCH` to change the state (pause, resume, release to all immediately).
- `AppStoreVersionPhasedReleaseWithoutIncludesResponse` is a single phased release response without related resources.
- The exact JSON bodies of the create and update requests are not documented on this page (see the official App Store Connect API pages for the request schemas); `AppStoreVersionPhasedReleaseUpdateRequest.Data` is the `data` element of the request.

## Related

- [App Store Version Release Requests](./release-requests.md)
- [App Store Versions](../asc-api-core/app-store-versions.md)
