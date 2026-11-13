---
source: https://opencode.ai/docs/api/#tag-config
---

# Config

Read configuration documents, list available shells, and patch the global configuration document.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| GET | `/api/config` | `config.get` | Get configuration |
| GET | `/api/config/shell` | `config.shells` | List available shells |
| PATCH | `/api/experimental/config` | `experimental.config.update` | Update global configuration |

Excerpt from openapi.json (v2.3.0)

```json
{
  "method": "GET",
  "path": "/api/config/shell",
  "tags": [
    "config"
  ],
  "operationId": "config.shells",
  "parameters": [],
  "security": [],
  "responses": {
    "200": {
      "description": "Success",
      "content": {
        "application/json": {
          "schema": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ConfigShell.Option"
            }
          }
        }
      }
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
  "description": "Return shells available to terminal and agent execution.",
  "summary": "List available shells"
}
```

## Options / Props

### config.get

Return configuration documents and discovery sources for the requested location, from lowest to highest priority.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| location | query | object `{ directory: string \| null }` (deepObject, explode) | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `Config.Entry[]` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

### config.shells

Return shells available to terminal and agent execution.

Parameters: none.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `ConfigShell.Option[]` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

### experimental.config.update

Patch supported fields in the highest-precedence global configuration document.

Request body (required, application/json): `Config.Patch`.

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | <No Content> | — |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

## Related

- [location-project-worktree.md](./location-project-worktree.md)
- [overview.md](./overview.md)
