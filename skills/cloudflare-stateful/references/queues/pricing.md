---
source: https://developers.cloudflare.com/queues/platform/pricing/
---

# Pricing

Queues bills per standard operation (each 64 KB written, read or deleted) and for queues above the included count.

## Signature / Usage

```txt
((Number of Messages * 3) - 1,000,000) / 1,000,000  * $0.40
```

## Options / Props

| Item | Workers Free | Workers Paid |
| --- | --- | --- |
| Standard operations | 10,000 operations/day included | 1,000,000 operations/month included + $0.40/million operations |
| Queues per account | 10,000 | Unlimited, default limit 10,000; first 10,000 included + $0.10 per additional queue per month |
| Message retention | 24 hours (non-configurable) | 4 days default, configurable up to 14 days |

### Examples

| Scenario | Operations | Billed | Price |
| --- | --- | --- | --- |
| 1 million messages/day, 30-day month, each under 64 KB | `3 * 30 * 1,000,000` = 90,000,000 | 89,000,000 | $35.60 |
| 100 million ~127 KB messages/month (2 chunks each) | `2 * 3 * 100 * 1,000,000` = 600,000,000 | 599,000,000 | $239.60 |

## Notes

- Messages over 64 KB count as multiple operations (65 KB and 127 KB both cost two). A KB is 1,000 bytes, and each message carries about 100 bytes of metadata.
- Operations are per message, not per batch: a batch of 10 costs 10 writes, 10 reads and 10 deletes.
- No egress or bandwidth charges. Typically 3 operations deliver a message: write, read, delete.
- Each retry incurs a read per message. Messages written to a Dead Letter Queue incur a write per 64 KB chunk.
- Source inconsistency: the page says a message "retried 3 times (the default), fails delivery on the fourth time and is written to a Dead Letter Queue would incur five (5) read operations". By its own rule (one read per delivery attempt), one initial delivery plus three retries is four reads. Check the `ReadMessage` operations in the metrics before budgeting on either figure.
- Messages that expire before being read incur only a write and a delete per chunk.
- A purge is one billable operation.
- Consumer Worker invocations are billed separately under Workers pricing.

## Related

- [Limits](./limits.md)
- [Pause and Purge](./pause-purge.md)
- [Consumer concurrency](./consumer-concurrency.md)
- [Metrics](./metrics.md)
