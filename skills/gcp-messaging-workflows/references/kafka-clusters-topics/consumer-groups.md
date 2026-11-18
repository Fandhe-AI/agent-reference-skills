---
source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/consumer-groups
---

# Consumer Groups

A consumer group is a set of consumers that read records from a topic in parallel; each consumer is assigned a subset of the topic's partitions. In Managed Service for Apache Kafka you manage consumer groups with the console, gcloud, the client libraries or the Kafka command-line tools.

## Signature / Usage

### Create or join a group

Set `group.id` in the consumer (or `--group` in the Kafka command-line tools). `client.properties` must keep TLS enabled with SASL or mTLS authentication; do not put secrets in it in plain text.

```bash
kafka-console-consumer.sh \
  --topic TOPIC \
  --bootstrap-server BOOTSTRAP \
  --group GROUP \
  --consumer.config client.properties
```

## Options / Props

| Placeholder | Meaning |
|-------------|---------|
| `TOPIC` | The topic name. |
| `BOOTSTRAP` | The bootstrap server. |
| `GROUP` | The consumer group ID. |

## Notes

- Editing or deleting a consumer group (https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/edit-consumer-group, https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/delete-consumer-group) is documented on separate pages; try such operations on a disposable project first.
- Google Cloud Managed Service for Apache Kafka runs Apache Kafka; client properties follow upstream Apache Kafka (`group.id`: https://kafka.apache.org/37/configuration/consumer-configs/#consumerconfigs_group.id).
- Viewing a consumer group is covered on the view page; listing consumer groups is documented at https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/list-consumer-groups
- Source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/consumer-groups (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [view-consumer-group.md](./view-consumer-group.md)
- [create-topic.md](./create-topic.md)
