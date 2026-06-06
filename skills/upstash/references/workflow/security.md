# Security

Upstash Workflow endpoints should be protected against unauthorized invocations. Two approaches are available: built-in signature verification (recommended) and custom authorization.

## Signature / Usage

```typescript
// Built-in: set env vars and the SDK verifies automatically
// QSTASH_CURRENT_SIGNING_KEY=...
// QSTASH_NEXT_SIGNING_KEY=...

// Built-in: explicit Receiver (when env vars are unavailable)
import { Receiver } from "@upstash/qstash"

export const { POST } = serve(
  async (context) => { /* ... */ },
  {
    receiver: new Receiver({
      currentSigningKey: "<QSTASH_CURRENT_SIGNING_KEY>",
      nextSigningKey:    "<QSTASH_NEXT_SIGNING_KEY>",
    }),
  }
)

// Custom authorization via request headers
export const { POST } = serve(
  async (context) => {
    const token = context.headers.get("authorization")?.split(" ")[1]
    if (!isValid(token)) {
      console.error("Authentication failed.")
      return  // bare return aborts the run; QStash stops retrying this message
    }
    // ... workflow steps
  },
  {
    failureFunction: async ({ context }) => {
      // Apply the same auth check here!
      const token = context.headers.get("authorization")?.split(" ")[1]
      if (!isValid(token)) return
      // ... handle failure
    },
  }
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `QSTASH_CURRENT_SIGNING_KEY` | env var | Current signing key from the Upstash dashboard |
| `QSTASH_NEXT_SIGNING_KEY` | env var | Next signing key for key rotation |
| `receiver` | `Receiver` | Explicit `Receiver` instance (overrides env vars) |

## Notes

- Built-in signature verification: every request from QStash includes an `Upstash-Signature` header; the SDK validates it automatically when signing keys are configured
- Custom authorization uses a bare `return` (per the official docs), not an HTTP error response: returning early from the `serve` handler aborts the run so no steps execute, and QStash stops retrying the message. Log the failure (`console.error`) for observability
- Custom authorization in the failure function is critical — failure functions are invoked independently and bypass the main workflow entry point
- Signing keys are available in the Upstash Console under the Workflow tab

## Related

- [serve](./serve.md)
- [failures](./failures.md)
