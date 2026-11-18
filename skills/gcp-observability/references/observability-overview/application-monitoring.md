---
source: https://docs.cloud.google.com/stackdriver/docs/observability/application-monitoring
---

# View application telemetry in Application Monitoring

How to use the dashboards and topology map that Application Monitoring creates for App Hub applications, services and workloads: list applications, list registered and discovered services and workloads, investigate an application or a workload, and explore logs, metrics, alerts and traces.

## Signature / Usage

### Application log filter

On a dashboard the **Application Logs** / **Logs** sections show log entries matching a filter on the default log scope of the host or management project. For applications the filter is similar to the following (click **Show query** to see the real one):

```text
-- Application logs
(apphub_application_location=global)
(apphub_application_id=my-app)
```

## Options / Props

### Required roles (on the App Hub host project or management project)

| Role | Granted on |
|---|---|
| Logs Viewer (`roles/logging.viewer`) | Host / management project and any other projects in its default log scope; grants access to most entries in the `_Default` log bucket |
| Logs View Accessor (`roles/logging.viewAccessor`) | Log views listed in the default log scope |
| Monitoring Editor (`roles/monitoring.editor`) | Host / management project; Monitoring Viewer (`roles/monitoring.viewer`) for principals who do not create or modify alerting policies or dashboards |
| Cloud Trace User (`roles/cloudtrace.user`) | Host / management project and the projects in the default trace scope |
| App Hub viewer (`roles/apphub.viewer`) | Host / management project |

### Registration status

| Status | Meaning |
|---|---|
| Registered | Registered to an application and managed by App Hub. |
| Discovered | Can be registered: part of the application management boundary and not registered to any other application (or can be registered to multiple). Includes deleted / unregistered ones that can be registered again. |
| Detached | Registered, but App Hub can't manage or monitor it because its resources left the application management boundary. |

### Limits

| Item | Limit |
|---|---|
| Discovered services and discovered workloads listed per App Hub region | At most 100 each |
| Services / workloads selected for one registration | At most 100 |
| Topology graph nodes | At most 1000 |
| Time range when a dashboard opens | Most recent hour |

### Golden signals on the Overview tab

| Signal | Definition |
|---|---|
| Traffic | Incoming request rates over the selected period (tabs: Request = networking L7 metric, Bytes = L4 metric, for some configurations). |
| Server error rate | Ratio of incoming requests with a 5xx-equivalent response code to all incoming requests. |
| P95 latency | 95th percentile latency of served requests, in milliseconds. |
| Saturation | How full the service is; for MIGs, Cloud Run and GKE deployments, CPU utilization. |

### Dashboard data by registration status

| Status | Data source |
|---|---|
| Registered | Application-specific labels and attributes from supported infrastructure and instrumented applications: logs, metrics and traces. |
| Discovered | Resource type derived from the Cloud Asset Inventory asset name (for example `cloud_run_revision`, filtered by `location` and `service_name`); trace data isn't available for discovered services or workloads. |

## Notes

- Metric / log correlation ("Inspect related logs") works for any metric type except log-based metrics and Prometheus metrics. The flyout builds a logging query from the metric query, includes variables but not dashboard-level filters; for a point on a time series the range is five minutes before and after the point.
- Alerts: the **Alerts** section lists open alerts for alerting policies associated with the application via labels; for discovered resources the Cloud Asset Inventory name identifies policies. To see closed alerts, disable **Grouped by policy** and enable **Show closed alerts**.
- Traces: the **Traces** section groups spans by name and service / workload and shows span count, 50th / 90th / 95th latency percentiles and error rate; it needs application-specific resource attributes from instrumentation.
- App-enabled folder: the console resets the resource picker to the folder's management project when you open an Observability page. Cloud Logging supports folders (system-created `_Default` and `_Required` sinks and buckets); select the folder manually to reach them.
- AI resources: the **AI resources** section (application) and **Agent** / **Tools** / **Models** sections (workload; Models only for some agents) are derived from trace data. Click **Explore data** for a flyout whose changes are discarded on **Cancel**; changes cannot be saved to the dashboard you opened it from.
- New application registration: location `global` or `regional`; use `global` when services and workloads are in multiple locations; a regional application only accepts resources in the same location.
- Log entries and payloads on these dashboards can contain personal data; access follows the roles above.
- The source also shows Console click-paths and screenshots, omitted here. Unregistered services show the banner "This service is not registered."
- Corrected from the official docs: the source names the resource type "`cloud_run-revision`". The monitored resource type is `cloud_run_revision`: the source's own link target is `monitoring/api/resources#tag_cloud_run_revision`, and the Logging query library uses `resource.type="cloud_run_revision"`.
- Source: https://docs.cloud.google.com/stackdriver/docs/observability/application-monitoring (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [setup-application-monitoring.md](./setup-application-monitoring.md)
- [application-topology.md](./application-topology.md)
- [application-monitoring-labels.md](./application-monitoring-labels.md)
- [about-application-monitoring.md](./about-application-monitoring.md)
