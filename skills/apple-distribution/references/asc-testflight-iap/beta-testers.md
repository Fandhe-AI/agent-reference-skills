# Beta Testers

People who can install and test prerelease builds via TestFlight.

## Signature / Usage

```
POST   /v1/betaTesters
GET    /v1/betaTesters
GET    /v1/betaTesters/{id}
DELETE /v1/betaTesters/{id}
```

## Options / Props

### CRUD

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/betaTesters` | Create a beta tester assigned to a group, build, or app |
| GET | `/v1/betaTesters` | Find and list beta testers for all apps |
| GET | `/v1/betaTesters/{id}` | Get a specific beta tester |
| DELETE | `/v1/betaTesters/{id}` | Remove a beta tester's ability to test all apps |

### Relationships — Groups

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/betaTesters/{id}/relationships/betaGroups` | Add tester to one or more beta groups |
| DELETE | `/v1/betaTesters/{id}/relationships/betaGroups` | Remove tester from one or more beta groups |
| GET | `/v1/betaTesters/{id}/betaGroups` | List beta groups for a tester |
| GET | `/v1/betaTesters/{id}/relationships/betaGroups` | List beta group IDs for a tester |

### Relationships — Builds

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/betaTesters/{id}/relationships/builds` | Individually assign a tester to a build |
| DELETE | `/v1/betaTesters/{id}/relationships/builds` | Remove tester's individual access to a build |
| GET | `/v1/betaTesters/{id}/builds` | List builds individually assigned to a tester |
| GET | `/v1/betaTesters/{id}/relationships/builds` | List build IDs individually assigned to a tester |

### Relationships — Apps

| Method | Path | Description |
|--------|------|-------------|
| DELETE | `/v1/betaTesters/{id}/relationships/apps` | Remove tester's access to all builds of one or more apps |
| GET | `/v1/betaTesters/{id}/apps` | List apps a tester can test |
| GET | `/v1/betaTesters/{id}/relationships/apps` | List app IDs for a tester |

### Metrics

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/betaTesters/{id}/metrics/betaTesterUsages` | Get usage metrics for a specific tester |
| GET | `/v1/apps/{id}/metrics/betaTesterUsages` | Get usage metrics for testers of a specific app |

## Notes

- Beta testers must be assigned to an app, build, or group — anonymous testers only exist via TestFlight public links.
- `DELETE /v1/betaTesters/{id}` removes the tester from all apps globally.

## Related

- [Beta Groups](./beta-groups.md)
- [Builds (Beta)](./builds-beta.md)
