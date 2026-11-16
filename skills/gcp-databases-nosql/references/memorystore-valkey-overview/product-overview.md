---
source: https://docs.cloud.google.com/memorystore/docs/valkey/product-overview
---

# Memorystore for Valkey overview

Memorystore for Valkey is a fully managed Valkey service for Google Cloud. It supports both Cluster Mode Enabled and Cluster Mode Disabled instances, so applications on Google Cloud can use a scalable, available, secure Valkey service without managing Valkey deployments.

## Signature / Usage

### Key concepts

- **Cluster mode**: a Cluster Mode Enabled instance can have one or more shards; a Cluster Mode Disabled instance runs on a single shard.
- **Hierarchy**: an instance is a set of shards, each holding a subset of the key space. Each shard has one primary node and optionally up to five replica nodes. With replicas, Memorystore distributes the nodes of a shard across zones automatically for higher availability and throughput.
- **Sizing**: you must provision enough shards to serve the keyspace of the whole application; all shards are equally sized.
- **Primary and replica nodes**: one primary node per shard, 0-5 replica nodes per shard, distributed evenly across zones. Replicas provide high availability and additional read throughput.
- **Versions**: Valkey 7.2, 8.0, 9.0 and 9.1. Only a subset of the Valkey command library is supported.

### Instance endpoints

- **Cluster Mode Enabled**: each instance has a discovery endpoint to which the client connects; the client also uses it for node discovery.
- **Cluster Mode Disabled**: each instance has a primary endpoint (always directs traffic to the primary node) and a reader endpoint (load-balances read queries across available replicas).

### Example instance creation

Snippet taken from https://docs.cloud.google.com/memorystore/docs/valkey/create-instances

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

## Notes

- Networking must be set up for the project before an instance can be created (see the Networking page: https://docs.cloud.google.com/memorystore/docs/valkey/networking).
- Pricing: https://cloud.google.com/memorystore/valkey/pricing
- Memorystore for Valkey is managed Valkey / Redis / Memcached on Google Cloud, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/product-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [cluster-mode-enabled-and-disabled.md](./cluster-mode-enabled-and-disabled.md)
- [instance-node-specification.md](./instance-node-specification.md)
- [supported-versions.md](./supported-versions.md)
- [create-instances.md](./create-instances.md)
