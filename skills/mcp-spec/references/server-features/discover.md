---
source: https://modelcontextprotocol.io/specification/2026-07-28/server/discover
---

# server/discover

`server/discover` lets a client query a server's supported protocol versions, capabilities, and identity before sending any other requests. Servers **MUST** implement it.

## Signature / Usage

Request (no body parameters beyond the standard `_meta`):

```json
{
  "jsonrpc": "2.0",
  "id": "discover-1",
  "method": "server/discover",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientInfo": {
        "name": "ExampleClient",
        "version": "1.0.0"
      },
      "io.modelcontextprotocol/clientCapabilities": {}
    }
  }
}
```

Response (supports caching):

```json
{
  "jsonrpc": "2.0",
  "id": "discover-1",
  "result": {
    "resultType": "complete",
    "supportedVersions": ["2026-07-28"],
    "capabilities": {
      "tools": {},
      "resources": {}
    },
    "_meta": {
      "io.modelcontextprotocol/serverInfo": {
        "name": "ExampleServer",
        "version": "1.0.0"
      }
    },
    "instructions": "This server provides weather and resource utilities.",
    "ttlMs": 3600000,
    "cacheScope": "public"
  }
}
```

## Options / Props

DiscoverResult:

| Name | Type | Description |
|------|------|-------------|
| `supportedVersions` | array | Protocol versions the server supports. The client should choose one of these for subsequent requests. |
| `capabilities` | object | Capabilities the server supports (tools, resources, prompts, etc.) |
| `_meta['io.modelcontextprotocol/serverInfo']` | object | Name and version of the server software. Servers **SHOULD** include this field. |
| `instructions` | string (optional) | Natural-language guidance for LLMs on how to use this server effectively |

## Notes

- Calling `server/discover` is optional for clients: a client may invoke any RPC inline and handle `UnsupportedProtocolVersionError` if the server does not support the requested version.
- Useful for presenting server information: a client can present supported capabilities from a single response instead of probing with separate `tools/list`, `prompts/list`, and `resources/list` requests.
- stdio backward-compatibility probe: on stdio there is no per-request HTTP status code to drive fallback. A client that supports both modern (per-request `_meta`) and legacy (`initialize` handshake) servers **SHOULD** send `server/discover` first.
- `serverInfo` is self-reported and not verified by the protocol. It is intended for display, logging, and debugging. Clients **SHOULD NOT** use it to change their behavior, and **SHOULD NOT** rely on it for security decisions.
- The result is cacheable (`ttlMs` / `cacheScope`); see Caching.
- Added in 2026-07-28: `server/discover` is new (servers **MUST** implement it). It coexists with the removal of the `initialize` handshake.
- Source: tag `2026-07-28` raw (`docs/specification/2026-07-28/server/discover.mdx`).

## Related

- [Caching](./caching.md)
- [Server Features Overview](./server-overview.md)
