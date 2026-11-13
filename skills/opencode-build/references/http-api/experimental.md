---
source: https://opencode.ai/docs/api/#tag-experimental
---

# Experimental API

HTTP API operations of the `experimental` tag: media blobs, schedules, artifacts and background jobs. All of them are unstable and may change without notice.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| GET | `/api/experimental/media/{hash}` | `experimental.media.get` | Read media blob |
| POST | `/api/experimental/schedule` | `experimental.schedule.create` | Create schedule |
| GET | `/api/experimental/schedule` | `experimental.schedule.list` | List schedules |
| GET | `/api/experimental/schedule/{scheduleID}` | `experimental.schedule.get` | Get schedule |
| DELETE | `/api/experimental/schedule/{scheduleID}` | `experimental.schedule.delete` | Delete schedule |
| POST | `/api/experimental/schedule/{scheduleID}/pause` | `experimental.schedule.pause` | Pause schedule |
| POST | `/api/experimental/schedule/{scheduleID}/resume` | `experimental.schedule.resume` | Resume schedule |
| GET | `/api/experimental/artifacts/providers` | `experimental.artifacts.providers` | List artifact providers |
| GET | `/api/experimental/artifacts` | `experimental.artifacts.list` | List artifacts |
| POST | `/api/experimental/artifacts` | `experimental.artifacts.create` | Create artifact |
| GET | `/api/experimental/artifacts/{artifactID}` | `experimental.artifacts.get` | Read artifact |
| PATCH | `/api/experimental/artifacts/{artifactID}` | `experimental.artifacts.update` | Update artifact |
| DELETE | `/api/experimental/artifacts/{artifactID}` | `experimental.artifacts.delete` | Delete artifact |
| GET | `/api/experimental/artifacts/{artifactID}/view/*` | `experimental.artifacts.view` | View local artifact |
| GET | `/api/experimental/job` | `experimental.job.list` | List background jobs |

Excerpt from openapi.json (v2.3.0), operation `experimental.schedule.delete`:

```json
  {
    "method": "DELETE",
    "path": "/api/experimental/schedule/{scheduleID}",
    "tags": [
      "experimental"
    ],
    "operationId": "experimental.schedule.delete",
    "parameters": [
      {
        "name": "scheduleID",
        "in": "path",
        "schema": {
          "$ref": "#/components/schemas/Schedule.ID"
        },
        "required": true
      }
    ],
    "security": [],
    "responses": {
      "204": {
        "description": "<No Content>"
      },
      "400": {
        "description": "InvalidRequestError",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/InvalidRequestErrorEncoded"
            }
          }
        }
      },
      "401": {
        "description": "UnauthorizedError",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/UnauthorizedErrorEncoded"
            }
          }
        }
      },
      "403": {
        "description": "ForbiddenError",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/ForbiddenErrorEncoded"
            }
          }
        }
      },
      "404": {
        "description": "ScheduleNotFoundError",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/ScheduleNotFoundErrorEncoded"
            }
          }
        }
      }
    },
    "description": "Delete a schedule. Experimental: needs experimental.schedules in the Session's config and may change without notice.",
    "summary": "Delete schedule"
  }
```

Artifact operations take an optional `location` query parameter (object `{ directory: string | null }`, no `style` set in the spec) and return `{ location: Location.PublicRef, data }`.

## Options / Props

### experimental.media.get

`GET /api/experimental/media/{hash}` — Read a content-addressed media blob by SHA-256 hash with immutable Cache-Control, ETag, and 304 Not Modified support. Only blobs a stored message or inbox item still references are served. Experimental: may change without compatibility guarantees.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| hash | path | MediaHash | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `application/octet-stream` (binary) |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | FileNotFoundError | FileNotFoundErrorEncoded |

### experimental.schedule.create

`POST /api/experimental/schedule` — Schedule a prompt that wakes the Session once after a delay, at a time, every interval, or on a cron. Experimental: needs experimental.schedules in the Session's config and may change without notice.

Request body (`application/json`, required): Schedule.CreatePayload

| Name | Type | Required | Description |
|------|------|----------|-------------|
| sessionID | Session.ID | yes | — |
| name | string | no | — |
| when | Schedule.WhenInput | no | — |
| if | Schedule.ConditionInput | no | — |
| until | Schedule.ConditionInput | no | — |
| ends | Schedule.Ends (`after`: Schedule.Duration, `at`: string, `times`: integer > 0; all optional) | no | — |
| prompt | string (minLength 1) | yes | The message the Session receives when the schedule wakes. |

Schedule.Duration is a string; its description reads: A duration such as "90 seconds", "5 minutes" or "2 hours".

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: Schedule.Info }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 403 | ForbiddenError | ForbiddenErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |

### experimental.schedule.list

`GET /api/experimental/schedule` — List a Session's schedules, oldest first. Experimental: needs experimental.schedules in the Session's config and may change without notice.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | query | Session.ID | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: Schedule.Info[] }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 403 | ForbiddenError | ForbiddenErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |

### experimental.schedule.get

`GET /api/experimental/schedule/{scheduleID}` — Read one schedule. Experimental: needs experimental.schedules in the Session's config and may change without notice.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| scheduleID | path | Schedule.ID (pattern `^sch_`) | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: Schedule.Info }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 403 | ForbiddenError | ForbiddenErrorEncoded |
| 404 | ScheduleNotFoundError | ScheduleNotFoundErrorEncoded |

### experimental.schedule.delete

`DELETE /api/experimental/schedule/{scheduleID}` — Delete a schedule. Experimental: needs experimental.schedules in the Session's config and may change without notice.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| scheduleID | path | Schedule.ID | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | `<No Content>` | — |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 403 | ForbiddenError | ForbiddenErrorEncoded |
| 404 | ScheduleNotFoundError | ScheduleNotFoundErrorEncoded |

### experimental.schedule.pause

`POST /api/experimental/schedule/{scheduleID}/pause` — Stop a schedule from firing until it is resumed. Experimental: needs experimental.schedules in the Session's config and may change without notice.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| scheduleID | path | Schedule.ID | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: Schedule.Info }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 403 | ForbiddenError | ForbiddenErrorEncoded |
| 404 | ScheduleNotFoundError | ScheduleNotFoundErrorEncoded |

### experimental.schedule.resume

`POST /api/experimental/schedule/{scheduleID}/resume` — Resume a paused schedule. A one-shot that fell due while paused fires once; a repeating schedule resumes at its next slot. Experimental: needs experimental.schedules in the Session's config and may change without notice.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| scheduleID | path | Schedule.ID | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: Schedule.Info }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 403 | ForbiddenError | ForbiddenErrorEncoded |
| 404 | ScheduleNotFoundError | ScheduleNotFoundErrorEncoded |

### experimental.artifacts.providers

`GET /api/experimental/artifacts/providers` — Return active artifact providers and default. Experimental: needs experimental.artifacts in the Location's config and may change without notice.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| location | query | object `{ directory }` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ location, data: Artifact.Provider[] }` (Artifact.Provider: `id`, `name`, `capabilities`: Artifact.Capability[], `default`: boolean) |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 403 | ForbiddenError | ForbiddenErrorEncoded |
| 404 | LocationNotFoundError | LocationNotFoundErrorEncoded |
| 503 | ServiceUnavailableError | ServiceUnavailableErrorEncoded |

### experimental.artifacts.list

`GET /api/experimental/artifacts` — List published artifacts, newest update first. Experimental: needs experimental.artifacts in the Location's config and may change without notice.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| location | query | object `{ directory }` | no | — |
| sessionID | query | Session.ID | no | — |
| provider | query | string | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ location, data: Artifact.Info[] }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 403 | ForbiddenError | ForbiddenErrorEncoded |
| 404 | SessionNotFoundError \| LocationNotFoundError | SessionNotFoundErrorEncoded \| LocationNotFoundErrorEncoded |
| 503 | ServiceUnavailableError | ServiceUnavailableErrorEncoded |

### experimental.artifacts.create

`POST /api/experimental/artifacts` — Publish a new artifact through the selected or default artifact provider. Experimental: needs experimental.artifacts in the Location's config and may change without notice.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| location | query | object `{ directory }` | no | — |

Request body (`application/json`, required): Artifact.CreateInput

| Name | Type | Required | Description |
|------|------|----------|-------------|
| title | string | yes | — |
| files | object (string values) | yes | — |
| entry | string | no | — |
| provider | string | no | — |
| sessionID | Session.ID | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ location, data: Artifact.Info }` (`id`, `provider`, `sessionID`, `title`, `entry`, `url`, `time: { created, updated }`) |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 403 | ForbiddenError | ForbiddenErrorEncoded |
| 404 | ProviderNotFoundError \| SessionNotFoundError \| LocationNotFoundError | ProviderNotFoundErrorEncoded \| SessionNotFoundErrorEncoded \| LocationNotFoundErrorEncoded |
| 503 | ServiceUnavailableError | ServiceUnavailableErrorEncoded |

### experimental.artifacts.get

`GET /api/experimental/artifacts/{artifactID}` — Read an artifact's metadata and file contents. Experimental: needs experimental.artifacts in the Location's config and may change without notice.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| artifactID | path | Artifact.ID (pattern `^art_`) | yes | — |
| location | query | object `{ directory }` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ location, data: Artifact.Content }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 403 | ForbiddenError | ForbiddenErrorEncoded |
| 404 | ArtifactNotFoundError \| LocationNotFoundError | ArtifactNotFoundErrorEncoded \| LocationNotFoundErrorEncoded |
| 503 | ServiceUnavailableError | ServiceUnavailableErrorEncoded |

### experimental.artifacts.update

`PATCH /api/experimental/artifacts/{artifactID}` — Replace an artifact's files at the same ID and URL. Experimental: needs experimental.artifacts in the Location's config and may change without notice.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| artifactID | path | Artifact.ID | yes | — |
| location | query | object `{ directory }` | no | — |

Request body (`application/json`, required): Artifact.UpdateInput

| Name | Type | Required | Description |
|------|------|----------|-------------|
| title | string | no | — |
| files | object (string values) | yes | — |
| entry | string | no | — |
| sessionID | Session.ID | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ location, data: Artifact.Info }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 403 | ForbiddenError | ForbiddenErrorEncoded |
| 404 | SessionNotFoundError \| ArtifactNotFoundError \| LocationNotFoundError | SessionNotFoundErrorEncoded \| ArtifactNotFoundErrorEncoded \| LocationNotFoundErrorEncoded |
| 503 | ServiceUnavailableError | ServiceUnavailableErrorEncoded |

### experimental.artifacts.delete

`DELETE /api/experimental/artifacts/{artifactID}` — Remove an artifact and its stored files. Experimental: needs experimental.artifacts in the Location's config and may change without notice.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| artifactID | path | Artifact.ID | yes | — |
| location | query | object `{ directory }` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | `<No Content>` | — |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 403 | ForbiddenError | ForbiddenErrorEncoded |
| 404 | ArtifactNotFoundError \| LocationNotFoundError | ArtifactNotFoundErrorEncoded \| LocationNotFoundErrorEncoded |
| 503 | ServiceUnavailableError | ServiceUnavailableErrorEncoded |

### experimental.artifacts.view

`GET /api/experimental/artifacts/{artifactID}/view/*` — Serve HTML and static files from the local provider. Experimental: needs experimental.artifacts in the Location's config and may change without notice.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| artifactID | path | Artifact.ID | yes | — |
| location | query | object `{ directory }` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `application/octet-stream` (binary) |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 403 | ForbiddenError | ForbiddenErrorEncoded |
| 404 | FileNotFoundError \| ArtifactNotFoundError \| LocationNotFoundError | FileNotFoundErrorEncoded \| ArtifactNotFoundErrorEncoded \| LocationNotFoundErrorEncoded |
| 503 | ServiceUnavailableError | ServiceUnavailableErrorEncoded |

### experimental.job.list

`GET /api/experimental/job` — List active and unconsumed background jobs, optionally filtered by owning session, descendants, or kind. Experimental: may change without compatibility guarantees.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | query | Session.ID | no | Filter to background jobs owned by this session. |
| kind | query | Job.Kind | no | Filter by background job kind (shell, subagent, or image). |
| status | query | Job.Status | no | Filter by job status (running, completed, error, or cancelled). |
| descendants | query | `true` \| `false` | no | When sessionID is set, also include background jobs owned by child and nested subagent sessions. |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: Job.Info[] }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |

## Notes

- Unstable API: every operation here is under `/api/experimental/`. The spec states "may change without notice" or "may change without compatibility guarantees" on each; schedules require `experimental.schedules` in the Session's config and artifacts require `experimental.artifacts` in the Location's config.
- `$ref` schema names are defined under `components.schemas` of the OpenAPI document and are not expanded here.
- Schedules here are OpenCode session schedules, distinct from Claude Code routines (anthropic-claude-code-extend).

## Related

- [session.md](./session.md)
- [persistent-pty.md](./persistent-pty.md)
- [pty.md](./pty.md)
