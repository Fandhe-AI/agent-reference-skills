# BullMQ — Relay: Relay compared to Kafka

Relay（アプリ内プロセス間のライブメッセージング）と Kafka（永続・再生可能なイベントログ）の比較と使い分け。

## Signature / Usage

Adapted (not in the official docs): minimal sketch of the division of roles described on the official page (queue for work, Relay for live signals); topic and queue names are illustrative.

```typescript
import { Queue, Relay } from 'bullmq';

const connection = { host: 'localhost', port: 6379 };
const relay = new Relay({ connection });
const queue = new Queue('exports', { connection });

// Work that must be processed reliably, with retries: a queue.
await queue.add('export', { reportId: 42 });

// A small live signal that is only useful now: the Relay.
await relay.publish('jobs.exports.cancel', { jobId: '1', reason: 'cancelled by user' });
```

## Options / Props

| | Kafka | Relay |
| --- | --- | --- |
| Model | An append-only, partitioned log. Consumers pull by offset. | Live messages, pushed into the inbox of each interested node. |
| Who gets a message | One consumer per consumer group; several groups can each read it. | Every matching subscription (fan-out). For exactly one consumer, use a BullMQ queue. |
| History and replay | Yes. Messages are kept for a retention period, and can be re-read from any offset. | No. A subscription only sees what is published after it. Retained messages keep the latest value of a topic. |
| Durability | Replicated to disk; survives broker and consumer failures. | Survives a node's brief disconnections. A node removed after missing its lease loses its pending messages. |
| Topics | Heavyweight: created up front and partitioned; usually a limited number. | Free and fine-grained: one per job, user or resource. They only cost anything while someone subscribes. |
| Wildcards | Regex subscriptions to topic names. | Hierarchical patterns (`tenants.acme.>`, `jobs.*.cancel`), resolved by the datastore on every publish. |
| Ordering | Total order per partition (by key). | Per publisher: messages published one after another arrive in that order. |
| Delivery guarantees | At-least-once by default; exactly-once with idempotent producers and transactions. | Once per subscription while the node is alive; no replay. |
| Throughput | Very high; scales horizontally with partitions and brokers. | Bounded by one Redis slot or one PostgreSQL database per namespace: suited to control and notification traffic, not bulk data. |
| Infrastructure | A separate cluster, operated as its own system. | Nothing beyond what BullMQ already uses. |
| Liveness | Consumer group membership and rebalancing. | Node leases: dead nodes are removed with their subscriptions. |

## Notes

- Mapping to BullMQ: consumer-group semantics (each message processed once, with retries) are BullMQ queues (delays, priorities, per-job retries with backoff, rate limits, flows); fan-out to live processes is the Relay; a compacted topic (latest value per key) is roughly a retained message; a replayable log has no equivalent by design.
- Use Kafka for event sourcing, analytics and ETL, change data capture, many independent consumers that each process the full history, very high volumes. Use the Relay for small, targeted signals that are only useful now (cancel this job, show this progress, invalidate this cache entry, apply this configuration, notify this user). They work well together.
- Kafka here is a comparison only; this skill does not cover Kafka.
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/relay/relay-vs-kafka.md (tag v6.7.6, fetched 2026-11-14). Official page: https://docs.bullmq.io/guide/relay/relay-vs-kafka

## Related

- [overview.md](./overview.md)
- [retained-messages.md](./retained-messages.md)
- [messages.md](./messages.md)
