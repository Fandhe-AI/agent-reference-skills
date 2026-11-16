---
source: https://docs.cloud.google.com/memorystore/docs/valkey/configure-instances
---

# Configure instances

View, set, update and reset the Valkey configuration parameters of a Memorystore for Valkey instance with `--engine-configs`, `--update-engine-configs`, `--remove-engine-configs` and `--clear-engine-configs`. Changes need no restart, do not interrupt service, are saved immediately and survive restarts.

## Signature / Usage

Update the gcloud CLI first with `gcloud components update`.

### View configuration parameters

```bash
gcloud memorystore instances describe INSTANCE_ID --location=REGION_ID
```

Parameters left at their defaults do not appear in the output.

### Set a parameter at creation

```bash
gcloud memorystore instances create INSTANCE_ID \
--location=REGION_ID \
--project=PROJECT_ID \
--node-type=NODE_TYPE \
--mode=MODE \
--shard-count=SHARD_COUNT \
--engine-configs=CONFIG_NAME=CONFIG_VALUE
```

Cluster Mode Enabled example:

```bash
gcloud memorystore instances create my-instance --location=us-east1 --project=my-project --node-type=highmem-medium --shard-count=3 --engine-configs=maxmemory-policy=allkeys-lru
```

Cluster Mode Disabled example:

```bash
gcloud memorystore instances create my-instance --location=us-east1 --project=my-project --node-type=highmem-medium --mode=cluster-disabled --shard-count=1 --engine-configs=maxmemory-policy=allkeys-lru
```

### Update a parameter

```bash
gcloud memorystore instances update INSTANCE_ID \
--location=REGION_ID \
--project=PROJECT_ID \
--update-engine-configs=CONFIG_NAME=CONFIG_VALUE
```

```bash
gcloud memorystore instances update my-instance --location=us-east1 --project=my-project --update-engine-configs=maxmemory-policy=allkeys-lru
```

### Reset a parameter to its default

```bash
gcloud memorystore instances update INSTANCE_ID \
--location=REGION_ID \
--project=PROJECT_ID \
--remove-engine-configs=CONFIG_NAME
```

### Reset all parameters to their defaults

```bash
gcloud memorystore instances update INSTANCE_ID \
--location=REGION_ID \
--project=PROJECT_ID \
--clear-engine-configs
```

## Options / Props

| Flag | Description |
|---|---|
| `--engine-configs=NAME=VALUE` | Set parameters on `create`. |
| `--update-engine-configs=NAME=VALUE` | Update parameters on an existing instance. |
| `--remove-engine-configs=NAME` | Reset one parameter to its default. |
| `--clear-engine-configs` | Reset all parameters to their defaults. |
| `--mode` | Omitted means Cluster Mode Enabled; Cluster Mode Disabled supports only one shard. |

## Notes

- Memorystore supports a subset of the Valkey configuration parameters; see the supported-instance-configurations page for modifiable parameters and values.
- `--clear-engine-configs` resets every parameter and can change eviction and client behavior; try it on a disposable instance first. `shared-core-nano` has no SLA and is for development or testing only.
- The source also shows `--remove-engine-configs` and `--clear-engine-configs` examples (for example `gcloud memorystore instances update my-instance --location=us-east1 --project=my-project --clear-engine-configs`).
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/configure-instances (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [supported-instance-configurations.md](./supported-instance-configurations.md)
- [create-instances.md](./create-instances.md)
- [instance-node-specification.md](./instance-node-specification.md)
