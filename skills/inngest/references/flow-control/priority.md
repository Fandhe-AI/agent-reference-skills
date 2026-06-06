# Priority

Dynamically adjusts the execution order of function runs based on event data. Higher-priority runs are moved ahead of existing queued jobs without requiring a separate queue.

## Signature / Usage

```ts
export default inngest.createFunction(
  {
    id: "ai-generate-summary",
    priority: {
      run: "event.data.account_type == 'enterprise' ? 120 : 0",
    },
  },
  async ({ event, step }) => { /* handler */ }
);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `run` | `string` (CEL expression) | Expression evaluated per run. Returns a numeric offset in seconds. Positive = move ahead; negative = delay. Range: -600 to 600. |

## Notes

- All runs default to a priority factor of `0` (current time).
- A factor of `+120` places the run ~2 minutes ahead of jobs queued at the same time.
- A factor of `-120` delays the run ~2 minutes behind current queue position.
- Priority is most effective when concurrency limits create a backlog of waiting runs.
- Incompatible with event batching.

## Related

- [Concurrency](./concurrency.md)
- [Throttling](./throttling.md)
