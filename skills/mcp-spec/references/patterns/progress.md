---
source: https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/progress
---

# Progress

Optional progress tracking for long-running operations through notification messages. The server **MAY** send progress notifications to report the status of requests the client has issued.

## Signature / Usage

To receive progress updates, the client includes a `progressToken` in the request metadata:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "some_method",
  "params": {
    "_meta": {
      "progressToken": "abc123"
    }
  }
}
```

The server **MAY** then send progress notifications:

```json
{
  "jsonrpc": "2.0",
  "method": "notifications/progress",
  "params": {
    "progressToken": "abc123",
    "progress": 50,
    "total": 100,
    "message": "Reticulating splines..."
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `progressToken` | string / integer | Original token from the request; **MUST** be unique across all active requests |
| `progress` | number | Current progress value so far; **MUST** increase with each notification, even if the total is unknown; **MAY** be floating point |
| `total` | number (optional) | Total value; **MAY** be floating point; may be omitted if unknown |
| `message` | string (optional) | **SHOULD** provide relevant human readable progress information |

## Notes

- Progress tokens **MUST** be a string or integer value and can be chosen by the client using any means.
- Progress notifications **MUST** only reference tokens that were provided in an active request and are associated with an in-progress operation.
- Servers receiving a progress token **MAY** choose not to send any progress notifications, send them at whatever frequency they deem appropriate, and omit the total if unknown.
- Clients and servers **SHOULD** track active progress tokens, and both **SHOULD** implement rate limiting to prevent flooding.
- Progress notifications **MUST** stop after completion.
- Source: tag `2026-07-28` raw (`docs/specification/2026-07-28/basic/patterns/progress.mdx`).

## Related

- [Cancellation](./cancellation.md)
- [Message Patterns Overview](./patterns-overview.md)
