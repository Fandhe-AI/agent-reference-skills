---
source: https://developers.cloudflare.com/vectorize/platform/pricing/
---

# Pricing

Vectorize bills on queried vector dimensions, stored vector dimensions, and indexes beyond the plan allocation.

## Signature / Usage

```
((queried vectors + stored vectors) * dimensions * ($0.01 / 1,000,000)) + (stored vectors * dimensions * ($0.05 / 100,000,000))
```

Worked example (10,000 vectors of 768 dimensions queried 30,000 times per month):

```
(30,000 + 10,000) * 768 * ($0.01 / 1,000,000) + (10,000 * 768 * ($0.05 / 100,000,000))
```

## Options / Props

### Billing metrics

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Total queried vector dimensions (Free) | metric | — | 30 million queried vector dimensions / month. |
| Total queried vector dimensions (Paid) | metric | — | First 50 million / month included, then $0.01 per million. |
| Total stored vector dimensions (Free) | metric | — | 5 million stored vector dimensions. |
| Total stored vector dimensions (Paid) | metric | — | First 10 million included, then $0.05 per 100 million. |
| Indexes (Free) | metric | — | 100. |
| Indexes (Paid) | metric | — | Unlimited, default limit 50,000; first 50,000 included, then $0.10 per additional index per month. |

### Usage examples (excluding included allocation)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Experiment | 384 dims | — | 5,000 stored vectors, 10,000 queries: about $0.06 / mo (fully within included allocation). |
| Scaling | 768 dims | — | 25,000 stored vectors, 50,000 queries: about $0.59 / mo (mostly within Paid allocation). |
| Production | 768 dims | — | 50,000 stored vectors, 200,000 queries: about $1.94 / mo. |
| Large | 768 dims | — | 250,000 stored vectors, 500,000 queries: about $5.86 / mo. |
| XL | 1536 dims | — | 500,000 stored vectors, 1,000,000 queries: about $23.42 / mo. |

## Notes

- Recomputed with the formula above: Experiment 5.76M queried dims x $0.01/M + 1.92M stored dims x $0.05/100M = $0.0576 + $0.00096 = $0.0586 (about $0.06); Scaling 57.6M -> $0.576 + 19.2M -> $0.0096 = $0.5856 (about $0.59); Production 192M -> $1.92 + 38.4M -> $0.0192 = $1.9392 (about $1.94); Large 576M -> $5.76 + 192M -> $0.096 = $5.856 (about $5.86); XL 2.304B -> $23.04 + 768M -> $0.384 = $23.424 (about $23.42). The 768-dim, 10,000-vector, 30,000-query example gives 30,720,000 queried dims and 7,680,000 stored dims, about $0.31 / month before the included allocation (matches the source).
- "Queried dimensions" count stored vectors plus queries: the source example `(10000 + 100) * 384` = 3,878,400 (3.878 million).
- Not billed for CPU, memory, or active index hours; no data transfer / egress charge.
- Queries from Workers, the HTTP API, and the CLI all count as usage.
- An empty index adds no stored dimensions but still counts toward the index allocation (each index above the Paid allocation costs $0.10 per month).
- Exceeding the included Paid amounts is billed per the rates above; the Free tier remains available for prototyping.

## Related

- [Limits](./limits.md)
- [Create indexes](./create-indexes.md)
