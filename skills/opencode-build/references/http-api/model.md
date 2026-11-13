---
source: https://opencode.ai/docs/api/#tag-model
---

# Model

List available models and retrieve the default model.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| GET | `/api/model` | `model.list` | List models |
| GET | `/api/model/default` | `model.default` | Get default model |

Excerpt from openapi.json (v2.3.0)

```json
{
  "method": "GET",
  "path": "/api/model/default",
  "tags": [
    "model"
  ],
  "operationId": "model.default",
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
                "anyOf": [
                  {
                    "$ref": "#/components/schemas/Model.Info"
                  },
                  {
                    "type": "null"
                  }
                ]
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
  "description": "Retrieve the model used when a session has no explicit model selection.",
  "summary": "Get default model"
}
```

Both operations accept the optional `location` query parameter: object `{ directory: string | null }` (deepObject, explode), no description.

## Options / Props

### model.list

Retrieve the current snapshot of available models of the requested types, chat by default, ordered by release date within each type. The snapshot may precede initial plugin settlement.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| types | query | `Model.Type` \| `Model.Type[]` | no | Only list models of these types. Defaults to chat, the only type offered for sessions. |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Model.Info[] }` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |
| 503 | ServiceUnavailableError | `ServiceUnavailableErrorEncoded` |

### model.default

Retrieve the model used when a session has no explicit model selection.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Model.Info \| null }` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |
| 503 | ServiceUnavailableError | `ServiceUnavailableErrorEncoded` |

## Related

- [provider.md](./provider.md)
- [overview.md](./overview.md)
