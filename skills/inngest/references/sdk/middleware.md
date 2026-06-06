# Middleware

Hooks into Inngest function execution at defined lifecycle points for cross-cutting concerns such as logging, dependency injection, observability, and serialization.

## Signature / Usage

```ts
import { Middleware } from "inngest";

class LoggingMiddleware extends Middleware.BaseMiddleware {
  id = "logging-middleware";

  onRunStart({ ctx }: Middleware.OnRunStartArgs) {
    console.log(`Run started: ${ctx.runId}`);
  }

  onRunComplete() {
    console.log("Run completed");
  }
}

const inngest = new Inngest({
  id: "my-app",
  middleware: [LoggingMiddleware],
});
```

### Factory function pattern (for configurable middleware)

```ts
export function createMyMiddleware(options: MyOptions) {
  return class extends Middleware.BaseMiddleware {
    id = "my-middleware";
    // access options here
  };
}

// Usage
middleware: [createMyMiddleware({ logLevel: "debug" })]
```

### Dependency injection pattern

```ts
class PrismaMiddleware extends Middleware.BaseMiddleware {
  id = "prisma";

  transformFunctionInput({ ctx }: Middleware.TransformFunctionInputArgs) {
    return { ctx: { ...ctx, db: prisma } };
  }
}
```

## Hook Reference

### Observable hooks (fire-and-forget, read-only)

| Hook | Description |
|------|-------------|
| `onRunStart` | First attempt only (attempt 0). |
| `onRunComplete` | Successful function completion. |
| `onRunError` | Function error; includes whether it is the final retry. |
| `onStepStart` | Before step execution (`run`/`sendEvent` only). |
| `onStepComplete` | After step success (not for memoized steps). |
| `onStepError` | Step failure with retry status. |
| `onMemoizationEnd` | After all memoized steps resolve. |

### Wrapping hooks (onion model — call `next()`)

| Hook | Description |
|------|-------------|
| `wrapRequest` | Wraps the entire HTTP request lifecycle. |
| `wrapFunctionHandler` | Wraps function execution. |
| `wrapStep` | Wraps all step types including memoized. |
| `wrapStepHandler` | Wraps `run`/`sendEvent` handler execution only. |
| `wrapSendEvent` | Wraps event transmission. |

### Transform hooks (return modified copy)

| Hook | Description |
|------|-------------|
| `transformFunctionInput` | Enrich the function context (dependency injection). |
| `transformStepInput` | Modify step options or input. |
| `transformSendEvent` | Alter events before transmission. |

### Type-only declarations

| Hook | Description |
|------|-------------|
| `functionOutputTransform` | Modify function return type (TypeScript only, no runtime). |
| `stepOutputTransform` | Modify step return type (TypeScript only, no runtime). |

### Static hook

| Hook | Description |
|------|-------------|
| `onRegister` | Runs once at middleware registration time (e.g. DB connection setup). |

## Notes

- A **fresh middleware instance** is created per request — instance properties (`this`) are safe to use for per-request state.
- Undefined hooks have **zero overhead** — the SDK skips them entirely.
- Errors thrown in observable hooks (`on*`) are caught and logged; they do not propagate to the run.
- Middleware can be registered at the **client level** (applies to all functions) or at the **function level** (single function only).
- Execution order: client middleware (registration order) → function middleware (registration order).
- `wrapStepHandler` runs on every failed attempt; `wrapStep` runs only after retries are exhausted.
- Steps inserted via `wrapStep` do not re-trigger the same middleware's `wrapStep` (prevents infinite loops).

## Related

- [Inngest Client](./inngest-client.md)
- [TypeScript Types](./typescript-types.md)
