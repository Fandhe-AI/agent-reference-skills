---
source: https://modelcontextprotocol.io/specification/2026-07-28/server/utilities/pagination
---

# Pagination

List operations that may return large result sets use opaque cursor-based pagination rather than numbered pages.

## Signature / Usage

Response with a next cursor:

```json
{
  "jsonrpc": "2.0",
  "id": "123",
  "result": {
    "resultType": "complete",
    "resources": [...],
    "nextCursor": "eyJwYWdlIjogM30=",
    "ttlMs": 300000,
    "cacheScope": "public"
  }
}
```

Continuing with the cursor:

```json
{
  "jsonrpc": "2.0",
  "id": "124",
  "method": "resources/list",
  "params": {
    "cursor": "eyJwYWdlIjogMn0="
  }
}
```

## Options / Props

Operations supporting pagination:

| Method | Description |
|--------|-------------|
| `resources/list` | List available resources |
| `resources/templates/list` | List resource templates |
| `prompts/list` | List available prompts |
| `tools/list` | List available tools |

## Notes

- The cursor is an opaque string token representing a position in the result set. Page size is determined by the server; clients **MUST NOT** assume a fixed page size.
- Clients **MUST** treat cursors as opaque: do not assume a format, parse, or modify them, and make no determination other than whether a non-null value was provided. An empty string is a valid cursor and **MUST NOT** be treated as the end of results.
- Clients **SHOULD** treat a missing `nextCursor` as the end of results and support both paginated and non-paginated flows. Servers **SHOULD** provide stable cursors and handle invalid cursors gracefully.
- Invalid cursors **SHOULD** result in an error with code `-32602` (Invalid params).
- Each page is independently cacheable; see Caching.
- Every request **MUST** include the required `_meta` fields; the examples omit them for brevity.
- The cursor values in the two examples above are taken verbatim from the source and do not match; in practice the client MUST send back the exact `nextCursor` string it received, unmodified.
- Source: tag `2026-07-28` raw (`docs/specification/2026-07-28/server/utilities/pagination.mdx`).

## Related

- [Caching](./caching.md)
- [Tools](./tools.md)
- [Resources](./resources.md)
- [Prompts](./prompts.md)
