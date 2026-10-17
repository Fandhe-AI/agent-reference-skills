---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http#backward-compatibility
---

# Transport Backward Compatibility (HTTP+SSE)

How Streamable HTTP clients and servers interoperate with `initialize`-based legacy versions, earlier Streamable HTTP revisions, and the deprecated 2024-11-05 HTTP+SSE transport.

## Signature / Usage

Legacy server responses a modern client must tell apart from modern errors (`400`, `404`, `405` with a body that is not a recognized modern JSON-RPC error):

```text
1. POST request to server URL (with Accept: application/json, text/event-stream)
   - success                      -> Streamable HTTP server
   - 400 / 404 / 405 and body is not a recognized modern JSON-RPC error
       -> GET server URL, expect an SSE stream whose first event is `endpoint`
       -> old HTTP+SSE transport; use it for all subsequent communication
```

## Notes

- Era detection: a client supporting both modern and `initialize`-based versions **MAY** attempt a modern request first. On `400 Bad Request` it **SHOULD** inspect the body before falling back: modern servers also use `400` for `UnsupportedProtocolVersionError`, `MissingRequiredClientCapabilityError`, and header-validation failures. A recognized modern JSON-RPC error means retry with advertised `supported` versions or correct the request; an empty or unrecognized body means fall back to `initialize`.
- Earlier Streamable HTTP revisions (`2025-03-26` through `2025-11-25`) used `Mcp-Session-Id` (terminated with HTTP DELETE), a standalone SSE stream via HTTP GET, server JSON-RPC requests on SSE streams, and `Last-Event-ID` resumability. None are part of this revision.
- A server supporting only this revision **SHOULD** respond to older-client traffic as follows: HTTP GET or DELETE to the MCP endpoint -> `405 Method Not Allowed`; `Mcp-Session-Id` header -> ignore it and do not mint or echo session IDs; `Last-Event-ID` header -> ignore it (streams are not resumable).
- Servers and clients needing to interoperate with those versions implement the behavior of the corresponding revision in addition to the version-negotiation fallback.
- Deprecated in 2026-07-28 (earliest removal: first revision on or after 2027-07-28): the HTTP+SSE transport from 2024-11-05 (deprecated since protocol version `2025-03-26`, classified Deprecated under the feature lifecycle policy, SEP-2596). New implementations **SHOULD NOT** adopt it; existing implementations **SHOULD** migrate to Streamable HTTP. (The earliest-removal wording follows the changelog's deprecation entry in the overview category; this page's source states only "eligible for removal in a future revision".)
- Servers wanting to support HTTP+SSE clients should keep hosting both the old SSE and POST endpoints alongside the new MCP endpoint (combining the old POST endpoint with the new one is possible but may add complexity).
- Removed in 2026-07-28: `Mcp-Session-Id`, the GET stream endpoint, `Last-Event-ID` resumability, and server-sent JSON-RPC requests on streams.

## Related

- [Streamable HTTP](./streamable-http.md)
- [Transports Overview](./transports-overview.md)
- [stdio](./stdio.md)
