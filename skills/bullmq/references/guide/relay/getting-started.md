# BullMQ — Relay: Getting started

`Relay` インスタンスの作成（Redis / PostgreSQL）、subscribe / publish、close、namespace、エラー処理。

## Signature / Usage

### Creating a relay

Redis:

```typescript
import { Relay } from 'bullmq';

const relay = new Relay({
  connection: { host: 'localhost', port: 6379 },
});

await relay.waitUntilReady();
```

PostgreSQL:

```typescript
import { Relay, createPostgresRelayBackend } from 'bullmq';

const relay = new Relay({
  connection: {
    connectionString: 'postgres://user:password@localhost:5432/app',
    migrate: true, // or run the migrations yourself, see below
  },
  backend: createPostgresRelayBackend,
});

await relay.waitUntilReady();
```

### Subscribing

```typescript
const subscription = await relay.subscribe('orders.*.status', message => {
  console.log(message.topic); // 'orders.42.status'
  console.log(message.data); // { status: 'shipped' }
});
```

To stop receiving messages:

```typescript
await subscription.unsubscribe();
```

### Publishing

```typescript
const result = await relay.publish('orders.42.status', { status: 'shipped' });
// { mid: '1873', nodes: 3, endpoints: 5 }
```

### Closing

```typescript
process.on('SIGTERM', async () => {
  await worker.close();
  await relay.close();
});
```

### Namespaces

```typescript
const relay = new Relay({ connection, namespace: 'billing' });
```

### Errors

```typescript
relay.on('error', err => logger.error(err, 'relay error'));
```

## Options / Props

`RelayMessage` fields received by a listener:

| Field | Description |
| --- | --- |
| `topic` | The topic the message was published on. |
| `data` | The published value. |
| `mid` | Message id, unique and increasing within the namespace. |
| `ts` | Publish timestamp (ms since epoch). |
| `retained` | `true` when it is the topic's retained message. |

## Notes

- Create one `Relay` per process; it uses the same connection options as queues and workers and is safe to share. `waitUntilReady()` resolves once the node is registered and reading its inbox; `subscribe` and `publish` wait for it, so awaiting it is optional.
- On Redis the relay requires Redis 6.2 or newer (or a compatible server). On PostgreSQL it requires the `0004_relay` migration: run your migrations as usual after upgrading BullMQ, or pass `migrate: true`.
- If you supply an existing `pg.Pool`, set `max >= 2` (one connection for `LISTEN`, another for commands; allow one listener connection per relay sharing the pool). A pool configuration object can use `max: 1`, since its listener connects separately.
- `data` can be any JSON-serializable value. `publish` resolves with the number of nodes and subscriptions ("endpoints") the message was delivered to; `0` means nobody was listening. You can publish from a process that never subscribes.
- `close()` unregisters the node: its subscriptions stop receiving at once and no more messages are written to its inbox. Redis prunes subscription indexes in bounded batches; subsequent sweeps finish any remaining cleanup. A process that exits without closing is removed once its lease expires (30 seconds by default); on Redis, if it was the namespace's last node, the namespace expires by itself.
- Relays only exchange messages within the same namespace (`'default'` unless set). On Redis the `prefix` option (default `bull`) also applies, as for queues.
- `subscribe` and `publish` reject with a `RelayError` when the datastore refuses the operation (for example an invalid topic). Background problems (a listener throwing, the connection failing while reading the inbox) are emitted as `'error'` events.
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/relay/getting-started.md (tag v6.7.6, fetched 2026-11-14). Official page: https://docs.bullmq.io/guide/relay/getting-started

## Related

- [topics-and-patterns.md](./topics-and-patterns.md)
- [messages.md](./messages.md)
- [reference.md](./reference.md)
- [../postgresql-backend/postgresql-backend.md](../postgresql-backend/postgresql-backend.md)
