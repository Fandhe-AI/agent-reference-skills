---
source: https://opencode.ai/docs/api/#tag-vcs
---

# VCS

Version-control endpoints: repository init, branch info, review base, working-copy status, branch list, and diffs.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| POST | `/api/vcs/init` | `vcs.init` | Initialize VCS repository |
| GET | `/api/vcs` | `vcs.get` | VCS info |
| GET | `/api/vcs/base` | `vcs.base` | VCS review base |
| GET | `/api/vcs/status` | `vcs.status` | VCS status |
| GET | `/api/vcs/branch` | `vcs.branch.list` | VCS branches |
| GET | `/api/vcs/diff` | `vcs.diff` | VCS diff |

Excerpt from openapi.json (v2.3.0)

```json
{
  "method": "GET",
  "path": "/api/vcs/status",
  "tags": [
    "vcs"
  ],
  "operationId": "vcs.status",
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
                  "$ref": "#/components/schemas/Vcs.FileStatus"
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
  "description": "List uncommitted working-copy changes relative to the requested location.",
  "summary": "VCS status"
}
```

Every operation accepts the optional `location` query parameter: object `{ directory: string | null }` (deepObject, explode), no description. Every operation also returns 400 `InvalidRequestErrorEncoded` and 401 `UnauthorizedErrorEncoded`; only the other statuses are listed below.

## Options / Props

### vcs.init

Initialize a repository using the selected VCS provider in a markerless project's directory and refresh its location services. Omitting provider defaults to git; built-in git and hg providers support initialization. An unknown provider returns 400; a registered provider without init returns 501.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| provider | query | string | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | <No Content> | — |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |
| 409 | ConflictError | `ConflictErrorEncoded` |
| 501 | VcsInitNotSupportedError | `VcsInitNotSupportedErrorEncoded` |
| 503 | ServiceUnavailableError | `ServiceUnavailableErrorEncoded` |

### vcs.get

Get current and default branch information for the requested location.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Vcs.Info }` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

### vcs.base

Infer a local review base from named branch creation history, or the repository default only when currently on that branch. Returns null before the first commit or when the provider lacks base metadata; ambiguous Git history requires an explicit base on diff requests.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Vcs.Base \| null }` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |
| 503 | ServiceUnavailableError | `ServiceUnavailableErrorEncoded` |

### vcs.status

List uncommitted working-copy changes relative to the requested location.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Vcs.FileStatus[] }` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

### vcs.branch.list

List local and remote branches available at the requested location.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| search | query | string | no | — |
| limit | query | string | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: Vcs.BranchList }` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

### vcs.diff

Diff HEAD to the working copy (working), the base merge-base to the working copy (branch), or the base merge-base to HEAD (committed). Omitting base preserves repository-default comparison; supplying it overrides the comparison without saving it.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| mode | query | `Vcs.Mode` | yes | — |
| base | query | string | no | — |
| context | query | string | no | — |
| untracked | query | `Vcs.Untracked` | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: FileDiff.Info[] }` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |
| 503 | ServiceUnavailableError | `ServiceUnavailableErrorEncoded` |

## Related

- [location-project-worktree.md](./location-project-worktree.md)
- [filesystem.md](./filesystem.md)
- [overview.md](./overview.md)
