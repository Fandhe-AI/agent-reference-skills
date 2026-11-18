---
source: https://docs.cloud.google.com/logging/docs/logs-views
---

# Create a log view

Create a log view on an existing log bucket with a filter that selects which entries are visible. After creating it, grant principals access to the view.

## Signature / Usage

### gcloud

Replace `LOG_VIEW_ID`, `BUCKET_NAME`, `LOCATION`, `FILTER` (empty means all logs; for example `"resource.type=gce_instance"`), `DESCRIPTION` (for example `"Compute logs"`), and `PROJECT_ID`. To create the view in a folder or organization, replace `--project` with `--folder` or `--organization`.

```bash
gcloud logging views create LOG_VIEW_ID --bucket=BUCKET_NAME \
 --location=LOCATION --log-filter=FILTER --description=DESCRIPTION \
 --project=PROJECT_ID
```

The command produces no response; confirm with `gcloud logging views list`.

### Terraform fields (names only)

The `google_logging_log_view` resource takes `name` (fully qualified view name), `bucket` (fully qualified bucket name), `filter`, and `description`. Name format for projects:

```text
projects/PROJECT_ID/locations/LOCATION/buckets/BUCKET_NAME/view/LOG_VIEW_ID
```

## Options / Props

| Parameter | Description |
|-----------|-------------|
| `LOG_VIEW_ID` | View identifier; up to 100 characters; letters, digits, underscores, hyphens only. Can't be changed after creation. |
| `BUCKET_NAME` | Name of the log bucket. |
| `LOCATION` | Location of the log bucket. |
| `--log-filter` | Filter that defines the view; when empty, the view includes all logs. |
| `--description` | Description of the view. |
| `--project` / `--folder` / `--organization` | Where the log bucket is. |

## Notes

- Maximum 30 log views per log bucket.
- Prerequisites: a log bucket exists, and you hold `roles/logging.configWriter` (plus `roles/resourcemanager.projectIamAdmin` or `roles/logging.admin` to add bindings).
- A new view isn't readable by others until you grant access; see [grant-log-view-access.md](./grant-log-view-access.md).
- The source also shows Console steps, Windows PowerShell / cmd.exe variants of the command, and a Terraform resource.
- Source: https://docs.cloud.google.com/logging/docs/logs-views (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [log-view-filters.md](./log-view-filters.md)
- [grant-log-view-access.md](./grant-log-view-access.md)
- [manage-log-views.md](./manage-log-views.md)
