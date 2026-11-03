---
source: https://developers.cloudflare.com/workers/observability/traces/custom-spans/
---

# Custom spans

Custom spans extend Workers' automatic tracing to your own application logic. They nest automatically with built-in instrumentation. Available as `import { tracing } from "cloudflare:workers"` (works anywhere) or `ctx.tracing` (on the handler's `ExecutionContext`); both behave identically.

## Signature / Usage

Requires tracing enabled:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "observability": {
    "traces": {
      "enabled": true
    }
  }
}
```

```toml
[observability.traces]
enabled = true
```

Create a span with `enterSpan`:

```ts
import { tracing } from "cloudflare:workers";

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		// Using the import
		return tracing.enterSpan("handleRequest", async (span) => {
			span.setAttribute("url.path", new URL(request.url).pathname);

			const user = await ctx.tracing.enterSpan("auth", async () => {
				// Using ctx.tracing
				return authenticate(request, env);
			});

			return buildResponse(user);
		});
	},
};
```

Full type declarations:

```ts
declare module "cloudflare:workers" {
	namespace tracing {
		function enterSpan<T, A extends unknown[]>(
			name: string,
			callback: (span: Span, ...args: A) => T,
			...args: A
		): T;

		function startActiveSpan<T, A extends unknown[]>(
			name: string,
			callback: (span: Span, ...args: A) => T,
			...args: A
		): T;

		function startSpan(name: string): Span;

		function getActiveSpan(): Span | undefined;
	}

	type Exception =
		| string
		| { code: string | number; name?: string; message?: string; stack?: string }
		| { code?: string | number; name: string; message?: string; stack?: string }
		| { code?: string | number; name?: string; message: string; stack?: string };

	type SpanStatus = {
		code: "unset" | "ok" | "error";
		/** A developer-facing error message. Ignored unless code is "error". */
		message?: string;
	};

	type SpanContext = {
		traceId: string;
		spanId: string;
		traceFlags: number;
	};

	class Span {
		readonly isTraced: boolean;
		setAttribute(key: string, value: string | number | boolean): this;
		setAttributes(
			attributes: Record<string, string | number | boolean | undefined>,
		): this;
		recordException(exception: Exception): void;
		setStatus(status: SpanStatus): this;
		updateName(name: string): this;
		spanContext(): SpanContext;
		end(): void;
	}
}
```

`enterSpan` examples (sync, async, forwarded arguments):

```ts
// Synchronous callback — span ends when the function returns
const result = tracing.enterSpan("parse", (span) => {
	span.setAttribute("format", "json");
	return JSON.parse(body);
});

// Async callback — span ends when the promise settles
const data = await tracing.enterSpan("fetchData", async (span) => {
	const res = await fetch("https://api.example.com/data");
	span.setAttribute("http.response.status_code", res.status);
	return res.json();
});

// Forwarding arguments
const doubled = tracing.enterSpan("compute", (span, x) => x * 2, 21);
```

`startActiveSpan` for a stream pipeline:

```ts
import { tracing } from "cloudflare:workers";

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const body = request.body;
		if (!body) return new Response("No body", { status: 400 });

		// The span is active during the callback, so the pipeThrough
		// operation is correctly nested. The span stays open after
		// the callback returns, until flush() calls span.end().
		const stream = tracing.startActiveSpan("process-stream", (span) => {
			span.setAttribute(
				"request.content_type",
				request.headers.get("content-type") ?? "unknown",
			);

			return body.pipeThrough(
				new TransformStream({
					transform(chunk, controller) {
						// Process each chunk
						controller.enqueue(chunk);
					},
					flush() {
						span.setAttribute("stream.status", "complete");
						span.end();
					},
					cancel() {
						span.setAttribute("stream.status", "cancelled");
						span.end();
					},
				}),
			);
		});

		return new Response(stream);
	},
};
```

`startSpan`:

```ts
import { tracing } from "cloudflare:workers";

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		// ...
		const span = tracing.startSpan("cache-warmup");
		span.setAttribute("cache.keys", keys.length);

		try {
			await warmCache(keys);
			span.setAttribute("cache.warmup.status", "complete");
		} catch (err) {
			span.recordException(err as Error);
			throw err;
		} finally {
			span.end();
		}
		// ...
	},
};
```

`getActiveSpan` and `spanContext()` (return the trace ID to the client):

```ts
import { tracing } from "cloudflare:workers";

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const { traceId } = tracing.getActiveSpan()?.spanContext() ?? {};

		const response = await handleRequest(request, env);

		// Return the trace ID so that it can be looked up later
		const headers = new Headers(response.headers);
		if (traceId) headers.set("x-trace-id", traceId);
		return new Response(response.body, { status: response.status, headers });
	},
};
```

Span methods:

```ts
span
	.setAttribute("user.plan", "enterprise")
	.setAttribute("item.count", 42)
	.setAttribute("cache.hit", true);

span.setAttributes({
	"user.plan": "enterprise",
	"item.count": 42,
	"cache.hit": true,
	"optional.field": undefined, // ignored
});

await tracing.startActiveSpan("chargeCard", async (span) => {
	try {
		const result = await chargeCard(token, amount);
		span.setStatus({ code: "ok" });
		return result;
	} catch (err) {
		span.recordException(err as Error);
		span.setStatus({ code: "error", message: "Card payment failed" });
		throw err;
	} finally {
		span.end();
	}
});

// Strings and plain objects are also accepted
span.recordException("Upstream returned an empty body");
span.recordException({ code: "RATE_LIMITED", message: "Too many requests" });

// Rename the invocation's root span to include the matched route
const route = router.match(request);
tracing.getActiveSpan()?.updateName(`${request.method} ${route.pattern}`);

tracing.enterSpan("process", (span) => {
	if (span.isTraced) {
		span.setAttribute(
			"request.body.preview",
			JSON.stringify(body).slice(0, 200),
		);
	}
	return processBody(body);
});
```

Logging within spans: `console.log()` output is attributed to the active span.

```ts
tracing.enterSpan("processPayment", async (span) => {
	console.log("Starting payment processing"); // attributed to "processPayment"
	const result = await chargeCard(token, amount);
	console.log("Payment complete", result.id); // also attributed to "processPayment"
});
```

## Options / Props

Span creation methods:

| Method | Span ends | Active context scope | Use case |
| --- | --- | --- | --- |
| `enterSpan(name, callback, ...args)` | Automatically, when the callback returns, throws, or its returned promise settles | During the callback | Most instrumentation — sync and async work within a single callback |
| `startActiveSpan(name, callback, ...args)` | Manually, `span.end()` | During the callback | Operations that outlive the callback, such as stream pipelines |
| `startSpan(name)` | Manually, `span.end()` | Never active | Timing an operation with no nested spans |

Parameters of `enterSpan` / `startActiveSpan`:

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The name of the span. This appears in trace visualizations. |
| `callback` | `(span: Span, ...args: A) => T` | Function to execute within the span. Receives the `Span` first, followed by any additional arguments. |
| `...args` | `A` | Optional additional arguments forwarded to the callback after `span`. |

`Span` members:

| Member | Parameters | Description |
| --- | --- | --- |
| `span.setAttribute(key, value)` | `key: string`, `value: string \| number \| boolean \| undefined` | Sets an attribute; `undefined` is a no-op. Returns the same `Span`. |
| `span.setAttributes(attributes)` | `Record<string, string \| number \| boolean \| undefined>` | Sets multiple attributes; `undefined` entries ignored. Returns the same `Span`. |
| `span.recordException(exception)` | `Exception` (an `Error`, a string, or an object with at least one of `code`, `name`, `message` and optional `stack`) | Records an exception event with timestamp. Ignored if the span is not traced, already ended, or the object has none of `code`/`name`/`message`. Does not end the span or rethrow. |
| `span.setStatus(status)` | `SpanStatus` (`code`: `"unset" \| "ok" \| "error"`, optional `message` kept only for `"error"`) | Sets span status per OpenTelemetry. Returns the same `Span`. |
| `span.updateName(name)` | `name: string` (truncated to 64 bytes) | Renames the span everywhere, including exported traces. Returns the same `Span`. |
| `span.spanContext()` | none | Returns `SpanContext`: `traceId` (32 lowercase hex chars), `spanId` (16 lowercase hex chars), `traceFlags` (W3C trace flags). |
| `span.isTraced` | readonly boolean | Whether the invocation is traced. `false` when observability is disabled for the Worker and after the span has ended. |
| `span.end()` | none | Ends the span and submits its attributes; idempotent. |

Data-limit warning attributes added when a span reaches its limit:

| Attribute | Value |
| --- | --- |
| `cloudflare.warning.type` | `span_data_limit_exceeded` |
| `cloudflare.warning.message` | A description of the attribute or exception that was dropped, and its size. |

## Notes

- `getActiveSpan()` returns the currently active `Span`, or `undefined` outside a request (e.g. module top-level scope). With no explicit span active it returns the invocation's root span. Spans from `startSpan` never become active, so they are never returned.
- `enterSpan`: the new span is a child of the active span (or of the request's root span if none). Nested `enterSpan` calls and runtime-created spans (fetch, KV) inside the callback become its children.
- `startActiveSpan`: the span is active only during the callback; you cannot create children of it from outside the callback. If you forget `span.end()`, the span is still submitted when the request-owned span object is destroyed, as a backstop; do not rely on it.
- `startSpan`: spans created by `enterSpan`, `startActiveSpan`, and platform operations while it is open are siblings, not children.
- `setStatus`: `"ok"` is final (later calls ignored); `"unset"` has no effect and does not clear `"error"`; `message` is dropped unless `code` is `"error"`; calls after the span has ended are ignored; any other `code` throws `TypeError` (codes are lowercase, `"OK"` is invalid). Status is included in exported traces, but the Workers Observability dashboard does not display it yet and traces cannot be queried or filtered by it.
- `updateName`: calls after the span ended are ignored; the invocation's root span from `getActiveSpan()` can also be renamed.
- `spanContext()`: still returns IDs after the span ended. If observability is disabled for the Worker, IDs are all zeros. If traces are disabled or the request is not sampled but Workers Logs is enabled, non-zero IDs are returned matching the invocation's logs but no spans are stored. `traceFlags` does not indicate sampling; do not use it to decide whether to record telemetry or to build a `traceparent` header.
- `isTraced` does not account for head sampling: a request not sampled for tracing can still report `true` and its spans are discarded. When `false`, `enterSpan` still runs the callback but records nothing.
- `end()` on an `enterSpan` span is safe but could end it early. On the root span returned by `getActiveSpan()` it has no effect; the runtime ends the root span when the invocation completes. After `end()`, further annotation calls are silently ignored.
- Data limits: span names truncated to 64 bytes; about 64 KB of attribute and exception data per span. After the limit, further `setAttribute`, `setAttributes` and `recordException` calls are ignored and the two warning attributes above are added.
- Limitations: no manual parent-child wiring (determined by async context); sampling decisions not visible to code; trace context is not propagated automatically; span status not shown in the dashboard. See [traces.md](./traces.md) for known limitations.
- Spans nest automatically via JavaScript async context: e.g. a KV read, a nested `enterSpan`, and a `fetch` inside an `enterSpan("handleOrder", ...)` callback all become children of `handleOrder`.

## Related

- [traces.md](./traces.md)
- [spans-and-attributes.md](./spans-and-attributes.md)
- [opentelemetry-export.md](./opentelemetry-export.md)
- [issues-investigate.md](./issues-investigate.md)
