---
source: https://docs.cloud.google.com/logging/docs/logs-views
---

# Log view filters

Each log view has a filter, written in the Logging query language, that decides which log entries are visible. A filter is either a basic filter (restricted command set) or a flexible filter (additional commands and operators).

## Signature / Usage

### Multi-statement filter (`AND`)

Compute Engine `stdout` entries from project `myproject`:

```text
source("projects/myproject") AND
resource.type = "gce_instance" AND
log_id("stdout")
```

### Disjunctive filter (`OR`, flexible filter)

Entries from project `myproject` written by App Engine or by Google Kubernetes Engine:

```text
source("projects/myproject") AND
(resource.type="gae_app" OR resource.type="gke_cluster")
```

### Filter by resource label

```text
resource.labels.container_name="mycontainer"
```

### Filter by label

```text
labels.test="FALSE"
```

### Filter by App Hub label

```text
apphub.application.location="global"
```

### Exclude with negation

```text
NOT resource.type = "gce_instance"
```

### Comparison operators (flexible filter)

```text
=           -- equal
!=          -- not equal
> < >= <=   -- numeric ordering
:           -- "has" matches any substring in the log entry field
=~          -- regular expression search for a pattern
!~          -- regular expression search not for a pattern
```

## Options / Props

| Capability | Basic filter | Flexible filter |
|------------|--------------|-----------------|
| `source` function (entries from a resource in the hierarchy) | yes | yes |
| `log_id` function (matches `LOG_ID` against `logName`) | yes | yes |
| Conjunctive `AND` | yes | yes |
| Disjunctive `OR` | no | yes |
| `resource.type=` comparison | yes (valid resource type) | yes |
| Resource labels, labels, App Hub labels comparisons | no | yes |
| `NOT` | on a data source, log ID, or resource type | on a data source, log ID, or fields that compare values |
| `NOT (A AND B)` (compound negation) | not supported | not supported |

## Notes

- A flexible filter that uses capabilities unsupported by the basic filter disables the All resources and All log names menus in the Logs Explorer.
- You can't include logical `OR` in a basic filter, and you can't apply `NOT` to a compound statement.
- For full filtering syntax see the Logging query language, Comparisons section: https://docs.cloud.google.com/logging/docs/view/logging-query-language#comparisons.
- The `-- ...` comments in the operators block are part of the source's list, not valid filter text.
- Source: https://docs.cloud.google.com/logging/docs/logs-views (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [log-views-overview.md](./log-views-overview.md)
- [create-log-view.md](./create-log-view.md)
