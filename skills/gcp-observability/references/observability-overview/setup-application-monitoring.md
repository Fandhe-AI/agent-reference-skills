---
source: https://docs.cloud.google.com/stackdriver/docs/observability/setup-application-monitoring
---

# Set up Application Monitoring

Configure the observability scope (default log scope, metrics scope, default trace scope) of the App Hub host project or management project, grant IAM roles, and associate alerting policies with App Hub applications so that logs, metrics, traces and alerts of an application appear in one place even when stored in several projects.

## Signature / Usage

### Log scope entries for an app-enabled folder without an aggregated sink

Add one `_Default/_AllLogs` view per project in the folder (including the management project) to a log scope, then set it as the default log scope:

```text
_Default/_AllLogs     my-folder-mp
_Default/_AllLogs     project-in-my-folder
_Default/_AllLogs     another-project-in-my-folder
```

### Set the default scopes

Snippet taken from https://docs.cloud.google.com/stackdriver/docs/observability/scopes (`OBSERVABILITY_SCOPE_ID` is `_Default`, `LOCATION` is `global`):

```bash
gcloud observability scopes update OBSERVABILITY_SCOPE_ID \
   --log-scope=LOG_SCOPE_FQN_ID\
   --trace-scope=TRACE_SCOPE_FQN_ID\
   --location=LOCATION\
   --project=PROJECT_ID
```

## Options / Props

### Required roles

| Task | Role | Granted on |
|---|---|---|
| Configure sink and scopes (aggregated log sink) | Organization Administrator (`roles/resourcemanager.organizationAdmin`) | Organization |
| Only configure scopes | Observability Editor (`roles/observability.editor`) | Host / management project |
| Only configure scopes | Logs Configuration Writer (`roles/logging.configWriter`) | Host / management project |
| Only configure scopes | Monitoring admin (`roles/monitoring.admin`) | Host / management project and each project added to the metrics scope |
| Only configure scopes | Cloud Trace User (`roles/cloudtrace.user`) | Host / management project |
| Only configure scopes | App Hub viewer (`roles/apphub.viewer`) | Host / management project |
| Enable the Observability API | `serviceusage.services.enable` (Owner `roles/owner` or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`) | Each project storing trace data |

### Roles to grant to viewers

| Role | Granted on |
|---|---|
| Logs View Accessor (`roles/logging.viewAccessor`) | Log views in the default log scope |
| Logs Viewer (`roles/logging.viewer`) | Host / management project and other projects in its default log scope (most entries of `_Default`) |
| Monitoring Editor (`roles/monitoring.editor`) or Monitoring Viewer (`roles/monitoring.viewer`) if no alerting policy creation | Host / management project |
| Cloud Trace User (`roles/cloudtrace.user`) | Host / management project and projects in the default trace scope |
| App Hub viewer (`roles/apphub.viewer`) | Host / management project |

### Alerting policy label keys

| Key | Meaning |
|---|---|
| `apphub_application_location` | Application location |
| `apphub_application_id` | Application ID |
| `apphub_service_id` or `apphub_workload_id` | Service or workload ID |

## Notes

- The target project is an App Hub host project, a management project for a single-project boundary, or a management project for an app-enabled folder. Each project has a single observability scope; you do not edit it directly but configure its default log scope, metrics scope and default trace scope.
- Default log scope, by situation: with an organization-level aggregated sink to a centralized log bucket, create a log view on that bucket for application logs, create a log scope with that view in the host / management project and set it as default. With an app-enabled folder and no organization-level aggregated sink or nested folders, create an intercepting aggregated sink for the folder routing to the `_Default` log bucket of the management project, and make sure the log scope named `_Default` (listing the `_AllLogs` view of that bucket) is the default. Without an aggregated sink, list log views of the buckets storing the logs. An intercepting sink stops those logs from reaching other sinks' buckets; try it on a disposable project first.
- Metrics scope for app-enabled folders: Observability tries to keep the metrics scope synchronized with the folder's projects while the count stays within the metrics scope quota (default 375 projects per metrics scope). Example: a folder with 380 projects adds 375, and the remaining 5 additions fail, so some application data isn't available to the management project; review quota usage and request an increase or edit the scope manually. For host projects and single-project boundaries you configure the metrics scope yourself and update it when the set of projects changes.
- Default trace scope: enable the Observability API (`observability.googleapis.com`) in each project storing trace data, create a trace scope in the host / management project with those projects (the folder's projects for app-enabled folders), and set it as default. The topology graph only shows trace data from projects in the same organization as the host / management project.
- Alerting policies get application labels in the console (Alerting > Edit > Notifications and name > Application labels) or via gcloud, Terraform or the Cloud Monitoring API using exactly the keys above; the labels are also included in alerts created by the policy. Service and workload labels are not attached automatically.
- The Organization Administrator role on the organization is a broad grant; the source offers it only for configuring an aggregated sink together with scopes. Use the narrower scope-only roles when no sink is needed.
- Sink and log bucket creation details are in other pages of this skill; IAM role grants in `gcp-foundation`.
- Source: https://docs.cloud.google.com/stackdriver/docs/observability/setup-application-monitoring (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [scopes.md](./scopes.md)
- [application-monitoring.md](./application-monitoring.md)
- [application-monitoring-labels.md](./application-monitoring-labels.md)
- [application-topology.md](./application-topology.md)
