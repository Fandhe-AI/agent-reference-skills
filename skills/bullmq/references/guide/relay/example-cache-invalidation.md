# BullMQ — Relay example: Cache invalidation

各インスタンスのインメモリキャッシュを、更新時に publish したトピックで一斉に無効化する例。

## Signature / Usage

### Every instance

```typescript
import { LRUCache } from 'lru-cache';
import { Relay } from 'bullmq';

const relay = new Relay({ connection: { host: 'redis.internal', port: 6379 } });
const users = new LRUCache<string, User>({
  max: 10_000,
  ttl: 5 * 60 * 1000,
});
let generation = 0;

await relay.subscribe('cache.users.*', message => {
  // topic: cache.users.<id>
  generation++;
  users.delete(message.topic.split('.')[2]);
});

// The node was swept (frozen or disconnected for longer than its lease):
// invalidations may have been missed, so start over.
relay.on('recovered', () => {
  generation++;
  users.clear();
});

export async function getUser(id: string): Promise<User> {
  let user = users.get(id);
  if (!user) {
    const readGeneration = generation;
    user = await db.users.findById(id);
    if (readGeneration === generation) {
      users.set(id, user);
    }
  }
  return user;
}
```

### When updating

```typescript
export async function updateUser(id: string, changes: Partial<User>) {
  await db.users.update(id, changes);
  // After the commit, so no instance reloads the old value.
  await relay.publish(`cache.users.${id}`, null);
}
```

## Notes

- Scenario: each service instance keeps an in-memory cache and every instance must drop an entry when it changes. Every instance subscribes once at startup; the updating code publishes after the change is committed (the publisher has a matching subscription too, so it drops its own entry the same way).
- The `'recovered'` event tells an instance that was gone longer than its lease that invalidations may have been missed, so it clears the cache; with plain pub/sub missed invalidations go unnoticed.
- Publish after the transaction commits, never before. Use one topic segment per kind of entry. For data that changes very often an expiry on the cache entries is simpler. Choose a cache TTL that bounds staleness if an invalidation is missed.
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/relay/examples/cache-invalidation.md (tag v6.7.6, fetched 2026-11-14). Official page: https://docs.bullmq.io/guide/relay/examples/cache-invalidation

## Related

- [overview.md](./overview.md)
- [retained-messages.md](./retained-messages.md)
- [topics-and-patterns.md](./topics-and-patterns.md)
