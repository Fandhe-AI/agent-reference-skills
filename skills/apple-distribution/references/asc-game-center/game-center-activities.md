# Game Center Activities

Activities link players directly to specific content in your game (e.g., a daily puzzle) via deep link, and can be linked to challenges and leaderboards.

## Signature / Usage

```bash
# Create an activity on a Game Center detail or group
POST https://api.appstoreconnect.apple.com/v1/gameCenterActivities

# Create a version, then a localization and image
POST https://api.appstoreconnect.apple.com/v1/gameCenterActivityVersions
POST https://api.appstoreconnect.apple.com/v1/gameCenterActivityLocalizations
POST https://api.appstoreconnect.apple.com/v1/gameCenterActivityImages
```

## Options / Props

### Activities

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/gameCenterActivities` | Create an activity for a Game Center detail or group |
| GET | `/v1/gameCenterActivities/{id}` | Read activity information |
| PATCH | `/v1/gameCenterActivities/{id}` | Update an activity |
| DELETE | `/v1/gameCenterActivities/{id}` | Remove an activity |
| GET | `/v1/gameCenterActivities/{id}/versions` | Get versions for an activity |
| POST | `/v1/gameCenterActivities/{id}/relationships/achievementsV2` | Add an achievement to an activity |
| POST | `/v1/gameCenterActivities/{id}/relationships/leaderboardsV2` | Add a leaderboard to an activity |

### Versions / Version releases

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/gameCenterActivityVersions` | Create an activity version (supports `fallbackUrl` for pre-iOS 26) |
| GET | `/v1/gameCenterActivityVersions/{id}` | Read version information |
| GET | `/v1/gameCenterActivityVersions/{id}/defaultImage` | Read the default image for a version |
| POST | `/v1/gameCenterActivityVersionReleases` | Add a version release for an activity *(deprecated)* |

### Localizations / Images

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/gameCenterActivityLocalizations` | Add a localization for an activity |
| PATCH | `/v1/gameCenterActivityLocalizations/{id}` | Update an activity localization |
| POST | `/v1/gameCenterActivityImages` | Reserve an image for an activity |
| PATCH | `/v1/gameCenterActivityImages/{id}` | Commit an uploaded image as an activity image |

### Required attributes on create

| Name | Type | Description |
|------|------|-------------|
| `referenceName` | string | Alphanumeric label, 40 characters or fewer |
| `vendorIdentifier` | string | Reverse-URL-scheme label |
| `minimumPlayersCount` / `maximumPlayersCount` | number | Player count bounds |
| `supportsPartyCode` | boolean | Whether the activity supports party codes |

## Notes

- Requires Game Center enabled in the binary and a Game Center detail already enabled.
- Non-multiplayer activities must relate to a leaderboard via `PATCH /v1/gameCenterLeaderboards/{id}/relationships/activity`.
- Submission requires at least one localization and a default image; submit via `POST /v1/gameCenterActivityVersionReleases` then `POST /v1/reviewSubmissions`.
- `POST/DELETE .../relationships/achievements` and `.../relationships/leaderboards` (non-V2) are deprecated in favor of the `achievementsV2` / `leaderboardsV2` relationships.

## Related

- [Game Center Challenges](./game-center-challenges.md)
- [Game Center Leaderboards](./game-center-leaderboards.md)
- [Game Center Achievements](./game-center-achievements.md)
