---
source: https://developers.cloudflare.com/containers/examples/env-vars-and-secrets/
---

# Environment variables and secrets

Pass runtime environment variables, a Worker secret, a Secrets Store secret, and a KV value into a container through `env` in `ctx.container.start()`.

## Signature / Usage

Create the Worker secret (prompts on stdin, never put it on the command line), then the KV key for deployment:

```sh
npx wrangler secret put WORKER_SECRET
npx wrangler kv key put --binding DEMO_KV KV_VALUE 'Hello from KV!' --remote
```

`wrangler.jsonc` (replace `<KV_NAMESPACE_ID>` and `<STORE_ID>` with the IDs from setup):

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "container-environment",
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
  },
  "vars": {
    "ENV_VAR": "demo"
  },
  "kv_namespaces": [
    {
      "binding": "DEMO_KV",
      "id": "<KV_NAMESPACE_ID>"
    }
  ],
  "secrets_store_secrets": [
    {
      "binding": "SECRET_STORE",
      "store_id": "<STORE_ID>",
      "secret_name": "SECRET_STORE_SECRET"
    }
  ]
}
```

`src/index.js` (only `startAndWaitForPort` differs from the other samples: it reads the values, then calls `start({ env })`):

```js
import { DurableObject } from "cloudflare:workers";

const INACTIVITY_TIMEOUT_MS = 60 * 1000;

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
			const [storedSecret, kvValue] = await Promise.all([
				this.env.SECRET_STORE.get(),
				this.env.DEMO_KV.get("KV_VALUE"),
			]);
			if (storedSecret === null || kvValue === null) {
				throw new Error(
					"Create the secret and KV value before starting the container",
				);
			}
			container.start({
				image: container.images.base,
				instance: "lite",
				enableInternet: false,
				env: {
					ENV_VAR: this.env.ENV_VAR,
					WORKER_SECRET: this.env.WORKER_SECRET,
					SECRET_STORE_SECRET: storedSecret,
					KV_VALUE: kvValue,
				},
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

`server.mjs` (the response includes only the two non-secret values):

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

Local testing: `.dev.vars` holds test values (add it to `.gitignore`; do not commit it):

```txt
WORKER_SECRET="local-worker-secret"
```

```sh
npx wrangler secrets-store secret create <STORE_ID> --name SECRET_STORE_SECRET --scopes workers
npx wrangler kv key put --binding DEMO_KV KV_VALUE 'Hello from local KV!' --local
npx wrangler dev
```

Non-secret Docker build arguments use `build_vars` on the named image (declare `ARG APP_VERSION` in the Dockerfile):

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "containers": [
    {
      "class_name": "MyContainer",
      "scheduling_policy": "durable_object",
      "images": {
        "base": {
          "dockerfile": "./Dockerfile",
          "build_vars": {
            "APP_VERSION": "1.0.0"
          }
        }
      }
    }
  ]
}
```

## Notes

- A running process keeps the environment it started with. Updating a secret or KV value takes effect on the next container start.
- The local Secrets Store command creates local data only; it does not read or update the deployed secret. Run it with the same store ID and secret name as the configuration.
- Build arguments do not become runtime environment variables. Keep secrets out of build arguments and container images.
- Wrangler 4.136.0 or later and a Docker-compatible engine are required for local development.

## Related

- [Environment variables](../references/containers/environment-variables.md)
- [Wrangler configuration](../references/containers/wrangler-configuration.md)
- [Durable Object Container API](../references/containers/durable-object-container.md)
