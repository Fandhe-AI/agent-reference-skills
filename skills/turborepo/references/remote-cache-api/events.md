# Record cache usage events

`POST /artifacts/events` records cache usage analytics events. The body is an array of cache usage events.

## Signature / Usage

```bash
POST /artifacts/events?teamId=<id>&slug=<slug>
Authorization: Bearer <token>
Content-Type: application/json

[
  {
    "sessionId": "<uuid>",
    "source": "REMOTE",
    "event": "HIT",
    "hash": "<artifact hash>",
    "duration": 1234
  }
]
```

Success response: 200 (no body). Errors: 400 / 401 / 403 with JSON `{ "code": string, "message": string }`. operationId: `recordCacheEvents` (tag `analytics`).

## Options / Props

Query / header parameters (all optional):

| Name | In | Type | Description |
| --- | --- | --- | --- |
| `teamId` | query | string | Team identifier for multi-tenant caches |
| `slug` | query | string | Team slug, alternative to `teamId` |
| `x-artifact-client-ci` | header | string (max 50) | CI/CD environment, e.g. `github-actions` |
| `x-artifact-client-interactive` | header | integer `0` / `1` | `1` interactive, `0` non-interactive |

`CacheEvent` fields:

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `sessionId` | string (uuid) | yes | Identifies the Turborepo session that generated the event |
| `source` | `LOCAL` \| `REMOTE` | yes | `LOCAL`: user's local filesystem cache; `REMOTE`: the remote cache |
| `event` | `HIT` \| `MISS` | yes | `HIT`: a cached artifact was found and used; `MISS`: none found |
| `hash` | string | yes | Artifact hash associated with the event |
| `duration` | integer (min 0) | no | Time to generate the artifact in ms; only meaningful for `HIT` events |

## Notes

- This endpoint is optional; it enables cache hit/miss analytics that implementers can use to track cache effectiveness and optimize storage.
- Source: https://turborepo.dev/docs/openapi/artifacts/record-events (spec `apps/docs/lib/remote-cache-openapi.json`, vercel/turborepo tag v2.11.8).

## Related

- [overview](./overview.md)
- [artifacts](./artifacts.md)
