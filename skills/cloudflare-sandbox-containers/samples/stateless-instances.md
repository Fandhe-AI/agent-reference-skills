---
source: https://developers.cloudflare.com/containers/examples/stateless/
---

# Stateless instances

Distribute HTTP requests across three named Container instances, each started by its own Durable Object.

## Signature / Usage

`wrangler.jsonc`:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "stateless-containers",
  "main": "src/index.ts",
  "upload_source_maps": true,
  // Set this to today's date
  "compatibility_date": "2026-11-03",
  "observability": {
    "enabled": true
  },
  "containers": [
    {
      "class_name": "Backend",
      "scheduling_policy": "durable_object",
      "images": {
        "base": {
          "dockerfile": "./Dockerfile"
        }
      }
    }
  ],
  "durable_objects": {
    "bindings": [
      {
        "name": "BACKEND",
        "class_name": "Backend"
      }
    ]
  },
  "exports": {
    "Backend": {
      "type": "durable-object",
      "storage": "sqlite"
    }
  }
}
```

`src/index.js`:

```js
import { DurableObject } from "cloudflare:workers";

const INSTANCE_COUNT = 3;

const INACTIVITY_TIMEOUT_MS = 2 * 60 * 60 * 1000;

export class Backend extends DurableObject {
	starting;

	constructor(ctx, env) {
		super(ctx, env);
		const container = ctx.container;
		if (container.running) {
			void ctx.blockConcurrencyWhile(() =>
				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
			);
		}
	}

	async fetch(request) {
		// Concurrent requests share startup and readiness checks.
		this.starting ??= this.startAndWaitForPort().finally(() => {
			this.starting = undefined;
		});
		await this.starting;

		const url = new URL(request.url);
		url.protocol = "http:";
		url.host = "container";
		const forwarded = new Request(url, request);
		forwarded.headers.delete("host");
		return this.ctx.container.getTcpPort(8080).fetch(forwarded);
	}

	async startAndWaitForPort() {
		const container = this.ctx.container;
		if (!container.running) {
			container.start({
				image: container.images.base,
				instance: "lite",
				enableInternet: false,
			});
		}
		await container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);

		const port = container.getTcpPort(8080);
		let lastError;
		for (let attempt = 0; attempt < 100; attempt++) {
			try {
				const response = await port.fetch("http://container/health", {
					signal: AbortSignal.timeout(1000),
				});
				await response.body?.cancel();
				if (!response.ok) {
					throw new Error(`Health check returned ${response.status}`);
				}
				return;
			} catch (error) {
				lastError = error;
				await scheduler.wait(200);
			}
		}
		throw new Error("Container did not become ready on port 8080", {
			cause: lastError,
		});
	}
}

export default {
	fetch(request, env) {
		const index = Math.floor(Math.random() * INSTANCE_COUNT);
		return env.BACKEND.getByName(`instance-${index}`).fetch(request);
	},
};
```

`server.mjs` (listens on `0.0.0.0:8080`, exposes `/health`):

```js
import { createServer } from "node:http";

createServer((request, response) => {
	if (request.url === "/health") {
		response.writeHead(200).end();
		return;
	}
	response.setHeader("Content-Type", "application/json");
	response.end(
		JSON.stringify({
			message: "Hello from a Container",
			environment: process.env.ENV_VAR,
			kvValue: process.env.KV_VALUE,
		}),
	);
}).listen(8080, "0.0.0.0");
```

`Dockerfile`:

```dockerfile
FROM node:24-bookworm-slim
WORKDIR /app
COPY server.mjs .
EXPOSE 8080
CMD ["node", "server.mjs"]
```

Run locally (Docker-compatible engine, Wrangler 4.136.0 or later) and visit `http://localhost:8787/`:

```sh
npm i -D wrangler
npx wrangler dev
```

## Notes

- This is a fixed pool of three instances, not automatic scaling. Requests can reach different instances, so keep shared state outside the container filesystem.
- Instances stop after their Durable Objects stay inactive for two hours (`INACTIVITY_TIMEOUT_MS`).
- The same `Backend` class (start, share the readiness check, forward) is reused by the other container samples in this skill.
- The instance name is derived from a random index, never from request input.

## Related

- [Static frontend, container backend](./container-backend.md)
- [WebSocket to container](./websocket-to-container.md)
- [Scaling and routing](../references/containers/scaling-and-routing.md)
- [Durable Object Container API](../references/containers/durable-object-container.md)
