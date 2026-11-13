---
source: https://opencode.ai/docs/api/#tag-permission
---

# Permission

Pending permission requests, saved permissions, and per-session permission request create / get / reply endpoints.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| GET | `/api/permission/request` | `permission.request.list` | List pending permission requests |
| GET | `/api/permission/saved` | `permission.saved.list` | List saved permissions |
| PATCH | `/api/permission/saved/{id}` | `permission.saved.update` | Update saved permission |
| DELETE | `/api/permission/saved/{id}` | `permission.saved.remove` | Remove saved permission |
| POST | `/api/session/{sessionID}/permission` | `session.permission.create` | Create permission request |
| GET | `/api/session/{sessionID}/permission` | `session.permission.list` | List session permission requests |
| GET | `/api/session/{sessionID}/permission/{requestID}` | `session.permission.get` | Get permission request |
| POST | `/api/session/{sessionID}/permission/{requestID}/reply` | `session.permission.reply` | Reply to pending permission request |

Excerpt from openapi.json (v2.3.0)

```json
{
  "method": "DELETE",
  "path": "/api/permission/saved/{id}",
  "tags": [
    "permission"
  ],
  "operationId": "permission.saved.remove",
  "parameters": [
    {
      "name": "id",
      "in": "path",
      "schema": {
        "$ref": "#/components/schemas/PermissionSaved.ID"
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
  "description": "Remove a saved permission by ID.",
  "summary": "Remove saved permission"
}
```

Every operation also returns 400 `InvalidRequestErrorEncoded` and 401 `UnauthorizedErrorEncoded`; only the other statuses are listed below.

## Options / Props

### permission.request.list

Retrieve pending permission requests for a location.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| location | query | object `{ directory: string \| null }` (deepObject, explode) | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Permission.Request[] }` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

### permission.saved.list

Retrieve saved permissions, optionally filtered by project.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| projectID | query | `Project.ID` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ data: PermissionSaved.Info[] }` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

### permission.saved.update

Change the action or resource of a saved permission. Fails with a conflict when the project already has a saved permission with the same action and resource.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| id | path | `PermissionSaved.ID` | yes | — |

Request body (required, application/json), `additionalProperties: false`:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| action | string \| null | no | — |
| resource | string \| null | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ data: PermissionSaved.Info }` |
| 404 | PermissionSavedNotFoundError | `PermissionSavedNotFoundErrorEncoded` |
| 409 | ConflictError | `ConflictErrorEncoded` |

### permission.saved.remove

Remove a saved permission by ID.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| id | path | `PermissionSaved.ID` | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | <No Content> | — |

### session.permission.create

Evaluate and, when approval is required, create a permission request for a session.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | `Session.ID` | yes | — |

Request body (required, application/json), `additionalProperties: false`:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | `Permission.ID` \| null | no | — |
| action | string | yes | — |
| resources | string[] | yes | — |
| save | string[] | no | — |
| metadata | object | no | — |
| source | `Permission.Source` | no | — |
| agent | `Agent.ID` \| null | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ data: { id: Permission.ID, effect: Permission.Effect } }` |
| 404 | SessionNotFoundError \| LocationNotFoundError | `SessionNotFoundErrorEncoded` \| `LocationNotFoundErrorEncoded` |

### session.permission.list

Retrieve pending permission requests owned by a session.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | `Session.ID` | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ data: Permission.Request[] }` |
| 404 | SessionNotFoundError \| LocationNotFoundError | `SessionNotFoundErrorEncoded` \| `LocationNotFoundErrorEncoded` |

### session.permission.get

Retrieve a pending permission request owned by a session.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | `Session.ID` | yes | — |
| requestID | path | `Permission.ID` | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ data: Permission.Request }` |
| 404 | SessionNotFoundError \| PermissionNotFoundError \| LocationNotFoundError | `SessionNotFoundErrorEncoded` \| `PermissionNotFoundErrorEncoded` \| `LocationNotFoundErrorEncoded` |

### session.permission.reply

Respond to a pending permission request owned by a session.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| sessionID | path | `Session.ID` | yes | — |
| requestID | path | `Permission.ID` | yes | — |

Request body (required, application/json), `additionalProperties: false`:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| decision | `Permission.Reply` | yes | — |
| message | string \| null | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | <No Content> | — |
| 404 | SessionNotFoundError \| PermissionNotFoundError \| LocationNotFoundError | `SessionNotFoundErrorEncoded` \| `PermissionNotFoundErrorEncoded` \| `LocationNotFoundErrorEncoded` |

## Notes

- OpenCode permissions are distinct from Claude Code permissions (anthropic-claude-code / anthropic-claude-code-extend / anthropic-claude-code-admin).
- The `session.permission.*` operations are tagged `permission` in the OpenAPI document but live under `/api/session/{sessionID}/permission`.

## Related

- [mcp.md](./mcp.md)
- [overview.md](./overview.md)
