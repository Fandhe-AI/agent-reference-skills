# Game Center Leaderboards

Leaderboards let players compare scores against other players in the same game. Covers the v2 leaderboard resource plus its images, localizations, versions, releases, and score submissions.

## Signature / Usage

```bash
# Create a leaderboard (v2)
POST https://api.appstoreconnect.apple.com/v2/gameCenterLeaderboards

# Submit a player's score
POST https://api.appstoreconnect.apple.com/v1/gameCenterLeaderboardEntrySubmissions
```

## Options / Props

### Leaderboards (v2, current)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v2/gameCenterLeaderboards` | Create a leaderboard |
| GET | `/v2/gameCenterLeaderboards/{id}` | Read leaderboard information |
| PATCH | `/v2/gameCenterLeaderboards/{id}` | Modify a leaderboard |
| DELETE | `/v2/gameCenterLeaderboards/{id}` | Delete a leaderboard |
| GET | `/v2/gameCenterLeaderboards/{id}/versions` | List versions for a leaderboard |
| PATCH | `/v2/gameCenterLeaderboards/{id}/relationships/activity` | Modify the activity for a leaderboard |
| PATCH | `/v2/gameCenterLeaderboards/{id}/relationships/challenge` | Modify the challenge for a leaderboard |

### Images

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v2/gameCenterLeaderboardImages` | Create a leaderboard image |
| GET | `/v2/gameCenterLeaderboardImages/{id}` | Read image information |
| PATCH | `/v2/gameCenterLeaderboardImages/{id}` | Modify an image |
| DELETE | `/v2/gameCenterLeaderboardImages/{id}` | Delete an image |

### Localizations

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v2/gameCenterLeaderboardLocalizations` | Create a localization |
| GET | `/v2/gameCenterLeaderboardLocalizations/{id}` | Read localization information |
| PATCH | `/v2/gameCenterLeaderboardLocalizations/{id}` | Modify a localization |
| DELETE | `/v2/gameCenterLeaderboardLocalizations/{id}` | Delete a localization |
| GET | `/v2/gameCenterLeaderboardLocalizations/{id}/image` | List images for a localization |

### Versions

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v2/gameCenterLeaderboardVersions` | Create a leaderboard version |
| GET | `/v2/gameCenterLeaderboardVersions/{id}` | Read version information |
| GET | `/v2/gameCenterLeaderboardVersions/{id}/localizations` | List localizations for a version |

### Scores

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/gameCenterLeaderboardEntrySubmissions` | Add a new score for a player to a leaderboard |

### Score Moderation (4.5)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v2/gameCenterLeaderboards/{id}/gameCenterScoreModerations` | List the score moderations for a leaderboard |
| PATCH | `/v1/gameCenterScoreModerations/{id}` | Block or unblock a score submitted to a leaderboard (`GameCenterScoreModerationUpdateRequest`) |

#### Query parameters — list score moderations

| Parameter | Type | Description |
|-----------|------|-------------|
| `exists[blocked]` | boolean | Filter the returned score moderations to include only those that are blocked (true) or not blocked (false) |
| `fields[gameCenterScoreModerations]` | [string] | One of `rank`, `score`, `submittedDate`, `blocked`, `preReleased`, `context`, `challengeIds`, `player` |
| `fields[gameCenterDetailPlayers]` | [string] | One of `nickname`, `blocked`, `bundleId` |
| `include` | [string] | `player` |
| `limit` | integer | The maximum number of score moderation resources to return |

#### GameCenterScoreModeration attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `blocked` | boolean | A Boolean value that indicates whether the score is blocked from the leaderboard |
| `challengeIds` | [string] | The identifiers of the challenges the score completes |
| `context` | number | A developer-defined 64-bit value the game stores with the score, as a string. This value doesn't affect ranking |
| `preReleased` | boolean | A Boolean value that indicates whether the player submitted the score to a prerelease version of the game |
| `rank` | number | The rank of the score on the leaderboard, as a string representation of a 64-bit integer |
| `score` | number | The score value the player submitted to the leaderboard, as a string representation of a 64-bit integer |
| `submittedDate` | date-time | The date and time when the player submitted the score |

## Notes

- Blocking a score removes it from the leaderboard, and unblocking reinstates it (`PATCH /v1/gameCenterScoreModerations/{id}`).
- `v1/gameCenterLeaderboards*` (including `groupLeaderboard`, `localizations`, `releases`) is deprecated in favor of `v2/gameCenterLeaderboards*`; `v1/gameCenterLeaderboardReleases` is likewise deprecated with no v2 replacement.
- The score submission endpoint overwrites the player's existing score and requires `GKPlayer.gamePlayerID` from GameKit.

## Related

- [Game Center Leaderboard Sets](./game-center-leaderboard-sets.md)
- [Game Center Achievements](./game-center-achievements.md)
- [Game Center Challenges](./game-center-challenges.md)
