---
source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/create-topic
---

# Create a Managed Service for Apache Kafka Topic

A topic is made of partitions (ordered, immutable record sequences, each owned by a single broker). Create the cluster first; then create topics with the console, gcloud, a client library, the Managed Kafka API or the open source Apache Kafka APIs.

## Signature / Usage

### gcloud

Required role: Managed Kafka Topic Editor (`roles/managedkafka.topicEditor`, permission `managedkafka.topics.create`).

```bash
gcloud managed-kafka topics create TOPIC_ID \
    --cluster=CLUSTER_ID --location=LOCATION_ID \
    --partitions=PARTITIONS \
    --replication-factor=REPLICATION_FACTOR \
    --configs=CONFIGS
```

### Kafka CLI

Run from a Compute Engine VM that can reach a subnet connected to the cluster, with the Kafka command-line tools installed (see the quickstart). `client.properties` must keep TLS enabled with SASL or mTLS as set up in the quickstart; do not weaken it or write secrets or access tokens into the file in plain text.

```bash
kafka-topics.sh --create --if-not-exists \
  --bootstrap-server=BOOTSTRAP_ADDRESS \
  --command-config client.properties \
  --topic TOPIC_ID \
  --partitions PARTITIONS \
  --replication-factor REPLICATION_FACTOR
```

### REST

```text
POST https://managedkafka.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/clusters/CLUSTER_ID/topics?topicId=TOPIC_ID
```

Request body (`PARTITION_COUNT` and `REPLICATION_FACTOR` are numeric placeholders):

```text
{
  "name": "TOPIC_ID",
  "partitionCount": PARTITION_COUNT,
  "replicationFactor": REPLICATION_FACTOR
}
```

Save it as `request.json`, then:

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://managedkafka.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/clusters/CLUSTER_ID/topics?topicId=TOPIC_ID"
```

### Python

Adapted (not in the official docs): added `raise` so a failed call is not reported as success (the source only prints the error).

```python
from google.api_core.exceptions import AlreadyExists
from google.cloud import managedkafka_v1

# TODO(developer)
# project_id = "my-project-id"
# region = "us-central1"
# cluster_id = "my-cluster"
# topic_id = "my-topic"
# partition_count = 10
# replication_factor = 3
# configs = {"min.insync.replicas": "1"}

client = managedkafka_v1.ManagedKafkaClient()

topic = managedkafka_v1.Topic()
topic.name = client.topic_path(project_id, region, cluster_id, topic_id)
topic.partition_count = partition_count
topic.replication_factor = replication_factor
# For a list of configs, one can check https://kafka.apache.org/documentation/#topicconfigs
topic.configs = configs

request = managedkafka_v1.CreateTopicRequest(
    parent=client.cluster_path(project_id, region, cluster_id),
    topic_id=topic_id,
    topic=topic,
)

try:
    response = client.create_topic(request=request)
    print("Created topic:", response.name)
except AlreadyExists as e:
    print(f"Failed to create topic {topic.name} with error: {e.message}")
    raise
```

## Options / Props

### Topic properties

| Property | Rule |
|----------|------|
| Topic name | Immutable. |
| Partition count | Can be increased by editing the topic, never decreased. Increasing it for a topic that uses a key might change how messages are distributed. |
| Replication factor | Defaults to the cluster's default replication factor if not specified (cluster default is 3). Recommended 3 or higher for production. Cannot exceed the number of available brokers. Higher counts increase local storage and data transfer costs, not persistent storage costs. |
| Other parameters | Kafka topic-level configs as comma-separated `KEY=VALUE` pairs overriding cluster defaults, for example `flush.ms=10` and `compression.type=producer` (gcloud also shows `cleanup.policy=compact`). |

### Cluster defaults relevant to topics

| Setting | Value |
|---------|-------|
| `min.insync.replicas` | 2 |
| `default.replication.factor` | 3 |

## Notes

- If you set a replication factor lower than 3 for the topic, you must also set the topic config override `min.insync.replicas=1`.
- Caution from the source: if you override `retention.ms`, avoid setting it too short (for example, less than 48 hours). A shorter retention time can reduce storage costs but increases the risk of data loss if consumers fall behind or service disruptions occur. Shortening retention deletes data; try changes on a disposable project first.
- Corrected from the official docs: the Python sample's `except AlreadyExists as e:` only printed `Failed to create topic ...`; `raise` was added.
- The source's gcloud text names the placeholders `CLUSTER` and `LOCATION` while the command uses `CLUSTER_ID` and `LOCATION_ID`; they are the cluster ID and the cluster region.
- `gcloud managed-kafka topics create` in 593.0.0 requires `--partitions` and `--replication-factor`; `--configs` is optional (`--configs` is `[KEY=VALUE,...]`); omit it if you have no overrides.
- Google Cloud Managed Service for Apache Kafka runs Apache Kafka; client properties follow upstream Apache Kafka (topic configs: https://kafka.apache.org/37/configuration/topic-level-configs/).
- The source also shows Console, PowerShell, Terraform, Go and Java.
- Source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/create-topic (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-cluster.md](./create-cluster.md)
- [consumer-groups.md](./consumer-groups.md)
- [plan-cluster-size.md](./plan-cluster-size.md)
