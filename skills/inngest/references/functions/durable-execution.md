# Durable Execution

Inngest's execution engine provides fault-tolerant, resumable function execution. Functions survive infrastructure outages, network failures, and timeouts by persisting state externally and re-executing with memoized step results.

## Signature / Usage

```ts
inngest.createFunction(
  { id: "process-order", triggers: { event: "orders/order.created" } },
  async ({ event, step }) => {
    // Step 1 executes, result is checkpointed
    const paymentResult = await step.run("charge-customer", async () => {
      return await chargeCard(event.data.cardId);
    });

    // Step 2 only runs after step 1 is committed
    await step.run("send-receipt", async () => {
      await sendEmail(event.data.email, paymentResult.chargeId);
    });
  }
);
```

## How It Works

### Step Memoization

Each execution pass of a function handler follows this sequence:

1. **Initial execution**: The handler runs until the first `step.*` call. The step executes, its result is persisted, and execution is interrupted.
2. **Re-execution**: The function handler re-runs from the top. Previously completed steps are **memoized** — their stored results are injected without re-running the step code.
3. **Continuation**: Execution advances to the next unexecuted step and repeats.

This means **the handler function runs multiple times** — once per step boundary. Code outside `step.run()` blocks runs on every re-execution.

### Fault Tolerance

| Scenario | Behavior |
|----------|----------|
| Step throws an error | Execution halts; step is retried per `retries` config |
| Infrastructure failure mid-step | Step is retried from scratch on recovery |
| Deployment during in-progress run | New code runs for new steps; completed steps use memoized results |

## Notes

- **Only place side effects inside `step.run()`**. Code outside steps re-executes on every function pass and must be side-effect free.
- Step identifiers (`step.run("my-step-id", ...)`) are hashed to look up memoized state. Stable, descriptive IDs are essential — changing an ID loses the memoized result.
- Completed steps are **never re-executed**, even across deployments.
- Parallel steps (`Promise.all` over multiple `step.run()`) execute concurrently; each is independently memoized.
- Adding new steps to a deployed function is safe — in-progress runs execute the new step when reached.

## Related

- [create-function](./create-function.md)
- [versioning](./versioning.md)
- [retries](./retries.md)
