---
source: https://developers.cloudflare.com/workers/platform/pricing/
---

# Pricing

Workers Free and Workers Paid ($5 USD/month minimum) plans, with usage rates for Workers, Logs, KV, Hyperdrive, Queues, Workflows, D1, Durable Objects, Vectorize, R2, and Containers.

## Signature / Usage

Estimating Queues monthly operation charges (3 operations per delivered message):

```txt
((Number of Messages * 3) - 1,000,000) / 1,000,000  * $0.40
```

## Options / Props

### Workers

| Plan | Requests | Duration | CPU time |
| --- | --- | --- | --- |
| Free | 100,000 per day | No charge for duration | 10 milliseconds of CPU time per invocation |
| Standard (Paid) | 10 million included per month; +$0.30 per additional million | No charge or limit for duration | 30 million CPU milliseconds included per month; +$0.02 per additional million CPU ms; max 5 minutes CPU per invocation (default 30 seconds); max 15 minutes CPU per Cron Trigger or Queue Consumer invocation |

- Subrequests are not billed. WebSocket connections count as one request (the initial `Upgrade`); messages do not. Static asset requests are free and unlimited.
- With Workers Caching enabled, cache-served requests are billed at the same per-request rate; CPU is billed only on cache miss or bypass.
- Service Bindings: Worker A calling Worker B is billed as one request plus total CPU time across both (Standard pricing only; deprecated Bundled/Unbound plans bill two requests).

Examples (formulas verbatim):

| Example | Subscription | Requests | CPU time | Total |
| --- | --- | --- | --- | --- |
| 1: 15M requests/month, 7 ms CPU | $5.00 | $1.50 = (15,000,000 - 10,000,000) / 1,000,000 * $0.30 | $1.50 = ((7 * 15,000,000) - 30,000,000) / 1,000,000 * $0.02 | $8.00 |
| 2: 15M requests, 80% static assets | $5.00 | $0 | $0 | $5.00 |
| 3: Cron hourly, 720 req, 180,000 ms CPU each | $5.00 | $0.00 | $1.99 | $6.99 |
| 4: 100M requests, 7 ms CPU | $5.00 | $27.00 | $13.40 | $45.40 |
| 5: Example 4 with caching, 80% hit | $5.00 | $27.00 | $2.20 | $34.20 |

### Workers Logs and Logpush

| Plan | Log Events Written | Retention |
| --- | --- | --- |
| Workers Free | 200,000 per day | 3 Days |
| Workers Paid | 20 million included per month; +$0.60 per additional million | 7 Days |

Beginning December 1, 2026, Workers Logs will use Cloudflare Observability pricing (https://developers.cloudflare.com/observability/pricing/). Workers Trace Events Logpush (Paid only): 10 million / month, +$0.05/million.

### Workers KV

| | Free plan | Paid plan |
| --- | --- | --- |
| Keys read | 100,000 / day | 10 million/month, + $0.50/million |
| Keys written | 1,000 / day | 1 million/month, + $5.00/million |
| Keys deleted | 1,000 / day | 1 million/month, + $5.00/million |
| List requests | 1,000 / day | 1 million/month, + $5.00/million |
| Stored data | 1 GB | 1 GB, + $0.50/ GB-month |
| Namespaces | 1,000 | Unlimited, default limit 1,000; first 1,000 included + $0.10 per additional namespace per month |

### Hyperdrive

Free: 100,000 database queries / day. Paid: unlimited.

### Queues

| | Workers Free | Workers Paid |
| --- | --- | --- |
| Standard operations | 10,000 operations/day included | 1,000,000 operations/month included + $0.40/million |
| Queues per account | 10,000 | Unlimited, default 10,000; first 10,000 included + $0.10 per additional queue per month |
| Message retention | 24 hours (non-configurable) | 4 days default, configurable up to 14 days |

An operation is counted per 64 KB written, read, or deleted; operations are per message, not per batch; each retry incurs a read.

### Workflows

| Unit | Workers Free | Workers Paid |
| --- | --- | --- |
| Requests | 100,000 per day (shared with Workers) | 10 million included per month + $0.30 per additional million |
| CPU time (ms) | 10 ms per invocation | 30 million CPU ms included per month + $0.02 per additional million |
| Storage (GB-mo) | 1 GB-month | 1 GB-month included + $0.20/ GB-month |
| Steps | 3,000 per day | 500,000 included per month + $0.80 / additional 100,000 per month |

### D1

| | Workers Free | Workers Paid |
| --- | --- | --- |
| Rows read | 5 million / day | First 25 billion / month included + $0.001 / million rows |
| Rows written | 100,000 / day | First 50 million / month included + $1.00 / million rows |
| Storage | 5 GB (total) | First 5 GB included + $0.75 / GB-mo |
| Databases | 10 | First 100,000 included + $0.10 per additional database per month |

### Durable Objects

| | Free plan | Paid plan |
| --- | --- | --- |
| Requests | 100,000 / day | 1 million / month, + $0.15/million (HTTP, RPC sessions, WebSocket messages, alarms) |
| Duration | 13,000 GB-s / day | 400,000 GB-s / month, + $12.50/million GB-s |

SQLite storage backend:

| | Workers Free plan | Workers Paid plan |
| --- | --- | --- |
| Rows reads | 5 million / day | First 25 billion / month included + $0.001 / million rows |
| Rows written | 100,000 / day | First 50 million / month included + $1.00 / million rows |
| SQL Stored data | 5 GB (total) | 5 GB-month, + $0.20/ GB-month |

Key-value backend (Paid only): read request units 1 million + $0.20/million; write request units 1 million + $1.00/million; delete requests 1 million + $1.00/million; stored data 1 GB + $0.20/GB-month. A request unit is 4 KB.

RPC session billing example:

```js
let durableObjectStub = OBJECT_NAMESPACE.get(id); // retrieve Durable Object stub
using foo = await durableObjectStub.bar(); // billed as a request
await foo.baz(); // treated as part of the same RPC session created by calling bar(), not billed as a request
await durableObjectStub.cat(); // billed as a request
```

### Vectorize, R2, Containers

| Vectorize | Workers Free | Workers Paid |
| --- | --- | --- |
| Queried vector dimensions | 30 million / month | First 50 million / month + $0.01 per million |
| Stored vector dimensions | 5 million | First 10 million + $0.05 per 100 million |
| Indexes | 100 | Unlimited, default 50,000; first 50,000 included + $0.10 per additional |

| R2 | Free | Standard | Infrequent Access |
| --- | --- | --- | --- |
| Storage | 10 GB-month / month | $0.015 / GB-month | $0.01 / GB-month |
| Class A Operations | 1 million / month | $4.50 / million | $9.00 / million |
| Class B Operations | 10 million / month | $0.36 / million | $0.90 / million |
| Data Retrieval | None | None | $0.01 / GB |
| Egress | Free | Free | Free |

Containers (Paid, billed per 10 ms active): memory 25 GiB-hours/month + $0.0000025 per GiB-second; CPU 375 vCPU-minutes/month + $0.000020 per vCPU-second; disk 200 GB-hours/month + $0.00000007 per GB-second. Network egress: North America & Europe $0.025/GB (1 TB included); Oceania, Korea, Taiwan $0.05/GB (500 GB); elsewhere $0.04/GB (500 GB).

## Notes

- Pages Functions are billed as Workers.
- Docs inconsistency: the Vectorize section says it is "only available on the Workers paid plan" directly above a table with Free-plan values.
- Docs staleness: the Durable Objects SQLite storage billing note says billing "will be enabled in January 2026", which is already past at the 2026-11-03 fetch date.
- Custom limits: set the CPU limit via the `limits` Wrangler setting or dashboard (**Workers & Pages** > Worker > **Settings** > **CPU Limits**) to avoid runaway bills. Bundled-model Workers migrated to Standard pricing on March 1, 2024 received an automatic 50 ms CPU limit.
- Usage models can be changed account-wide or per Worker in the dashboard; this only affects billing.
- Details for KV, D1, R2, Hyperdrive: see the cloudflare-storage skill. Queues, Workflows, Durable Objects: the cloudflare-stateful skill (https://developers.cloudflare.com/queues/platform/pricing/, https://developers.cloudflare.com/workflows/reference/pricing/, https://developers.cloudflare.com/durable-objects/platform/pricing/). Vectorize: the cloudflare-ai skill. Containers: the cloudflare-sandbox-containers skill (https://developers.cloudflare.com/containers/platform/pricing/).
- Only requests that hit a Worker count; Workers run before the cache, so cached requests still incur costs.

## Related

- [limits.md](./limits.md)
- [storage-options.md](./storage-options.md)
