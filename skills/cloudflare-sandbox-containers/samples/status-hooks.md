---
source: https://developers.cloudflare.com/containers/examples/status-hooks/
---

# Monitor container lifecycle

Log when a Container becomes ready, exits successfully, or fails, using `monitor()` from the Durable Object.

## Signature / Usage

`wrangler.jsonc`:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "container-lifecycle",
  "main": "src/index.ts",
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

`src/index.js`:

```js
import { DurableObject } from "cloudflare:workers";

const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000;

export class MyContainer extends DurableObject {
	starting;
	monitoring;

	constructor(ctx, env) {
		super(ctx, env);
		const container = ctx.container;
		if (container.running) {
			void ctx.blockConcurrencyWhile(() =>
				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
			);
			this.observeExit();
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
		this.observeExit();
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
				console.log("Container is ready");
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

	observeExit() {
		if (this.monitoring) return;
		this.monitoring = this.ctx.container
			.monitor()
			.then(() => console.log("Container exited successfully"))
			.catch((error) => console.error("Container failed:", error))
			.finally(() => {
				this.monitoring = undefined;
			});
		this.ctx.waitUntil(this.monitoring);
	}
}

export default {
	fetch(request, env) {
		return env.MY_CONTAINER.getByName("demo").fetch(request);
	},
};
```

The container (`server.mjs` and `Dockerfile`) is the same as in the stateless-instances sample.

```sh
npx wrangler dev
```

Visit `http://localhost:8787/` and inspect the Worker logs.

## Notes

- `monitor()` resolves without a value after a successful exit and rejects for failures, including nonzero process exits.
- The constructor restores monitoring and the inactivity timeout when the Durable Object restarts with a running Container.
- A pending monitor can keep the Durable Object active for up to 15 minutes. The five-minute inactivity timeout starts after the Durable Object becomes inactive, not five minutes after the last HTTP request.
- Monitoring is not a durable event subscription across restarts.

## Related

- [Stateless instances](./stateless-instances.md)
- [Cron container](./cron-container.md)
- [Durable Object Container API](../references/containers/durable-object-container.md)
