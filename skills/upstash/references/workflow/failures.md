# Failures & Error Handling

Workflows fail when a step errors after exhausting all retries. Failure handling is configured via `failureFunction` on `serve()` or `failureUrl` (passed to `client.trigger()` in the TypeScript SDK since 1.0.0; the Python SDK keeps it on the `serve` decorator). Failed runs land in the Dead Letter Queue (DLQ).

## Signature / Usage

```typescript
// failureFunction (recommended)
export const { POST } = serve<string>(
  async (context) => {
    // workflow logic
  },
  {
    failureFunction: async ({ context, failStatus, failResponse, failHeaders, failStack }) => {
      console.error("Workflow failed:", failResponse)
      await notifyTeam(failStatus)
    },
  }
)

// failureUrl — external endpoint called even if the app is down
// TypeScript: pass it when triggering (since 1.0.0)
await client.trigger({
  url: "https://your-app.com/api/workflow",
  failureUrl: "https://your-failure-endpoint.com/callback",
})
```

```python
# Python: failureUrl stays on the serve decorator
@serve.post("/api/example", failureUrl="https://<YOUR-FAILURE-ENDPOINT>/...")
async def example(context: AsyncWorkflowContext[str]) -> None: ...
```

## Options / Props

**failureFunction arguments**

| Name | Type | Description |
|------|------|-------------|
| `context` | `WorkflowContext` | The workflow context at the time of failure |
| `failStatus` | `number` | HTTP status code of the failing response |
| `failResponse` | `string` | Response body of the failing step |
| `failHeaders` | `Record<string, string[]>` | Response headers of the failing step (type per `@upstash/workflow` v1.4.0 `src/types.ts`) |
| `failStack` | `string` | Failure stack trace (if available; TypeScript SDK) |

**DLQ recovery actions** (manual recovery of a run in the DLQ goes through the REST API, api-reference/dlq)

| Action | Description |
|--------|-------------|
| Resume | Continue from the failure point; successful step results are preserved. Use to retry only failed/pending steps |
| Restart | Start fresh; all previous step results are discarded. Use for a clean execution or when corrupted state may be the cause |
| Callback | Re-run the failure callback if initial delivery failed or the callback itself failed |

## Notes

- The `failureUrl` callback receives a JSON body including the original request details, retry count, HTTP status code, and a base64-encoded response body
- `failureFunction` may return a string, which is shown in workflow logs
- While a step waits for its next retry, it can be retried immediately from the console (Run a Step Now)
- In the DLQ, filter by Workflow URL or Workflow Run ID; request and response headers and bodies are kept for debugging
- Migration (0.x → 1.0.0): TypeScript `failureUrl` moved from `serve()` to `client.trigger()`
- `failureFunction` and `failureUrl` are mutually exclusive
- The official pages disagree on the Python argument name: `workflow/howto/failures` and `workflow/basics/serve/advanced` write `failureUrl=`, while `workflow/features/failureFunction/advanced` writes `failure_url=`. Which one the Python SDK accepts is not confirmed here
- Apply the same authorization check in `failureFunction` as in the workflow endpoint; failure functions are called independently and face the same security risks
- `failureUrl` is preferable when failure handling must work even if the app server is down

## Related

- [serve](./serve.md)
- [retries](./retries.md)
- [security](./security.md)
- [failure-callback](./failure-callback.md)
- [dlq](./dlq.md)
- [client-dlq](./client-dlq.md)
