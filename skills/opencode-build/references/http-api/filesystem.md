---
source: https://opencode.ai/docs/api/#tag-filesystem
---

# Filesystem

Read, list, find, write, and watch files relative to a location.

## Signature / Usage

| Method | Path | operationId | Summary |
|--------|------|-------------|---------|
| GET | `/api/fs/read/*` | `fs.read` | Read file |
| GET | `/api/fs/list` | `fs.list` | List directory |
| GET | `/api/fs/find` | `fs.find` | Find files |
| POST | `/api/experimental/fs/write` | `experimental.fs.write` | Write file |
| POST | `/api/experimental/fs/watch` | `experimental.fs.watch` | Watch file |
| DELETE | `/api/experimental/fs/watch` | `experimental.fs.unwatch` | Unwatch file |

Excerpt from openapi.json (v2.3.0)

```json
{
  "method": "DELETE",
  "path": "/api/experimental/fs/watch",
  "tags": [
    "filesystem"
  ],
  "operationId": "experimental.fs.unwatch",
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
  "description": "Stop watching one file relative to the requested location. Experimental: may change without compatibility guarantees.",
  "summary": "Unwatch file",
  "requestBody": {
    "content": {
      "application/json": {
        "schema": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string",
              "description": "A file path relative to the requested location."
            }
          },
          "required": [
            "path"
          ],
          "additionalProperties": false
        }
      }
    },
    "required": true
  }
}
```

Every operation accepts the optional `location` query parameter: object `{ directory: string | null }` (deepObject, explode), no description. Every operation also returns 400 `InvalidRequestErrorEncoded` and 401 `UnauthorizedErrorEncoded`; only the other statuses are listed below.

## Options / Props

### fs.read

Stream one file relative to the requested location with ETag, Last-Modified, and single-range HTTP Range support (206 Partial Content, 416 Range Not Satisfiable, and 304 Not Modified; multi-range and malformed Range headers fall back to 200).

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | `application/octet-stream`: string (binary) |
| 404 | FileNotFoundError \| LocationNotFoundError | `FileNotFoundErrorEncoded` \| `LocationNotFoundErrorEncoded` |

### fs.list

List direct children using an absolute path or a path relative to the requested location, including parents and siblings outside its directory. Entry paths remain relative to the requested location; listing does not switch locations.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| path | query | string | no | An absolute path or a path relative to the requested location. Defaults to the location directory. |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: FileSystem.Entry[] }` |
| 404 | FileNotFoundError \| LocationNotFoundError | `FileNotFoundErrorEncoded` \| `LocationNotFoundErrorEncoded` |

### fs.find

Find recursively ranked filesystem entries relative to the requested location.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| query | query | string | yes | — |
| type | query | string enum `file` \| `directory` | no | — |
| limit | query | string | no | — |

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: FileSystem.Entry[] }` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

### experimental.fs.write

Write the raw request body to an absolute path or a path relative to the requested location, creating parent directories, and return the resolved absolute path. Unlike read, the target is not confined to the location. Experimental: may change without compatibility guarantees.

| Parameter | In | Type | Required | Description |
|-----------|----|------|----------|-------------|
| path | query | string | yes | An absolute path or a path relative to the requested location. Missing parent directories are created. |

Request body (required): `application/octet-stream`, string (binary).

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Success | object `{ location: Location.PublicRef, data: FileSystem.Write }` |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

### experimental.fs.watch

Watch one file relative to the requested location for 24 hours, publishing filesystem.changed on that location when it changes. Watching an already watched file resets its expiry. Paths follow read confinement. Experimental: may change without compatibility guarantees.

Request body (required, application/json): object `{ path: string }` (description: "A file path relative to the requested location."), `additionalProperties: false`.

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | <No Content> | — |
| 404 | FileNotFoundError \| LocationNotFoundError | `FileNotFoundErrorEncoded` \| `LocationNotFoundErrorEncoded` |
| 503 | ServiceUnavailableError | `ServiceUnavailableErrorEncoded` |

### experimental.fs.unwatch

Stop watching one file relative to the requested location. Experimental: may change without compatibility guarantees.

Request body (required, application/json): object `{ path: string }` (description: "A file path relative to the requested location."), `additionalProperties: false`.

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | <No Content> | — |
| 404 | LocationNotFoundError | `LocationNotFoundErrorEncoded` |

## Notes

- `experimental.fs.write` is not confined to the location and can write anywhere the server process can; use it only against a disposable or trusted directory.

## Related

- [vcs.md](./vcs.md)
- [event.md](./event.md)
- [overview.md](./overview.md)
