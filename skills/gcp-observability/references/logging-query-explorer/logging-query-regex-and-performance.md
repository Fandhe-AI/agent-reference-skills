---
source: https://docs.cloud.google.com/logging/docs/view/logging-query-language
---

# Logging query language: regular expressions, fast queries and troubleshooting

Regular expression matching (`=~`, `!~`, RE2), time filters, indexed fields and the query-writing patterns that make log searches fast, plus syntax troubleshooting and `gcloud logging read` quoting.

## Signature / Usage

### Match or exclude a pattern

```text
jsonPayload.message =~ "regular expression pattern"
```

```text
jsonPayload.message !~ "regular expression pattern"
```

### Search by time

```text
timestamp >= "2023-11-29T23:00:00Z"
timestamp <= "2023-11-29T23:30:00Z"
```

```text
timestamp > "2023-11-29"
```

### Use the right log name

The log name `projects/my-project-id/logs/activity` matches nothing; the Admin Activity audit log is named `cloudaudit.googleapis.com/activity`, and the ID must be URL-encoded in a `logName` comparison:

```text
logName = "projects/my-project-id/logs/cloudaudit.googleapis.com%2Factivity"
```

### Choose the right log entries

```text
resource.type = "gce_instance" AND
resource.labels.instance_id = "6731710280662790612"
logName = "projects/my-project-id/logs/cloudaudit.googleapis.com%2Factivity"
```

### Avoid global searches

A bare `"Hello Kitty"` is a global search and is slow. Limit it to one field:

```text
textPayload:"Hello Kitty"
```

```text
logName = "projects/my-project_id/logs/somelog" AND
jsonPayload.my_favorite_cat = "Hello Kitty"
```

### Troubleshooting syntax

Parenthesize an `OR` list on the right-hand side, and double-quote values that contain special characters (`insertId = abc:def` is illegal):

```text
insertId = ("ABC-1" OR "ABC-2")
```

```text
insertId = "abc:def"
```

For an `Any` field, omit `value`:

```text
protoPayload.status.details.conditionNotMet.userVisibleMessage =~ "Specified reservation.*"
```

### gcloud logging read quoting

```bash
gcloud logging read 'resource.type=gce_instance AND jsonPayload.message="Stopped Unattended Upgrades Shutdown."'
gcloud logging read 'timestamp>="2020-06-17T21:00:00Z"'
```

## Options / Props

### Regular expression examples

| Query type | Example |
|---|---|
| Standard query | `sourceLocation.file =~ "foo"` |
| Case-insensitive search | `labels.subnetwork_name =~ "(?i)foo"` |
| Containing quotation marks | `jsonPayload.message =~ "field1=\"bar.*\""` |
| Boolean or | `labels.pod_name =~ "(foo\|bar)"` |
| Anchors | `logName =~ "/my%2Flog$"` |
| Not matching a pattern | `labels.pod_name !~ "foo"` |
| Boolean operator | `labels.env =~ ("^prod.*server" OR "^staging.*server")` |
| Begins with a value | `logName =~ "^foo"` |
| Ends with a value | `logName =~ "foo$"` |

### Regular expression characteristics

| Characteristic | Detail |
|---|---|
| Syntax | RE2. |
| Field types | Only `string` fields can be matched. |
| Normalization | None; `kubernetes` isn't the same as `KUBERNETES`. |
| Case and anchoring | Case sensitive; not anchored by default. |
| Quoting | The pattern must be in double quotes; escape embedded quotes with a backslash. |
| Boolean operators | Allowed between multiple regular expressions on the right of `=~` and `!~`. |

### Always-indexed `LogEntry` fields

| Field |
|---|
| `resource.type` |
| `resource.labels.*` |
| `logName` |
| `severity` |
| `timestamp` |
| `insertId` |
| `operation.id` |
| `trace` |
| `httpRequest.status` |
| `labels.*` |
| `split.uid` |

### Query optimization

| Guidance | Detail |
|---|---|
| Reduce scope | Reduce the number of logs, the number of entries, or the time span (ideally all three). |
| Custom indexes | Add custom indexed fields to any log bucket, or use `SEARCH`, to accelerate a query. |
| Avoid `OR` | Queries with only `AND` make better use of indexes; `OR` queries can be slow and can't use indexes. `SEARCH("foo") AND SEARCH("bar")` is faster than `SEARCH("foo") OR SEARCH("bar")`. |
| Avoid global searches | A bare value is a substring search over every field. Limit it to one field, use equality, reference individual `jsonPayload` fields, restrict with an indexed field, or use `SEARCH` with the complete text. |
| Time period | Use RFC 3339 timestamps (replace the space with `T`). |

### Syntax checklist

| Check | Detail |
|---|---|
| Parentheses and quotes | Balanced. |
| Field names | Correctly spelled. |
| Operators | `AND`, `OR`, `NOT` in uppercase. |
| JSON null | Use `NULL_VALUE`. |
| Boolean right-hand sides | Parenthesize `OR` lists after a field comparison. |
| Special characters | Unquoted text can't contain them; double-quote when in doubt. |
| `Any` fields | Don't include `value` (for example, use `protoPayload.status.details.conditionNotMet...`, not `protoPayload.status.details.value.conditionNotMet...`). |

## Notes

- Regular expression queries can be faster than substring queries: `jsonPayload.message =~ "foo.*bar|bar.*foo"` can beat `jsonPayload.message : ("foo" AND "bar")`.
- The gcloud CLI requires the query in quotes; to use double quotes for escaping inside, wrap the whole query in single quotes.
- Log names in a `logName` comparison must URL-encode the log ID (`cloudaudit.googleapis.com%2Factivity`); `log_id()` takes the non-encoded form.
- Source: https://docs.cloud.google.com/logging/docs/view/logging-query-language (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [logging-query-language.md](./logging-query-language.md)
- [logging-query-functions.md](./logging-query-functions.md)
- [troubleshoot.md](./troubleshoot.md)
