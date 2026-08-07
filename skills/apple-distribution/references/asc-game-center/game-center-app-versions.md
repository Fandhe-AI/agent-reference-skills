# Game Center App Versions

Tracks which App Store app version a Game Center configuration is tied to, and which app versions are mutually compatible.

## Signature / Usage

```bash
# Create a Game Center app version
POST https://api.appstoreconnect.apple.com/v1/gameCenterAppVersions

# Read app versions for a Game Center detail
GET https://api.appstoreconnect.apple.com/v1/gameCenterDetails/{id}/gameCenterAppVersions
```

## Options / Props

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/gameCenterAppVersions` | Create an app version |
| GET | `/v1/gameCenterAppVersions/{id}` | Read app version information |
| PATCH | `/v1/gameCenterAppVersions/{id}` | Modify an app version |
| GET | `/v1/gameCenterAppVersions/{id}/appStoreVersion` | Read the App Store version for a Game Center app version |
| GET | `/v1/gameCenterAppVersions/{id}/compatibilityVersions` | Read compatibility version information |
| POST | `/v1/gameCenterAppVersions/{id}/relationships/compatibilityVersions` | Add compatible app version relationships |
| DELETE | `/v1/gameCenterAppVersions/{id}/relationships/compatibilityVersions` | Remove compatible app version relationships |
| GET | `/v1/gameCenterDetails/{id}/gameCenterAppVersions` | Read app versions for a Game Center detail |

## Notes

- `GameCenterVersionState` reports whether the version is in review, live, etc.
- Compatibility relationships let a new binary continue supporting Game Center features tied to an older, already-released app version.

## Related

- [Game Center Details](./game-center-details.md)
