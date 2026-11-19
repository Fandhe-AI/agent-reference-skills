---
source: https://docs.cloud.google.com/knowledge-catalog/docs/cloud-storage-discovery
---

# Cloud Storage Automatic Discovery

Knowledge Catalog automatic discovery (also called standalone discovery) scans data in Cloud Storage buckets, groups structured, semi-structured and unstructured files into tables, collects metadata (table name, schema, partition definition) and creates or updates BigLake external, non-BigLake external or BigLake object tables in BigQuery. BigLake tables are automatically ingested into Knowledge Catalog for search and discovery.

## Signature / Usage

### Create a discovery scan

Adapted (not in the official docs): added the required `DATASCAN` positional argument, which the gcloud 593.0.0 help lists for `create data-discovery` and the source omits.

```bash
gcloud dataplex datascans create data-discovery DATASCAN --location=LOCATION \
  --data-source-resource=BUCKET_PATH
```

### Run on demand

```bash
gcloud dataplex datascans run DATASCAN \
  --location=LOCATION
```

### List scans

```bash
gcloud dataplex datascans list --location=LOCATION --project=PROJECT_ID
```

### View a scan job

```bash
gcloud dataplex datascans jobs describe JOB \
  --location=LOCATION \
  --datascan=DATASCAN \
  --view=FULL
```

### View historical results

```bash
gcloud dataplex datascans jobs list \
  --location=LOCATION \
  --datascan=DATASCAN
```

### Update a scan

```bash
gcloud dataplex datascans update data-discovery SCAN_ID --location=LOCATION --description=DESCRIPTION
```

### Delete a scan

```bash
gcloud dataplex datascans delete SCAN_ID --location=LOCATION --async
```

## Options / Props

### Supported data

| Kind | Details |
|---|---|
| Structured / semi-structured formats | Parquet, Avro, ORC, JSON (newline-delimited only), CSV (not CSV with comment rows); files must be in folders with the same format and a compatible schema; registered as BigLake external tables |
| Internal compression | gzip `.gz.parquet` (Parquet); lz4 `.lz4.parquet` (Parquet); Snappy `.snappy.parquet` (Parquet, ORC, Avro); lzo `.lzo.parquet` (Parquet, ORC) |
| External compression (JSON, CSV) | gzip, bzip2 |
| Unstructured formats | Image (JPEG, PNG, BMP), documents (PDF, slides, text reports), audio or video (WAV, MP3, MP4); each folder must hold one file format; registered as BigLake object tables |
| Not supported | Apache Iceberg and Delta Lake table formats |

### Registered table types

| Table type | When created |
|---|---|
| BigLake object tables | Unstructured data |
| BigLake external tables | Structured / semi-structured data when a Google Cloud resource connection ID is given |
| External tables (non-BigLake) | Structured / semi-structured data when no connection ID is given |

### Roles

| Principal | Role | Scope |
|---|---|---|
| Knowledge Catalog service account `service-PROJECT_NUMBER@gcp-sa-dataplex.iam.gserviceaccount.com` | `roles/dataplex.discoveryServiceAgent` | Storage bucket |
| Knowledge Catalog service account | `roles/dataplex.discoveryPublishingServiceAgent` | User project |
| Knowledge Catalog service account (creating BigLake tables) | `roles/dataplex.discoveryBigLakePublishingServiceAgent` | BigQuery connection |
| BigQuery Connection service account | `roles/dataplex.discoveryServiceAgent` | Cloud Storage bucket |
| End user | `roles/dataplex.dataScanAdmin` (full), `roles/dataplex.dataScanEditor` (write), `roles/dataplex.dataScanViewer` (read, no results), `roles/dataplex.dataScanDataViewer` (read incl. results) | Project |

### Permissions for the scan

| Permission | On |
|---|---|
| `bigquery.datasets.create`, `bigquery.datasets.get` | Data source project |
| `storage.buckets.get`, `storage.objects.get`, `storage.objects.list` | Data source bucket |
| `bigquery.connections.delegate`, `bigquery.connections.use` (when providing a connection) | BigQuery connection |

### End-user DataScan permissions

| Task | Permission |
|---|---|
| Create | `dataplex.datascans.create` on the project |
| Delete | `dataplex.datascans.delete` |
| View excluding results | `dataplex.datascans.get` |
| View including results | `dataplex.datascans.getData` |
| List | `dataplex.datascans.list` |
| Run | `dataplex.datascans.run` |
| Update description | `dataplex.datascans.update` |
| View / set IAM policy | `dataplex.datascans.getIamPolicy` / `dataplex.datascans.setIamPolicy` |

### Scan settings

| Setting | Value |
|---|---|
| Include / exclude patterns | Glob: `*` (no directory crossing), `**` (crosses directories), `?` (one character), `[...]`, `{a,b}`, `\` escape; exclude patterns are applied first; enter `**/sub_directory/**` without quotation marks |
| Dataset project | Defaults to the project containing the bucket |
| Location type | Region or Multi-region for the BigQuery publishing dataset |
| JSON options | Disable type inference (columns become primitive types); encoding (default UTF-8) |
| CSV options | Disable type inference (all columns strings); header rows `0` or `1` (default `0`); delimiter single character, `\r` or `\n` (default `,`); encoding (default UTF-8) |
| Scan types | Scheduled; on-demand (runs once on creation, then any time); one-time (deleted at its TTL, 0 seconds to 365 days, 24 hours by default) |
| Published dataset name | Bucket name with invalid characters replaced by `_`; a suffix such as `_discovered_001` if the name is taken |
| Management label | `metadata-managed-mode` = `discovery-managed` (default) or `user_managed` |

## Notes

- Corrected from the official docs: the source command is `gcloud dataplex datascans create data-discovery --location=LOCATION --data-source-resource=BUCKET_PATH`; it omits the positional `DATASCAN` argument that the gcloud 593.0.0 help requires.
- Grant the roles to the service accounts, not your user account, otherwise permission errors can occur. Replace `PROJECT_NUMBER` with the project where the Dataplex API is enabled.
- The `BUCKET_PATH` value for `--data-source-resource` is a fully qualified name of the form `//storage.googleapis.com/projects/{project_id_or_number}/buckets/{bucket_id}` according to the gcloud 593.0.0 help.
- Setting `metadata-managed-mode` to `user_managed` keeps the schema unchanged on later scans and can reduce cost. To delete a published table, first delete its data files in Cloud Storage, make sure the label is not `user_managed` (the source says set it to `discovery_managed`; the default value is spelled `discovery-managed` elsewhere on the page), then run the scan on demand.
- Column-level and row-level security can be applied to scan-managed tables. Updating is not supported for one-time scans.
- `gcloud dataplex datascans delete ... --async` and deleting published tables are irreversible; try them on a disposable bucket and dataset first.
- A one-time scan is deleted automatically after its TTL. The limit on tables per scan is in https://docs.cloud.google.com/bigquery/quotas#dataplex-discovery.
- The source also shows Console and REST forms (`dataScans.create`, `run`, `list`, `get`, `jobs.list`, `patch`, `delete`).
- The BigQuery tables, BigLake / object tables and connections are in `gcp-bigquery`; Cloud Storage itself is in `gcp-storage`. BigLake is now called Lakehouse (API, gcloud and IAM names stay `biglake`).
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/cloud-storage-discovery (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-search.md](./about-search.md)
- [search-assets.md](./search-assets.md)
