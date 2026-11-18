---
source: https://docs.cloud.google.com/logging/docs/logs-views
---

# Grant access to a log view

Two ways to restrict a principal to a specific log view on a user-defined bucket: add a role binding on the log view's own IAM policy (recommended for many views), or add a conditional `roles/logging.viewAccessor` binding at the project level.

## Signature / Usage

### Log view level: add a binding

Replace `PRINCIPAL` (form `PRINCIPAL-TYPE:ID`, for example `user:my-user@example.com`). Use `--folder` or `--organization` in place of `--project` when needed.

```bash
gcloud logging views add-iam-policy-binding LOG_VIEW_ID \
  --member=PRINCIPAL --role='roles/logging.viewAccessor' \
  --bucket=BUCKET_NAME --location=LOCATION \
  --project=PROJECT_ID
```

Response when one binding is added:

```text
Updated IAM policy for logging view [projects/PROJECT_ID/locations/global/buckets/BUCKET_NAME/views/LOG_VIEW_ID].
bindings:
- members:
  - PRINCIPAL
  role: roles/logging.viewAccessor
etag: BwYXfSd9-Gw=
version: 1
```

Verify and list bindings:

```bash
gcloud logging views get-iam-policy LOG_VIEW_ID \
 --bucket=BUCKET_NAME --location=LOCATION \
 --project=PROJECT_ID
```

### Project level: conditional binding

Create `condition.yaml`:

```yaml
expression: "resource.name == \"projects/PROJECT_ID/locations/LOCATION/buckets/BUCKET_NAME/views/LOG_VIEW_ID\""
title: "My title"
description: "My description"
```

Add the binding:

```bash
gcloud projects add-iam-policy-binding PROJECT_ID --member=PRINCIPAL --role='roles/logging.viewAccessor' --condition-from-file=condition.yaml
```

List project bindings:

```bash
gcloud projects get-iam-policy PROJECT_ID
```

The resulting binding looks like:

```text
- condition:
    description: My description
    expression: resource.name == "projects/PROJECT_ID/locations/LOCATION/buckets/BUCKET_NAME/views/LOG_VIEW_ID"
    title: My title
  members:
  - PRINCIPAL
  role: roles/logging.viewAccessor
```

## Options / Props

| Item | Detail |
|------|--------|
| Role | Logs View Accessor, `roles/logging.viewAccessor` |
| Condition resource name | `projects/PROJECT_ID/locations/LOCATION/buckets/BUCKET_NAME/views/LOG_VIEW_ID` (full path to the view) |
| Limit | 20 role bindings in a project's policy file with the same role and principal but different condition expressions |
| Required roles | `roles/resourcemanager.projectIamAdmin` to add a project binding; `roles/logging.admin` to add a log view binding |

## Notes

- Without the IAM condition, a project-level `roles/logging.viewAccessor` grant gives access to all log views in the project. Prefer the log-view-level binding where possible.
- The IAM page in the console lists only project-level bindings, not bindings on a log view. To list all bindings for a view, open Logs Storage, select the bucket, and use Adjust permissions on the view: Logs View Accessor (N) are project-level grants (all views); sections with a condition are conditional project-level grants; the section labeled like condition:abcde lists log view-level grants.
- Windows PowerShell / cmd.exe variants of the commands, Console steps, Terraform resources (`google_logging_log_view_iam_policy` / `_binding` / `_member`, `google_project_iam_policy` / `_binding` / `_member`), and an `gcloud alpha iam policies lint-condition --condition-from-file=condition.yaml` validation step exist in the source and are not copied.
- The source's response for `get-iam-policy` is only an `etag` when the view has no bindings.
- Source: https://docs.cloud.google.com/logging/docs/logs-views (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [log-views-overview.md](./log-views-overview.md)
- [create-log-view.md](./create-log-view.md)
- [manage-log-views.md](./manage-log-views.md)
