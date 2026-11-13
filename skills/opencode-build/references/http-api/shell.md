---
source: https://opencode.ai/docs/api/#tag-shell
---

# Shell

Spawn and manage non-interactive shell commands for a location and page through their captured output.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| GET | `/api/shell` | `shell.list` | List running shell commands |
| POST | `/api/shell` | `shell.create` | Run shell command |
| GET | `/api/shell/{id}` | `shell.get` | Get shell command |
| DELETE | `/api/shell/{id}` | `shell.remove` | Remove shell command |
| GET | `/api/shell/{id}/output` | `shell.output` | Read shell output |

Excerpt from openapi.json (v2.3.0)

```json
{
  "method": "DELETE",
  "path": "/api/shell/{id}",
  "tags": [
    "shell"
  ],
  "operationId": "shell.remove",
  "parameters": [
    {
      "name": "id",
      "in": "path",
      "schema": {
        "$ref": "#/components/schemas/Shell.ID"
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
      "description": "LocationNotFoundError",
      "content": {
        "application/json": {
          "schema": {
            "$ref": "#/components/schemas/LocationNotFoundErrorEncoded"
          }
        }
      }
    }
  },
  "description": "Terminate and remove one shell command and its retained output.",
  "summary": "Remove shell command"
}
```

Every operation accepts the optional `location` query parameter: object `{ directory: string | null }` (deepObject, explode), no description. Every operation also returns 400 `InvalidRequestErrorEncoded` and 401 `UnauthorizedErrorEncoded`; only the other statuses are listed below. The path parameter `id` is `Shell.ID` (required, no description).

## Options / Props

### shell.list

List currently running shell commands for a location. Exited commands are not included.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Shell.Info[] }` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

### shell.create

Spawn one non-interactive shell command for a location. Combined stdout/stderr is captured to a file pageable via output.

Request body (required, application/json), `additionalProperties: false`:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| command | string | yes | — |
| cwd | string | no | — |
| timeout | integer (0 to 9007199254740991) | no | — |
| metadata | object | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Shell.Info }` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

### shell.get

Get one shell command, including its status and exit code once exited.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Shell.Info }` |
| 404 | ShellNotFoundError \| LocationNotFoundError | `ShellNotFoundErrorEncoded` \| `LocationNotFoundErrorEncoded` |

### shell.remove

Terminate and remove one shell command and its retained output.

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | <No Content> | — |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

### shell.output

Page through captured combined output by absolute byte cursor.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| cursor | query | string (numeric pattern `^[+-]?(?:\d+(?:\.\d+)?\|\.\d+)(?:[Ee][+-]?\d+)?$`) | no | — |
| limit | query | string (same numeric pattern) | no | — |

200 response `data` object (all fields required): `output` string, `cursor` integer, `size` integer, `truncated` boolean.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: { output, cursor, size, truncated } }` |
| 404 | ShellNotFoundError \| LocationNotFoundError | `ShellNotFoundErrorEncoded` \| `LocationNotFoundErrorEncoded` |

## Notes

- `shell.create` executes an arbitrary command on the server host; call it only against a disposable or trusted environment.
- These endpoints are non-interactive shell commands. Interactive terminals belong to the pty tags, which are documented separately.

## Related

- [config.md](./config.md)
- [overview.md](./overview.md)
