---
source: https://docs.cloud.google.com/trace/docs/cross-project-traces
---

# View traces across projects

View trace data stored in several projects in one Trace Explorer view by creating a trace scope and setting it as the default, which also updates the observability scope.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/trace/docs/analytics-migrate: the default trace view of each project is queried at this location.

```text
PROJECT_ID.us._Trace.Spans._AllSpans
```

### Steps

1. Identify the storage location of the `_Trace` observability bucket of the viewing project and of each project that stores trace data. All projects must use the same location (for example `us`); Trace cannot combine data stored in different locations.
2. Get Cloud Trace User on every project that stores trace data.
3. On the viewing project also get Observability Scopes Editor.
4. In the viewing project, create a trace scope listing the default trace view of each project, then set it as default.

## Options / Props

| Item | Value |
|---|---|
| Role on each project storing trace data | Cloud Trace User `roles/cloudtrace.user` |
| Roles on the viewing project | Cloud Trace User `roles/cloudtrace.user`, Observability Scopes Editor `roles/observability.scopesEditor` |
| Default trace view path | `_Trace/Spans/_AllSpans` (observability bucket / dataset / view) |

## Notes

- Without setting the new trace scope as default, Trace Explorer searches only the selected project and logs and traces might not be correlated. The observability scope also identifies the default log scope.
- Use the Scope element in the Trace Explorer toolbar to change the searched resources.
- Source: https://docs.cloud.google.com/trace/docs/cross-project-traces (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/trace/docs/analytics-migrate (retrieved 2026-11-18).

## Related

- [finding-traces.md](./finding-traces.md)
- [analytics-migrate.md](./analytics-migrate.md)
