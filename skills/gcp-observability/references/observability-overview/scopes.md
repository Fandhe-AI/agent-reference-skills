---
source: https://docs.cloud.google.com/stackdriver/docs/observability/scopes
---

# Observability scopes

Scopes let visualization and analysis tools read data stored in multiple projects (read-time aggregation). They do not control where data is stored. There are log scopes, a metrics scope, trace scopes, and one observability scope per project that names the default log scope and default trace scope. By default, only data that originates in a project is available to the tools.

## Signature / Usage

### View the observability scope

`OBSERVABILITY_SCOPE_ID` must be `_Default`; `LOCATION` must be `global`.

```bash
gcloud observability scopes describe OBSERVABILITY_SCOPE_ID \
   --location=LOCATION\
   --project=PROJECT_ID
```

Response:

```text
logScope: logging.googleapis.com/projects/my-project/locations/global/logScopes/_Default
traceScope: projects/my-project/locations/global/traceScopes/_Default
name: projects/my-project/locations/global/scopes/_Default
```

### Update the default log scope and default trace scope

Pass `--log-scope`, `--trace-scope`, or both.

```bash
gcloud observability scopes update OBSERVABILITY_SCOPE_ID \
   --log-scope=LOG_SCOPE_FQN_ID\
   --trace-scope=TRACE_SCOPE_FQN_ID\
   --location=LOCATION\
   --project=PROJECT_ID
```

`LOG_SCOPE_FQN_ID` format:

```text
logging.googleapis.com/projects/PROJECT_ID/locations/LOCATION/logScopes/LOG_SCOPE_ID
```

`TRACE_SCOPE_FQN_ID` format:

```text
projects/PROJECT_ID/locations/LOCATION/traceScopes/TRACE_SCOPE_NAME
```

Response when the log scope ID is `my-log-scope` and the trace scope name is `my-trace-scope`:

```text
Updated scope [_Default].
logScope: logging.googleapis.com/projects/my-project/locations/global/logScopes/my-log-scope
traceScope: projects/my-project/locations/global/traceScopes/my-trace-scope
name: projects/my-project/locations/global/scopes/_Default
```

### REST

Path parameter for `projects.locations.scopes.get` and `projects.locations.scopes.patch` (`LOCATION` = `global`, `OBSERVABILITY_SCOPE_ID` = `_Default`):

```text
projects/PROJECT_ID/locations/LOCATION/scopes/OBSERVABILITY_SCOPE_ID
```

Example `name` value for the APIs Explorer `get`:

```text
projects/PROJECT_ID/locations/global/scopes/_Default
```

Adapted (not in the official docs): a missing comma between `logScope` and `traceScope` is added so the response is valid JSON.

```json
{
  "name": "projects/my-project/locations/global/scopes/_Default",
  "logScope": "logging.googleapis.com/projects/my-project/locations/global/logScopes/_Default",
  "traceScope": "projects/my-project/locations/global/traceScopes/_Default"
}
```

## Options / Props

### Limits

| Scope | Description | Maximum value |
|---|---|---|
| Observability scope | Observability scopes per project | 1 |
| Log scope | Log scopes per project | 100 |
| Log scope | Projects per log scope | 5 |
| Log scope | Log views or projects per log scope | 100 |
| Metrics scope | Metrics scopes per project | 1 |
| Metrics scope | Projects per metrics scope | 375 |
| Trace scope | Trace scopes per project | 100 |
| Trace scope | Views per trace scope | 20 |

### Scope types

| Scope | Used by | Lists | Default when not configured |
|---|---|---|---|
| Observability scope | Logs Explorer, Trace Explorer (default scopes on open); not metric data | Default log scope + default trace scope | Logs Explorer queries your project for logs; Trace Explorer queries your project for traces |
| Log scope | Logs Explorer, dashboards that display logs | Log views, projects, folders, organizations | Logs Explorer queries your project |
| Metrics scope | All Cloud Monitoring queries (alerting policies, Metrics Explorer) | Projects | Monitoring queries your project |
| Trace scope | Trace Explorer | Views (selecting projects adds each project's default trace view `_Trace/Spans/_AllSpans`) | Project's `_AllSpans` view on the default dataset |

### Required IAM roles and permissions

| Task | Role | Granted on |
|---|---|---|
| Create and view log scopes, get the default log scope | Logs Configuration Writer (`roles/logging.configWriter`) | Your project |
| Modify a metrics scope | Monitoring Admin (`roles/monitoring.admin`) | Your project and each project you add to the metrics scope |
| Create and view trace scopes, get and set default scopes | Observability Scopes Editor (`roles/observability.scopesEditor`) | Your project |

| Permissions |
|---|
| `logging.logScopes.create`, `logging.logScopes.delete`, `logging.logScopes.get`, `logging.logScopes.list`, `logging.logScopes.update` |
| `monitoring.metricsScopes.link` |
| `observability.traceScopes.create`, `observability.traceScopes.delete`, `observability.traceScopes.get`, `observability.traceScopes.list`, `observability.traceScopes.update` |
| `observability.scopes.get`, `observability.scopes.update` |

## Notes

- Metric and trace data is always stored in the project where it originates. Log data is stored in the project, billing account, folder or organization where it originates unless routed elsewhere (for example to a centralized log bucket); in all those cases configure a custom log scope.
- Best practices: the source recommends log scopes list log views instead of projects (for example the `_Default/_AllLogs` view of each project); include only log views and do not mix projects and log views in one scope.
- Create custom log scopes when you route logs to a centralized log bucket, store logs in multiple projects, or use Application Monitoring. If you create a custom log scope, consider updating the default log scope.
- Configure the observability scope when you create a custom log scope or custom trace scope and want its resources queried by default. Configure the metrics scope to chart or alert on data in different projects, or when you register applications with App Hub.
- Warning from the source: all projects listed in a trace scope must store their trace data in the same location. Trace data is stored in an observability bucket named `_Trace`.
- IAM: Logging and Trace verify your IAM roles on each queried resource, so a scope entry you cannot read returns no data. Monitoring verifies your role on the project from which the query is issued; a metrics scope grants that project read access to the listed projects' metric data.
- The observability scope section of the source "doesn't apply to folders or organizations". Console: Settings page (Log Scopes, Metrics scope, Trace Scopes tabs); for App Hub select the host project or management project. The source also shows REST via the APIs Explorer.
- Source inconsistency: the gcloud 593.0.0 help for `gcloud observability scopes update` documents `--log-scope` with a leading `//` (`//logging.googleapis.com/projects/myproject/locations/global/logScopes/my-log-scope`), while the source examples and sample responses omit it; the Observability API Discovery document (`observability.v1`, `Scope.logScope`) also shows the `//` form. The source form is kept above.
- Adapted from the official docs: the REST response example `"logScope": "...",` had no comma after the `logScope` value; a comma was added.
- Corrected from the official docs: the required-permissions list read `monitoring.metricsscopes.{link, get, list}`. The IAM roles and permissions reference for Monitoring lists only `monitoring.metricsScopes.link` (camel case; no `monitoring.metricsScopes.get` or `monitoring.metricsScopes.list` appears in any role, and Monitoring Metrics Scopes Viewer `roles/monitoring.metricsScopesViewer` holds only `resourcemanager.projects.get` and `resourcemanager.projects.list`), and Observability Scopes Editor `roles/observability.scopesEditor` includes `monitoring.metricsScopes.link`. The brace lists of the source are written out as full permission names.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/monitoring and https://docs.cloud.google.com/iam/docs/roles-permissions/observability (retrieved 2026-11-14; CC BY 4.0), for the permission names.
- Source: https://docs.cloud.google.com/stackdriver/docs/observability/scopes (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- REST reference: https://docs.cloud.google.com/stackdriver/docs/reference/observability/api/rest/v1/projects.locations.scopes
- gcloud: https://docs.cloud.google.com/sdk/gcloud/reference/observability/scopes/describe and https://docs.cloud.google.com/sdk/gcloud/reference/observability/scopes/update

## Related

- [setup-application-monitoring.md](./setup-application-monitoring.md)
- [observability-overview.md](./observability-overview.md)
