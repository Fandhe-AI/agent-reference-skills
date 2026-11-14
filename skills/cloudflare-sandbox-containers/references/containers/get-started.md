---
source: https://developers.cloudflare.com/containers/get-started/
---

# Get started

Deploy a Worker that routes requests to one or more containers, each running a small Go web server. A Durable Object starts its container through `ctx.container` and forwards requests to it.

## Signature / Usage

Prerequisite: Docker (or a compatible tool such as Colima) running locally during `wrangler deploy`. `docker info` succeeds when it is running.

```
npm create cloudflare@latest -- --template=cloudflare/templates/containers-template
```

Redeploy after code changes:

```
npx wrangler deploy
```

Check status and list images in the Cloudflare Registry:

```
npx wrangler containers list
npx wrangler containers images list
```

Wrangler configuration:

```jsonc
{
	"containers": [
		{
			"class_name": "MyContainer",
			"scheduling_policy": "durable_object",
			"images": {
				"base": {
					"dockerfile": "./Dockerfile",
				},
			},
		},
	],
	"durable_objects": {
		"bindings": [
			{
				"name": "MY_CONTAINER",
				"class_name": "MyContainer",
			},
		],
	},
	"exports": {
		"MyContainer": {
			"type": "durable-object",
			"storage": "sqlite",
		},
	},
}
```

```toml
[[containers]]
class_name = "MyContainer"
scheduling_policy = "durable_object"

[containers.images.base]
dockerfile = "./Dockerfile"

[[durable_objects.bindings]]
name = "MY_CONTAINER"
class_name = "MyContainer"

[exports.MyContainer]
type = "durable-object"
storage = "sqlite"
```

Container image (Go) reading the environment variables the Durable Object passes to `start()`:

```go
func handler(w http.ResponseWriter, r *http.Request) {
	message := os.Getenv("MESSAGE")
	instanceId := os.Getenv("INSTANCE_ID")
	fmt.Fprintf(w, "Hi, I'm a container and this is my message: \"%s\", my instance ID is: %s", message, instanceId)
}
```

Durable Object that starts the container, waits for its HTTP server and forwards requests:

```ts
const PORT = 8080;
const INACTIVITY_TIMEOUT_MS = 2 * 60 * 1000;

export class MyContainer extends DurableObject<Env> {
	private starting: Promise<void> | undefined;
	private monitoring: Promise<void> | undefined;

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		const container = ctx.container;
		if (container?.running) {
			// Restore the timeout and exit monitoring after a DO restart.
			void ctx.blockConcurrencyWhile(() =>
				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
			);
			this.observeExit();
		}
	}

	async fetch(request: Request): Promise<Response> {
		// Share startup across concurrent requests, including after a failed attempt.
		this.starting ??= this.startAndWaitForPort().finally(() => {
			this.starting = undefined;
		});
		await this.starting;

		const url = new URL(request.url);
		url.protocol = "http:";
		url.host = "container";
		const forwarded = new Request(url, request);
		forwarded.headers.delete("host");
		return this.ctx.container!.getTcpPort(PORT).fetch(forwarded);
	}

	private async startAndWaitForPort(): Promise<void> {
		const container = this.ctx.container!;
		if (!container.running) {
			container.start({
				image: container.images.base,
				instance: "lite",
				enableInternet: false,
				env: {
					MESSAGE: "I was passed in when the Durable Object started me!",
					INSTANCE_ID: this.ctx.id.toString(),
				},
			});
		}
		this.observeExit();
		await container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);

		// running means startup was requested, not that the HTTP server is ready.
		const port = container.getTcpPort(PORT);
		for (let attempt = 0; attempt < 100; attempt++) {
			try {
				const response = await port.fetch("http://container/health", {
					signal: AbortSignal.timeout(1000),
				});
				await response.body?.cancel();
				if (response.ok) return;
			} catch {
				// The port may not be listening yet. Retry the readiness probe only.
			}
			await scheduler.wait(200);
		}
		throw new Error("Container did not become ready on port 8080");
	}

	private observeExit(): void {
		if (this.monitoring) return;
		this.monitoring = this.ctx
			.container!.monitor()
			.then(() => console.log("Container exited successfully"))
			.catch((error: unknown) => console.error("Container failed:", error))
			.finally(() => {
				this.monitoring = undefined;
			});
		this.ctx.waitUntil(this.monitoring);
	}
}
```

Routing in the Worker (Hono): one container per path, and load balancing over a fixed pool.

Adapted (not in the official docs): the official `/container/:id` route names an instance from the raw path parameter (any caller can create unlimited containers); this version accepts only a fixed allow-list of IDs.

```ts
const ALLOWED_IDS = new Set(["1", "2"]);

app.get("/container/:id", (c) => {
	const id = c.req.param("id");
	if (!ALLOWED_IDS.has(id)) {
		return c.text("Not found", 404);
	}
	return c.env.MY_CONTAINER.getByName(`/container/${id}`).fetch(c.req.raw);
});
```

```ts
const POOL_SIZE = 3;

app.get("/lb", (c) => {
	const index = Math.floor(Math.random() * POOL_SIZE);
	return c.env.MY_CONTAINER.getByName(`pool-${index}`).fetch(c.req.raw);
});
```

## Options / Props

Configuration points of the Wrangler file above:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `class_name` | string | — | Must be a Durable Object class name. |
| `scheduling_policy` | string | — | `durable_object`: the Durable Object chooses the image and instance type each time it starts a container. |
| `images.base` | object | — | Image that Wrangler builds from the Dockerfile. The Durable Object passes it to `start()` as `ctx.container.images.base`. |
| `exports` | object | — | Declares the Durable Object class with SQLite storage. The legacy `migrations` array still works but cannot be combined with `exports`. |

## Notes

- Source: https://developers.cloudflare.com/containers/get-started/ (cloudflare-docs production 34d908a, fetched 2026-11-14).
- On deploy Wrangler uploads the Worker, builds and pushes the image with Docker, and updates container instances. The first build and push take longest; later deploys reuse cached image layers. Wait several minutes after the first deploy: the Worker URL may respond while containers are still provisioning, and calls into the container can error. If container routes still error afterwards, check the Containers logs in the dashboard.
- Try the deployed Worker at `https://hello-containers.<YOUR_WORKERS_SUBDOMAIN>.workers.dev`: `/container/1` and `/container/2` route to specific containers (each path after `/container/` maps to a unique container), `/lb` load-balances across three containers chosen at random, `/singleton` always routes to the same container, and `/error` makes a dedicated test container exit with an error. The code for `/singleton` and `/error` is not shown in the official guide.
- The image must run on `linux/amd64`. The Go server answers on port 8080 and also serves `/health`, which the Durable Object uses as a readiness check.
- `start()` returns before the container is ready; `running` means startup was requested, not that the HTTP server is ready, so the example polls `/health` through `getTcpPort()`. `setInactivityTimeout()` keeps the container running for two minutes after the Durable Object becomes inactive, and the constructor sets it again when the Durable Object restarts while its container runs. `monitor()` logs when the container exits; on `/error` the container exits with code `1` and `monitor()` rejects with the error.
- Because `MyContainer` is a Durable Object, the full Durable Object API is available; `this.ctx.storage` persists data that survives container restarts and resides close to the container.
- Use load balancing for stateless, interchangeable containers. Request specific instances for stateful services, individually addressable containers, short-lived jobs, fine-grained lifecycle control, parameterized entrypoint or env vars, or chained container calls.
- Adapted from the official docs: the official `/container/:id` route names a Durable Object instance (and so a container) from the request path, so any caller could create arbitrary numbers of containers; the snippet uses a fixed allow-list (`1`, `2`). `/lb` can start up to three containers. Authenticate callers and validate or allow-list names before deriving instance names from request input in a real deployment.
- The dashboard under Workers & Pages > Containers shows status, health, metrics and logs.
- Migration: the deprecated `Container` class from `@cloudflare/containers` is replaced by this `ctx.container` approach; see api-comparison.md.

## Related

- [Overview](./overview.md)
- [Durable Object Container API](./durable-object-container.md)
- [Wrangler configuration](./wrangler-configuration.md)
- [Deploy](./deploy.md)
- [FAQ](./faq.md)
