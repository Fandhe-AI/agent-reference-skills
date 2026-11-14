---
source: https://docs.cloud.google.com/service-usage/docs/enable-disable
---

# Enable and Disable Google Cloud APIs

Enable or disable services for a project with `gcloud services` or the Service Usage REST API.

## Signature / Usage

### gcloud

```bash
gcloud services enable SERVICE
```

Several at once (space-delimited):

```bash
gcloud services enable bigquery.googleapis.com pubsub.googleapis.com
```

```text
Waiting for async operation operations/OPERATION_ID to complete...
Operation finished successfully.
```

```
gcloud services operations describe operations/OPERATION_ID
```

Disable:

```bash
gcloud services disable bigquery.googleapis.com pubsub.googleapis.com
```

### REST: enable one service

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d "" \
     "https://serviceusage.googleapis.com/v1/projects/PROJECT_ID/services/SERVICE:enable"
```

### REST: batch enable (up to 20)

`request.json`:

```
{
  "serviceIds": ["SERVICE1", "SERVICE2"]
}
```

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://serviceusage.googleapis.com/v1/projects/PROJECT_ID/services:batchEnable"
```

### REST: check the operation

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://serviceusage.googleapis.com/v1/operations/OPERATION_ID"
```

### Restrict which services may be used (org policy)

```yaml
name: organizations/ORGANIZATION_ID/policies/gcp.restrictServiceUsage
spec:
  rules:
  - values:
      deniedValues:
      - file.googleapis.com
      - bigquery.googleapis.com
      - storage.googleapis.com
```

## Options / Props

| Item | Detail |
|------|--------|
| Required role | `roles/serviceusage.serviceUsageAdmin` on the project |
| Enable permissions | `serviceusage.services.enable` plus `servicemanagement.services.bind` on the service |
| `services.batchEnable` | Up to 20 services per call |
| `disableDependentServices` | `true` also disables enabled dependents; otherwise the request fails |

## Notes

- Enable and disable return long-running operations; `done: true` means complete.
- Disabling the Cloud Run API deletes associated Cloud Run resources, and disabling the Kubernetes Engine API suspends clusters (deleted after 30 days). Delete data first for Cloud Storage / BigQuery; run disable only in a disposable project.
- Disabling still bills pending fees. The Service Usage API is enabled by default.
- Source: https://docs.cloud.google.com/service-usage/docs/enable-disable (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/restricting-resources (retrieved 2026-11-14)

## Related

- [enable-disable-services.md](../references/resource-hierarchy/service-usage/enable-disable-services.md)
- [resource-service-usage.md](../references/resource-hierarchy/organization-policy/resource-service-usage.md)
- [access-control-and-quotas.md](../references/resource-hierarchy/service-usage/access-control-and-quotas.md)
