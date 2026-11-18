---
source: https://docs.cloud.google.com/logging/docs/view/logging-query-language
---

# Logging query language: functions and SEARCH

Built-in functions usable as global restrictions in Logging queries: `log_id`, `cast`, `regexp_extract`, `source`, `sample`, `ip_in_net`, and the token-based `SEARCH` function.

## Signature / Usage

### Function syntax

```text
function = identifier ( [ argument { , argument } ] )
```

`argument` is a value, field name, or a parenthesized expression.

### log_id

```text
log_id(non-URL-encoded log ID)
```

```text
log_id("cloudaudit.googleapis.com/activity")
```

### cast

```text
cast([FIELD], [TYPE][, OPTION])
```

```text
cast(timestamp, STRING, TIME_ZONE("America/New_York")) =~ "^2025-04-02.*"
```

### regexp_extract

```text
REGEXP_EXTRACT([FIELD], [REGULAR_EXPRESSION])
```

```text
CAST(REGEXP_EXTRACT(CAST(timestamp, STRING), "\\d+:\\d+:(\\d+)"), INT64) < 30
```

### source

```text
source(RESOURCE_TYPE/RESOURCE_ID)
```

### sample

```text
sample([FIELD], [FRACTION])
```

```text
logName = "projects/my-project/logs/syslog" AND sample(insertId, 0.25)
```

```text
field:* AND sample(field, 0.01)
```

### ip_in_net

```text
ip_in_net([FIELD], [SUBNET])
```

```text
logName = "projects/my_project/logs/my_log" AND
ip_in_net(jsonPayload.realClientIP, "10.1.2.0/24")
```

### SEARCH

```text
SEARCH([query])
SEARCH([field], [query])
```

```text
SEARCH("hello world")
SEARCH("World hello")
```

```text
SEARCH(textPayload, "hello world")
```

```text
SEARCH("`hello world`")
SEARCH("`Hello World`")
SEARCH("`HELLO WORLD`")
```

## Options / Props

### Functions

| Function | Argument rules |
|---|---|
| `log_id` | One non-URL-encoded log ID (alphanumerics plus `/`, `_`, `-`, `.`). Useful for custom log views on a bucket holding entries from many projects, folders or organizations. `log_id("cloudaudit.googleapis.com%2Factivity")` matches nothing. |
| `cast` | `[FIELD]`: log entry field (e.g. `logName`, `jsonPayload.a_field`). `[TYPE]`: `STRING`, `INT64`, `FLOAT64`, `BOOL`, `TIMESTAMP`, `DURATION`; some types take options, e.g. an IANA time zone via `TIME_ZONE("...")` for `TIMESTAMP`. |
| `regexp_extract` | `[REGULAR_EXPRESSION]` is RE2 and must contain exactly one capture group `(...)`; use a non-capturing group `(?:...)` for extra grouping. Zero or multiple capture groups is an error. Returns the first matching substring. |
| `source` | Matches entries from one resource in the hierarchy; doesn't match child resources (`source(folders/folder_123)` matches `folder_123`, not projects inside it). |
| `sample` | `[FIELD]` must be a string or numeric field (`insertId` is a good choice); `[FRACTION]` is greater than 0.0 and at most 1.0. |
| `ip_in_net` | `[FIELD]` is a string field holding an IP address or range (can be repeated: one match suffices); `[SUBNET]` is a string constant IP address or range, an error if illegal. Returns false when the field is missing, defaulted, or not a legal IP address or range. |

### source resource forms

| Resource | Example query |
|---|---|
| Organization | `source(organizations/ORGANIZATION_ID)` |
| Folder | `source(folders/FOLDER_ID)` |
| Google Cloud project | `source(projects/PROJECT_ID)` |

### ip_in_net supported values

| Kind | Example |
|---|---|
| IPv4 | `10.1.2.3` |
| IPv4 subnet | `10.1.2.0/24` |
| CIDR IPv6 | `1234:5678:90ab:cdef:1234:5678:90ab:cdef` |
| CIDR IPv6 subnet | `1:2::/48` |

### sample behavior

| Case | Result |
|---|---|
| `[FIELD]` present | A hash of the value is divided by the maximum hash; the entry is included if the fraction is at most `[FRACTION]`. Deterministic; skewed if hashed values aren't uniform. |
| `[FIELD]` always has the same value | The sample contains all or none of the entries. |
| `[FIELD]` missing from payload or `labels` | The entry isn't selected, even if `[FRACTION]` is 1. |
| `[FIELD]` is a defaulted `LogEntry` field | Treated as present with its default value; use `:*` to exclude defaulted entries. |

### SEARCH behavior

| Rule | Detail |
|---|---|
| `query` argument | Required; must be a string literal. Without it an error is returned. |
| Tokenization | The string is split by a text analyzer (BigQuery text analyzer rules). Comparisons are always case-insensitive, even for tokens in backticks (unlike BigQuery). |
| Matching | Exact token match, not substring (`SEARCH("world")` doesn't match `worldwide`). |
| No field given | The entry matches when it contains all tokens, in any order and in any fields. |
| Field given | Only that field is searched; it must contain all tokens, in any order. |
| Backticks | Wrap a phrase in backticks for a case-insensitive exact phrase match; token order then matters. |
| Limits | Can't match non-text fields. More efficient than global or substring searches. |

## Notes

- If you use the Logs Explorer search bar without double quotes, the `SEARCH` function is used: entering `world` runs `SEARCH("world")`, which matches `world` but not `worlds`.
- `SEARCH` with partial text does not match: `SEARCH("Hello Kit")` doesn't match "Hello Kitty".
- `log_id` corresponds to a `log_name` expression without the project part: `log_name="projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Fdata_access"` and `log_id("cloudaudit.googleapis.com/data_access")` match the same entries when the query scope holds only logs of `PROJECT_ID`.
- Source: https://docs.cloud.google.com/logging/docs/view/logging-query-language (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/logging/docs/view/query-library (retrieved 2026-11-18; CC BY 4.0), for the `log_name` / `log_id` equivalence.
- Corrected from the official docs: the source says `log_name="projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Fdata_access"` "is the same as" `log_id("cloudaudit.googleapis.com/data_access")`. The full log name also restricts the project, while `log_id` does not, so they match the same entries only when the query scope holds logs of that one project; on a log view or bucket with logs from several projects, `log_id` also matches the other projects' entries.

## Related

- [logging-query-language.md](./logging-query-language.md)
- [logging-query-regex-and-performance.md](./logging-query-regex-and-performance.md)
