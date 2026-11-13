---
source: https://opencode.ai/docs/api/#tag-session
---

# Session API: inbox, instruction entries and revert

HTTP API operations of the `session` tag for the durable inbox, API-managed instruction entries and staged reverts.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| GET | `/api/session/{sessionID}/inbox` | `session.inbox.list` | List session inbox |
| PATCH | `/api/session/{sessionID}/inbox/{inboxID}` | `session.inbox.update` | Update inbox item |
| DELETE | `/api/session/{sessionID}/inbox/{inboxID}` | `session.inbox.cancel` | Cancel inbox input |
| GET | `/api/experimental/session/{sessionID}/instructions/entries` | `experimental.session.instructions.entry.list` | List instruction entries |
| PUT | `/api/experimental/session/{sessionID}/instructions/entries/{key}` | `experimental.session.instructions.entry.put` | Put instruction entry |
| DELETE | `/api/experimental/session/{sessionID}/instructions/entries/{key}` | `experimental.session.instructions.entry.remove` | Remove instruction entry |
| POST | `/api/session/{sessionID}/revert/stage` | `session.revert.stage` | Stage session revert |
| DELETE | `/api/session/{sessionID}/revert` | `session.revert.clear` | Clear staged revert |
| POST | `/api/session/{sessionID}/revert/commit` | `session.revert.commit` | Commit staged revert |

Excerpt from openapi.json (v2.3.0), operation `session.inbox.cancel`:

```json
  {
    "method": "DELETE",
    "path": "/api/session/{sessionID}/inbox/{inboxID}",
    "tags": [
      "session"
    ],
    "operationId": "session.inbox.cancel",
    "parameters": [
      {
        "name": "sessionID",
        "in": "path",
        "schema": {
          "$ref": "#/components/schemas/Session.ID"
        },
        "required": true
      },
      {
        "name": "inboxID",
        "in": "path",
        "schema": {
          "$ref": "#/components/schemas/Session.Message.ID"
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
    "description": "Cancel an inbox item that has not yet been delivered. Unavailable items are a no-op.",
    "summary": "Cancel inbox input"
  }
```

All operations take the path parameter `sessionID` (Session.ID, required).

## Options / Props

### session.inbox.list

`GET /api/session/{sessionID}/inbox` — List durable enqueued session work not yet delivered, ordered by enqueue sequence. Includes user, synthetic, compaction, and move items.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: Session.Inbox.Info[] }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |

### session.inbox.update

`PATCH /api/session/{sessionID}/inbox/{inboxID}` — Change a pending inbox item's delivery mode. Steering wakes session execution.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | Session.ID | yes | — |
| inboxID | path | Session.Message.ID | yes | — |

Request body (`application/json`, required):

| Name | Type | Required | Description |
|------|------|----------|-------------|
| delivery | Session.Inbox.Delivery | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | `<No Content>` | — |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |
| 409 | ConflictError | ConflictErrorEncoded |

### session.inbox.cancel

`DELETE /api/session/{sessionID}/inbox/{inboxID}` — Cancel an inbox item that has not yet been delivered. Unavailable items are a no-op.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | Session.ID | yes | — |
| inboxID | path | Session.Message.ID | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | `<No Content>` | — |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |

### experimental.session.instructions.entry.list

`GET /api/experimental/session/{sessionID}/instructions/entries` — List API-managed instruction entries attached to the session.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: InstructionEntry.Info[] }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |

### experimental.session.instructions.entry.put

`PUT /api/experimental/session/{sessionID}/instructions/entries/{key}` — Attach or replace one durable instruction entry. Changes announce as updates at the next step boundary.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | Session.ID | yes | — |
| key | path | InstructionEntry.Key | yes | — |

Request body (`application/json`, required):

| Name | Type | Required | Description |
|------|------|----------|-------------|
| value | any (no schema constraint) | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | `<No Content>` | — |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |
| 413 | InstructionEntryValueTooLargeError | InstructionEntryValueTooLargeErrorEncoded |

### experimental.session.instructions.entry.remove

`DELETE /api/experimental/session/{sessionID}/instructions/entries/{key}` — Remove one instruction entry; the removal is announced to the model at the next step boundary.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | Session.ID | yes | — |
| key | path | InstructionEntry.Key | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | `<No Content>` | — |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |

### session.revert.stage

`POST /api/session/{sessionID}/revert/stage` — Stage or move a reversible session boundary and optionally apply its file changes.

Request body (`application/json`, required):

| Name | Type | Required | Description |
|------|------|----------|-------------|
| messageID | Session.Message.ID | yes | — |
| files | boolean \| `null` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: Session.Revert }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | MessageNotFoundError \| SessionNotFoundError \| LocationNotFoundError | MessageNotFoundErrorEncoded \| SessionNotFoundErrorEncoded \| LocationNotFoundErrorEncoded |
| 409 | SessionBusyError | SessionBusyErrorEncoded |
| 500 | UnknownError | UnknownErrorEncoded |

### session.revert.clear

`DELETE /api/session/{sessionID}/revert` — Clear staged revert (no description in the spec).

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | `<No Content>` | — |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError \| LocationNotFoundError | SessionNotFoundErrorEncoded \| LocationNotFoundErrorEncoded |
| 409 | SessionBusyError | SessionBusyErrorEncoded |
| 500 | UnknownError | UnknownErrorEncoded |

### session.revert.commit

`POST /api/session/{sessionID}/revert/commit` — Commit staged revert (no description in the spec).

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | `<No Content>` | — |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |
| 409 | SessionBusyError | SessionBusyErrorEncoded |

## Notes

- The `experimental.session.instructions.entry.*` operations live under `/api/experimental/` and are described as experimental; see `experimental.md`.
- Instruction entries are API-managed per-session entries, distinct from AGENTS.md instruction files and from the Codex AGENTS.md of openai-codex.
- `$ref` schema names are defined under `components.schemas` of the OpenAPI document and are not expanded here.

## Related

- [session.md](./session.md)
- [session-messages.md](./session-messages.md)
- [session-forms.md](./session-forms.md)
