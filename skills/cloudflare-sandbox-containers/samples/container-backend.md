---
source: https://developers.cloudflare.com/containers/examples/container-backend/
---

# Static frontend, container backend

Serve a static frontend with Workers Static Assets and route `/api` requests to a pool of three Containers (`durable_object` scheduling policy).

## Signature / Usage

`wrangler.jsonc` (assets are served first except for `/api` paths, which run the Worker):

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "static-frontend-container-backend",
  "main": "src/index.ts",
  "upload_source_maps": true,
  // Set this to today's date
  "compatibility_date": "2026-11-03",
  "observability": {
    "enabled": true
  },
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS",
    "run_worker_first": [
      "/api",
      "/api/*"
    ]
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

`src/index.js` (the Durable Object starts the container, waits for `/health`, then forwards requests):

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
		const pathname = new URL(request.url).pathname;
		if (pathname === "/api" || pathname.startsWith("/api/")) {
			const index = Math.floor(Math.random() * INSTANCE_COUNT);
			return env.BACKEND.getByName(`instance-${index}`).fetch(request);
		}
		return env.ASSETS.fetch(request);
	},
};
```

`server.go` (the container backend; `/health` is the readiness endpoint):

```go
package main

import (
	"encoding/json"
	"log"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	widgets := []map[string]interface{}{
		{"id": 1, "name": "Widget A"},
		{"id": 2, "name": "Sprocket B"},
		{"id": 3, "name": "Gear C"},
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(widgets)

}

func main() {
	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})
	http.HandleFunc("/api/widgets", handler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
```

`Dockerfile`:

```dockerfile
FROM golang:1.25-alpine AS build
WORKDIR /app
COPY server.go .
RUN CGO_ENABLED=0 go build -o /server server.go

FROM alpine:3.20
COPY --from=build /server /server
EXPOSE 8080
CMD ["/server"]
```

Run locally (Docker-compatible engine required, Wrangler 4.136.0 or later), then open `http://localhost:8787/`:

```sh
npm i -D wrangler
npx wrangler dev
```

## Notes

- The official page also ships a small `index.html` (Alpine.js) in `./dist` that fetches `/api/widgets`; it is omitted here. Any static page that calls `/api/widgets` works.
- The Worker picks one of `instance-0` to `instance-2` at random: a fixed pool, not autoscaling. Keep shared data outside the container filesystem.
- The instance names come from the Worker, never from the request. Keep it that way if you adapt the routing.
- The Go handler sends `Access-Control-Allow-Origin: *` as in the official example; the frontend here is same-origin, so you can drop the header.
- `enableInternet: false` keeps the container from reaching the Internet; the container only answers requests forwarded by its Durable Object.

## Related

- [Stateless instances](./stateless-instances.md)
- [Durable Object Container API](../references/containers/durable-object-container.md)
- [Scheduling policy](../references/containers/scheduling-policy.md)
- [Local development](../references/containers/local-dev.md)
