# BullMQ — Relay: Nodes and failures

ノード（`Relay` インスタンス）の lease / heartbeat、障害時の挙動、`'recovered'` による復旧、sweep、graceful shutdown。

## Signature / Usage

Recovery:

```typescript
relay.on('recovered', () => {
  // Messages published while this node was gone were lost: resynchronize
  // any state built from them.
  localCache.clear();
});
```

Sweeping:

```typescript
relay.on('swept', nodeIds =>
  logger.info({ nodeIds }, 'removed dead relay nodes'),
);
```

Graceful shutdown:

```typescript
async function shutdown() {
  await worker.close();
  await relay.close();
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
```

## Options / Props

| Option | Default | Meaning |
| --- | --- | --- |
| `leaseDuration` | `30000` ms | How long the node stays registered without a heartbeat. |
| `heartbeatInterval` | `leaseDuration / 3` | How often the node renews its lease. |
| `sweepInterval` | `leaseDuration` | How often the node removes nodes whose lease expired. |

What happens when:

| Situation | Result |
| --- | --- |
| The connection drops for less than the lease | Messages published meanwhile wait in the inbox and are delivered on reconnection. |
| The process is paused or disconnected for longer than the lease | It stops receiving messages and is swept. When it comes back it recovers; the messages published meanwhile are lost. |
| The process crashes | It is swept once its lease expires. Its subscriptions are removed. |
| The process calls `close()` | It is removed at once, with its subscriptions and inbox. |
| Listeners can't keep up with the messages | The backlog grows, `'lag'` is emitted, and beyond `inboxMaxLength` the oldest unread messages are dropped. |
| The datastore is unreachable | `publish` and `subscribe` fail; heartbeats and inbox reads fail and are retried, and are reported as `'error'` events. |

## Notes

- Every `Relay` instance is a node with a unique id (`relay.nodeId`), its own inbox, read continuously on a dedicated connection. Once a node's lease expires, publishers stop writing to its inbox and any node may sweep it (remove the node with its subscriptions and inbox). Expiry uses the datastore's clock.
- A shorter lease detects dead nodes sooner at the cost of more heartbeats; a longer lease tolerates longer pauses (garbage collection, a busy event loop, a slow network). The options must be positive integer milliseconds, at most `2147483647`; the default heartbeat interval is rounded down, with a minimum of 1 ms.
- A node whose lease expired notices on its next heartbeat, registers again, restores all its subscriptions and emits `'recovered'` before delivering further inbox messages. Retained messages are not delivered again on recovery.
- Every node sweeps periodically, at most 100 expired nodes at a time, and emits `'swept'` with the ids it removed.
- `close()` stops the timers, interrupts the inbox read, unregisters the node and closes the connections the relay opened. Messages still in the inbox are dropped.
- A node uses two connections: one for commands and one for reading its inbox (a blocking read on Redis, `LISTEN` on PostgreSQL). Create one relay per process and share it.
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/relay/nodes-and-failures.md (tag v6.7.6, fetched 2026-11-14). Official page: https://docs.bullmq.io/guide/relay/nodes-and-failures

## Related

- [messages.md](./messages.md)
- [retained-messages.md](./retained-messages.md)
- [backends.md](./backends.md)
