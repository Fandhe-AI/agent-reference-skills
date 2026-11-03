---
source: https://developers.cloudflare.com/workers/runtime-apis/bindings/
---

# Bindings (env)

Bindings let a Worker interact with resources on the Cloudflare Developer Platform, with better performance and fewer restrictions than the REST APIs. A binding is a permission and an API in one piece; the underlying secret is never exposed to Worker code.

## Signature / Usage

```jsonc
{
	"main": "./src/index.js",
	"upload_source_maps": true,
	"r2_buckets": [
		{
			"binding": "MY_BUCKET",
			"bucket_name": "<MY_BUCKET_NAME>"
		}
	]
}
```

```js
export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const key = url.pathname.slice(1);
		await env.MY_BUCKET.put(key, request.body);
		return new Response(`Put ${key} successfully!`);
	},
};
```

### Accessing `env`

```js
export default {
	async fetch(request, env) {
		return new Response(`Hi, ${env.NAME}`);
	},
};
```

```js
export class MyDurableObject extends DurableObject {
	async sayHello() {
		return `Hi, ${this.env.NAME}!`;
	}
}
```

```js
import { env } from "cloudflare:workers";
console.log(`Hi, ${env.NAME}`);
```

### Overriding `env` values with `withEnv`

```js
import { env, withEnv } from "cloudflare:workers";

function logName() {
	console.log(env.NAME);
}

export default {
	fetch(req) {
		// this will log "Alice"
		logName();

		withEnv({ NAME: "Bob" }, () => {
			// this will log "Bob"
			logName();
		});

		// ...etc...
	},
};
```

### Available bindings

| Binding | Details |
|---------|---------|
| AI | https://developers.cloudflare.com/workers-ai/get-started/workers-wrangler/#2-connect-your-worker-to-workers-ai |
| AI Search | https://developers.cloudflare.com/ai-search/api/search/workers-binding/ |
| Analytics Engine | https://developers.cloudflare.com/analytics/analytics-engine/ |
| Analytics SQL binding | [analytics-sql.md](./analytics-sql.md) |
| Assets | https://developers.cloudflare.com/workers/static-assets/binding/ |
| Browser Run | https://developers.cloudflare.com/browser-run/ |
| D1 | See the cloudflare-storage skill. |
| Dispatcher (Workers for Platforms) | https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/dynamic-dispatch/ |
| Durable Objects | https://developers.cloudflare.com/durable-objects/api/ |
| Dynamic Worker Loaders | https://developers.cloudflare.com/workers/runtime-apis/bindings/worker-loader/ |
| Environment Variables | [environment-variables.md](./environment-variables.md) |
| Hyperdrive | See the cloudflare-storage skill. |
| Images | https://developers.cloudflare.com/images/optimization/binding/ |
| KV | See the cloudflare-storage skill. |
| Media Transformations | https://developers.cloudflare.com/stream/transform-videos/bindings/ |
| mTLS | [mtls.md](./mtls.md) |
| Queues | https://developers.cloudflare.com/queues/configuration/javascript-apis/ |
| R2 | See the cloudflare-storage skill. |
| Rate Limiting | [rate-limit.md](./rate-limit.md) |
| Secrets | [secrets.md](./secrets.md) |
| Secrets Store | https://developers.cloudflare.com/secrets-store/integrations/workers/ |
| Service bindings | [service-bindings.md](./service-bindings.md) |
| Stream | https://developers.cloudflare.com/stream/manage-video-library/bindings/ |
| Vectorize | https://developers.cloudflare.com/vectorize/reference/client-api/ |
| Version metadata | [version-metadata.md](./version-metadata.md) |
| Workflows | https://developers.cloudflare.com/workflows/ |

## Notes

- During local development, bindings connect to locally simulated resources by default; they can be configured to connect to real resources via remote bindings (https://developers.cloudflare.com/workers/local-development/#remote-bindings).
- Wrangler configuration keys are covered by the cloudflare-wrangler skill.
- Changing only bindings may reuse existing isolates. Do not cache derivatives of bindings (for example a client built from a secret) in global scope; construct them per request. Example of the good approach:

```ts
export default {
	fetch(request, env) {
		let client = new Client(env.MY_SECRET); // `client` is guaranteed to be up-to-date with the latest value of `env.MY_SECRET` since a new instance is constructed with every incoming request

		// ... do things with `client`
	},
};
```

- Importing `env` from `cloudflare:workers` is useful for top-level scope (for example initializing an API client from `env.API_KEY`). Workers do not allow I/O outside a request context, so at top level environment variables and secrets work, and `env.NAMESPACE.get` (a Durable Object stub) works, but calling stub methods, KV calls, and calls to other Workers will not.
- Passing `env` as an argument remains a helpful pattern for dependency injection and testing; `withEnv` is useful when testing code that relies on an imported `env`.
- For more advanced needs, see the AsyncLocalStorage API: https://developers.cloudflare.com/workers/runtime-apis/nodejs/asynclocalstorage/
- The official page's snippets use `Response.new(...)` in the JS top-level scope examples; the standard constructor is `new Response(...)` (the page's own other examples use it).

## Related

- [service-bindings.md](./service-bindings.md)
- [secrets.md](./secrets.md)
- [environment-variables.md](./environment-variables.md)
