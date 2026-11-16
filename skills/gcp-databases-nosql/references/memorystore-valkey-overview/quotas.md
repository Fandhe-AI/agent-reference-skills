---
source: https://docs.cloud.google.com/memorystore/docs/valkey/quotas
---

# Quotas and limits

Resource capacity limits and per-minute API request quotas for Memorystore for Valkey.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/memorystore/docs/valkey/configure-instances (a `describe` call is one of the counted API operations)

```bash
gcloud memorystore instances describe INSTANCE_ID --location=REGION_ID
```

Monitor client connections with the metric `/instance/node/clients/connected_clients` to stay below the max clients limit.

## Options / Props

### Instance limits

| Limit | Value |
|---|---|
| Databases per instance | 1 |
| Usage units per instance | 250 |

### Max clients (per node)

| Node type | Default client connections | Maximum client connections |
|---|---|---|
| shared-core-nano | 5,000 | 5,000 |
| custom-pico | 16,000 | 32,000 |
| custom-micro | 16,000 | 32,000 |
| custom-mini | 16,000 | 32,000 |
| standard-small | 16,000 | 32,000 |
| highmem-medium | 32,000 | 64,000 |
| highcpu-medium | 32,000 | 64,000 |
| standard-large | 32,000 | 64,000 |
| highmem-xlarge | 64,000 | 64,000 |
| highmem-2xlarge | 64,000 | 64,000 |

### Instance usage units

Instance usage units = (shard_count) * (1 + replica_count). The regional quota limits total usage units across all instances in a region. Example: three instances with 3 shards and 1 replica each in `us-central1` consume 18 units.

### Per-minute API request quotas (subject to change)

| API Requests Quota | Value |
|---|---|
| Create or delete Valkey instance requests per project per minute | 10 |
| Valkey instance requests per project per minute | 60 |

- Create/delete requests: `gcloud memorystore instances create` and `gcloud memorystore instances delete`.
- API operations: get (`describe`), list (`list`), create, delete and update.

## Notes

- You cannot request a quota increase for Memorystore for Valkey API operations (create, update, delete). There is no limit on the number of Valkey commands such as `SET`, `GET`, `DEL`.
- The quota applies to memorystore.googleapis.com requests, not OSS Valkey protocol commands, per Google Cloud console project across all applications and IP addresses. Follow the exponential backoff recommendations on errors.
- Corrected from the official docs: the source prose lists update operations as `gcloud rmemorystore instances update` (a typo for `gcloud memorystore instances update`); the API operations above refer to that command.
- Source inconsistency: "Databases per instance: 1" here conflicts with the Cluster Mode Disabled limit of 16 (up to 100) on the cluster-mode and configuration pages; both values are kept as written.
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/quotas (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [instance-node-specification.md](./instance-node-specification.md)
- [exponential-backoff.md](./exponential-backoff.md)
- [supported-instance-configurations.md](./supported-instance-configurations.md)
