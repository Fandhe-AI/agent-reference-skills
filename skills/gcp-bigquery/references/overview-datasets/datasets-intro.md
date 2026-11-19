---
source: https://docs.cloud.google.com/bigquery/docs/datasets-intro
---

# Introduction to datasets

Datasets are top-level containers for tables and views within a project. They also set the storage location, retention (time travel), storage billing model, cross-region replication and disaster recovery, default table properties, and links to external data sources.

## Signature / Usage

### Qualified dataset names

Use `projectname.datasetname` in GoogleSQL and `projectname:datasetname` in the `bq` tool.

Snippet taken from https://docs.cloud.google.com/bigquery/docs/datasets (the `bq mk` example).

```bash
bq --location=US mk -d \
    --default_table_expiration 3600 \
    --description "This is my dataset." \
    mydataset
```

## Options / Props

### Location resolution when none is specified

| Order | Source of the location |
|---|---|
| 1 | Location of the datasets referenced in the request (for example a table in `asia-northeast1` runs the query job there) |
| 2 | Region specified for a connection referenced in the request |
| 3 | Location of a destination table |
| 4 | Default location, if set; otherwise the `US` multi-region |

### Data retention

| Setting | Value |
|---|---|
| Time travel window | Default 7 days, configurable 2 to 7 days |
| Fail-safe period | 7 days, not configurable |

### External datasets (federated datasets)

| Type | Notes |
|---|---|
| Spanner external dataset | Link to a Spanner database |
| AWS Glue federated dataset | Link to AWS Glue |

### Limitations

| Limitation |
|---|
| Dataset location can only be set at creation; it cannot be changed afterwards. |
| All tables referenced in a query must be in datasets in the same location. |
| External datasets don't support table expiration, replicas, time travel, default collation, default rounding mode, or case-insensitive table names. |
| Copying a table requires source and destination datasets in the same location. |
| Dataset names must be unique per project. |
| After changing the storage billing model, wait 14 days before changing it again. |
| A dataset can't be enrolled in physical storage billing if legacy flat-rate slot commitments exist in the same region (does not apply to commitments purchased with a BigQuery edition). |

## Notes

- Choosing `EU` or an EU-based region means Core BigQuery Customer Data resides in the EU, per the Service Specific Terms.
- To move a dataset to another location, use cross-region dataset replication (replicate, then promote the secondary replica), copy datasets to a different location, or recreate the dataset manually.
- Cross-region dataset replication is automatic asynchronous replication between two regions or multi-regions; it provides geo-redundancy, read queries on the secondary replica, and cross-region migration.
- Managed disaster recovery pairs cross-region dataset replication with Enterprise Plus edition failover reservations; it offers hard failover for regional outages and soft failover for synchronized maintenance.
- Storage billing models: logical (uncompressed, default) and physical (compressed). The setting is per dataset; a change takes 24 hours to take effect; time travel and fail-safe storage are charged at active storage rates under physical billing and included in the base rate under logical billing. Prices are on the BigQuery pricing page.
- No charge for creating, updating, or deleting a dataset. Quotas are in the BigQuery quotas page under dataset limits.
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/datasets (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/bigquery/docs/datasets-intro (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Spanner as a federated source is covered by the `gcp-databases-relational` skill.

## Related

- [datasets.md](./datasets.md)
- [time-travel.md](./time-travel.md)
- [storage-overview.md](./storage-overview.md)
- [resource-hierarchy.md](./resource-hierarchy.md)
