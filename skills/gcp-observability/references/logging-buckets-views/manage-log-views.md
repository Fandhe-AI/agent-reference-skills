---
source: https://docs.cloud.google.com/logging/docs/logs-views
---

# List, describe, update, and delete log views

Inspect and maintain log views on a bucket, and view the logs they expose in the Logs Explorer or Observability Analytics.

## Signature / Usage

### List views

```bash
gcloud logging views list \
 --bucket=BUCKET_NAME --location=LOCATION \
 --project=PROJECT_ID
```

Example output (empty create / update times mean the view was created with the project):

```text
VIEW_ID: _AllLogs
FILTER:
CREATE_TIME:
UPDATE_TIME:

VIEW_ID: compute
FILTER: resource.type="gce_instance"
CREATE_TIME: 2024-02-20T17:41:17.405162921Z
UPDATE_TIME: 2024-02-20T17:41:17.405162921Z
```

### Describe a view

```bash
gcloud logging views describe LOG_VIEW_ID \
 --bucket=BUCKET_NAME --location=LOCATION\
 --project=PROJECT_ID
```

```text
createTime: '2024-02-20T17:41:17.405162921Z'
filter: resource.type="gce_instance"
name: projects/my-project/locations/global/buckets/my-bucket/views/compute
updateTime: '2024-02-20T17:41:17.405162921Z'
```

### Update a view

```bash
gcloud logging views update LOG_VIEW_ID \
 --bucket=BUCKET_NAME --location=LOCATION \
 --log-filter=FILTER --description=DESCRIPTION \
 --project=PROJECT_ID
```

No response is returned; confirm with `gcloud logging views describe`.

### Delete a view

```bash
gcloud logging views delete LOG_VIEW_ID \
 --bucket=BUCKET_NAME --location=LOCATION \
 --project=PROJECT_ID
```

Example response:

```text
Deleted [tester].
```

## Options / Props

| Operation | Rule |
|-----------|------|
| Update | You can edit the description and filter; you can't update the `_Default` and `_AllLogs` views of any bucket. |
| Delete | You can't delete the `_Default` view on the `_Default` bucket. You can delete `_AllLogs`, but you can't create a view named `_AllLogs`. |
| Terraform | Can create and modify views, but can't list or describe them. |
| Scope flags | Replace `--project` with `--folder` or `--organization` when the bucket is there. |

## Notes

- Deleting a view removes it and any access it granted. Before deleting, check that nothing references it: saved or shared queries from Logs Explorer or Observability Analytics, and custom dashboards. Try it on a disposable project first.
- To read a view's logs in the Logs Explorer, open the scope menu (Project logs, N log view, or a log scope such as `_Default`), choose Log view, then select the view. In Observability Analytics you query a log view.
- Windows PowerShell / cmd.exe variants and Console steps are omitted.
- Source: https://docs.cloud.google.com/logging/docs/logs-views (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-log-view.md](./create-log-view.md)
- [grant-log-view-access.md](./grant-log-view-access.md)
- [log-views-overview.md](./log-views-overview.md)
