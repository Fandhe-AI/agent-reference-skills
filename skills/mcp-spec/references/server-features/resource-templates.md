---
source: https://modelcontextprotocol.io/specification/2026-07-28/server/resources#resource-templates
---

# Resource Templates

Resource templates let servers expose parameterized resources using URI templates (RFC 6570) via `resources/templates/list`. Arguments may be auto-completed through the completion API.

## Signature / Usage

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "resources/templates/list",
  "params": { "cursor": "optional-cursor-value" }
}
```

Response:

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "result": {
    "resultType": "complete",
    "resourceTemplates": [
      {
        "uriTemplate": "file:///{path}",
        "name": "Project Files",
        "title": "📁 Project Files",
        "description": "Access files in the project directory",
        "mimeType": "application/octet-stream",
        "icons": [
          { "src": "https://example.com/folder-icon.png", "mimeType": "image/png", "sizes": ["48x48"] }
        ]
      }
    ],
    "nextCursor": "next-page-cursor",
    "ttlMs": 300000,
    "cacheScope": "public"
  }
}
```

## Notes

- This operation supports pagination and caching.
- Resource templates support the same annotations (`audience`, `priority`, `lastModified`) as resources.
- Completion references a template with `{"type": "ref/resource", "uri": "file:///{path}"}`.
- Every request **MUST** include the required `_meta` fields; the examples omit them for brevity.
- Results carry required `resultType` and cache hints `ttlMs` / `cacheScope` (CacheableResult) in 2026-07-28.
- Source: tag `2026-07-28` raw (`docs/specification/2026-07-28/server/resources.mdx`, section Resource Templates).

## Related

- [Resources](./resources.md)
- [Completion](./completion.md)
- [Pagination](./pagination.md)
- [Caching](./caching.md)
