# Retries

Controls the number of retry attempts when a function step throws an error. Each step within a function is retried independently.

## Signature / Usage

```ts
inngest.createFunction(
  {
    id: "import-data",
    triggers: { event: "app/data.import.requested" },
    retries: 3,
  },
  async ({ event, step, attempt }) => {
    await step.run("fetch-data", async () => {
      // Re-attempted up to 3 times if it throws
    });
  }
);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `retries` | `number` | `4` | Total retry attempts per step. Valid range: 0–20. Set to `0` to disable retries. |

### Handler `attempt` parameter

| Name | Type | Description |
|------|------|-------------|
| `attempt` | `number` | Zero-indexed counter of the current retry attempt. `0` on first run, `1` on first retry, etc. |

## Notes

- Retries apply per step, not per function run. A function with 3 steps, each configured to retry up to 3 times, can make up to 12 total attempts.
- Inngest uses exponential backoff between retries by default.
- When all retries are exhausted the function run is marked as **Failed** and `onFailure` is called if configured.
- Setting `retries: 0` means the step fails immediately on error with no retries.
- Step code should be **idempotent** — retrying the same step must not produce unintended side effects.

## Related

- [create-function](./create-function.md)
- [on-failure](./on-failure.md)
- [durable-execution](./durable-execution.md)
