---
source: https://opencode.ai/docs/api/#tag-session
---

# Session API: lifecycle

HTTP API operations of the `session` tag for creating, listing, reading, updating, forking, moving, exporting and importing sessions. Spec: OpenAPI 3.1.0 "opencode HttpApi" version 0.0.1 ("Experimental HttpApi surface for selected instance routes.").

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| GET | `/api/session` | `session.list` | List sessions |
| POST | `/api/session` | `session.create` | Create session |
| GET | `/api/experimental/session/stats` | `experimental.session.stats` | Get session statistics |
| POST | `/api/experimental/session/import` | `experimental.session.import` | Import session |
| GET | `/api/experimental/session/{sessionID}/export` | `experimental.session.export` | Export session |
| GET | `/api/session/active` | `session.active` | List active sessions |
| GET | `/api/session/{sessionID}` | `session.get` | Get session |
| DELETE | `/api/session/{sessionID}` | `session.remove` | Delete session |
| PATCH | `/api/session/{sessionID}` | `session.update` | Update session |
| POST | `/api/session/{sessionID}/fork` | `session.fork` | Fork session |
| POST | `/api/session/{sessionID}/agent` | `session.switchAgent` | Switch session agent |
| POST | `/api/session/{sessionID}/model` | `session.switchModel` | Switch session model |
| POST | `/api/session/{sessionID}/move` | `session.move` | Move session |
| PUT | `/api/session/{sessionID}/environment` | `session.environment` | Set session environment |
| POST | `/api/session/{sessionID}/view` | `session.view` | View session |

Excerpt from openapi.json (v2.3.0), operation `session.switchAgent`:

```json
  {
    "method": "POST",
    "path": "/api/session/{sessionID}/agent",
    "tags": [
      "session"
    ],
    "operationId": "session.switchAgent",
    "parameters": [
      {
        "name": "sessionID",
        "in": "path",
        "schema": {
          "$ref": "#/components/schemas/Session.ID"
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
      "404": {
        "description": "SessionNotFoundError",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/SessionNotFoundErrorEncoded"
            }
          }
        }
      }
    },
    "description": "Switch the agent used by subsequent provider turns.",
    "summary": "Switch session agent",
    "requestBody": {
      "content": {
        "application/json": {
          "schema": {
            "type": "object",
            "properties": {
              "agent": {
                "$ref": "#/components/schemas/Agent.ID"
              }
            },
            "required": [
              "agent"
            ],
            "additionalProperties": false
          }
        }
      },
      "required": true
    }
  }
```

## Options / Props

### session.list

`GET /api/session` — Retrieve sessions in the requested order. Items keep that order across pages; use cursor.next or cursor.previous to move through the ordered list.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| limit | query | string | no | Maximum number of sessions to return. Defaults to the newest 50 sessions. |
| order | query | `asc` \| `desc` | no | Session order for the first page. Use desc for newest first or asc for oldest first. |
| search | query | string | no | — |
| parentID | query | Session.ID \| `null` | no | Filter by parent session. Use null to return only root sessions. |
| archived | query | `true` \| `false` | no | — |
| directory | query | AbsolutePath | no | — |
| project | query | Project.ID | no | — |
| subpath | query | RelativePath | no | — |
| cursor | query | SessionsCursor | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | SessionsResponse | SessionsResponse |
| 400 | InvalidCursorError \| InvalidRequestError | InvalidCursorErrorEncoded \| InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |

### session.create

`POST /api/session` — Create a session at the requested location. A parentID creates a linked child session at its parent's location.

Request body (`application/json`, required):

| Name | Type | Required | Description |
|------|------|----------|-------------|
| id | Session.ID \| `null` | no | — |
| parentID | Session.ID \| `null` | no | Set parentID to create a subagent session at the parent's location; set agent to choose its agent (otherwise it uses the default) and start it with session.prompt. After each completed round, the child sends a `<subagent>` report to the parent's inbox and wakes the parent unless it has a staged revert. |
| title | string \| `null` | no | — |
| agent | Agent.ID \| `null` | no | — |
| model | Model.Ref \| `null` | no | — |
| location | Location.PublicRef \| `null` | no | — |
| metadata | Session.Metadata \| `null` | no | — |
| permissions | Permission.Ruleset \| `null` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: Session.Info }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |

### experimental.session.stats

`GET /api/experimental/session/stats` — Aggregate local session activity, usage, and tool reliability for a time range.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| from | query | string | no | — |
| to | query | string | no | — |
| project | query | Project.ID | no | — |
| timezone | query | string | no | — |
| tools | query | `none` \| `summary` \| `detail` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: SessionStats.Info }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |

### experimental.session.import

`POST /api/experimental/session/import` — Import a projected session transcript at the requested location. Accepts transcripts exported by earlier releases. If parentID is supplied, the parent session must already exist; import parents before children.

Request body (`application/json`, required):

| Name | Type | Required | Description |
|------|------|----------|-------------|
| info | Session.Info | yes | — |
| messages | array | yes | — |
| location | Location.PublicRef \| `null` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: Session.Info }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |
| 409 | ConflictError | ConflictErrorEncoded |

### experimental.session.export

`GET /api/experimental/session/{sessionID}/export` — Export a complete projected session transcript.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | Session.ID | yes | — |
| sanitize | query | `true` \| `false` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: SessionTransfer.Data }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |
| 500 | UnknownError | UnknownErrorEncoded |

### session.active

`GET /api/session/active` — Retrieve foreground Session drains currently owned by this OpenCode process. Sessions absent from the result are inactive.

No parameters.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: object }` whose keys match `^ses` and whose values are SessionActive |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |

### session.get

`GET /api/session/{sessionID}` — Retrieve a session by ID.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | Session.ID | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: Session.Info }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |

### session.remove

`DELETE /api/session/{sessionID}` — Delete a session and its child sessions.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | Session.ID | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | `<No Content>` | — |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |

### session.update

`PATCH /api/session/{sessionID}` — Update mutable session properties.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | Session.ID | yes | — |

Request body (`application/json`, required):

| Name | Type | Required | Description |
|------|------|----------|-------------|
| title | string \| `null` | no | — |
| metadata | Session.Metadata \| `null` | no | — |
| permissions | Permission.Ruleset \| `null` | no | — |
| archived | boolean \| `null` | no | Archive the session with true or restore it with false. Repeating the current state is a no-op. |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | `<No Content>` | — |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError \| LocationNotFoundError | SessionNotFoundErrorEncoded \| LocationNotFoundErrorEncoded |

### session.fork

`POST /api/session/{sessionID}/fork` — Create a child session by copying projected history before a message. Omit before to copy the full history.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | Session.ID | yes | — |

Request body (`application/json`, required):

| Name | Type | Required | Description |
|------|------|----------|-------------|
| before | Session.Message.ID \| `null` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: Session.Info }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError \| MessageNotFoundError | SessionNotFoundErrorEncoded \| MessageNotFoundErrorEncoded |

### session.switchAgent

`POST /api/session/{sessionID}/agent` — Switch the agent used by subsequent provider turns.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | Session.ID | yes | — |

Request body (`application/json`, required):

| Name | Type | Required | Description |
|------|------|----------|-------------|
| agent | Agent.ID | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | `<No Content>` | — |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |

### session.switchModel

`POST /api/session/{sessionID}/model` — Switch the model used by subsequent provider turns.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | Session.ID | yes | — |

Request body (`application/json`, required):

| Name | Type | Required | Description |
|------|------|----------|-------------|
| model | Model.Ref | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | `<No Content>` | — |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |

### session.move

`POST /api/session/{sessionID}/move` — Move a session to another project directory at the requested delivery boundary.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | Session.ID | yes | — |

Request body (`application/json`, required):

| Name | Type | Required | Description |
|------|------|----------|-------------|
| directory | AbsolutePath | yes | — |
| delivery | Session.Inbox.Delivery \| `null` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | `<No Content>` | — |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |

### session.environment

`PUT /api/session/{sessionID}/environment` — Replace the process environment used by local shell commands for this session.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | Session.ID | yes | — |

Request body (`application/json`, required):

| Name | Type | Required | Description |
|------|------|----------|-------------|
| variables | object (string values) | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | `<No Content>` | — |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |

### session.view

`POST /api/session/{sessionID}/view` — Mark the idle transition observed by the viewer as viewed.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | Session.ID | yes | — |

Request body (`application/json`, required):

| Name | Type | Required | Description |
|------|------|----------|-------------|
| idle | number | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | `<No Content>` | — |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |

## Notes

- `experimental.session.stats`, `experimental.session.import` and `experimental.session.export` carry the `session` tag but live under `/api/experimental/`; treat them as unstable (see `experimental.md`).
- `$ref` schema names (for example `Session.Info`, `Session.ID`) are defined under `components.schemas` of the OpenAPI document and are not expanded here.
- This is the OpenCode server HTTP API. The Claude Code and Codex products have different server surfaces (anthropic-claude-code, openai-codex).

## Related

- [session-messages.md](./session-messages.md)
- [session-inbox-revert.md](./session-inbox-revert.md)
- [session-forms.md](./session-forms.md)
- [experimental.md](./experimental.md)
- [pty.md](./pty.md)
