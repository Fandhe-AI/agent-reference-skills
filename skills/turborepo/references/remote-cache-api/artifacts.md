# Artifacts endpoints

Endpoints for checking status, storing, retrieving, and querying cache artifacts. All require `Authorization: Bearer <token>`.

## Signature / Usage

```bash
GET  /artifacts/status?teamId=<id>&slug=<slug>
HEAD /artifacts/{hash}
GET  /artifacts/{hash}
PUT  /artifacts/{hash}
POST /artifacts
```

Query request / response (`POST /artifacts`):

```json
{ "hashes": ["<hash>", "<hash>"] }
```

Response is a map of hash to `ArtifactInfo` (`size`, `taskDurationMs` required; `tag` optional), to `ArtifactError` (`{ "error": { "message": "..." } }`), or `null` if the artifact was not found.

## Options / Props

Shared parameters:

| Name | In | Type | Description |
| --- | --- | --- | --- |
| `hash` | path | string (`^[a-fA-F0-9]+$`, min length 1) | Content-addressable hash identifying the artifact (required on `/artifacts/{hash}`) |
| `teamId` | query | string | Team identifier for multi-tenant caches (optional) |
| `slug` | query | string | Team slug, alternative to `teamId` (optional) |
| `x-artifact-client-ci` | header | string (max 50) | CI/CD environment, e.g. `github-actions`, `circleci`, `jenkins` (optional; GET/PUT `/artifacts/{hash}`) |
| `x-artifact-client-interactive` | header | integer `0` / `1` | `1` interactive shell, `0` non-interactive (optional; GET/PUT `/artifacts/{hash}`) |

Per-endpoint behavior:

| Endpoint (operationId) | Parameters | Success response | Error responses |
| --- | --- | --- | --- |
| `GET /artifacts/status` (`getArtifactStatus`) | `teamId`, `slug` | 200 JSON `{ "status": "disabled" \| "enabled" \| "over_limit" \| "paused" }` | 400, 401, 403 |
| `HEAD /artifacts/{hash}` (`artifactExists`) | `hash`, `teamId`, `slug` | 200 headers only: `Content-Length`, `x-artifact-duration`, `x-artifact-sha`, `x-artifact-dirty-hash` | 400, 401, 403, 404 |
| `GET /artifacts/{hash}` (`downloadArtifact`) | `hash`, `teamId`, `slug`, `x-artifact-client-ci`, `x-artifact-client-interactive` | 200 `application/octet-stream` (gzip-compressed tarball); headers `Content-Length`, `x-artifact-duration`, `x-artifact-tag`, `x-artifact-sha`, `x-artifact-dirty-hash` | 400, 401, 403, 404 |
| `PUT /artifacts/{hash}` (`uploadArtifact`) | see upload headers below | 202 (accepted) or 200 JSON `{ "urls": [uri, ...] }` | 400, 401, 403 |
| `POST /artifacts` (`queryArtifacts`) | `teamId`, `slug`; JSON body `ArtifactQueryRequest` | 200 JSON `ArtifactQueryResponse` | 400, 401, 403 |

Upload headers (`PUT /artifacts/{hash}`):

| Header | Required | Type | Description |
| --- | --- | --- | --- |
| `Content-Length` | yes | integer (min 0) | Artifact size in bytes |
| `x-artifact-duration` | no | integer (min 0) | Time taken to generate the artifact in ms; stored and returned on download |
| `x-artifact-tag` | no | string (max 600) | Base64-encoded tag, typically for verification; returned as `x-artifact-tag` on download |
| `x-artifact-sha` | no | string | Git SHA of the HEAD commit when the artifact was produced; returned on download / HEAD |
| `x-artifact-dirty-hash` | no | string | Hash summarizing all uncommitted changes (staged, unstaged, untracked); returned on download / HEAD |

Error body (400 / 401 / 403 / 404) is JSON `{ "code": string, "message": string }`.

## Notes

- `status`: return `enabled` if the authenticated principal may use the cache, `disabled` if not; `over_limit` and `paused` are optional.
- `HEAD`: return 200 if the artifact exists, 404 if not; equivalent to a `GET` with no body.
- `GET`: the client verifies the `Content-Length` header against the response body size.
- `PUT`: the request body is a gzip-compressed tarball (`application/octet-stream`) of the task outputs; the server should store it and serve it on later downloads. The 200 response is described as an alternative success response to 202.
- `POST /artifacts` is optional for basic cache functionality; it lets the client query multiple artifacts in one request.
- Source: https://turborepo.dev/docs/openapi/artifacts (spec `apps/docs/lib/remote-cache-openapi.json`, vercel/turborepo tag v2.11.8).

## Related

- [overview](./overview.md)
- [events](./events.md)
