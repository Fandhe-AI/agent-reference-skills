---
source: https://docs.cloud.google.com/knowledge-catalog/docs/enable-api
---

# Enable and disable Knowledge Catalog

To use Knowledge Catalog in a project you must enable the Dataplex API, the Dataproc API (Managed Service for Apache Spark in the console step) and the Dataproc Metastore API. New projects, and projects where the BigQuery API is enabled, have the Dataplex API enabled by default, but the Dataproc API and Dataproc Metastore API still need enabling.

## Signature / Usage

### Enable a service

Adapted (not in the official docs): the gcloud help placeholder `my-consumed-service` is replaced by the three services this page names.

```bash
gcloud services enable dataplex.googleapis.com dataproc.googleapis.com metastore.googleapis.com --project=PROJECT_ID
```

The APIs to enable are `dataplex.googleapis.com`, `dataproc.googleapis.com` and `metastore.googleapis.com` (the Console enable flow at `https://console.cloud.google.com/apis/enableflow?apiid=dataplex.googleapis.com,dataproc.googleapis.com,metastore.googleapis.com` enables all three).

### Disable Knowledge Catalog

1. Delete each lake instance in the project. To delete a lake you must first delete its assets and zones (`projects.locations.lakes.delete`). To avoid charges, delete all Cloud Storage buckets for zones in the lake (before or after disabling the API) and wait for in-progress lake deletions to finish (an empty list on the Knowledge Catalog page).
2. Delete all custom entry groups in the project; deleting an entry group removes all its entries.
3. In the Console, open Enabled APIs and services, select the project, click Cloud Dataplex API, then Disable API and confirm.
4. If you also enabled the Data Lineage API, disable it separately.

## Options / Props

### Permissions needed to enable or disable APIs

| Need | Role or permission |
|---|---|
| Enable or disable the Dataplex API | Owner (`roles/owner`), Editor (`roles/editor`), or Service Usage Admin (`roles/serviceusage.serviceUsageAdmin`). |
| Enable APIs (permission) | `serviceusage.services.enable`, available through Owner or Service Usage Admin (`roles/serviceusage.serviceUsageAdmin`). |

## Notes

- Adapted from the official docs: the page shows the gcloud help example `gcloud services enable my-consumed-service`; the services this page names are used instead, with `--project` (flags per `gcloud services enable` help).
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/enable-api (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/services/enable (gcloud 593.0.0 help); the page itself has no fenced code. Replace `my-consumed-service` with the API names above.
- The source recommends creating a new project, and a project per lake instance to keep lake-created resources separate.
- Billing: the Data Lineage API is billed under the Knowledge Catalog Premium Processing SKU, separately from the Dataplex API. Disabling the Dataplex API does not disable the Data Lineage API or stop its Premium Processing charges.
- Disabling destroys data: deleting lakes, zones, assets and custom entry groups (with all their entries) is irreversible; try the steps on a disposable project first.
- System entry groups (names starting with `@`, such as `@bigquery`, `@vertexai`, `@dataform`) and their `entrygroup` entries (such as `@vertexai_entry`) cannot be deleted manually; Knowledge Catalog synchronizes Google Cloud service metadata independently of whether the Dataplex API is enabled. To remove synced entries, delete the source resources in the originating service. Empty system entry groups are placeholders that store no customer data.
- If the project also uses BigQuery, disabling Knowledge Catalog affects BigQuery behavior (see https://docs.cloud.google.com/bigquery/docs/service-dependencies); BigQuery itself is covered by `gcp-bigquery`, and Service Usage by `gcp-foundation`.

## Related

- [iam-and-access-control.md](./iam-and-access-control.md)
- [faq.md](./faq.md)
