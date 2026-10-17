---
source: https://modelcontextprotocol.io/specification/2026-07-28/server/utilities/caching
---

# Caching (CacheableResult)

Cacheable results carry two hints, `ttlMs` and `cacheScope`, letting clients reuse responses and avoid unnecessary re-fetching. Caching is complementary to change notifications.

## Signature / Usage

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "resultType": "complete",
    "tools": [],
    "ttlMs": 300000,
    "cacheScope": "public"
  }
}
```

Freshness calculation (client records `t_received`):

```
now < t_received + ttlMs
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ttlMs` | integer (ms) | How long the client MAY consider the result fresh; analogous to HTTP `Cache-Control: max-age`. Servers **MUST** provide a value `>= 0`. |
| `cacheScope` | `"public"` or `"private"` | Intended scope of the cached response; analogous to `Cache-Control: public` / `private`. |

`cacheScope` values:

| Value | Meaning |
|-------|---------|
| `"public"` | No user-specific data. Any client, shared gateway, or caching proxy **MAY** store and serve it to any user. |
| `"private"` | Contains private data. May be reused for the same authorization context; caches **MUST NOT** be shared across authorization contexts (e.g. a different access token requires a different cache). |

## Notes

- Servers MUST include caching hints on results with `resultType: "complete"` from: `server/discover`, `tools/list`, `prompts/list`, `resources/list`, `resources/templates/list`, `resources/read`. Interim `input_required` results are not cacheable and carry no hints.
- Cache key: request method plus the parameters that affect the result (e.g. `uri` for `resources/read`, `cursor` for paginated lists). Clients **MUST NOT** serve a cached response for a different method or parameters. Results of retries carrying `inputResponses` or `requestState` **MUST NOT** be cached.
- `ttlMs` semantics: `0` means immediately stale; positive means fresh for that many ms; absent means clients **SHOULD** assume `0` (should only occur in older servers); negative means clients **SHOULD** ignore it and treat as `0`. TTL is a freshness hint, not a guarantee.
- Once TTL expires the response is stale and the client **SHOULD** re-fetch on next access. Clients **SHOULD NOT** treat TTL as a polling interval; implementations that poll **MUST** apply jitter and backoff. Clients **MAY** re-fetch early if they believe data changed, and **MAY** serve stale responses if re-fetching fails.
- Choosing scope: `"public"` for lists identical for all users; `"private"` for user-dependent `resources/read` results or per-user filtered lists.
- Notifications: a server **MAY** provide `ttlMs` without `listChanged: true`, or both. A relevant notification received while a cached response is fresh invalidates it (immediately stale).
- Pagination: each page is independently cacheable with its own `ttlMs` and clock; no cross-page consistency guarantee; if a cursor becomes invalid, clients **SHOULD** discard all cached pages and re-fetch from the beginning. Servers **MUST** apply the same `cacheScope` to all pages of a list request.
- Security: `"public"` responses may be shared between callers even from an authenticated endpoint. Servers **MUST** apply per-primitive access controls and **MUST NOT** rely on `cacheScope` alone.
- Added in 2026-07-28: `CacheableResult` (`ttlMs` / `cacheScope`, SEP-2549) is required on the listed operations.
- Source: tag `2026-07-28` raw (`docs/specification/2026-07-28/server/utilities/caching.mdx`).

## Related

- [Pagination](./pagination.md)
- [server/discover](./discover.md)
- [Tools](./tools.md)
- [Resources](./resources.md)
- [Prompts](./prompts.md)
