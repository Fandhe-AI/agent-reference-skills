---
source: https://docs.cloud.google.com/docs/quotas/view-manage
---

# View and Manage Quotas (Console and gcloud)

View quota usage, request quota adjustments, create overrides, and manage quota preferences with `gcloud quotas info` / `gcloud quotas preferences`; enable the quota adjuster through a client project.

## Signature / Usage

Install the beta component and list quota info (find the `quotaId`):

```bash
gcloud components install beta
```

```bash
gcloud quotas info list --service=SERVICE_NAME --project=PROJECT_ID_OR_NUMBER \
--billing-project=BILLING_PROJECT_ID_OR_NUMBER
```

```json
...
"quotaInfos": [
    ...
    {
        "name": "projects/PROJECT_NUMBER/locations/global/services/compute.googleapis.com/quotaInfos/CPUS-per-project-region",
        "quotaId": "CPUS-per-project-region",
        "metric": "compute.googleapis.com/cpus",
        "containerType": "PROJECT",
        "dimensions": [
            "region"
        ],
        "dimensionsInfo": [
            {
                "details": {
                    "value": 20
                },
                "applicableLocations": [
                    "us-central1",
                    "us-central2",
                    "us-west1",
                    "us-east1"
                ]
                ...
            }
        ]
    },
    ...
]
...
```

Describe one quota, or list for an organization:

```bash
gcloud quotas info describe QUOTA_ID --service=SERVICE_NAME \
    --project=PROJECT_ID_OR_NUMBER --billing-project=BILLING_PROJECT_ID_OR_NUMBER
```

```bash
gcloud quotas info list --service=SERVICE_NAME --organization=ORGANIZATION_ID \
    --billing-project=BILLING_PROJECT_ID_OR_NUMBER
```

Quota preferences (check, create, update, describe):

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

```yaml
{
    "createTime":"CREATE_TIME",
    "dimensions":{
        "DIMENSION_KEY_1":"DIMENSION_VALUE_1",
        "DIMENSION_KEY_2":"DIMENSION_VALUE_2"
    },
    "etag":"ETAG_VALUE",
    "name":"projects/PROJECT_ID_OR_NUMBER/locations/global/quotaPreferences/PREFERENCE_ID",
    "quotaConfig":{
        "grantedValue":"GRANTED_VALUE",
        "preferredValue":"PREFERRED_VALUE",
        "traceId":"TRACE_ID"
    },
    "quotaId":"QUOTA_ID",
    "reconciling":true,
    "service":"SERVICE_NAME",
    "updateTime":"UPDATE_TIME"
}
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

### Enable the quota adjuster through a client project

```bash
gcloud projects create CLIENT_PROJECT_ID
gcloud config set project CLIENT_PROJECT_ID
```

```bash
gcloud services enable cloudquotas.googleapis.com
```

```bash
gcloud iam service-accounts create SA_NAME \
  --display-name SA_DISPLAY_NAME \
  --project=CLIENT_PROJECT_ID
```

```bash
gcloud iam service-accounts keys create KEY_FILE \
  --iam-account=SA_NAME@CLIENT_PROJECT_ID.iam.gserviceaccount.com
```

```bash
gcloud projects add-iam-policy-binding CLIENT_PROJECT_ID \
  --member="serviceAccount:SA_NAME@CLIENT_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/serviceusage.serviceUsageConsumer"

gcloud projects add-iam-policy-binding RESOURCE_PROJECT_ID \
  --member="serviceAccount:SA_NAME@CLIENT_PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/cloudquotas.admin"
```

```bash
gcloud auth activate-service-account --key-file=KEY_FILE
```

```bash
gcloud quotas adjuster settings update --project=RESOURCE_PROJECT_ID \
  --enablement=enabled
```

```bash
gcloud quotas adjuster settings describe --project=RESOURCE_PROJECT_ID 
```

```text
enablement: ENABLED
etag: 8izmJp6EI__mOfLyhkQU9
name: projects/RESOURCE_PROJECT_ID/locations/global/quotaAdjusterSettings
updateTime: '2025-01-10T17:22:37.883221181Z'
```

## Options / Props

| gcloud flag | Meaning |
|-------------|---------|
| `--service` | Service name, for example `compute.googleapis.com` |
| `--quota-id` | The `quotaId` (console "Limit name" column) |
| `--dimensions` | Comma-separated key-value pairs, for example `region=us-east4,gpu_family=NVIDIA_H100` |
| `--preferred-value` | Requested quota value |
| `--billing-project` | Project whose Cloud Quotas API quota is used to run the command (optional if a billing/quota project is already set; omitting can cause permission denied) |
| `--email` | Contact if Google needs more information |
| `--justification`, `--preference-id` | Optional; the API generates a UUID preference ID if omitted |
| `--reconciling-only=true` | List only preferences with pending adjustments |

## Notes

- Limitations: quota increases are generally at project level (a few products support organization-level increases); decreases can be requested at project, folder, and organization level.
- Console: IAM & Admin > Quotas & System Limits shows usage sorted by most used. Current usage: per-minute rate quotas = average over the past 10 minutes; per-day rate quotas = total so far today (Pacific time); allocation and concurrent quotas = most recent value. Filter by Service, use Metric / Limit name / Monitored resource columns, "Show usage chart" (default 7 days, downloadable as PNG), and the Increase Requests tab. A missing value displays as `Unlimited`.
- Adjusting: select the quota > Edit > New value (> "Apply for higher quota" for larger values) > Submit request. If a checkbox says the request will remove any overrides, setting a value equal to or above the default removes the override. Batch related requests by product and area (large batches take longer to review). If the console cannot submit, ask Cloud Customer Care.
- Quota override (capping): set a value below the default; not available for every service. Reset via Filter "Has override: True" > Override > Reset value, or set the value equal to the default.
- The client-project quota adjuster flow creates a service account key (long-lived credential). If your organization enforces `iam.managed.disableServiceAccountKeyCreation` (the baseline default), use another authentication path (see gcp-security / gcp-client-libraries); treat and delete key files carefully.
- Cloud Quotas API and common use cases are covered by the Cloud Quotas API overview and "Implement common use cases" pages (not reproduced here).
- Source: https://docs.cloud.google.com/docs/quotas/view-manage
- Source: https://docs.cloud.google.com/docs/quotas/gcloud-cli-examples
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [cloud-quotas-overview.md](./cloud-quotas-overview.md)
- [quota-project-and-alerts.md](./quota-project-and-alerts.md)
- gcp-cli (gcloud general usage)
