---
source: https://docs.cloud.google.com/memorystore/docs/valkey/supported-monitoring-metrics
---

# Supported monitoring metrics

Cloud Monitoring metrics for Memorystore for Valkey: instance-level, node-level, backup, Bloom filter / JSON, customer-managed CA, cross-region replication and RDB / AOF persistence metrics, plus how to read average / maximum / total variants to find hotspots.

## Signature / Usage

### Interpret average and maximum metrics (hotspot example)

Many metrics come as *average*, *maximum* and *total* variants. Compare average and maximum to find hotspots; the *total* value is independent. The larger the gap, the stronger the hotspot. Example from the source for `average_keyspace_hits` and `maximum_keyspace_hits` on a six-shard instance:

```text
Shard 1 -- 2 hits
Shard 2 -- 2 hits
Shard 3 -- 2 hits
Shard 4 -- 2 hits
Shard 5 -- 2 hits
Shard 6 -- 8 hits
```

`average_keyspace_hits` returns 3 and `maximum_keyspace_hits` returns 8: shard 6 is a hotspot.

## Options / Props

Names below are shortened: prefix every `instance/...` name with `memorystore.googleapis.com/` (full name for example `memorystore.googleapis.com/instance/memory/maximum_utilization`).

### Instance-level metrics

| Metric (after prefix) | Description |
|---|---|
| `instance/clients/average_connected_clients` | Average active client connections over a period |
| `instance/clients/maximum_connected_clients` | Maximum active connections across all nodes |
| `instance/clients/maximum_connection_duration` | Maximum duration of a client connection on a single node |
| `instance/clients/total_connected_clients` | Current number of active client connections |
| `instance/stats/total_connections_received_count` | Cumulative connections created in the last minute |
| `instance/stats/total_rejected_connections_count` | Connections rejected because `maxclients` is reached |
| `instance/commandstats/total_usec_count` | Total CPU time (microseconds) each command consumes |
| `instance/commandstats/total_calls_count` | Calls per command on a node in one minute |
| `instance/cpu/average_utilization` | Mean CPU utilization (0.0 to 1.0); ideal 40%-70% |
| `instance/cpu/maximum_utilization` | Peak CPU (0.0 to 1.0), only `sys_main_thread` and `user_main_thread` states; keep at most 0.8 seconds for the primary and 0.5 seconds per read replica |
| `instance/stats/average_expired_keys`, `maximum_expired_keys`, `total_expired_keys_count` | Key expiration events across primary nodes |
| `instance/stats/average_evicted_keys`, `maximum_evicted_keys`, `total_evicted_keys_count` | Keys evicted for memory capacity on primary shards |
| `instance/keyspace/total_keys` | Keys stored in the instance |
| `instance/stats/average_keyspace_hits`, `maximum_keyspace_hits`, `total_keyspace_hits_count` | Successful key lookups |
| `instance/stats/average_keyspace_misses`, `maximum_keyspace_misses`, `total_keyspace_misses_count` | Failed key lookups |
| `instance/memory/average_utilization` | Mean memory utilization (0.0 to 1.0) |
| `instance/memory/maximum_utilization` | Maximum memory utilization across nodes (0.0 to 1.0); keep under 100%; under high write load performance might degrade at 65% to 85% |
| `instance/memory/total_used_memory` | Total memory usage in bytes |
| `instance/memory/size` | Total, used and available RAM across all nodes |
| `instance/replication/average_ack_lag`, `maximum_ack_lag` | Replica acknowledgement lag in seconds |
| `instance/replication/average_offset_diff`, `maximum_offset_diff` | Bytes not yet replicated between replicas and primaries |
| `instance/stats/total_net_input_bytes_count`, `total_net_output_bytes_count` | Network bytes in / out of endpoints |
| `instance/migration_status` | Overall status of migration from self-managed Redis / Valkey |

### Node-level metrics (selected)

| Metric (after prefix) | Description |
|---|---|
| `instance/node/clients/connected_clients` | Active connections to a node, excluding replica connections |
| `instance/node/clients/blocked_clients` | Blocked client connections on a node |
| `instance/node/clients/maxclients` | Maximum concurrent connections allowed on a node |
| `instance/node/stats/rejected_connections_count` | Connections rejected at the `maxclients` limit |
| `instance/node/cpu/utilization` | Node CPU utilization (0.0 to 1.0) |
| `instance/node/memory/utilization`, `instance/node/memory/usage` | Node memory utilization (0.0 to 1.0) and usage |
| `instance/node/memory/maxmemory`, `instance/node/memory/maxmemory_policy` | Configured `maxmemory` and eviction policy |
| `instance/node/memory/rss_usage`, `peak_usage`, `dataset_usage` | RSS, peak and dataset memory |
| `instance/node/stats/evicted_keys_count`, `expired_keys_count` | Evicted / expired keys on a node |
| `instance/node/server/healthy`, `instance/node/server/uptime` | Node availability and uptime |
| `instance/node/replication/offset` | Replication offset bytes; check before promoting replicas to avoid data loss |
| `instance/node/replication/sync_full_count`, `sync_partial_ok_count`, `sync_partial_err_count` | Full / partial resync counts |
| `instance/node/commandstats/failed_calls_count`, `rejected_calls_count` | Failed / rejected commands |
| `instance/node/stats/acl_access_denied_auths_count`, `acl_access_denied_commands_count`, `acl_key_denied_commands_count`, `acl_channel_denied_commands_count` | ACL denial counts (details in Data Access audit logs) |
| `instance/node/clients/pubsub_clients`, `watching_clients`; `instance/node/stats/evicted_scripts_count`, `client_query_buffer_limit_disconnections_count`, `client_output_buffer_limit_disconnections_count` | Available only for instances running version 8.0 and later |

### Backup, import, certificate, Bloom filter, JSON, cross-region replication

| Metric (after prefix) | Description |
|---|---|
| `instance/backup/last_backup_start_time`, `last_backup_duration` (ms), `last_backup_size` (bytes) | Last backup operation |
| `instance/backup/last_backup_status` | `1` Success, `0` Failed |
| `instance/import/last_import_start_time`, `last_import_duration` (ms) | Last import operation |
| `instance/security/rotate_tls_cert_count` | Customer-managed CA certificate rotation: `SUCCESS`, `FAILED`, `SKIPPED` |
| `instance/node/bloomfilter/objects_count`, `used_memory` | Bloom filter objects and memory |
| `instance/node/json/documents_count`, `used_memory` | JSON documents and memory |
| `instance/cross_instance_replication/secondary_replication_links` | Shard links to secondaries; expected equal to the primary shard count |
| `instance/cross_instance_replication/secondary_maximum_replication_offset_diff`, `secondary_average_replication_offset_diff` | Replication offset difference primary vs secondary shards |

### Persistence metrics

| Metric (after prefix) | Description |
|---|---|
| `instance/persistence/rdb_saves_count` | RDB snapshots taken; filter `status_code` for `3 - INTERNAL_ERROR` to find failures |
| `instance/persistence/rdb_last_success_ages` | Distribution of snapshot age across nodes |
| `instance/node/persistence/rdb_last_save_age`, `rdb_next_save_time_until`, `rdb_bgsave_in_progress`, `rdb_last_bgsave_status` | RDB node state |
| `instance/persistence/aof_fsync_lags`, `instance/node/persistence/aof_fsync_lag` | Lag until AOF data reaches durable storage; above 1 second with `appendfsync` `everysec` means persistence lags |
| `instance/persistence/aof_rewrite_count`, `instance/node/persistence/aof_rewrites_count` | AOF rewrites; filter `status_code` for `3 - INTERNAL_ERROR` |
| `instance/node/persistence/aof_fsync_errors_count`, `aof_last_write_status`, `aof_last_bgrewrite_status` | AOF health (`TRUE` = success) |
| `instance/node/persistence/auto_restore_count` | Automatic restores from AOF/RDB; filter `status_code` for `2 - INTERNAL_ERROR` |

## Notes

- Only a selection of node-level metrics is listed here; the source also lists fork / copy-on-write (`current_cow_peak`, `current_cow_size`, `rdb_last_cow_size`, `aof_last_cow_size`, `total_fork_count`), Lua / script memory, key expiry cycle, Pub/Sub, client tracking, buffer, errorstats and migration (`migration_status`, `migration_received_bytes_size`, `migration_link_reconnect_count`) metrics. One metric uses a different prefix: `redis.googleapis.com/cluster/node/stats/latest_fork_usec`.
- Persistence use cases: if AOF rewrites correlate with latency, reduce the write rate or increase the shard count; if RDB saves correlate with latency, increase the RDB snapshot interval and scale out.
- Memorystore for Valkey on Google Cloud: managed Valkey, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Source inconsistency: the general best-practices page gives `/instance/cpu/maximum_utilization` targets of 0.5 seconds for the primary with 1 replica and 0.9 seconds with 2 or more replicas (0.5 seconds per replica), while the supported-monitoring-metrics page says to keep it at most 0.8 seconds for the primary and 0.5 seconds per read replica. Kept as written on each page.
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/supported-monitoring-metrics (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [monitor-instances.md](./monitor-instances.md)
- [general-best-practices.md](./general-best-practices.md)
- [troubleshoot-issues.md](./troubleshoot-issues.md)
