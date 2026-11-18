---
source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/connect-cluster/create-connect-cluster
---

# Create a Connect cluster

A Connect cluster provides an environment for connectors that move data from existing Kafka deployments into a Managed Service for Apache Kafka cluster, or from that cluster to another Google Cloud service or another Kafka cluster (another Managed Service for Apache Kafka cluster, or a self-managed or on-premises one). Each Connect cluster is attached to one Managed Service for Apache Kafka cluster, which stores the state of its connectors. Creating a Connect cluster takes 20 to 30 minutes.

## Signature / Usage

### Create with gcloud

Adapted (not in the official docs): the source's `[--flag=...]` optional-argument brackets and the missing `\` after `[--labels=LABELS]` make the command invalid shell; only the required flags are kept here (optional flags are in the table below).

```bash
gcloud managed-kafka connect-clusters create CONNECT_CLUSTER_ID \
    --location=LOCATION \
    --cpu=CPU \
    --memory=MEMORY \
    --primary-subnet=WORKER_SUBNET \
    --kafka-cluster=KAFKA_CLUSTER
```

### Monitor the creation operation

Run this only if you created the cluster with the gcloud CLI. `OPERATION_ID` comes from the "Check operation [...]" line of the create response (for example `operation-1753590328249-63ae19098cc06-64300a0a-06512d02`).

```bash
gcloud managed-kafka operations describe OPERATION_ID \
    --location=LOCATION
```

### Create with Python

Adapted (not in the official docs): added `raise` so a failed call is not reported as success (the source only prints the error).

```python
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import managedkafka_v1
from google.cloud.managedkafka_v1.services.managed_kafka_connect import ManagedKafkaConnectClient
from google.cloud.managedkafka_v1.types import ConnectCluster, CreateConnectClusterRequest, ConnectNetworkConfig

# TODO(developer): Update with your values.
# project_id = "my-project-id"
# region = "us-central1"
# connect_cluster_id = "my-connect-cluster"
# kafka_cluster_id = "my-kafka-cluster"
# primary_subnet = "projects/my-project-id/regions/us-central1/subnetworks/default"
# cpu = 12
# memory_bytes = 12884901888  # 12 GiB

connect_client = ManagedKafkaConnectClient()
kafka_client = managedkafka_v1.ManagedKafkaClient()

parent = connect_client.common_location_path(project_id, region)
kafka_cluster_path = kafka_client.cluster_path(project_id, region, kafka_cluster_id)

connect_cluster = ConnectCluster()
connect_cluster.name = connect_client.connect_cluster_path(project_id, region, connect_cluster_id)
connect_cluster.kafka_cluster = kafka_cluster_path
connect_cluster.capacity_config.vcpu_count = cpu
connect_cluster.capacity_config.memory_bytes = memory_bytes
connect_cluster.gcp_config.access_config.network_configs = [ConnectNetworkConfig(primary_subnet=primary_subnet)]
# Optionally, you can also specify accessible subnets and resolvable DNS domains as part of your network configuration.
# For example:
# connect_cluster.gcp_config.access_config.network_configs = [
#     ConnectNetworkConfig(
#         primary_subnet=primary_subnet,
#         additional_subnets=additional_subnets,
#         dns_domain_names=dns_domain_names,
#     )
# ]

request = CreateConnectClusterRequest(
    parent=parent,
    connect_cluster_id=connect_cluster_id,
    connect_cluster=connect_cluster,
)

try:
    operation = connect_client.create_connect_cluster(request=request)
    print(f"Waiting for operation {operation.operation.name} to complete...")
    # Creating a Connect cluster can take 10-40 minutes.
    response = operation.result(timeout=3000)
    print("Created Connect cluster:", response)
except GoogleAPICallError as e:
    print(f"The operation failed with error: {e}")
    raise
```

### Grant the Connect cluster access when the Kafka cluster has ACLs

Only needed if the primary Kafka cluster has ACLs configured. The Connect cluster principal is `User:service-PROJECT_NUMBER@gcp-sa-managedkafka.iam.gserviceaccount.com` (PROJECT_NUMBER = consumer project number).

Adapted (not in the official docs): the source's `{consumer project number}` placeholder becomes `PROJECT_NUMBER`, and the unquoted `*` becomes `'*'` so the shell does not glob-expand it.

```bash
/bin/kafka-acls.sh \
    --bootstrap-server BOOTSTRAP_ADDR \
    --command-config PATH_TO_CLIENT_PROPERTIES \
    --add \
    --allow-principal User:service-PROJECT_NUMBER@gcp-sa-managedkafka.iam.gserviceaccount.com \
    --operation READ --operation WRITE --topic '*'
```

Adapted (not in the official docs): same placeholder and quoting fix as above.

```bash
/bin/kafka-acls.sh \
    --bootstrap-server BOOTSTRAP_ADDR \
    --command-config PATH_TO_CLIENT_PROPERTIES \
    --add \
    --allow-principal User:service-PROJECT_NUMBER@gcp-sa-managedkafka.iam.gserviceaccount.com \
    --operation READ --group '*'
```

### Reference Secret Manager secrets in connector configs

Path to a secret file:

```text
/var/secrets/PROJECT_NAME-SECRET_NAME-SECRET_VERSION
```

Value of a secret as a configuration value (for example a password):

```text
${directory:/var/secrets:PROJECT_NAME-SECRET_NAME-SECRET_VERSION}
```

## Options / Props

### `gcloud managed-kafka connect-clusters create` required arguments (GA, gcloud 593.0.0)

| Argument | Description |
|----------|-------------|
| `CONNECT_CLUSTER_ID` | ID or name of the Connect cluster. Immutable. Naming: Managed Service for Apache Kafka resource guidelines. |
| `--location` | Supported Google Cloud region. Cannot be changed after creation; see the Managed Service for Apache Kafka locations page. |
| `--cpu` | Number of vCPUs. Minimum is 3. |
| `--memory` | Memory, with units "MB", "MiB", "GB", "GiB", "TB" or "TiB" (for example "3GiB"). Between 1 GiB and 8 GiB per vCPU. |
| `--primary-subnet` | Worker subnet, format `projects/PROJECT_ID/regions/REGION/subnetworks/SUBNET_ID`; must be in the same region as the Connect cluster. |
| `--kafka-cluster` | ID or fully qualified name of the primary cluster, format `projects/PROJECT_ID/locations/LOCATION/clusters/CLUSTER_ID`. Cannot be changed after creation. |

### Optional arguments

| Argument | Description |
|----------|-------------|
| `--project` | Project ID; defaults to the current project. |
| `--secret` | Secret Manager secret versions to load into workers, format `projects/PROJECT_ID/secrets/SECRET_NAME/versions/VERSION_ID`. Exact versions only, aliases not supported. Up to 32 secrets per cluster. |
| `--dns-name` | DNS domain name from the subnet to make visible to the Connect cluster. |
| `--labels` | `KEY=VALUE` pairs. Keys start with a lowercase character and contain only hyphens, underscores, lowercase characters and numbers; values contain only hyphens, underscores, lowercase characters and numbers. |
| `--config-file` | JSON or YAML file (or inline JSON / YAML) with configuration overriding cluster or connector defaults. At most one of `--config-file` and `--configs`. |
| `--async` | Return immediately without waiting for the operation. |
| `--additional-subnet` | DEPRECATED. |

### Capacity

| Property | Limit |
|----------|-------|
| vCPUs | Minimum 3. |
| Memory | 1 GiB to 8 GiB per vCPU; can be increased or decreased within these limits after creation. Example: 6 vCPUs allows 6 GiB to 48 GiB. |
| Capacity updates | Capacity can be updated after creation. |

### Worker (primary) subnet requirements

| Requirement |
|-------------|
| The worker subnet is required. |
| Same region as the Connect cluster. |
| In the same parent VPC as one of the primary Kafka cluster's connected subnets. |
| CIDR range at least /22 (1024 addresses). |
| Workers get IP addresses in the subnet through a Private Service Connect interface and can reach any destination accessible from the subnet's VPC network. |
| Endpoints must not be in `172.16.0.0/14` (reserved for Managed Service for Apache Kafka Connect internal use). |
| Firewall rules must permit the traffic. |
| Internet traffic needs a Cloud NAT (for example a MirrorMaker connector replicating from an internet-accessible Kafka cluster). |
| Private Service Connect endpoints in a different VPC need a supported consumer configuration (for example NCC). |

### Roles and permissions

| Item | Value |
|------|-------|
| Role to create a Connect cluster | Managed Kafka Connect Cluster Editor (`roles/managedkafka.connectClusterEditor`) on the project. |
| Permission | `managedkafka.connectClusters.create` |
| Role for Connect cluster in a different project | Managed Kafka Service Agent role on the Kafka cluster's project, granted to the Connect cluster project's service agent `service-PROJECT_NUMBER@gcp-sa-managedkafka.iam.gserviceaccount.com`. |
| Roles for Secret Manager secrets | Secret Manager Viewer (`roles/secretmanager.viewer`) and Secret Manager Secret Accessor (`roles/secretmanager.secretAccessor`) to the Managed Kafka service account. |

## Notes

- By default clusters let the Connect cluster access resources when no ACLs exist (`allow.everyone.if.no.acl.found` is `true`, the default). Once ACLs are configured, the Connect cluster has no read/write permission until granted.
- The ACL examples grant READ / WRITE on every topic (`*`) and READ on every consumer group to the Connect cluster principal, as in the source; narrow them to specific topics and groups where possible.
- Corrected from the official docs: the Python sample's `except GoogleAPICallError as e:` only printed `The operation failed with error: ...`; `raise` was added.
- Corrected from the official docs: the source writes the ACL principal as `User:service-{consumer project number}@gcp-sa-managedkafka.iam.gserviceaccount.com` and passes `--topic *` / `--group *` unquoted; the examples above use `PROJECT_NUMBER` and `'*'`.
- Corrected from the official docs: the source shows the create command as `... --kafka-cluster=KAFKA_CLUSTER \ [--project=PROJECT_ID] \ [--secret=SECRET] \ [--dns-name=DNS_DOMAIN_NAME] \ [--config-file=CONFIG_FILE] \ [--labels=LABELS] [--async]` with square brackets and a missing continuation after `[--labels=LABELS]`.
- Deprecated: `--additional-subnet` - "The --additional-subnet flag is deprecated and will be removed in a future version. Managed Kafka Connect clusters can now reach any endpoint accessible from the primary subnet without the need to define additional subnets." The Python sample's commented `additional_subnets` option follows the same path; use only the primary subnet.
- Release track: `connect-clusters create` exists in GA `gcloud managed-kafka` (managedkafka/v1) as well as alpha and beta; the flags above are from the GA help. The GA help also accepts `--configs=KEY=VALUE,...` as an alternative to `--config-file`.
- The source states creation time as 20 to 30 minutes (page text and monitoring section), 10-40 minutes (Python sample comment); durations vary.
- The name, location and primary Kafka cluster of a Connect cluster are immutable. Place the Connect cluster in the same region as the Kafka cluster and the source / sink system to reduce latency and inter-region network cost; the pipeline cost and latency depend on the locations of all three systems.
- Secrets are mounted as read-only files in workers; keep credentials in Secret Manager and reference them with the formats above instead of writing them in connector configs. `PROJECT_NAME`, `SECRET_NAME`, `SECRET_VERSION` are the project, secret and version; example `password=${directory:/var/secrets:project1-database_password-3}`.
- Labels are key-value pairs (for example `environment:prod`, `application:web-app`) used to organize and filter Connect clusters.
- Resolvable DNS domains: the primary Managed Service for Apache Kafka cluster's DNS domain (bootstrap address) is included automatically; other Kafka clusters, including external ones, need their DNS domain configured.
- "Connect cluster" and "connectors" here are Kafka Connect (see the overview); not Integration Connectors of Application Integration (`gcp-integration`) and not Workflows connectors. Google Cloud Managed Service for Apache Kafka runs Apache Kafka; client properties follow upstream Apache Kafka.
- The source also shows Console, Terraform, Go and Java.
- Source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/connect-cluster/create-connect-cluster (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [kafka-connect-overview.md](./kafka-connect-overview.md)
- [create-pubsub-sink-connector.md](./create-pubsub-sink-connector.md)
- Update a Connect cluster: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/connect-cluster/update-connect-cluster
- gcloud: https://docs.cloud.google.com/sdk/gcloud/reference/managed-kafka/connect-clusters/create
