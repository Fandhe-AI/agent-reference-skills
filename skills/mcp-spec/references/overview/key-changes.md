---
source: https://modelcontextprotocol.io/specification/2026-07-28/changelog
---

# Key Changes (2026-07-28)

Changes in the 2026-07-28 revision relative to the previous revision 2025-11-25.

## Signature / Usage

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "resultType": "complete",
    "supportedVersions": ["2026-07-28"],
    "capabilities": { "tools": { "listChanged": true }, "resources": {} },
    "ttlMs": 3600000,
    "cacheScope": "public"
  }
}
```

(Illustrative `server/discover` result from the concepts walkthrough; shows `resultType`, `ttlMs` and `cacheScope` introduced below.)

### Major changes

1. Remove protocol-level sessions and the `Mcp-Session-Id` header from Streamable HTTP. List endpoints (`tools/list`, `resources/list`, `prompts/list`) no longer vary per-connection. Servers needing cross-call state use explicit, server-minted handles passed as ordinary tool arguments (SEP-2567).
2. Make MCP stateless: remove the `initialize` / `notifications/initialized` handshake. Every request carries its protocol version and client capabilities in `_meta` (`io.modelcontextprotocol/protocolVersion`, `io.modelcontextprotocol/clientCapabilities`). Clients SHOULD identify themselves on each request (`io.modelcontextprotocol/clientInfo`), and servers SHOULD identify themselves in each result's `_meta` (`io.modelcontextprotocol/serverInfo`). Version mismatches return `UnsupportedProtocolVersionError` (SEP-2575).
3. Add `server/discover`: servers MUST implement this RPC to advertise supported protocol versions, capabilities, and identity. Clients MAY call it before any other request, or use it as a backward-compatibility probe on STDIO (SEP-2575).
4. Replace the HTTP GET endpoint and `resources/subscribe` / `resources/unsubscribe` with `subscriptions/listen`: a single long-lived POST-response stream. Clients opt in to `toolsListChanged`, `promptsListChanged`, `resourcesListChanged`, `resourceSubscriptions`; the server acknowledges and tags notifications with `io.modelcontextprotocol/subscriptionId`. Request-scoped notifications (`notifications/progress`, `notifications/message`) continue to flow on the response stream of their request (SEP-2575).
5. Remove `ping`, `logging/setLevel`, and `notifications/roots/list_changed`. Log level is now set per-request via `io.modelcontextprotocol/logLevel` in `_meta`; servers MUST NOT emit `notifications/message` for requests that did not include this field (SEP-2575).
6. Move experimental tasks out of the core protocol into an official extension (`io.modelcontextprotocol/tasks`). The redesigned extension replaces blocking `tasks/result` with polling via `tasks/get` and a new `tasks/update`, removes `tasks/list`, and allows servers to return task handles unsolicited (SEP-2663).
7. Multi Round-Trip Requests (MRTR) replaces server-initiated requests such as `roots/list`, `sampling/createMessage`, `elicitation/create`. Servers return an `InputRequiredResult` (`resultType: "input_required"`) whose `inputRequests` carries the requests; clients retry the original request with `inputResponses` (SEP-2322).
8. All results carry a required `resultType`: `"complete"` for ordinary results and `"input_required"` for interim MRTR results. Clients **MUST** treat results from earlier-protocol servers that omit the field as `"complete"` (SEP-2322).
9. Remove SSE stream resumability and message redelivery (`Last-Event-ID` header, SSE event IDs) from Streamable HTTP. A broken response stream loses the in-flight request; clients **MUST** re-issue it as a new request with a new request ID (SEP-2575).

### Minor changes

1. Add `extensions` field to `ClientCapabilities` and `ServerCapabilities`.
2. Document OpenTelemetry trace context propagation conventions for `_meta` keys (`traceparent`, `tracestate`, `baggage`) (SEP-414).
3. Servers **SHOULD** return tools from `tools/list` in a deterministic order.
4. Require standard MCP request headers (`Mcp-Method`, `Mcp-Name`) on Streamable HTTP POST requests; add custom headers from tool parameters via `x-mcp-header` (SEP-2243).
5. Require `ttlMs` and `cacheScope` on results of `tools/list`, `prompts/list`, `resources/list`, `resources/read`, `resources/templates/list` via a new `CacheableResult` interface. `ttlMs` is a freshness hint in milliseconds; `cacheScope` (`"public"` or `"private"`) controls whether shared intermediaries may cache (SEP-2549).
6. Change resource not found error code from `-32002` to `-32602` (Invalid Params).
7. Authorization servers **SHOULD** include the `iss` parameter in authorization responses per RFC 9207; clients **MUST** validate a present `iss` against the recorded issuer before redeeming the code (SEP-2468).
8. Require clients to specify an appropriate `application_type` during Dynamic Client Registration (SEP-837).
9. Client credentials are bound to the issuing authorization server: clients **MUST** key persisted credentials by issuer identifier, **MUST NOT** reuse them with a different authorization server, and **MUST** re-register when the authorization server changes (SEP-2352).
10. Loosen `inputSchema` / `outputSchema` to allow any JSON Schema 2020-12 keywords and `structuredContent` to allow any JSON value; add `$ref` resolution requirements and composition-keyword resource bounds (SEP-2106).
11. Remove `notifications/elicitation/complete` and the `elicitationId` field of URL mode elicitation requests (both from 2025-11-25). Servers needing correlation across retries encode their own identifier in `requestState`.
12. Define an error code allocation policy: `-32000` to `-32019` remains implementation-defined, `-32020` to `-32099` is reserved for the MCP specification. Renumber: `HeaderMismatch` `-32001` -> `-32020`, `MissingRequiredClientCapability` `-32003` -> `-32021`, `UnsupportedProtocolVersion` `-32004` -> `-32022`; add `HeaderMismatchError` to the schema.

### Deprecated

1. Roots, Sampling, and Logging (SEP-2577). Migrate: tool parameters / resource URIs / server configuration instead of Roots; direct LLM provider APIs instead of Sampling; `stderr` (stdio) or OpenTelemetry instead of Logging.
2. HTTP+SSE transport (deprecated since `2025-03-26`) reclassified as Deprecated (SEP-2596). Migrate to Streamable HTTP.
3. `includeContext` values `"thisServer"` and `"allServers"` reclassified as Deprecated (SEP-2596). Omit the field or use `"none"`.
4. OAuth 2.0 Dynamic Client Registration (RFC 7591) deprecated in favor of Client ID Metadata Documents (PR #2858); remains for backwards compatibility.

### Other schema changes

- `schema.json` now reflects that TypeScript `minimum` / `maximum` / `default` are `number`s, not just `integers` (PR #2710).

### Governance and process

- Adopt the feature lifecycle and deprecation policy (Active, Deprecated, Removed; minimum twelve-month window; registry of deprecated features) (SEP-2596).
- Formalize the PR-based SEP workflow with markdown files in `seps/` (SEP-1850).

## Notes

- Each bullet above is the 2026-07-28 changelog entry; SEP numbers are as published in the source.
- Removed in 2026-07-28: `initialize`, `notifications/initialized`, `Mcp-Session-Id`, HTTP GET endpoint, `resources/subscribe`, `resources/unsubscribe`, `ping`, `logging/setLevel`, `notifications/roots/list_changed`, `Last-Event-ID` resumability, `notifications/elicitation/complete`, `elicitationId`, core tasks (moved to extension).

## Related

- [Deprecated Features](./deprecated-features.md)
- [Feature Lifecycle](./feature-lifecycle.md)
- [Specification Overview](./specification-overview.md)
