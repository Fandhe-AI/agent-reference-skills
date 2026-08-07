# Game Center Matchmaking Rules

Fine-grained control over automatch: rules (JMESPath-based expressions) are grouped into rule sets, rule sets govern queues, and teams/testing/metrics support rule development.

## Signature / Usage

```bash
# Create a rule set, then add rules and teams to it
POST https://api.appstoreconnect.apple.com/v1/gameCenterMatchmakingRuleSets
POST https://api.appstoreconnect.apple.com/v1/gameCenterMatchmakingRules
POST https://api.appstoreconnect.apple.com/v1/gameCenterMatchmakingTeams

# Test a rule set against sample match requests
POST https://api.appstoreconnect.apple.com/v1/gameCenterMatchmakingRuleSetTests
```

## Options / Props

### Rules

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/gameCenterMatchmakingRules` | Add a matchmaking rule to a rule set |
| PATCH | `/v1/gameCenterMatchmakingRules/{id}` | Update a matchmaking rule |
| DELETE | `/v1/gameCenterMatchmakingRules/{id}` | Delete a matchmaking rule |

### Rule sets

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/gameCenterMatchmakingRuleSets` | Create a rule set |
| GET | `/v1/gameCenterMatchmakingRuleSets/{id}` | Get a rule set and its related objects |
| PATCH | `/v1/gameCenterMatchmakingRuleSets/{id}` | Update a rule set |
| DELETE | `/v1/gameCenterMatchmakingRuleSets/{id}` | Delete a rule set (and its rules and teams) |
| GET | `/v1/gameCenterMatchmakingRuleSets/{id}/matchmakingQueues` | Get queues that belong to a rule set |
| GET | `/v1/gameCenterMatchmakingRuleSets/{id}/rules` | Get the rules in a rule set |
| GET | `/v1/gameCenterMatchmakingRuleSets/{id}/teams` | Get the teams in a rule set |

### Queues

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/gameCenterMatchmakingQueues` | Create a queue and add it to a rule set |
| GET | `/v1/gameCenterMatchmakingQueues/{id}` | Get a queue and its related objects |
| PATCH | `/v1/gameCenterMatchmakingQueues/{id}` | Update a queue |
| DELETE | `/v1/gameCenterMatchmakingQueues/{id}` | Delete a queue |

### Teams

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/gameCenterMatchmakingTeams` | Add a game-specific team to a rule set |
| PATCH | `/v1/gameCenterMatchmakingTeams/{id}` | Modify a team |
| DELETE | `/v1/gameCenterMatchmakingTeams/{id}` | Delete a team |

### Testing & metrics

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/gameCenterMatchmakingRuleSetTests` | Apply a rule set to sample match requests |
| GET | `/v1/gameCenterDetails/{id}/metrics/ruleBasedMatchmakingRequests` | Match requests that use matchmaking rules |
| GET | `/v1/gameCenterMatchmakingRules/{id}/metrics/matchmakingBooleanRuleResults` | Results of Boolean-typed rules |
| GET | `/v1/gameCenterMatchmakingRules/{id}/metrics/matchmakingNumberRuleResults` | Results of numeric-typed rules |
| GET | `/v1/gameCenterMatchmakingRules/{id}/metrics/matchmakingRuleErrors` | Errors for a specific rule |
| GET | `/v1/gameCenterMatchmakingQueues/{id}/metrics/matchmakingQueueSizes` | Time match requests spend in a queue |
| GET | `/v1/gameCenterMatchmakingQueues/{id}/metrics/matchmakingSessions` | Session information for a queue |

## Notes

- Rule expressions are JMESPath-formatted strings extended with matchmaking-specific functions (e.g., `areCompatibleAppVersions(requests[0], requests[1])`, `geoLatency(requests[0], requests[1])`); they evaluate over `players`, `requests`, and (for team rules) `teams` input arrays and must return a Boolean or number depending on rule type.
- Deleting a rule set also deletes its rules and teams.

## Related

- [Game Center Details](./game-center-details.md)
