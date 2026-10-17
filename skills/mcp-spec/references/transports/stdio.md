---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/stdio
---

# stdio

The client launches the MCP server as a subprocess; newline-delimited JSON-RPC messages flow over the subprocess's standard streams.

## Signature / Usage

One JSON-RPC message per line on `stdin` / `stdout`:

```text
client -> server stdin : {"jsonrpc":"2.0","id":1,"method":"server/discover","params":{...}}\n
server stdout -> client: {"jsonrpc":"2.0","id":1,"result":{...}}\n
```

Rules:

- The server reads JSON-RPC messages from `stdin` and writes them to `stdout`.
- Messages are delimited by newlines and **MUST NOT** contain embedded newlines.
- The server **MAY** write UTF-8 strings to `stderr` for logging; the client **MAY** capture, forward, or ignore it and **SHOULD NOT** assume `stderr` output indicates errors.
- The server **MUST NOT** write anything to `stdout` that is not a valid MCP message; the client **MUST NOT** write anything to `stdin` that is not a valid MCP message.

## Notes

- Sending: the client writes requests and notifications, one per line. It **MUST NOT** write JSON-RPC responses.
- Receiving: all messages share the single `stdout` channel (no per-request streams). The server writes responses (correlated by `id`), notifications for an in-flight request (`notifications/progress`, `notifications/message`), and notifications for an active `subscriptions/listen` request (clients **MUST** correlate via `_meta` `io.modelcontextprotocol/subscriptionId`). The server **MUST NOT** write JSON-RPC requests to `stdout`; server-to-client interactions use `InputRequiredResult` (MRTR).
- Request metadata: carried inline in the message body (`_meta.io.modelcontextprotocol/*`); there is no header layer.
- Cancellation: the client **MUST** send `notifications/cancelled` referencing the request ID. Servers **SHOULD** stop work as soon as practical and **MUST NOT** send further messages for it.
- Shutdown: the client **SHOULD** close the server's input stream, wait for exit, and forcibly terminate if the server does not exit in reasonable time (POSIX: `SIGTERM` then `SIGKILL`; Windows: `TerminateProcess` or Job Objects). Servers **SHOULD** exit promptly on stdin close / EOF. The server **MAY** initiate shutdown by closing its output stream and exiting.
- Unexpected termination: the client **SHOULD** restart the server. Because the protocol is stateless, in-flight requests are lost and can be retried; active `subscriptions/listen` streams must be re-established.
- The framing works unchanged over Unix domain sockets, TCP, or similar byte streams; custom transports built on them **SHOULD** reuse it.
- Backward compatibility: a client supporting both modern and `initialize`-based legacy versions **SHOULD** probe with `server/discover` first. A `DiscoverResult` means modern (pick from `supportedVersions`); a recognized modern error such as `UnsupportedProtocolVersionError` means modern but version unsupported (use its `supported` list, do **not** fall back); any other error or timeout means legacy, so fall back to `initialize`. The fallback **MUST NOT** be keyed to one specific error code (legacy servers commonly answer `-32601` or `-32602`, or not at all). Probing is **RECOMMENDED** even for modern-only clients.
- Removed in 2026-07-28: `initialize` / `notifications/initialized` handshake (replaced by per-request `_meta` and `server/discover`).

## Related

- [Transports Overview](./transports-overview.md)
- [Streamable HTTP](./streamable-http.md)
