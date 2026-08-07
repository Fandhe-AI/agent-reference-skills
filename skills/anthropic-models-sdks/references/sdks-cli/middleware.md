<!-- source: https://platform.claude.com/docs/en/cli-sdks-libraries/middleware / last verified: 2026-08-07 -->

# SDK middleware

Intercept and modify requests and responses in the Anthropic SDKs.

## Signature / Usage

The Anthropic SDKs provide a middleware (or interceptor) hook that lets you run code before a request is sent and after the response is received. Use middleware for cross-cutting concerns such as logging, custom retries, request annotation, and refusal fallback handling.

Each middleware is a function that receives the outgoing request and a `next` callable. Call `next` to forward the request to the rest of the chain, and return its response. Anything before the `next` call runs on the way out; anything after runs on the way back.

```python
def logging_middleware(request: APIRequest, call_next: CallNext) -> APIResponse[Any]:
    # Before the request
    print(f"-> {request.method} {request.url}")

    response = call_next(request)

    # After the request
    print(f"<- {response.status_code}")

    return response


client = Anthropic(middleware=[logging_middleware])
```

```typescript
import type { Middleware } from "@anthropic-ai/sdk";

const loggingMiddleware: Middleware = async (request, next, ctx) => {
  ctx.logger.debug("->", request.method, request.url);
  const response = await next(request);
  ctx.logger.debug("<-", response.status, request.url);
  return response;
};

const client = new Anthropic({ middleware: [loggingMiddleware] });
```

## Notes

- When multiple middleware are registered, they apply in the order given: the first middleware's "before" code runs first, and its "after" code runs last. Client-registered middleware runs before per-request middleware.
- In the Go SDK, repeated `option.WithMiddleware` calls concatenate (client first, then method). In the other SDKs, later array entries wrap inner ones.
- Each SDK also accepts a custom HTTP client (for proxy configuration, custom TLS, or connection pooling). Only one HTTP client is used per SDK client, and it receives requests after all middleware has run.
- The SDKs ship a built-in refusal-fallback middleware that automatically retries requests Claude declines on a fallback model. See `/docs/en/build-with-claude/refusals-and-fallback#client-side-fallback`.
- Supported in Python, TypeScript, C#, Go, Java, and PHP; Ruby uses a lambda-based middleware form.

## Related

- [CLI, SDKs, and libraries](./overview.md)
- [Python SDK](./sdk-python.md)
- [TypeScript SDK](./sdk-typescript.md)
- [Go SDK](./sdk-go.md)
