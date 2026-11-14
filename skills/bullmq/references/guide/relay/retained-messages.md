# BullMQ — Relay: Retained messages

トピックの最後の値を一定時間保持し、新規サブスクライバーへ即時配信する retained message（`publish` の `retain` オプション）。

## Signature / Usage

```typescript
// Publisher: keep this value for 10 minutes.
await relay.publish('jobs.42.progress', 70, { retain: 10 * 60 * 1000 });

// A subscriber that joins later gets 70 at once, then every new update.
await relay.subscribe('jobs.42.progress', message => {
  console.log(message.data, message.retained); // 70 true, then 80 false…
});
```

## Options / Props

| Option | Type | Description |
| --- | --- | --- |
| `retain` | `number` (ms) | Duration the message is kept as the topic's retained message. Non-negative safe integer; omit or `0` to publish without retention. |

Typical retention:

| State | Typical retention |
| --- | --- |
| Progress of a running job | A bit more than the longest job (minutes to hours) |
| Result of a finished job | As long as users may open its page (hours) |
| Service status, configuration | Long (days), and republished whenever it changes |

## Notes

- The message replaces the topic's previous retained message and expires after `retain` ms. Publishing without `retain` delivers the message but does not change the retained one.
- A new subscription to an exact topic receives the retained message first, with `retained: true`; the subscription and the retained value are read in one atomic operation, so no update can fall in between. It is delivered to the listener before `subscribe()` resolves.
- Subscriptions with wildcards do not receive retained messages (a pattern like `jobs.*.progress` would otherwise receive the state of every job at once).
- When the value must outlive the retention, store it in your database and use the retained message as a cache in front of it.
- Retained messages are not delivered again when a node recovers its subscriptions after being removed: refresh state built from them on the `'recovered'` event. Delete one with `relay.deleteRetained(topic)`.
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/relay/retained-messages.md (tag v6.7.6, fetched 2026-11-14). Official page: https://docs.bullmq.io/guide/relay/retained-messages

## Related

- [messages.md](./messages.md)
- [nodes-and-failures.md](./nodes-and-failures.md)
- [reference.md](./reference.md)
