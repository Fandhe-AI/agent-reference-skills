# Builds (Beta)

Manage builds for TestFlight beta distribution: assign groups and individual testers, inspect beta state, and retrieve usage metrics.

## Signature / Usage

```
GET   /v1/builds
GET   /v1/builds/{id}
PATCH /v1/builds/{id}
```

## Options / Props

### Core Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/builds` | List builds for all apps |
| GET | `/v1/builds/{id}` | Read information for a specific build |
| PATCH | `/v1/builds/{id}` | Expire a build or change encryption exemption setting |
| GET | `/v1/builds/{id}/app` | Read the app for a build |
| GET | `/v1/builds/{id}/preReleaseVersion` | Read the prerelease version of a build |

### Beta Group Access

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/builds/{id}/relationships/betaGroups` | Add beta groups access to a build |
| DELETE | `/v1/builds/{id}/relationships/betaGroups` | Remove beta groups access from a build |

### Individual Tester Access

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/builds/{id}/relationships/individualTesters` | Assign individual testers to a build |
| DELETE | `/v1/builds/{id}/relationships/individualTesters` | Remove individual testers from a build |
| GET | `/v1/builds/{id}/individualTesters` | List individual testers for a build |
| GET | `/v1/builds/{id}/relationships/individualTesters` | List individual tester IDs for a build |

### Beta Details & Status

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/builds/{id}/buildBetaDetail` | Read build beta details (internal/external state) |
| GET | `/v1/builds/{id}/betaAppReviewSubmission` | Read beta review submission for a build |
| GET | `/v1/builds/{id}/relationships/betaAppReviewSubmission` | Get beta review submission ID for a build |
| GET | `/v1/builds/{id}/betaBuildLocalizations` | List beta build localizations for a build |
| GET | `/v1/builds/{id}/metrics/betaBuildUsages` | Read usage metrics for a beta build |

### Build Beta Details (sub-resource)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/buildBetaDetails` | List build beta details for all builds |
| GET | `/v1/buildBetaDetails/{id}` | Get specific build beta details |
| PATCH | `/v1/buildBetaDetails/{id}` | Update beta test details for a build |
| GET | `/v1/buildBetaDetails/{id}/build` | Get the build for build beta details |

## Notes

- `ExternalBetaState` / `InternalBetaState` indicate availability for external/internal testers.
- Use `PATCH /v1/builds/{id}` with `expired: true` to expire a build immediately.
- `BuildBetaDetail` controls whether internal and external testers can install the build.

## Related

- [Beta Groups](./beta-groups.md)
- [Beta Testers](./beta-testers.md)
- [Beta App Review](./beta-app-review.md)
- [Beta Build Localizations](./beta-build-localizations.md)
