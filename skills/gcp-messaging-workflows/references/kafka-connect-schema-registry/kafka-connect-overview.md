---
source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/kafka-connect-overview
---

# Kafka Connect overview (Managed Service for Apache Kafka)

Kafka Connect is the framework for connecting Kafka with external systems such as databases, message queues and file systems. Google Cloud offers a curated set of built-in connector plugins that it vets, maintains, patches and upgrades automatically, with built-in monitoring and logging. A Connect cluster is a distributed Kafka Connect deployment with pre-packaged connector plugins, attached to one primary Managed Service for Apache Kafka cluster; connectors are deployed on the Connect cluster.

## Signature / Usage

### Create a connector on a Connect cluster

```bash
gcloud managed-kafka connectors create CONNECTOR_ID \
    --connect-cluster=CONNECT_CLUSTER_ID \
    --location=LOCATION \
    --config-file=CONFIG_FILE
```

## Options / Props

### Concepts

| Concept | Description |
|---------|-------------|
| Connect cluster | Distributed deployment of Kafka Connect with pre-packaged connector plugins and configurations. Associated with one primary Managed Service for Apache Kafka cluster, which stores the state of the connectors running on it. A separate resource from the Kafka cluster. |
| Primary cluster | Generally also the target of all source connectors and the source of all sink connectors on the Connect cluster. |
| Source connector | Writes data from a source to a Managed Service for Apache Kafka cluster. |
| Sink connector | Writes data from a Managed Service for Apache Kafka cluster to a sink. |
| Connector lifecycle | Started, stopped, paused, restarted; configuration can be updated. |

### Use cases

| Use case |
|----------|
| Migrate existing Kafka deployments to Managed Service for Apache Kafka. |
| Replicate a Managed Service for Apache Kafka cluster to another region for disaster recovery. |
| Stream data from Managed Service for Apache Kafka to BigQuery, Cloud Storage, Pub/Sub. |

### Automated by the Kafka Connect service

| Area | Behavior |
|------|----------|
| Worker provisioning | Creating a Connect cluster provisions a cluster of workers in Kubernetes. |
| Networking | Configures the network between workers, brokers and external systems; you might need to change existing network settings. |
| Zonal resiliency | Workers are distributed across a minimum of three zones. |
| Authentication | Configures authentication with Kafka brokers. |
| Rollouts and upgrades | Manages worker configuration changes, version upgrades and security patches. |

### Limitations

| Limitation |
|------------|
| The primary Kafka cluster must be a Managed Service for Apache Kafka cluster (the cluster to which the Connect cluster writes its metadata). |
| You can't upload custom connector plugins to a Kafka Connect cluster. |
| Validation against a remote schema by using Schema Registry is not supported. |

## Notes

- A single Managed Service for Apache Kafka cluster can have multiple Connect clusters. With MirrorMaker 2.0, a Connect cluster can read or write topic data on non-primary Managed Service for Apache Kafka clusters or self-managed Kafka clusters, enabling topic replication.
- Kafka Connect APIs are served by `managedkafka.googleapis.com` and can be used through the console, the gcloud CLI, the Managed Kafka API, the client libraries or Terraform.
- "Connectors" here are Kafka Connect connectors (source and sink plugins running on a Connect cluster) - not Integration Connectors of Application Integration (planned `gcp-integration`) and not Workflows connectors.
- Google Cloud Managed Service for Apache Kafka runs Apache Kafka; client and connector properties follow upstream Apache Kafka.
- Snippet taken from https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/connect-cluster/create-pubsub-sink-connector
- Source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/kafka-connect-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-connect-cluster.md](./create-connect-cluster.md)
- [create-pubsub-sink-connector.md](./create-pubsub-sink-connector.md)
- Connectors overview: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/connect-cluster/connectors-overview
