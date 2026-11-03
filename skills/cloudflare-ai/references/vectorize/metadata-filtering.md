---
source: https://developers.cloudflare.com/vectorize/reference/metadata-filtering/, https://developers.cloudflare.com/vectorize/reference/client-api/
---

# Metadata filtering

Restrict `query()` results with a `filter` on indexed vector metadata; the filter is applied first and `topK` is taken from the filtered set.

## Signature / Usage

```sh
npx wrangler vectorize create tutorial-index --dimensions=32 --metric=cosine
npx wrangler vectorize create-metadata-index tutorial-index --property-name=url --type=string
npx wrangler vectorize create-metadata-index tutorial-index --property-name=streaming_platform --type=string
```

Adapted (not in the official docs): the source's `[54.8, 5.5, 3.1, ...]` elision is not valid JavaScript; the vector is built to the index's 32 dimensions (3 explicit values padded with zeros); see Notes.

```ts
let queryVector: Array<number> = [
	54.8, 5.5, 3.1,
	...new Array<number>(29).fill(0), // pad to the 32 dimensions of tutorial-index
];
let metadataMatches = await env.YOUR_INDEX.query(queryVector, {
	topK: 3,
	filter: { streaming_platform: "netflix" },
	returnValues: true,
	returnMetadata: 'all',
});
```

Other metadata index commands:

```sh
wrangler vectorize delete-metadata-index <index-name> --property-name='some-prop'
wrangler vectorize list-metadata-index <index-name>
```

### Valid filters

```json
{ "streaming_platform": "netflix" }
{ "someKey": { "$ne": "hbo" } }
{ "someKey": { "$in": ["hbo", "netflix"] } }
{ "someKey": { "$nin": ["hbo", "netflix"] } }
{ "timestamp": { "$gte": 1734242400, "$lt": 1734328800 } }
{ "someKey": { "$gte": "net", "$lt": "neu" } }
{ "pandas.nice": 42, "someKey": { "$ne": "someValue" } }
```

## Options / Props

### Operators

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `$eq` | string / number / boolean / null | — | Equals (implicit when a plain value is given). |
| `$ne` | string / number / boolean / null | — | Not equals. |
| `$in` | array of string / number / boolean / null | — | In. |
| `$nin` | array of string / number / boolean / null | — | Not in. |
| `$lt` | string / number | — | Less than. |
| `$lte` | string / number | — | Less than or equal to. |
| `$gt` | string / number | — | Greater than. |
| `$gte` | string / number | — | Greater than or equal to. |

### Metadata index

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `--property-name` | string | — | Metadata property to index. |
| `--type` | `string` / `number` / `boolean` | — | Property type. |

## Notes

- Create metadata indexes before inserting vectors (recommended right after creating the index). Up to 10 per index. Vectors upserted before the index existed are not in it; re-upsert them.
- Namespace filtering is supported by default and is applied before metadata filters.
- Number indexes use float64 precision. String indexes cover the first 64 bytes (truncated on a UTF-8 boundary).
- Up to 10KiB of metadata per vector.
- Filter must be a non-empty object with compact JSON under 2048 bytes. Keys cannot be empty, contain `"`, `|`, or `.` (the dot is reserved for nesting), start with `$`, or exceed 512 characters.
- Upper-bound ranges (`$lt`, `$lte`) can combine with lower-bound ranges (`$gt`, `$gte`); other combinations are not allowed.
- Strings are ordered lexicographically; `{ "$gte": "net", "$lt": "neu" }` implements a prefix (starts-with) search.
- Range queries over about 10M vectors or more may be less accurate.
- Keys with `.` define nesting: `{ "pandas.nice": 42 }` looks for `{ "pandas": { "nice": 42 } }`.
- Only indexes created on or after 2023-12-06 support metadata filtering; older indexes cannot be migrated.
- Example with the source's 5 vectors: unfiltered top 3 were ids 5, 4, 2; filtered by `streaming_platform: "netflix"` it returned ids 4 and 1 (count 2).
- Corrected from the official docs: the source's `...` elision is not valid JavaScript; zero padding is used only to make the example run (use your real embedding in practice).
- The source's key restriction wording `" | .` is reproduced as listed; the `|` is verbatim from the page.
- `wrangler vectorize ... --propertyName` is the flag name in the command reference; the guides use `--property-name`.
- Metadata index creation and deletion are asynchronous mutations (a few seconds).

## Related

- [Namespaces](./namespaces.md)
- [Insert vectors](./insert-vectors.md)
- [Binding API](./binding-api.md)
- [Limits](./limits.md)
