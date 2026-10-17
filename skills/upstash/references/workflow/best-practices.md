# Best Practices

Rules for writing Upstash Workflow endpoints. The endpoint is called many times per workflow run, so code outside `context.run` must be deterministic and steps must be safe to retry.

## Signature / Usage

```typescript
export const { POST } = serve<string>(async (context) => {
  const input = context.requestPayload

  // Return step results instead of assigning to outer variables
  const result = await context.run("step-1", async () => {
    return await someWork(input)
  })

  console.log("This log will appear multiple times")

  await context.run("step-2", async () => {
    console.log("This log will appear just once")
    await someOtherWork(result)
  })
})
```

### Rules

| Rule | Detail |
|------|--------|
| Execute business logic in `context.run` | The endpoint runs many times per workflow run; only code inside a step runs exactly once. Code outside `context.run` only connects steps |
| Return results from `context.run` | A variable assigned inside a step is uninitialized on the next call. Return the value and use the returned result |
| Avoid non-deterministic code outside `context.run` | Database reads, `Date.now()`, and randomness outside a step can cause `Failed to authenticate Workflow request.` if you `return` based on them before any step. Wrap them in `context.run` |
| Ensure idempotency in `context.run` | Steps can be retried (e.g. connection lost before the response). Running a step twice must have the same effect as running it once |
| Keep within hard limits | At most 1,000 steps and 100 MB context per workflow run; limits do not vary by plan. Context size is the workflow input plus all completed step results |
| Do not nest context methods | Never call `context.run`, `context.sleep`, `context.sleepFor`, or `context.call` inside another `context.run` |
| Include at least one step | A workflow without any `context.run` fails with `Failed to authenticate Workflow request.`; even placeholders need a dummy step |
| Avoid `Promise.any` | `Promise.all` works for parallel steps; `Promise.any` is not supported for workflow steps |

### Split large workflows with context.invoke

Separate logic into multiple workflows and connect them with `context.invoke`. Only the invoked workflow's final output is added to the parent context as one step result; its intermediate step results are not.

```typescript
const processBatch = createWorkflow(
  async (context: WorkflowContext<BatchInput>) => {
    const validatedItems = await context.run("validate items", () => {
      return context.requestPayload.itemIds.filter((itemId) => itemId.length > 0)
    })
    const processedItems = await context.run("process items", () => {
      return validatedItems.map((itemId) => ({ itemId, processed: true }))
    })
    // Only this final output is transferred to the parent workflow.
    return { processedCount: processedItems.length }
  }
)

const parentWorkflow = createWorkflow(
  async (context: WorkflowContext<BatchInput>) => {
    const { body, isFailed, isCanceled } = await context.invoke("process batch", {
      workflow: processBatch,
      body: JSON.stringify(context.requestPayload),
    })
    if (isFailed || isCanceled) {
      throw new Error("The batch workflow did not complete successfully")
    }
    return body
  }
)

export const { POST } = serveMany({
  parent: parentWorkflow,
  "process-batch": processBatch,
})
```

## Notes

- Non-idempotent code outside a step (e.g. `getResultFromDb(entryId)`) must move inside `context.run("get-result-from-db", ...)` before branching or returning on its result
- Since 1.0.0 the `context.invoke` `body` is a string (`stringifyBody` was removed; use `JSON.stringify()`, see migrations); the original workflow-limits example passes the object directly (old form)
- Source: fetched 2026-10 from https://upstash.com/docs/workflow/basics/best-practices/overview (and sibling pages under `basics/best-practices/`)
- The original docs show each rule in both TypeScript and Python; the same rules apply to the Python SDK (`context.run("step-1", _step_1)` with an async function)

## Related

- [how-it-works](./how-it-works.md)
- [context-run](./context-run.md)
- [context-invoke](./context-invoke.md)
- [parallel-steps](./parallel-steps.md)
- [serve-many](./serve-many.md)
