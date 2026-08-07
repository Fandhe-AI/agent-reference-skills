# Singleton

Ensures that only a single run of a function (or a set of functions scoped by a key expression) is running at a time. New matching events either skip or cancel the active run, depending on `mode`.

## Signature / Usage

```ts
export default inngest.createFunction(
  {
    id: "data-sync",
    triggers: { event: "data-sync.start" },
    singleton: {
      key: "event.data.user_id",
      mode: "cancel",
    },
  },
  async ({ event, step }) => {
    // Function body executes exclusively per user_id
  }
);
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` (CEL expression) | No | Scopes singleton behavior to a specific value (e.g. `event.data.user_id`); each unique value maintains its own exclusive-execution lock. |
| `mode` | `"skip"` \| `"cancel"` | Yes | `skip`: discard the incoming trigger while a run is active. `cancel`: terminate the active run and start the new one. |

## Notes

- Differs from concurrency: `concurrency: 1` limits individual step execution, while singleton ensures only one complete function run executes.
- Differs from rate limiting: rate limiting controls execution frequency over time; singleton prevents simultaneous runs.
- Differs from debounce: debounce delays and coalesces rapid events into one run after a quiet period; singleton enforces mutual exclusion at any moment for the key scope.
- Compatible with debounce, rate limiting, and throttling; incompatible with concurrency settings and batching.
- Skip behavior is maintained across retry attempts following failures.

## Related

- [Concurrency](./concurrency.md)
- [Rate Limiting](./rate-limiting.md)
- [Debounce](./debounce.md)
