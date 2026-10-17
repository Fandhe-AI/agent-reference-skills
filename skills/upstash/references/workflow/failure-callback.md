# Failure Function (failureFunction / failureUrl)

Custom logic that runs when a workflow run fails after exhausting all retries, before the run moves to the Dead Letter Queue (DLQ).

## Signature / Usage

```typescript
import { serve } from "@upstash/workflow/nextjs";

export const { POST } = serve<string>(
  async (context) => {
    // Your workflow logic...
  },
  {
    failureFunction: async ({
      context,
      failStatus,
      failResponse,
      failHeaders,
    }) => {
      // Log error to monitoring system
      await logToSentry(...);
      // Send alert to team
      await sendSlackAlert(...);
      // Perform cleanup operations
      await cleanupWorkflowResources(...);
    },
  }
)
```

## Options / Props

### failureFunction parameters

| Name | Type | Description |
|------|------|-------------|
| `context` | object | Workflow context exposing run properties (below; methods such as `run` are omitted) |
| `failStatus` | number | HTTP status code returned by the failed workflow step |
| `failResponse` | string | Response body returned by the failed workflow step |
| `failHeaders` | `Record<string, string[]>` | Response headers returned by the failed workflow step |
| `failStack` | string | Failure stack trace (TypeScript SDK) |

### context fields

| Name | Type | Description |
|------|------|-------------|
| `workflowRunId` | string | ID of the failed workflow run |
| `url` | string | Publicly accessible workflow endpoint URL |
| `requestPayload` | `TInitialPayload` | Original request payload that triggered the workflow |
| `headers` | `Headers` | Original request headers |
| `env` | `Record<string, string \| undefined>` | Environment variables |

### failureUrl (advanced)

`failureUrl` sends the failure callback to a different endpoint instead of the workflow endpoint, for handling failures on separate infrastructure.

```typescript
import { Client } from "@upstash/workflow";

const client = new Client({ token: "<QSTASH_TOKEN>" })

const { workflowRunId } = await client.trigger({
  url: "https://<YOUR_WORKFLOW_URL>/workflow",
  failureUrl: "https://<YOUR_FAILURE_URL>/workflow-failure"
})
```

```python
@serve.post("/api/example", failure_url="https://<YOUR_FAILURE_URL>/workflow-failure")
async def example(context: AsyncWorkflowContext[str]) -> None:
    # Your workflow logic...
    pass
```

### Reliability

If the failure function itself throws, it is retried according to the workflow run's retry configuration. If all retries fail, the failure function execution is marked as failed. Such runs can be filtered by failure function state in the DLQ dashboard and retried there, or programmatically:

```typescript
import { Client } from "@upstash/workflow";

const client = new Client({ token: "<QSTASH_TOKEN>" });

const response = await client.dlq.retryFailureFunction({
  dlqId: "dlq-12345" // The ID of the DLQ message to retry
});
```

## Notes

- You cannot create new workflow steps inside `failureFunction` using `context`; the context only exposes run properties. Think of it as a single `context.run` step that executes once
- If you secure the workflow endpoint with custom authorization, add authorization to `failureFunction` too; otherwise anyone could invoke it
- `failureFunction` and `failureUrl` are mutually exclusive. `failureFunction` is the better choice for most users: it runs alongside the workflow with the same context and dependencies, is retried automatically on failure, and can be retried manually via the DLQ
- The official pages disagree on the Python argument name: this page's source (`workflow/features/failureFunction/advanced`) writes `failure_url=`, while `workflow/basics/serve/advanced` and `workflow/howto/failures` write `failureUrl=`. Which one the Python SDK accepts is not confirmed here
- Types in the tables follow the `@upstash/workflow` v1.4.0 SDK sources (`src/types.ts` `failureFunction`, `src/context/context.ts`). The official parameter docs list `failResponse` / `failHeaders` as `number` and `requestPayload` / `headers` / `env` as `string`, which do not match the SDK
- The original `failureUrl` example omits the comma after the `url` property; added here so the snippet is valid
- Source: fetched 2026-10 from https://upstash.com/docs/workflow/features/failure-callback (also `features/failureFunction/advanced` and `features/failureFunction/reliability`); types from https://github.com/upstash/workflow-js/blob/v1.4.0/src/types.ts and https://github.com/upstash/workflow-js/blob/v1.4.0/src/context/context.ts

## Related

- [failures](./failures.md)
- [dlq](./dlq.md)
- [client-dlq](./client-dlq.md)
- [security](./security.md)
- [serve](./serve.md)
