---
source: https://developers.cloudflare.com/vectorize/reference/wrangler-commands/
---

# Wrangler commands (Vectorize)

Command names used with Vectorize; full flag tables live in the cloudflare-wrangler skill.

## Signature / Usage

```sh
npx wrangler vectorize create <NAME>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `vectorize create` | command | — | Create an index (`--dimensions`, `--metric`, `--preset`, `--description`, `--json`, `--deprecated-v1`, `--use-remote`, `--update-config`, `--binding`). |
| `vectorize delete` | command | — | Delete an index (`--force` alias `-y`, `--deprecated-v1`). |
| `vectorize get` | command | — | Get an index by name. |
| `vectorize list` | command | — | List indexes. |
| `vectorize list-vectors` | command | — | List vector IDs (`--count` 1-1000, `--cursor`, `--json`). |
| `vectorize query` | command | — | Query an index (`--vector`, `--vector-id`, `--top-k` default 5, `--return-values` default false, `--return-metadata` default none, `--namespace`, `--filter`). |
| `vectorize insert` | command | — | Insert vectors from an NDJSON `--file` (`--batch-size` default 1000). |
| `vectorize upsert` | command | — | Upsert vectors from an NDJSON `--file` (`--batch-size` default 5000). |
| `vectorize get-vectors` | command | — | Fetch vectors by `--ids`. |
| `vectorize delete-vectors` | command | — | Delete vectors by `--ids`. |
| `vectorize info` | command | — | Index details, including last processed mutation. |
| `vectorize create-metadata-index` | command | — | Enable filtering on `--propertyName` with `--type` string, number, or boolean. |
| `vectorize list-metadata-index` | command | — | List metadata indexes. |
| `vectorize delete-metadata-index` | command | — | Delete a metadata index by `--propertyName`. |

## Notes

- Full per-flag documentation and global flags: cloudflare-wrangler skill, commands/vectorize.md.
- Guides write the property flag as `--property-name`; the command reference writes `--propertyName`.

## Related

- [Binding API](./binding-api.md)
- [Create indexes](./create-indexes.md)
- [List vectors](./list-vectors.md)
- [Metadata filtering](./metadata-filtering.md)
