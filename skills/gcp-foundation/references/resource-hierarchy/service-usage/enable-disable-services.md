---
source: https://docs.cloud.google.com/service-usage/docs/enable-disable
---

# Enable and Disable Services (Service Usage)

Enable or disable Google Cloud APIs and services (including private Cloud Endpoints services) for a project with the console, `gcloud services`, or the Service Usage REST API.

## Signature / Usage

Enable one or several services:

```bash
gcloud services enable SERVICE
```

Multiple services are space-delimited, for example:

```bash
gcloud services enable bigquery.googleapis.com pubsub.googleapis.com
```

Response:

```text
Waiting for async operation operations/OPERATION_ID to complete...
Operation finished successfully.
```

```
gcloud services operations describe operations/OPERATION_ID
```

REST enable a single service:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d "" \
     "https://serviceusage.googleapis.com/v1/projects/PROJECT_ID/services/SERVICE:enable"
```

```
{
  "name": "operations/OPERATION_ID"
}
```

REST enable up to 20 services (`services.batchEnable`):

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

(Create `request.json` first with the body above.)

Disable (consider the data-loss notes first):

```bash
gcloud services disable SERVICE
```

```bash
gcloud services disable bigquery.googleapis.com pubsub.googleapis.com
```

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d "" \
     "https://serviceusage.googleapis.com/v1/projects/PROJECT_ID/services/SERVICE:disable"
```

Check the long-running operation:

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://serviceusage.googleapis.com/v1/operations/OPERATION_ID"
```

```
{
  "name": "operations/OPERATION_ID",
  "metadata": {
    "@type": "type.googleapis.com/google.protobuf.Empty"
  },
  "done": true,
  "response": {
    "@type": "type.googleapis.com/google.api.serviceusage.v1.EnableServiceResponse",
    "service": {
      "name": "projects/PROJECT_NUMBER/services/SERVICE",
      "config": {
        "name": "SERVICE",
        "title": "TITLE",
        "documentation": {},
        "quota": {},
        "authentication": {},
        "usage": {
          "requirements": [
            "serviceusage.googleapis.com/tos/cloud"
          ]
        },
        "monitoring": {}
      },
      "state": "ENABLED",
      "parent": "projects/PROJECT_NUMBER"
    }
  }
}
```

## Options / Props

| Item | Detail |
|------|--------|
| Required role | Service Usage Admin (`roles/serviceusage.serviceUsageAdmin`) on the project |
| Permissions | enable / batchEnable: `serviceusage.services.enable` on the project + `servicemanagement.services.bind` on the service(s); disable: `serviceusage.services.disable` |
| `services.disable` field `disableDependentServices` | `true` disables the service and all enabled services that depend on it (otherwise the request fails) |
| `services.batchEnable` | Up to 20 services per call |

## Notes

- Enabling can require accepting terms, approval for preview APIs, or extra contact information.
- Disabling still bills pending fees and billable use. Disabling Cloud Storage / BigQuery APIs does not delete data (storage billing continues): delete data first. Disabling the Cloud Run API deletes associated Cloud Run resources: confirm they are safe to delete. Disabling the Kubernetes Engine API suspends running clusters, which are deleted after 30 days (re-enable to reinstate, up to 24 hours).
- Enable / disable return long-running operations; `done: true` means complete.
- The Service Usage API is enabled by default; if it was disabled in the project issuing the request, re-enable it first.
- The same enable / disable operations are available at higher hierarchy levels in a Preview (hierarchical service activation) and the org policy `gcp.restrictServiceUsage` can deny services (see `../organization-policy/resource-service-usage.md`).
- Source: https://docs.cloud.google.com/service-usage/docs/enable-disable
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [list-and-concepts.md](./list-and-concepts.md)
- [access-control-and-quotas.md](./access-control-and-quotas.md)
- [../organization-policy/resource-service-usage.md](../organization-policy/resource-service-usage.md)
