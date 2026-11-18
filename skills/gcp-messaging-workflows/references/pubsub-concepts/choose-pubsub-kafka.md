---
source: https://docs.cloud.google.com/pubsub/docs/choose-pubsub-kafka
---

# Choose between Pub/Sub and Managed Service for Apache Kafka

Both are horizontally scalable, managed messaging services for high-volume workloads. The choice is a tradeoff between operational simplicity (Pub/Sub) and portability (Managed Service for Apache Kafka). Partner services and self-managed Kafka are out of scope.

## Signature / Usage

The source page has no code block. Snippets from the Pub/Sub gcloud quickstart and from the gcloud help for a Managed Service for Apache Kafka cluster:

```bash
gcloud pubsub topics create my-topic
```

```bash
gcloud managed-kafka clusters create mycluster \
    --location=us-central1 --cpu=3 --memory=3GiB \
    --subnets=projects/PROJECT_ID/regions/us-central1/subnetworks/\
default
```

## Options / Props

### When to choose which

| Choose Pub/Sub when | Choose Managed Service for Apache Kafka when |
|---|---|
| You prioritize operational simplicity within Google Cloud. | Portability across cloud providers or on-premises is critical. |
| You need a scalable, serverless solution with minimal overhead. | You have existing Kafka workloads to migrate to Google Cloud. |
| Workload sizes are unpredictable or changing (also fine when stable). | Traffic volume is consistent without much variation. |
| You need per-message tracking (built-in dead-letter queues, out-of-order processing) so bad messages do not stall the pipeline. | You are willing to handle capacity management. |
| You need inter-region data aggregation. | You need message ordering at high throughput per key. |
| You need independent publisher and subscriber scaling. | You want event sourcing with an event log as the source of truth. |

### Based on the existing Kafka setup

| Situation | Recommendation |
|---|---|
| Already using Kafka, want a managed, secure, reliable solution | Managed Service for Apache Kafka. |
| Already running Kafka and willing to rewrite applications for a scalable, autoscaling, global service | Pub/Sub (see the Kafka to Pub/Sub migration guide). |
| New workloads or new to streaming on Google Cloud | Pub/Sub, for ease of use. |
| Move Kafka workloads with minimal code changes | Managed Service for Apache Kafka. |

### Feature comparison

| Feature | Pub/Sub | Managed Service for Apache Kafka |
|---|---|---|
| Ease of use | Easier to set up and maintain | Requires more operational effort |
| Cost model | Pay-for-use | Pay-for-capacity for compute; pay-for-use for networking and storage |
| Exactly once processing | Single simultaneous delivery and strong acknowledgement semantics | Exactly-once side effects when reading from one topic and writing to another |
| Scaling | Seamless auto scaling from KBs to GBs per second per topic, also for unpredictable workloads | Requires manual configuration |
| Ordered delivery | Ordering within keys; 1 MBps throughput per fine-grained ordering key | Ordering within partitions, up to the throughput capacity of a partition |
| Data retention | 31 days | Indefinite retention |
| End-to-end latency | Typically on the order of 100 milliseconds | Typically on the order of 10 milliseconds for well-behaved subscribers |
| Open source Kafka compatibility for lift and shift | No | Yes |
| IAM and security | Yes | Yes |
| Automatic network configuration | Yes | Yes |
| Multi-cloud: identical across clouds | No | Yes |
| Uptime SLA | Yes | Yes |
| Data plane SLA | Yes | Not at this time |
| Logging and monitoring | Yes | Yes |
| Partition rebalancing across brokers | Not applicable | Yes |
| Automatic capacity | Adjusts to incoming message rate and subscriber demand | Service manages VMs and storage; you control partitions and replication factor |
| Automatic storage management | Yes | Yes |
| Automatic software upgrades | Yes | Yes |
| Customer support | Yes | Yes |
| Kafka Connect Service | Not applicable | With user-provided Connect services |
| Schema support | Yes | With user-provided schema registry |
| Compatible with ksqlDB, KSQL | No | Yes |
| Support for OSS connectors | Yes for Kafka and Flink connectors | No |
| Integration with Data Lake and Data Warehouse | Yes | Yes |

## Notes

- Operational difference: with Managed Service for Apache Kafka you manage cluster size, the number of partitions per topic (too many wastes resources, too few overloads brokers) and replicas per partition. A Kafka deployment is tied to a region, so cross-region data movement happens outside the service.
- Pub/Sub is serverless and globally distributed, adjusts capacity per topic and subscription, and moves data across regions.
- Both integrate with Dataflow, BigQuery, Cloud Storage and more; Kafka integrates with a wider range of non-Google systems.
- Managed Service for Apache Kafka runs Apache Kafka; client properties follow upstream Apache Kafka. Pub/Sub is a separate service with its own API.
- Snippet taken from https://docs.cloud.google.com/pubsub/docs/publish-receive-messages-gcloud
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/managed-kafka/clusters/create (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/pubsub/docs/choose-pubsub-kafka (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [pubsub-basics.md](./pubsub-basics.md)
- [pubsub-lite-deprecation.md](./pubsub-lite-deprecation.md)
