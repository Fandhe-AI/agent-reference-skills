# serve()

Establishes an HTTP endpoint that executes a workflow. Accepts a route function defining workflow steps and an optional configuration object.

## Signature / Usage

```typescript
import { serve } from "@upstash/workflow/nextjs"  // or /hono, /express, /h3, etc.

export const { POST } = serve<TPayload>(
  async (context) => {
    await context.run("step-name", async () => {
      // step logic
    })
  },
  {
    failureFunction: async ({ context, failStatus, failResponse, failHeaders }) => {
      console.error("Workflow failed:", failResponse)
    },
    failureUrl: "https://your-failure-endpoint.com/callback",
  }
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `failureFunction` | `async (args) => string \| void` | Called when the workflow fails after all retries. Receives `context`, `failStatus`, `failResponse`, `failHeaders`. |
| `failureUrl` | `string` | External endpoint called on failure. Works even when the app is down. |
| `receiver` | `Receiver` | Custom `Receiver` instance for signature verification when env vars can't be used. |

## Notes

- Framework-specific imports: `@upstash/workflow/nextjs`, `/hono`, `/express`, `/h3` (Nuxt), `/cloudflare`
- Use `servePagesRouter()` for Next.js Pages Router
- Apply the same authorization check inside `failureFunction` as in the workflow endpoint itself
- `failureFunction` and `failureUrl` are mutually exclusive

## Related

- [overview](./overview.md)
- [context](./context.md)
- [serve-many](./serve-many.md)
- [failures](./failures.md)
