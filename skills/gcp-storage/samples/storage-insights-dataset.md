---
source: https://docs.cloud.google.com/storage/docs/insights/configure-datasets
---

# Create and Link a Storage Insights Dataset

Create a dataset configuration that collects object metadata from source projects, link it to BigQuery, and query it with SQL. Requires Storage Intelligence for the project, folder or organization.

## Signature / Usage

### Enable the API

```bash
gcloud services enable storageinsights.googleapis.com
```

### Create the dataset configuration

Use project numbers (not IDs) for `--source-projects`. Configuration names allow letters, numbers and underscores.

Adapted (not in the official docs): renamed `my-dataset` to `my_dataset` (configuration names allow letters, numbers and underscores only).

```bash
gcloud storage insights dataset-configs create my_dataset \
--location=us-central1 \
--organization=123456789 \
--retention-period-days=30 \
--source-projects=987654321,123123123
```

### Link the dataset to BigQuery

```bash
gcloud storage insights dataset-configs create-link DATASET_CONFIG_ID --location=LOCATION
```

### Query objects (BigQuery)

Create a Cloud resource connection in BigQuery first, then:

```googlesql
SELECT
OBJ.GET_ACCESS_URL(OBJ.MAKE_REF(ref.uri, "CONNECTION_ID"), "r")
FROM `PROJECT_ID.INSIGHTS_DATASET.object_attributes_view` WHERE LOCATION = "US";
```

## Options / Props

| Task | Role | Required permissions |
|---|---|---|
| Configure a dataset | Storage Insights Admin (`roles/storageinsights.admin`) on source projects | `storageinsights.datasetConfigs.create`, `storage.buckets.getObjectInsights` |
| Link a dataset | Storage Insights Analyst (`roles/storageinsights.analyst`) and BigQuery Admin (`roles/bigquery.admin`) | `storageinsights.datasetConfigs.linkDataset` |
| Service agent | Storage Insights Collector Service (`roles/storage.insightsCollectorService`) on the organization | Grant to every configuration-scoped service agent |

## Notes

- The first data can take up to 48 hours to appear in BigQuery; new activity data typically within four hours.
- Service agent name format: `service-PROJECT_NUMBER@gcp-sa-storageinsights.iam.gserviceaccount.com`.
- `ObjectRef` queries can incur Cloud Storage operation, BigQuery function and BigQuery query costs.
- Inventory reports (single bucket, CSV or Parquet) may miss objects; use datasets for complete daily analysis.
- Adapted from the official docs: the source example used `create my-dataset`, which breaks its own naming rule.
- The source also shows Console steps, the JSON API, and more query examples (Gemini, face and object detection).
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`). IAM role grants are in `gcp-foundation`.
- Source inconsistency: the configure-datasets page says the listed roles "contain the permissions required to configure datasets", but the IAM roles reference does not include `storage.buckets.getObjectInsights` in `roles/storageinsights.admin` (22 permissions); the user also needs it from another role on the source buckets or projects (the IAM reference lists it in, for example, Storage Admin `roles/storage.admin`, which is broad; a custom role with that permission is narrower). `storageinsights.datasetConfigs.linkDataset` is in both `roles/storageinsights.analyst` and `roles/storageinsights.admin`.
- BigQuery Admin (`roles/bigquery.admin`) for linking is what the source lists "on your source projects"; it is a broad role, so scope it as narrowly as your policy allows.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/storageinsights (IAM roles reference; retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/storage (IAM roles reference; retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/storage/docs/insights/configure-datasets (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/insights/inventory-reports (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-secure-bucket.md](./create-secure-bucket.md)
- https://docs.cloud.google.com/storage/docs/insights/datasets
