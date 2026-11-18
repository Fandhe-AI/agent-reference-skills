---
source: https://docs.cloud.google.com/logging/docs/access-control
---

# Access control with IAM for Cloud Logging

Cloud Logging uses IAM roles and permissions to control who can view, write, and manage Logging resources: create sinks or buckets, read log data in a bucket, use pages such as the Logs Explorer, and run Logging API or gcloud commands. Roles are granted on a resource such as a project, folder, bucket, or organization.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/logging/docs/write-query-log-entries-gcloud (reading needs a role such as Logs Viewer; `gcloud logging` commands also need `serviceusage.services.use`)

```bash
gcloud logging read "resource.type=global"
```

### Which role for which use case

- All actions in Logging: Logging Admin (`roles/logging.admin`).
- Create and modify log sinks, log buckets, log views, linked datasets, log scopes, and analytics views: Logs Configuration Writer (`roles/logging.configWriter`). The role includes `logging.logMetrics.create`, `logging.logMetrics.delete`, `logging.logMetrics.get`, `logging.logMetrics.list` and `logging.logMetrics.update`, so it can manage log-based metrics; for log-based alerting policies see "Roles required to create and use log-based alerting policies" (https://docs.cloud.google.com/logging/docs/access-control#lba-permissions).
- Read the `_Required` and `_Default` buckets or use Logs Explorer / Observability Analytics: Logs Viewer (`roles/logging.viewer`) (all logs in `_Required`, the `_Default` view on `_Default`), or Private Logs Viewer (`roles/logging.privateLogViewer`) (all logs in both, including data access logs).
- Read all log views in a project: `roles/logging.viewAccessor` on the project.
- Read only one log view: add an IAM binding to the IAM policy of the log view, or grant `roles/logging.viewAccessor` on the project with an IAM condition limiting it to that view.
- Restricted `LogEntry` fields: Logs Field Accessor (`roles/logging.fieldAccessor`).
- Write logs via the API: Logs Writer (`roles/logging.logWriter`); it doesn't grant viewing permissions.
- A sink's service account writing to a bucket in a different project: Logs Bucket Writer (`roles/logging.bucketWriter`).

## Options / Props

### Predefined roles

| Role | Description | Lowest-level resource | Permissions |
|---|---|---|---|
| Logging Admin (`roles/logging.admin`) | All permissions to use all features of Cloud Logging | View | `logging.buckets.copyLogEntries`; `logging.buckets.create`; `logging.buckets.createTagBinding`; `logging.buckets.delete`; `logging.buckets.deleteTagBinding`; `logging.buckets.get`; `logging.buckets.list`; `logging.buckets.listEffectiveTags`; `logging.buckets.listTagBindings`; `logging.buckets.undelete`; `logging.buckets.update`; `logging.exclusions.*` (`logging.exclusions.create`, `logging.exclusions.delete`, `logging.exclusions.get`, `logging.exclusions.list`, `logging.exclusions.update`); `logging.fields.access`; `logging.links.*` (`logging.links.create`, `logging.links.delete`, `logging.links.get`, `logging.links.list`); `logging.locations.*` (`logging.locations.get`, `logging.locations.list`); `logging.logEntries.*` (`logging.logEntries.create`, `logging.logEntries.download`, `logging.logEntries.list`, `logging.logEntries.route`); `logging.logMetrics.*` (`logging.logMetrics.create`, `logging.logMetrics.delete`, `logging.logMetrics.get`, `logging.logMetrics.list`, `logging.logMetrics.update`); `logging.logScopes.*` (`logging.logScopes.create`, `logging.logScopes.delete`, `logging.logScopes.get`, `logging.logScopes.list`, `logging.logScopes.update`); `logging.logServiceIndexes.list`; `logging.logServices.list`; `logging.logs.*` (`logging.logs.delete`, `logging.logs.list`); `logging.notificationRules.*` (`logging.notificationRules.create`, `logging.notificationRules.delete`, `logging.notificationRules.get`, `logging.notificationRules.list`, `logging.notificationRules.update`); `logging.operations.*` (`logging.operations.cancel`, `logging.operations.get`, `logging.operations.list`); `logging.privateLogEntries.list`; `logging.queries.*` (`logging.queries.deleteShared`, `logging.queries.getShared`, `logging.queries.listShared`, `logging.queries.share`, `logging.queries.updateShared`, `logging.queries.usePrivate`); `logging.settings.*` (`logging.settings.get`, `logging.settings.update`); `logging.sinks.*` (`logging.sinks.create`, `logging.sinks.delete`, `logging.sinks.get`, `logging.sinks.list`, `logging.sinks.update`); `logging.sqlAlerts.*` (`logging.sqlAlerts.create`, `logging.sqlAlerts.update`); `logging.usage.get`; `logging.views.*` (`logging.views.access`, `logging.views.create`, `logging.views.delete`, `logging.views.get`, `logging.views.getIamPolicy`, `logging.views.list`, `logging.views.listLogs`, `logging.views.listResourceKeys`, `logging.views.listResourceValues`, `logging.views.setIamPolicy`, `logging.views.update`); `observability.scopes.get`; `resourcemanager.projects.get`; `resourcemanager.projects.list` |
| Logs Configuration Writer (`roles/logging.configWriter`) | Read and write configurations of log-based metrics and sinks | View | `logging.buckets.create`; `logging.buckets.createTagBinding`; `logging.buckets.delete`; `logging.buckets.deleteTagBinding`; `logging.buckets.get`; `logging.buckets.list`; `logging.buckets.listEffectiveTags`; `logging.buckets.listTagBindings`; `logging.buckets.undelete`; `logging.buckets.update`; `logging.exclusions.*` (`logging.exclusions.create`, `logging.exclusions.delete`, `logging.exclusions.get`, `logging.exclusions.list`, `logging.exclusions.update`); `logging.links.*` (`logging.links.create`, `logging.links.delete`, `logging.links.get`, `logging.links.list`); `logging.locations.*` (`logging.locations.get`, `logging.locations.list`); `logging.logMetrics.*` (`logging.logMetrics.create`, `logging.logMetrics.delete`, `logging.logMetrics.get`, `logging.logMetrics.list`, `logging.logMetrics.update`); `logging.logScopes.*` (`logging.logScopes.create`, `logging.logScopes.delete`, `logging.logScopes.get`, `logging.logScopes.list`, `logging.logScopes.update`); `logging.logServiceIndexes.list`; `logging.logServices.list`; `logging.logs.list`; `logging.notificationRules.*` (`logging.notificationRules.create`, `logging.notificationRules.delete`, `logging.notificationRules.get`, `logging.notificationRules.list`, `logging.notificationRules.update`); `logging.operations.*` (`logging.operations.cancel`, `logging.operations.get`, `logging.operations.list`); `logging.settings.*` (`logging.settings.get`, `logging.settings.update`); `logging.sinks.*` (`logging.sinks.create`, `logging.sinks.delete`, `logging.sinks.get`, `logging.sinks.list`, `logging.sinks.update`); `logging.sqlAlerts.*` (`logging.sqlAlerts.create`, `logging.sqlAlerts.update`); `logging.views.create`; `logging.views.delete`; `logging.views.get`; `logging.views.getIamPolicy`; `logging.views.list`; `logging.views.update`; `observability.scopes.get`; `resourcemanager.projects.get`; `resourcemanager.projects.list` |
| Logs Viewer (`roles/logging.viewer`) | View logs | View | `logging.buckets.get`; `logging.buckets.list`; `logging.buckets.listEffectiveTags`; `logging.buckets.listTagBindings`; `logging.exclusions.get`; `logging.exclusions.list`; `logging.links.get`; `logging.links.list`; `logging.locations.*` (`logging.locations.get`, `logging.locations.list`); `logging.logEntries.list`; `logging.logMetrics.get`; `logging.logMetrics.list`; `logging.logScopes.get`; `logging.logScopes.list`; `logging.logServiceIndexes.list`; `logging.logServices.list`; `logging.logs.list`; `logging.notificationRules.get`; `logging.notificationRules.list`; `logging.operations.get`; `logging.operations.list`; `logging.queries.getShared`; `logging.queries.listShared`; `logging.queries.usePrivate`; `logging.settings.get`; `logging.sinks.get`; `logging.sinks.list`; `logging.usage.get`; `logging.views.get`; `logging.views.getIamPolicy`; `logging.views.list`; `observability.scopes.get`; `resourcemanager.projects.get` |
| Private Logs Viewer (`roles/logging.privateLogViewer`) | Logs Viewer permissions plus read-only access to private logs | View | `logging.buckets.get`; `logging.buckets.list`; `logging.buckets.listEffectiveTags`; `logging.buckets.listTagBindings`; `logging.exclusions.get`; `logging.exclusions.list`; `logging.links.get`; `logging.links.list`; `logging.locations.*` (`logging.locations.get`, `logging.locations.list`); `logging.logEntries.list`; `logging.logMetrics.get`; `logging.logMetrics.list`; `logging.logServiceIndexes.list`; `logging.logServices.list`; `logging.logs.list`; `logging.notificationRules.get`; `logging.notificationRules.list`; `logging.operations.get`; `logging.operations.list`; `logging.privateLogEntries.list`; `logging.queries.getShared`; `logging.queries.listShared`; `logging.queries.usePrivate`; `logging.settings.get`; `logging.sinks.get`; `logging.sinks.list`; `logging.usage.get`; `logging.views.access`; `logging.views.get`; `logging.views.getIamPolicy`; `logging.views.list`; `observability.scopes.get`; `resourcemanager.projects.get` |
| Logs Bucket Writer (`roles/logging.bucketWriter`) | Write logs to a log bucket | Project | `logging.buckets.write` |
| Logs Writer (`roles/logging.logWriter`) | Write log entries | Project | `logging.logEntries.create`; `logging.logEntries.route` |
| Log Field Accessor (`roles/logging.fieldAccessor`) | Read restricted fields in a log bucket | Project | `logging.fields.access` |
| Log Link Accessor (`roles/logging.linkViewer`) | See links for a bucket | — | `logging.links.get`; `logging.links.list` |
| SQL Alert Writer, Beta (`roles/logging.sqlAlertWriter`) | Write SQL alerts | — | `logging.sqlAlerts.*` (`logging.sqlAlerts.create`, `logging.sqlAlerts.update`) |
| Logs View Accessor (`roles/logging.viewAccessor`) | Read logs in a view | View | `logging.logEntries.download`; `logging.views.access`; `logging.views.listLogs`; `logging.views.listResourceKeys`; `logging.views.listResourceValues` |

### Service agent role

| Role | Description | Permissions |
|---|---|---|
| Cloud Logging Service Agent (`roles/logging.serviceAgent`) | Lets a Cloud Logging service account create and link datasets. Grant only to service agents. | `bigquery.datasets.create`, `bigquery.datasets.get`, `bigquery.datasets.link` |

### Permissions by console activity (partial list)

| Console activity | Required permissions |
|---|---|
| Minimal read-only access | `logging.logEntries.list`, `logging.logs.list`, `logging.logServiceIndexes.list`, `logging.logServices.list`, `resourcemanager.projects.get` |
| View Data Access audit logs | `logging.privateLogEntries.list` |
| View log-based metrics | `logging.logMetrics.{list, get}` |
| View sinks | `logging.sinks.{list, get}` |
| View logs usage | `logging.usage.get` |
| Download logs | `logging.logEntries.{list, download}` (only one is needed; roles with them must be granted at project level, and downloads fail if granted in the IAM policy of a log view) |
| List and view log scopes | `logging.logScopes.{get, list}` |
| View the default log scope | `observability.scopes.get` |
| Exclude logs | `logging.exclusions.{list, create, get, update, delete}`; in a custom role, add `logging.sinks.*` instead of `logging.exclusions.*` |
| Create and use sinks | `logging.sinks.{list, create, get, update, delete}`; the sink's service account also needs a role to write to the destination; after routing, access is controlled by IAM on the destination |
| Create log-based alerts | See the log-based alerting roles below |
| Create log-based metrics | `logging.logMetrics.{list, create, get, update, delete}` |
| Save and use private queries | `logging.queries.usePrivate`, `logging.queries.{listShared,getShared}` |
| Save and use shared queries | `logging.queries.{share, getShared, updateShared, deleteShared, listShared}` |
| Create and manage log scopes | `logging.logScopes.{create, delete, get, list, update}` |
| Set and manage the default log scope | `observability.scopes.{get, update}` |
| Create and manage analytics views | `observability.analyticsViews.{create, delete, get, list, update}` |
| Create linked BigQuery datasets | `logging.links.{create, delete, get, list}`; additional BigQuery roles are needed to query the linked dataset |

### Roles for log-based metrics

| Role | Purpose |
|---|---|
| Logs Configuration Writer (`roles/logging.configWriter`) | List, create, get, update, delete log-based metrics |
| Logs Viewer (`roles/logging.viewer`) | View existing metrics (`logging.logMetrics.get`, `logging.logMetrics.list`) |
| Monitoring Viewer (`roles/monitoring.viewer`) | Read time series (`monitoring.timeSeries.list`) |
| Logging Admin, Project Editor (`roles/editor`), Project Owner (`roles/owner`) | Create log-based metrics (`logging.logMetrics.create`) |

### Roles for log-based alerting policies

| Role | Permission |
|---|---|
| Monitoring AlertPolicy Editor (`roles/monitoring.alertPolicyEditor`) | `monitoring.alertPolicies.create` |
| Monitoring NotificationChannel Editor (`roles/monitoring.notificationChannelEditor`) | `monitoring.notificationChannels.create` |
| Logs Configuration Writer (`roles/logging.configWriter`) | `logging.notificationRules.create` |
| Service Usage Consumer (`roles/serviceusage.serviceUsageConsumer`), for gcloud users | `serviceusage.services.use` |

### Legacy access scopes (Compute Engine VM service accounts)

| Access scope | What the scope allows (source column "Permissions granted") |
|---|---|
| `https://www.googleapis.com/auth/logging.read` | `roles/logging.viewer` |
| `https://www.googleapis.com/auth/logging.write` | `roles/logging.logWriter` |
| `https://www.googleapis.com/auth/logging.admin` | Full access to the Logging API |
| `https://www.googleapis.com/auth/cloud-platform` | Full access to the Logging API and all other enabled Google Cloud APIs |

## Notes

- Predefined roles: the permissions are listed in the source's order; where the source shows a wildcard such as `logging.exclusions.*`, the permissions it lists under it follow in parentheses.
- Permissions by console activity (partial list): In the source, `a.b.{x,y}` means `a.b.x` and `a.b.y`.
- Roles for log-based alerting policies: Grant on the project to create log-based alerting policies, notification channels, and Logging notification rules.
- Log scopes aren't used for access control; they define which resources to search, and your IAM roles on those resources decide access.
- Data access and Access Transparency logs are private: grant `roles/logging.privateLogViewer` only where needed. `roles/editor` can create log-based metrics with labels that can extract sensitive information.
- Basic roles: `roles/viewer` includes everything in Logs Viewer; `roles/editor` adds writing entries, deleting logs, and creating log-based metrics, but not creating sinks, reading Data Access audit logs in `_Default`, or reading user-defined buckets; `roles/owner` is full access. Basic roles include thousands of permissions across services; prefer the Logging predefined roles.
- You can't restrict fields on a bucket upgraded to Observability Analytics, and a bucket with a restricted field can't be upgraded.
- Access to buckets can use tags (including preventing deletion); restrict `roles/logging.viewAccessor` to a view with IAM Conditions resource attributes.
- Custom roles: choose permissions from the API, console, or command-line permission lists. SQL-based alerting policy roles are in the "Monitor your SQL query results with an alerting policy" page.
- Source: https://docs.cloud.google.com/logging/docs/access-control (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source inconsistency: the role description in the source says Logs Configuration Writer "isn't sufficient to create log-based metrics or log-based alerting policies", while the same page's permission list for the role and its "Roles required to create and use log-based metrics" section say it lets principals list, create, get, update, and delete log-based metrics. The summary above follows the permission list.
- Access scopes only limit which APIs the VM's OAuth tokens can call; they do not grant IAM roles. A request succeeds only when the access scope allows the API and the service account also holds the IAM permission, so `cloud-platform` together with the IAM roles granted to the service account decides access (see https://docs.cloud.google.com/compute/docs/access/service-accounts#accesscopesiam).

## Related

- [store-log-entries.md](./store-log-entries.md)
- [default-settings.md](./default-settings.md)
- [write-query-log-entries-gcloud.md](./write-query-log-entries-gcloud.md)
