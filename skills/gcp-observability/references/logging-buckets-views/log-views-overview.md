---
source: https://docs.cloud.google.com/logging/docs/logs-views
---

# Log views overview

Log views give granular control over who can access the logs within a Cloud Logging log bucket. A view exposes only a subset of a bucket's entries, selected by a filter, and access is controlled with IAM.

## Signature / Usage

### Example: view per contributing project

When a central project stores an organization's logs, create one log view per contributing project and grant each user one or more views. The view's filter selects its entries, for example:

```text
source("projects/myproject") AND
resource.type = "gce_instance" AND
log_id("stdout")
```

## Options / Props

### Limits and rules

| Item | Value |
|------|-------|
| Log views per log bucket | maximum 30 |
| View name | Limited to 100 characters; letters, digits, underscores, and hyphens only; can't be changed after creation. |
| Role bindings with the same role and principal but different conditions in a project's policy file | limit of 20 |
| `_AllLogs` view | Created automatically for every log bucket; shows all logs in the bucket. You can't modify it; you can delete it, but then you can't create a view named `_AllLogs`. |
| `_Default` view | Created automatically for the `_Default` log bucket; shows all non-Data Access audit logs in the bucket. Can't be modified or deleted. |

### Access control

| Approach | Detail |
|----------|--------|
| IAM policy on the log view | Add a binding granting access to one view. Recommended when you create large numbers of log views. |
| Conditional project-level `roles/logging.viewAccessor` | Grant on the project with an IAM condition limiting it to one view; without the condition the principal can access all log views. |
| Unconditional project-level `roles/logging.viewAccessor` | Principals can access views and logs in any log bucket in the project. |

## Notes

- IAM policies can exist at the resource, project, folder, and organization levels; each log view can have its own IAM policy. IAM evaluates all applicable policies, with the first evaluation at the resource level.
- Log views vs analytics views: a log view controls which entries in a bucket you can see; with Observability Analytics the `LogEntry` structure is the schema you query. An analytics view contains a SQL query over one or more log views, and its creator determines the schema.
- Required roles to manage views: Logs Configuration Writer (`roles/logging.configWriter`); to add a role binding to a project, Project IAM Admin (`roles/resourcemanager.projectIamAdmin`); to add a binding to a log view, Logging Admin (`roles/logging.admin`).
- Logs exposed through a view can contain personal data or secrets; grant `viewAccessor` narrowly. Field-level access is covered at https://docs.cloud.google.com/logging/docs/field-level-acl.
- The source also shows Console and Terraform forms.
- Source: https://docs.cloud.google.com/logging/docs/logs-views (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [log-view-filters.md](./log-view-filters.md)
- [create-log-view.md](./create-log-view.md)
- [grant-log-view-access.md](./grant-log-view-access.md)
- [manage-log-views.md](./manage-log-views.md)
