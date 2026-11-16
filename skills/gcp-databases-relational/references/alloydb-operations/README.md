# alloydb-operations

| Name | Description | Path |
|------|-------------|------|
| Data backup and recovery overview | Continuous, on-demand, automated and system backups; Standard vs Enhanced tiers; retention and deletion rules | [overview.md](./overview.md) |
| Configure backup plans | Continuous backup window (1-35 days) and automated backup schedule via gcloud | [configure.md](./configure.md) |
| Restore a cluster from a backup | gcloud alloydb clusters restore into a new cluster, cross-project and cross-region | [restore.md](./restore.md) |
| Restore to a point in time | PITR restore into a new cluster and PITR window rules | [restore-pitr.md](./restore-pitr.md) |
| About cross-region replication | Secondary clusters and instances, promotion, cross-region failover, switchover | [about-cross-region-replication.md](./about-cross-region-replication.md) |
| Manual failover | gcloud alloydb instances failover for primary and secondary instances | [instance-primary-secondary-failover.md](./instance-primary-secondary-failover.md) |
| Maintenance overview | Maintenance updates, default timing, windows, self-service maintenance | [maintenance.md](./maintenance.md) |
| View and set maintenance times | Maintenance windows, deny periods, notifications | [maintenance-windows.md](./maintenance-windows.md) |
| Configure database flags | Set and list instance database flags, FORCE_APPLY, maintenance policy for flags that need a restart | [instance-configure-database-flags.md](./instance-configure-database-flags.md) |
| About the columnar engine | Column store, enabling via `google_columnar_engine.enabled`, supported data types, limits | [columnar-engine.md](./columnar-engine.md) |
