---
source: https://opencode.ai/docs/api/#tag-mcp
---

# MCP

MCP server management over the HTTP API: list servers, add / remove / connect / disconnect at runtime, list resources, and attach a client-hosted MCP server over WebSocket.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| GET | `/api/mcp` | `mcp.list` | List MCP servers |
| PUT | `/api/experimental/mcp/{server}` | `experimental.mcp.add` | Add MCP server |
| DELETE | `/api/experimental/mcp/{server}` | `experimental.mcp.remove` | Remove MCP server |
| POST | `/api/experimental/mcp/{server}/connect` | `experimental.mcp.connect` | Connect MCP server |
| POST | `/api/experimental/mcp/{server}/disconnect` | `experimental.mcp.disconnect` | Disconnect MCP server |
| GET | `/api/mcp/resource` | `mcp.resource.catalog` | List MCP resources |
| POST | `/api/experimental/client-mcp/token` | `experimental.mcp.client.token` | Create client MCP WebSocket token |
| GET | `/api/experimental/client-mcp` | `experimental.mcp.client` | Attach client MCP server |

Excerpt from openapi.json (v2.3.0)

```json
{
  "method": "POST",
  "path": "/api/experimental/mcp/{server}/disconnect",
  "tags": [
    "mcp"
  ],
  "operationId": "experimental.mcp.disconnect",
  "parameters": [
    {
      "name": "server",
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
      "description": "McpServerNotFoundError | LocationNotFoundError",
      "content": {
        "application/json": {
          "schema": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/McpServerNotFoundErrorEncoded"
              },
              {
                "$ref": "#/components/schemas/LocationNotFoundErrorEncoded"
              }
            ]
          }
        }
      }
    }
  },
  "description": "Disconnect an MCP server at runtime, removing its tools until reconnected.",
  "summary": "Disconnect MCP server"
}
```

Every operation accepts the optional `location` query parameter: object `{ directory: string | null }` (deepObject, explode), no description (for `experimental.mcp.client` it has no `style` / `explode`). Every operation also returns 400 `InvalidRequestErrorEncoded` and 401 `UnauthorizedErrorEncoded`; only the other statuses are listed below.

## Options / Props

### mcp.list

Retrieve configured MCP servers and their connection status.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Mcp.Server[] }` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

### experimental.mcp.add

Add an MCP server at runtime or replace an existing one, connecting it immediately.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| server | path | string | yes | — |

Request body (required, application/json): object `{ config: Mcp.LocalConfigEncoded | Mcp.RemoteConfigEncoded }`, `additionalProperties: false`.

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | <No Content> | — |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

### experimental.mcp.remove

Stop an MCP server and remove it from the runtime set until restart.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| server | path | string | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | <No Content> | — |
| 404 | McpServerNotFoundError \| LocationNotFoundError | `McpServerNotFoundErrorEncoded` \| `LocationNotFoundErrorEncoded` |

### experimental.mcp.connect

Connect an MCP server at runtime, overriding a disabled configuration until restart.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| server | path | string | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | <No Content> | — |
| 404 | McpServerNotFoundError \| LocationNotFoundError | `McpServerNotFoundErrorEncoded` \| `LocationNotFoundErrorEncoded` |

### experimental.mcp.disconnect

Disconnect an MCP server at runtime, removing its tools until reconnected.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| server | path | string | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | <No Content> | — |
| 404 | McpServerNotFoundError \| LocationNotFoundError | `McpServerNotFoundErrorEncoded` \| `LocationNotFoundErrorEncoded` |

### mcp.resource.catalog

Retrieve resources and resource templates from connected MCP servers.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Mcp.ResourceCatalog }` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

### experimental.mcp.client.token

Create a short-lived single-use ticket for opening a client MCP WebSocket connection from a browser.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| x-opencode-ticket | header | string | no | — |
| name | query | string | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: PtyTicket.ConnectToken }` |
| 403 | ForbiddenError | `ForbiddenErrorEncoded` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

### experimental.mcp.client

Upgrade to a WebSocket over which the client hosts an MCP server named after `name`; its tools stay available while the socket is open. One JSON-RPC message per text frame. Experimental: may change without compatibility guarantees. Marked `"x-websocket": true`.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| name | query | string | yes | — |
| ticket | query | string | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | boolean |
| 403 | ForbiddenError | `ForbiddenErrorEncoded` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

## Notes

- The MCP protocol specification is covered by the `mcp-spec` skill. MCP configuration for Claude Code (anthropic-claude-code-extend) and Codex (openai-codex) is covered by their own skills.
- Runtime changes are not persisted: `experimental.mcp.remove` and `experimental.mcp.connect` last until restart, and `experimental.mcp.disconnect` lasts until the server is reconnected.
- A local MCP config passed to `experimental.mcp.add` (`command`, `cwd`, `environment`) starts a command on the server host and connects it immediately; send only definitions you trust.

## Related

- [permission.md](./permission.md)
- [overview.md](./overview.md)
