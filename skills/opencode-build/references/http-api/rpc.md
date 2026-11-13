---
source: https://opencode.ai/docs/api/#tag-rpc
---

# RPC

Dispatch a method to a plugin-registered RPC at a location.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| POST | `/api/rpc/{rpcID}/{method}` | `rpc.call` | Call a plugin RPC |

Excerpt from openapi.json (v2.3.0)

```json
{
  "method": "POST",
  "path": "/api/rpc/{rpcID}/{method}",
  "tags": [
    "rpc"
  ],
  "operationId": "rpc.call",
  "parameters": [
    {
      "name": "rpcID",
      "in": "path",
      "schema": {
        "type": "string"
      },
      "required": true
    },
    {
      "name": "method",
      "in": "path",
      "schema": {
        "type": "string"
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
    "200": {
      "description": "Rpc.Output",
      "content": {
        "application/json": {
          "schema": {
            "$ref": "#/components/schemas/Rpc.Output"
          }
        }
      }
    },
    "400": {
      "description": "RpcError | InvalidRequestError",
      "content": {
        "application/json": {
          "schema": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/RpcErrorEncoded"
              },
              {
                "$ref": "#/components/schemas/InvalidRequestErrorEncoded"
              }
            ]
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
    "500": {
      "description": "RpcInternalError",
      "content": {
        "application/json": {
          "schema": {
            "$ref": "#/components/schemas/RpcInternalErrorEncoded"
          }
        }
      }
    }
  },
  "description": "Dispatch a method to the currently registered RPC at the requested location.",
  "summary": "Call a plugin RPC",
  "requestBody": {
    "content": {
      "application/json": {
        "schema": {
          "$ref": "#/components/schemas/Rpc.Input"
        }
      }
    },
    "required": true
  }
}
```

## Options / Props

### rpc.call

Dispatch a method to the currently registered RPC at the requested location.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| rpcID | path | string | yes | — |
| method | path | string | yes | — |
| location | query | object `{ directory: string \| null }` (deepObject, explode) | no | — |

Request body (required, application/json): `Rpc.Input`.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Rpc.Output | `Rpc.Output` |
| 400 | RpcError \| InvalidRequestError | `RpcErrorEncoded` \| `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |
| 500 | RpcInternalError | `RpcInternalErrorEncoded` |

## Notes

- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code / anthropic-claude-code-extend / anthropic-claude-code-admin).

## Related

- [plugin.md](./plugin.md)
- [event.md](./event.md)
