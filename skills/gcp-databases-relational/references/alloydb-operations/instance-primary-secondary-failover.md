---
source: https://docs.cloud.google.com/alloydb/docs/instance-primary-secondary-failover
---

# Manually fail over a primary or secondary instance

Manually fail over an AlloyDB for PostgreSQL primary or secondary instance to its standby node within the same region, to test application resilience, rebalance zones, or recover from node-level performance issues.

## Signature / Usage

### Fail over a primary instance

Not applicable to basic instances, which have no standby node.

```bash
gcloud alloydb instances failover INSTANCE_ID \
    --region=REGION_ID \
    --cluster=CLUSTER_ID \
    --project=PROJECT_ID
```

To confirm: note the zones of the primary instance's nodes before (https://docs.cloud.google.com/alloydb/docs/instance-view#zones), note them again after, and confirm the active and standby zones switched.

### Fail over a secondary instance

Use the same command to force a secondary instance to fail over to its standby.

```bash
 gcloud alloydb instances failover SECONDARY_INSTANCE_ID \
 --cluster=SECONDARY_CLUSTER_ID \
 --region=REGION_ID \
 --project=PROJECT_ID
```

## Options / Props

| Argument | Description |
|---|---|
| `INSTANCE_ID` | ID of the primary instance. |
| `SECONDARY_INSTANCE_ID` | ID of the secondary instance to fail over. |
| `CLUSTER_ID` / `SECONDARY_CLUSTER_ID` | Cluster the instance belongs to. |
| `REGION_ID` | Region of the instance, e.g. `us-central1`. |
| `PROJECT_ID` | Project of the cluster. |

Required: project enabled for AlloyDB and one of `roles/alloydb.admin`, `roles/owner`, `roles/editor`.

### Use cases

- Zone rebalancing: swap nodes back to preferred zones after an automatic failover.
- Troubleshooting: fail over if the active node has performance issues that don't trigger automatic failover.
- Controlled maintenance: fail over before a maintenance window to control when the brief connection interruption occurs.

## Notes

- Every primary instance has an active node and a standby node in different zones. Manual failover takes the primary node offline, turns the standby into the new active node, and reactivates the previous active node as the standby. It works even if the active node is healthy.
- HA is configured by default on secondary instances (an active and a standby secondary node in two zones; automatic failover on unavailability).
- Maintenance on an HA primary instance or a basic instance typically causes under a second of downtime. Manual failover is intentional and not meant to simulate hardware or network faults; use fault injection instead (https://docs.cloud.google.com/alloydb/docs/test-high-availability).
- Failover interrupts connections briefly. Try it on a disposable instance first.
- Cross-region failover, which promotes a secondary cluster and recreates the original primary as a secondary, is a different operation: https://docs.cloud.google.com/alloydb/docs/cross-region-replication/work-with-cross-region-replication#promote-secondary-cluster
- The source also shows the Console flow (Instance actions menu > Failover, then enter the instance ID).
- Managed PostgreSQL-compatible database on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those skills cover client code, not the managed service).
- Source: https://docs.cloud.google.com/alloydb/docs/instance-primary-secondary-failover (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-cross-region-replication.md](./about-cross-region-replication.md)
- [maintenance.md](./maintenance.md)
- gcloud alloydb instances failover: https://docs.cloud.google.com/sdk/gcloud/reference/alloydb/instances/failover
