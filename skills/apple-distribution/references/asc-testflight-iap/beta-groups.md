# Beta Groups

Groups of beta testers that have access to one or more builds. Supports public links and recruitment criteria.

## Signature / Usage

```
POST   /v1/betaGroups
GET    /v1/betaGroups
GET    /v1/betaGroups/{id}
PATCH  /v1/betaGroups/{id}
DELETE /v1/betaGroups/{id}
```

## Options / Props

### CRUD

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/betaGroups` | Create a beta group associated with an app |
| GET | `/v1/betaGroups` | Find and list beta groups for all apps |
| GET | `/v1/betaGroups/{id}` | Get a specific beta group |
| PATCH | `/v1/betaGroups/{id}` | Modify a beta group's metadata |
| DELETE | `/v1/betaGroups/{id}` | Delete a beta group |

### Relationships — Builds

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/betaGroups/{id}/relationships/builds` | Associate builds with a beta group |
| DELETE | `/v1/betaGroups/{id}/relationships/builds` | Remove builds from a beta group |
| GET | `/v1/betaGroups/{id}/builds` | List builds associated with a beta group |
| GET | `/v1/betaGroups/{id}/relationships/builds` | List build resource IDs in a beta group |

### Relationships — Testers

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/betaGroups/{id}/relationships/betaTesters` | Add beta testers to a beta group |
| DELETE | `/v1/betaGroups/{id}/relationships/betaTesters` | Remove beta testers from a beta group |
| GET | `/v1/betaGroups/{id}/betaTesters` | List beta testers in a beta group |
| GET | `/v1/betaGroups/{id}/relationships/betaTesters` | List beta tester resource IDs in a beta group |

### Metrics & Recruitment

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/betaGroups/{id}/metrics/betaTesterUsages` | Get beta tester usage metrics for a group |
| GET | `/v1/betaGroups/{id}/metrics/publicLinkUsages` | Get public link usage metrics |
| GET | `/v1/betaGroups/{id}/betaRecruitmentCriteria` | Get recruitment criteria for a beta group |
| GET | `/v1/betaGroups/{id}/betaRecruitmentCriterionCompatibleBuildCheck` | Get build compatibility info for recruitment |

## Notes

- Setting `publicLinkEnabled: true` on create/modify enables TestFlight public links.
- Deleting a beta group revokes tester access to all associated builds.

## Related

- [Beta Testers](./beta-testers.md)
- [Builds (Beta)](./builds-beta.md)
