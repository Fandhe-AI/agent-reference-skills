---
source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/configuration
---

# Ops Agent logging processors

Optional logging processors describe how to manipulate the information collected by a receiver. Each processor has a unique `PROCESSOR_ID` and a `type`. This page covers `parse_json`, `parse_multiline`, `parse_regex` and `exclude_logs`; `modify_fields` is in configuration-logging-modify-fields.md.

## Signature / Usage

### Processor structure

```text
processors:
  PROCESSOR_ID:
    type: parse_json
    ...
  PROCESSOR_ID_2:
    type: parse_regex
    ...
```

### `parse_json`

Parses the input JSON into the `jsonPayload` field of the `LogEntry`; other parts of the `LogEntry` can be set with the special top-level fields.

```text
processors:
  PROCESSOR_ID:
    type: parse_json

    time_key:    <field name within jsonPayload>
    time_format: <strptime format string>
```

```yaml
processors:
  PROCESSOR_ID:
    type: parse_json

    time_key:    time
    time_format: "%Y-%m-%dT%H:%M:%S.%L%Z"
```

### `parse_multiline` (Linux only)

```text
processors:
  PROCESSOR_ID:
    type: parse_multiline

    match_any:
    - type: <type of the exceptions>
      language: <language name>
```

Adapted (not in the official docs): the source writes `regex` as a double-quoted YAML scalar containing `\d`, which is not a valid YAML escape sequence; the example uses a single-quoted scalar (with `\n` for the source's `\\n`), which gives the same regular expression.

```yaml
logging:
  receivers:
    custom_file1:
      type: files
      include_paths:
      - /tmp/test-multiline28
  processors:
    parse_java_multiline:
      type: parse_multiline
      match_any:
      - type: language_exceptions
        language: java
    extract_structure:
      type: parse_regex
      field: message
      regex: '^(?<time>[\d-]*T[\d:.Z]*) (?<severity>[^ ]*) (?<file>[^ :]*):(?<line>[\d]*) - (?<message>(.|\n)*)$'
      time_key: time
      time_format: "%Y-%m-%dT%H:%M:%S.%L"
    move_severity:
      type: modify_fields
      fields:
        severity:
          move_from: jsonPayload.severity
  service:
    pipelines:
      pipeline1:
        receivers: [custom_file1]
        processors: [parse_java_multiline, extract_structure, move_severity]
```

### `parse_regex`

```text
processors:
  PROCESSOR_ID:
    type: parse_regex

    regex: <regular expression>

    time_key:    <field name within jsonPayload>
    time_format: <format string>
```

```yaml
processors:
  PROCESSOR_ID:
    type: parse_regex

    regex:       "^(?<time>[^ ]*) (?<severity>[^ ]*) (?<msg>.*)$"
    time_key:    time
    time_format: "%Y-%m-%dT%H:%M:%S.%L%Z"
```

### `exclude_logs`

Available starting in Ops Agent 2.9.0.

```text
type: exclude_logs
match_any:
  - <filter>
  - <filter>
```

```yaml
processors:
  PROCESSOR_ID:
    type: exclude_logs
    match_any:
    - '(jsonPayload.message =~ "log spam 1" OR jsonPayload.message =~ "log spam 2") AND severity = "ERROR"'
    - 'jsonPayload.application = "foo" AND severity = "INFO"'
```

An example rule that uses a regular expression to exclude all `DEBUG` and `INFO` level logs:

```text
severity =~ "(DEBUG|INFO)"
```

## Options / Props

### Processor types

| `type` | Description | Availability |
|---|---|---|
| `parse_json` | Parse JSON-formatted structured logs | All |
| `parse_multiline` | Parse multiline logs | Linux only |
| `parse_regex` | Parse text-formatted logs via regex patterns into JSON-formatted structured logs | All |
| `exclude_logs` | Exclude logs that match specified rules | Starting in 2.9.0 |
| `modify_fields` | Set / transform fields in log entries | Starting in 2.14.0 |

### Options

| Processor | Option | Required | Description |
|---|---|---|---|
| `parse_json` | `time_key` | Optional | Name of the field with the timestamp; the extracted value sets `LogEntry.timestamp` and is removed from the payload |
| `parse_json` | `time_format` | Required if `time_key` is used | Format of the `time_key` field, per `strptime(3)` |
| `parse_multiline` | `match_any` | Required | List of one or more rules |
| `parse_multiline` | `match_any[].type` | Required | Only `language_exceptions`: concatenates exceptions into one `LogEntry` based on `language` |
| `parse_multiline` | `match_any[].language` | Required | `java`, `python` or `go`: concatenates common exceptions of that language into one `LogEntry` |
| `parse_regex` | `regex` | Required | Regular expression with key names for matched subexpressions, for example `"^(?<time>[^ ]*) (?<severity>[^ ]*) (?<msg>.*)$"`; text matched by named capture groups goes into `LogEntry.jsonPayload` fields |
| `parse_regex` | `time_key` | Optional | As for `parse_json` |
| `parse_regex` | `time_format` | Required if `time_key` is used | As for `parse_json`, per `strptime(3)` |
| `exclude_logs` | `match_any` | Required | List of one or more rules; if an entry matches any rule, the agent does not ingest it |

### `exclude_logs` rule syntax

| Item | Supported |
|---|---|
| Fields (case-sensitive, and their subfields) | `httpRequest`, `jsonPayload`, `labels`, `operation`, `severity`, `sourceLocation`, `trace`, `spanId` |
| Comparison operators (string comparisons only) | `=`, `!=`, `:`, `=~`, `!~` |
| Navigation operator | `.` (for example `jsonPayload.message`) |
| Boolean operators | `AND`, `OR`, `NOT` |
| Grouping | `(` `)` |

## Notes

- In the multiline example, `field: message` applies the regular expression to `jsonPayload.message`; by default the `files` receiver places each line into a single `jsonPayload.message` field. `extract_structure` places extracted fields into `jsonPayload` subfields, `time_key: time` sets `LogEntry.timestamp`, and `move_severity` moves `jsonPayload.severity` to `LogEntry.severity`.
- Adapted from the official docs: the original `regex` was `"^(?<time>[\d-]*T[\d:.Z]*) (?<severity>[^ ]*) (?<file>[^ :]*):(?<line>[\d]*) - (?<message>(.|\\n)*)$"` (double-quoted YAML scalar).
- `exclude_logs` drops matching entries before ingestion: excluded logs are not stored anywhere, and cannot be recovered. Try rules on a disposable project first. Rules follow the Cloud Logging query language but support only a subset.
- `exclude_logs` has performance implications; prefer excluding at the source or using Cloud Logging exclusion filters (https://docs.cloud.google.com/logging/docs/routing/overview#exclusions). If you use it, minimize the number of `exclude_logs` processors and use exact matches instead of regular expressions where possible.
- The `<...>` and `...` fences marked `text` are structure templates from the source, not complete YAML.
- Source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/configuration (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [configuration-logging-modify-fields.md](./configuration-logging-modify-fields.md)
- [configuration-logging-receivers.md](./configuration-logging-receivers.md)
- [configuration-logging-service.md](./configuration-logging-service.md)
