# BullMQ — Relay

BullMQ 6.4.0 で追加された experimental のリアルタイムメッセージング機能。BullMQ が既に使っているデータストア（Redis または PostgreSQL）を介して、プロセス間でトピック単位のメッセージを publish / subscribe する。

## Signature / Usage

```typescript
import { Relay } from 'bullmq';

const relay = new Relay({ connection: { host: 'localhost', port: 6379 } });

// On any process:
await relay.subscribe('orders.*.status', message => {
  console.log(message.topic, message.data);
});

// On any other process:
await relay.publish('orders.42.status', { status: 'shipped' });
```

### How it compares

|                                | Queue             | `QueueEvents`            | Redis pub/sub         | Relay                                     |
| ------------------------------ | ----------------- | ------------------------ | --------------------- | ----------------------------------------- |
| Each message goes to           | One worker        | Every listener           | Every subscriber      | Every matching subscription               |
| What you can publish           | Jobs              | Queue events only        | Anything              | Anything (JSON)                           |
| Addressing                     | Queue name        | Queue name               | Channel or glob       | Topic keypaths with `*` and `>` wildcards |
| Process briefly disconnected   | Jobs wait         | Resumes from its last id | **Messages are lost** | Messages wait in its inbox                |
| Latest value for new listeners | –                 | –                        | –                     | Retained messages                         |
| Datastores                     | Redis, PostgreSQL | Redis, PostgreSQL        | Redis                 | Redis, PostgreSQL                         |

## Notes

- The Relay is **experimental**: its API may change in minor releases while it is being completed.
- Queues are for work (each job goes to exactly one worker, with retries, rate limits and persistence). The Relay tells other processes that something happened, or what the current state of something is: live job progress, real-time notifications, cache invalidation, live configuration, controlling workers, cancelling jobs on other workers (see the `example-*.md` pages).
- How it works: every process that creates a `Relay` is a node. A node registers itself in the datastore, keeps a lease alive with heartbeats and has its own inbox. On publish, the datastore finds every subscription whose pattern matches the topic and appends one entry to the inbox of each involved node; each node reads its inbox and calls the listeners.
- Routing logic (topic matching, subscriptions, leases, inboxes) runs in atomic Lua scripts on Redis and SQL functions on PostgreSQL, so every BullMQ runtime behaves the same.
- Inboxes are durable across brief disconnections; a node that stops renewing its lease is removed together with its subscriptions and inbox. Only nodes with a matching subscription are written to.
- Distinct from Redis `PUBLISH` / `SUBSCRIBE` (no inbox, messages lost while disconnected) and from `QueueEvents` (queue events only, Redis streams). Not related to the GraphQL client Relay.
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/relay/README.md (tag v6.7.6, fetched 2026-11-14). Introduced in v6.4.0 ("add support for reliable realtime messaging", https://github.com/taskforcesh/bullmq/releases/tag/v6.4.0).

## Related

- [getting-started.md](./getting-started.md)
- [topics-and-patterns.md](./topics-and-patterns.md)
- [nodes-and-failures.md](./nodes-and-failures.md)
- [backends.md](./backends.md)
- [relay-vs-kafka.md](./relay-vs-kafka.md)
