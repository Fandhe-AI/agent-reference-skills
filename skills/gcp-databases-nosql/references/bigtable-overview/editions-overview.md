---
source: https://docs.cloud.google.com/bigtable/docs/editions-overview
---

# Editions overview

Bigtable offers two editions: Enterprise (the standard service for typical production workloads) and Enterprise Plus (sub-millisecond read latency, higher storage density, advanced analytics). Instances created before the launch of editions are classified as Enterprise with no change to features or billing.

## Signature / Usage

### Create or upgrade to Enterprise Plus

Examples from the gcloud reference. Create an instance with edition `ENTERPRISE_PLUS`:

```bash
gcloud bigtable instances create my-enterprise-plus-instance \
    --display-name="Enterprise Plus Instance" \
    --edition=ENTERPRISE_PLUS \
    --cluster-config=id=my-cluster-id,zone=us-east1-c,nodes=1
```

Update the edition of an existing instance to `ENTERPRISE_PLUS`:

```bash
gcloud bigtable instances update my-instance-id \
    --edition=ENTERPRISE_PLUS
```

### Changing the edition

- Upgrade: Enterprise to Enterprise Plus.
- Downgrade: after you deactivate all Enterprise Plus features, Enterprise Plus to Enterprise.
- Changes take effect immediately; after creating or upgrading to Enterprise Plus you can't downgrade for 48 hours.
- To see an instance's edition, see Get instance details: https://docs.cloud.google.com/bigtable/docs/get-instance-information#get-instance

## Options / Props

| Capability | Enterprise | Enterprise Plus |
|------------|------------|-----------------|
| SSD node performance | up to 17,000 reads and 14,000 writes per second, less than 5 ms latency | same, plus in-memory tier (Preview): up to 120,000 reads per second with sub-millisecond read latency; microsecond timestamps |
| Availability | up to 99.999% depending on replication and routing configuration (Bigtable SLA); multi-region replication | included per SLA; multi-region replication |
| Autoscaling / 2x node scaling | yes | yes |
| Tiered storage (Preview) | up to 32 TB per node | up to 64 TB per node |
| In-memory tier vertical scaling (Preview) | no | yes |
| Data Boost | yes | advanced: query with SQL, read data from HDD and tiered storage |
| Continuous materialized views | yes | yes |
| Backup retention | up to 90 days | up to 365 days |
| Automated backups | up to 90 days | up to 90 days; existing backups can be extended up to 365 days |
| Hot backups | yes | yes |
| Committed use discounts | 20% for 1 year, 40% for 3 years | 20% for 1 year, 40% for 3 years |

## Notes

- Enterprise Plus is recommended for multi-tenant workloads needing exceptional performance, scale and global availability, and for in-memory tier, enhanced tiered storage (64 TB), SQL for Data Boost, Data Boost on tiered storage, and hotspot mitigation.
- Both editions use the same billing model for node hours, storage and networking, but Enterprise Plus has its own node SKU.
- Enterprise Plus instances and features aren't available in the free trial.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/instances/create (the editions overview has no code block).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/instances/update
- Source: https://docs.cloud.google.com/bigtable/docs/editions-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [instances-clusters-nodes.md](./instances-clusters-nodes.md)
- [in-memory-overview.md](./in-memory-overview.md)
- [tiered-storage.md](./tiered-storage.md)
- [quotas.md](./quotas.md)
