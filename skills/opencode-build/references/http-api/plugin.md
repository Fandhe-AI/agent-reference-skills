---
source: https://opencode.ai/docs/api/#tag-plugin
---

# Plugin

Server plugin listing, GUI bundle retrieval, update checks, and updates.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| GET | `/api/plugin` | `plugin.list` | List plugins |
| GET | `/api/plugin/gui` | `plugin.gui` | Read plugin GUI bundle |
| POST | `/api/plugin/check` | `plugin.check` | Check plugin updates |
| POST | `/api/plugin/update` | `plugin.update` | Update plugins |

Excerpt from openapi.json (v2.3.0)

```json
{
  "method": "POST",
  "path": "/api/plugin/update",
  "tags": [
    "plugin"
  ],
  "operationId": "plugin.update",
  "parameters": [
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
  },
  "description": "Update package plugins concurrently and notify active locations to reload them. Responds once every update has finished; fails when any update fails.",
  "summary": "Update plugins",
  "requestBody": {
    "content": {
      "application/json": {
        "schema": {
          "type": "object",
          "properties": {
            "targets": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "targets"
          ],
          "additionalProperties": false
        }
      }
    },
    "required": true
  }
}
```

All operations accept the optional `location` query parameter: object `{ directory: string | null }` (deepObject, explode), no description.

## Options / Props

### plugin.list

Retrieve enabled server plugins and their current status.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Plugin.Info[] }` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

### plugin.gui

Read an active plugin's prebuilt CommonJS `./gui-experimental` bundle. Desktop app windows run its default export; the desktop app's main process runs its `main` export. Fails with not found when no active plugin has the id or the plugin exports no `./gui-experimental`.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| id | query | `Plugin.ID` | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Plugin.GuiBundle }` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 404 | PluginNotFoundError \| LocationNotFoundError | `PluginNotFoundErrorEncoded` \| `LocationNotFoundErrorEncoded` |

### plugin.check

Check one or all package plugins for available updates.

Request body (required, application/json): object `{ target?: string | null }`.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Plugin.Info[] }` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

### plugin.update

Update package plugins concurrently and notify active locations to reload them. Responds once every update has finished; fails when any update fails.

Request body (required, application/json): object `{ targets: string[] }`.

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | <No Content> | — |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |
| 503 | ServiceUnavailableError | `ServiceUnavailableErrorEncoded` |

## Notes

- `plugin.update` changes installed plugin packages and `plugin.gui` serves a bundle that the desktop app runs; call them only from trusted clients.
- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code / anthropic-claude-code-extend / anthropic-claude-code-admin).

## Related

- [overview.md](./overview.md)
