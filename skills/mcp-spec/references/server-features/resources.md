---
source: https://modelcontextprotocol.io/specification/2026-07-28/server/resources
---

# Resources

Servers expose data that provides context to language models (files, database schemas, application-specific information), each uniquely identified by a URI. Resources are application-driven.

## Signature / Usage

Capability declaration:

```json
{
  "capabilities": {
    "resources": {
      "listChanged": true,
      "subscribe": true
    }
  }
}
```

`resources/list` (supports pagination and caching):

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "resources/list",
  "params": { "cursor": "optional-cursor-value" }
}
```

Response:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "resultType": "complete",
    "resources": [
      {
        "uri": "file:///project/src/main.rs",
        "name": "main.rs",
        "title": "Rust Software Application Main File",
        "description": "Primary application entry point",
        "mimeType": "text/x-rust",
        "icons": [
          { "src": "https://example.com/rust-file-icon.png", "mimeType": "image/png", "sizes": ["48x48"] }
        ]
      }
    ],
    "nextCursor": "next-page-cursor",
    "ttlMs": 300000,
    "cacheScope": "public"
  }
}
```

`resources/read` (supports caching):

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "resources/read",
  "params": { "uri": "file:///project/src/main.rs" }
}
```

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "resultType": "complete",
    "contents": [
      {
        "uri": "file:///project/src/main.rs",
        "mimeType": "text/x-rust",
        "text": "fn main() {\n    println!(\"Hello world!\");\n}"
      }
    ],
    "ttlMs": 60000,
    "cacheScope": "private"
  }
}
```

Not-found error:

```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "error": {
    "code": -32602,
    "message": "Resource not found",
    "data": { "uri": "file:///nonexistent.txt" }
  }
}
```

## Options / Props

Resource:

| Name | Type | Description |
|------|------|-------------|
| `uri` | string | Unique identifier for the resource |
| `name` | string | The name of the resource |
| `title` | string (optional) | Human-readable name for display |
| `description` | string (optional) | Description |
| `icons` | array (optional) | Icons for display in user interfaces |
| `mimeType` | string (optional) | MIME type |
| `size` | number (optional) | Size in bytes |

Resource contents: text (`uri`, `mimeType`, `text`) or binary (`uri`, `mimeType`, `blob` base64).

Annotations (resources, resource templates, and content blocks):

| Name | Type | Description |
|------|------|-------------|
| `audience` | array | Intended audience(s): `"user"` and/or `"assistant"` |
| `priority` | number | 0.0 to 1.0; 1 means most important (effectively required), 0 least important |
| `lastModified` | string | ISO 8601 timestamp of last modification (e.g. `"2025-01-12T15:00:58Z"`) |

Common URI schemes: `https://` (servers **SHOULD** use only when the client can fetch the resource directly from the web), `file://` (filesystem-like; **MAY** use XDG MIME types such as `inode/directory`), `git://` (Git version control integration), and custom schemes (**MUST** follow RFC3986).

## Notes

- Servers that support resources **MUST** declare the `resources` capability. `listChanged` and `subscribe` are optional and independent; servers supporting neither may declare `"resources": {}`.
- `resources/list` **MAY** be empty and **MAY** change over time, but **MUST NOT** vary per-connection or as a side effect of other requests. The set **MAY** vary by the authorization presented on the request.
- Every request **MUST** include the required `_meta` fields; the examples omit them for brevity.
- Servers **MAY** return multiple contents for a single `resources/read`, and **MAY** respond with an `InputRequiredResult` (retry with `inputResponses` and `requestState`).
- Not found: servers **MUST** return `-32602` (Invalid Params); **SHOULD** return `-32603` for internal errors. Servers **MUST NOT** return an empty `contents` array for a non-existent resource. For backwards compatibility, clients **SHOULD** also accept `-32002`.
- Replaced in 2026-07-28: resource-not-found error code `-32002` replaced by `-32602`.
- Replaced in 2026-07-28: `resources/subscribe` / `resources/unsubscribe` replaced by `subscriptions/listen`; results require `resultType` and cache hints.
- Security: servers **MUST** validate all resource URIs; access controls **SHOULD** be implemented for sensitive resources; binary data **MUST** be properly encoded; resource permissions **SHOULD** be checked before operations; servers **MUST** sanitize file paths to prevent directory traversal when serving `file://` resources.
- Source: tag `2026-07-28` raw (`docs/specification/2026-07-28/server/resources.mdx`).

## Related

- [Resource Templates](./resource-templates.md)
- [Resource List Changed and Subscriptions](./resource-change-notifications.md)
- [Pagination](./pagination.md)
- [Caching](./caching.md)
