---
source: https://docs.cloud.google.com/docs/quotas/view-manage
---

# View Quotas and Request an Adjustment

List quota info, create a quota preference, and track pending adjustments with `gcloud quotas`.

## Signature / Usage

Install the beta component, then find the `quotaId`:

```bash
gcloud components install beta
```

```bash
gcloud quotas info list --service=SERVICE_NAME --project=PROJECT_ID_OR_NUMBER \
--billing-project=BILLING_PROJECT_ID_OR_NUMBER
```

Describe one quota:

```bash
gcloud quotas info describe QUOTA_ID --service=SERVICE_NAME \
    --project=PROJECT_ID_OR_NUMBER --billing-project=BILLING_PROJECT_ID_OR_NUMBER
```

### Request an adjustment

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

### Track and update

```bash
gcloud quotas preferences list --project=PROJECT_ID_OR_NUMBER --reconciling-only=true \
    --billing-project=BILLING_PROJECT_ID_OR_NUMBER
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

```yaml
createTime: 'CREATE_TIME'
dimensions:
  gpu_family: NVIDIA_H100
  region: us-east4
etag: ETAG_VALUE
name: projects/12345/locations/global/quotaPreferences/PREFERENCE_ID
quotaConfig:
  grantedValue: '0'
  preferredValue: '128'
  traceId: TRACE_ID
quotaId: GPUS-PER-GPU-FAMILY-per-project-region
reconciling: true
service: compute.googleapis.com
updateTime: 'UPDATE_TIME'
```

### Check the quota adjuster

```bash
gcloud quotas adjuster settings describe --project=RESOURCE_PROJECT_ID 
```

## Options / Props

| gcloud flag | Meaning |
|-------------|---------|
| `--service` | Service name, for example `compute.googleapis.com` |
| `--quota-id` | The `quotaId` (console "Limit name" column) |
| `--dimensions` | Comma-separated key-value pairs, for example `region=us-east4,gpu_family=NVIDIA_H100` |
| `--preferred-value` | Requested quota value |
| `--billing-project` | Project whose Cloud Quotas API quota runs the command |
| `--reconciling-only=true` | List only preferences with pending adjustments |

## Notes

- Quota increases are generally at project level; decreases can be requested at project, folder, and organization level. Setting a value at or above the default removes an override.
- Omitting `--billing-project` can cause permission denied when no quota project is set.
- Enabling the quota adjuster through a client project in the official page creates a service account key; that flow is not reproduced here. Use a disposable project and avoid long-lived keys if your organization blocks key creation.
- Console path: IAM & Admin > Quotas & System Limits.
- Source: https://docs.cloud.google.com/docs/quotas/view-manage (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/docs/quotas/gcloud-cli-examples (retrieved 2026-11-14)

## Related

- [view-manage-quotas.md](../references/resource-hierarchy/quotas/view-manage-quotas.md)
- [cloud-quotas-overview.md](../references/resource-hierarchy/quotas/cloud-quotas-overview.md)
- [quota-project-and-alerts.md](../references/resource-hierarchy/quotas/quota-project-and-alerts.md)
