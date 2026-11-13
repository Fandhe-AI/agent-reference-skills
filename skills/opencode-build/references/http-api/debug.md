---
source: https://opencode.ai/docs/api/#tag-debug
---

# Debug

Heap snapshot and loaded-location management endpoints.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| POST | `/api/debug/heap-dump` | `debug.heapDump` | Write a heap snapshot |
| GET | `/api/debug/location` | `debug.location.list` | List loaded locations |
| DELETE | `/api/debug/location` | `debug.location.evict` | Evict a loaded location |

Excerpt from openapi.json (v2.3.0)

```json
{
  "method": "GET",
  "path": "/api/debug/location",
  "tags": [
    "debug"
  ],
  "operationId": "debug.location.list",
  "parameters": [],
  "security": [],
  "responses": {
    "200": {
      "description": "Success",
      "content": {
        "application/json": {
          "schema": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Location.PublicRef"
            }
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
  "description": "List locations currently loaded by the server.",
  "summary": "List loaded locations"
}
```

## Options / Props

### debug.heapDump

Write a JavaScript heap snapshot of the server process into its log directory, or the requested directory, and return the server-local path once the file is complete. Pauses the server while the heap serializes and can temporarily increase its memory use. The snapshot can contain credentials, prompts, and file contents.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| directory | query | string | no | Absolute server-local directory to write the snapshot into, created when missing. Defaults to the server's log directory. |

200 response body (object, all fields required, `additionalProperties: false`):

| Field | Type | Description |
|-------|------|-------------|
| path | string | — |
| pid | integer | — |
| memory | object `{ rss, heapTotal, heapUsed, external, arrayBuffers }` | The server process's memory in bytes, read just before the snapshot (Node's process.memoryUsage()). rss covers native memory the snapshot cannot show. |

Each `memory` field is a number or one of the strings `"Infinity"`, `"-Infinity"`, `"NaN"`.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object (above) |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |
| 500 | UnknownError | `UnknownErrorEncoded` |

### debug.location.list

List locations currently loaded by the server.

Parameters: none.

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `Location.PublicRef[]` |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |

### debug.location.evict

Dispose the requested location's cached services so its next use boots them fresh.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| location | query | object `{ directory: string \| null }` (deepObject, explode) | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | <No Content> | — |
| 400 | InvalidRequestError | `InvalidRequestErrorEncoded` |
| 401 | UnauthorizedError | `UnauthorizedErrorEncoded` |

## Notes

- A heap snapshot can contain credentials, prompts, and file contents; write it only to a directory you control and delete it after use.

## Related

- [location-project-worktree.md](./location-project-worktree.md)
- [overview.md](./overview.md)
