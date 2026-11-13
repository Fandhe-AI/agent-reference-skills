---
source: https://opencode.ai/docs/api/#tag-session
---

# Session API: messages and execution

HTTP API operations of the `session` tag for sending prompts, running commands and shell, compaction, interruption, context, diffs, the event log and reading messages.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| POST | `/api/session/{sessionID}/prompt` | `session.prompt` | Send message |
| POST | `/api/session/{sessionID}/command` | `session.command` | Run command |
| POST | `/api/experimental/session/{sessionID}/skill` | `experimental.session.skill` | Activate skill |
| POST | `/api/session/{sessionID}/synthetic` | `session.synthetic` | Add synthetic message |
| POST | `/api/session/{sessionID}/shell` | `session.shell` | Run shell command |
| POST | `/api/session/{sessionID}/compact` | `session.compact` | Compact session |
| POST | `/api/experimental/session/{sessionID}/wait` | `experimental.session.wait` | Wait for session |
| GET | `/api/session/{sessionID}/context` | `session.context` | Get session context |
| GET | `/api/session/{sessionID}/diff` | `session.diff` | Diff session turns |
| POST | `/api/session/{sessionID}/generate` | `session.generate` | Generate text from session context |
| GET | `/api/experimental/session/{sessionID}/log` | `experimental.session.log` | Read the session log |
| POST | `/api/session/{sessionID}/interrupt` | `session.interrupt` | Interrupt session execution |
| POST | `/api/session/{sessionID}/background` | `session.background` | Background blocking session tools |
| GET | `/api/session/{sessionID}/message/{messageID}` | `session.message.get` | Get session message |
| GET | `/api/session/{sessionID}/message` | `session.message.list` | Get session messages |

Excerpt from openapi.json (v2.3.0), operation `session.background`:

```json
  {
    "method": "POST",
    "path": "/api/session/{sessionID}/background",
    "tags": [
      "session"
    ],
    "operationId": "session.background",
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
    "description": "Move active foreground backgroundable tools for this session into background observation. Idle requests are a no-op.",
    "summary": "Background blocking session tools"
  }
```

All operations take the path parameter `sessionID` (Session.ID, required) unless noted.

## Options / Props

### session.prompt

`POST /api/session/{sessionID}/prompt` — Durably admit one session input and schedule agent-loop execution unless resume is false.

Request body (`application/json`, required):

| Name | Type | Required | Description |
|------|------|----------|-------------|
| id | Session.Message.ID \| `null` | no | — |
| text | string | yes | — |
| files | array of PromptInput.FileAttachment | no | — |
| agents | array of Prompt.AgentAttachment | no | — |
| skills | array of PromptInput.SkillAttachment | no | — |
| metadata | object | no | — |
| delivery | Session.Inbox.Delivery \| `null` | no | — |
| resume | boolean \| `null` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: Session.Inbox.User }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError \| LocationNotFoundError | SessionNotFoundErrorEncoded \| LocationNotFoundErrorEncoded |
| 409 | ConflictError | ConflictErrorEncoded |

### session.command

`POST /api/session/{sessionID}/command` — Execute a slash command callback immediately.

Request body (`application/json`, required):

| Name | Type | Required | Description |
|------|------|----------|-------------|
| name | string | yes | — |
| text | string | yes | — |
| files | array of PromptInput.FileAttachment | no | — |
| agents | array of Prompt.AgentAttachment | no | — |
| skills | array of PromptInput.SkillAttachment | no | — |
| delivery | Session.Inbox.Delivery \| `null` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | `<No Content>` | — |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError \| CommandNotFoundError \| LocationNotFoundError | SessionNotFoundErrorEncoded \| CommandNotFoundErrorEncoded \| LocationNotFoundErrorEncoded |
| 500 | CommandExecutionError | CommandExecutionErrorEncoded |

### experimental.session.skill

`POST /api/experimental/session/{sessionID}/skill` — Activate a skill for a session by appending a skill message and resuming execution.

Request body (`application/json`, required):

| Name | Type | Required | Description |
|------|------|----------|-------------|
| id | Skill.ID | yes | — |
| resume | boolean \| `null` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | `<No Content>` | — |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError \| SkillNotFoundError \| LocationNotFoundError | SessionNotFoundErrorEncoded \| SkillNotFoundErrorEncoded \| LocationNotFoundErrorEncoded |

### session.synthetic

`POST /api/session/{sessionID}/synthetic` — Durably admit synthetic session input and schedule execution unless resume is false.

Request body (`application/json`, required):

| Name | Type | Required | Description |
|------|------|----------|-------------|
| id | Session.Message.ID \| `null` | no | — |
| text | string | yes | — |
| description | string \| `null` | no | — |
| metadata | object | no | — |
| delivery | Session.Inbox.Delivery \| `null` | no | — |
| resume | boolean \| `null` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: Session.Inbox.Synthetic }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |
| 409 | ConflictError | ConflictErrorEncoded |

### session.shell

`POST /api/session/{sessionID}/shell` — Execute one shell command in the session's working directory. Emits a shell.started event before execution and a shell.ended event with the merged output after.

Request body (`application/json`, required):

| Name | Type | Required | Description |
|------|------|----------|-------------|
| id | Session.Message.ID \| `null` | no | — |
| command | string | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | `<No Content>` | — |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError \| LocationNotFoundError | SessionNotFoundErrorEncoded \| LocationNotFoundErrorEncoded |

### session.compact

`POST /api/session/{sessionID}/compact` — Durably admit a session compaction request. Steers by default: it runs at the next step boundary instead of waiting behind queued prompts.

Request body (`application/json`, required):

| Name | Type | Required | Description |
|------|------|----------|-------------|
| id | Session.Message.ID \| `null` | no | — |
| delivery | Session.Inbox.Delivery \| `null` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: Session.Inbox.Compaction }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |
| 409 | ConflictError | ConflictErrorEncoded |

### experimental.session.wait

`POST /api/experimental/session/{sessionID}/wait` — Wait for a session agent loop to become idle.

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | `<No Content>` | — |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |
| 503 | ServiceUnavailableError | ServiceUnavailableErrorEncoded |

### session.context

`GET /api/session/{sessionID}/context` — Retrieve the active context messages for a session (all messages after the last compaction).

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: Session.Message.Info[] }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |
| 500 | UnknownError | UnknownErrorEncoded |

### session.diff

`GET /api/session/{sessionID}/diff` — Structured per-file diffs of the files a turn changed. A turn runs from the first prompt after the session was last idle until its next idle marker, so prompts steered in while it was busy belong to the same turn; `to` extends the range through a later turn. Compares the range's first recorded snapshot with its last; a step still running in the active session compares against the working copy. Ranges that span a location change are rejected. In sessions without any idle marker, a prompt's turn spans until the next user message.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | Session.ID | yes | — |
| from | query | Session.Message.ID | no | User message whose turn to diff. Defaults to the turn of the newest user message. |
| to | query | Session.Message.ID | no | Later user message whose turn ends the range. Defaults to the turn of `from` alone. |
| context | query | string | no | Unchanged lines around each hunk. Omit for full-file patches. |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: FileDiff.Info[] }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | MessageNotFoundError \| SessionNotFoundError \| LocationNotFoundError | MessageNotFoundErrorEncoded \| SessionNotFoundErrorEncoded \| LocationNotFoundErrorEncoded |
| 500 | UnknownError | UnknownErrorEncoded |

### session.generate

`POST /api/session/{sessionID}/generate` — Generate transient text from the current session context without mutating session history. Its tokens and cost count toward the session's totals.

Request body (`application/json`, required):

| Name | Type | Required | Description |
|------|------|----------|-------------|
| prompt | string | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | SessionGenerateResponse | SessionGenerateResponse |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError \| LocationNotFoundError | SessionNotFoundErrorEncoded \| LocationNotFoundErrorEncoded |
| 503 | ServiceUnavailableError | ServiceUnavailableErrorEncoded |

### experimental.session.log

`GET /api/experimental/session/{sessionID}/log` — Experimental durable session event log. Reads events after an exclusive aggregate sequence and continues with live events when follow=true.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | Session.ID | yes | — |
| after | query | string | no | — |
| follow | query | `true` \| `false` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `text/event-stream`: events with `id` (string \| null), `event` (string) and `data` (SessionLogItemEncoded); stream encoding `sse`, failure event `effect/http-api/stream/failure` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |

### session.interrupt

`POST /api/session/{sessionID}/interrupt` — Interrupt active execution owned by this OpenCode process. Returns interrupted=true when an active execution was interrupted and false for the idle no-op. When resume=true, execution resumes pending steering input and next-in-line control items (manual compaction, moves) while queued prompts remain parked.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | Session.ID | yes | — |
| resume | query | `true` \| `false` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | SessionInterruptResponse | SessionInterruptResponse |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |

### session.background

`POST /api/session/{sessionID}/background` — Move active foreground backgroundable tools for this session into background observation. Idle requests are a no-op.

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | `<No Content>` | — |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |

### session.message.get

`GET /api/session/{sessionID}/message/{messageID}` — Retrieve one projected message owned by the Session.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | Session.ID | yes | — |
| messageID | path | Session.Message.ID | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: Session.Message.Info }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError \| MessageNotFoundError | SessionNotFoundErrorEncoded \| MessageNotFoundErrorEncoded |

### session.message.list

`GET /api/session/{sessionID}/message` — Retrieve projected messages for a session, optionally filtered by type. Items keep the requested order across pages; use cursor.next or cursor.previous to move through the ordered timeline, passing the same type filter on each page.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | Session.ID | yes | — |
| limit | query | string | no | Maximum number of messages to return. When omitted, the endpoint returns its default page size. |
| order | query | `asc` \| `desc` | no | Message order for the first page. Use desc for newest first or asc for oldest first. |
| cursor | query | string | no | Opaque pagination cursor returned as cursor.previous or cursor.next in the previous response. Do not combine with order. |
| type | query | `agent-switched` \| `model-switched` \| `location-switched` \| `user` \| `synthetic` \| `system` \| `skill` \| `shell` \| `assistant` \| `compaction` \| `idle` | no | Filter by message type before pagination. When omitted, all message types are returned. Pass the same type when following cursors. |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | SessionMessagesResponse | SessionMessagesResponse |
| 400 | InvalidCursorError \| InvalidRequestError | InvalidCursorErrorEncoded \| InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | SessionNotFoundError | SessionNotFoundErrorEncoded |
| 500 | UnknownError | UnknownErrorEncoded |

## Notes

- `experimental.session.skill`, `experimental.session.wait` and `experimental.session.log` live under `/api/experimental/` and are described as experimental; see `experimental.md`.
- `$ref` schema names are defined under `components.schemas` of the OpenAPI document and are not expanded here.
- OpenCode skills (`experimental.session.skill`) are distinct from Claude Code Agent Skills (anthropic-claude-code-extend) and Codex skills (openai-codex). Slash commands here are OpenCode commands, distinct from Claude Code commands (anthropic-claude-code-extend).

## Related

- [session.md](./session.md)
- [session-inbox-revert.md](./session-inbox-revert.md)
- [session-forms.md](./session-forms.md)
