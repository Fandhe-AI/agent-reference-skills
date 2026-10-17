---
source: https://docs.astral.sh/uv/concepts/indexes/#flat-indexes
---

# Flat indexes and --index-url

By default, `[[tool.uv.index]]` entries are assumed to be PyPI-style registries implementing the PEP 503 Simple Repository API. uv also supports "flat" indexes: local directories or HTML pages containing flat lists of wheels and source distributions (pip's `--find-links`).

## Signature / Usage

```toml
[[tool.uv.index]]
name = "example"
url = "/path/to/directory"
format = "flat"
```

## --index-url and --extra-index-url

Pip-style `--index-url` and `--extra-index-url` command-line options are supported for compatibility: `--index-url` defines the default index and `--extra-index-url` defines additional indexes. They can be used together with `[[tool.uv.index]]` and follow the same prioritization rules:

- The default index is always treated as lowest priority, whether defined via the legacy `--index-url`, the recommended `--default-index`, or a `[[tool.uv.index]]` entry with `default = true`.
- Indexes are consulted in the order in which they are defined, via the legacy `--extra-index-url`, the recommended `--index`, or `[[tool.uv.index]]` entries.

`--index-url` and `--extra-index-url` can be thought of as unnamed `[[tool.uv.index]]` entries, with `default = true` enabled for the former. `--index-url` maps to `--default-index`, and `--extra-index-url` maps to `--index`.

## Notes

- Flat indexes support the same feature set as Simple Repository API indexes (e.g., `explicit = true`); a package can also be pinned to a flat index using `tool.uv.sources`.

## Related

- [Package indexes](./indexes.md)
- [Index authentication](./index-authentication.md)
