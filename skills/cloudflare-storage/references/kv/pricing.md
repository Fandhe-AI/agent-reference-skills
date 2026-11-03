---
source: https://developers.cloudflare.com/kv/platform/pricing/
---

# Pricing

Workers KV is included in both the Free and Paid Workers plans.

## Signature / Usage

```plaintext
|                | Free plan (1)  | Paid plan                                   |
| Keys read      | 100,000 / day  | 10 million/month, + $0.50/million           |
| Keys written   | 1,000 / day    | 1 million/month, + $5.00/million            |
| Keys deleted   | 1,000 / day    | 1 million/month, + $5.00/million            |
| List requests  | 1,000 / day    | 1 million/month, + $5.00/million            |
| Stored data    | 1 GB           | 1 GB, + $0.50/ GB-month                     |
| Namespaces     | 1,000          | Unlimited, default limit 1,000. First 1,000 included + $0.10 per additional namespace per month. |
```

(1) The Free plan includes limited Workers KV usage. Daily usage limits reset at 00:00 UTC. If you exceed any one limit, further operations of that type fail with an error.

## Notes

- Pricing for read, write, and delete is per key. Bulk read operations are billed by the number of keys read.
- Additional namespaces: 1,050 namespaces for a full billing month cost `(1,050 - 1,000) × $0.10 = $5.00`. Operation and storage charges apply separately.
- REST API bulk writes: each key-value pair in the `PUT` request counts as one write (5,000 keys = 5,000 `PUT` calls in a Worker).
- Operations via the dashboard or Wrangler (writes, deletes, lists) count as billable usage.
- No data transfer / egress charge.
- All operations incur charges, including fetches for non-existent keys (`null` in the Workers API, `HTTP 404` in the REST API).
- Key expirations are not billable operations (stated in the FAQ).

## Related

- [limits.md](./limits.md)
- [faq.md](./faq.md)
