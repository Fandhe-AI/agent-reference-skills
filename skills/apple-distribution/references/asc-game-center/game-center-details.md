# Game Center Details

Top-level endpoint for Game Center information. Use it to enable Game Center for an app and read achievement, leaderboard, and localization details.

## Signature / Usage

```bash
# Enable Game Center for an app
POST https://api.appstoreconnect.apple.com/v1/gameCenterDetails

# Read a Game Center detail
GET https://api.appstoreconnect.apple.com/v1/gameCenterDetails/{id}
```

## Options / Props

### CRUD

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/apps/{id}/gameCenterDetail` | Read the state of Game Center for an app |
| POST | `/v1/gameCenterDetails` | Enable Game Center for an app |
| GET | `/v1/gameCenterDetails/{id}` | Read Game Center details |
| PATCH | `/v1/gameCenterDetails/{id}` | Modify a Game Center detail for an app |

### Relationships

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/gameCenterDetails/{id}/gameCenterAppVersions` | Read app versions for a Game Center detail |
| GET | `/v1/gameCenterDetails/{id}/gameCenterGroup` | Read the group a Game Center detail belongs to |
| GET | `/v1/gameCenterDetails/{id}/gameCenterChallenges` | Read the challenges for a Game Center detail |
| GET | `/v1/gameCenterDetails/{id}/gameCenterAchievementsV2` | List all achievements for a Game Center detail |
| GET | `/v1/gameCenterDetails/{id}/gameCenterLeaderboardsV2` | List all leaderboards for a Game Center detail |
| GET | `/v1/gameCenterDetails/{id}/gameCenterLeaderboardSetsV2` | List all leaderboard sets for a Game Center detail |
| PATCH | `/v1/gameCenterDetails/{id}/relationships/gameCenterAchievementsV2` | Modify the achievements for a Game Center detail |
| PATCH | `/v1/gameCenterDetails/{id}/relationships/gameCenterLeaderboardsV2` | Modify the leaderboards for a Game Center detail |
| PATCH | `/v1/gameCenterDetails/{id}/relationships/gameCenterLeaderboardSetsV2` | Modify the leaderboard sets for a Game Center detail |
| PATCH | `/v1/gameCenterDetails/{id}/relationships/challengesMinimumPlatformVersions` | Modify the challenges minimum platform version for a Game Center detail |

### Key Objects

| Object | Purpose |
|--------|---------|
| `GameCenterDetail` | Game Center configuration for an app, linking it to leaderboards, achievements, and groups |
| `GameCenterDetailCreateRequest` / `GameCenterDetailUpdateRequest` | Create/update request bodies |
| `GameCenterDetailResponse` / `GameCenterDetailsResponse` | Single/list response bodies |

## Notes

- `gameCenterDetails` is the top-level resource; achievements, leaderboards, and leaderboard sets attach to it directly or via a `gameCenterGroup`.

## Related

- [Game Center Groups](./game-center-groups.md)
- [Game Center Achievements](./game-center-achievements.md)
- [Game Center Leaderboards](./game-center-leaderboards.md)
- [Game Center Leaderboard Sets](./game-center-leaderboard-sets.md)
