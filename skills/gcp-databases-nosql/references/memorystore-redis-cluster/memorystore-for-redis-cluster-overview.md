---
source: https://docs.cloud.google.com/memorystore/docs/cluster/memorystore-for-redis-cluster-overview
---

# Memorystore for Redis Cluster overview

Memorystore for Redis Cluster is a fully managed Redis service for Google Cloud. Applications running on Google Cloud can use a highly scalable, available and secure Redis service without managing complex Redis deployments. An instance is a set of shards; each shard has one primary node and optionally up to five replica nodes.

## Signature / Usage

### Create a cluster (entry point)

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

| Concept | Description |
|---|---|
| Instance (cluster) | Container for your data. "Instance" and "cluster" are interchangeable. Provision enough shards to serve the keyspace of the whole application. |
| Shard | Cluster is composed of multiple equally sized shards, each containing a subset of the key space. |
| Primary / replica nodes | One primary node per shard; each shard can have 0-5 replica nodes. Replicas provide high availability and extra read throughput and are distributed evenly across zones. |
| Redis version | Based on open-source Redis 7.x; supports a subset of the Redis command library. |
| Discovery endpoint | Each instance has a discovery endpoint to which the client connects; it is also used for cluster node discovery. |

## Notes

- When replica nodes are added, Memorystore automatically distributes the nodes of a shard across zones.
- Networking must be set up for your project before you can create an instance (see the Networking page).
- Memorystore pages here cover managed Valkey / Redis / Memcached on Google Cloud, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Snippet taken from https://docs.cloud.google.com/memorystore/docs/cluster/create-instances (the overview page has no code).
- Source: https://docs.cloud.google.com/memorystore/docs/cluster/memorystore-for-redis-cluster-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [cluster-node-specification.md](./cluster-node-specification.md)
- [create-instances.md](./create-instances.md)
- [supported-commands.md](./supported-commands.md)
- [quotas.md](./quotas.md)
