---
source: https://docs.cloud.google.com/spanner/docs/editions-overview
---

# Spanner editions overview

Spanner editions are a tier-based pricing model with different capabilities at different price points: Standard, Enterprise and Enterprise Plus.

## Signature / Usage

### Change an instance's edition

Snippet taken from https://docs.cloud.google.com/spanner/docs/create-manage-instances

```bash
gcloud spanner instances update INSTANCE_ID --edition=EDITION
```

Replace `INSTANCE_ID` with the permanent identifier for the instance and `EDITION` with the new edition (`STANDARD`, `ENTERPRISE` or `ENTERPRISE_PLUS`).

### Monitor edition feature usage

Enterprise and Enterprise Plus feature usage is reported by the Cloud Monitoring metric `instance/edition/feature_usage` (sampled every 60 seconds, visible after up to 120 seconds). In Metrics explorer select **Cloud Spanner Instance > Instance > Feature usage**, set Aggregation to **Unaggregated**, and choose **Table** or **Both**. Ignore the `name` column in favor of `instance_id`, `instance_config`, `database` and `feature`.

Features shown: asymmetric autoscaling, columnar engine, full-text search, geo-partitioning, incremental backups, KNN vector search, managed autoscaler, scheduled backups, Spanner Graph, tiered storage, vector search (ANN functions and vector index).

## Options / Props

| Capability | Standard | Enterprise | Enterprise Plus |
|------------|----------|------------|-----------------|
| Availability SLA | 99.99% | 99.99% | Up to 99.999% |
| Configurations | Regional | Regional, optional custom read-only replicas | Regional, dual-region, multi-region, optional custom read-only replicas |
| Multi-model | Relational (GoogleSQL, PostgreSQL), key-value | Adds Spanner Graph | Adds Spanner Graph |
| Search | none | Full-text search, vector search (KNN, ANN) | Full-text search, vector search (KNN, ANN) |
| Resource management | Open source Autoscaler | Adds managed autoscaler, asymmetric read-only autoscaling, locality groups, tiered storage | Adds geo-partitioning |
| Analytics | BigQuery federation, Data Boost, reverse ETL (BigQuery to Spanner) | Adds columnar engine | Adds columnar engine |
| Data protection | Standard backups, 7-day PITR, scheduled backups | Adds incremental backups | Adds incremental backups |
| CUDs | 20% for 1 year, 40% for 3 years | same | same |

### Downgrade prerequisites

| Feature in use | To stop using it |
|----------------|------------------|
| Custom read-only replicas | Move the instance to a regional configuration, or delete the instance |
| Spanner Graph | Delete all property graph schemas |
| Full-text search | Delete all search indexes |
| Vector search | Stop using KNN and ANN distance functions; delete all vector indexes |
| Managed autoscaler | Switch to manual scaling |
| Dual-region / multi-region (Enterprise Plus) | Move to a regional configuration, or delete the instance |
| Geo-partitioning (Enterprise Plus) | Delete all partitions |

## Notes

- Standard includes everything GA before September 24, 2024 plus selected additions (reverse ETL from BigQuery, scheduled backups) in regional configurations. Enterprise adds multi-model capabilities, managed autoscaling and incremental backups. Enterprise Plus targets 99.999% availability with multi-region and geo-partitioning.
- Graph, full-text search and vector search are outside this skill's scope; see the official pages.
- Legacy instances were auto-upgraded to the lowest matching edition: regional to Standard; regional with extra read-only replicas or Enterprise features to Enterprise; multi-region or Enterprise Plus features to Enterprise Plus. Customers on commitments with legacy SKUs need no action until contract expiry.
- Upgrade and downgrade take about 10 minutes with zero downtime and no data migration. A free trial instance defaults to Enterprise when upgraded to paid; it can then move to Enterprise Plus, or support can downgrade it to Standard.
- Granular instances are supported in all editions: minimum capacity is 100 processing units or one node (1000 processing units).
- An organization policy constraint can prevent specific editions from being created.
- Downgrade prerequisites that delete resources: the editions page doesn't say what each deletion loses. Deleting an instance is not reversible and drops all of its databases (an instance with backups can't be deleted), per https://docs.cloud.google.com/spanner/docs/getting-started/gcloud and https://docs.cloud.google.com/spanner/docs/backup; moving to a regional configuration keeps the instance and its databases. For "Delete all partitions", the editions page doesn't describe what happens to data placed in those partitions; check https://docs.cloud.google.com/spanner/docs/create-manage-partitions#delete-partition first. Not from the source: deleting search indexes, vector indexes or property graph schemas removes those schema objects (table rows are kept); staying on the current edition avoids every deletion. Try a downgrade on a disposable instance first.
- Edition values per `gcloud spanner instances update --help`: `STANDARD`, `ENTERPRISE`, `ENTERPRISE_PLUS`; a downgrade fails unless you first stop using the higher-tier features (see Downgrade prerequisites).
- Source: https://docs.cloud.google.com/spanner/docs/editions-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/spanner/docs/create-manage-instances (borrowed command; retrieved 2026-11-16)

## Related

- [instances.md](./instances.md)
- [instance-configurations.md](./instance-configurations.md)
- [autoscaling-overview.md](./autoscaling-overview.md)
