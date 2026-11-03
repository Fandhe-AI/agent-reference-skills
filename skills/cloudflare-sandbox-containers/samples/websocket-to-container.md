---
source: https://developers.cloudflare.com/containers/examples/websocket/
---

# WebSocket to container

Forward WebSocket upgrade requests through a Durable Object to an echo server running in a Container.

## Signature / Usage

`wrangler.jsonc`:

Adapted (not in the official docs): `main` points to `src/index.js`, the JavaScript file this page creates (the official config says `src/index.ts`). See Notes.

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "websocket-container",
  "main": "src/index.js",
  "upload_source_maps": true,
  // Set this to today's date
  "compatibility_date": "2026-11-03",
  "observability": {
    "enabled": true
  },
  "containers": [
    {
      "class_name": "MyContainer",
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
        "name": "MY_CONTAINER",
        "class_name": "MyContainer"
      }
    ]
  },
  "exports": {
    "MyContainer": {
      "type": "durable-object",
      "storage": "sqlite"
    }
  }
}
```

`src/index.js` (return the port response directly to preserve the WebSocket upgrade):

```js
import { DurableObject } from "cloudflare:workers";

const INACTIVITY_TIMEOUT_MS = 2 * 60 * 1000;

export class MyContainer extends DurableObject {
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
		return env.MY_CONTAINER.getByName("demo").fetch(request);
	},
};
```

`package.json`:

```json
{
	"private": true,
	"type": "module",
	"dependencies": { "ws": "^8.18.0" }
}
```

`server.mjs` (`/health` over HTTP, `/ws` accepts upgrades):

```js
import { createServer } from "node:http";
import { WebSocketServer } from "ws";

const server = createServer((request, response) => {
	if (request.url === "/health") {
		response.writeHead(200).end();
	} else {
		response.writeHead(404).end();
	}
});
const sockets = new WebSocketServer({ server, path: "/ws" });
sockets.on("connection", (socket) => {
	socket.on("error", console.error);
	socket.on("message", (data, isBinary) => {
		socket.send(data, { binary: isBinary });
	});
});
server.listen(8080, "0.0.0.0");
```

`Dockerfile`:

```dockerfile
FROM node:24-bookworm-slim
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY server.mjs .
EXPOSE 8080
CMD ["node", "server.mjs"]
```

```sh
npx wrangler dev
```

Connect a WebSocket client to `ws://localhost:8787/ws`, send a message, and check that it returns. For a deployed Worker, use `wss://<WORKER_HOST>/ws`.

## Notes

- Corrected from the official docs: the Wrangler config sets `"main": "src/index.ts"` while the Worker code is given as `src/index.js`; `main` is aligned to `src/index.js` so the entry point exists.
- An open WebSocket can keep the Durable Object active; the inactivity timeout applies after the Durable Object becomes inactive.
- This echo server runs no commands and holds no secrets, so it has no auth. Add authentication in the Worker before exposing a container that does more.
- The Worker always targets the fixed instance name `demo`; do not derive instance names from unverified request input.

## Related

- [Stateless instances](./stateless-instances.md)
- [Workers connections](../references/containers/workers-connections.md)
- [Container architecture](../references/containers/architecture.md)
