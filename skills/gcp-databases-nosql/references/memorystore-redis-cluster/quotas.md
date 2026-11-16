---
source: https://docs.cloud.google.com/memorystore/docs/cluster/quotas
---

# Quotas and limits

Resource capacity limits and per-minute API request quotas for Memorystore for Redis Cluster.

## Signature / Usage

### Cluster usage units

```text
Cluster usage units = (shard_count) * (1 + replica_count)
```

Example from the source: three clusters with 3 shards and 1 replica each in `us-central1` consume 18 units of the regional unit quota.

### API operations counted against the per-minute quotas

```bash
gcloud redis clusters create INSTANCE_ID \
--region=REGION_ID \
--network=NETWORK \
--replica-count=REPLICA_COUNT \
--node-type=NODE_TYPE \
--shard-count=SHARD_COUNT \
--acl-policy=ACL_POLICY_NAME
```

## Options / Props

### Cluster limits

| Limit | Value |
|---|---|
| Databases per cluster | 1 |
| Usage units per cluster | 250 |

### Max clients per node

| Node type | Default client connections | Maximum client connections |
|---|---|---|
| redis-shared-core-nano | 5,000 | 5,000 |
| redis-standard-small | 16,000 | 32,000 |
| redis-highmem-medium | 32,000 | 64,000 |
| redis-highcpu-medium | 32,000 | 64,000 |
| redis-standard-large | 32,000 | 64,000 |
| redis-highmem-xlarge | 64,000 | 64,000 |
| redis-highmem-2xlarge | 64,000 | 64,000 |

### Per-minute API request quotas

| API Requests Quota | Value |
|---|---|
| Create or delete Redis Cluster requests per project per minute | 10 |
| Redis Cluster requests per project per minute | 60 |

## Notes

- Max clients is the maximum number of client connections per node without performance issues; monitor the `/cluster/node/clients/connected_clients` metric. The limit can be adjusted via Configure a cluster (`maxclients`).
- Create or delete requests: `gcloud redis clusters create` and `gcloud redis clusters delete`. Other counted API operations: `gcloud redis clusters describe`, `list`, `create`, `delete`, `update`.
- The `redis-shared-core-nano` node type has no SLA; use it only for development or testing.
- You cannot request a quota increase for Memorystore for Redis Cluster API operations (create, update, delete). There is no limit on the number of Redis commands (SET, GET, DEL).
- The quota is for `redis.googleapis.com` requests, not OSS Redis protocol commands; limits apply per Google Cloud console project, shared across all applications and IP addresses. Quotas are subject to change.
- The regional quota for usage units limits the total units across all clusters in a region.
- `gcloud redis clusters delete` is destructive; try it on a disposable resource first.
- Snippet taken from https://docs.cloud.google.com/memorystore/docs/cluster/create-instances (this page has no gcloud blocks).
- Source: https://docs.cloud.google.com/memorystore/docs/cluster/quotas (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [cluster-node-specification.md](./cluster-node-specification.md)
- [create-instances.md](./create-instances.md)
