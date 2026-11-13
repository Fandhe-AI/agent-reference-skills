---
source: https://opencode.ai/docs/api/#tag-command
---

# Command

List currently registered commands for a location.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| GET | `/api/command` | `command.list` | List commands |

Excerpt from openapi.json (v2.3.0)

```json
{
  "method": "GET",
  "path": "/api/command",
  "tags": [
    "command"
  ],
  "operationId": "command.list",
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
    "200": {
      "description": "Success",
      "content": {
        "application/json": {
          "schema": {
            "type": "object",
            "properties": {
              "location": {
                "$ref": "#/components/schemas/Location.PublicRef"
              },
              "data": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/Command.Info"
                }
              }
            },
            "required": [
              "location",
              "data"
            ],
            "additionalProperties": false
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
  "description": "Retrieve currently registered commands.",
  "summary": "List commands"
}
```

## Options / Props

### command.list

Retrieve currently registered commands.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| location | query | object `{ directory: string \| null }` (deepObject, explode) | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Command.Info[] }` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

## Notes

- OpenCode commands are distinct from Claude Code slash commands (anthropic-claude-code / anthropic-claude-code-extend / anthropic-claude-code-admin).

## Related

- [overview.md](./overview.md)
