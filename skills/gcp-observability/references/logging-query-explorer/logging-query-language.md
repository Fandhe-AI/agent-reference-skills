---
source: https://docs.cloud.google.com/logging/docs/view/logging-query-language
---

# Logging query language: syntax, comparisons and fields

The Logging query language is the Boolean filter syntax used in the Logs Explorer, the Logging API (`entries.list`), the `gcloud logging` commands, sink filters and log-based metric filters. A query is a Boolean expression over `LogEntry` fields that selects a subset of the log entries in a Google Cloud resource such as a project or folder. This page covers the grammar, operators, field paths, value conversions and comments; functions and `SEARCH` are in [logging-query-functions.md](./logging-query-functions.md), regular expressions, indexing and troubleshooting in [logging-query-regex-and-performance.md](./logging-query-regex-and-performance.md).

## Signature / Usage

### Basic restrictions

```text
resource.type = "gce_instance" AND
severity >= "ERROR" AND
NOT textPayload:robot
```

### Grammar

```text
expression = ["NOT"] comparison { ("AND" | "OR") ["NOT"] comparison }
```

`NOT` has the highest precedence, then `OR`, then `AND`. These two are equivalent:

```text
"a" OR NOT "b" AND NOT "c" OR "d"
("a" OR (NOT "b")) AND ((NOT "c") OR "d")
```

`AND` can be omitted and `NOT` can be written as `-`:

```text
a="b" AND c="d" AND NOT e="f"
a="b" c="d" -e="f"
```

### Comparison form and field paths

```text
[FIELD_NAME] [OP] [VALUE]
```

```text
resource.type
resource.labels.zone
resource.labels.project_id
insertId
jsonPayload.httpRequest.protocol
labels."compute.googleapis.com/resource_id"
```

Parenthesized values apply the field name and operator to each element:

```text
jsonPayload.cat = ("longhair" OR "shorthair")
jsonPayload.animal : ("nice" AND "pet")
```

### JSON null, special characters, missing fields

```text
jsonPayload.field = NULL_VALUE      -- includes "field" with null value
NOT jsonPayload.field = NULL_VALUE  -- excludes "field" with null value
```

```text
jsonPayload.":name":apple

jsonPayload."foo.bar":apple

jsonPayload."\"foo\"":apple
```

```text
operation.id:*
```

```text
-- Returns TRUE
NOT missingField=foo
```

```text
-- Returns FALSE
missingField!=foo
```

### Comments

```text
 -- All of our target users are emitted by Compute Engine instances.
 resource.type = "gce_instance"
 -- Looking for logs from "alex".
 jsonPayload.targetUser = "alex"
```

### Global restrictions and time

```text
("cat" AND ("hat" OR "bat"))
```

```text
timestamp >= "2023-11-29T23:00:00Z"
timestamp <= "2023-11-29T23:30:00Z"
```

## Options / Props

### Limits and case rules

| Item | Rule |
|---|---|
| Query length | Can't exceed 20,000 characters; comments count toward the limit. |
| Case | Case-insensitive, except regular expressions and logical operators. `AND`, `OR`, `NOT` must be capitalized; lowercase `and`, `or`, `not` are parsed as search terms. |
| Log views | Filters used by log views support only `AND` and `NOT` (no `OR`). All other filters can use `AND`, `OR`, `NOT`. |
| Mixing `AND` / `OR` | Nest with parentheses; without them the query might not work as intended. |
| Map / struct keys | `jsonPayload` and `labels` keys keep their letter case and formatting (`jsonPayload.end_time` differs from `jsonPayload.endTime`); `protoPayload` fields don't need case preserved. |

### Comparison operators

| Operator | Meaning |
|---|---|
| `=` | equal |
| `!=` | not equal |
| `>` `<` `>=` `<=` | numeric ordering |
| `:` | "has"; matches any substring in the log entry field (applies to `string` and `bytes`) |
| `=~` | regular expression search for a pattern |
| `!~` | regular expression search not for a pattern |

### Top-level `LogEntry` fields

| Field | Next-level names |
|---|---|
| `httpRequest` | `cacheFillBytes`, `cacheHit`, `cacheLookup`, `cacheValidatedWithOriginServer`, `latency`, `protocol`, `referer`, `remoteIp`, `requestMethod`, `requestSize`, `requestUrl`, `responseSize`, `serverIp`, `status`, `userAgent` |
| `insertId` | — |
| `jsonPayload` | variable |
| `labels` | variable |
| `logName` | — (a string; no subfields) |
| `metadata` | `systemLabels`, `userLabels` |
| `operation` | `id`, `producer`, `first`, `last` |
| `protoPayload` | `@type`, variable |
| `receiveTimestamp` | — |
| `resource` | `type`, `labels` |
| `severity` | — |
| `sourceLocation` | `file`, `line`, `function` |
| `spanId`, `textPayload`, `timestamp`, `trace` | — |

### Missing fields

| Field kind | Behavior |
|---|---|
| In `jsonPayload` / `protoPayload` or a `labels` key | **Missing**: no error, all comparisons using it fail silently (e.g. `jsonPayload.nearest_store`). |
| Defined in `LogEntry` (e.g. `httpRequest.remoteIp`, `trace`, `operation.producer`) | **Defaulted**: compared as if present with its default value. |
| Otherwise (e.g. `thud`, `textPayload.thud`) | **Undefined**: an error detected before the query is used. |

### Value conversions (right-hand side to field type)

| Field type | Permitted query value |
|---|---|
| `bool` | "True" or "false" in any letter case. |
| `bytes` | A string containing any sequence of bytes, e.g. "\\377\\377". |
| `Duration` | Signed decimal number followed by "ns", "us", "ms", "s", "m", or "h"; accurate to nanoseconds, e.g. "3.2s". |
| `enum` | Name of an enumeration literal, case-insensitive, e.g. "WARNING" (`LogSeverity`). |
| `double` | Any number with or without sign and exponent, or "NaN", "-Infinity", "Infinity" (any case), e.g. "-3.2e-8". |
| `intNN` | Any signed integer that fits the type, e.g. "-3". 64-bit values are written as strings, e.g. "9223372036854775807". |
| `uintNN` | Any unsigned integer that fits the type, e.g. "1234". |
| `string` | UTF-8 or 7-bit ASCII text; embedded quotes escaped with a backslash. Must be double-quoted when starting with `+`, `-` or `.`, when containing `~`, `=`, `()`, `:`, `>`, `<`, `,`, `.` or `*`, or when containing any escape sequence such as `\t`. |
| `Timestamp` | RFC 3339 or ISO 8601, e.g. "2024-08-02T15:01:23.045Z", "2024-08-02"; RFC 3339 can carry `Z` or `±hh:mm`; nanosecond accuracy. `YYYY-MM-DD` is read as `YYYY-MM-DDT00:00:00Z`. |

### Operator semantics by field type

| Type | `=` / `!=` and ordering |
|---|---|
| numeric | Normal meaning. |
| `bool` | Same Boolean value; `true` > `false`. |
| `enum` | Same literal; ordering uses the underlying numeric values. |
| `Duration` | Same length; ordering by length (`"1s"` > `"999ms"`). |
| `Timestamp` | Same instant; `a < b` means a is earlier. |
| `bytes` | Byte by byte, left to right. |
| `string` | Case-insensitive: both operands are normalized with NFKC_CF Unicode normalization, then compared lexicographically. Regular expression searches aren't normalized. |

### Types of log fields

| Where | How the type is determined |
|---|---|
| `LogEntry` and component types | Protocol buffer fields with explicit types. |
| `protoPayload` | Protocol buffer fields; type name in `"@type"`. For an `Any` field the `value` field is traversed automatically, so omit `value` from the query. |
| `jsonPayload` | Inferred when received: unquoted numbers are `double`, `true`/`false` are `bool`, strings are `string`. 64-bit integers are stored in string fields. |
| `Duration`, `Timestamp` | Recognized only in protocol buffer fields; elsewhere stored as strings. |

## Notes

- The substring operator `:` on indexed fields doesn't take advantage of log indexes. Global restrictions (a bare value) use the `:` operator on every field and can be slow; prefer the `SEARCH` function (see the functions page).
- Forms of restriction: simple `resource.type = "k8s_cluster"`; conjunctive `... AND severity = "ERROR"`; disjunctive `resource.type = ("k8s_cluster" OR "gce_instance")`; mixed `resource.type = "k8s_cluster" AND (severity = "ERROR" OR "error")`.
- A failed value conversion makes the comparison fail. A string can be given where a number is needed, and unquoted text or numbers where a string is needed, if they contain no special characters.
- Array fields: each member is compared to the value and the results are joined with `OR` (`jsonPayload.shoeSize < 7` on `{8.5, 9, 6}` succeeds).
- For monitored resource types see `https://docs.cloud.google.com/logging/docs/api/v2/resource-list`; `resource.type` values are indexed, so substring matches on them are slower.
- When several statements are given without an operator, Cloud Logging implicitly adds `AND`. When using `OR`, group clauses with parentheses.
- Sink filters and exclusion filters use this language: a sink filter or exclusion that matches too much diverts or drops logs, and excluded logs are not stored in the bucket. Try filters on a disposable project first.
- Log fields can hold personal data or secrets; do not put credentials in log payloads or in saved filters.
- Source: https://docs.cloud.google.com/logging/docs/view/logging-query-language (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [logging-query-functions.md](./logging-query-functions.md)
- [logging-query-regex-and-performance.md](./logging-query-regex-and-performance.md)
- [building-queries.md](./building-queries.md)
- [query-library.md](./query-library.md)
