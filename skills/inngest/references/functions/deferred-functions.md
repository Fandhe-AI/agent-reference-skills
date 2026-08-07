# Deferred Functions

A deferred function runs in the background as a fire-and-forget side effect of another run, launched via `defer(id, { function, data })` from inside a parent handler. The parent never waits for or sees a result. Beta, TypeScript SDK only.

## Signature / Usage

```ts
import { createDefer } from "inngest/experimental";
import { z } from "zod";

export const sendEmail = createDefer(
  inngest,
  {
    id: "send-email",
    schema: z.object({ to: z.string(), body: z.string() }),
    concurrency: { limit: 5 },
  },
  async ({ event, step }) => {
    event.data.to; // typed from `schema`
  }
);

// register alongside other functions
serve({ client: inngest, functions: [...myFunctions, sendEmail] });

// trigger from a parent function
export default inngest.createFunction(
  { id: "order-placed", triggers: { event: "order/placed" } },
  async ({ event, defer }) => {
    defer("send-confirmation", {
      function: sendEmail,
      data: { to: event.data.email, body: "Thanks for your order!" },
    });
  }
);
```

## Options / Props

### `createDefer(client, options, handler)`

| Name | Type | Description |
|------|------|-------------|
| `schema` | schema object (e.g. `zod`) | Types and validates the payload passed via `defer(...)`, both at the call site and on the receiver side. |

Accepts the same options as `inngest.createFunction` (`concurrency`, `throttle`, `rateLimit`, etc.) except `triggers`, `onFailure`, and `batchEvents`.

### `defer(id, { function, data, experiment? })`

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique ID within the parent run. Duplicates are skipped and logged (no implicit dedupe index, unlike step IDs). |
| `function` | deferred function | Must be created with `createDefer`. |
| `data` | typed by `schema` | Payload for the deferred run; falls back to `Record<string, any>` without a schema. |
| `experiment` | experiment ref (optional) | Attributes the deferred run (e.g. an LLM scorer) to the experiment variant that produced the scored output. |

Returns a handle with `abort()` to cancel the deferred run before it starts.

## Notes

- Comparison with other cross-function tools: `step.invoke()` awaits and returns a result (caller blocks); `step.sendEvent()` fans out to any matching listeners with no result; `defer()` targets one typed function, no result, runs independently.
- `defer(...)` is synchronous and fire-and-forget. The deferred run is enqueued only when the parent run finalizes, not at the moment `defer` is called.
- Call-site errors (e.g. a synchronous schema failure, or passing a function not created with `createDefer`) are logged and silently skipped — the parent run is unaffected. Receiver-side errors fail only the deferred run: a schema mismatch fails without retries, other handler errors use normal retry semantics.
- Multiple parent functions can hold a reference to the same deferred function; each `defer(...)` call is an independent run with its own retries, concurrency, and step state.
- `handle.abort()` is synchronous, fire-and-forget, and idempotent; aborting twice or aborting a skipped call is logged and ignored. Calling it inside `step.run()` is retry-safe since the abort ships with the step's result.
- Does not yet work with encryption middleware — avoid passing encrypted data through `defer(...)`.
- The deferred handler can read the triggering run's identity via `ctx.parents` (`{ fnSlug, runId }`), without any explicit wiring.

## Related

- [create-function](./create-function.md)
- [durable-execution](./durable-execution.md)
