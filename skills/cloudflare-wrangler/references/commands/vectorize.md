---
source: https://developers.cloudflare.com/workers/wrangler/commands/vectorize/
---

# Vectorize

Interact with a Vectorize vector database using Wrangler.

## Signature / Usage

```sh
npx wrangler vectorize create <NAME>
npx wrangler vectorize delete <NAME>
npx wrangler vectorize get <NAME>
npx wrangler vectorize list
npx wrangler vectorize list-vectors <NAME>
npx wrangler vectorize query <NAME>
npx wrangler vectorize insert <NAME>
npx wrangler vectorize upsert <NAME>
npx wrangler vectorize get-vectors <NAME>
npx wrangler vectorize delete-vectors <NAME>
npx wrangler vectorize info <NAME>
npx wrangler vectorize create-metadata-index <NAME>
npx wrangler vectorize list-metadata-index <NAME>
npx wrangler vectorize delete-metadata-index <NAME>
```

Descriptions:

- `create`: Create a Vectorize index
- `delete`: Delete a Vectorize index
- `get`: Get a Vectorize index by name
- `list`: List your Vectorize indexes
- `list-vectors`: List vector identifiers in a Vectorize index
- `query`: Query a Vectorize index
- `insert`: Insert vectors into a Vectorize index
- `upsert`: Upsert vectors into a Vectorize index
- `get-vectors`: Get vectors from a Vectorize index
- `delete-vectors`: Delete vectors in a Vectorize index
- `info`: Get additional details about the index
- `create-metadata-index`: Enable metadata filtering on the specified property
- `list-metadata-index`: List metadata properties on which metadata filtering is enabled
- `delete-metadata-index`: Delete metadata indexes

## Options / Props

### `vectorize create`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<NAME>` | string (required) | — | The name of the Vectorize index to create (must be unique). |
| `--dimensions` | number | — | The dimension size to configure this index for, based on the output dimensions of your ML model. |
| `--metric` | string | — | The distance metric to use for searching within the index. |
| `--preset` | string | — | The name of an preset representing an embeddings model: Vectorize will configure the dimensions and distance metric for you when provided. |
| `--description` | string | — | An optional description for this index. |
| `--json` | boolean | false | Return output as JSON |
| `--deprecated-v1` | boolean | false | Create a deprecated Vectorize V1 index. This is not recommended and indexes created with this option need all other Vectorize operations to have this option enabled. |
| `--use-remote` | boolean | — | Use a remote binding when adding the newly created resource to your config |
| `--update-config` | boolean | — | Automatically update your config file with the newly added resource |
| `--binding` | string | — | The binding name of this resource in your Worker |

### `vectorize delete`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<NAME>` | string (required) | — | The name of the Vectorize index |
| `--force` (alias `--y`) | boolean | false | Skip confirmation |
| `--deprecated-v1` | boolean | false | Delete a deprecated Vectorize V1 index. |

### `vectorize get`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<NAME>` | string (required) | — | The name of the Vectorize index. |
| `--json` | boolean | false | Return output as JSON |
| `--deprecated-v1` | boolean | false | Fetch a deprecated V1 Vectorize index. This must be enabled if the index was created with V1 option. |

### `vectorize list`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `--json` | boolean | false | Return output as JSON |
| `--deprecated-v1` | boolean | false | List deprecated Vectorize V1 indexes for your account. |

### `vectorize list-vectors`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<NAME>` | string (required) | — | The name of the Vectorize index |
| `--count` | number | — | Maximum number of vectors to return (1-1000) |
| `--cursor` | string | — | Cursor for pagination to get the next page of results |
| `--json` | boolean | false | Return output as JSON |

### `vectorize query`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<NAME>` | string (required) | — | The name of the Vectorize index |
| `--vector` | number | — | Vector to query the Vectorize Index |
| `--vector-id` | string | — | Identifier for a vector in the index against which the index should be queried |
| `--top-k` | number | 5 | The number of results (nearest neighbors) to return |
| `--return-values` | boolean | false | Specify if the vector values should be included in the results |
| `--return-metadata` | string | none | Specify if the vector metadata should be included in the results |
| `--namespace` | string | — | Filter the query results based on this namespace |
| `--filter` | string | — | Filter the query results based on this metadata filter. |

### `vectorize insert`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<NAME>` | string (required) | — | The name of the Vectorize index. |
| `--file` | string (required) | — | A file containing line separated json (ndjson) vector objects. |
| `--batch-size` | number | 1000 | Number of vector records to include when sending to the Cloudflare API. |
| `--json` | boolean | false | return output as JSON |
| `--deprecated-v1` | boolean | false | Insert into a deprecated V1 Vectorize index. This must be enabled if the index was created with the V1 option. |

### `vectorize upsert`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<NAME>` | string (required) | — | The name of the Vectorize index. |
| `--file` | string (required) | — | A file containing line separated json (ndjson) vector objects. |
| `--batch-size` | number | 5000 | Number of vector records to include in a single upsert batch when sending to the Cloudflare API. |
| `--json` | boolean | false | return output as JSON |

### `vectorize get-vectors`

| Flag | Type | Description |
| --- | --- | --- |
| `<NAME>` | string (required) | The name of the Vectorize index. |
| `--ids` | string (required) | Vector identifiers to be fetched from the Vectorize Index. Example: `--ids a 'b' 1 '2'` |

### `vectorize delete-vectors`

| Flag | Type | Description |
| --- | --- | --- |
| `<NAME>` | string (required) | The name of the Vectorize index. |
| `--ids` | string (required) | Vector identifiers to be deleted from the Vectorize Index. Example: `--ids a 'b' 1 '2'` |

### `vectorize info`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<NAME>` | string (required) | — | The name of the Vectorize index. |
| `--json` | boolean | false | return output as JSON |

### `vectorize create-metadata-index`

| Flag | Type | Description |
| --- | --- | --- |
| `<NAME>` | string (required) | The name of the Vectorize index. |
| `--propertyName` | string (required) | The name of the metadata property to index. |
| `--type` | string (required) | The type of metadata property to index. Valid types are 'string', 'number' and 'boolean'. |

### `vectorize list-metadata-index`

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `<NAME>` | string (required) | — | The name of the Vectorize index. |
| `--json` | boolean | false | return output as JSON |

### `vectorize delete-metadata-index`

| Flag | Type | Description |
| --- | --- | --- |
| `<NAME>` | string (required) | The name of the Vectorize index. |
| `--propertyName` | string (required) | The name of the metadata property to index. |

## Notes

- Vectorize binding API (`env.INDEX.query`) belongs to the cloudflare-storage skill.
- The official `--vector` flag is typed `number`; the `delete-metadata-index` `--propertyName` description says "to index" (kept verbatim).
- Each command also accepts the global flags; see the global flags page.

## Related

- [Global flags](./global-flags.md)
- [Commands overview](./overview.md)
