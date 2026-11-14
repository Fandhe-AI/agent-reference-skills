---
source: https://developers.cloudflare.com/durable-objects/platform/pricing/
---

# Pricing

Durable Objects bill for compute (requests and wall-clock duration) and storage. Available on Workers Free (SQLite backend only) and Workers Paid.

## Signature / Usage

RPC session billing:

```js
let durableObjectStub = OBJECT_NAMESPACE.get(id); // retrieve Durable Object stub
using foo = await durableObjectStub.bar(); // billed as a request
await foo.baz(); // treated as part of the same RPC session created by calling bar(), not billed as a request
await durableObjectStub.cat(); // billed as a request
```

## Options / Props

### Compute

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Requests (Free) | allowance | — | 100,000 / day. Daily limits reset at 00:00 UTC. |
| Requests (Paid) | rate | — | 1 million / month included, then $0.15 / million. Includes HTTP requests, RPC sessions, WebSocket messages and alarm invocations. |
| Duration (Free) | allowance | — | 13,000 GB-s / day. |
| Duration (Paid) | rate | — | 400,000 GB-s / month included, then $12.50 / million GB-s. |

### SQLite storage backend

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Rows read (Free) | allowance | — | 5 million / day. |
| Rows read (Paid) | rate | — | First 25 billion / month included, then $0.001 / million rows. |
| Rows written (Free) | allowance | — | 100,000 / day. |
| Rows written (Paid) | rate | — | First 50 million / month included, then $1.00 / million rows. |
| SQL stored data (Free) | allowance | — | 5 GB total. |
| SQL stored data (Paid) | rate | — | 5 GB-month included, then $0.20 / GB-month. |

### Key-value storage backend (Paid only)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Read request units | rate | — | 1 million included, then $0.20 / million. A unit is 4 KB read. |
| Write request units | rate | — | 1 million included, then $1.00 / million. A unit is 4 KB written. |
| Delete requests | rate | — | 1 million included, then $1.00 / million. Unmetered by size. |
| Stored data | rate | — | 1 GB included, then $0.20 / GB-month. |

## Notes

- Billable usage is the amount beyond the included monthly allocation, rounded up to the next billable unit before the rate applies (e.g. 500,000 GB-s becomes 1,000,000 GB-s).
- Duration is wall-clock time while the object is active or idle but not able to hibernate; idle objects eligible for hibernation are not billed, even before the runtime hibernates them. Pending I/O keeps an object in memory for up to 15 minutes each, with duration charges. Duration is charged for 128 MB of memory regardless of actual usage; objects sharing an isolate are each billed 128 MB. In the examples 1 GB = 1000 MB (128 MB = 0.128 GB).
- Each RPC session is one request; every method call on a stub is its own session. Calls on a returned `RpcTarget` stub are part of the same session. A request creates a WebSocket connection; incoming WebSocket messages are billed at a 20:1 ratio (100 messages = 5 requests) for billing only, metrics show actual usage; outgoing messages and protocol pings are free. `setWebSocketAutoResponse()` auto-responses add no wall time. Calling `accept()` on a WebSocket incurs duration for the entire time connected; prefer the Hibernation API.
- SQLite row billing matches D1 pricing. Key-value methods store data in a hidden SQLite table and bill as rows read/written; each `setAlarm()` is one row written; deletes count as rows written. Empty tables and database metadata count toward storage until `deleteAll()`. Storage billing for SQLite-backed objects was scheduled for January 2026, target January 7, 2026 (no earlier).
- On the Free plan exceeding any limit fails further operations of that type with an error.
- Key-value units: a 9 KB write consumes 3 write units; a list returning 80 KB of keys and values is 20 read units, an empty list is 1; cache hits and multi-key `get`/`put`/`delete` are billed as individual requests per key.
- Worked examples (excluding calling Workers, plus the $5/month minimum): (1) 1.5 million requests, 1,000,000 active seconds: 500,000 billable requests rounded to 1,000,000 x $0.15 = $0.15; 128,000 GB-s is within the 400,000 included, total $5.15. (2) 100 objects x 50 WebSockets, a message per minute for 8 h/day: 150,000 + 72,000,000 / 20 = 3.75 million requests, 2.75 million billable, rounded to 3,000,000 x $0.15 = $0.45; 86,400,000 s x 0.128 = 11,059,200 GB-s, minus 400,000 = 10,659,200, rounded to 11,000,000 x $12.50 = $137.50, total $142.95. (3) 100 objects with one WebSocket, a message per second all month: 12,960,100 requests, 11,960,100 billable rounded to 12,000,000 x $0.15 = $1.80; 33,177,600 GB-s minus 400,000 = 32,777,600 rounded to 33,000,000 x $12.50 = $412.50, total $419.30. (4) Hibernation, 100 objects x 100 sockets, 10 ms per message, one message per minute per socket: 10,000 + 432,000,000 / 20 = 21,610,000 requests, 20,610,000 billable rounded to 21,000,000 x $0.15 = $3.15; 552,960 GB-s minus 400,000 = 152,960 rounded to 1,000,000 x $12.50 = $12.50, total $20.65.
- Compute and storage backends: see Workers and D1 pricing at https://developers.cloudflare.com/d1/platform/pricing/ (cloudflare-storage skill covers D1).
- Control usage costs: a Durable Objects spending limit covers requests, duration and storage operations after included usage; stored data charges are excluded and can continue during a pause. Review the operations that can continue (spend-management page) before relying on a limit. For email without blocking usage, configure an email alert.
- Source: https://developers.cloudflare.com/durable-objects/platform/pricing/index.md (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [Limits](./limits.md)
- [Spending limits](./spend-management.md)
- [Durable Object lifecycle](./durable-object-lifecycle.md)
- [WebSockets](./websockets.md)
- [FAQ](./faq.md)
- [SQLite-backed storage API](./sqlite-storage-api.md)
