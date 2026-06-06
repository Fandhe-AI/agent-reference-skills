# Failures & Error Handling

Workflows fail when a step errors after exhausting all retries. Failure handling is configured via `failureFunction` or `failureUrl` on `serve()`. Failed runs land in the Dead Letter Queue (DLQ).

## Signature / Usage

```typescript
// failureFunction (recommended)
export const { POST } = serve<string>(
  async (context) => {
    // workflow logic
  },
  {
    failureFunction: async ({ context, failStatus, failResponse, failHeaders }) => {
      console.error("Workflow failed:", failResponse)
      await notifyTeam(failStatus)
    },
  }
)

// failureUrl — external endpoint called even if the app is down
export const { POST } = serve<string>(
  async (context) => {
    // workflow logic
  },
  {
    failureUrl: "https://your-failure-endpoint.com/callback",
  }
)
```

## Options / Props

### failureFunction arguments

| Name | Type | Description |
|------|------|-------------|
| `context` | `WorkflowContext` | The workflow context at the time of failure |
| `failStatus` | `number` | HTTP status code of the failing response |
| `failResponse` | `string` | Response body of the failing step |
| `failHeaders` | `Headers` | Response headers of the failing step |

### failureUrl callback payload

The external endpoint receives a JSON body including the original request details, retry count, HTTP status code, and a base64-encoded response body.

## DLQ Recovery Options

| Action | Description |
|--------|-------------|
| Resume | Continue from the failure point; successful step results are preserved |
| Restart | Start fresh; all previous step results are discarded |
| Callback | Re-run the failure callback if initial delivery failed |

## Notes

- `failureFunction` and `failureUrl` are mutually exclusive
- Apply the same authorization check in `failureFunction` as in the workflow endpoint; failure functions are called independently and face the same security risks
- `failureUrl` is preferable when failure handling must work even if the app server is down

## Related

- [serve](./serve.md)
- [retries](./retries.md)
- [security](./security.md)
