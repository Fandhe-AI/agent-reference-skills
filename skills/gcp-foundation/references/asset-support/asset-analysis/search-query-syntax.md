---
source: https://docs.cloud.google.com/asset-inventory/docs/search-query-syntax
---

# Cloud Asset Inventory Search Query Syntax

Query language for `searchAllResources` and `searchAllIamPolicies`: a query is made of an asset metadata field, an operator, and a value.

## Signature / Usage

Exact match with `=` (case-sensitive, whole value; list fields match if one element matches; no wildcards):

```
ASSET_METADATA_FIELD=QUERY
location=us-central1-a
```

Partial match with `:` (tokenized, case-insensitive, phrases/combinations/wildcards allowed):

```
ASSET_METADATA_FIELD:QUERY
location:us-central1
```

Match examples for a `location` value of `us-central1-a`:

```
location=us-central1-a          # match (exact)
location:US-Central1-A          # match (case-insensitive)
location:"us central1 a"        # match (consecutive words)
location:(central1 us a)        # match (any order)
location:(a "us central1")      # match
location:us-central*            # match (prefix)
location=US-central1-a          # no match (case-sensitive)
location=us-central1            # no match (partial; use ":")
```

Phrases, combinations, negation, wildcards:

```
policy:"alex 2020"
policy:alex.2020@example.com
location:"us central1"
description:"One of \"those\" descriptions."
--query="location:(a \"us central1\")"
policy:(alex charlie)
policy:(alex AND charlie)
policy:((alex charlie) OR bola)
policy:(("alex 2020") OR bola)
policy:(alex charlie) OR name:bola
NOT state:running
NOT policy:(alex OR charlie)
NOT (networkTags:internal OR networkTags:private)
labels.env:*
```

Numeric and timestamp comparison (`=`, `>`, `>=`, `<`, `<=`; timestamps as epoch seconds or UTC+0 `YYYY-MM-DD` / `"YYYY-MM-DDThh:mm:ss"`):

```
createTime=1609459200
createTime>2020-01-01
createTime>="2021-01-01T00:00:00"
createTime<2022-01-01
createTime<="2021-01-01T00:00:00"
```

## Options / Props

Tokenization rules for `:`: leading and trailing special characters are removed; characters other than `[a-zA-Z0-9]`, `_`, and `&` are delimiters.

| Input | Tokens |
|-------|--------|
| `us-central1` | `[us,central1]` |
| `alex-2020@EXAMPLE.com` | `[alex,2020,example,com]` |
| `google.com/cloud` | `[google,com,cloud]` |
| `Compute %Instance%` | `[compute,instance]` |
| `compute*storage` | `[compute,storage]` |
| `compute&storage` | `[compute&storage]` |
| `ALEX_test@example.com` | `[alex_test,example,com]` |
| `instance/_my_vm_` | `[instance,_my_vm_]` |

Wildcard `*` meaning by position:

| Position | Meaning |
|----------|---------|
| End of phrase | Token prefix match; `"al 20*"` equals `(al* 20*)` |
| Only value in `labels.KEY:*` | Label key existence check (only `labels` supports this) |
| Middle of phrase | Delimiter; `"compute*storage"` equals `"compute storage"` |
| Both beginning and end | Delimiter; `"*compute storage*"` equals `"compute storage"` |

## Notes

- Max 10 comparisons and 2048 characters per partial-match query.
- A phrase of only `[a-zA-Z]`, digits, `[_-+.@/&]` or `*` needs no quotes; phrases with spaces or other special characters must be double-quoted; escape `"` and `\` inside quotes as `\"` and `\\`; in gcloud and REST the quotes themselves must be escaped.
- `AND`/`OR`/`NOT` must be uppercase. `AND` is optional inside parentheses. Combining `AND` and `OR` in one set of parentheses (`policy:(alex charlie OR bola)`) is invalid; nest parentheses.
- For list fields, `AND` does not require all words in a single element.
- Negation (`NOT`) is supported only when searching resources, not IAM policies.
- Searchable fields: see `ResourceSearchResult` fields for `searchAllResources` and `IamPolicySearchResult` fields for `searchAllIamPolicies`.
- Source: https://docs.cloud.google.com/asset-inventory/docs/search-query-syntax (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [search-resources.md](./search-resources.md)
- [search-iam-policies.md](./search-iam-policies.md)
