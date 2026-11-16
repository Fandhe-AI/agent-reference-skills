---
source: https://docs.cloud.google.com/memorystore/docs/valkey/cluster-mode-enabled-and-disabled
---

# Enable and disable Cluster Mode

Memorystore for Valkey offers two modes: Cluster Mode Enabled (OSS Valkey cluster specification, data partitioned across shards) and Cluster Mode Disabled (a single, unpartitioned shard). The mode can only be chosen when the instance is created.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/memorystore/docs/valkey/create-instances

### Cluster Mode Enabled

```bash
gcloud memorystore instances create my-instance \
--location=us-central1 \
--endpoints='[{"connections": [{"pscAutoConnection": {"network": "projects/my-project/global/networks/default", "projectId": "my-project"}}]}]' \
--replica-count=2 \
--node-type=highmem-medium \
--shard-count=8 \
--acl-policy=my-acl-policy \
--mode=cluster
```

### Cluster Mode Disabled

```bash
gcloud memorystore instances create my-instance \
--location=us-central1 \
--endpoints='[{"connections": [{"pscAutoConnection": {"network": "projects/my-project/global/networks/default", "projectId": "my-project"}}]}]' \
--shard-count=1 \
--replica-count=2 \
--node-type=highmem-medium \
--acl-policy=my-acl-policy \
--mode=cluster-disabled
```

## Options / Props

| Feature | Cluster Mode Enabled | Cluster Mode Disabled |
|---|---|---|
| Horizontal scaling | 1 to 250 shards | Not supported (single shard only) |
| Client support | Need a cluster-aware client to use the discovery endpoint | Use any Valkey or Redis client |
| Multi-key commands | Supported only in a single keyslot | Supported across all keys within a database |
| Maximum writable capacity | 14,500 GB | 58 GB |
| Maximum databases per instance | 1 | 16 (configurable up to 100 databases) |

Applies to both modes:

- You can increase or decrease the size of the instance only when you create it (verbatim from the source; see Source inconsistency below).
- You can have a maximum of five read replicas for the instance.

### Which should I choose

- **Read and write throughput**: if write throughput is fulfilled by a single node and read throughput by a maximum of two replicas, use Cluster Mode Disabled; otherwise use Cluster Mode Enabled to spread the load.
- **Migrate from Memorystore for Redis**: migrating from a Memorystore for Redis or self-managed Redis instance to Cluster Mode Disabled needs minimal changes; Cluster Mode Enabled requires a cluster-aware client.
- **Authentication**: Memorystore for Valkey supports IAM authentication, which is more secure than the plain-text authentication of Memorystore for Redis.
- **Multi-key queries**: Cluster Mode Disabled supports multi-key operations (for example MGET, MSET, EVAL) across keys in the database; Cluster Mode Enabled limits them to a single hash slot.
- **Namespacing**: Cluster Mode Disabled can use multiple databases via `SELECT`. Multiple databases are not supported by Cluster Mode Enabled. Best practice: use multiple instances instead of multiple databases for QoS, since databases on the same node give logical isolation only.

## Notes

- The `server_mode` field in the output of the `INFO` command specifies the mode of the instance.
- After creation you cannot change the instance to the other mode. Google recommends Cluster Mode Enabled because of better horizontal scaling.
- Source inconsistency: this page says size can be changed "only when you create it", while the node specification page describes scaling shards and node type after creation. The source text is kept verbatim.
- The source also shows no Console or Terraform content; the gcloud examples are borrowed from the create-instances page.
- Source inconsistency: the quotas page says "Databases per instance: 1"; the cluster-mode page gives 1 for Cluster Mode Enabled and 16 (configurable up to 100) for Cluster Mode Disabled; and the supported-configurations page describes `cluster-databases` for Cluster Mode Enabled instances (version 9.0 and later) with default 1 and up to 100. Kept as written on each page; check the value for your mode and engine version.
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/cluster-mode-enabled-and-disabled (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [instance-node-specification.md](./instance-node-specification.md)
- [create-instances.md](./create-instances.md)
- [client-library-code-samples.md](./client-library-code-samples.md)
