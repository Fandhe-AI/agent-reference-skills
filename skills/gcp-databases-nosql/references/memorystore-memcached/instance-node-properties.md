---
source: https://docs.cloud.google.com/memorystore/docs/memcached/instance-node-properties
---

# Instance and node properties

Lists the settings you can modify for Memorystore for Memcached instances and nodes, the possible values, and the output fields that describe an instance or node.

## Signature / Usage

### View output properties

Adapted (not in the official docs): lower-case placeholders upper-cased.

```bash
gcloud memcache instances describe INSTANCE_ID --region=REGION
```

## Options / Props

### Instance settings

| Setting | Possible values |
|---|---|
| Instance ID | Lowercase letters, numbers, and hyphens. Must start with a letter. Cannot exceed 40 characters. |
| Display name | Optional. Cannot exceed 80 characters. |
| Labels | String key/value pairs. Keys must start with a lowercase character and can contain only hyphens (-), underscores (_), lowercase characters, and numbers. |
| Network association | A network from your project, or a shared VPC network. |
| Number of nodes | 1-20 |
| Cores/vCPUs per node | Minimum 1 or 2 vCPUs depending on the region; maximum 32. Except for a single vCPU (region dependent), vCPUs must be provisioned in even numbers. |
| Memory per node | Minimum 1 GB or (0.9 GB * vCPUs per node), whichever is greater. Maximum 256 GB. Up to 8 GB per vCPU, at least 0.9 GB per vCPU; reaching 256 GB requires 32 vCPUs per node. |
| Region | Region in which the instance is deployed. |
| Zones | Optional. Zone(s) within the region for the node(s). |
| Memcached version | `1.5.16` or `1.6.15`. |

### Minimum vCPU by region

Nodes have a minimum of 2 vCPUs, except in these regions where the minimum is 1 vCPU: `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `australia-southeast1`, `australia-southeast2`, `europe-central2`, `europe-north1`, `europe-west1`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `northamerica-northeast1`, `northamerica-northeast2`, `southamerica-east1`, `us-central1`, `us-east1`, `us-east4`, `us-west1`, `us-west2`, `us-west3`, `us-west4`.

### Instance output properties

| Property | Description |
|---|---|
| `memcacheFullVersion` | Memcached version used in the instance. |
| `state` | `Creating`, `Ready` (ready to be used by clients), or `Deleting`. |
| `zones` | User-designated zones in which nodes are provisioned. |

### Node output properties

| Property | Description |
|---|---|
| `memcacheFullVersion` | Memcached version used by the node. |
| `nodeID` | Auto-generated node ID used to view node-level metrics in Cloud Monitoring. |
| `state` | `Creating`, `Ready`, or `Deleting`. A node under repair by the system is not reflected here. |
| `zone` | Zone where the node is located. |
| `port` | Always `11211` for all nodes. |

## Notes

- Source inconsistency: this page says the instance ID cannot exceed 40 characters, while the gcloud section of create-manage-instances says 1 to 63 characters.
- Adapted from the official docs: the source writes `gcloud memcache instances describe instance-id --region=region`; the placeholders are upper-cased here.
- Source: https://docs.cloud.google.com/memorystore/docs/memcached/instance-node-properties (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-manage-instances.md](./create-manage-instances.md)
- [regions.md](./regions.md)
- [supported-versions.md](./supported-versions.md)
