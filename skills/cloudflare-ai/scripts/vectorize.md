---
source: https://developers.cloudflare.com/vectorize/get-started/intro/, https://developers.cloudflare.com/vectorize/reference/wrangler-commands/
---

# Vectorize

Wrangler commands for creating Vectorize indexes and metadata indexes, working with vectors, inspecting, and deleting.

Full Wrangler global flags belong to the cloudflare-wrangler skill. Vectorize V2 needs Wrangler 3.71.0 or later; `npx wrangler@latest vectorize` always uses the latest.

## Signature / Usage

### Create a Worker project

```sh
npm create cloudflare@latest -- vectorize-tutorial
```

```sh
cd vectorize-tutorial
```

### Create an index

```sh
npx wrangler vectorize create tutorial-index --dimensions=32 --metric=euclidean
```

`--dimensions` and `--metric` (`euclidean`, `cosine`, or `dot-product`) cannot be changed after creation. Other documented flags: `--preset`, `--description`, `--json`, `--use-remote`, `--update-config`, `--binding`. The command prints the `[[vectorize]]` binding to add to the Wrangler file.

### Configure the index binding

```jsonc
{
	"vectorize": [
		{
			"binding": "VECTORIZE", // available in your Worker on env.VECTORIZE
			"index_name": "tutorial-index"
		}
	]
}
```

```toml
[[vectorize]]
binding = "VECTORIZE"
index_name = "tutorial-index"
```

### Create a metadata index

```sh
npx wrangler vectorize create-metadata-index tutorial-index --property-name=url --type=string
```

Create metadata indexes before inserting vectors. Up to 10 per index; types are `string`, `number`, `boolean`. The tutorial and the client API page write the flag as `--property-name`; the Wrangler commands reference lists it as `--propertyName`.

### List metadata indexes

```sh
npx wrangler vectorize list-metadata-index tutorial-index
```

### Delete a metadata index

> **Warning**: Removes filtering on the property for the index.

Snippet taken from https://developers.cloudflare.com/vectorize/reference/client-api/

Adapted (not in the official docs): prefixed with `npx` so the project-local Wrangler is used. See Notes.

```sh
npx wrangler vectorize delete-metadata-index <index-name> --property-name='some-prop'
```

The property flag (`--propertyName` in the commands reference) is required.

### Get index information

```sh
npx wrangler vectorize info tutorial-index
```

Shows dimensions, vector count and the last processed mutation.

### Get and list indexes

```sh
npx wrangler vectorize get <NAME>
```

```sh
npx wrangler vectorize list
```

Both accept `--json`.

### Insert and upsert vectors

Snippet taken from https://developers.cloudflare.com/vectorize/best-practices/insert-vectors/

Adapted (not in the official docs): prefixed with `npx` so the project-local Wrangler is used. See Notes.

```sh
npx wrangler vectorize insert <your-index-name> --file=embeddings.ndjson
```

Adapted (not in the official docs): the required `--file` flag from the commands reference is appended to the `upsert` syntax line so the command runs as shown. See Notes.

```sh
npx wrangler vectorize upsert <your-index-name> --file=embeddings.ndjson
```

Both require `--file <FILE>`, a file of line-separated JSON (ndjson) vector objects. `insert` defaults to `--batch-size` 1000 and does not overwrite existing ids; `upsert` defaults to 5000 and updates existing ids.

### List vectors

```sh
npx wrangler vectorize list-vectors <NAME>
```

Optional: `--count` (1-1000), `--cursor`, `--json`.

### Get vectors

Adapted (not in the official docs): the required `--ids` flag, with the example value from the commands reference, is appended to the syntax line. See Notes.

```sh
npx wrangler vectorize get-vectors <NAME> --ids a 'b' 1 '2'
```

`--ids` is required and takes one or more vector identifiers.

### Delete vectors

> **Warning**: Deletes the given vectors from the index.

Adapted (not in the official docs): the required `--ids` flag, with the example value from the commands reference, is appended to the syntax line. See Notes.

```sh
npx wrangler vectorize delete-vectors <NAME> --ids a 'b' 1 '2'
```

`--ids` is required and takes one or more vector identifiers.

### Query

```sh
npx wrangler vectorize query <NAME>
```

Pass the query vector with `--vector` or an existing vector's id with `--vector-id`. Other options: `--top-k` (default 5), `--return-values`, `--return-metadata`, `--namespace`, `--filter`.

### Log in and deploy

```sh
npx wrangler login
```

```sh
npx wrangler deploy
```

### Delete an index

> **Warning**: Deleting an index is destructive. `--force` (alias `-y`) skips the confirmation prompt.

```sh
npx wrangler vectorize delete <NAME>
```

### Legacy V1 indexes

Legacy V1 indexes need `--deprecated-v1` on `create`, `get`, `list`, `delete` and `insert`. V1 creation is no longer available; see the legacy transition page in the references.

## Notes

- Adapted from the official docs: the guide snippets for `delete-metadata-index` and `insert` (written as bare `wrangler`) are prefixed with `npx`, and the required `--file` / `--ids` flags are appended to the `upsert`, `get-vectors` and `delete-vectors` syntax lines from the commands reference so each command runs as shown.
- `delete` and `delete-vectors` cannot be undone; double-check the index name before running them against a production index.

## Related

- [Wrangler commands](../references/vectorize/wrangler-commands.md)
- [Getting started](../references/vectorize/getting-started.md)
- [Metadata filtering](../references/vectorize/metadata-filtering.md)
- [Insert vectors](../references/vectorize/insert-vectors.md)
