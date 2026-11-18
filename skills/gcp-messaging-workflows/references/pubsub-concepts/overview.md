---
source: https://docs.cloud.google.com/pubsub/docs/overview
---

# Pub/Sub overview

Pub/Sub is an asynchronous and scalable messaging service that decouples services producing messages from services processing those messages. Publishers broadcast events and subscribers react to them, instead of calling each other through synchronous RPCs. Latencies are typically on the order of 100 milliseconds.

## Signature / Usage

### Create a topic and a subscription, publish, pull

The source page has no code block. These are the first steps of the gcloud quickstart.

```bash
gcloud pubsub topics create my-topic
```

```bash
gcloud pubsub subscriptions create my-sub --topic=my-topic
```

```bash
gcloud pubsub topics publish my-topic --message="hello"
```

## Options / Props

### Common use cases

| Use case | Description |
|---|---|
| Ingesting user interaction and server events | Forward events to Pub/Sub, then use a stream processing tool such as Dataflow to deliver them to BigQuery, Bigtable and Cloud Storage. |
| Real-time event distribution | Make raw or processed events available to multiple applications ("enterprise event bus"). |
| Replicating data among databases | Distribute change events to build a view of database state and history in BigQuery and other stores. |
| Parallel processing and workflows | Distribute tasks (compressing files, sending email, evaluating AI models, reformatting images) among workers. |
| Data streaming from applications, services or IoT devices | For example a SaaS event feed or a residential sensor feeding a data-processing pipeline. |
| Refreshing distributed caches | Publish invalidation events with the IDs of changed objects. |
| Load balancing for reliability | Service instances in several zones subscribe to a common topic; others pick up the load when one zone fails. |

### Pub/Sub compared to other messaging technologies

| Aspect | Pub/Sub |
|---|---|
| Scaling model | Horizontal scalability like Apache Kafka and Pulsar, plus features of messaging middleware such as Apache ActiveMQ and RabbitMQ (dead-letter queues, filtering). |
| Parallelism | Per-message: Pub/Sub "leases" individual messages to subscriber clients and tracks whether each is processed. Partition-based systems force in-order processing per partition and cap concurrent clients at the number of partitions. |
| Intended communication | Service-to-service, not end-user or IoT clients. |
| Client-server messaging | Use Firebase Realtime Database or Firebase Cloud Messaging. |
| Asynchronous service calls | Use Cloud Tasks. |

### Integrations

| Area | Integration |
|---|---|
| Stream processing | Dataflow (templates, SQL), Apache Spark with Managed Service for Apache Spark, Data Fusion. |
| Monitoring, alerting, logging | Monitoring and Logging. |
| Authentication and IAM | Standard OAuth; granular IAM on individual resources. |
| APIs | gRPC and REST, client libraries for several languages. |
| Triggers, notifications, webhooks | Push delivery as HTTP POST requests to webhooks; Cloud Functions or other serverless products. |
| Orchestration | Workflows, Managed Airflow (Pub/Sub triggers), Application Integration (Pub/Sub trigger). |
| Integration Connectors | A Pub/Sub connector for use in integrations. |

## Notes

- Pub/Sub is a managed publish/subscribe service. Cloudflare Queues are in the `cloudflare-stateful` skill, Redis-backed BullMQ queues in `bullmq`, Cloud Tasks in `gcp-run`.
- Google Cloud Managed Service for Apache Kafka is also available; for a Kafka to Pub/Sub migration the source points to the architecture guide "Migrating from Kafka to Pub/Sub".
- Snippet taken from https://docs.cloud.google.com/pubsub/docs/publish-receive-messages-gcloud
- Source: https://docs.cloud.google.com/pubsub/docs/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [pubsub-basics.md](./pubsub-basics.md)
- [publish-receive-messages-gcloud.md](./publish-receive-messages-gcloud.md)
- [choose-pubsub-kafka.md](./choose-pubsub-kafka.md)
