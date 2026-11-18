---
source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/connect-cluster/create-pubsub-sink-connector
---

# Create a Pub/Sub Sink connector

A Pub/Sub Sink connector (`com.google.pubsub.kafka.sink.CloudPubSubSinkConnector`) consumes messages from one or more Kafka topics in the primary cluster and publishes them to a Pub/Sub topic. Use cases: event-driven architectures, sending Kafka data to Google Cloud services or applications that consume from Pub/Sub, and triggering real-time notifications or actions.

## Signature / Usage

### Create with gcloud

```bash
gcloud managed-kafka connectors create CONNECTOR_ID \
    --connect-cluster=CONNECT_CLUSTER_ID \
    --location=LOCATION \
    --config-file=CONFIG_FILE
```

Example configuration file (YAML). It holds no credentials; the connector uses the Managed Kafka service agent's IAM access to Pub/Sub.

```yaml
connector.class: "com.google.pubsub.kafka.sink.CloudPubSubSinkConnector"
name: "CPS_SINK_CONNECTOR_ID"
tasks.max: "1"
topics: "GMK_TOPIC_ID"
value.converter: "org.apache.kafka.connect.storage.StringConverter"
key.converter: "org.apache.kafka.connect.storage.StringConverter"
cps.topic: "CPS_TOPIC_ID"
cps.project: "GCP_PROJECT_ID"
```

### Create with Python

Adapted (not in the official docs): added `raise` so a failed call is not reported as success (the source only prints the error).

```python
from google.api_core.exceptions import GoogleAPICallError
from google.cloud.managedkafka_v1.services.managed_kafka_connect import (
    ManagedKafkaConnectClient,
)
from google.cloud.managedkafka_v1.types import Connector, CreateConnectorRequest

connect_client = ManagedKafkaConnectClient()
parent = connect_client.connect_cluster_path(project_id, region, connect_cluster_id)

configs = {
    "connector.class": "com.google.pubsub.kafka.sink.CloudPubSubSinkConnector",
    "name": connector_id,
    "tasks.max": tasks_max,
    "topics": topics,
    "value.converter": value_converter,
    "key.converter": key_converter,
    "cps.topic": cps_topic,
    "cps.project": cps_project,
}

connector = Connector()
connector.name = connector_id
connector.configs = configs

request = CreateConnectorRequest(
    parent=parent,
    connector_id=connector_id,
    connector=connector,
)

try:
    operation = connect_client.create_connector(request=request)
    print(f"Waiting for operation {operation.operation.name} to complete...")
    response = operation.result()
    print("Created Connector:", response)
except GoogleAPICallError as e:
    print(f"The operation failed with error: {e}")
    raise
```

## Options / Props

### `gcloud managed-kafka connectors create` arguments (GA, gcloud 593.0.0)

| Argument | Description |
|----------|-------------|
| `CONNECTOR_ID` | ID or name of the connector. |
| `--connect-cluster` | ID of the Connect cluster where the connector is created. |
| `--location` | Location of the Connect cluster. |
| `--config-file` / `--configs=[KEY=VALUE,...]` | Exactly one is required. `--config-file` is a local YAML or JSON file (or inline JSON / YAML). |
| `--task-retry-disabled` | Boolean flag; disables the default task retry policy. |
| `--task-restart-min-backoff` | Minimum wait before retrying a failed task; default 60s. |
| `--task-restart-max-backoff` | Maximum wait before retrying a failed task; default 1800s (30 minutes). |

### Connector configuration properties

| Property | Description |
|----------|-------------|
| `connector.class` | `com.google.pubsub.kafka.sink.CloudPubSubSinkConnector`. Required when not configuring through the console. |
| `name` | Connector name; unique within the Connect cluster and immutable. |
| `topics` | Comma-separated list of Kafka topics to read. Topics must exist in the Kafka cluster associated with the Connect cluster. |
| `topics.regex` | Regular expression giving the topics to read, such as `topic.*` (the Console's **Topic regex** field). Set only one of `topics` or `topics.regex`. |
| `tasks.max` | Parallelism; actual parallelism is limited by the number of partitions of the Kafka topics. |
| `value.converter`, `key.converter` | Converters from the Kafka data format (Avro, JSON, raw bytes) to the Kafka Connect internal format. |
| `cps.topic` | Required. Target Pub/Sub topic ID. |
| `cps.project` | Required. Project containing the Pub/Sub topic. |
| `cps.endpoint` | Optional Pub/Sub endpoint. Default `"pubsub.googleapis.com:443"`. |
| `maxBufferSize`, `maxBufferBytes`, `maxDelayThresholdMs`, `maxOutstandingRequestBytes`, `maxOutstandingMessages` | Buffering before publishing to Pub/Sub. |
| `messageBodyName` | Field or key used as the Pub/Sub message body for struct or map value schemas. |
| `metadata.publish` | `true` adds Kafka topic, partition, offset and timestamp as message attributes. |
| `headers.publish` | `true` adds Kafka message headers as Pub/Sub message attributes. |
| `orderingKeySource` | Ordering key for Pub/Sub messages: `"none"` (default), `"key"`, `"partition"`. |

### Roles and permissions

| Item | Value |
|------|-------|
| Role to create a connector | Managed Kafka Connector Editor (`roles/managedkafka.connectorEditor`) on the project. |
| Permission | `managedkafka.connectors.create` |
| Role for publishing | Pub/Sub Publisher (`roles/pubsub.publisher`) for the Managed Kafka Service Agent, granted on the project that contains the Pub/Sub topic. |

### Prerequisites

| Prerequisite |
|--------------|
| A Managed Service for Apache Kafka cluster (primary cluster, source of the pipeline). |
| A Connect cluster to host the connector. |
| A Pub/Sub topic. |
| A Kafka topic in the source cluster. |

## Notes

- Corrected from the official docs: the source's Kafka topics section says you can "specify one or more topics, or use a regular expression" without naming the property. In Apache Kafka Connect, `topics` is a list ("List of topics to consume, separated by commas") and the regular expression goes in `topics.regex`; the two are mutually exclusive ("topics and topics.regex are mutually exclusive options, but both are set"). Source: https://github.com/apache/kafka/blob/4.0.0/connect/runtime/src/main/java/org/apache/kafka/connect/runtime/SinkConnectorConfig.java (tag 4.0.0, retrieved 2026-11-19).
- The source grants `roles/pubsub.publisher` to the service agent on the project that contains the topic, which applies to every topic in that project; the source gives no topic-level form. Its "Pub/Sub topic" section also calls the grantee "the Connect cluster service account". If the Connect cluster is in a different project from the Kafka cluster, see "Create a Connect cluster in a different project" on the create-connect-cluster page.
- Put credentials (passwords, truststores) in Secret Manager and reference them with the `/var/secrets/...` and `${directory:/var/secrets:...}` forms; never write them inline in a connector config.
- Placeholders in the YAML (`CPS_SINK_CONNECTOR_ID`, `GMK_TOPIC_ID`, `CPS_TOPIC_ID`, `GCP_PROJECT_ID`) are replaced with the connector ID, the Kafka topic ID, the Pub/Sub topic ID and the project ID of the Pub/Sub topic.
- Corrected from the official docs: the Python sample's `except GoogleAPICallError as e:` only printed `The operation failed with error: ...`; `raise` was added.
- In the Python sample, the variables (`project_id`, `region`, `connect_cluster_id`, `connector_id`, `tasks_max`, ...) are not defined in the source and must be set by the caller.
- The `--task-retry-disabled` flag is boolean; the help example shows `--task-retry-disabled=true`. The GA help examples for `connectors create` join two alternatives with `OR` and use `...` inside `--configs`; they are not repeated here.
- Pub/Sub delivers at-least-once, so Pub/Sub subscribers of the published messages must be idempotent.
- After creating a connector you can edit, delete, pause, stop or restart it. The full property list is in the connector's GitHub README: https://github.com/googleapis/java-pubsub-group-kafka-connector?tab=readme-ov-file#sink-connector
- The task restart policy (console) corresponds to the `--task-*` flags; see "Task restart policy" on the connectors overview page.
- "Connector" here is a Kafka Connect sink plugin on a Connect cluster, not an Integration Connector of Application Integration (planned `gcp-integration`) and not a Workflows connector. Google Cloud Managed Service for Apache Kafka runs Apache Kafka; connector and client properties follow upstream Apache Kafka.
- The source also shows Console, Terraform, Go and Java.
- Source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/connect-cluster/create-pubsub-sink-connector (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-connect-cluster.md](./create-connect-cluster.md)
- [kafka-connect-overview.md](./kafka-connect-overview.md)
- Troubleshoot a Pub/Sub connector: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/connect-cluster/troubleshoot-pubsub-connector
- gcloud: https://docs.cloud.google.com/sdk/gcloud/reference/managed-kafka/connectors/create
