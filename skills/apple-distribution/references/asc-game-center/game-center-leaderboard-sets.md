# Game Center Leaderboard Sets

Leaderboard sets organize several leaderboards into a single unit. An app can have up to 100 leaderboard sets, each holding up to 100 leaderboards. Covers the v2 set resource plus its localizations, images, versions, releases, and member localizations.

## Signature / Usage

```bash
# Create a leaderboard set (v2)
POST https://api.appstoreconnect.apple.com/v2/gameCenterLeaderboardSets

# Add a leaderboard to a set
POST https://api.appstoreconnect.apple.com/v2/gameCenterLeaderboardSets/{id}/relationships/gameCenterLeaderboards
```

## Options / Props

### Leaderboard sets (v2, current)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v2/gameCenterLeaderboardSets` | Create a leaderboard set |
| GET | `/v2/gameCenterLeaderboardSets/{id}` | Read leaderboard set information |
| PATCH | `/v2/gameCenterLeaderboardSets/{id}` | Modify a leaderboard set |
| DELETE | `/v2/gameCenterLeaderboardSets/{id}` | Delete a leaderboard set |
| GET | `/v2/gameCenterLeaderboardSets/{id}/gameCenterLeaderboards` | List leaderboards in a set |
| POST | `/v2/gameCenterLeaderboardSets/{id}/relationships/gameCenterLeaderboards` | Add a leaderboard to a set |
| PATCH | `/v2/gameCenterLeaderboardSets/{id}/relationships/gameCenterLeaderboards` | Modify the leaderboards for a set |
| DELETE | `/v2/gameCenterLeaderboardSets/{id}/relationships/gameCenterLeaderboards` | Remove leaderboards from a set |
| GET | `/v2/gameCenterLeaderboardSets/{id}/versions` | List versions for a set |

### Localizations / Images / Versions

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v2/gameCenterLeaderboardSetLocalizations` | Create a set localization |
| POST | `/v2/gameCenterLeaderboardSetImages` | Create a set image |
| POST | `/v2/gameCenterLeaderboardSetVersions` | Create a set version |
| GET | `/v2/gameCenterLeaderboardSetVersions/{id}/localizations` | List localizations for a set version |

### Member localizations (deprecated)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/gameCenterLeaderboardSetMemberLocalizations` | Read leaderboard set member localization information |
| POST | `/v1/gameCenterLeaderboardSetMemberLocalizations` | Create a leaderboard set member localization |
| PATCH | `/v1/gameCenterLeaderboardSetMemberLocalizations/{id}` | Modify a member localization |
| DELETE | `/v1/gameCenterLeaderboardSetMemberLocalizations/{id}` | Delete a member localization |

## Notes

- At least one leaderboard must exist before creating a leaderboard set; once any set exists, all future leaderboards must be assigned into a set.
- `v1/gameCenterLeaderboardSets*` is deprecated in favor of `v2/gameCenterLeaderboardSets*`; `v1/gameCenterLeaderboardSetReleases` and `v1/gameCenterLeaderboardSetMemberLocalizations` are deprecated with no v2 replacement.

## Related

- [Game Center Leaderboards](./game-center-leaderboards.md)
- [Game Center Details](./game-center-details.md)
