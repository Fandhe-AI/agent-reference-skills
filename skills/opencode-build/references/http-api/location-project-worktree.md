---
source: https://opencode.ai/docs/api/#tag-location
---

# Location, Project, Worktree

Location resolution and reload, project listing and update, and worktree inventory management.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| GET | `/api/location` | `location.get` | Get location |
| POST | `/api/location/reload` | `location.reload` | Reload configuration |
| GET | `/api/project` | `project.list` | List projects |
| PATCH | `/api/project/{projectID}` | `project.update` | Update project |
| GET | `/api/worktree` | `worktree.list` | List worktrees |
| POST | `/api/worktree` | `worktree.create` | Create worktree |
| DELETE | `/api/worktree` | `worktree.remove` | Remove worktree |
| POST | `/api/worktree/refresh` | `worktree.refresh` | Refresh worktrees |

Excerpt from openapi.json (v2.3.0)

```json
{
  "method": "POST",
  "path": "/api/location/reload",
  "tags": [
    "location"
  ],
  "operationId": "location.reload",
  "parameters": [],
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
  "description": "Shut down and rebuild every loaded location. Pending permissions and forms are cancelled; running sessions continue with fresh services at the next step boundary. Emits location.shutdown for client recovery and responds once all replacement builds settle.",
  "summary": "Reload configuration"
}
```

## Options / Props

### location.get

Resolve the requested location or the server default location.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| location | query | object `{ directory: string \| null }` (deepObject, explode) | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Location.PublicInfo | `Location.PublicInfo` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

### location.reload

Shut down and rebuild every loaded location. Pending permissions and forms are cancelled; running sessions continue with fresh services at the next step boundary. Emits location.shutdown for client recovery and responds once all replacement builds settle.

Parameters: none.

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | <No Content> | — |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 503 | ServiceUnavailableError | `ServiceUnavailableErrorEncoded` |

### project.list

List known projects. Archived projects are excluded unless archived=true.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| archived | query | string enum `"true"` \| `"false"` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `Project[]` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |

### project.update

Update the project canonical directory, display metadata, and workspace commands.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| projectID | path | `Project.ID` | yes | — |

Request body (required, application/json): object, `additionalProperties: false`.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| canonical | `AbsolutePath` | no | — |
| name | string | no | — |
| icon | `Project.Icon` | no | — |
| commands | `Project.Commands` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Project | `Project` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 404 | ProjectNotFoundError | `ProjectNotFoundErrorEncoded` |

### worktree.list

Return the project's saved worktree inventory without loading configuration or running discovery.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| projectID | query | `Project.ID` | yes | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Worktree.List | `Worktree.List` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 404 | ProjectNotFoundError | `ProjectNotFoundErrorEncoded` |

### worktree.create

Load the project's canonical configuration, create a local worktree using its selected strategy, then run the project's setup script.

Request body (required, application/json): `Worktree.CreateInput`.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Worktree.Info | `Worktree.Info` |
| 400 | WorktreeError \| InvalidRequestError | `WorktreeErrorEncoded` \| `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 404 | ProjectNotFoundError | `ProjectNotFoundErrorEncoded` |

### worktree.remove

Load the project's canonical configuration and remove a saved worktree using its recorded strategy.

Request body (required, application/json): `Worktree.RemoveInput`.

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | <No Content> | — |
| 400 | WorktreeError \| InvalidRequestError | `WorktreeErrorEncoded` \| `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 404 | ProjectNotFoundError | `ProjectNotFoundErrorEncoded` |

### worktree.refresh

Load the project's canonical configuration, discover worktrees across known checkout roots using all available strategies, and reconcile saved state.

Request body (required, application/json): object `{ projectID: Project.ID }`, `additionalProperties: false`.

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | <No Content> | — |
| 400 | WorktreeError \| InvalidRequestError | `WorktreeErrorEncoded` \| `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 404 | ProjectNotFoundError | `ProjectNotFoundErrorEncoded` |

## Related

- [vcs.md](./vcs.md)
- [overview.md](./overview.md)
