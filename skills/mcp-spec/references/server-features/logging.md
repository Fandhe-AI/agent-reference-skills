---
source: https://modelcontextprotocol.io/specification/2026-07-28/server/utilities/logging
---

# Logging (Deprecated)

Servers send structured log messages as `notifications/message`; clients control verbosity per request via `_meta`. Deprecated as of protocol version 2026-07-28.

## Signature / Usage

Capability declaration:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

Request-scoped log level (in the request's `_meta`): `io.modelcontextprotocol/logLevel`.

Log message notification:

```json
{
  "jsonrpc": "2.0",
  "method": "notifications/message",
  "params": {
    "level": "error",
    "logger": "database",
    "data": {
      "error": "Connection failed",
      "details": { "host": "localhost", "port": 5432 }
    }
  }
}
```

## Options / Props

Log levels (RFC 5424 syslog severities):

| Level | Description | Example Use Case |
|-------|-------------|------------------|
| debug | Detailed debugging information | Function entry/exit points |
| info | General informational messages | Operation progress updates |
| notice | Normal but significant events | Configuration changes |
| warning | Warning conditions | Deprecated feature usage |
| error | Error conditions | Operation failures |
| critical | Critical conditions | System component failures |
| alert | Action must be taken immediately | Data corruption detected |
| emergency | System is unusable | Complete system failure |

## Notes

- Deprecated in 2026-07-28 (earliest removal: first revision on or after 2027-07-28): Logging (SEP-2577). It remains in the specification for at least twelve months after this revision's release under the feature lifecycle policy. New implementations **SHOULD NOT** adopt it; existing implementations **SHOULD** migrate to logging to `stderr` for stdio transports, or to OpenTelemetry for structured observability.
- Removed in 2026-07-28: `logging/setLevel`. The log level is now per request via `_meta` `io.modelcontextprotocol/logLevel`.
- The server **MUST NOT** emit `notifications/message` for a request that does not include `io.modelcontextprotocol/logLevel`. When present, the server **MAY** send notifications at or above the requested level on the response stream of that request, before the final response. `notifications/message` is request-scoped: the server **MUST NOT** deliver it on a `subscriptions/listen` stream or any other stream.
- An unrecognized log level **SHOULD** be rejected with `-32602` (Invalid params); internal errors `-32603`.
- Servers **SHOULD** rate limit messages, include relevant context in `data`, use consistent logger names, and remove sensitive information. Log messages **MUST NOT** contain credentials or secrets, personal identifying information, or internal system details that could aid attacks.
- Servers that emit log message notifications **MUST** declare the `logging` capability.
- Source: tag `2026-07-28` raw (`docs/specification/2026-07-28/server/utilities/logging.mdx`).

## Related

- [Server Features Overview](./server-overview.md)
