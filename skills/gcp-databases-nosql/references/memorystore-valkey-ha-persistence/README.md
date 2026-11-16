# Memorystore for Valkey: HA, persistence, backups, replication, scaling

| Name | Description | Path |
|------|-------------|------|
| High availability and replicas | Regional HA, 0-5 replicas per shard, failover, zone outage impact | [ha-and-replicas.md](./ha-and-replicas.md) |
| Scale the replica count | Change replicas per shard with `--replica-count` | [scale-replica-count.md](./scale-replica-count.md) |
| Persistence overview | AOF vs RDB, choosing a persistence type | [persistence-overview.md](./persistence-overview.md) |
| About RDB persistence | Snapshot intervals, scheduling, recovery behavior | [about-rdb-persistence.md](./about-rdb-persistence.md) |
| About AOF persistence | Append-only file and fsync settings | [about-aof-persistence.md](./about-aof-persistence.md) |
| Manage persistence | gcloud commands to enable, adjust, pause and disable persistence | [manage-persistence.md](./manage-persistence.md) |
| Backups | Backup collections, automated and on-demand backups, costs | [backups.md](./backups.md) |
| Manage backups | Create, schedule, list, export, delete and restore backups | [manage-backups.md](./manage-backups.md) |
| About cross-region replication | Primary and secondary instances, settings sync, switchover practices | [about-cross-region-replication.md](./about-cross-region-replication.md) |
| Work with cross-region replication | Create secondary, switchover, detach, delete | [create-manage-cross-region-replication.md](./create-manage-cross-region-replication.md) |
| About scaling instance capacity | Scaling behavior and failure scenarios | [about-scaling-instance-capacity.md](./about-scaling-instance-capacity.md) |
| Scale instance capacity | Scale shard count and node type | [scale-instance-capacity.md](./scale-instance-capacity.md) |
