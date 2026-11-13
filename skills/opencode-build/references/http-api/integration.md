---
source: https://opencode.ai/docs/api/#tag-integration
---

# Integration

Integrations and their authentication methods: listing, key / external / OAuth / command connection flows, and experimental wellknown sources.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| GET | `/api/integration` | `integration.list` | List integrations |
| GET | `/api/integration/{integrationID}` | `integration.get` | Get integration |
| POST | `/api/experimental/integration/wellknown` | `experimental.integration.wellknown.add` | Add wellknown integration |
| POST | `/api/integration/{integrationID}/connect/key` | `integration.connect.key` | Connect with key |
| POST | `/api/integration/{integrationID}/connect/external` | `integration.connect.external` | Connect with external credentials |
| POST | `/api/integration/{integrationID}/connect/oauth` | `integration.oauth.connect` | Begin OAuth connection |
| GET | `/api/integration/{integrationID}/connect/oauth/{attemptID}` | `integration.oauth.status` | Get OAuth attempt status |
| DELETE | `/api/integration/{integrationID}/connect/oauth/{attemptID}` | `integration.oauth.cancel` | Cancel OAuth connection |
| POST | `/api/integration/{integrationID}/connect/oauth/{attemptID}/complete` | `integration.oauth.complete` | Complete OAuth connection |
| POST | `/api/integration/{integrationID}/connect/command` | `integration.command.connect` | Begin command connection |
| GET | `/api/integration/{integrationID}/connect/command/{attemptID}` | `integration.command.status` | Get command attempt status |
| DELETE | `/api/integration/{integrationID}/connect/command/{attemptID}` | `integration.command.cancel` | Cancel command connection |

Excerpt from openapi.json (v2.3.0)

```json
{
  "method": "DELETE",
  "path": "/api/integration/{integrationID}/connect/oauth/{attemptID}",
  "tags": [
    "integration"
  ],
  "operationId": "integration.oauth.cancel",
  "parameters": [
    {
      "name": "integrationID",
      "in": "path",
      "schema": {
        "$ref": "#/components/schemas/Integration.ID"
      },
      "required": true
    },
    {
      "name": "attemptID",
      "in": "path",
      "schema": {
        "$ref": "#/components/schemas/Integration.AttemptID"
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
  "description": "Cancel an OAuth attempt and release its resources.",
  "summary": "Cancel OAuth connection"
}
```

Every operation accepts the optional `location` query parameter: object `{ directory: string | null }` (deepObject, explode), no description. Every operation also returns 400 `InvalidRequestErrorEncoded` and 401 `UnauthorizedErrorEncoded`; only the other statuses are listed below. Path parameters `integrationID` is `Integration.ID` and `attemptID` is `Integration.AttemptID` (both required, no description).

## Options / Props

### integration.list

Retrieve available integrations and their authentication methods.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Integration.Info[] }` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

### integration.get

Retrieve one integration and its authentication methods.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Integration.Info }` |
| 404 | IntegrationNotFoundError \| LocationNotFoundError | `IntegrationNotFoundErrorEncoded` \| `LocationNotFoundErrorEncoded` |

### experimental.integration.wellknown.add

Discover and persist an experimental wellknown integration source.

Request body (required, application/json): object `{ url: string }`, `additionalProperties: false`.

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | <No Content> | — |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

### integration.connect.key

Run a key authentication method and store the resulting credential.

Request body (required, application/json), `additionalProperties: false`:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| key | string | yes | — |
| answer | `Form.Answer` \| null | no | — |
| label | string \| null | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | <No Content> | — |
| 404 | IntegrationNotFoundError \| LocationNotFoundError | `IntegrationNotFoundErrorEncoded` \| `LocationNotFoundErrorEncoded` |

### integration.connect.external

Run an external authentication method and store a reference to its credential source.

Request body (required, application/json), `additionalProperties: false`:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| methodID | `Integration.MethodID` | yes | — |
| answer | `Form.Answer` \| null | no | — |
| label | string \| null | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | <No Content> | — |
| 404 | IntegrationNotFoundError \| LocationNotFoundError | `IntegrationNotFoundErrorEncoded` \| `LocationNotFoundErrorEncoded` |

### integration.oauth.connect

Start an OAuth attempt and return the authorization details.

Request body (required, application/json): same fields as `integration.connect.external` (`methodID` required; `answer`, `label` optional).

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Integration.AttemptEncoded }` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

### integration.oauth.status

Poll the current status of an OAuth attempt.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Integration.AttemptStatus }` |
| 404 | IntegrationNotFoundError \| IntegrationAttemptNotFoundError \| LocationNotFoundError | `IntegrationNotFoundErrorEncoded` \| `IntegrationAttemptNotFoundErrorEncoded` \| `LocationNotFoundErrorEncoded` |

### integration.oauth.cancel

Cancel an OAuth attempt and release its resources.

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | <No Content> | — |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

### integration.oauth.complete

Complete a code-based OAuth attempt and store the resulting credential. For an automatic attempt with `paste`, `code` is the redirect URL copied from the browser, and the result arrives through the attempt status.

Request body (required, application/json): object `{ code?: string | null }`, `additionalProperties: false`.

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | <No Content> | — |
| 404 | IntegrationNotFoundError \| IntegrationAttemptNotFoundError \| LocationNotFoundError | `IntegrationNotFoundErrorEncoded` \| `IntegrationAttemptNotFoundErrorEncoded` \| `LocationNotFoundErrorEncoded` |

### integration.command.connect

Start a command authentication attempt.

Request body (required, application/json), `additionalProperties: false`:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| methodID | `Integration.MethodID` | yes | — |
| label | string \| null | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Integration.CommandAttempt }` |
| 404 | IntegrationNotFoundError \| IntegrationMethodNotFoundError \| LocationNotFoundError | `IntegrationNotFoundErrorEncoded` \| `IntegrationMethodNotFoundErrorEncoded` \| `LocationNotFoundErrorEncoded` |

### integration.command.status

Poll the current status and output of a command authentication attempt.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Integration.CommandAttemptStatus }` |
| 404 | IntegrationNotFoundError \| IntegrationAttemptNotFoundError \| LocationNotFoundError | `IntegrationNotFoundErrorEncoded` \| `IntegrationAttemptNotFoundErrorEncoded` \| `LocationNotFoundErrorEncoded` |

### integration.command.cancel

Cancel a command authentication attempt and terminate its process.

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | <No Content> | — |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

## Notes

- Command authentication attempts run a process on the server; use only with trusted integration definitions.

## Related

- [credential.md](./credential.md)
- [provider.md](./provider.md)
- [overview.md](./overview.md)
