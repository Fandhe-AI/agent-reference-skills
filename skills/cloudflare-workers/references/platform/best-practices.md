---
source: https://developers.cloudflare.com/workers/best-practices/workers-best-practices/
---

# Workers Best Practices

Code patterns and configuration guidance for fast, reliable, observable, and secure Workers.

## Signature / Usage

Recommended baseline Wrangler config:

```jsonc
{
	"name": "my-worker",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": ["nodejs_compat"],
}
```

Generate the `Env` type instead of hand-writing it, then use it:

```bash
npx wrangler types
```

```ts
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		// env.MY_KV, env.MY_BUCKET, etc. are all correctly typed
		const value = await env.MY_KV.get("key");
		return new Response(value);
	},
} satisfies ExportedHandler<Env>;
```

## Options / Props

Practices by area (TypeScript snippets below; the source also shows JS and TOML equivalents):

| Area | Practice |
| --- | --- |
| Configuration | Keep `compatibility_date` current; enable `nodejs_compat`; enable `upload_source_maps`; generate types with `wrangler types` (re-run after adding/renaming bindings); store secrets with `wrangler secret put`, never in config/source; configure environments deliberately; choose Custom Domains vs Routes correctly |
| Requests/responses | Stream bodies; use `ctx.waitUntil()` for post-response work |
| Architecture | Use bindings (not REST); Queues vs Workflows; service bindings for Worker-to-Worker; Hyperdrive for external DBs; Durable Objects for WebSockets; Workers Static Assets for new projects |
| Observability | Enable Workers Logs and Traces; structured JSON logging |
| Code patterns | No request-scoped global state; always `await`/`return`/`waitUntil` promises |
| Security | Web Crypto for tokens; `timingSafeEqual`; no `passThroughOnException` as error handling |
| Testing | `@cloudflare/vitest-plugin` |

### Secrets and environments

```bash
npx wrangler secret put API_KEY
# Pipe from an environment variable or .env file
echo "$API_KEY" | npx wrangler secret put API_KEY
```

```jsonc
{
	"name": "my-api",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": ["nodejs_compat"],

	// This binding only applies to the root Worker
	"kv_namespaces": [{ "binding": "CACHE", "id": "dev-kv-id" }],

	"env": {
		// Production environment: deploys as "my-api-production"
		"production": {
			"kv_namespaces": [{ "binding": "CACHE", "id": "prod-kv-id" }],
			"routes": [
				{ "pattern": "api.example.com/*", "zone_name": "example.com" },
			],
		},
		// Staging environment: deploys as "my-api-staging"
		"staging": {
			"kv_namespaces": [{ "binding": "CACHE", "id": "staging-kv-id" }],
			"routes": [
				{ "pattern": "api-staging.example.com/*", "zone_name": "example.com" },
			],
		},
	},
}
```

```bash
npx wrangler deploy --env staging
```

### Custom domain vs route

```jsonc
{
	"name": "my-worker",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": ["nodejs_compat"],

	// Option 1: Custom domain — Worker is the origin, DNS is managed automatically
	"routes": [{ "pattern": "api.example.com", "custom_domain": true }],

	// Option 2: Route — Worker runs in front of an existing origin
	// Requires a proxied DNS record for shop.example.com
	// "routes": [
	// 	{ "pattern": "shop.example.com/*", "zone_name": "example.com" }
	// ]
}
```

### Stream bodies

```ts
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const response = await fetch("https://api.example.com/large-dataset");
		return new Response(response.body, response);
	},
} satisfies ExportedHandler<Env>;
```

Concatenate responses without buffering:

Adapted (not in the official docs): the pipeline promise is passed to `ctx.waitUntil` so it is not left floating; see Notes.

```ts
export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
		const urls = [
			"https://api.example.com/part-1",
			"https://api.example.com/part-2",
			"https://api.example.com/part-3",
		];

		const { readable, writable } = new TransformStream();

		// pipe each response body sequentially without buffering
		const pipeline = (async () => {
			for (const url of urls) {
				const response = await fetch(url);
				if (response.body) {
					// pipeTo with preventClose keeps the writable open for the next response
					await response.body.pipeTo(writable, {
						preventClose: true,
					});
				}
			}
			await writable.close();
		})();
		// Keep the Worker alive until the pipeline finishes.
		ctx.waitUntil(pipeline);

		// Return the readable side immediately — data streams as it arrives
		return new Response(readable, {
			headers: { "Content-Type": "application/octet-stream" },
		});
	},
} satisfies ExportedHandler<Env>;
```

### waitUntil

```ts
export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
		const data = await processRequest(request);

		ctx.waitUntil(logToAnalytics(env, data));
		ctx.waitUntil(updateCache(env, data));

		return Response.json(data);
	},
} satisfies ExportedHandler<Env>;
```

### Queues vs Workflows

```ts
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const order = await request.json<{ id: string; type: string }>();

		if (order.type === "simple") {
			// Queue: single-step background job — send a message for async processing
			await env.ORDER_QUEUE.send({
				orderId: order.id,
				action: "send-confirmation-email",
			});
		} else {
			// Workflow: multi-step durable process — payment, fulfillment, notification
			const instance = await env.FULFILLMENT_WORKFLOW.create({
				params: { orderId: order.id },
			});
		}

		return Response.json({ status: "accepted" }, { status: 202 });
	},
} satisfies ExportedHandler<Env>;
```

### Service bindings (RPC)

```ts
import { WorkerEntrypoint } from "cloudflare:workers";

// The "auth" Worker exposes RPC methods
export class AuthService extends WorkerEntrypoint {
	async verifyToken(
		token: string,
	): Promise<{ userId: string; valid: boolean }> {
		// Token verification logic
		return { userId: "user-123", valid: true };
	}
}

// The "api" Worker calls the auth Worker via a service binding
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const token = request.headers.get("Authorization")?.replace("Bearer ", "");

		if (!token) {
			return new Response("Unauthorized", { status: 401 });
		}

		// call another Worker via service binding RPC — no network hop
		const auth = await env.AUTH_SERVICE.verifyToken(token);

		if (!auth.valid) {
			return new Response("Invalid token", { status: 403 });
		}

		return Response.json({ userId: auth.userId });
	},
} satisfies ExportedHandler<Env>;
```

### Hyperdrive

```jsonc
{
	"name": "my-worker",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": ["nodejs_compat"],

	"hyperdrive": [{ "binding": "HYPERDRIVE", "id": "<YOUR_HYPERDRIVE_ID>" }],
}
```

Adapted (not in the official docs): the client is closed in a `finally` block via `ctx.waitUntil`; see Notes.

```ts
import { Client } from "pg";

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
		// create a new client per request — Hyperdrive pools the underlying connection
		const client = new Client({
			connectionString: env.HYPERDRIVE.connectionString,
		});

		try {
			await client.connect();
			const result = await client.query("SELECT id, name FROM users LIMIT 10");
			return Response.json(result.rows);
		} catch (e) {
			console.error(
				JSON.stringify({ message: "database query failed", error: String(e) }),
			);
			return Response.json({ error: "Database error" }, { status: 500 });
		} finally {
			// Close the client without delaying the response.
			ctx.waitUntil(client.end());
		}
	},
} satisfies ExportedHandler<Env>;
```

### Durable Objects for WebSockets

```ts
import { DurableObject } from "cloudflare:workers";

// Parent Worker: upgrades HTTP to WebSocket and routes to a Durable Object
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (request.headers.get("Upgrade") !== "websocket") {
			return new Response("Expected WebSocket", { status: 426 });
		}

		const stub = env.CHAT_ROOM.getByName("default-room");
		return stub.fetch(request);
	},
} satisfies ExportedHandler<Env>;

// Durable Object: manages WebSocket connections with hibernation
export class ChatRoom extends DurableObject {
	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		// Auto ping/pong without waking the object
		this.ctx.setWebSocketAutoResponse(
			new WebSocketRequestResponsePair("ping", "pong"),
		);
	}

	async fetch(request: Request): Promise<Response> {
		const pair = new WebSocketPair();
		const [client, server] = Object.values(pair);

		// acceptWebSocket enables hibernation
		this.ctx.acceptWebSocket(server);

		return new Response(null, { status: 101, webSocket: client });
	}

	// Called when a message arrives — the object wakes from hibernation if needed
	async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer) {
		for (const conn of this.ctx.getWebSockets()) {
			conn.send(typeof message === "string" ? message : "binary");
		}
	}

	async webSocketClose(
		ws: WebSocket,
		code: number,
		reason: string,
		wasClean: boolean,
	) {
		// With web_socket_auto_reply_to_close (compat date >= 2026-04-07), the runtime
		// auto-replies to Close frames. Calling close() is safe but no longer required.
		ws.close(code, reason);
	}
}
```

### Static assets

```jsonc
{
	// Static site — no Worker script needed
	"name": "my-static-site",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": ["nodejs_compat"],

	"assets": {
		"directory": "./dist",
	},
}
```

### Observability

```jsonc
{
	"name": "my-worker",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": ["nodejs_compat"],

	"observability": {
		"enabled": true,
		"logs": {
			// Capture 100% of logs — lower this for high-traffic Workers
			"head_sampling_rate": 1,
		},
		"traces": {
			"enabled": true,
			"head_sampling_rate": 0.01, // Sample 1% of traces
		},
	},
}
```

```ts
console.log(
	JSON.stringify({
		message: "incoming request",
		method: request.method,
		path: url.pathname,
	}),
);
```

### Request-scoped global state and floating promises

```ts
// Pass request-scoped data through function arguments, not module-level variables
export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
		const userId = request.headers.get("X-User-Id");
		const result = await handleRequest(userId, env);

		return Response.json(result);
	},
} satisfies ExportedHandler<Env>;
```

```bash
# ESLint (typescript-eslint)
npx eslint --rule '{"@typescript-eslint/no-floating-promises": "error"}' src/

# oxlint
npx oxlint --deny typescript/no-floating-promises src/
```

### Security

```ts
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		// cryptographically secure random UUID
		const sessionId = crypto.randomUUID();

		// cryptographically secure random bytes for tokens
		const tokenBytes = new Uint8Array(32);
		crypto.getRandomValues(tokenBytes);
		const token = Array.from(tokenBytes)
			.map((b) => b.toString(16).padStart(2, "0"))
			.join("");

		return Response.json({ sessionId, token });
	},
} satisfies ExportedHandler<Env>;
```

```ts
async function verifyToken(
	provided: string,
	expected: string,
): Promise<boolean> {
	const encoder = new TextEncoder();

	// hash both values to a fixed size, then compare in constant time
	// This avoids leaking the length of the expected value
	const [providedHash, expectedHash] = await Promise.all([
		crypto.subtle.digest("SHA-256", encoder.encode(provided)),
		crypto.subtle.digest("SHA-256", encoder.encode(expected)),
	]);

	return crypto.subtle.timingSafeEqual(providedHash, expectedHash);
}
```

Explicit error handling instead of `passThroughOnException`:

```ts
export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
		try {
			const result = await handleRequest(request, env);
			return Response.json(result);
		} catch (error) {
			const message = error instanceof Error ? error.message : "Unknown error";

			console.error(
				JSON.stringify({
					message: "unhandled error",
					error: message,
					path: new URL(request.url).pathname,
				}),
			);

			return Response.json({ error: "Internal server error" }, { status: 500 });
		}
	},
} satisfies ExportedHandler<Env>;
```

### Testing

```ts
import { describe, it, expect } from "vitest";
import { env } from "cloudflare:workers";

describe("KV operations", () => {
	it("should store and retrieve a value", async () => {
		await env.MY_KV.put("key", "value");
		const result = await env.MY_KV.get("key");
		expect(result).toBe("value");
	});

	it("should return null for missing keys", async () => {
		const result = await env.MY_KV.get("nonexistent");
		// test the null case explicitly
		expect(result).toBeNull();
	});
});
```

## Notes

- Adapted from the official docs: the "Concatenate responses" example now takes `ctx` and calls `ctx.waitUntil(pipeline)` (the official pipeline promise was left floating, contradicting the page's own floating-promise rule), and the Hyperdrive example now closes the client with `ctx.waitUntil(client.end())` in a `finally` block.
- Condensed: the source repeats most examples in JS and TS and Wrangler config in JSONC and TOML; this page keeps TS/JSONC variants, and omits the paired anti-pattern ("Bad") snippets, which the source marks with emoji. Consult the source for full good/bad comparisons.
- Bad patterns the source warns about: buffering with `await response.text()` / `request.arrayBuffer()` (128 MB memory limit); destructuring `ctx` (`const { waitUntil } = ctx` throws "Illegal invocation"); exceeding the 30-second `waitUntil()` limit; module-level request state (causes cross-request leaks and "Cannot perform I/O on behalf of a different request"); floating promises; `Math.random()` for tokens; `===` secret comparison; calling the Cloudflare REST API from a Worker for R2/KV/D1/Queues/Workflows instead of bindings; connecting directly to remote databases without Hyperdrive (often 300-500ms per request).
- Environments: each is a distinct Worker named `{name}-{env}`; bindings and vars are not inherited (see non-inheritable keys in the cloudflare-wrangler skill). The root Worker is a separate deployment; use `--env` to avoid deploying it unintentionally.
- Routes require a proxied (orange-clouded) DNS record or requests return `ERR_NAME_NOT_RESOLVED`; use a proxied `AAAA` record to `100::` as a placeholder with no origin.
- Queues: fan-out, buffering/batching, simple single-step jobs, at-least-once delivery. Workflows: multi-step durable work with per-step retry and `step.waitForEvent()`.
- Plain Workers lack persistence/hibernation for WebSockets; use Durable Objects with `this.ctx.acceptWebSocket()` (not `ws.accept()`) and `setWebSocketAutoResponse` for heartbeats.
- Workers Static Assets is recommended over Pages for new projects.
- The Vitest plugin injects `nodejs_compat` automatically; confirm your Wrangler config includes it if code relies on Node.js built-ins.
- Hyperdrive requires `nodejs_compat` for driver support; create a new client per request.
- Source snippet dates (`compatibility_date`) are generated on the fetch date (2026-11-03).

## Related

- [limits.md](./limits.md)
- [how-workers-works.md](./how-workers-works.md)
- [prompting.md](./prompting.md)
- [../handlers-context/README.md](../handlers-context/README.md)
- [../bindings-rpc/README.md](../bindings-rpc/README.md)
- [../web-apis/README.md](../web-apis/README.md)
