---
source: https://developers.cloudflare.com/ai-search/configuration/indexing/metadata/
---

# Metadata attributes

Built-in metadata (`filename`, `folder`, `timestamp`) and custom metadata schemas used for filtering and boosting.

## Signature / Usage

```ts
custom_metadata: [
	{ field_name: "category", data_type: "text" },
	{ field_name: "version", data_type: "number" },
	{ field_name: "is_public", data_type: "boolean" },
];
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `filename` | built-in | — | File name, e.g. `docs/getting-started/guide.pdf`. |
| `folder` | built-in | — | Prefix, e.g. `docs/getting-started/`. |
| `timestamp` | built-in | — | Unix milliseconds of last modification; comparisons round down to seconds. |
| `text` | data type | — | String values. |
| `number` | data type | — | Parsed as float. |
| `boolean` | data type | — | `true`, `false`, `1`, `0`, `yes`, `no`. |
| `datetime` | data type | — | e.g. `"2026-01-15T00:00:00Z"`. |

## Notes

- Constraints: max 5 custom fields per instance; names case-insensitive, stored lowercase; reserved names `timestamp`, `folder`, `filename`.
- Changing the schema triggers a full reindex (added fields indexed, removed fields deleted).
- Attach metadata per source: R2 via `x-amz-meta-*` headers, websites via `<meta>` tags, built-in storage via the Items API `metadata` option.
- Storage: each vector holds a shared 10 KiB compact JSON envelope (field names, JSON syntax, system metadata, customer metadata). Only the first 64 UTF-8 bytes of each indexed string are filterable.
- Vectorize details: Vectorize metadata filtering (see the sibling category).

## Related

- [Filtering](./filtering.md)
- [Result controls and boosting](./result-controls-and-boosting.md)
- [R2 data source](./data-source-r2.md)
- [Vectorize](../vectorize/README.md)
