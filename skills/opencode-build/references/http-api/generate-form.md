---
source: https://opencode.ai/docs/api/#tag-generate
---

# Generate and Form

Stateless generation endpoints (text, images, decisions) and the pending-form listing.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| POST | `/api/experimental/generate/text` | `experimental.generate.text` | Generate text |
| POST | `/api/experimental/generate` | `experimental.generate.textLegacy` | Generate text (deprecated path) |
| POST | `/api/experimental/generate/image` | `experimental.generate.image` | Generate images |
| POST | `/api/experimental/generate/decisions` | `experimental.generate.decisions` | Generate decisions |
| GET | `/api/form` | `form.list` | List pending forms |

Excerpt from openapi.json (v2.3.0)

```json
{
  "method": "GET",
  "path": "/api/form",
  "tags": [
    "form"
  ],
  "operationId": "form.list",
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
                  "$ref": "#/components/schemas/Form.Info"
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
  "description": "Retrieve pending forms for a location.",
  "summary": "List pending forms"
}
```

All four generate operations share the same error responses, listed once here.

| Status | Description | Schema |
|--------|-------------|--------|
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 404 | ProviderNotFoundError \| ModelNotFoundError \| LocationNotFoundError | `ProviderNotFoundErrorEncoded` \| `ModelNotFoundErrorEncoded` \| `LocationNotFoundErrorEncoded` |
| 422 | UnsupportedModelError | `UnsupportedModelErrorEncoded` |
| 502 | ProviderRequestError | `ProviderRequestErrorEncoded` |
| 503 | ServiceUnavailableError | `ServiceUnavailableErrorEncoded` |

## Options / Props

### experimental.generate.text

Run one stateless model generation using the server's base configuration and return the assistant text. Uses the base configuration's default model when none is specified.

Request body (required, application/json): object, `additionalProperties: false`.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| prompt | string | yes | — |
| model | `Model.Ref` \| null | no | — |

Success: 200 `GenerateTextResponse`.

### experimental.generate.textLegacy

Deprecated alias of POST /api/experimental/generate/text. Marked `"deprecated": true`. Same request body (`prompt`, `model`) and 200 `GenerateTextResponse`.

### experimental.generate.image

Generate or edit images with an image model using the server's base configuration and return them as base64. Stateless: nothing is stored.

Request body (required, application/json): `Generate.ImageRequest`. Success: 200 `GenerateImageResponse`.

### experimental.generate.decisions

Ask a decision model typed predicate, choice and score questions about the input and return one probability-bearing answer per question, in question order. Stateless: nothing is stored.

Request body (required, application/json): `Generate.DecisionRequest`. Success: 200 `GenerateDecisionsResponse`.

### form.list

Retrieve pending forms for a location.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| location | query | object `{ directory: string \| null }` (deepObject, explode) | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Form.Info[] }` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

## Notes

- The generate paths live under `/api/experimental/`; the unversioned `/api/experimental/generate` path is deprecated.

## Related

- [model.md](./model.md)
- [overview.md](./overview.md)
