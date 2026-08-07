# Game Center Groups

A named group that shares Game Center elements across multiple apps: achievements, details, leaderboards, and leaderboard sets.

## Signature / Usage

```bash
# Create a group
POST https://api.appstoreconnect.apple.com/v1/gameCenterGroups

# List groups
GET https://api.appstoreconnect.apple.com/v1/gameCenterGroups
```

## Options / Props

### CRUD

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/gameCenterGroups` | Add a new group |
| GET | `/v1/gameCenterGroups` | List information for all groups |
| GET | `/v1/gameCenterGroups/{id}` | Read information for a specific group |
| PATCH | `/v1/gameCenterGroups/{id}` | Edit the reference name for a group |
| DELETE | `/v1/gameCenterGroups/{id}` | Remove a group |

### Relationships

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/gameCenterGroups/{id}/gameCenterAchievementsV2` | Get achievements for a group |
| GET | `/v1/gameCenterGroups/{id}/gameCenterLeaderboardsV2` | Get leaderboards for a group |
| GET | `/v1/gameCenterGroups/{id}/gameCenterLeaderboardSetsV2` | Get leaderboard sets for a group |
| GET | `/v1/gameCenterGroups/{id}/gameCenterDetails` | Read Game Center detail information for a group |
| GET | `/v1/gameCenterGroups/{id}/gameCenterActivities` | Get activities for a group |
| GET | `/v1/gameCenterGroups/{id}/gameCenterChallenges` | Get challenge information for a group |
| PATCH | `/v1/gameCenterGroups/{id}/relationships/gameCenterAchievementsV2` | Update the achievements relationship for a group |
| PATCH | `/v1/gameCenterGroups/{id}/relationships/gameCenterLeaderboardsV2` | Update the leaderboards relationship for a group |
| PATCH | `/v1/gameCenterGroups/{id}/relationships/gameCenterLeaderboardSetsV2` | Update the leaderboard sets relationship for a group |

## Notes

- Groups let several apps share the same achievements, leaderboards, and leaderboard sets under one configuration.

## Related

- [Game Center Details](./game-center-details.md)
- [Game Center Achievements](./game-center-achievements.md)
- [Game Center Leaderboards](./game-center-leaderboards.md)
