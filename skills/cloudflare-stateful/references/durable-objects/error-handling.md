---
source: https://developers.cloudflare.com/durable-objects/best-practices/error-handling/
---

# Error handling

Uncaught exceptions thrown by a Durable Object, or by Durable Objects infrastructure (overloads, network errors), propagate to the client call site. Catch them to retry by recreating the stub and resending.

## Signature / Usage

Adapted (not in the official docs): the official example returns `Response.json(resp)` of a `Response`, never checks `.overloaded`, and has unreachable code; it now returns the response, skips retries for overloaded errors, and uses a typed namespace. `ErrorThrowingObject.fetch()` declares `Promise<Response>` so the throw-only method still matches the `DurableObject` `fetch()` contract.

```ts
import { DurableObject } from "cloudflare:workers";

export interface Env {
	ErrorThrowingObject: DurableObjectNamespace<ErrorThrowingObject>;
}

export default {
	async fetch(request, env, ctx) {
		let userId = new URL(request.url).searchParams.get("userId") || "";

		// Retry behavior can be adjusted to fit your application.
		let maxAttempts = 3;
		let baseBackoffMs = 100;
		let maxBackoffMs = 20000;

		let attempt = 0;
		while (true) {
			// Try sending the request
			try {
				// Create a Durable Object stub for each attempt, because certain types of
				// errors will break the Durable Object stub.
				const doStub = env.ErrorThrowingObject.getByName(userId);
				return await doStub.fetch("http://your-do/");
			} catch (e: any) {
				// Retry only transient errors; never retry overloaded objects.
				if (!e.retryable || e.overloaded) {
					break;
				}
			}
			let backoffMs = Math.min(
				maxBackoffMs,
				baseBackoffMs * Math.random() * Math.pow(2, attempt),
			);
			attempt += 1;
			if (attempt >= maxAttempts) {
				// Reached max attempts, so don't retry.
				break;
			}
			await scheduler.wait(backoffMs);
		}
		return new Response("server error", { status: 500 });
	},
} satisfies ExportedHandler<Env>;

export class ErrorThrowingObject extends DurableObject {
	constructor(state: DurableObjectState, env: Env) {
		super(state, env);

		// Any exceptions that are raised in your constructor will also set the
		// .remote property to True
		throw new Error("no good");
	}

	async fetch(req: Request): Promise<Response> {
		// Generate an uncaught exception
		// A .remote property will be added to the exception propagated to the caller
		// and will be set to True
		throw new Error("example error");
	}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `.retryable` | `boolean` | — | When `true`, the failure is transient. If it reaches your code, the runtime ran out of retries or the failure happened after the request reached the object; retry it yourself only if requests are idempotent. Use exponential backoff. |
| `.overloaded` | `boolean` | — | When `true`, do not retry; retrying worsens the overload and raises the error rate. |
| `.remote` | `boolean` | — | `true` when the exception was thrown in the object's own code (including constructor), or by infrastructure when the object exceeds memory or CPU limits. |

## Notes

- Corrected from the official docs: `Response.json(resp)` wrapped a `Response` (would not serialize as intended) and the `.overloaded` rule stated in the prose was not applied in the code.
- Many exceptions leave a stub broken, so every later call fails with the original exception. Create a new stub for subsequent requests.
- Infrastructure exceptions include transient internal errors, too many requests to a single object, and too many requests queued by slow or excessive I/O in one object.
- If requests are not idempotent, decide per application whether to retry.
- The runtime retries some failures before they reach your code (see the automatic-retries page). The runtime also retries each attempt in the backoff loop above, so three attempts here can become up to 15 attempts in total. Keep the attempt count low, or set `retry: { maxRetries: 0 }` on the stub if the loop should be the only source of retries.
- Source: https://developers.cloudflare.com/durable-objects/best-practices/error-handling/index.md (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [Troubleshooting](./troubleshooting.md)
- [Automatic retries](./automatic-retries.md)
- [DurableObjectStub](./stub.md)
- [Create stubs and send requests](./create-stubs-and-send-requests.md)
