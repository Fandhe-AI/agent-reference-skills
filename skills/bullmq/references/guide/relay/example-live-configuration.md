# BullMQ — Relay example: Live configuration and feature flags

Configuration and feature flags are published as retained messages so running instances apply changes at once and new instances get the current value when they subscribe.

## Signature / Usage

### Every instance

```typescript
import { Relay } from 'bullmq';

const relay = new Relay({ connection: { host: 'redis.internal', port: 6379 } });

let flags: FeatureFlags = DEFAULT_FLAGS;
let flagsGeneration = 0;

async function reloadFlags() {
  const generation = ++flagsGeneration;
  const loaded = await db.settings.get('feature-flags');
  // Ignore reads superseded by a message or a newer reload.
  if (generation === flagsGeneration) {
    flags = loaded;
  }
}

async function loadFlags() {
  let received = false;
  await relay.subscribe('config.feature-flags', message => {
    received = true;
    flagsGeneration++;
    flags = message.data as FeatureFlags;
  });
  // The retained value, if any, is delivered before subscribe() resolves.
  if (!received) {
    await reloadFlags();
  }
}

// Retained messages are not delivered again after a recovery.
relay.on('recovered', () => {
  void reloadFlags().catch(console.error);
});

await loadFlags();

export const isEnabled = (flag: keyof FeatureFlags) => flags[flag];
```

### Admin service

```typescript
const MONTH = 30 * 24 * 60 * 60 * 1000;

export async function setFlags(next: FeatureFlags) {
  await db.settings.set('feature-flags', next); // source of truth
  await relay.publish('config.feature-flags', next, { retain: MONTH });
}
```

### Republishing periodically

```typescript
await queue.upsertJobScheduler('republish-flags', {
  every: 24 * 60 * 60 * 1000,
});

new Worker(
  queue.name,
  async () => {
    const current = await db.settings.get('feature-flags');
    await relay.publish('config.feature-flags', current, { retain: MONTH });
  },
  { connection },
);
```

## Notes

- Scenario: an admin changes a feature flag or setting and every running instance must apply it within moments, without a restart; instances that start later must get the current value too. Subscribers to the exact topic receive the retained value before `subscribe()` resolves, then every change, atomically.
- Keep the database as the source of truth and the retained message as a fast, pushed copy; retained messages are not delivered again after a recovery, so reload on `'recovered'`. Use one topic per independent setting.
- To keep the retained value from expiring, republish it periodically, for example with a job scheduler (third snippet).
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/relay/examples/live-configuration.md (tag v6.7.6, fetched 2026-11-14). Official page: https://docs.bullmq.io/guide/relay/examples/live-configuration

### Ordering admin updates and periodic republishes

Adapted (not in the official docs): the periodic republish above reads the current value and publishes it later, so it can arrive after a newer admin update and move every subscriber (and the retained message) back to the older value. Carry a monotonically increasing version from the database in each message and let subscribers ignore anything that is not newer (`version` is a column you add to your own settings table; `db.settings.get` is the same placeholder used above).

```typescript
// Admin service and republisher: always publish the stored version.
const { version, value } = await db.settings.getVersioned('feature-flags');
await relay.publish(
  'config.feature-flags',
  { version, value },
  { retain: MONTH },
);

// Every instance: ignore messages that are not newer than what is applied.
let appliedVersion = 0;
await relay.subscribe('config.feature-flags', message => {
  const { version, value } = message.data as {
    version: number;
    value: FeatureFlags;
  };
  if (version > appliedVersion) {
    appliedVersion = version;
    flagsGeneration++;
    flags = value;
  }
});
```

- Adapted from the official example: the official snippets publish the bare flags object and do not order a republish against a concurrent admin update; the versioned envelope above is an addition (it replaces the message shape used in the snippets above, so use one shape consistently).

## Related

- [overview.md](./overview.md)
- [retained-messages.md](./retained-messages.md)
- [topics-and-patterns.md](./topics-and-patterns.md)
- [Example: live configuration (official, v6.7.6)](https://docs.bullmq.io/guide/relay/examples/live-configuration)
