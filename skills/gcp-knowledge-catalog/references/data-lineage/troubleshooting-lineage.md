---
source: https://docs.cloud.google.com/knowledge-catalog/docs/troubleshooting-lineage
---

# Troubleshoot data lineage issues

If lineage graphs, process metadata, table details or column-level links don't appear as expected, or you see unexpected Knowledge Catalog Premium Processing charges, check project permissions, API settings and supported job types. Data lineage involves three kinds of project: the BigQuery storage project, the compute project and the active project.

## Signature / Usage

### Compute project in a BigQuery API request

Replace the compute project in the URL path and in `jobReference.projectId`. In this example the compute project is `docs-compute`.

Adapted (not in the official docs): removed the trailing comma after the `location` field so the JSON body is valid.

```text
POST /bigquery/v2/projects/docs-compute/jobs HTTP/1.1
Host: bigquery.googleapis.com
User-Agent: Go-http-client/1.1
Authorization: <REDACTED 1031 BYTES>
Accept-Encoding: gzip
{
  "configuration": {
    "query": {
      "useLegacySql": false,
      "query": "CREATE OR REPLACE TABLE `docs-target.dataset.target-002` AS SELECT * FROM `docs-source.dataset.source-002`;"
    }
  },
  "jobReference": {
    "projectId": "docs-compute",
    "jobId": "docs-compute-job-id",
    "location": "us"
  }
}
```

### Error message when process metadata is not visible

```text
You don't have permission to view BigQuery process metadata in project X.
```

## Options / Props

### Project types

| Project | Meaning |
|---|---|
| BigQuery storage project | Stores the BigQuery data assets; shown in `Table ID` before the first dot |
| Compute project | Stores the data lineage metadata; for BigQuery, where you run a job (in API requests, the project in the URL) |
| Active project | The project from which you view lineage (project selector in the console, or the project making API calls) |

### Symptoms and fixes

| Symptom | Cause | Fix |
|---|---|---|
| BigQuery lineage not showing (message "Fetching lineage failed due to missing permissions." means the active project; otherwise the compute project) | Data Lineage API disabled in the active or compute project; missing `roles/datalineage.viewer` in the active or compute project; lineage hasn't arrived yet (30 minutes up to 24 hours) | Enable the Data Lineage API in the compute project, then run a job; enable it in the active project; grant Data Lineage Viewer (`roles/datalineage.viewer`) in both projects |
| BigQuery process metadata not showing (SQL statement or `Process type` missing) | No permission to see metadata in the compute project | Grant `bigquery.jobs.get` (for example in BigQuery Resource Viewer, `roles/bigquery.resourceViewer`) in the compute project |
| BigQuery table details show only `Fully qualified name` (message `Entry with this fully qualified name is not available in Knowledge Catalog or you do not have permissions to view it`) | Missing permissions in the table's storage project | Grant `bigquery.tables.get` (for example in BigQuery Data Viewer, `roles/bigquery.dataViewer`) in the storage project |
| Unexpected "Knowledge Catalog Premium Processing" SKU charges after disabling the Dataplex API | The Data Lineage API (`datalineage.googleapis.com`) is still enabled and is billed under that SKU as a separate API | Check the Cloud Billing report for label `goog-dataplex-workload-type` = `LINEAGE`; turn off data lineage by disabling the Data Lineage API in your projects |

### Column-level lineage shows "There are no columns to select"

| Scenario | Detail |
|---|---|
| Custom OpenLineage events | `ProcessOpenLineageRunEvent` supports table-level lineage only; custom column-level facets aren't rendered |
| Unsupported systems | Column-level graphs only for BigQuery SQL transformations and Managed Service for Apache Spark jobs; Cloud Data Fusion and Vertex AI are table-level only |
| Unsupported BigQuery job types | Not collected for load jobs, copy jobs or routines |
| External tables | Upstream column-level lineage isn't collected |
| Unstructured or storage-level assets | Columns shown only if column-level lineage was reported for the file asset |
| Nested types | Top-level columns only; no `STRUCT` or `JSON` nested fields |
| Partitioning pseudo-columns | `_PARTITIONDATE` and `_PARTITIONTIME` aren't recognized |
| Link limit | More than 1,500 column-level links in a job: only table-level lineage is retained |
| Cross-organization assets | Schema and column details unavailable if you aren't in the asset's organization |

## Notes

- Disabling the Data Lineage API stops new processing charges; previously ingested metadata still incurs metadata storage charges for up to 30 days. Try on a disposable project first.
- Other doc pages with HTTP traces show the Authorization header redacted; the `<REDACTED 1031 BYTES>` placeholder is part of the source trace, not a value to send.
- Corrected from the official docs: the source request trace has `"location": "us",` with a trailing comma, which isn't valid JSON; the comma was removed.
- The source also shows screenshots of the console project selector and BigQuery UI; they are omitted.
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/troubleshooting-lineage (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-data-lineage.md](./about-data-lineage.md)
- [use-lineage.md](./use-lineage.md)
- [open-lineage.md](./open-lineage.md)
