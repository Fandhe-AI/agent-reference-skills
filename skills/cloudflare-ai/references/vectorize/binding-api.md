---
source: https://developers.cloudflare.com/vectorize/reference/client-api/
---

# Vectorize binding API

Methods on a Vectorize index binding (`env.<BINDING>`) in a Worker: insert, upsert, query, queryById, getByIds, deleteByIds, describe.

## Signature / Usage

```ts
let vectorsToUpsert = [
	{ id: "123", values: [32.4, 6.5, 11.2, 10.3, 87.9] },
	{ id: "456", values: [2.5, 7.8, 9.1, 76.9, 8.5] },
	{ id: "768", values: [29.1, 5.7, 12.9, 15.4, 1.1] },
];
let upserted = await env.YOUR_INDEX.upsert(vectorsToUpsert);

let queryVector = [32.4, 6.55, 11.2, 10.3, 87.9];
let matches = await env.YOUR_INDEX.query(queryVector, {
	topK: 5,
	returnValues: true,
	returnMetadata: "all",
});
```

Binding configuration (Wrangler config):

```jsonc
{
	"vectorize": [
		{
			"binding": "PROD_SEARCH", // the index will be available as env.PROD_SEARCH in your Worker
			"index_name": "production-doc-search",
		},
	],
}
```

```toml
[[vectorize]]
binding = "PROD_SEARCH"
index_name = "production-doc-search"
```

Other operations:

```ts
let inserted = await env.YOUR_INDEX.insert(vectorsToInsert);
let byId = await env.YOUR_INDEX.queryById("some-vector-id", {
	topK: 5,
	returnValues: true,
	returnMetadata: "all",
});
const vectors = await env.YOUR_INDEX.getByIds(["11", "22", "33", "44"]);
const deleted = await env.YOUR_INDEX.deleteByIds(["11", "22", "33", "44"]);
const details = await env.YOUR_INDEX.describe();
```

## Options / Props

### Methods

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `insert(vectors)` | async | — | Inserts vectors; asynchronous, returns a mutation identifier. Vectors whose ID already exists are not inserted (only new IDs are). |
| `upsert(vectors)` | async | — | Inserts or fully replaces vectors by ID (values and metadata are not merged). Asynchronous, returns a mutation identifier. |
| `query(vector, options)` | async | — | Returns scores of the closest vectors by the index's distance metric. |
| `queryById(id, options)` | async | — | Queries using a vector already in the index; same options as `query`. |
| `getByIds(ids)` | async | — | Retrieves vectors by ID, including values and metadata. |
| `deleteByIds(ids)` | async | — | Deletes vectors by ID; asynchronous, returns a mutation identifier. |
| `describe()` | async | — | Retrieves index configuration, including `dimensions` and distance `metric`. |

### Query options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `topK` | number | 5 | Number of matches. Maximum 100; maximum 50 when `returnValues` is `true` or `returnMetadata` is `all`. |
| `returnValues` | boolean | false | Return vector values. |
| `returnMetadata` | `none` / `indexed` / `all` | `none` | `indexed` returns only indexed metadata fields (no latency overhead, long text may be truncated); `all` returns all metadata (may be slower, `topK` limited to 50). |
| `namespace` | string | — | Search only within this namespace. |
| `filter` | object | — | Metadata filter. |

### Vector object

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `id` | string | — | Unique ID of the vector in the index. |
| `namespace` | string | — | Optional partition key within an index. |
| `values` | `number[]` / `Float32Array` / `Float64Array` | — | Dense embedding; length must match the index `dimensions`. |
| `metadata` | object | — | Optional key-value pairs. |

## Notes

- Mutations are asynchronous; it typically takes a few seconds for inserted or upserted vectors to be queryable.
- For legacy (V1) indexes, `topK` is limited to 20 and `returnMetadata` is a boolean.
- The page describes `insert`, `upsert`, `deleteByIds` as returning "a mutation identifier"; the tutorial shows the response shape `{ "mutationId": "..." }`.
- Types: run `wrangler types` after changing the Wrangler config to generate `env` types (the type of the binding is `Vectorize`).
- Wrangler-side operations (list-vectors, create/delete/list metadata indexes, info) are CLI commands; see cloudflare-wrangler (commands/vectorize.md).
- Vectorize V2 CLI commands require wrangler 3.71.0 or later.

## Related

- [Query vectors](./query-vectors.md)
- [Insert vectors](./insert-vectors.md)
- [Metadata filtering](./metadata-filtering.md)
- [List vectors](./list-vectors.md)
- [Namespaces](./namespaces.md)
- [Limits](./limits.md)
