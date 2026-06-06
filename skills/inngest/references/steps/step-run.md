# step.run

Executes a retriable code block as a durable step. Each call is independently memoized and retried on failure.

## Signature / Usage

```ts
step.run(id: string, handler: () => T | Promise<T>): Promise<T>
```

```ts
const user = await step.run("fetch-user", async () => {
  return db.users.findOne({ id: event.data.userId });
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique step identifier used in logs and for memoizing state across function versions |
| `handler` | `() => T \| Promise<T>` | Sync or async function to execute; throwing triggers a retry |

## Notes

- Return values are JSON-serialized; `Date`, `ObjectId`, and similar types are converted to their JSON representations
- Each `step.run()` has its own independent retry counter — with `retries: 4`, every step gets up to 5 total attempts
- Non-deterministic logic (API calls, DB queries, random values) must live inside `step.run()` because the function is re-entered from the top for every step
- The function is re-executed from the beginning on each re-entry; completed steps are skipped by injecting the memoized result
- Maximum 1,000 steps per function run
- For parallel execution, do not `await` before collecting with `Promise.all()`

## Related

- [Parallel Steps](./parallel-steps.md)
- [Error Handling & Retries](./error-handling.md)
- [step.invoke](./step-invoke.md)
