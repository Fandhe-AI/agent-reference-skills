---
source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/create-cluster
---

# Create a Managed Service for Apache Kafka Cluster

A cluster stores and processes streams of messages organized into topics. Create it with the console, gcloud, a client library or the Managed Kafka API (not the open source Apache Kafka API). Creation usually takes 20-30 minutes and runs as a long-running operation.

## Signature / Usage

### gcloud

Required role: Managed Kafka Cluster Editor (`roles/managedkafka.clusterEditor`), which contains `managedkafka.clusters.create`.

Adapted (not in the official docs): removed `--public-cluster` and `--allowed-source-ip-ranges=ALLOWED_SOURCE_IP_RANGES` (both optional in the source) so the example creates a private cluster by default.

```bash
gcloud managed-kafka clusters create CLUSTER_ID \
    --location=LOCATION \
    --cpu=CPU_COUNT \
    --memory=MEMORY \
    --subnets=projects/PROJECT_ID/regions/LOCATION/subnetworks/SUBNET_ID \
    --auto-rebalance \
    --encryption-key=ENCRYPTION_KEY \
    --async \
    --labels=LABELS
```

Example response (store `OPERATION_ID` to track progress):

```text
done: false
metadata:
  '@type': type.googleapis.com/google.cloud.managedkafka.v1.OperationMetadata
  apiVersion: v1
  createTime: 'CREATE_TIME'
  requestedCancellation: false
  target: projects/PROJECT_ID/locations/LOCATION/clusters/CLUSTER_ID
  verb: create
name: projects/PROJECT_ID/locations/LOCATION/operations/OPERATION_ID
```

### Monitor the operation (gcloud-created clusters)

```bash
gcloud managed-kafka operations describe OPERATION_ID \
    --location=LOCATION
```

### REST

`MEMORY` is in bytes (example `3221225472`); `CPU_COUNT` and `MEMORY` are numeric placeholders.

```text
POST https://managedkafka.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/clusters?clusterId=CLUSTER_ID
```

```text
{
  "capacityConfig": {
    "vcpuCount": CPU_COUNT,
    "memoryBytes": MEMORY
  },
  "gcpConfig": {
    "accessConfig": {
      "networkConfigs": [
        {
          "subnet": "projects/PROJECT_ID/regions/LOCATION/subnetworks/SUBNET_ID"
        }
      ]
    }
  }
}
```

Save the body as `request.json`, then:

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://managedkafka.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/clusters?clusterId=CLUSTER_ID"
```

### Python

Adapted (not in the official docs): added `raise` so a failed call is not reported as success (the source only prints the error).

```python
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import managedkafka_v1

# TODO(developer)
# project_id = "my-project-id"
# region = "us-central1"
# cluster_id = "my-cluster"
# subnet = "projects/my-project-id/regions/us-central1/subnetworks/default"
# cpu = 3
# memory_bytes = 3221225472

client = managedkafka_v1.ManagedKafkaClient()

cluster = managedkafka_v1.Cluster()
cluster.name = client.cluster_path(project_id, region, cluster_id)
cluster.capacity_config.vcpu_count = cpu
cluster.capacity_config.memory_bytes = memory_bytes
cluster.gcp_config.access_config.network_configs = [
    managedkafka_v1.NetworkConfig(subnet=subnet)
]
cluster.rebalance_config.mode = (
    managedkafka_v1.RebalanceConfig.Mode.AUTO_REBALANCE_ON_SCALE_UP
)

request = managedkafka_v1.CreateClusterRequest(
    parent=client.common_location_path(project_id, region),
    cluster_id=cluster_id,
    cluster=cluster,
)

try:
    operation = client.create_cluster(request=request)
    print(f"Waiting for operation {operation.operation.name} to complete...")
    # The duration of this operation can vary considerably, typically taking 10-40 minutes.
    # We can set a timeout of 3000s (50 minutes).
    response = operation.result(timeout=3000)
    print("Created cluster:", response)
except GoogleAPICallError as e:
    print(f"The operation failed with error: {e.message}")
    raise
```

## Options / Props

### Cluster properties

| Property | Rule |
|----------|------|
| Cluster name | Immutable. See "Guidelines to name a Managed Service for Apache Kafka resource". |
| Location | Must be a supported Google Cloud region; cannot be changed later. |
| vCPUs | At least 3 per cluster (`--cpu`). |
| Memory | Between 1 GiB and 8 GiB per vCPU (`--memory`). Example: 6 vCPUs allow a minimum of 6 GiB and a maximum of 48 GiB. |
| Custom local storage | Optional: disk capacity per broker (gcloud `--broker-disk`, minimum 100 GiB). Once enabled and saved it cannot be disabled for the cluster. Default disk capacity is provisioned otherwise. |
| Subnets | Minimum 1, maximum 10; exactly 1 subnet per network; each subnet in the same region as the cluster (project and network can differ). A subnet from a different project requires the Managed Kafka Service Agent role for the cluster's service agent. Subnets can be updated after creation. |
| Public cluster | Optional (`--public-cluster`) with allowed source IP ranges (see below). |
| Labels | Key-value pairs; gcloud keys start with a lowercase character; keys and values contain only hyphens, underscores, lowercase characters and numbers. |
| Rebalancing | `--auto-rebalance` (enabled by default; mode `AUTO_REBALANCE_ON_SCALE_UP`) rebalances replicas when you scale up and might temporarily affect performance; `--no-auto-rebalance` (no rebalance) never rebalances automatically. |
| Encryption | Google-owned and Google-managed keys (default) or CMEK (`--encryption-key`, key ring in the same location as the cluster). The encryption type is immutable; the key cannot be changed once set. CMEK adds Cloud KMS costs. |
| mTLS | Optional: 1 to 10 Certificate Authority Service CA pools (`--mtls-ca-pools`, in format `projects/PROJECT_ID/locations/LOCATION/caPools/CA_POOL`); optional but recommended `ssl.principal.mapping.rules` (`--ssl-principal-mapping-rules`; changing it triggers a rolling restart of the brokers). |

### Public cluster allowed source IP ranges

| Rule |
|------|
| IPv4 CIDR notation only (for example `203.0.113.0/24`, `198.51.100.5/32`); IPv6 is not supported. |
| Each CIDR size between `/16` and `/32`. |
| Ranges must not overlap. |
| Ranges must be publicly routable; private ranges such as `10.0.0.0/8` (RFC 1918) are rejected. |
| Maximum 500 allowed source IP ranges. |

## Notes

- Adapted from the official docs: the source's gcloud example ends with `--public-cluster \` and `--allowed-source-ip-ranges=ALLOWED_SOURCE_IP_RANGES`; both are removed here. Add them only for a public cluster (internet-reachable for the listed ranges). Source caution: allow access from only trusted external IP ranges; don't expose your cluster to untrusted ranges.
- `managedkafka.clusters.create` indirectly lets a principal attach any subnet that the Managed Kafka service agent has permission to use (`roles/managedkafka.serviceAgent`), even without direct permission on the subnet.
- Corrected from the official docs: the Python sample's `except GoogleAPICallError as e:` only printed `The operation failed with error: ...`; `raise` was added.
- The REST body is shown as `text` because `CPU_COUNT` and `MEMORY` are unquoted numeric placeholders.
- The source says creation usually takes 20-30 minutes; its client-library samples say 10-40 minutes.
- gcloud 593.0.0 (GA track) has all flags used above, plus `--no-auto-rebalance`, `--broker-disk`, `--mtls-ca-pools` and `--ssl-principal-mapping-rules`.
- Deleting a cluster (not covered by this page) destroys its topics and messages; try lifecycle operations on a disposable project first.
- The source also shows Console, Windows PowerShell and cmd.exe variants, Terraform, Go and Java.
- Source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/create-cluster (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [plan-cluster-size.md](./plan-cluster-size.md)
- [networking-kafka.md](./networking-kafka.md)
- [create-topic.md](./create-topic.md)
