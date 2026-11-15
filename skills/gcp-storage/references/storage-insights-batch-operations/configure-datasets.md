---
source: https://docs.cloud.google.com/storage/docs/insights/configure-datasets
---

# Configure Storage Insights datasets

Create a dataset configuration, grant the service agent its role, link the dataset to BigQuery, and analyze object data, metadata, and object contexts with SQL. Requires Storage Intelligence for the project, folder, or organization.

## Signature / Usage

### Enable the Storage Insights API

```bash
gcloud services enable storageinsights.googleapis.com
```

### Create a dataset configuration (gcloud)

```text
gcloud storage insights dataset-configs create DATASET_CONFIG_ID \
  --location=LOCATION \
  --organization=SOURCE_ORG_NUMBER \
  --retention-period-days=DATASET_RETENTION_PERIOD_DAYS \
  (SCOPE_FLAG)
```

Replace `DATASET_CONFIG_ID` with the immutable configuration name (up to 128 characters; letters, numbers, underscores; must start with a letter), `LOCATION` with the BigQuery location of the linked dataset (for example `us-central1`), `SOURCE_ORG_NUMBER` with the organization ID of the source projects, and `DATASET_RETENTION_PERIOD_DAYS` with the retention. Example:

Adapted (not in the official docs): renamed `my-dataset` to `my_dataset` (configuration names allow letters, numbers and underscores only).

```bash
gcloud storage insights dataset-configs create my_dataset \
--location=us-central1 \
--organization=123456789 \
--retention-period-days=30 \
--source-projects=987654321,123123123
```

### Create a dataset configuration (JSON API)

JSON file (`PROJECT_NUMBER_1`, `PROJECT_NUMBER_2` are project numbers as strings; list as many as needed):

Adapted (not in the official docs): replaced `["PROJECT_NUMBERS", ...]` with two example entries so the request body is valid JSON.

```json
{
  "sourceProjects": {
    "project_numbers": ["PROJECT_NUMBER_1", "PROJECT_NUMBER_2"]
  },
  "retentionPeriodDays": "RETENTION_PERIOD_DAYS",
  "activityDataRetentionPeriodDays": "ACTIVITY_DATA_RETENTION_PERIOD_DAYS",
  "identity": {
    "type": "IDENTITY_TYPE"
  }
}
```

```bash
curl -X POST --data-binary @JSON_FILE_NAME \
"https://storageinsights.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/datasetConfigs?datasetConfigId=DATASET_CONFIG_ID" \
  --header "Authorization: Bearer $(gcloud auth print-access-token --impersonate-service-account=SERVICE_ACCOUNT)" \
  --header "Accept: application/json" \
  --header "Content-Type: application/json"
```

To include folders or an organization use the `sourceFolders` or `organizationScope` fields of `DatasetConfig`.

### Link a dataset to BigQuery

```bash
gcloud storage insights dataset-configs create-link DATASET_CONFIG_ID --location=LOCATION
```

```bash
gcloud storage insights dataset-configs create-link projects/DESTINATION_PROJECT_ID/locations/LOCATION/datasetConfigs/DATASET_CONFIG_ID
```

JSON API:

Adapted (not in the official docs): added the missing `/` between `datasetConfigs` and `DATASET_CONFIG_ID` and removed the trailing `?` in the URL.

```bash
curl -X POST \
  "https://storageinsights.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/datasetConfigs/DATASET_CONFIG_ID:linkDataset" \
    --header "Authorization: Bearer $(gcloud auth print-access-token --impersonate-service-account=SERVICE_ACCOUNT)" \
    --header "Accept: application/json" \
    --header "Content-Type: application/json"
```

### Analyze objects with BigQuery `ObjectRef` functions

Create a Cloud resource connection in BigQuery first, then combine the `ref` column with it:

```googlesql
SELECT
OBJ.GET_ACCESS_URL(OBJ.MAKE_REF(ref.uri, "CONNECTION_ID"), "r")
FROM `PROJECT_ID.INSIGHTS_DATASET.object_attributes_view` WHERE LOCATION = "US";
```

Detect sensitive data in PDFs with a default model:

Adapted (not in the official docs): the connection is passed as a string literal (`"CONNECTION_ID"`), as in the first `ObjectRef` example; backticks would make it an identifier.

```googlesql
SELECT AI.GENERATE(
   (
     'Does this document contain any credit card numbers or home addresses? Answer "SAFE" or "SENSITIVE".',
     OBJ.GET_ACCESS_URL(
       OBJ.MAKE_REF(ref.uri, "CONNECTION_ID"),
       'r'
     )
   )
)
FROM  `PROJECT_ID.INSIGHTS_DATASET.object_attributes_view`
WHERE contentType = 'application/pdf';
```

Find images with a label (object contexts, requires `object_contexts_catalog_view`):

```googlesql
SELECT
  t.project,
  t.bucket,
  t.name,
  t.generation,
  label
FROM
  `PROJECT_ID.INSIGHTS_DATASET.object_contexts_catalog_view` AS t,
  UNNEST(t.contexts) AS context,
  UNNEST(JSON_QUERY_ARRAY(context.extendedData.labelAnnotationGroup.labelAnnotations)) AS label
WHERE
  context.key = "google:annotation:label-detector-v1"
  AND LOWER(STRING(label.description)) = 'LABEL_DESCRIPTION'
  AND FLOAT64(label.score) > 0.75;
```

## Options / Props

### Required roles and permissions

| Task | Role | Required permissions |
|------|------|-------------|
| Configure a dataset | Storage Insights Admin (`roles/storageinsights.admin`) on source projects | `storageinsights.datasetConfigs.create`, `storage.buckets.getObjectInsights` |
| Link a dataset | Storage Insights Analyst (`roles/storageinsights.analyst`) and BigQuery Admin (`roles/bigquery.admin`) | `storageinsights.datasetConfigs.linkDataset` |
| Service agent (to generate and write datasets) | Storage Insights Collector Service (`roles/storage.insightsCollectorService`) on the organization containing the source projects | Grant to every configuration-scoped service agent; project-scoped agent needs it once |

### `gcloud storage insights dataset-configs create` flags

| Flag | Description |
|------|-------------|
| `--enable-organization-scope` | Collect from all buckets in the organization (one of the scope flags) |
| `--source-folders=[SOURCE_FOLDER_NUMBERS,...]` | Folder numbers to include |
| `--source-folders-file=FILE_PATH` | CSV of folder numbers uploaded to a bucket |
| `--source-projects=[SOURCE_PROJECT_NUMBERS,...]` | Project numbers to include |
| `--source-projects-file=FILE_PATH` | CSV of project numbers uploaded to a bucket |
| `--include-bucket-names=[BUCKETS_NAMES,...]` | Bucket names to include; the include group can't be combined with the exclude group |
| `--include-bucket-prefix-regexes=[BUCKETS_REGEXES,...]` | Bucket prefix regexes (RE2 syntax, for example `testbucket*`) to include |
| `--exclude-bucket-names=[BUCKETS_NAMES,...]` | Bucket names to exclude; the exclude group can't be combined with the include group |
| `--exclude-bucket-prefix-regexes=[BUCKETS_REGEXES,...]` | Bucket prefix regexes to exclude |
| `--include-source-locations=[LIST_OF_SOURCE_LOCATIONS,...]` | Locations of source projects to include; not with `--exclude-source-locations` |
| `--exclude-source-locations=[LIST_OF_SOURCE_LOCATIONS,...]` | Locations of source projects to exclude; not with `--include-source-locations` |
| `--project=DESTINATION_PROJECT_ID` | Project that stores the configuration and dataset; default is the active project |
| `--auto-add-new-buckets` | Include buckets added to source projects later |
| `--identity=IDENTITY_TYPE` | `IDENTITY_TYPE_PER_CONFIG` (default) or `IDENTITY_TYPE_PER_PROJECT` |
| `--description=DESCRIPTION` | Description of the configuration |
| `--activity-data-retention-period-days=ACTIVITY_RETENTION_PERIOD_DAYS` | Activity data retention; `0` excludes activity data |

## Notes

- The first data can take up to 48 hours to appear as a linked dataset in BigQuery; new activity data is typically included within four hours.
- Service agent name format: `service-PROJECT_NUMBER@gcp-sa-storageinsights.iam.gserviceaccount.com`; it is shown on the IAM page with **Include Google-provided role grants** selected.
- Use project numbers (not project IDs) for `--source-projects` and `project_numbers`.
- BigQuery cannot create models directly in a linked dataset. Create the model in a standard dataset and reference it from queries that target the linked dataset.
- `ObjectRef` queries can incur Cloud Storage operations, BigQuery function, and BigQuery query costs.
- The source also shows Console steps, additional query examples (custom Gemini model with `AI.GENERATE_TEXT`, face detection, object detection with bounding boxes, JPEG description), and troubleshooting links for `error_attributes_view`.
- Corrected from the official docs: flag names follow `gcloud storage insights dataset-configs create --help` (gcloud 593.0.0). The source documents `--include-buckets=BUCKET_NAMES_OR_REGEX`, `--exclude-buckets=BUCKET_NAMES_OR_REGEX` and `--skip-verification`; none of them exists in gcloud 593.0.0 (GA or alpha), so they were replaced by the `--include-bucket-*` / `--exclude-bucket-*` flags and the `--skip-verification` row was dropped.
- Adapted from the official docs: the source example uses `create my-dataset`, which breaks the page's own naming rule (letters, numbers and underscores only); renamed to `my_dataset` (the gcloud help example uses `my_config`).
- Adapted from the official docs: the source JSON body has `"project_numbers": ["PROJECT_NUMBERS", ...]`, which is not valid JSON.
- Corrected from the official docs: the sensitive-data query passes ``OBJ.MAKE_REF(ref.uri, `CONNECTION_ID`)`` with a backtick identifier; the page's first `ObjectRef` example uses the string `"CONNECTION_ID"`.
- Adapted from the official docs: the original linkDataset URL was `.../datasetConfigsDATASET_CONFIG_ID:linkDataset?` (missing `/`).
- Distance: Cloud Storage is Google Cloud's object storage; distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`). Service accounts and IAM role grants are covered by the `gcp-foundation` skill.
- Source inconsistency: the configure-datasets page says the listed roles "contain the permissions required to configure datasets", but the IAM roles reference does not include `storage.buckets.getObjectInsights` in `roles/storageinsights.admin` (22 permissions); the user also needs it from another role on the source buckets or projects (the IAM reference lists it in, for example, Storage Admin `roles/storage.admin`, which is broad; a custom role with that permission is narrower). `storageinsights.datasetConfigs.linkDataset` is in both `roles/storageinsights.analyst` and `roles/storageinsights.admin`.
- BigQuery Admin (`roles/bigquery.admin`) for linking is what the source lists "on your source projects"; it is a broad role, so scope it as narrowly as your policy allows.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/storageinsights (IAM roles reference; retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/storage (IAM roles reference; retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/storage/docs/insights/configure-datasets (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [datasets.md](./datasets.md)
- [batch-operations-overview.md](./batch-operations-overview.md)
- [storage-intelligence-overview.md](./storage-intelligence-overview.md)
