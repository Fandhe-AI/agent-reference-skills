---
source: https://docs.cloud.google.com/memorystore/docs/valkey/scale-instance-capacity
---

# Scale instance capacity

Scale a Memorystore for Valkey instance by changing the shard count (Cluster Mode Enabled only) or the node type.

## Signature / Usage

### Scale the shard count

```bash
gcloud memorystore instances update INSTANCE_ID \
--location=REGION_ID \
--shard-count=SHARD_COUNT
```

```bash
gcloud memorystore instances update my-instance \
--location=us-central1 \
--shard-count=8
```

### Scale the node type

1. Describe the instance and check for an `engineConfigs` section containing `maxmemory-clients`, `maxmemory` or `maxclients`; if present, scale those values to ones the new node type accepts.

```bash
gcloud memorystore instances describe INSTANCE_ID \
--location=REGION_ID
```

2. Update the node type.

```bash
gcloud memorystore instances update INSTANCE_ID \
--location=REGION_ID \
--node-type=NODE_TYPE
```

```bash
gcloud memorystore instances update my-instance \
--location=us-central1 \
--node-type=highmem-medium
```

Node type change together with an engine config change (`maxclients` to `15,000`):

```bash
gcloud memorystore instances update my-instance \
--location=us-central1 \
--node-type=highmem-medium \
--update-engine-configs=maxclients=15000
```

## Options / Props

| Name | Description |
|------|-------------|
| `INSTANCE_ID` | ID of the instance. |
| `REGION_ID` | Region where the instance is located. |
| `SHARD_COUNT` | Number of shards; determines total memory capacity. |
| `NODE_TYPE` | Target node type. You cannot scale down to `shared-core-nano`. |

## Notes

- Cluster Mode Disabled instances are hosted on a single shard, so the shard count cannot be scaled.
- Caution kept from the source: use `shared-core-nano` only for development or testing (no SLA).
- The source also shows Console steps (Configurations > Shards > Update instance).
- Behavior and failure scenarios are in [about-scaling-instance-capacity.md](./about-scaling-instance-capacity.md).
- Memorystore for Valkey is managed Valkey on Google Cloud, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/scale-instance-capacity (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-scaling-instance-capacity.md](./about-scaling-instance-capacity.md)
- [scale-replica-count.md](./scale-replica-count.md)
