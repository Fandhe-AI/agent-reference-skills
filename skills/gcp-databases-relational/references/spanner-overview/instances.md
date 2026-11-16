---
source: https://docs.cloud.google.com/spanner/docs/instances
---

# Instances overview

A Spanner instance is an allocation of resources used by the Spanner databases created in it. Creating one means choosing an edition, an instance configuration (geographic placement and replication) and compute capacity.

## Signature / Usage

### Create and inspect an instance

Snippet taken from https://docs.cloud.google.com/spanner/docs/getting-started/gcloud

```bash
gcloud spanner instance-configs list
```

```bash
gcloud spanner instances create test-instance --config=regional-us-central1 \
    --description="My Instance" --nodes=1
```

### What you choose at creation time

- The edition: Spanner's tier-based pricing model with different capabilities at different price points.
- The instance configuration: defines the geographic placement and replication topology.
- The compute capacity: the amount of server and storage resources available to the databases in the instance.

## Options / Props

| Choice | Values |
|--------|--------|
| Instance configuration type | Regional (one Google Cloud region), dual-region (two regions in a single country; Enterprise Plus edition), multi-region (more than two regions; Enterprise Plus edition) |
| Compute capacity unit | Processing units or nodes; 1000 processing units = 1 node. Below 1000 processing units you must use processing units |

## Notes

- After creation you can list, edit or delete an instance. Spanner is fully managed (monitors and restarts processes with zero downtime), so it offers no way to stop or restart an instance.
- A 90-day free trial instance is available at no cost for 90 days.
- Spanner is Google Cloud's distributed relational database, not a PostgreSQL server even with the PostgreSQL interface; distinct from `supabase` and `drizzle`.
- This page is conceptual and has no code; creation walkthroughs live on the "Create and manage instances" page (not part of this category).
- Deleting an instance is not reversible and drops all of its databases; an instance that still has backups can't be deleted (restore and export what you need first). Try it on a disposable resource first. Per https://docs.cloud.google.com/spanner/docs/getting-started/gcloud and https://docs.cloud.google.com/spanner/docs/backup.
- Source: https://docs.cloud.google.com/spanner/docs/instances (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/spanner/docs/getting-started/gcloud (borrowed commands)
- Source: https://docs.cloud.google.com/spanner/docs/instance-configurations (Enterprise Plus requirement for dual-region and multi-region; retrieved 2026-11-16; CC BY 4.0)

## Related

- [instance-configurations.md](./instance-configurations.md)
- [compute-capacity.md](./compute-capacity.md)
- [editions-overview.md](./editions-overview.md)
- [databases.md](./databases.md)
