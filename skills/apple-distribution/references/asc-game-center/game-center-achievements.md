# Game Center Achievements

A distinction that a player earns for reaching a milestone or performing an action defined in your app. Covers the v2 achievement resource plus its localizations, images, versions, releases, and per-player submissions.

## Signature / Usage

```bash
# Create an achievement (v2)
POST https://api.appstoreconnect.apple.com/v2/gameCenterAchievements

# Read an achievement
GET https://api.appstoreconnect.apple.com/v2/gameCenterAchievements/{id}
```

## Options / Props

### Achievements (v2, current)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v2/gameCenterAchievements` | Create a Game Center achievement |
| GET | `/v2/gameCenterAchievements/{id}` | Get information about a specific achievement |
| PATCH | `/v2/gameCenterAchievements/{id}` | Update a specific achievement |
| DELETE | `/v2/gameCenterAchievements/{id}` | Delete a specific achievement |
| GET | `/v2/gameCenterAchievements/{id}/versions` | List versions for an achievement |
| PATCH | `/v2/gameCenterAchievements/{id}/relationships/activity` | Update the activity relationship |

### Localizations

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v2/gameCenterAchievementLocalizations` | Create an achievement localization |
| GET | `/v2/gameCenterAchievementLocalizations/{id}` | Read localization information |
| PATCH | `/v2/gameCenterAchievementLocalizations/{id}` | Modify a localization |
| DELETE | `/v2/gameCenterAchievementLocalizations/{id}` | Delete a localization |
| GET | `/v2/gameCenterAchievementLocalizations/{id}/image` | List images for a localization |

### Images

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v2/gameCenterAchievementImages` | Create an achievement image |
| GET | `/v2/gameCenterAchievementImages/{id}` | Read image information |
| PATCH | `/v2/gameCenterAchievementImages/{id}` | Modify an image |
| DELETE | `/v2/gameCenterAchievementImages/{id}` | Delete an image |

### Versions

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v2/gameCenterAchievementVersions` | Create an achievement version |
| GET | `/v2/gameCenterAchievementVersions/{id}` | Read version information |
| GET | `/v2/gameCenterAchievementVersions/{id}/localizations` | List localizations for a version |

### Player achievements

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/gameCenterPlayerAchievementSubmissions` | Add a new entry for a player's score for an achievement |

## Notes

- After an achievement goes live for any app version it can't be removed.
- `v1/gameCenterAchievements*`, `v1/gameCenterAchievementLocalizations*`, `v1/gameCenterAchievementImages*`, and `v1/gameCenterAchievementReleases*` are deprecated in favor of the v2 endpoints above.
- The player-achievement submission endpoint overwrites all existing data for that player — it isn't a partial update.

## Related

- [Game Center Leaderboards](./game-center-leaderboards.md)
- [Game Center Details](./game-center-details.md)
