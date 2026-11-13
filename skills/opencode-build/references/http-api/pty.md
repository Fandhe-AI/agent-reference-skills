---
source: https://opencode.ai/docs/api/#tag-pty
---

# PTY API

HTTP API operations of the `pty` tag for creating and managing pseudo-terminal sessions for a location, and streaming them over a WebSocket.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| GET | `/api/pty` | `pty.list` | List PTY sessions |
| POST | `/api/pty` | `pty.create` | Create PTY session |
| GET | `/api/pty/{ptyID}` | `pty.get` | Get PTY session |
| PUT | `/api/pty/{ptyID}` | `pty.update` | Update PTY session |
| DELETE | `/api/pty/{ptyID}` | `pty.remove` | Remove PTY session |
| POST | `/api/pty/{ptyID}/connect-token` | `pty.connect.token` | Create PTY WebSocket token |
| GET | `/api/pty/{ptyID}/connect` | `pty.connect` | Connect to PTY session (WebSocket) |

Excerpt from openapi.json (v2.3.0), operation `pty.remove`:

```json
  {
    "method": "DELETE",
    "path": "/api/pty/{ptyID}",
    "tags": [
      "pty"
    ],
    "operationId": "pty.remove",
    "parameters": [
      {
        "name": "ptyID",
        "in": "path",
        "schema": {
          "$ref": "#/components/schemas/Pty.ID"
        },
        "required": true
      },
      {
        "name": "location",
        "in": "query",
        "schema": {
          "type": "object",
          "properties": {
            "directory": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ]
            }
          },
          "additionalProperties": false
        },
        "required": false,
        "style": "deepObject",
        "explode": true
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
        "description": "PtyNotFoundError | LocationNotFoundError",
        "content": {
          "application/json": {
            "schema": {
              "anyOf": [
                {
                  "$ref": "#/components/schemas/PtyNotFoundErrorEncoded"
                },
                {
                  "$ref": "#/components/schemas/LocationNotFoundErrorEncoded"
                }
              ]
            }
          }
        }
      }
    },
    "description": "Terminate and remove one PTY session.",
    "summary": "Remove PTY session"
  }
```

Shared query parameter on every operation except `pty.connect`: `location` (query, optional, deepObject style, explode true) is an object `{ directory: string | null }`. `pty.connect` instead takes the query parameter `location[directory]` (string).

Response object `Pty`: `id` (Pty.ID, pattern `^pty`), `title` (string), `command` (string), `args` (string[]), `cwd` (string), `status` (`running` \| `exited`), `pid` (integer), `exitCode` (integer, optional). Required: id, title, command, args, cwd, status, pid.

## Options / Props

### pty.list

`GET /api/pty` — List PTY sessions for a location, including exited sessions retained until removal.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ location: Location.PublicRef, data: Pty[] }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | LocationNotFoundError | LocationNotFoundErrorEncoded |

### pty.create

`POST /api/pty` — Create a pseudo-terminal session for a location.

Request body (`application/json`, required):

| Name | Type | Required | Description |
|------|------|----------|-------------|
| command | string | no | — |
| args | string[] | no | — |
| cwd | string | no | — |
| title | string | no | — |
| env | object (string values) | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ location: Location.PublicRef, data: Pty }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | LocationNotFoundError | LocationNotFoundErrorEncoded |

### pty.get

`GET /api/pty/{ptyID}` — Get one PTY session, including its exit code once exited.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| ptyID | path | Pty.ID | yes | — |
| location | query | object `{ directory }` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ location: Location.PublicRef, data: Pty }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | PtyNotFoundError \| LocationNotFoundError | PtyNotFoundErrorEncoded \| LocationNotFoundErrorEncoded |

### pty.update

`PUT /api/pty/{ptyID}` — Update the title or viewport size of one PTY session.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| ptyID | path | Pty.ID | yes | — |
| location | query | object `{ directory }` | no | — |

Request body (`application/json`, required):

| Name | Type | Required | Description |
|------|------|----------|-------------|
| title | string | no | — |
| size | object `{ rows: integer > 0, cols: integer > 0 }` (both required) | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ location: Location.PublicRef, data: Pty }` |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | PtyNotFoundError \| LocationNotFoundError | PtyNotFoundErrorEncoded \| LocationNotFoundErrorEncoded |

### pty.remove

`DELETE /api/pty/{ptyID}` — Terminate and remove one PTY session.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| ptyID | path | Pty.ID | yes | — |
| location | query | object `{ directory }` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | `<No Content>` | — |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 404 | PtyNotFoundError \| LocationNotFoundError | PtyNotFoundErrorEncoded \| LocationNotFoundErrorEncoded |

### pty.connect.token

`POST /api/pty/{ptyID}/connect-token` — Create a short-lived single-use ticket for opening a PTY WebSocket connection.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| ptyID | path | Pty.ID | yes | — |
| x-opencode-ticket | header | string | no | — |
| location | query | object `{ directory }` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `{ location: Location.PublicRef, data: PtyTicket.ConnectToken }` (`ticket`: string, `expires_in`: integer > 0) |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 403 | ForbiddenError | ForbiddenErrorEncoded |
| 404 | PtyNotFoundError \| LocationNotFoundError | PtyNotFoundErrorEncoded \| LocationNotFoundErrorEncoded |

### pty.connect

`GET /api/pty/{ptyID}/connect` — Establish a WebSocket connection streaming PTY output and accepting terminal input. Marked `x-websocket: true`.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| ptyID | path | Pty.ID | yes | — |
| location[directory] | query | string | — | — |
| cursor | query | string | — | — |
| ticket | query | string | — | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | boolean |
| 400 | InvalidRequestError | InvalidRequestErrorEncoded |
| 401 | UnauthorizedError | UnauthorizedErrorEncoded |
| 403 | ForbiddenError | ForbiddenErrorEncoded |
| 404 | PtyNotFoundError \| LocationNotFoundError | PtyNotFoundErrorEncoded \| LocationNotFoundErrorEncoded |

## Notes

- Non-WebSocket operations return `{ location, data }` envelopes; the `ticket` from `pty.connect.token` is passed to `pty.connect` as the `ticket` query parameter. The spec does not state this flow in prose; it is inferred only from the parameter names and descriptions above.
- The spec marks no `required` flag on the `pty.connect` query parameters, shown as `—`.
- For server-side persistent terminals bound to a session, see `persistent-pty.md` (experimental).

## Related

- [persistent-pty.md](./persistent-pty.md)
- [session.md](./session.md)
- [experimental.md](./experimental.md)
