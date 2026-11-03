---
source: https://developers.cloudflare.com/vectorize/best-practices/insert-vectors/
---

# Insert vectors

Insert or upsert vectors from a Worker, the Wrangler CLI (NDJSON), or the REST API.

## Signature / Usage

Adapted (not in the official docs): comment corrected for V2 (the call returns a mutation identifier, not a count); the source's `...` elisions (a syntax error in a JS array) are replaced by complete 3-dimension arrays, so this assumes a 3-dimension index; see Notes.

```ts
// Mock vectors for an index created with --dimensions=3
// Vectors from a machine-learning model are typically ~100 to 1536 dimensions
// wide (or wider still); each array length must equal the index dimensions.
const sampleVectors: Array<VectorizeVector> = [
	{
		id: "1",
		values: [32.4, 74.1, 3.2],
		metadata: { url: "/products/sku/13913913" },
	},
	{
		id: "2",
		values: [15.1, 19.2, 15.8],
		metadata: { url: "/products/sku/10148191" },
	},
	{
		id: "3",
		values: [0.16, 1.2, 3.8],
		metadata: { url: "/products/sku/97913813" },
	},
];

// Insert your vectors, returning the mutation identifier of this asynchronous operation.
let inserted = await env.TUTORIAL_INDEX.insert(sampleVectors);
```

CLI (NDJSON file):

```sh
wrangler vectorize insert <your-index-name> --file=embeddings.ndjson
```

```json
{ "id": "4444", "values": [175.1, 167.1, 129.9], "metadata": {"url": "/products/sku/918318313"}}
{ "id": "5555", "values": [158.8, 116.7, 311.4], "metadata": {"url": "/products/sku/183183183"}}
{ "id": "6666", "values": [113.2, 67.5, 11.2], "metadata": {"url": "/products/sku/717313811"}}
```

REST API (Adapted: token read from an environment variable, file closed after use, status checked):

```py
import os
import requests

url = "https://api.cloudflare.com/client/v4/accounts/{}/vectorize/v2/indexes/{}/insert".format(os.environ["CLOUDFLARE_ACCOUNT_ID"], "index-name")

headers = {
    "Authorization": "Bearer {}".format(os.environ["CLOUDFLARE_API_TOKEN"])
}

with open('embeddings.ndjson', 'rb') as embeddings:
    resp = requests.post(url, headers=headers, files=dict(vectors=embeddings))
    resp.raise_for_status()
    print(resp)
```

## Options / Props

### Supported vector formats

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Array | `number[]` | — | Array of floating point numbers; easiest with most ML APIs. |
| Float32 | `Float32Array` | — | Typed array. |
| Float64 | `Float64Array` | — | Typed array; converted to Float32 before storing. |

### Metadata key rules

| Name | Type | Default | Description |
|------|------|---------|-------------|
| key | string | — | Cannot be empty, contain `.` or `"`, or start with `$`. |
| total size | — | 10KiB per vector | See limits. |

## Notes

- Insert vs upsert: inserting an existing ID twice keeps the first vector; upserting twice keeps the last. Use upsert to overwrite.
- Vectorize stores and returns dimensions as Float32.
- Corrected from the official docs: the source's code comment says the insert returns "a count of the vectors inserted and their vector IDs"; for V2 indexes it returns a mutation identifier (see the getting-started tutorial and the binding API page).
- Corrected from the official docs: the source's snippets write `[32.4, 74.1, 3.2, ...]`, an elision that is not valid JavaScript; the snippet uses complete 3-dimension arrays. Real arrays must have a length equal to the index `dimensions`.
- Adapted from the official docs: Python examples used a literal `<your-api-token>` placeholder; they now read credentials from environment variables.
- Never commit API tokens; keep them in environment variables or a secrets manager.
- Write throughput: batch many vectors per request. Vectorize logs writes to a write-ahead log, then an asynchronous job rebuilds the index files in R2; a job batches at most 200,000 vectors or 1,000 individual updates, whichever comes first. Inserting 250,000 vectors one at a time takes 250 jobs (at least an hour per the source); splitting into 100 files of 2,500 takes 2 or 3 jobs.
- Wrangler bulk upload: use a maximum of 5000 vectors per NDJSON file to avoid the global Cloudflare API rate limit; the file must be newline-delimited (not an array) and each vector needs a unique string `id`.
- Cardinality: high cardinality helps `$eq` selectiveness (for example one user ID), but range queries over many unique values (for example millisecond timestamps across a long period) read large parts of the reverse index and Vectorize degrades performance and query accuracy to finish. Bucket values (such as rounding to 5 minutes) and keep the original in a non-indexed field.
- Metadata can hold object keys (R2/database IDs), small JSON payloads, or timestamps.
- Namespace limit in the source text ("up to 1,000 namespaces per index") differs from the limits page (50,000 Workers Paid / 1000 Free); see the limits page.

## Related

- [Namespaces](./namespaces.md)
- [Metadata filtering](./metadata-filtering.md)
- [Binding API](./binding-api.md)
- [Limits](./limits.md)
