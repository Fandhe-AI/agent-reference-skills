---
source: https://modelcontextprotocol.io/registry/registry-aggregators
---

# Registry Aggregators

Aggregators are downstream consumers of the MCP Registry (e.g. a server marketplace with ratings and security scanning). The registry offers an unauthenticated read-only REST API for them.

## Signature / Usage

Base URL: `https://registry.modelcontextprotocol.io`

```bash
curl "https://registry.modelcontextprotocol.io/v0.1/servers?limit=100"
curl "https://registry.modelcontextprotocol.io/v0.1/servers?limit=100&cursor=com.example/my-server:1.0.0"
curl "https://registry.modelcontextprotocol.io/v0.1/servers?updated_since=2025-10-23T00:00:00.000Z"
```

Paginated response shape:

```jsonc
{
  "servers": [
    /* ... */
  ],
  "metadata": {
    "count": 100,
    "nextCursor": "com.example/my-server:1.0.0",
  },
}
```

## Options / Props

| Endpoint | Description |
| --- | --- |
| `GET /v0.1/servers` | List all servers (cursor pagination via `limit` / `cursor`; filter via `updated_since` in RFC 3339 date-time) |
| `GET /v0.1/servers/{serverName}/versions` | List all versions of a server |
| `GET /v0.1/servers/{serverName}/versions/{version}` | Get a specific version; use the special version `latest` for the latest |

## Notes

- URL path parameters such as `serverName` and `version` **must** be URL-encoded: `io.modelcontextprotocol/everything` becomes `io.modelcontextprotocol%2Feverything`.
- Aggregators are expected to scrape on a regular but infrequent basis (e.g. once per hour) and persist data in their own store. The registry does **not** provide uptime or data durability guarantees.
- Server metadata is generally immutable except `status`, which may be updated to e.g. `"deprecated"` or `"deleted"`. `"deleted"` typically indicates a moderation-policy violation (spam, malware, or illegal); aggregators may prefer to remove such servers. Keep the copy of `status` up to date.
- A subregistry is an aggregator that also implements the registry's OpenAPI spec so hosts can consume metadata through a standard interface. Subregistries can inject custom metadata via `_meta`; custom metadata should be under a key reflecting the subregistry:

```json
{
  "_meta": {
    "com.example.subregistry/custom": {
      "user_rating": 4.5,
      "download_count": 12345,
      "security_scan": {
        "last_scanned": "2025-10-23T12:00:00Z",
        "vulnerabilities_found": 0
      }
    }
  }
}
```

- Source: tag `2026-07-28` raw, retrieved 2026-10-16 (unversioned site path). Preview status: breaking changes or data resets may occur.

## Related

- [MCP Registry](./registry-about.md)
- [Registry Versioning](./registry-versioning.md)
- [server.json](./server-json.md)
