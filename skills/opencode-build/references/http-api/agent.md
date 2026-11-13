---
source: https://opencode.ai/docs/api/#tag-agent
---

# Agent

List and retrieve currently registered agents for a location.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| GET | `/api/agent` | `agent.list` | List agents |
| GET | `/api/agent/{agentID}` | `agent.get` | Get agent |

Excerpt from openapi.json (v2.3.0)

```json
{
  "method": "GET",
  "path": "/api/agent",
  "tags": [
    "agent"
  ],
  "operationId": "agent.list",
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
                  "$ref": "#/components/schemas/Agent.Info"
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
  "description": "Retrieve currently registered agents.",
  "summary": "List agents"
}
```

## Options / Props

### agent.list

Retrieve currently registered agents.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| location | query | object `{ directory: string \| null }` (deepObject, explode) | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Agent.Info[] }` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

### agent.get

Retrieve a single currently registered agent.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| agentID | path | `Agent.ID` | yes | — |
| location | query | object `{ directory: string \| null }` (deepObject, explode) | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Agent.Info }` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 404 | AgentNotFoundError \| LocationNotFoundError | `AgentNotFoundErrorEncoded` \| `LocationNotFoundErrorEncoded` |

## Notes

- OpenCode agents are distinct from Claude Code subagents (anthropic-claude-code / anthropic-claude-code-extend / anthropic-claude-code-admin).

## Related

- [overview.md](./overview.md)
