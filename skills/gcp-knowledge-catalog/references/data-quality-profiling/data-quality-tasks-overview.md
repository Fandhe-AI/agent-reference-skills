---
source: https://docs.cloud.google.com/knowledge-catalog/docs/data-quality-tasks-overview
---

# Data quality tasks overview (legacy)

Knowledge Catalog (formerly Dataplex Universal Catalog) data quality tasks are a legacy offering based on open source software: you define YAML-based rules to validate tables in BigQuery and Cloud Storage without managing infrastructure. The source recommends the built-in auto data quality offering instead.

## Signature / Usage

How a task runs: a YAML specification (stored in a Cloud Storage bucket) plus a BigQuery result table are the inputs. The task runs a prebuilt, maintained CloudDQ PySpark binary on a serverless Spark environment, converts the YAML specification to BigQuery queries, and runs them on the tables named in the specification (zero-copy, automatic pushdown).

The page has no code of its own; the following debug query from the auto data quality overview is borrowed as an example of the kind of BigQuery SQL involved (it is not part of a CloudDQ YAML specification):

```sql
SELECT
  SUM(revenue),
  COUNT(DISTINCT item_id),
  SUM(revenue) / COUNT(DISTINCT item_id)
FROM `example_project.example_dataset.table`
```

## Options / Props

| Item | Detail |
|---|---|
| YAML specification | One or more YAML files in a Cloud Storage bucket in your project. Rules can run simultaneously on different BigQuery tables, including tables in different datasets or projects. Supports incremental runs that validate only new data. |
| BigQuery result table | User-specified table for validation results; its project can differ from the project that runs the task. |
| Tables to validate | Declared per rule in a rule binding. BigQuery native tables or BigQuery external tables in Cloud Storage; inside or outside a Knowledge Catalog zone; tables in one run can belong to different projects. |
| Scheduling | Serverless scheduler in Knowledge Catalog, or the Dataplex API through external schedulers such as Managed Airflow. |
| Charges | BigQuery usage (queries run in the user project) and Managed Service for Apache Spark (Batches) usage (runs the CloudDQ driver). No charge for organizing data or for the serverless scheduler. |

## Notes

- Source: https://docs.cloud.google.com/knowledge-catalog/docs/data-quality-tasks-overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/knowledge-catalog/docs/auto-data-quality-overview (the debug query example); the task page itself has no code, and the SQL is not part of the task's YAML specification.
- Caution (source): "Knowledge Catalog (formerly Dataplex Universal Catalog) data quality tasks is a legacy offering based on open source software. We recommend that you start using the latest built-in Auto data quality offering."
- Knowledge Catalog was formerly Dataplex Universal Catalog; the API, gcloud group, and IAM names stay `dataplex`. The BigQuery tables checked are covered by the gcp-bigquery skill.
- The source links "Use data quality tasks" (https://docs.cloud.google.com/knowledge-catalog/docs/check-data-quality) for creating a specification file; that page is outside this page's scope.
- Pricing: see BigQuery pricing, Managed Service for Apache Spark pricing, and Knowledge Catalog pricing (https://docs.cloud.google.com/dataplex/pricing); no prices are copied here.

## Related

- [auto-data-quality-overview.md](./auto-data-quality-overview.md)
- [data-profiling-overview.md](./data-profiling-overview.md)
