---
source: https://modelcontextprotocol.io/specification/2026-07-28/schema#discoverrequest
---

# server/discover Exchange

Client calls `server/discover` and receives supported protocol versions, capabilities and server info.

Request:

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

Response:

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
    "ttlMs": 3600000,
    "cacheScope": "public"
  }
}
```

## Notes

- Examples are reproduced from `schema/2026-07-28/examples/` (tag `2026-07-28`).
- Replaced in 2026-07-28: `initialize` / `notifications/initialized` are removed; every request carries `io.modelcontextprotocol/protocolVersion` and `io.modelcontextprotocol/clientCapabilities` in `_meta`.
- `ttlMs` / `cacheScope` come from `CacheableResult`; `resultType` is required on every result.
