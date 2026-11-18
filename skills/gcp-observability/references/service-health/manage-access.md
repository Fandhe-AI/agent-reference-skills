---
source: https://docs.cloud.google.com/service-health/docs/manage-access
---

# Manage access to Service Health

Roles and permissions needed to view Personalized Service Health events in the dashboard, pull them with the Service Health API and configure log alerts, plus how to enable the Service Health API.

## Signature / Usage

### Grant the Viewer role on a project

Adapted (not in the official docs): the source writes `--member {USER|GROUP|SERVICE_ACCOUNT}`; replaced by `MEMBER`, a type-prefixed principal such as `user:EMAIL`, `group:EMAIL` or `serviceAccount:EMAIL`.

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member MEMBER \
  --role roles/servicehealth.viewer
```

View the project's IAM policy:

```bash
gcloud projects get-iam-policy PROJECT_ID
```

### Add the permissions to an existing custom role

```bash
gcloud iam roles update ROLE_ID \
  --project=PROJECT_ID \
  --permissions="servicehealth.events.get,servicehealth.events.list,servicehealth.impacts.get,servicehealth.impacts.list,servicehealth.locations.get,servicehealth.locations.list,servicehealth.organizationEvents.get,servicehealth.organizationEvents.list,servicehealth.organizationImpacts.get,servicehealth.organizationImpacts.list,servicehealth.statuses.get,resourcemanager.projects.get,resourcemanager.projects.list"
```

### Events without impacted-resource details (Preview)

```bash
gcloud iam roles create EVENT_ONLY_ROLE_ID --project=PROJECT_ID \
--title="Service Health Event-Only Viewer" \
--description="Grants access to Service Health project events without resource-level impact details" \
--permissions="servicehealth.events.get,servicehealth.events.list,servicehealth.locations.get,servicehealth.locations.list,servicehealth.statuses.get,resourcemanager.projects.get"
```

### Enable the Service Health API for a single project

```bash
gcloud components update
```

```bash
gcloud projects create PROJECT_ID
```

Adapted (not in the official docs): the source writes `gcloud projects config set project PROJECT_ID`, which is not a command; the real command is `gcloud config set project`.

```bash
gcloud config set project PROJECT_ID
```

```bash
gcloud services enable servicehealth.googleapis.com \
 --project PROJECT_ID
```

## Options / Props

### Roles

| Role | Purpose |
|---|---|
| Personalized Service Health Viewer (`roles/servicehealth.viewer`) on the project | Access the Service Health API and dashboard. Includes `servicehealth.impacts.list` and `servicehealth.impacts.get`. |
| Service Usage Consumer (`roles/serviceusage.serviceUsageConsumer`) | Use APIs and services in your projects (with the Service Health API enabled). |
| Permissions for log-based alerts (https://docs.cloud.google.com/logging/docs/access-control#lba-permissions) | Access logs and configure log alerts. |
| Monitoring NotificationChannel Editor (`roles/monitoring.notificationChannelEditor`) or, instead, Monitoring NotificationChannel Viewer (`roles/monitoring.notificationChannelViewer`) | Link a notification channel to an alerting policy. |
| `roles/viewer`, `roles/editor`, `roles/owner` | Basic roles that also include `servicehealth.impacts.list` and `servicehealth.impacts.get`. |

### Permissions listed in the custom-role example

| Permission |
|---|
| `servicehealth.events.get`, `servicehealth.events.list` |
| `servicehealth.impacts.get`, `servicehealth.impacts.list` |
| `servicehealth.locations.get`, `servicehealth.locations.list` |
| `servicehealth.organizationEvents.get`, `servicehealth.organizationEvents.list` |
| `servicehealth.organizationImpacts.get`, `servicehealth.organizationImpacts.list` |
| `servicehealth.statuses.get` |
| `resourcemanager.projects.get`, `resourcemanager.projects.list` |

## Notes

- Billing must be enabled for the project. Role grants: https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access; role reference: https://docs.cloud.google.com/iam/docs/roles-permissions/servicehealth#servicehealth.viewer.
- gcloud 593.0.0 help for `iam roles update`: `--permissions` is "The permissions of the role you want to set" and `--add-permissions` is "The permissions you want to add to the role". The source says "add"; the example uses `--permissions`, so include every permission the role needs.
- Resource-level impacts (Preview, "Pre-GA Offerings Terms"): the `impacts` permissions let principals see full resource names (`assetName`) and types (`assetType`) of impacted resources across the project. To let a principal see project-level events without those names, use a custom role that omits `servicehealth.impacts.get` and `servicehealth.impacts.list`, as in the example above.
- Enabling the API needs `serviceusage.services.enable` (Owner, or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`). A script that enables the API for projects in an organization or folder is at https://docs.cloud.google.com/service-health/docs/script-enable-api.
- On first enablement, recovery of events from the past 90 days can take up to 24 hours. For impacted resource details (Preview) the API must be enabled at least 24 hours before an incident starts. The API and alerts recognize new events a few hours after enablement.
- Corrected from the official docs: the project-creation step wrote `gcloud projects config set project PROJECT_ID`, and the grant used `--member {USER|GROUP|SERVICE_ACCOUNT}`.
- The source also shows the console route to enable the API.
- Source inconsistency: this page lists `servicehealth.impacts.get` and `servicehealth.impacts.list` (Preview) as included in `roles/servicehealth.viewer` and the basic roles, and puts them in the custom-role example, but the IAM roles and permissions reference for `servicehealth` (https://docs.cloud.google.com/iam/docs/roles-permissions/servicehealth, retrieved 2026-11-14) has no `servicehealth.impacts.*` permission; its `roles/servicehealth.viewer` lists 13 permissions, including `servicehealth.artifacts.get` and `servicehealth.artifacts.list` (needed for incident reports), which the custom-role examples above omit. The twin's text and commands are kept; check the role with `gcloud iam roles describe roles/servicehealth.viewer` before copying the permission list.
- Source: https://docs.cloud.google.com/service-health/docs/manage-access (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [view-events.md](./view-events.md)
- [list-events.md](./list-events.md)
- [organization-events.md](./organization-events.md)
- [configure-alerts-cloud-logging.md](./configure-alerts-cloud-logging.md)
