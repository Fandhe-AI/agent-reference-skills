---
source: https://opencode.ai/docs/api/#tag-server
---

# Server

Server identity and pairing endpoints: server info, pairing-code creation, and pairing-code redemption.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| GET | `/api/info` | `server.info` | Get server info |
| POST | `/api/pair` | `server.pair` | Create pairing code |
| GET | `/auth/connect/{code}` | `server.connect` | Redeem pairing code |

Excerpt from openapi.json (v2.3.0)

```json
{
  "method": "GET",
  "path": "/api/info",
  "tags": [
    "server"
  ],
  "operationId": "server.info",
  "parameters": [],
  "security": [],
  "responses": {
    "200": {
      "description": "ServerInfo",
      "content": {
        "application/json": {
          "schema": {
            "$ref": "#/components/schemas/ServerInfo"
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
    }
  },
  "description": "Return the server identity, connection URLs, paths, and readiness status.",
  "summary": "Get server info"
}
```

## Options / Props

### server.info

Return the server identity, connection URLs, paths, and readiness status.

Parameters: none.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | ServerInfo | `ServerInfo` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |

### server.pair

Create a short-lived, single-use code for a /auth/connect/:code pairing link.

Parameters: none.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | PairingCode | `PairingCode` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |

### server.connect

Redeem a pairing code. Browsers receive a session cookie and a redirect to the web app; requests that accept JSON receive a session token to use as the password.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| code | path | string | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | PairingSession | `PairingSession` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |

## Notes

- Schemas (`ServerInfo`, `PairingCode`, `PairingSession`, error types) are defined under `components.schemas` of `packages/protocol/openapi.json`.
- The `/auth/connect/{code}` path is outside the `/api` prefix.
- Treat pairing codes and the session token returned by `server.connect` as credentials; do not log or share them.

## Related

- [overview.md](./overview.md)
