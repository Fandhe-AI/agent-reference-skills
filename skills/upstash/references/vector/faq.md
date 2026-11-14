# FAQ and Limits

Account limits, billing counting rules, supported regions and data-management answers for Upstash Vector.

## Signature / Usage

Snippet taken from https://upstash.com/docs/vector/sdks/ts/commands/upsert (batch upsert; the FAQ recommends arrays of up to 1000 vectors per call):

```typescript
await index.upsert([
  {
    id: "6789",
    vector: [0.6, 0.7, 0.8, 0.9, 0.9],
  },
  {
    id: "1234",
    vector: [0.1, 0.2, 0.3, 0.4, 0.5],
    metadata: {
      title: "Lord of The Rings",
      genre: "drama",
      category: "classic",
    },
  },
]);
```

## Options / Props

| Topic | Answer |
| --- | --- |
| Indexes per account | Up to 10 |
| Max dimension | Free 1536; fixed and pay-as-you-go 3072; Pro up to 5376 |
| Storage billed | Vector storage (vector count x dimension x 4 bytes) + metadata + data storage; metadata / data storage billed at $0.25 per GB |
| Bandwidth | First 200 GB per month free, then $0.03 per GB |
| Operations (pay as you go) | $0.40 per 100,000 operations; ranges, queries, fetches count as query operations, upserts and deletes as updates |
| Max vectors per index | Bounded by vector x dimension per plan; 2 billion on pay as you go (e.g. 5 million vectors of dimension 400) |
| Hybrid search | Supported via hybrid indexes (dense + sparse fused); sparse indexes for keyword-style search |
| Replication | Not supported in the documented release |
| Vector ID | Required, cannot be an empty string; no auto-generated UUIDs |
| Remove a metadata field | Upsert the same ID again without the field |
| Cloud / regions | AWS us-east-1, AWS eu-west-1, GCP us-central1; fixed and Pro plans on AWS regions |
| Upgrade from free | Enter credit card info to move to pay as you go |

## Notes

- A query-type operation counts as one operation regardless of how many vectors it returns; for upserts and deletes the FAQ states separate counting rules for multi-vector requests (see the official page for exact wording)
- Metadata / data storage limit is soft: an email reminder is sent when approaching it
- Idle indexes on pay as you go only pay storage, no hourly charge
- The official pricing page is a rendered web page (not a Markdown twin) and is not distilled here; check upstash.com/pricing/vector for current prices
- Source: https://upstash.com/docs/vector/help/faq (fetched 2026-11-14; no version pin on the site)

## Related

- [upsert.md](./upsert.md)
- [hybrid-indexes.md](./hybrid-indexes.md)
- [namespace.md](./namespace.md)
