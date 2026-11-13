---
source: https://opencode.ai/docs/api/#tag-websearch
---

# Web Search

List registered web search providers and run a web search through a selected provider.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| GET | `/api/websearch/provider` | `websearch.providers` | List web search providers |
| POST | `/api/websearch` | `websearch.query` | Search the web |

Excerpt from openapi.json (v2.3.0)

```json
{
  "method": "POST",
  "path": "/api/websearch",
  "tags": [
    "websearch"
  ],
  "operationId": "websearch.query",
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
                "$ref": "#/components/schemas/WebSearch.ResponseEncoded"
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
  "description": "Run one web search through the selected provider. Specify a provider to override the configured default.",
  "summary": "Search the web",
  "requestBody": {
    "content": {
      "application/json": {
        "schema": {
          "type": "object",
          "properties": {
            "query": {
              "type": "string"
            },
            "providerID": {
              "$ref": "#/components/schemas/WebSearch.ID"
            }
          },
          "required": [
            "query"
          ],
          "additionalProperties": false
        }
      }
    },
    "required": true
  }
}
```

Both operations accept the optional `location` query parameter: object `{ directory: string | null }` (deepObject, explode), no description.

## Options / Props

### websearch.providers

Return the registered web search providers.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: WebSearch.Provider[] }` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |
| 503 | ServiceUnavailableError | `ServiceUnavailableErrorEncoded` |

### websearch.query

Run one web search through the selected provider. Specify a provider to override the configured default.

Request body (required, application/json), `additionalProperties: false`:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| query | string | yes | — |
| providerID | `WebSearch.ID` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: WebSearch.ResponseEncoded }` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |
| 503 | ServiceUnavailableError | `ServiceUnavailableErrorEncoded` |

## Related

- [overview.md](./overview.md)
