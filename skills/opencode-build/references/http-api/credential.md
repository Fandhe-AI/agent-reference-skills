---
source: https://opencode.ai/docs/api/#tag-credential
---

# Credential

Stored integration credentials: list, create, relabel, remove, and activate.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| GET | `/api/credential` | `credential.list` | List credentials |
| POST | `/api/credential` | `credential.create` | Create credential |
| PATCH | `/api/credential/{credentialID}` | `credential.update` | Update credential |
| DELETE | `/api/credential/{credentialID}` | `credential.remove` | Remove credential |
| POST | `/api/credential/{credentialID}/activate` | `credential.activate` | Activate credential |

Excerpt from openapi.json (v2.3.0)

```json
{
  "method": "POST",
  "path": "/api/credential/{credentialID}/activate",
  "tags": [
    "credential"
  ],
  "operationId": "credential.activate",
  "parameters": [
    {
      "name": "credentialID",
      "in": "path",
      "schema": {
        "$ref": "#/components/schemas/Credential.ID"
      },
      "required": true
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
    }
  },
  "description": "Activate a stored integration credential.",
  "summary": "Activate credential"
}
```

## Options / Props

### credential.list

List every stored integration credential, including its secret value.

Parameters: none.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ data: Credential.Entry[] }` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |

### credential.create

Store an integration credential. It becomes the integration's active credential unless activate is false and the integration already has one. Fails with a conflict when the requested ID already exists, and with an invalid request when an `integration.connect` policy denies the integration.

Request body (required, application/json): `Credential.CreateInput`.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ data: Credential.Entry }` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 409 | ConflictError | `ConflictErrorEncoded` |

### credential.update

Update a stored credential label.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| credentialID | path | `Credential.ID` | yes | — |

Request body (required, application/json): object `{ label: string }`, `additionalProperties: false`.

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | <No Content> | — |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |

### credential.remove

Remove a stored integration credential.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| credentialID | path | `Credential.ID` | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | <No Content> | — |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |

### credential.activate

Activate a stored integration credential.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| credentialID | path | `Credential.ID` | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | <No Content> | — |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |

## Notes

- `credential.list` returns every stored credential including its secret value; do not log or persist the response.

## Related

- [integration.md](./integration.md)
- [overview.md](./overview.md)
