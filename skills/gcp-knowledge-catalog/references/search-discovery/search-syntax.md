---
source: https://docs.cloud.google.com/knowledge-catalog/docs/search-syntax
---

# Knowledge Catalog Search Syntax

Search queries combine semantic and keyword matching: simple and free-text terms, qualified predicates on metadata fields, aspect search and the logical operators `AND`, `OR` and `NOT` (uppercase, case-sensitive). `type`, `system`, `location` and aspect value search (not `has`) accept only the exact-match `=` qualifier.

## Signature / Usage

### AND (implicit with a space)

```text
system=bigquery type=table
```

```text
projectid:banking-prod column:customer_id
```

```text
system=bigquery AND type=table AND location=us-central1
```

### OR (group with parentheses)

```text
system=bigquery (type=table OR type=view)
```

```text
(system=bigquery OR system=spanner) type=table
```

```text
system=bigquery (parent:marketing_analytics OR parent:finance_analytics)
```

### NOT (`NOT` or `-`)

```text
type=table NOT projectid:sandbox-project
```

```text
type=table -projectid:sandbox-project
```

```text
system=bigquery -name:test
```

### Abbreviated syntax (`|` is OR, `,` is AND inside parentheses)

```text
projectid:(finance-prod|sales-prod|analytics-prod)
```

```text
column:(customer_id,transaction_date,amount)
```

```text
column:(customer_id|user_id|client_id)
```

### Hybrid search

```text
monthly active users type=table projectid:(data-warehouse|analytical-tier)
```

## Options / Props

### Qualifiers

| Qualifier | Description |
|---|---|
| `name:x` | `x` as a substring of the resource ID or display name |
| `displayname:x` | `x` as a substring of the display name |
| `column:x` | `x` as a substring of a column name (or nested column name) in the schema |
| `description:x` | `x` as a token in the description (`description:"prod"` does not match the token `products`) |
| `labels:bar` | Has a label whose key contains `bar` as a substring |
| `labels=bar` | Has a label whose key equals `bar` |
| `labels.bar:x` | `x` as a substring of the value of label key `bar` |
| `labels.foo=bar` | Label key `foo` with value `bar` |
| `type=TYPE` | Entry type or its type alias; requires `=` |
| `projectid:bar` | Projects whose ID contains `bar` |
| `parent:x` | `x` as a substring of the hierarchical path |
| `system=SYSTEM` | Resources from a system; requires `=` |
| `location=LOCATION` | Exact location name; requires `=`. `location=us-central1` matches Iowa; BigQuery Omni assets use the Omni location name (`location=aws-us-east-1` matches Northern Virginia) |
| `createtime` | Created within, before or after a date, timestamp or relative days |
| `updatetime` | Updated within, before or after a date, timestamp or relative days |

### Exact match versus substring

| Predicate key | Correct | Incorrect |
|---|---|---|
| `type` | `type=table` (or `type=view`, `type=dataset`) | `type:table`, `type:tab` |
| `system` | `system=bigquery` (or `system=spanner`) | `system:bigquery`, `system:big` |
| `location` | `location=us-central1` (or `location=europe-west1`) | `location:us-central1`, `location:us` |

`name`, `displayname`, `column`, `projectid` and `parent` support substring matching with `:`.

### Time filters

| Item | Supported |
|---|---|
| Operators | `:`, `=`, `<`, `>`, `<=`, `>=`, `=>`, `=<` |
| Relative days | `-Nd` only (for example `createtime>-30d`, `createtime<=-7d`, `updatetime=-1d`); hours, minutes, weeks, months and positive offsets are invalid |
| Calendar dates | `YYYY-MM-DD` or `YYYY/MM/DD` (also `2025-01`, `2025`), evaluated in GMT/UTC; `DD-MM-YYYY`, `MM/DD/YYYY` and month names are invalid |
| Timestamps | `YYYY-MM-DDTHH:MM:SS` or `YYYY-MM-DDTHH:MM:SSZ`; partial timestamps such as `YYYY-MM-DDTHH:MM` or `YYYY-MM-DDTHH` also work; time zone offsets and abbreviations (`-08:00`, `EST`) are invalid |
| Time-of-day ranges | Not supported; use two bounds, for example `createtime>=2025-01-15T09:00:00 createtime<=2025-01-15T17:00:00` |
| Natural language dates | Not supported (`yesterday`, `"last week"`); use `-1d` or explicit dates |

### Label filters

| Query pattern | Example | Description |
|---|---|---|
| `labels=KEY` | `labels=environment` | Has a label with the exact key, any value |
| `labels:KEY_SUBSTRING` | `labels:tier` | Label key contains the substring (`service_tier`, `storage_tier`) |
| `labels.KEY=VALUE` | `labels.env=prod` | Key `env` with value exactly `prod` |
| `labels.KEY:VALUE_SUBSTRING` | `labels.owner:analytics` | Key `owner` whose value contains `analytics` |
| Multiple labels (AND) | `labels.env=prod labels.data_tier=tier1` | Both labels attached |
| With system and type | `system=bigquery type=table labels.env=prod labels.confidentiality=high` | BigQuery tables with both labels |

### Aspect search

| Qualifier | Description |
|---|---|
| `aspect:x` or `has:x` | `x` as a substring of the full path to an attached aspect's aspect type, in the format `projectid.location.ASPECT_TYPE_ID` |
| `aspect=x` or `has=x` | `x` as the full path to the aspect type, in the format `projectid.location.ASPECT_TYPE_ID` |
| `x OPERATOR value` | Aspect field values. System aspect types: `ASPECT_TYPE_ID.FIELD_NAME`, `dataplex-types.ASPECT_TYPE_ID.FIELD_NAME` or `dataplex-types.LOCATION.ASPECT_TYPE_ID.FIELD_NAME` (for example `bigquery-dataset.type=default`, `dataplex-types.bigquery-dataset.type=default`, `dataplex-types.global.bigquery-dataset.type=default`). Custom aspect types: `PROJECT_ID.ASPECT_TYPE_ID.FIELD_NAME` (global) or `PROJECT_ID.REGION.ASPECT_TYPE_ID.FIELD_NAME` (for example `example-project.us-central1.employee-info.is-enrolled=true`, `example-project.employee-info.is-enrolled=true`) |

| Aspect field type | Operators |
|---|---|
| String | `=` (exact match) |
| All number types | `=`, `:`, `<`, `>`, `<=`, `>=`, `=>`, `=<` |
| Enum | `=` |
| Datetime | Same as numbers, values compared as datetimes |
| Boolean | `=` |

### Operator precedence (highest to lowest)

| Order | Operator |
|---|---|
| 1 | Parentheses `( )` |
| 2 | `NOT` or `-` |
| 3 | `OR` |
| 4 | `AND`, including implicit space-separated AND |

## Notes

- Aspect substring matching tries a limited number of aspects; use the full path to narrow the search and increase recall. Only top-level aspect fields are searchable.
- `OR` binds tighter than `AND`: `projectid:banking-prod AND type=table OR type=view` and `projectid:banking-prod type=table OR type=view` both evaluate as `projectid:banking-prod AND (type=table OR type=view)`; `(projectid:banking-prod AND type=table) OR type=view` overrides it.
- Wildcards are not supported: `*` and `?` are literal characters. Use `name:_masked` (supported), not `name:*_masked`.
- Do not wrap a natural language question in parentheses (incorrect: `(Show me datasets about US population by state)`), do not mix nested boolean trees with natural language (incorrect: `(revenue data) AND system=BIGQUERY AND projectid:(data-warehouse | analytical-tier)`, correct: `revenue data system=bigquery projectid:(data-warehouse|analytical-tier)`), and do not add spaces inside predicate groups (incorrect: `column:( email | id )`, correct: `column:(email|id)`).
- Keyword-only search mode is kept for backward compatibility (https://docs.cloud.google.com/knowledge-catalog/docs/keyword-search).
- The BigQuery tables and Omni locations referenced here are in `gcp-bigquery`; Knowledge Catalog catalogs them.
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/search-syntax (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-search.md](./about-search.md)
- [search-assets.md](./search-assets.md)
