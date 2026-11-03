---
source: https://developers.cloudflare.com/vectorize/best-practices/create-indexes/
---

# Distance metrics

The metric chosen at index creation defines how similarity between vectors is scored; it cannot be changed afterwards.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/vectorize/best-practices/create-indexes/

```sh
npx wrangler vectorize create your-index-name --dimensions=768 --metric=cosine
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `cosine` | metric | — | Measured between `-1` (most dissimilar) and `1` (identical); `0` denotes an orthogonal vector. |
| `euclidean` | metric | — | Euclidean (L2) distance. `0` denotes identical vectors; larger positive numbers mean further apart. |
| `dot-product` | metric | — | Negative dot product. Larger negative values or smaller positive values mean more similar; `-1000` is more similar than `-500`, and `15` more similar than `50`. |

## Notes

- Each metric has a different scoring function, so scores are not comparable across metrics.
- Whether a score means the underlying data is similar depends on how well the embedding model represents the content.
- Queries use approximate scoring by default; `returnValues: true` enables high-precision scoring (see query vectors).
- In the getting-started tutorial (`euclidean`), closer to `0.0` is closer; in the Workers AI tutorial (`cosine`), closer to one is more similar.

## Related

- [Create indexes](./create-indexes.md)
- [Query vectors](./query-vectors.md)
