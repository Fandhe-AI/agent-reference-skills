---
source: https://docs.cloud.google.com/pubsub/lite/docs/migrate-pubsub-lite-to-managed-service-for-apache-kafka
---

# Migrate Pub/Sub Lite to Managed Service for Apache Kafka

Pub/Sub Lite is deprecated (turn-down January 31, 2027; not available to new customers after September 24, 2024). This guide moves data from a Pub/Sub Lite topic to a Managed Service for Apache Kafka topic in four phases: set up replication, migrate consumers, migrate publishers, decommission.

## Signature / Usage

### Pub/Sub Source connector configuration (recommended)

Replace `PROJECT_ID` (project of the Pub/Sub subscription), `BRIDGE_SUBSCRIPTION`, `KAFKA_TOPIC`, `PARTITION_COUNT` (use the Pub/Sub Lite partition count) and `MAXIMUM_TASK_COUNT` (equal to or less than `PARTITION_COUNT`).

```json
{
  "connector.class": "com.google.pubsub.kafka.source.CloudPubSubSourceConnector",
  "cps.project": "PROJECT_ID",
  "cps.subscription": "BRIDGE_SUBSCRIPTION",
  "kafka.topic": "KAFKA_TOPIC",
  "kafka.key.attribute": "orderingKey",
  "kafka.partition.scheme": "hash_key",
  "kafka.partition.count": "PARTITION_COUNT",
  "kafka.record.headers": "true",
  "key.converter": "org.apache.kafka.connect.storage.StringConverter",
  "value.converter": "org.apache.kafka.connect.converters.ByteArrayConverter",
  "tasks.max": "MAXIMUM_TASK_COUNT"
}
```

### Verify replication

Adapted (not in the official docs): `--connect_cluster` is written `--connect-cluster`, the flag name in the gcloud 593.0.0 help for `gcloud managed-kafka connectors describe`, and `--project=PROJECT` is written `--project=PROJECT_ID` because gcloud takes a project ID, not a project name.

```bash
gcloud managed-kafka connectors describe CONNECTOR_NAME \
    --connect-cluster=CONNECT_CLUSTER \
    --location=REGION \
    --project=PROJECT_ID \
    --format="value(state)"
```

`RUNNING` means the connector works. Then publish a test message to the Pub/Sub Lite topic and read it from the Kafka topic (for example with `kafka-console-consumer`); the Kafka message key should equal the Pub/Sub Lite ordering key.

### Publisher on Managed Service for Apache Kafka (Java)

```java
import com.google.cloud.pubsublite.*;
import com.google.cloud.pubsublite.cloudpubsub.*;
import com.google.protobuf.ByteString;
import com.google.pubsub.v1.PubsubMessage;
import java.util.Map;

String projectId  = "PROJECT_ID";
String region     = "us-central1";
String gmkCluster = "GMK_CLUSTER_ID";
String gmkTopic   = "GMK_TOPIC";

Map<String, Object> kafkaProperties =
    GmkUtils.buildGmkKafkaProperties(projectId, region, gmkCluster);

TopicPath topicPath = TopicPath.newBuilder()
    .setProject(ProjectId.of(projectId))
    .setLocation(CloudRegion.of(region))
    .setName(TopicName.of(gmkTopic))
    .build();

PublisherSettings settings = PublisherSettings.newBuilder()
    .setTopicPath(topicPath)
    .setMessagingBackend(MessagingBackend.MANAGED_KAFKA)
    .setKafkaProperties(kafkaProperties)
    .build();

Publisher publisher = Publisher.create(settings);
publisher.startAsync().awaitRunning();

PubsubMessage message = PubsubMessage.newBuilder()
    .setData(ByteString.copyFromUtf8("hello from java-pubsublite/GMK"))
    .setOrderingKey("user-123")   // becomes the Kafka message key
    .putAttributes("source", "java-client")
    .build();

String messageId = publisher.publish(message).get();
System.out.println("Published: " + messageId);

publisher.stopAsync().awaitTerminated();
```

### Offset migration orchestrator (Java)

Implements the timestamp-based offset translation strategy.

```java
import com.google.cloud.pubsublite.*;
import com.google.cloud.pubsublite.cloudpubsub.GmkUtils;
import com.google.cloud.pubsublite.internal.*;
import com.google.cloud.pubsublite.internal.OffsetMigrationHelper.MigrationResult;
import java.util.*;

String projectId   = "PROJECT_ID";
String region      = "us-central1";
String pslTopic    = "PSL_TOPIC";
String pslSub      = "PSL_SUBSCRIPTION";
String gmkCluster  = "GMK_CLUSTER_ID";
String gmkTopic    = "GMK_TOPIC";
int partitionCount = 3;

CloudZone pslZone = CloudZone.of(CloudRegion.of(region), 'a');
TopicPath pslTopicPath = TopicPath.newBuilder()
    .setProject(ProjectId.of(projectId)).setLocation(pslZone)
    .setName(TopicName.of(pslTopic)).build();
SubscriptionPath pslSubPath = SubscriptionPath.newBuilder()
    .setProject(ProjectId.of(projectId)).setLocation(pslZone)
    .setName(SubscriptionName.of(pslSub)).build();
SubscriptionPath gmkSubPath = SubscriptionPath.newBuilder()
    .setProject(ProjectId.of(projectId)).setLocation(CloudRegion.of(region))
    .setName(SubscriptionName.of(gmkTopic)).build();

Map<String, Object> gmkProperties =
    GmkUtils.buildGmkKafkaProperties(projectId, region, gmkCluster);

CursorClient        pslCursor   = CursorClient.create(
    CursorClientSettings.newBuilder().setRegion(CloudRegion.of(region)).build());
TopicStatsClient    pslStats    = TopicStatsClient.create(
    TopicStatsClientSettings.newBuilder().setRegion(CloudRegion.of(region)).build());
KafkaTopicStatsClient kafkaStats = new KafkaTopicStatsClient(CloudRegion.of(region), gmkProperties);
KafkaCursorClient   kafkaCursor = new KafkaCursorClient(CloudRegion.of(region), gmkProperties);

MigrationOrchestrator orchestrator = MigrationOrchestrator.newBuilder()
    .setPslCursorClient(pslCursor)
    .setPslTopicStatsClient(pslStats)
    .setKafkaTopicStatsClient(kafkaStats)
    .setKafkaCursorClient(kafkaCursor)
    .setPslTopicPath(pslTopicPath)
    .setPslSubscriptionPath(pslSubPath)
    .setKafkaSubscriptionPath(gmkSubPath)
    .setKafkaTopicName(gmkTopic)
    .setPartitionCount(partitionCount)
    .setDryRun(false)        // set true to preview without committing
    .setValidate(true)       // re-read committed offsets after reset
    .build();

MigrationOrchestrator.Result result = orchestrator.execute();
System.out.println(result.getSummary());
for (Map.Entry<Partition, MigrationResult> e : result.getPartitionResults().entrySet()) {
  MigrationResult r = e.getValue();
  System.out.printf("partition=%d pslOffset=%d kafkaOffset=%d status=%s validated=%b%n",
      e.getKey().value(), r.getPslOffset(), r.getKafkaOffset(), r.getStatus(), r.isValidated());
}
```

## Options / Props

### Prerequisites

| Item | Requirement |
|---|---|
| Cluster | Managed Service for Apache Kafka cluster in the same region as the Pub/Sub Lite topic |
| Kafka topic | Replaces the Pub/Sub Lite topic and subscription |
| Connect cluster | Kafka Connect cluster with the Kafka cluster as primary cluster |
| Java library | `java-pubsublite` version 1.16.1 or higher |
| Go library | `pscompat.ManagedKafka` backend available |

### Roles (on the project)

| Role | ID |
|---|---|
| Managed Kafka Client | `roles/managedkafka.client` |
| Pub/Sub Lite Subscriber | `roles/pubsublite.subscriber` |
| Pub/Sub Lite Viewer | `roles/pubsublite.viewer` |
| Pub/Sub Editor | `roles/pubsub.editor` |

### Replication components

| Component | Purpose |
|---|---|
| Pub/Sub Lite export subscription | Streams messages from a Pub/Sub Lite topic to a Pub/Sub topic. |
| Pub/Sub bridge topic and subscription | Staging area Kafka Connect reads from. |
| Kafka Connect with a Pub/Sub Source connector | Pulls from the Pub/Sub subscription and writes to Kafka. |

### Consumer migration strategies

| Strategy | Duplication risk | Publishing interruption | Required consumer capability |
|---|---|---|---|
| Clean cut-over | None | Yes | Standard |
| Timestamp-based offset translation | Duplicates might occur | No | Idempotent consumers |

## Notes

- Deprecated: "Pub/Sub Lite is deprecated. Effective January 31, 2027, Pub/Sub Lite will be turned down." Current customers: functional until January 31, 2027; not used within April 15, 2025 - July 15, 2025 means no access from July 15, 2025. New customers: unavailable after September 24, 2024. Targets: Managed Service for Apache Kafka or Pub/Sub.
- Ordering: `kafka.key.attribute=orderingKey` uses the Pub/Sub ordering key as the Kafka message key, so messages with one key go to one partition. For partition affinity create the Kafka topic with the same number of partitions as the Pub/Sub Lite topic and set `kafka.partition.scheme=hash_key`; offset translation relies on it.
- Clean cut-over: stop the publisher, let Pub/Sub Lite consumers drain and stop, wait until the bridge subscription `num_undelivered_messages` is zero and Kafka offsets stop growing, then seek the Kafka consumer group to the latest offset on every partition.
- Timestamp-based translation: stop the Lite consumers (not the publisher), translate each partition's committed offset to the first Kafka message at or after the Lite publish time, and set the Kafka consumer group to those offsets; messages published between the earliest and latest committed Lite timestamps are redelivered, so consumers must be idempotent.
- Switching: the latest client libraries take a flag to set the backend to Managed Service for Apache Kafka (Java `MessagingBackend.MANAGED_KAFKA`; in Managed Kafka mode the `SubscriptionName` is used as both Kafka topic and consumer group ID). Run old and new consumers side by side and compare. Start publisher changes in a non-production environment; parallel Kafka publishers are only for downstream consumers that tolerate duplicates.
- Authentication: both libraries use `SASL_SSL` / `OAUTHBEARER` with Application Default Credentials (Java `GmkUtils.buildGmkKafkaProperties` sets `sasl.mechanism=OAUTHBEARER`, `sasl.login.callback.handler.class=com.google.cloud.hosted.kafka.auth.GcpLoginCallbackHandler` and `sasl.jaas.config`; the `managed-kafka-auth-login-handler` must be on the classpath). The principal needs `roles/managedkafka.client` and any topic-level ACLs. No secrets are written in the samples.
- Decommission (irreversible, deletes data and resources; rehearse on a disposable project first): stop and delete the Pub/Sub Source connector; delete the bridge topic and subscription; delete the Pub/Sub Lite export subscription; delete the Pub/Sub Lite topic and remaining subscriptions.
- Checklist from the source: export subscription exporting to the bridge topic; connector running with `kafka.key.attribute=orderingKey`; partition counts match; side-by-side parity; offset migration `SUCCESS` with `validated=true` on every partition; Kafka backlog shrinking; publishers producing expected Kafka keys; replication pipeline deleted.
- Kafka Connect connectors here are source and sink plugins on a Connect cluster, not Integration Connectors of Application Integration.
- Corrected from the official docs: `--connect_cluster=CONNECT_CLUSTER` is `--connect-cluster=CONNECT_CLUSTER` in the gcloud 593.0.0 help, and `--project=PROJECT` ("the name of the Google Cloud project") is `--project=PROJECT_ID`.
- The roles in the table are granted on the project in the source, and `roles/pubsub.editor` is broad; grant them to the migration operator only and remove them after the migration.
- Omitted forms: the Go consumer, publisher and orchestrator samples and the Java consumer sample are not reproduced.
- Source: https://docs.cloud.google.com/pubsub/lite/docs/migrate-pubsub-lite-to-managed-service-for-apache-kafka (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [pubsub-lite-deprecation.md](./pubsub-lite-deprecation.md)
- [migrate-pubsub-lite-to-pubsub.md](./migrate-pubsub-lite-to-pubsub.md)
- [choose-pubsub-kafka.md](./choose-pubsub-kafka.md)
