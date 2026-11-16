---
source: https://docs.cloud.google.com/sql/docs/availability
---

# Cloud SQL availability

Describes operations and events that affect Cloud SQL availability. Enterprise Plus edition offers a 99.99% uptime SLA and near-zero downtime for several planned operations.

## Signature / Usage

Near-zero downtime for planned operations applies to Enterprise Plus primaries. Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/create-instance (create an Enterprise Plus instance):

```bash
    gcloud sql instances create INSTANCE_NAME \
    --database-version=DATABASE_VERSION \
    --region=REGION \
    --tier=TIER \
    --edition=ENTERPRISE_PLUS
```

Data cache can be enabled or disabled with near-zero downtime; on creation, the gcloud flag `--no-enable-data-cache` disables it (per https://docs.cloud.google.com/sql/docs/postgres/machine-series-overview).

## Options / Props

### Unplanned events and zonal outage

| Configuration | Behavior |
|---------------|----------|
| Regional availability (high availability, HA) | On failure Cloud SQL brings the instance up in the secondary zone with the same IP address and no data loss. Available in Enterprise Plus and Enterprise editions |
| Zonal availability (standalone, default without HA) | Recovered automatically from VM host failures only; not recovered automatically from a zonal outage |

Manual recovery of a standalone instance after a zonal outage: point-in-time recovery, or promote a read replica to become the standalone instance.

### Planned operations with near-zero downtime (Enterprise Plus primary, standalone or HA)

| Operation | Detail |
|-----------|--------|
| Maintenance (sub-second) | Automatic quarterly maintenance; self-service maintenance at any time; maintenance simulation |
| Minor version upgrade | MySQL 8.0: upgrade with sub-second downtime; PostgreSQL: part of automatic maintenance, sub-second |
| Edition upgrade | In-place upgrade to Enterprise Plus |
| Data cache | Enable or disable as frequently as needed |
| Scale up | Increase vCPU/memory as frequently as needed |
| Scale down | Reduce vCPU/memory infrequently |

## Notes

- If you scale down more than once during a three-hour period, only the first scale-down gets near-zero downtime; later ones have regular downtime.
- Failover and promote-replica operations are disruptive; test them on a disposable instance first.
- Source: https://docs.cloud.google.com/sql/docs/availability (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/create-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/machine-series-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [editions-intro.md](./editions-intro.md)
- [operational-guidelines.md](./operational-guidelines.md)
- [best-practices.md](./best-practices.md)
