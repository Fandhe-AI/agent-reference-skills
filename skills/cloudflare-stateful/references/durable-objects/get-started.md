---
source: https://developers.cloudflare.com/durable-objects/get-started/
---

# Getting started

Create, run locally and deploy a first Durable Object with SQLite storage and a calling Worker: write the class, call it from a Worker, configure the binding and class declaration, then `wrangler dev` and `wrangler deploy`.

## Signature / Usage

Create the project:

```sh
npm create cloudflare@latest -- durable-object-starter
```

Final code:

```js
import { DurableObject } from "cloudflare:workers";
export class MyDurableObject extends DurableObject {
	constructor(ctx, env) {
		// Required, as we are extending the base class.
		super(ctx, env);
	}

	async sayHello() {
		let result = this.ctx.storage.sql
			.exec("SELECT 'Hello, World!' as greeting")
			.one();
		return result.greeting;
	}
}
export default {
	async fetch(request, env, ctx) {
		const stub = env.MY_DURABLE_OBJECT.getByName(new URL(request.url).pathname);

		const greeting = await stub.sayHello();

		return new Response(greeting);
	},
};
```

Bind the class in the Wrangler configuration:

```jsonc
{
	"durable_objects": {
		"bindings": [
			{
				"name": "MY_DURABLE_OBJECT",
				"class_name": "MyDurableObject"
			}
		]
	}
}
```

Register the class with SQLite storage in the `exports` field:

```jsonc
{
	"exports": {
		"MyDurableObject": {
			"type": "durable-object",
			"storage": "sqlite"
		}
	}
}
```

```toml
[exports.MyDurableObject]
type = "durable-object"
storage = "sqlite"
```

Run locally and deploy:

```sh
npx wrangler dev
npx wrangler deploy
```

## Options / Props

### `durable_objects.bindings[]` fields

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Required. Binding name used within your Worker. |
| `class_name` | `string` | — | Required. Class to bind to. |
| `script_name` | `string` | current environment's Worker code | Optional. Worker that defines the class when it lives in another Worker. |

## Notes

- Create-cloudflare prompts used in the guide: Hello World example, `Worker + Durable Objects`, TypeScript, git `Yes`, AGENTS.md `Yes`, deploy `No`.
- Durable Objects do not receive requests directly from the Internet; they receive requests from Workers or other Durable Objects through a binding that must be configured at upload time.
- Public methods on the class are exposed as RPC methods. `one()` checks the result has exactly one row.
- The `exports` field declares each Durable Object class so Cloudflare provisions a namespace on first deploy and manages rename/delete/transfer later. For Workers using the legacy `migrations` array, see the legacy migrations page.
- Corrected from the official docs: the page's Python Worker snippet defines `async def fetch(request)` without `self` while using `self.env`, and one TypeScript block has an unsupported MDX placeholder; only the JavaScript/TypeScript-correct forms are reproduced.
- `wrangler` commands and local development (Miniflare) are documented in the cloudflare-wrangler skill; the Worker handler model is in cloudflare-workers.

## Related

- [Create stubs and send requests](./create-stubs-and-send-requests.md)
- [Access storage](./access-storage.md)
- [Migrations (exports)](./migrations.md)
- [Legacy class migrations](./class-migrations-legacy.md)
- [Environments](./environments.md)
