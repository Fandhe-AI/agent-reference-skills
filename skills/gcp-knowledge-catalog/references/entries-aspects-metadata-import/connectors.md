---
source: https://docs.cloud.google.com/knowledge-catalog/docs/connectors
---

# Metadata connectors and connector jobs

Knowledge Catalog (formerly Dataplex Universal Catalog) connectors import technical, operational, business, and semantic metadata from third-party sources on a schedule or on demand. BigQuery Data Transfer Service manages the transfers and maps the extracted metadata to an entry group that you choose. This page also covers managing connector jobs (view, update, disable / enable, delete, manually trigger), merged from the "Manage connector configurations" page.

## Signature / Usage

### List runs of a connector job from the command line

The source manages connector jobs in the Google Cloud console only (**Manage > Connectors**). Because the jobs are BigQuery Data Transfer Service transfer configurations, the `bq` tool example for listing the runs of a transfer configuration is:

```bash
bq ls --transfer_run=true projects/myProject/locations/us/transferConfigs/12345
```

### Console tasks (summary)

- View jobs: **Manage > Connectors** lists all metadata import jobs in the project; click a display name for details, run history, or configuration.
- Run history and logs: **Run history** tab, then **View details** for a run's logs.
- Update: **Edit** (schedule, destination entry group, notification settings, source objects), then **Save**.
- Disable / enable: **Actions**, then **Disable** or **Enable**.
- Delete: **Actions**, then **Delete**; confirm by typing `delete`.
- Manually trigger (backfill): **Run transfer now**, then **Run one time transfer**.

## Options / Props

### Supported data sources

| Source |
|---|
| Databricks Unity Catalog |
| dbt Core and Cloud |
| MySQL |
| Oracle |
| PostgreSQL |
| Snowflake Horizon |
| SQL Server |

### Partner integrations

AbInitio, Anomalo, Atlan, Collibra, Datahub (these let parallel catalog tools share metadata; see each partner's page).

### Metadata types extracted

| Type | Contents |
|---|---|
| Technical | Schema, data type, and column name definitions |
| Operational | Created and modified timestamps, lineage, usage statistics, data quality results |
| Business | Tags, owners, annotations |
| Semantic | Dimensions, measures, metrics, golden queries, relationships |

### Limits and behavior

| Item | Value |
|---|---|
| Scope of import | Metadata only, not the underlying data (use BigQuery Data Transfer Service for the data) |
| Update mode | Each run is a full overwrite of connector-managed entries in the destination entry group; incremental updates aren't supported. Objects in the entry group not imported by the configuration are unaffected |
| Run history retention | 90 days (older job runs are automatically deleted) |
| Pricing | No additional charges from Knowledge Catalog or BigQuery Data Transfer Service for importing metadata with connectors; standard charges apply for other usage such as metadata storage |

### Required roles for managing jobs

| Task | Roles |
|---|---|
| View jobs and run history | `roles/bigquery.user`, `roles/dataplex.viewer` |
| Edit, delete, or manually trigger jobs | `roles/bigquery.admin`, and `roles/dataplex.admin` or `roles/dataplex.editor` |
| BigQuery Data Transfer Service service agent `service-PROJECT_NUMBER@gcp-sa-bigquerydatatransfer.iam.gserviceaccount.com` | `dataplex.entryGroups.import` permission or `roles/dataplex.entryGroupImporter`, at project or entry group level. Some connectors (such as Databricks Unity and Snowflake Horizon) also need `roles/dataplex.entryOwner` on the project |

## Notes

- Snippet taken from https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference (`bq ls --transfer_run`, bq command-line tool reference). The source twins have no code block.
- You must enable the BigQuery Data Transfer Service before managing connector jobs.
- Disabling a job sets its name to a `disabled` status and schedules no new runs (runs in progress complete); deleting a job schedules no new runs and stops runs in progress. Neither removes metadata already imported into Knowledge Catalog. Try deletion on a disposable job first.
- Connector jobs only support full metadata overwrites for each run, including manual runs.
- Connectors export logs and metrics to Cloud Monitoring and Cloud Logging (dashboards, run performance, error messages). Cloud Logging and Monitoring themselves are in `gcp-observability`.
- To run SQL queries or Spark jobs against remote Databricks or Snowflake catalogs, use a Lakehouse cross-cloud connection instead (BigQuery and Lakehouse are in `gcp-bigquery`); connectors copy that metadata into Google Cloud.
- BigQuery Data Transfer Service is in `gcp-bigquery`.
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/connectors and https://docs.cloud.google.com/knowledge-catalog/docs/manage-connector-jobs (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [managed-connectivity-overview.md](./managed-connectivity-overview.md)
- [import-metadata.md](./import-metadata.md)
