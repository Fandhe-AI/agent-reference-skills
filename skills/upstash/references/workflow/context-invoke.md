# context.invoke()

Launches another workflow and pauses the calling workflow until the invoked workflow finishes (success, failure, or cancellation). Requires both workflows to be registered in the same `serveMany` route.

## Signature / Usage

```typescript
import { createWorkflow, serveMany } from "@upstash/workflow/nextjs"

const childWorkflow = createWorkflow(async (context) => {
  return await context.run("child-step", () => doWork())
})

const parentWorkflow = createWorkflow(async (context) => {
  const { body, isFailed, isCanceled } = await context.invoke(
    "invoke-child",
    {
      workflow: childWorkflow,
      body: "input-data",
      retries: 3,
    }
  )
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `stepName` | `string` | Unique step identifier |
| `workflow` | `WorkflowObject` | The target workflow created with `createWorkflow()` |
| `body` | `string` | Payload passed as `context.requestPayload` to the invoked workflow; `JSON.stringify` objects yourself (`stringifyBody` removed in 1.0.0) |
| `headers` | `object` | HTTP headers forwarded to the invoked workflow |
| `workflowRunId` | `string` | Custom run ID (auto-generated if omitted, prefixed with `wfr_`) |
| `retries` | `number` | Retry attempts on failure; default: 3 |
| `retryDelay` | `number \| string` | Delay between retries |
| `flowControl` | `object` | Rate limiting and concurrency controls |
| `label` | `string \| string[]` | Label(s) for the invoked run (multiple labels supported since June 2026) |

### Response

| Field | Type | Description |
|-------|------|-------------|
| `body` | `TReturn` | Return value from the invoked workflow |
| `isFailed` | `boolean` | Whether the invoked workflow failed |
| `isCanceled` | `boolean` | Whether the invoked workflow was canceled |

## Notes

- Workflows can only invoke other workflows served together in the same `serveMany` definition
- Use `createWorkflow()` (not `serve()`) for workflows intended to be invoked
- Migration (0.x → 1.0.0): `stringifyBody` removed; `body` must be a string, e.g. `body: JSON.stringify({ key: "value" })`

## Related

- [context](./context.md)
- [serve-many](./serve-many.md)
