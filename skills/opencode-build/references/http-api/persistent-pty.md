---
source: https://opencode.ai/docs/api/#tag-persistentpty
---

# Persistent PTY API (experimental)

HTTP API operations of the `persistentPty` tag (operationId prefix `experimental.persistentPty.`) for session-bound persistent terminals served through the OpenCode server.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| GET | `/api/experimental/session/{sessionID}/terminal/read` | `experimental.persistentPty.read` | Read the session's most recently controlled terminal |
| GET | `/api/experimental/session/{sessionID}/terminal` | `experimental.persistentPty.list` | — |
| POST | `/api/experimental/session/{sessionID}/terminal` | `experimental.persistentPty.create` | — |
| POST | `/api/experimental/persistent-pty/shutdown` | `experimental.persistentPty.shutdown` | — |
| POST | `/api/experimental/persistent-pty/handoff` | `experimental.persistentPty.handoff` | — |
| GET | `/api/experimental/persistent-pty/{ptyID}` | `experimental.persistentPty.get` | — |
| PUT | `/api/experimental/persistent-pty/{ptyID}` | `experimental.persistentPty.update` | — |
| DELETE | `/api/experimental/persistent-pty/{ptyID}` | `experimental.persistentPty.remove` | — |
| GET | `/api/experimental/persistent-pty/{ptyID}/snapshot` | `experimental.persistentPty.snapshot` | — |
| POST | `/api/experimental/persistent-pty/{ptyID}/connect-token` | `experimental.persistentPty.connectToken` | — |
| GET | `/api/experimental/persistent-pty/{ptyID}/connect` | `experimental.persistentPty.connect` | Connect to a persistent PTY (WebSocket) |

Excerpt from openapi.json (v2.3.0), operation `experimental.persistentPty.remove`:

```json
  {
    "method": "DELETE",
    "path": "/api/experimental/persistent-pty/{ptyID}",
    "tags": [
      "persistentPty"
    ],
    "operationId": "experimental.persistentPty.remove",
    "parameters": [
      {
        "name": "ptyID",
        "in": "path",
        "schema": {
          "$ref": "#/components/schemas/Pty.ID"
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
        "description": "PtyNotFoundError",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/PtyNotFoundErrorEncoded"
            }
          }
        }
      },
      "503": {
        "description": "ServiceUnavailableError",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/ServiceUnavailableErrorEncoded"
            }
          }
        }
      }
    }
  }
```

Schemas (from `components.schemas`):

| Schema | Fields |
|--------|--------|
| PersistentPty.Info | id (Pty.ID), title, command, args (string[]), cwd, status (`running` \| `exited`), pid (integer), exitCode (integer, optional), sessionID (Session.ID), userTitle (string \| null), foregroundProcess (string \| null), size `{ cols, rows }`, output `{ head, tail }` (integers) |
| PersistentPty.CreateInput | command (string, optional), args (string[], required), cwd (optional), title (string, required), env (object of strings, required), size `{ cols, rows }` (optional) |
| PersistentPty.UpdateInput | attachmentID (string, optional), size `{ cols, rows }` (optional), title (string \| null, optional) |
| PersistentPty.ReadResult | ptyID, title, cwd, foregroundProcess (string \| null), screen `{ text, cols, rows, cursor: { x, y } }` |
| PersistentPty.Snapshot | info (PersistentPty.Info), text, checkpoint (base64 byte string), cursor `{ x, y }` |
| PersistentPty.Handoff | directory, instanceID, ticket (strings), expiresAt (number) |

## Options / Props

### experimental.persistentPty.read

`GET /api/experimental/session/{sessionID}/terminal/read` — Read the last physical rows without changing selection or taking control. Omitted lines uses the live terminal height; larger counts include retained history. Blank rows are preserved. Screen dimensions and cursor remain relative to the live screen. Returns null when no current terminal exists. Selection is server-local and resets on restart. Experimental: may change without compatibility guarantees.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | Session.ID | yes | — |
| lines | query | string | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: PersistentPty.ReadResult \| null }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 503 | ServiceUnavailableError | ServiceUnavailableErrorEncoded |

### experimental.persistentPty.list

`GET /api/experimental/session/{sessionID}/terminal` — (no summary or description in the spec)

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | Session.ID | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: PersistentPty.Info[] }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 503 | ServiceUnavailableError | ServiceUnavailableErrorEncoded |

### experimental.persistentPty.create

`POST /api/experimental/session/{sessionID}/terminal` — (no summary or description in the spec)

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | Session.ID | yes | — |

Request body (`application/json`, required): PersistentPty.CreateInput

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: PersistentPty.Info }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 503 | ServiceUnavailableError | ServiceUnavailableErrorEncoded |

### experimental.persistentPty.shutdown

`POST /api/experimental/persistent-pty/shutdown` — (no summary or description in the spec)

No parameters.

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | `<No Content>` | — |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 503 | ServiceUnavailableError | ServiceUnavailableErrorEncoded |

### experimental.persistentPty.handoff

`POST /api/experimental/persistent-pty/handoff` — (no summary or description in the spec)

No parameters.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ handoff: PersistentPty.Handoff \| null }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 503 | ServiceUnavailableError | ServiceUnavailableErrorEncoded |

### experimental.persistentPty.get

`GET /api/experimental/persistent-pty/{ptyID}` — (no summary or description in the spec)

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| ptyID | path | Pty.ID | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: PersistentPty.Info }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | PtyNotFoundError | PtyNotFoundErrorEncoded |
| 503 | ServiceUnavailableError | ServiceUnavailableErrorEncoded |

### experimental.persistentPty.update

`PUT /api/experimental/persistent-pty/{ptyID}` — Resize when size is present and rename when title is present; a null title clears the user title so the shell's title shows again. Renaming fails with 501 while the terminal service predates renaming.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| ptyID | path | Pty.ID | yes | — |

Request body (`application/json`, required): PersistentPty.UpdateInput

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: PersistentPty.Info }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | PtyNotFoundError | PtyNotFoundErrorEncoded |
| 501 | PtyFeatureUnsupportedError | PtyFeatureUnsupportedErrorEncoded |
| 503 | ServiceUnavailableError | ServiceUnavailableErrorEncoded |

### experimental.persistentPty.remove

`DELETE /api/experimental/persistent-pty/{ptyID}` — (no summary or description in the spec)

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| ptyID | path | Pty.ID | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | `<No Content>` | — |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | PtyNotFoundError | PtyNotFoundErrorEncoded |
| 503 | ServiceUnavailableError | ServiceUnavailableErrorEncoded |

### experimental.persistentPty.snapshot

`GET /api/experimental/persistent-pty/{ptyID}/snapshot` — (no summary or description in the spec)

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| ptyID | path | Pty.ID | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: PersistentPty.Snapshot }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | PtyNotFoundError | PtyNotFoundErrorEncoded |
| 503 | ServiceUnavailableError | ServiceUnavailableErrorEncoded |

### experimental.persistentPty.connectToken

`POST /api/experimental/persistent-pty/{ptyID}/connect-token` — (no summary or description in the spec)

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| ptyID | path | Pty.ID | yes | — |
| x-opencode-ticket | header | string | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ data: PtyTicket.ConnectToken }` (`ticket`: string, `expires_in`: integer > 0) |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 403 | ForbiddenError | ForbiddenErrorEncoded |
| 404 | PtyNotFoundError | PtyNotFoundErrorEncoded |
| 503 | ServiceUnavailableError | ServiceUnavailableErrorEncoded |

### experimental.persistentPty.connect

`GET /api/experimental/persistent-pty/{ptyID}/connect` — Stream persistent PTY output through the OpenCode server. Marked `x-websocket: true`.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| ptyID | path | Pty.ID | yes | — |
| cursor | query | string | — | — |
| role | query | string | — | — |
| attachment_id | query | string | — | — |
| takeover | query | string | — | — |
| input_protocol | query | string | — | — |
| ticket | query | string | — | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | boolean |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 403 | ForbiddenError | ForbiddenErrorEncoded |
| 404 | PtyNotFoundError | PtyNotFoundErrorEncoded |
| 503 | ServiceUnavailableError | ServiceUnavailableErrorEncoded |

## Notes

- Experimental and unstable: the spec states "Experimental: may change without compatibility guarantees." on the read operation, and every operation here is under `/api/experimental/`.
- The spec marks no `required` flag on the `connect` query parameters, shown as `—`.
- Unlike the `pty` tag (see `pty.md`), these operations do not take a `location` query parameter and respond with `{ data }` envelopes.

## Related

- [pty.md](./pty.md)
- [session.md](./session.md)
- [experimental.md](./experimental.md)
