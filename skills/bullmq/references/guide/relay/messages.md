# BullMQ — Relay: Publishing and subscribing

ペイロード、配信対象、順序、配信保証、リスナーの扱い、遅いサブスクライバー（`inboxMaxLength` / `'lag'`）、unsubscribe。

## Signature / Usage

Listener errors are emitted as `'error'` events and do not affect other listeners:

```typescript
relay.on('error', err => logger.error(err, 'relay listener failed'));

await relay.subscribe('orders.>', async message => {
  await audit.record(message.topic, message.data); // may throw
});
```

Detecting a node that falls behind:

```typescript
relay.on('lag', backlog => {
  metrics.gauge('relay.backlog', backlog);
  logger.warn({ backlog }, 'relay node is falling behind');
});
```

Handing real work to a queue from a listener:

```typescript
const reports = new Queue('reports', { connection });

await relay.subscribe('reports.*.requested', async message => {
  await reports.add('generate', message.data);
});
```

Unsubscribing:

```typescript
const subscription = await relay.subscribe('jobs.42.progress', onProgress);
// later
await subscription.unsubscribe();
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `maxMessageSize` | `524288` (512 KiB) | Max serialized payload in bytes; larger messages reject with `RelayError` (`DataTooLarge`). |
| `inboxMaxLength` | `10000` | Max unread messages kept per node; the oldest unread messages are dropped beyond it. |
| `lagThreshold` | `inboxMaxLength / 2` | A node with at least this many unread messages emits `'lag'` on every heartbeat. |

## Notes

- Payloads are serialized with `JSON.stringify`: `undefined` is published as `null`, `Date` objects arrive as ISO strings, class instances arrive as plain objects. Keep messages small: publish what changed and an id, and let receivers fetch anything big.
- A message goes to every subscription whose pattern matches, on every live node: each subscription gets its own copy (even if several of the same node match), each message once; the publishing node receives its own messages if it has a matching subscription; other namespaces never receive it. With `nodes: 0` nobody was listening and the message is gone (except a retained message).
- Order: messages published one after another by the same publisher (awaiting each `publish`) are delivered in that order; there is no ordering guarantee between concurrent publishes. Compare `mid` to detect stale updates (increasing within a namespace).
- Delivery: a message is written to the inboxes of the nodes subscribed at publish time, atomically. Brief disconnections are covered; removed nodes (lease expired) lose their messages; a node that cannot keep up loses its oldest messages; subscriptions only see what comes after them (except the topic's retained message). The Relay is not a log: when a message must be processed reliably and with retries, use a queue (queues process jobs at least once, so processors must tolerate duplicates).
- Listeners are called in delivery order but are not awaited: an `async` listener runs while the next messages are delivered, and slow `async` listeners pile up in memory.
- Publishers never wait for subscribers. The inbox limit is enforced on every heartbeat (and, on Redis, approximately on every publish), so the backlog may briefly exceed it. `'lag'` reports the post-trim backlog, not how many messages were lost.
- `unsubscribe()` stops delivery to that listener at once and removes the subscription from the datastore; it is safe to call more than once. Closing the relay removes all its subscriptions.
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/relay/messages.md (tag v6.7.6, fetched 2026-11-14). Official page: https://docs.bullmq.io/guide/relay/messages

## Related

- [retained-messages.md](./retained-messages.md)
- [nodes-and-failures.md](./nodes-and-failures.md)
- [reference.md](./reference.md)
