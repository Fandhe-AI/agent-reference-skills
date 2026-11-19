# Partitioning and clustering

| Name | Description | Path |
|------|-------------|------|
| Introduction to partitioned tables | Partition types, decorators, limitations, partition-modification quota error | [partitioned-tables.md](./partitioned-tables.md) |
| Create partitioned tables | `PARTITION BY`, `bq mk`, query-result tables, `bq partition` for date-sharded tables | [creating-partitioned-tables.md](./creating-partitioned-tables.md) |
| Query partitioned tables | Partition pruning, `_PARTITIONTIME` / `_PARTITIONDATE`, require partition filter, best practices | [querying-partitioned-tables.md](./querying-partitioned-tables.md) |
| Manage partitioned tables | `INFORMATION_SCHEMA.PARTITIONS`, partition expiration, filter requirement, copy and delete partitions | [managing-partitioned-tables.md](./managing-partitioned-tables.md) |
| Introduction to clustered tables | Cluster column types, ordering, block pruning, reclustering, limits | [clustered-tables.md](./clustered-tables.md) |
| Query clustered tables | Permissions and filter best practices for block pruning | [querying-clustered-tables.md](./querying-clustered-tables.md) |
