---
source: https://docs.cloud.google.com/memorystore/docs/valkey/scale-replica-count
---

# Scale the replica count

Change the number of replicas per shard for a Memorystore for Valkey instance with the console or `gcloud memorystore instances update`.

## Signature / Usage

### Update the number of replicas

```bash
gcloud memorystore instances update INSTANCE_ID \
  --location=REGION_ID \
  --replica-count=REPLICA_COUNT
```

## Options / Props

| Name | Description |
|------|-------------|
| `INSTANCE_ID` | ID of the instance. |
| `REGION_ID` | Region where the instance is located. |
| `REPLICA_COUNT` | Replicas per shard. Acceptable values are `0`-`5`. |

## Notes

- In the console, use Configurations > Replicas per shard > Edit replica count and select 0-5 replicas per shard.
- With cross-region replication, replica count is a local setting per instance and does not propagate to other instances (see [about-cross-region-replication.md](./about-cross-region-replication.md)).
- Adding a replica requires an RDB snapshot; see [ha-and-replicas.md](./ha-and-replicas.md) for the 80% memory rule.
- Memorystore for Valkey is managed Valkey on Google Cloud, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/scale-replica-count (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [ha-and-replicas.md](./ha-and-replicas.md)
- [scale-instance-capacity.md](./scale-instance-capacity.md)
