---
source: https://opencode.ai/docs/api/#tag-provider
---

# Provider

List active AI providers and retrieve a single provider.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| GET | `/api/provider` | `provider.list` | List providers |
| GET | `/api/provider/{providerID}` | `provider.get` | Get provider |

Excerpt from openapi.json (v2.3.0)

```json
{
  "method": "GET",
  "path": "/api/provider",
  "tags": [
    "provider"
  ],
  "operationId": "provider.list",
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
                  "$ref": "#/components/schemas/Provider.Info"
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
  "description": "Retrieve active AI providers so clients can show provider availability and configuration.",
  "summary": "List providers"
}
```

Both operations accept the optional `location` query parameter: object `{ directory: string | null }` (deepObject, explode), no description.

## Options / Props

### provider.list

Retrieve active AI providers so clients can show provider availability and configuration.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Provider.Info[] }` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |
| 503 | ServiceUnavailableError | `ServiceUnavailableErrorEncoded` |

### provider.get

Retrieve a single AI provider so clients can inspect its availability and endpoint settings.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| providerID | path | `Provider.ID` | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Provider.Info }` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 404 | ProviderNotFoundError \| LocationNotFoundError | `ProviderNotFoundErrorEncoded` \| `LocationNotFoundErrorEncoded` |
| 503 | ServiceUnavailableError | `ServiceUnavailableErrorEncoded` |

## Related

- [model.md](./model.md)
- [integration.md](./integration.md)
- [overview.md](./overview.md)
