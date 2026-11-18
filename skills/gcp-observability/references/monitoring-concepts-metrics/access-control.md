---
source: https://docs.cloud.google.com/monitoring/access-control
---

# Access control for Cloud Monitoring (IAM)

Cloud Monitoring uses IAM: each REST method has a permission, permissions are granted through roles, and predefined roles cover common combinations. Use Google groups to manage access, and VPC Service Controls (metrics scope in a service perimeter) to reduce exfiltration risk.

## Signature / Usage

### Grant a Monitoring role with gcloud

The source grants `roles/monitoring.viewer` or `roles/monitoring.editor` at the project level, then confirms with `get-iam-policy`. To grant a role you must have the IAM Owner role. Monitoring roles are granted on the project (the lowest-level resource for these roles).

Adapted (not in the official docs): variables are quoted to avoid word splitting; the source leaves them unquoted.

```bash
export PROJECT_ID="my-test-project"
export EMAIL_ADDRESS="myuser@gmail.com"
gcloud projects add-iam-policy-binding \
      "$PROJECT_ID" \
      --member="user:$EMAIL_ADDRESS" \
      --role="roles/monitoring.editor"
```

```bash
export PROJECT_ID="my-test-project"
gcloud projects get-iam-policy "$PROJECT_ID"
```

## Options / Props

### Monitoring roles

| Role | Description |
|---|---|
| `roles/monitoring.viewer` | Read-only access to Monitoring in the console and API. |
| `roles/monitoring.editor` | Read-write access. |
| `roles/monitoring.admin` | Full access, including modifying the metrics scope. |
| `roles/monitoring.metricWriter` | For service accounts and agents; write-only; no console access; permits writing monitoring data to a metrics scope. |
| `roles/monitoring.alertPolicyViewer` / `alertPolicyEditor` | Read-only / read-write alert policies. |
| `roles/monitoring.dashboardViewer` / `dashboardEditor` | Read-only / read-write dashboard configurations. |
| `roles/monitoring.cloudConsoleIncidentViewer` / `cloudConsoleIncidentEditor` (Beta) | View alerts / view, acknowledge and close alerts in the console. The individual permissions can't be granted. |
| `roles/monitoring.alertViewer` | Read access to alerts. |
| `roles/monitoring.notificationChannelViewer` / `notificationChannelEditor` (Beta) | Read-only / read-write notification channels. |
| `roles/monitoring.snoozeViewer` / `snoozeEditor` | Read-only / read-write snoozes. |
| `roles/monitoring.servicesViewer` / `servicesEditor` | Read-only / read-write services (and SLOs). |
| `roles/monitoring.uptimeCheckConfigViewer` / `uptimeCheckConfigEditor` (Beta) | Read-only / read-write uptime-check configurations. |
| `roles/monitoring.metricsScopesViewer` / `metricsScopesAdmin` (Beta) | Read-only / read-write (add and remove monitored projects) metrics scopes. |
| `roles/stackdriver.accounts.viewer` / `accounts.editor` | Read / manage Stackdriver account structure (`stackdriver.projects.get` / `.edit`). |
| `roles/opsconfigmonitoring.admin`, `viewer`, `resourceMetadata.viewer`, `resourceMetadata.writer` (Beta) | Ops Config Monitoring and resource metadata. |
| `roles/stackdriver.admin`, `viewer`, `resourceMetadata.writer` (Beta) | Stackdriver admin / viewer / metadata writer. |

### Selected permission sets

| Role | Permissions |
|---|---|
| `roles/monitoring.metricWriter` | `monitoring.metricDescriptors.create`, `.get`, `.list`; `monitoring.monitoredResourceDescriptors.get`, `.list`; `monitoring.timeSeries.create`. |
| `roles/monitoring.alertPolicyViewer` | `monitoring.alertPolicies.get`, `.list`, `.listEffectiveTags`, `.listTagBindings`. |
| `roles/monitoring.alertPolicyEditor` | The viewer set plus `monitoring.alertPolicies.create`, `.createTagBinding`, `.delete`, `.deleteTagBinding`, `.update`. |
| `roles/monitoring.snoozeViewer` | `monitoring.snoozes.get`, `.list`. |
| `roles/monitoring.snoozeEditor` | `monitoring.snoozes.create`, `.get`, `.list`, `.update`. |
| `roles/monitoring.metricsScopesAdmin` | `monitoring.metricsScopes.link`, `resourcemanager.projects.get`, `.list`. |

### Basic roles

| Role | Monitoring permissions |
|---|---|
| `roles/viewer` | Same as `roles/monitoring.viewer`. |
| `roles/editor` | Same as `roles/monitoring.editor` except `stackdriver.projects.edit`; cannot modify a metrics scope. API needs `monitoring.metricsScopes.link`; console needs that permission or `roles/monitoring.editor`. |
| `roles/owner` | Same as `roles/monitoring.admin`. |

### Compute Engine access scopes (legacy)

| Access scope | API access the scope allows (the service account still needs the IAM role) |
|---|---|
| `https://www.googleapis.com/auth/monitoring.read` | Same as `roles/monitoring.viewer`. |
| `https://www.googleapis.com/auth/monitoring.write` | Same as `roles/monitoring.metricWriter`. |
| `https://www.googleapis.com/auth/monitoring` | Full access to Monitoring. |
| `https://www.googleapis.com/auth/cloud-platform` | Full access to all enabled Cloud APIs. |

### Service agent role

| Role | Description |
|---|---|
| `roles/monitoring.notificationServiceAgent` (Monitoring Service Agent) | Delivers notifications directly to resources in the target project (for example Pub/Sub topics). Grant only to service agents. |

## Notes

- Do not grant service agent roles to any principals except service agents.
- The full permission lists of Monitoring Admin, Editor and Viewer (long lists of `monitoring.*`, `serviceusage.*`, `stackdriver.*`, `opsconfigmonitoring.*`, `resourcemanager.projects.get/list`) are in the source; they are not copied here. Viewer is read-only (`get` / `list`); Editor adds create / update / delete on alert policies, dashboards, groups, metric descriptors, notification channels, services, SLOs, snoozes, time series and uptime-check configs; Admin adds metrics scope link and more.
- Custom roles: copying a Monitoring role omits `stackdriver.projects.get` and `stackdriver.projects.edit` (add Stackdriver Accounts Viewer / Editor for them). Some permissions, including those to view and manage alerts, aren't supported in custom roles, and the console might not function properly without them. To forbid uptime checks (for example with Assured Workloads data-residency or IL4 requirements, since uptime-check data has no geographic guarantee), create a role with no `monitoring.uptimeCheckConfigs` permissions.
- Tags can control edit and delete access to dashboards and alerting policies (for example deny edit access to all but one service account).
- The Monitoring Permissions page lists only principals with a project-level role or a Monitoring, Logging or Trace role. It also grants Cloud Trace User / Admin and Logs Viewer / Logging Admin; Trace and Logging roles are described on their own pages. Granting a project-level role (Editor, Owner) is broad; prefer the narrowest Monitoring role.
- The source's best-practice line gives VMs the `cloud-platform` access scope and restricts with IAM roles. The scope itself grants no IAM permission; with `cloud-platform` the VM's effective access is whatever IAM roles its service account holds, so make sure the service account has only the roles it needs.
- Adapted from the official docs: the source writes `$PROJECT_ID` and `$EMAIL_ADDRESS` unquoted; they were quoted.
- The source also shows Console steps for granting roles.
- Corrected from the official docs: the source calls access scopes "the legacy method of specifying permissions" and heads the table column "Permissions granted"; access scopes do not grant IAM permissions. The `gcloud compute instances create --scopes` help (gcloud 593.0.0) states: "the level of access that a service account has is determined by a combination of access scopes and IAM roles so you must configure both access scopes and IAM roles for the service account to work properly." The column header was reworded.
- Source inconsistency: this page says that to modify a metrics scope through the API "your role must include the permission `monitoring.metricsScopes.link`" and, in the console, that permission "or you must have the role `roles/monitoring.editor`" (whose permission list here does not include `monitoring.metricsScopes.link`), while the metrics scope pages (https://docs.cloud.google.com/monitoring/settings) require "all permissions in the Monitoring Admin (`roles/monitoring.admin`) role" on the scoping project and on each added project.
- Source: https://docs.cloud.google.com/monitoring/access-control (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [settings.md](./settings.md)
- [multiple-projects.md](./multiple-projects.md)
