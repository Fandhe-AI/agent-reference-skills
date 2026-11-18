---
source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/overview
---

# Managed Service for Apache Kafka Overview

Managed Service for Apache Kafka is a Google Cloud service that runs secure, scalable open source Apache Kafka clusters. Clusters are sized by total vCPU count and memory, reachable from any VPC through Private Service Connect, always encrypted with TLS, and run Apache Kafka 3.7.1 in KRaft mode.

## Signature / Usage

### Create a cluster (entry point)

The overview has no code of its own; this is the cluster-creation command from the create-cluster page.

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

## Options / Props

### Feature summary

| Area | Behavior |
|------|----------|
| Sizing | Specify total vCPU count and memory; brokers are provisioned from the vCPU count. Scaling up might add brokers and can automatically rebalance partitions. |
| Storage | Tiered storage: limited fast local storage (pre-provisioned disks on brokers) plus effectively unlimited remote storage. You set topic retention time to control cost or satisfy retention policies. |
| Networking | You provide the subnets from which the cluster is accessible. Private IPs for bootstrap servers and brokers are provisioned in each subnet, with private Cloud DNS names (the same in all VPCs). One bootstrap URL per cluster (load balancer). Each IP needs a Private Service Connect endpoint, provisioned automatically. |
| Authentication | SASL (IAM identities: human, service and federated accounts) and mTLS (client certificates; available on clusters created after June 24, 2025). SASL/GSSAPI, SASL/SCRAM-SHA-256, SASL/SCRAM-SHA-512 and unauthenticated connections are not supported. |
| Authorization | IAM controls cluster management actions. SASL principals: IAM role bindings or Kafka ACLs. mTLS principals: Kafka ACLs. |
| Encryption | Required. All connections use TLS; broker certificates are signed by the Public Certificate Authority. Data at rest is always encrypted (Google-managed keys or CMEK). |
| Patching | Critical security vulnerabilities are patched automatically; brokers are updated by rolling restart with no downtime. Minor Kafka versions are not upgraded automatically. |
| Resource isolation | Clusters run in tenant projects in a private VPC with no public IPs (unless the public cluster feature is enabled), one tenant project and service agent per customer project. |
| High availability | Rack-aware three-zone configuration. Default topic configuration requires at least three replicas; default minimum in-sync replicas is two. Tolerates loss of one zone or one broker. No protection from regional or dual-zone failures: run two regional clusters and synchronize them with tools such as MirrorMaker 2.0 from Kafka Connect. |
| Schema registry | Preview. Implements the Confluent Schema Registry REST API; Avro and Protocol Buffer formats are supported, JSON is not. |
| Kafka Connect | Built-in connector plugins hosted in Connect clusters (BigQuery, Cloud Storage, Pub/Sub, other Kafka deployments). |
| Tooling | REST and gRPC APIs, Terraform, Google Cloud console, gcloud CLI, client libraries; metrics to Cloud Monitoring, broker logs to Cloud Logging. |

### Limitations

| Limitation |
|------------|
| Each cluster must have equal resources in each of the three zones; single-zone and two-zone clusters are not supported. |
| You cannot choose the zones when you create the cluster. |
| You cannot configure the volume of local storage on a cluster (see the create-cluster page for the custom local storage option). |
| Runs in KRaft mode; ZooKeeper mode is not supported. |
| JMX APIs for metrics are not supported. |
| Broker configs with `read-only` update mode (for example `auto.create.topics.enable`, `background.threads`) take effect only when brokers restart; restarts happen during maintenance with no set schedule and cannot be triggered manually. Configs with `cluster-wide` update mode (for example `message.max.bytes`) take effect immediately without restart. |
| Some broker configs are managed by the service and cannot be updated, including `broker.id` and storage settings such as `remote.log.storage.system.enable`. |

## Notes

- Google Cloud Managed Service for Apache Kafka runs Apache Kafka; client properties follow upstream Apache Kafka. This service is distinct from Pub/Sub, which is a different managed messaging service.
- Snippet taken from https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/create-cluster with `--public-cluster` and `--allowed-source-ip-ranges` removed (Adapted from the official docs: the source's example includes them; they make the cluster reachable from the internet for the listed source ranges). The optional lines `--encryption-key` and `--labels` can be omitted.
- Networking itself (VPC, Private Service Connect, Cloud DNS) is covered by `gcp-networking`; CMEK keys by `gcp-security`; Cloud Monitoring by `gcp-observability`.
- The source also shows pricing discussion; prices are not copied (see https://cloud.google.com/managed-service-for-apache-kafka/pricing).
- Source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-cluster.md](./create-cluster.md)
- [plan-cluster-size.md](./plan-cluster-size.md)
- [networking-kafka.md](./networking-kafka.md)
- [create-topic.md](./create-topic.md)
- [consumer-groups.md](./consumer-groups.md)
