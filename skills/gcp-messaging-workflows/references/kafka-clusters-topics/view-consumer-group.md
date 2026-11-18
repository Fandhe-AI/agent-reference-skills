---
source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/view-consumer-group
---

# View a Consumer Group

View detailed information about a single consumer group (name, group ID, creation time, update time) with the console, gcloud, a client library, the Managed Kafka API or the open source Apache Kafka APIs.

## Signature / Usage

### gcloud

```bash
gcloud managed-kafka consumer-groups describe CONSUMER_GROUP_ID \
    --cluster=CLUSTER \
    --location=LOCATION
```

### Python

Adapted (not in the official docs): added `raise` so a failed call is not reported as success (the source only prints the error).

```python
from google.api_core.exceptions import NotFound
from google.cloud import managedkafka_v1

# TODO(developer)
# project_id = "my-project-id"
# region = "us-central1"
# cluster_id = "my-cluster"
# consumer_group_id = "my-consumer-group"

client = managedkafka_v1.ManagedKafkaClient()

consumer_group_path = client.consumer_group_path(
    project_id, region, cluster_id, consumer_group_id
)
request = managedkafka_v1.GetConsumerGroupRequest(
    name=consumer_group_path,
)

try:
    consumer_group = client.get_consumer_group(request=request)
    print("Got consumer group:", consumer_group)
except NotFound as e:
    print(f"Failed to get consumer group {consumer_group_id} with error: {e.message}")
    raise
```

## Options / Props

### Required role and permissions

| Item | Value |
|------|-------|
| Role | Managed Kafka Viewer (`roles/managedkafka.viewer`) |
| List consumer groups | `managedkafka.consumerGroups.list` |
| Get consumer group details | `managedkafka.consumerGroups.get` |

### Placeholders

| Placeholder | Meaning |
|-------------|---------|
| `CONSUMER_GROUP_ID` | The ID or name of the consumer group. |
| `CLUSTER` | The ID or name of the cluster. |
| `LOCATION` | The location of the cluster. |

## Notes

- The console's consumer group page has a Configuration tab (group name and attached topic) and a Monitoring tab (offset lag by partition chart).
- Corrected from the official docs: the Python sample's `except NotFound as e:` only printed `Failed to get consumer group ...`; `raise` was added.
- Read-only operation; no data is changed.
- Google Cloud Managed Service for Apache Kafka runs Apache Kafka; client properties follow upstream Apache Kafka.
- The source also shows Console, Go and Java.
- Source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/view-consumer-group (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [consumer-groups.md](./consumer-groups.md)
- [create-topic.md](./create-topic.md)
