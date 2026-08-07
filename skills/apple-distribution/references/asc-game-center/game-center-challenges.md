# Game Center Challenges

Challenges turn a single-player leaderboard into a social experience: players invite friends to a score-based round with real-time updates and rematches. Built on top of an existing leaderboard.

## Signature / Usage

```bash
# Create a challenge referencing an existing leaderboard
POST https://api.appstoreconnect.apple.com/v1/gameCenterChallenges

# Create a version, then add a localization and image
POST https://api.appstoreconnect.apple.com/v1/gameCenterChallengeVersions
POST https://api.appstoreconnect.apple.com/v1/gameCenterChallengeLocalizations
POST https://api.appstoreconnect.apple.com/v1/gameCenterChallengeImages
```

## Options / Props

### Challenges

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/gameCenterChallenges` | Create a challenge on a Game Center detail or group by referencing an existing leaderboard |
| GET | `/v1/gameCenterChallenges/{id}` | Read challenge information |
| PATCH | `/v1/gameCenterChallenges/{id}` | Modify a challenge |
| DELETE | `/v1/gameCenterChallenges/{id}` | Delete a challenge |
| PATCH | `/v1/gameCenterChallenges/{id}/relationships/leaderboardV2` | Modify the leaderboard for a challenge |
| GET | `/v1/gameCenterChallenges/{id}/versions` | Read the versions for a challenge |

### Versions / Version releases

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/gameCenterChallengeVersions` | Create a challenge version |
| GET | `/v1/gameCenterChallengeVersions/{id}` | Read challenge version information |
| GET | `/v1/gameCenterChallengeVersions/{id}/defaultImage` | Read the default image for a version |
| POST | `/v1/gameCenterChallengeVersionReleases` | Add a version release for a challenge version |

### Localizations / Images

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/gameCenterChallengeLocalizations` | Add a localization for a challenge |
| PATCH | `/v1/gameCenterChallengeLocalizations/{id}` | Update a challenge localization |
| POST | `/v1/gameCenterChallengeImages` | Reserve an image for a challenge |
| PATCH | `/v1/gameCenterChallengeImages/{id}` | Commit an uploaded image as a challenge image |

### Required attributes on create

| Name | Type | Description |
|------|------|-------------|
| `referenceName` | string | Alphanumeric label, 40 characters or fewer |
| `vendorIdentifier` | string | Reverse-URL-scheme label |
| `challengeType` | string | Always `"leaderboard"` |
| `allowedDurations` | string[] | `ONE_DAY`, `THREE_DAYS`, `ONE_WEEK` — use all three unless the leaderboard is recurring |

## Notes

- Requires an approved or draft leaderboard, Game Center enabled in the binary, and a Game Center detail already enabled.
- At least one localization and one image are required before submission; submit via `POST /v1/gameCenterChallengeVersionReleases` then `POST /v1/reviewSubmissions`.
- `PATCH /v1/gameCenterChallenges/{id}/relationships/leaderboard` (non-V2) is deprecated in favor of `leaderboardV2`.

## Related

- [Game Center Leaderboards](./game-center-leaderboards.md)
- [Game Center Activities](./game-center-activities.md)
