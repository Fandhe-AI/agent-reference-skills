---
source: https://developers.cloudflare.com/vectorize/best-practices/insert-vectors/, https://developers.cloudflare.com/vectorize/reference/metadata-filtering/
---

# Namespaces

Namespaces partition the vectors inside an index (for example per customer, merchant, or store ID); queries can be limited to one namespace.

## Signature / Usage

Adapted (not in the official docs): the source's `...` elisions (invalid in a JS array) are replaced by complete 3-dimension arrays, so this assumes a 3-dimension index; see Notes.

```ts
// Mock vectors for an index created with --dimensions=3
// Vectors from a machine-learning model are typically ~100 to 1536 dimensions
// wide (or wider still); each array length must equal the index dimensions.
const sampleVectors: Array<VectorizeVector> = [
	{
		id: "1",
		values: [32.4, 74.1, 3.2],
		namespace: "text",
	},
	{
		id: "2",
		values: [15.1, 19.2, 15.8],
		namespace: "images",
	},
	{
		id: "3",
		values: [0.16, 1.2, 3.8],
		namespace: "pdfs",
	},
];

let inserted = await env.TUTORIAL_INDEX.insert(sampleVectors);
```

Adapted (not in the official docs): `queryVector` is defined (the source leaves it undefined).

```ts
// Your queryVector will be searched against vectors within the namespace (only)
const queryVector = [32.4, 6.55, 11.2];
let matches = await env.TUTORIAL_INDEX.query(queryVector, {
	namespace: "images",
});
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `namespace` (vector) | string | — | Optional namespace assigned on insert/upsert. Up to 64 bytes. |
| `namespace` (query option) | string | — | Restricts the search to vectors in that namespace. |

## Notes

- A namespace filter is applied before the vector search and before any metadata filter.
- A vector belongs to a single namespace; metadata can carry multiple key-value pairs of several types, so it is more flexible.
- Limits: 64-byte namespace names; 50,000 namespaces per index on Workers Paid and 1000 on Free (the insert page's prose says 1,000; the limits page is the authoritative table).
- Corrected from the official docs: the source's `[32.4, 74.1, 3.2, ...]` elisions are not valid JavaScript; the snippets use complete 3-dimension arrays and define `queryVector`.
- Namespace filtering is supported by default (no metadata index needed).

## Related

- [Metadata filtering](./metadata-filtering.md)
- [Insert vectors](./insert-vectors.md)
- [Limits](./limits.md)
