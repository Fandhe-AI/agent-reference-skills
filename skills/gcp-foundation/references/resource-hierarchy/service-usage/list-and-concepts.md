---
source: https://docs.cloud.google.com/service-usage/docs/list-services
---

# Listing Services, Default-Enabled Services, Public vs Private Services

Service Usage lists and manages APIs and services in projects (and, in Preview, folders and organizations). This page covers listing, which services are on by default, public vs private services, and "service not enabled" troubleshooting.

## Signature / Usage

Enabled services in a project (requires Service Usage Viewer):

```
gcloud services list
```

```
NAME: analyticshub.googleapis.com
TITLE: Analytics Hub API

NAME: appoptimize.googleapis.com
TITLE: App Optimize API

NAME: artifactregistry.googleapis.com
TITLE: Artifact Registry API

NAME: bigquery.googleapis.com
TITLE: BigQuery API
...
```

```
curl -H "Authorization: Bearer $(gcloud auth print-access-token)" "https://serviceusage.googleapis.com/v1/projects/PROJECT_ID/services?filter=state:ENABLED"
```

All available services (slow, up to ~30 seconds; cache the result):

```
gcloud services list --available
```

```
curl -H "Authorization: Bearer $(gcloud auth print-access-token)" "https://serviceusage.googleapis.com/v1/projects/PROJECT_ID/services"
```

Add `?filter=state:DISABLED` to exclude already-enabled services.

Enabled services in an organization or folder (Preview):

```
gcloud beta services list RESOURCE_TYPE=RESOURCE_ID
```

(`RESOURCE_TYPE` is `--organization` or `--folder`.)

```
curl -H "Authorization: Bearer $(gcloud auth print-access-token)" "https://serviceusage.googleapis.com/v2beta/RESOURCE_TYPE/RESOURCE_ID/consumerPolicies/default?filter=state:ENABLED"
```

(`RESOURCE_TYPE` is `organizations` or `folders`.)

```
{
  "name": "organizations/organization-name/consumerPolicies/default",
  ...
  "enableRules": [
    {
    "services": [
      "services/apphub.googleapis.com",
      "services/appoptimize.googleapis.com",
      "services/artifactregistry.googleapis.com",
      ...
      ]
    }
  ]
}
```

Retry guidance for API errors (exponential backoff with jitter): minimum 30 seconds for `429` quota errors; 1 second for `500` and `503`.

## Options / Props

Services enabled by default on new projects (console or gcloud; each can be disabled):

| Service | Endpoint |
|---------|----------|
| App Topology | `apptopology.googleapis.com` |
| BigQuery family | `analyticshub`, `bigquery`, `bigqueryconnection`, `bigquerydatapolicy`, `bigquerydatatransfer`, `bigquerymigration`, `bigqueryreservation`, `bigquerystorage` (`.googleapis.com`) |
| Dataform / Dataplex / Datastore | `dataform`, `dataplex`, `datastore` (`.googleapis.com`) |
| Logging / Monitoring / Trace | `logging`, `monitoring`, `cloudtrace` (`.googleapis.com`) |
| Cloud SQL | `sql-component.googleapis.com` |
| Cloud Storage | `storage-component.googleapis.com`, `storage.googleapis.com`, `storage-api.googleapis.com` |
| Google Cloud APIs | `cloudapis.googleapis.com` |
| Service Management | `servicemanagement.googleapis.com` |
| Service Usage | `serviceusage.googleapis.com` |
| Telemetry | `telemetry.googleapis.com` |

| Kind | Visibility and permissions |
|------|----------------------------|
| Public services | Visible to all projects (for example BigQuery, Cloud Storage, Cloud Monitoring); need `serviceusage.services.enable` to enable |
| Private services | Typically Cloud Endpoints APIs in another project; need an explicit access grant; enabling requires `servicemanagement.services.bind` |

## Notes

- Enabling an API associates it with the project, adds console monitoring pages, enables billing for it if billing is enabled, and some IAM roles only become visible after the service is enabled (for example `roles/compute.admin` after `compute.googleapis.com`).
- Using a Google Cloud API needs: a project, the service enabled on it, and credentials (API key or OAuth access token) associated with the project. "Service not enabled" is fixed by enabling the service (and the Service Usage API itself if it was disabled). Credential code belongs to gcp-client-libraries; auth setup to gcp-cli.
- Listing results include public services and private services you have access to; the list of available services changes infrequently.
- Cloud Asset Inventory is an alternative for listing enabled services across an organization (BigQuery export, change monitoring).
- Source: https://docs.cloud.google.com/service-usage/docs/list-services
- Source: https://docs.cloud.google.com/service-usage/docs/enabled-service
- Source: https://docs.cloud.google.com/service-usage/docs/public-vs-private
- Source: https://docs.cloud.google.com/service-usage/docs/troubleshooting
- Source: https://docs.cloud.google.com/service-usage/docs/overview
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [enable-disable-services.md](./enable-disable-services.md)
- [access-control-and-quotas.md](./access-control-and-quotas.md)
