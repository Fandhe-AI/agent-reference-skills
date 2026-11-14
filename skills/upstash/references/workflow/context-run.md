# context.run()

Executes custom business logic as a named workflow step. Returns a Promise resolving to any JSON-serializable value.

## Signature / Usage

```typescript
const result = await context.run("step-name", async () => {
  return someWork(input)
})

// Parallel execution
const [r1, r2] = await Promise.all([
  context.run("step-1", async () => fetchA()),
  context.run("step-2", async () => fetchB()),
])
```

```typescript
// Step-level flow control and retries (third argument)
await context.run(
  "charge customer",
  () => chargeCustomer("customer-id"),
  {
    flowControl: { key: "payment-provider", parallelism: 3 },
    retries: 5,
    retryDelay: "1000",
  }
);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `stepName` | `string` | Unique identifier for the step within this workflow |
| `stepFunction` | `() => Promise<T>` | Business logic to execute; must return a JSON-serializable value |
| `options` | `object` (optional) | Flow control and retry configuration for this step only; unset fields fall back to the configuration the run was triggered with |
| `options.flowControl` | `object` | `key`, `rate`, `parallelism`, `period` (same shape as in `client.trigger`); replaces the run's flow control for this step |
| `options.retries` | `number` | How many times the step is retried when it fails |
| `options.retryDelay` | `string` | Delay between retries in ms; supports expressions such as `"1000 * (1 + retried)"` |

## Notes

- Returned values are automatically serialized and restored across workflow executions; once a step succeeds it is never re-run
- Do not return stateful resources (database connections, file handles); return plain data instead
- Class instances deserialize as plain objects — restore methods with `Object.assign(new MyClass(), serialized)`
- All promises in a workflow must be awaited; unawaited promises can cause unexpected behavior
- Step-level `options` (third argument) arrived with `@upstash/workflow` 1.5.0 (step-level flow control and retries); see [flow-control](./flow-control.md) and [retries](./retries.md)
- Source: https://upstash.com/docs/workflow/steps/run (fetched 2026-11-14; no version pin on the site)
- Source: https://github.com/upstash/workflow-js/releases (release notes, checked 2026-11-14)

## Related

- [context](./context.md)
- [parallel-steps](./parallel-steps.md)
