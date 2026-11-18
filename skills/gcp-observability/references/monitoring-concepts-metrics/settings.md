---
source: https://docs.cloud.google.com/monitoring/settings
---

# Metrics scopes overview

A project's metrics scope defines which projects' time-series data it can chart and monitor. With no configuration a project sees only the data it stores; to chart several projects (and AWS accounts) in one place, configure a multi-project metrics scope.

## Signature / Usage

The source page has no code. To check which Monitoring roles a principal holds on a scoping project, the source's access-control page shows this check (two source lines; the variable is quoted here).

Adapted (not in the official docs): `$PROJECT_ID` is quoted to avoid word splitting.

```bash
export PROJECT_ID="my-test-project"
gcloud projects get-iam-policy "$PROJECT_ID"
```

## Options / Props

### Data model

| Term | Meaning |
|---|---|
| Resource container | A Google Cloud project; stores time-series data for the services and quota it uses; the data carries a label identifying the container, so you can filter and group by it. |
| Metrics scope | The set of resource containers whose time-series data a project can chart and monitor (including services tied to SLOs and alerting policies). Default: only the project itself. Modifiable in the console, gcloud CLI and Cloud Monitoring API. |
| Scoping project | Hosts a metrics scope; stores alerting policies, uptime checks, dashboards, synthetic monitors, services and monitoring groups. Every project is a scoping project; in the console it is the project selected in the project picker. |

### Required IAM

| Goal | Required |
|---|---|
| View time-series data in the scope | All permissions of Monitoring Viewer (`roles/monitoring.viewer`) on the scoping project; nothing else. |
| Modify a metrics scope | All permissions of Monitoring Admin (`roles/monitoring.admin`) on the scoping project and on each resource container being added. |

### Example scopes

| | Scope A | Scope B | Scope C |
|---|---|---|---|
| Scoping project | scoping-project-A | scoping-project-B | scoping-project-C |
| Monitored projects | Project 1, Project 2 | Project 3, Project 4 | Projects 1 to 5 |
| IAM group (example) | Dev team A | Dev team B | SRE team |

## Notes

- Best practice: use a new project (or one without resources) as the scoping project, because it stores no time-series data of its own; otherwise charts and alerting policies need filters to exclude other containers' series, which raises the chance of configuration errors. Consider several scoping projects to control which teams can see which projects' data.
- A Monitoring read role on the scoping project lets the principal see charts and alerting policies that display data stored in any project in the metrics scope.
- App Hub: you manage the metrics scope for host projects and management projects for single-project boundaries (console or API). Google Cloud manages the metrics scope for app-enabled folders unless adding a project fails because the metrics scope quota is exhausted; then request a quota increase and add projects manually to the management project's scope.
- Pricing: https://cloud.google.com/products/observability/pricing
- Snippet taken from https://docs.cloud.google.com/monitoring/access-control (project-level `get-iam-policy`, adapted as above).
- Adapted from the official docs: the source writes `gcloud projects get-iam-policy $PROJECT_ID`; the variable was quoted.
- Source inconsistency: this page requires "all permissions in the Monitoring Admin (`roles/monitoring.admin`) role" to modify a metrics scope, while the access-control page (https://docs.cloud.google.com/monitoring/access-control) says the API needs `monitoring.metricsScopes.link` (included in Monitoring Metrics Scopes Admin, `roles/monitoring.metricsScopesAdmin`) and the console needs that permission or `roles/monitoring.editor`.
- Source: https://docs.cloud.google.com/monitoring/settings (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [multiple-projects.md](./multiple-projects.md)
- [access-control.md](./access-control.md)
- [monitoring-overview.md](./monitoring-overview.md)
