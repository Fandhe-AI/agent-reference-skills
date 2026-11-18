---
source: https://docs.cloud.google.com/monitoring/settings/multiple-projects
---

# Configure a metrics scope for multiple projects (console)

Use the Google Cloud console to add projects to, remove projects from, and list projects in a scoping project's metrics scope, so one project can chart and alert on data stored in several projects.

## Signature / Usage

The source page is Console-only. Before changing a scope, confirm your roles on the scoping project and on each project to add (the source asks for Monitoring Admin on all of them; custom roles or other predefined roles might also provide the required permissions). Command from https://docs.cloud.google.com/monitoring/access-control.

Adapted (not in the official docs): `$PROJECT_ID` is quoted to avoid word splitting.

```bash
export PROJECT_ID="my-test-project"
gcloud projects get-iam-policy "$PROJECT_ID"
```

### Console steps (summary)

Go to Monitoring **Settings**, select the project (for App Hub, the host project), open **Metric Scope**, then **Add Projects** or **Remove project**.

## Options / Props

### Limits and timings

| Item | Value |
|---|---|
| Default projects per metrics scope | 375 Google Cloud projects. |
| Quota to raise | "Monitored Projects / Monitoring Metrics Scope"; raising it beyond 375 might cause performance issues. |
| Propagation after adding projects | About 60 seconds; wait at least 60 seconds before creating a chart or alerting policy (refresh the console page if needed). |
| Scoping project to metrics scope | One-to-one; select a different scope by selecting a different project in the project picker. |

### Required role

| Role | Where |
|---|---|
| Monitoring Admin (`roles/monitoring.admin`) | On the scoping project and on each project added to or removed from the metrics scope; custom roles or other predefined roles might also provide the required permissions. |

## Notes

- VPC Service Controls: the perimeter check runs when a project is added to a metrics scope. If the perimeter exists first, the added project must be in the same perimeter as the scoping project or connected by a perimeter bridge, otherwise the add fails. If you configure the metrics scope first and create perimeters afterwards, the check does not run, and you can access time-series data of projects in different perimeters.
- Removing a project stops the scoping project from charting or monitoring its data; chart, dashboard, alerting policy, uptime check and group configurations are not changed, but the series displayed or monitored may change. Removal can improve performance or free quota.
- A role granting Monitoring read on the scoping project lets the principal view charts and alerting policies that display data from projects in the scope.
- App Hub host and management projects: manage the scope here or with the API; Google Cloud manages the scope of app-enabled folders unless the quota is exhausted.
- The source also shows the programmatic route (Cloud Monitoring API), not part of this page.
- Snippet taken from https://docs.cloud.google.com/monitoring/access-control; Adapted from the official docs: the variable was quoted.
- Source inconsistency: the access-control page (https://docs.cloud.google.com/monitoring/access-control) says modifying a metrics scope through the API needs `monitoring.metricsScopes.link` (in `roles/monitoring.metricsScopesAdmin`), and in the console that permission or `roles/monitoring.editor`; this page asks for Monitoring Admin.
- Source: https://docs.cloud.google.com/monitoring/settings/multiple-projects (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [settings.md](./settings.md)
- [access-control.md](./access-control.md)
