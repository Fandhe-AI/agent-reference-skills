---
source: https://docs.cloud.google.com/sdk/gcloud/reference/services
---

# Services and Quotas

Copy-paste gcloud commands for enabling and listing APIs (Service Usage) and for viewing and managing quotas (Cloud Quotas).

## Signature / Usage

### List services

Enabled services in a project (requires Service Usage Viewer):

```bash
gcloud services list
```

All available services (slow, up to about 30 seconds; cache the result):

```bash
gcloud services list --available
```

Enabled services in an organization or folder (Preview):

```bash
gcloud beta services list RESOURCE_TYPE=RESOURCE_ID
```

`RESOURCE_TYPE` is `--organization` or `--folder`.

### Enable services

```bash
gcloud services enable SERVICE
```

```bash
gcloud services enable bigquery.googleapis.com pubsub.googleapis.com
```

```bash
gcloud services operations describe operations/OPERATION_ID
```

### Disable services

```bash
gcloud services disable SERVICE
```

```bash
gcloud services disable bigquery.googleapis.com pubsub.googleapis.com
```

### Set the quota project

```bash
gcloud auth application-default set-quota-project
```

```bash
gcloud config set billing/quota_project QUOTA_PROJECT_ID
```

Per command, pass `--billing-project=QUOTA_PROJECT_ID` (the flag wins over the configuration property).

### View quota information

```bash
gcloud components install beta
```

```bash
gcloud quotas info list --service=SERVICE_NAME --project=PROJECT_ID_OR_NUMBER \
--billing-project=BILLING_PROJECT_ID_OR_NUMBER
```

```bash
gcloud quotas info describe QUOTA_ID --service=SERVICE_NAME \
    --project=PROJECT_ID_OR_NUMBER --billing-project=BILLING_PROJECT_ID_OR_NUMBER
```

```bash
gcloud quotas info list --service=SERVICE_NAME --organization=ORGANIZATION_ID \
    --billing-project=BILLING_PROJECT_ID_OR_NUMBER
```

Get the quota metric names for alerts and charts:

```bash
gcloud quotas info list --project=PROJECT_ID_OR_NUMBER \
    --service=SERVICE_NAME --format="value(metric)"
```

```bash
gcloud beta quotas info list --project=PROJECT_ID_OR_NUMBER \
    --service=serviceusage.googleapis.com --format="value(metric)"
```

### Quota preferences

```bash
gcloud quotas preferences list --project=PROJECT_ID_OR_NUMBER \
    --billing-project=BILLING_PROJECT_ID_OR_NUMBER
```

```bash
gcloud quotas preferences list --project=PROJECT_ID_OR_NUMBER --reconciling-only=true \
    --billing-project=BILLING_PROJECT_ID_OR_NUMBER
```

```bash
gcloud quotas preferences create --project=PROJECT_ID_OR_NUMBER \
    --service=SERVICE_NAME \
    --quota-id=QUOTA_ID \
    --dimensions=DIMENSIONS \
    --preferred-value=PREFERRED_VALUE \
    --billing-project=BILLING_PROJECT_ID_OR_NUMBER \
    --email=EMAIL \
    --justification=JUSTIFICATION \
    --preference-id=PREFERENCE_ID
```

```bash
gcloud quotas preferences update PREFERENCE_ID --preferred-value=PREFERRED_VALUE \
    --quota-id=QUOTA_ID --service=SERVICE_NAME --project=PROJECT_ID_OR_NUMBER \
    --billing-project=BILLING_PROJECT_ID_OR_NUMBER --email=EMAIL  \
    --justification=JUSTIFICATION
```

```bash
gcloud quotas preferences describe PREFERENCE_ID \
    --project=PROJECT_ID_OR_NUMBER \
    --billing-project=BILLING_PROJECT_ID_OR_NUMBER
```

### Quota adjuster

```bash
gcloud quotas adjuster settings update --project=PROJECT_ID_OR_NUMBER --enablement=enabled
```

```bash
gcloud quotas adjuster settings update --folder=FOLDER_ID --enablement=enabled
```

```bash
gcloud quotas adjuster settings update --organization=ORGANIZATION_ID --enablement=enabled
```

```bash
gcloud quotas adjuster settings describe --RESOURCE_CONTAINER_TYPE=ID
```

`RESOURCE_CONTAINER_TYPE` is `project`, `folder`, or `organization`.

```bash
gcloud quotas adjuster settings update --project=PROJECT_ID_OR_NUMBER --enablement=disabled
```

## Options / Props

| Flag | Command | Meaning |
| --- | --- | --- |
| `--service` | `quotas info`, `quotas preferences create` | Service name such as `compute.googleapis.com` |
| `--quota-id` | `quotas preferences create` / `update` | Quota ID from `quotas info list` |
| `--preferred-value` | `quotas preferences create` / `update` | Requested quota value |
| `--dimensions` | `quotas preferences create` | Dimension values such as region |
| `--billing-project` | `quotas ...` | Project charged for the Cloud Quotas API call |
| `--enablement` | `quotas adjuster settings update` | `enabled` or `disabled` |

## Notes

- Warning: use a disposable project for `gcloud services disable` and `quotas preferences create` / `update`; always pass the exact service and project, and never omit the target. Disabling a service can delete or stop its data and resources.
- `gcloud quotas ...` needs the Cloud Quotas API (`cloudquotas.googleapis.com`) enabled; adjuster settings need `cloudquotas.quotas.update` and `cloudquotas.quotas.get`.
- `--reconciling-only=true` lists the preferences that still have pending adjustments (as described in the Cloud Quotas reference).
- Org-level folder and organization adjuster settings are available through gcloud beta commands or the REST API only (the console toggles project level).
- Source: https://docs.cloud.google.com/service-usage/docs/enable-disable (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/service-usage/docs/list-services (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/service-usage/docs/access-control (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/docs/quotas/view-manage (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/docs/quotas/quota-adjuster (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/docs/quotas/set-quota-project (retrieved 2026-11-14)

## Related

- [enable-disable-services.md](../references/resource-hierarchy/service-usage/enable-disable-services.md)
- [list-and-concepts.md](../references/resource-hierarchy/service-usage/list-and-concepts.md)
- [view-manage-quotas.md](../references/resource-hierarchy/quotas/view-manage-quotas.md)
- [quota-adjuster.md](../references/resource-hierarchy/quotas/quota-adjuster.md)
- [quota-project-and-alerts.md](../references/resource-hierarchy/quotas/quota-project-and-alerts.md)
