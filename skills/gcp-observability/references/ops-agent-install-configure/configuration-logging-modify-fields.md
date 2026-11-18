---
source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/configuration
---

# Ops Agent modify_fields processor

The `modify_fields` logging processor (starting in Ops Agent 2.14.0) customizes the structure and contents of log entries. Its single top-level field `fields` maps output field names to translations; each output field gets an optional source and zero or more mutation operations.

## Signature / Usage

### Structure

```text
type: modify_fields
fields:
  <destination field>:
    # Source
    move_from: <source field>
    copy_from: <source field>
    static_value: <string>
    
    # Mutation
    default_value: <string>
    map_values:
      <old value>: <new value>
    type: {integer|float}
    omit_if: <filter>
```

### Example: populate `httpRequest` from JSON logs

The `parse_json` processor turns a JSON file containing

```json
{
  "http_status": "400",
  "path": "/index.html",
  "referer": "-"
}
```

into a `LogEntry` with this `jsonPayload`:

```json
{
  "jsonPayload": {
    "http_status": "400",
    "path": "/index.html",
    "referer": "-"
  }
}
```

and `modify_fields` then populates `httpRequest` (`status` 400, `requestUrl` `/index.html`) with this configuration, which reads `/var/log/http.json`:

```yaml
logging:
  receivers:
    in:
      type: files
      include_paths:
      - /var/log/http.json
  processors:
    parse_json:
      type: parse_json
    set_http_request:
      type: modify_fields
      fields:
        httpRequest.status:
          move_from: jsonPayload.http_status
          type: integer
        httpRequest.requestUrl:
          move_from: jsonPayload.path
        httpRequest.referer:
          move_from: jsonPayload.referer
          omit_if: jsonPayload.referer = "-"
  service:
    pipelines:
      pipeline:
        receivers: [in]
        processors: [parse_json, set_http_request]
```

## Options / Props

### Source options (at most one)

| Option | Behavior |
|---|---|
| none | The existing value in the destination field is modified |
| `move_from: <source field>` | Value from the source field is used and the source field is removed from the entry (even if it is also referenced by `copy_from`) |
| `copy_from: <source field>` | Value from the source field is used; the source field is kept unless also referenced by `move_from` or otherwise modified |
| `static_value: <string>` | The static string is used as the source |

### Mutation options (applied in this order)

| Order | Option | Behavior |
|---|---|---|
| 1 | `default_value: <string>` | If the source field did not exist, the output is set to the string; an existing value (even an empty string) is unchanged |
| 2 | `map_values: <map>` | If the input value matches a key, the output is replaced with the corresponding value |
| 3 | `map_values_exclusive: {true\|false}` | If the value matches no `map_values` key, the destination field is unset when `true`, left untouched when `false` |
| 4 | `type: {integer\|float}` | Converts the input to an integer or float; unconvertible strings leave the output unset; a float converted to `integer` is truncated |
| 5 | `omit_if: <filter>` | If the filter matches the input log record, the output field is unset; useful to remove placeholder values |

## Notes

- All field names use the dot-separated syntax of the Cloud Logging query language; filters use the Cloud Logging query language. All transformations are applied in parallel, so sources and filters operate on the original input entry and cannot reference the new value of another field modified by the same processor.
- The Cloud Logging API uses JSON and does not support a full 64-bit integer; store a 64-bit (or larger) integer as a string in the log entry.
- `move_from` removes the source field from the log entry, and an unmatched value with `map_values_exclusive: true` unsets the destination field, so data in those fields is no longer stored; try on a disposable project first. Do not move credentials or personal data into `httpRequest` or labels.
- The source also shows an `omit_if: httpRequest.referer = "-"` fragment and a result `LogEntry` JSON that is not valid JSON (trailing comma); both are omitted.
- Source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/configuration (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [configuration-logging-processors.md](./configuration-logging-processors.md)
- [configuration-logging-receivers.md](./configuration-logging-receivers.md)
- [configuration-logging-service.md](./configuration-logging-service.md)
