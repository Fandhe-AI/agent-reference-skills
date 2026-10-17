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
    failureFunction: async ({ context, failStatus, failResponse, failHeaders, failStack }) => {
      console.error("Workflow failed:", failResponse)
    },
  }
)
```

## Options / Props

All options are advanced (not required for regular use).

| Name | Type | Description |
|------|------|-------------|
| `failureFunction` | `async (args) => string \| void` | Called when the workflow fails after all retries. Receives `context`, `failStatus`, `failResponse`, `failHeaders`, `failStack` (stack trace, if available). |
| `failureUrl` | `string` | Python SDK only (`@serve.post(..., failureUrl=...)`). In the TypeScript SDK pass it to `client.trigger()`. |
| `retries` | `number` | Python SDK only (default 3). In the TypeScript SDK pass it to `client.trigger()`. |
| `middlewares` | `WorkflowMiddleware[]` | Middleware instances hooking workflow lifecycle and debug events, e.g. `[loggingMiddleware]` (`import { loggingMiddleware } from "@upstash/workflow"`). |
| `initialPayloadParser` | `(initialPayload) => T` | Custom parsing of the initial request payload; result is available as `context.requestPayload`. |
| `schema` | `z.ZodType` | TypeScript SDK only. Zod schema validating and parsing the initial payload (alternative to `initialPayloadParser`). |
| `url` | `string` | Full endpoint URL including route path. Use behind a proxy or local tunnel where `request.url` is unreachable. |
| `baseUrl` | `string` | Overrides only the base portion of the inferred URL. Env var `UPSTASH_WORKFLOW_URL` sets it globally. |
| `qstashClient` | `Client` | Custom QStash client instead of the one built from env vars. |
| `receiver` | `Receiver` | Custom `Receiver` for signature verification (default uses `QSTASH_CURRENT_SIGNING_KEY` / `QSTASH_NEXT_SIGNING_KEY`). |
| `env` | `object` | Credentials injected manually when `process.env` is unavailable; also exposed as `context.env`. |
| `disableTelemetry` | `boolean` | TypeScript SDK only. Disables anonymous telemetry; also set it on `client.trigger()`. |

## Notes

- Framework-specific imports: `@upstash/workflow/nextjs`, `/hono`, `/express`, `/h3` (Nuxt), `/cloudflare`
- Use `servePagesRouter()` for Next.js Pages Router
- Apply the same authorization check inside `failureFunction` as in the workflow endpoint itself
- `failureFunction` and `failureUrl` are mutually exclusive
- The official pages disagree on the Python argument name: `workflow/basics/serve/advanced` and `workflow/howto/failures` write `failureUrl=`, while `workflow/features/failureFunction/advanced` writes `failure_url=`. Which one the Python SDK accepts is not confirmed here
- Migration (0.x → 1.0.0): `retries` / `flowControl` / `retryDelay` / `failureUrl` moved from `serve` to `client.trigger()` in the TypeScript SDK (they stay on the `serve` decorator in the Python SDK); `verbose` and `onStepFinish` removed (use `middlewares`)

## Related

- [overview](./overview.md)
- [context](./context.md)
- [serve-many](./serve-many.md)
- [failures](./failures.md)
