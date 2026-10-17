---
source: https://modelcontextprotocol.io/specification/2026-07-28/schema#listrootsrequest
---

# roots/list types

Schema types for `roots/list`: `ListRootsRequest`, `ListRootsResult`, `Root`. The whole category is Deprecated as of 2026-07-28 (SEP-2577).

## Signature / Usage

```ts
/**
 * Sent from the server to request a list of root URIs from the client. Roots allow
 * servers to ask for specific directories or files to operate on. A common example
 * for roots is providing a set of repositories or directories a server should operate
 * on.
 *
 * This request is typically used when the server needs to understand the file system
 * structure or access specific locations that the client has permission to read from.
 *
 * @deprecated Deprecated as of protocol version 2026-07-28 (SEP-2577).
 * Remains in the specification for at least twelve months; see the
 * deprecated features registry.
 */
export interface ListRootsRequest {
  method: "roots/list";
  params?: {
    _meta?: MetaObject;
  };
}

/**
 * The result returned by the client for a {@link ListRootsRequest | roots/list} request.
 * This result contains an array of {@link Root} objects, each representing a root directory
 * or file that the server can operate on.
 */
export interface ListRootsResult {
  roots: Root[];
}

/** Represents a root directory or file that the server can operate on. */
export interface Root {
  /**
   * The URI identifying the root. This *must* start with `file://` for now.
   * This restriction may be relaxed in future versions of the protocol to allow
   * other URI schemes.
   *
   * @format uri
   */
  uri: string;
  /**
   * An optional name for the root. This can be used to provide a human-readable
   * identifier for the root, which may be useful for display purposes or for
   * referencing the root in other parts of the application.
   */
  name?: string;

  _meta?: MetaObject;
}
```

Result (`examples/ListRootsResult/single-root-directory.json`):

```json
{
  "roots": [
    {
      "uri": "file:///home/user/projects/myproject",
      "name": "My Project"
    }
  ]
}
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Root.uri` | `string` (uri) | yes | MUST start with `file://` for now |
| `Root.name` | `string` | no | Human-readable name |
| `ListRootsResult.roots` | `Root[]` | yes | Roots the server can operate on |

## Notes

- Deprecated in 2026-07-28 (earliest removal: first revision on or after 2027-07-28): Roots (SEP-2577).
- Removed in 2026-07-28: `notifications/roots/list_changed`.
- Replaced in 2026-07-28: server-initiated `roots/list` is carried by MRTR `inputRequests`; `ListRootsRequest` does not extend `JSONRPCRequest` here.
- Source: tag `2026-07-28`, `schema/2026-07-28/schema.ts`. `@example` / `{@includeCode}` directives omitted.

## Related

- [Multi Round-Trip types](./mrtr-types.md)
- [server/discover types](./discover-types.md)
