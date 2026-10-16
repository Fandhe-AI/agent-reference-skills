---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning#backward-compatibility-with-initialization-based-versions
---

# Backward Compatibility with Initialization-Based Versions

A server supporting both legacy clients (expecting an `initialize` handshake) and modern clients (per-request metadata) **MAY** implement both behaviors. A client interoperating with both kinds of servers detects the server's era with transport-specific mechanics.

## Signature / Usage

Era detection, per transport:

```text
stdio:            probe with `server/discover`; fall back on any error that is not a recognized modern error.
Streamable HTTP:  attempt a modern request and inspect the body of a `400 Bad Request` before falling back.
```

## Options / Props

Compatibility matrix:

| Client | Server | Outcome |
| --- | --- | --- |
| Modern | Modern | Works. `server/discover` is optional; version mismatches surface as `UnsupportedProtocolVersionError` and the client retries with a mutually supported version. |
| Modern | Legacy | Fails. The server may reject with an implementation-defined error, stay silent, or process an era-ambiguous method under legacy semantics. On stdio, clients **SHOULD** send `server/discover` first to fail deterministically; the client then surfaces an actionable error. |
| Dual-era | Modern | Works. The stdio probe returns a `DiscoverResult` (or `UnsupportedProtocolVersionError`); on HTTP, the first modern request succeeds or returns a modern error. The client stays modern. |
| Dual-era | Legacy | Works. stdio: probe returns a non-modern error or times out, client falls back to `initialize`. HTTP: the modern request returns a `4xx` without a recognized modern error body, client falls back to `initialize` (and possibly further to the deprecated HTTP+SSE transport). |
| Legacy | Modern | Fails. stdio: the server rejects `initialize` with a JSON-RPC error (code implementation-defined). HTTP: the request is missing required headers and is rejected per server validation with `400 Bad Request`. Legacy clients have no fall-forward mechanism. |
| Legacy | Dual-era | Works. The server answers `initialize` and serves per the negotiated legacy revision. |
| Legacy | Legacy | Works according to the legacy revision; out of scope for this document. |

## Notes

- A recognized modern JSON-RPC error (such as `UnsupportedProtocolVersionError`) identifies a modern server: the client retries with a supported version rather than falling back. Anything else identifies a legacy server.
- Era is a property of the server, not of an individual request. Clients **SHOULD** cache the result for the lifetime of the server process (stdio) or origin (HTTP), and **MAY** persist it across restarts of the same server configuration, re-probing if the cached assumption later fails.
- A server supporting only modern versions **SHOULD** name the protocol versions it supports in any error returned to an `initialize` request, on any transport.
- A dual-era server selects behavior from how the client opens: a request carrying modern per-request `_meta` is served statelessly per this revision; an `initialize` request selects legacy semantics, scoped to the stdio process (stdio) or the session (HTTP). It **MAY** serve both eras concurrently on the same endpoint or process.
- Removed in 2026-07-28: `initialize` and `notifications/initialized` (replaced by per-request `_meta`), `ping`, and protocol-level sessions with `Mcp-Session-Id`.
- Deprecated: HTTP+SSE transport (see the transports pages).

## Related

- [Protocol Version Negotiation](./protocol-version-negotiation.md)
- [Statelessness](./statelessness.md)
