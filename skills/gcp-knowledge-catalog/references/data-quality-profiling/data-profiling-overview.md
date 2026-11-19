---
source: https://docs.cloud.google.com/knowledge-catalog/docs/data-profiling-overview
---

# Data profiling overview

Data profiling in Knowledge Catalog (formerly Dataplex Universal Catalog) calculates column-level statistics (common values, distributions, null percentages) for BigQuery tables and for Apache Iceberg, Apache Hive, and SAP Business Data Cloud (BDC) Delta Lake tables managed by Google Cloud Lakehouse. A data profile scan is a Knowledge Catalog data scan tied to one table, runs in a Google tenant project (no infrastructure to set up), and its results can generate rule recommendations for auto data quality.

## Signature / Usage

Create a data profile scan with gcloud (a standard-mode scan on a BigQuery table):

Adapted (not in the official docs): the resource path is on one line; the gcloud help wraps it with a backslash and indentation inside the quotes, which would insert spaces into the path.

```bash
gcloud dataplex datascans create data-profile \
    data-profile-datascan --project=test-project \
    --location=us-central1 \
    --data-source-resource="//bigquery.googleapis.com/projects/test-project/datasets/test-dataset/tables/test-table"
```

## Options / Props

### Profiling modes

| Mode | Behavior |
|---|---|
| Standard | Default. Comprehensive and customizable profile using the sampling and filters you specify; suited to detailed analysis and long-term monitoring. |
| Lightweight (Preview) | Low-latency scans that return results in seconds, for grounding AI agent responses, cost-effective pre-generation of profiles at scale, and rapid health reports. You can't modify the scope, filters, or sampling size, and it doesn't support BigQuery views and external tables. |

### Configuration options (Standard mode)

| Option | Detail |
|---|---|
| Scheduling | Run on a defined frequency or on demand; a running job can be canceled. |
| Execution identity | Default is the centralized service agent `service-PROJECT_NUMBER@gcp-sa-dataplex.iam.gserviceaccount.com`; override with a custom service account or End-User Credentials (EUC). With a custom identity, processing and storage charges are centralized under BigQuery (bypassing Knowledge Catalog Premium SKUs). |
| Networking | Private Google Access must be enabled on the VPC subnet used for the scan (or on the default subnet if none is specified). |
| Scope: Full table | The entire table is scanned; sampling, row filters, and column filters apply to the entire table. |
| Scope: Incremental | A `Date` or `Timestamp` column (typically the partitioning column) marks the increment; sampling and filters apply to the incremental data. |
| Row filters | Restrict to a time period or segment (for example region). |
| Column filters | Include or exclude specific columns. Not supported by lightweight scans, which also don't support row filters. |
| Sampling | A percentage of records to sample. |
| Multiple scans | In the console, select up to 100 tables from one dataset and create a profile scan for each. Not supported for Lakehouse tables. |
| Export | Export results to a BigQuery table for further analysis (for example a Looker dashboard). |

### Profiling results by column type

| Column type | Results |
|---|---|
| Numeric | Percentage of null values; percentage of approximate unique values; top 10 most common values (fewer if fewer unique values; nulls not included) with their occurrence percentage; average, standard deviation, minimum, approximate lower quartile, approximate median, approximate upper quartile, maximum. |
| String | Percentage of null values; percentage of approximate unique values; top 10 most common values; average, minimum, and maximum string length. |
| Other non-nested (date, time, timestamp, binary, etc.) | Percentage of null values; percentage of approximate unique values; top 10 most common values. |
| Nested or complex (Record, Array, JSON) or any column with repeated mode | Percentage of null values only. |

### Limitations

| Limitation | Detail |
|---|---|
| Supported tables | BigQuery tables, and Apache Iceberg, Apache Hive, and SAP BDC Delta Lake tables managed by Google Cloud Lakehouse. |
| `BIGNUMERIC` | Not supported when a Knowledge Catalog entry is the data source; the scan fails validation and isn't created. BigQuery tables as the source support all column types. |
| Multiple scans | Not supported for Lakehouse tables. |
| Approximate values | Might differ from actual values by 1-2% for performance. |

## Notes

- Source: https://docs.cloud.google.com/knowledge-catalog/docs/data-profiling-overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/datascans/create/data-profile (gcloud 593.0.0 help); the overview page itself has no code.
- Adapted from the official docs: the gcloud help example wraps the quoted resource path as `"//bigquery.googleapis.com/projects/test-\` followed by an indented `project/datasets/...`; it is joined into one path.
- Results can be published to the source table's Data profile tab in BigQuery and Knowledge Catalog (visible from any project), viewed per job (latest and historical), and trended on the Analysis tab. Exported results can feed dashboards such as Data Studio.
- DCU compute costs are not emitted as Cloud Monitoring metrics; query the Cloud Billing export in BigQuery using `goog-dataplex-datascan-*` system labels.
- Knowledge Catalog was formerly Dataplex Universal Catalog; the API, gcloud group, and IAM names stay `dataplex`. The BigQuery tables profiled are covered by the gcp-bigquery skill.
- Lakehouse is the current name of BigLake (the API, gcloud group, and IAM names stay `biglake`).
- Pricing: see Knowledge Catalog pricing (https://cloud.google.com/dataplex/pricing); no prices are copied here.

## Related

- [auto-data-quality-overview.md](./auto-data-quality-overview.md)
- [system-rule-templates-list.md](./system-rule-templates-list.md)
- [data-quality-tasks-overview.md](./data-quality-tasks-overview.md)
