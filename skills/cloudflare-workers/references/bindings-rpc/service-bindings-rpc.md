---
source: https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/rpc/
---

# RPC (WorkerEntrypoint)

Extend the built-in `WorkerEntrypoint` class and add public methods to create internal APIs that other Workers call through a Service binding.

## Signature / Usage

Worker B:

```ts
import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint {
	add(a: number, b: number) {
		return a + b;
	}
}
```

Worker A binding (`wrangler.jsonc`):

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "worker-a",
	"main": "./src/index.ts",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"upload_source_maps": true,
	"services": [
		{
			"binding": "WORKER_B",
			"service": "worker-b"
		}
	]
}
```

Worker A call:

```ts
export default {
	async fetch(_request, env): Promise<Response> {
		const result = await env.WORKER_B.add(1, 2);
		return new Response(result.toString());
	},
} satisfies ExportedHandler<Env>;
```

TypeScript types and local run (from the `worker-a` directory / the parent directory):

```
npx wrangler types -c ./wrangler.jsonc -c ../worker-b/wrangler.jsonc
```

```
npx wrangler dev -c ./worker-a/wrangler.jsonc -c ./worker-b/wrangler.jsonc
```

### `env` and `ctx` on the class

`env` and `ctx` are class properties of `WorkerEntrypoint`:

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint {
  fetch() { return new Response("Hello from my-worker"); }

  async greet(name) {
    return this.env.GREETING + name;
  }
}
```

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint {
  fetch() { return new Response("Hello from my-worker"); }

  async signup(email, name) {
    // sendEvent() will continue running, even after this method returns a value to the caller
    this.ctx.waitUntil(this.#sendEvent("signup", email))
    // Perform any other work
    return "Success";
  }

  async #sendEvent(eventName, email) {
    //...
  }
}
```

### Fetching static assets

RPC methods receive no `request`; construct a `Request` with any hostname (only the pathname matters):

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export class ImageWorker extends WorkerEntrypoint {
	async getImage(path) {
		return this.env.ASSETS.fetch(new Request(`https://assets.local${path}`));
	}
}
```

```js
const response = await env.IMAGE_SERVICE.getImage("/images/logo.png");
```

### Named entrypoints

Export any number of named `WorkerEntrypoint` classes in addition to the default export, and bind to one with `entrypoint`:

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export class AdminEntrypoint extends WorkerEntrypoint {
  async createUser(username) {
    await this.env.D1.prepare("INSERT INTO users (username) VALUES (?)")
      .bind(username)
      .run();
  }

  async deleteUser(username) {
    await this.env.D1.prepare("DELETE FROM users WHERE username = ?")
      .bind(username)
      .run();
  }
}
```

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "admin-app",
	"services": [
		{
			"binding": "ADMIN",
			"service": "todo-app",
			"entrypoint": "AdminEntrypoint"
		}
	]
}
```

```js
export default {
  async fetch(request, env) {
    await env.ADMIN.createUser("aNewUser");
    return new Response("Hello from admin app");
  },
};
```

## Notes

- A new instance of the class is created every time the Worker is called. The Worker is still stateless; use Durable Objects (https://developers.cloudflare.com/durable-objects) to persist or coordinate state.
- For TypeScript, pass both config files to `wrangler types` so Wrangler resolves Worker B's default export; `WORKER_B` is then typed as a `Service` with `add()`. Do not set `entrypoint` to `default`; omitting `entrypoint` selects the default export.
- RPC requires a compatibility date of `2024-04-03` or later, or the `rpc` compatibility flag (see [rpc.md](./rpc.md)).
- D1 usage in the named-entrypoint example: see the cloudflare-storage skill.
- RPC also works between Workers and Durable Objects (cloudflare-stateful skill; https://developers.cloudflare.com/durable-objects/best-practices/create-durable-object-stubs-and-send-requests/#invoke-rpc-methods).
- Complete example (to-do app and Discord bot): https://github.com/cloudflare/js-rpc-and-entrypoints-demo

- If the calling Worker's execution context ends, the called Worker's RPC execution context is canceled. This can happen when the original client disconnects. See [service-bindings.md](./service-bindings.md) (Request cancellation) and [rpc-lifecycle.md](./rpc-lifecycle.md).
- Source: https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/rpc/ (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [rpc.md](./rpc.md)
- [rpc-lifecycle.md](./rpc-lifecycle.md)
- [rpc-visibility.md](./rpc-visibility.md)
- [rpc-typescript.md](./rpc-typescript.md)
- [service-bindings.md](./service-bindings.md)
