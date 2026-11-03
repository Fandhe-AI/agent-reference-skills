---
source: https://developers.cloudflare.com/vectorize/platform/changelog/
---

# Changelog

Dated history of Vectorize changes, from the 2023 beta to list-vectors in 2025.

## Signature / Usage

Legacy (2023-11-08 behaviour; `returnMetadata` boolean, superseded by the string form in V2):

```ts
let matches = await env.YOUR_INDEX.query(queryVector, { topK: 5, returnMetadata: true })
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| 2025-08-25 | change | — | list-vectors operation added. |
| 2024-12-20 | change | — | Index names can be reused when the earlier index is deleted. |
| 2024-12-19 | change | — | Range clauses `$lt`, `$lte`, `$gt`, `$gte` in metadata filters. |
| 2024-11-13 | change | — | `$in` and `$nin` metadata filters. |
| 2024-10-28 | change | — | Lower REST API query latency (query vectors, get vectors by ID). |
| 2024-10-24 | change | — | Workers Paid: 50,000 indexes per account and 50,000 namespaces per index (up from 100). |
| 2024-09-26 | change | — | Vectorize GA. |
| 2024-09-16 | change | — | Available on Workers Free (30 million queried dimensions / month, 5 million stored). |
| 2024-08-14 | change | — | V1 deprecated; V2 public beta (larger indexes, `topK` up to 100, explicit metadata indexes). |
| 2024-01-17 | change | — | HTTP `/query`: `returnVectors` deprecated for `returnValues` and `returnMetadata`; new response shape. |
| 2023-12-06 | change | — | Metadata filtering (`$eq`, `$neq` as written then). |
| 2023-11-08 | change | — | Distinct `returnMetadata` and `returnValues`, replacing `returnVectors`. |
| 2023-10-03 | change | — | 100 indexes per account. |
| 2023-09-27 | change | — | Public beta. |

## Notes

- The 2023-12-06 entry names the not-equals operator `$neq`; the current metadata filtering reference lists `$ne`.
- The 2024-08-14 entry says V2 indexes support up to 5 million vector dimensions, up from 200,000; the current limits page expresses limits in vectors (20,000,000 per index).
- New Workers created on or after 2023-11-08 (or with an updated compatibility date) use the newer `returnMetadata`/`returnValues` return type; V2 uses the `all` / `indexed` / `none` strings.

## Related

- [Legacy V1 transition](./legacy-v1-transition.md)
- [Metadata filtering](./metadata-filtering.md)
- [Limits](./limits.md)
