---
source: https://docs.cloud.google.com/iam/docs/roles-permissions
---

# Products owned by gcp-observability

## Signature / Usage

Owner skill: `gcp-observability` (status: 未収録（予定）). gcloud groups: `app-topology`, `error-reporting`, `logging`, `monitoring`, `observability`, `service-health`, `trace`.

| Product | REST service (Discovery) | Overview | gcloud group | IAM role prefix | Roles | Former name | Lifecycle | Docs | Status |
|---|---|---|---|---|---|---|---|---|---|
| Cloud Debugger | — | — | — | `clouddebugger.` | 2 | — | Shut down | https://docs.cloud.google.com/iam/docs/roles-permissions/clouddebugger | 未収録（予定） |
| Cloud Logging | `logging.googleapis.com` (v2) | Writes log entries and manages your Cloud Logging configuration. | `logging` | `logging.` | 11 | — | — | https://cloud.google.com/logging/docs/ | 未収録（予定） |
| Cloud Monitoring | `monitoring.googleapis.com` (v1, v3) | Manages your Cloud Monitoring data and configurations. | `monitoring` | `monitoring.`, `opsconfigmonitoring.`, `stackdriver.` | 31 | — | — | https://cloud.google.com/monitoring/api/ | 未収録（予定） |
| Cloud Profiler | `cloudprofiler.googleapis.com` (v2) | Manages continuous profiling information. | — | `cloudprofiler.` | 4 | — | — | https://cloud.google.com/profiler/ | 未収録（予定） |
| Cloud Trace | `cloudtrace.googleapis.com` (v1, v2, v2beta1) | Sends application trace data to Cloud Trace for viewing. Trace data is collected for all App Engine applications by default. Trace data from other applications can be provided using this API. This library is used to interact with the Cloud Trace API directly. If you are looking to instrument your application for Cloud Trace, we recommend using OpenTelemetry. | `trace` | `cloudtrace.` | 3 | — | — | https://cloud.google.com/trace/ | 未収録（予定） |
| Error Reporting | — | — | — | `errorreporting.` | 4 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/errorreporting | 未収録（予定） |
| Google Cloud Observability | `observability.googleapis.com` (v1) | Provides functionality for configuring the observability scope, which controls the log, metric, and trace data that you can view. | `observability` | `observability.` | 7 | — | — | https://cloud.google.com/stackdriver/docs/ | 未収録（予定） |
| Personalized Service Health | — | — | `service-health` | `servicehealth.` | 2 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/servicehealth | 未収録（予定） |
| Telemetry API | — | — | — | `telemetry.` | 11 | — | — | https://docs.cloud.google.com/iam/docs/roles-permissions/telemetry | 未収録（予定） |

```bash
gcloud help
gcloud <group> --help
```

The first command lists all groups; the second lists the commands of one group.

## Notes

- Product list: IAM roles-permissions service pages (329 services) as of 2026-11-14.
- REST service, version list, Overview and Docs come from Discovery documents (googleapis/google-api-python-client@ff2498706a01); products without a Discovery document show "—".
- gcloud groups from `gcloud meta list-commands` (593.0.0); the column is filled only where the group name equals the IAM service name. The full group assignment is in `references/gcloud-groups/assignment.md`.
- Lifecycle (Cloud Debugger): Shut down. Dates: deprecated May 16, 2022; shut down May 31, 2023. Successor: Snapshot Debugger (open source, archived Sept 7, 2023). Source: https://docs.cloud.google.com/stackdriver/docs/deprecations/debugger-deprecation.md.txt (retrieved 2026-11-14).
- Lifecycle information covers only products confirmed against official pages as of 2026-11-14 (see `../lifecycle/shutdown-and-deprecated.md`); a product without a Lifecycle entry is not confirmed to be available. Check the official product page before use.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions (retrieved 2026-11-14; content licensed under CC BY 4.0, code samples under Apache 2.0, https://developers.google.com/site-policies).

## Related

- [assignment.md](../gcloud-groups/assignment.md)
- [renamed-products.md](../renames/renamed-products.md)
