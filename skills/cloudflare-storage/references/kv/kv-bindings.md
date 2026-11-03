---
source: https://developers.cloudflare.com/kv/concepts/kv-bindings/
---

# KV bindings

KV bindings let a Worker communicate with a KV namespace. They are configured in the Wrangler configuration file.

## Signature / Usage

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "worker",
	// ...
	"kv_namespaces": [
		{
			"binding": "TODO",
			"id": "06779da6940b431db6e566b4846d64db"
		}
	]
}
```

The deployed Worker then has a `TODO` field in its `env` object:

```js
export default {
  async fetch(request, env, ctx) {
    // Get the value for the "to-do:123" key
    // NOTE: Relies on the `TODO` KV binding that maps to the "My Tasks" namespace.
    let value = await env.TODO.get("to-do:123");

    // Return the value, as is, for the Response
    return new Response(value);
  },
};
```

Durable Objects and ES modules Workers expose bindings as properties of `env`:

```js
import { DurableObject } from "cloudflare:workers";

export class MyDurableObject extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
  }

  async fetch(request) {
    const valueFromKV = await this.env.NAMESPACE.get("someKey");
    return new Response(valueFromKV);
  }
}
```

## Notes

- The binding name does not need to match the namespace name. It should be a valid JavaScript identifier, because it exists as a variable in your Worker.
- `wrangler dev` defaults to a local version of KV to avoid touching production data, so reading keys not written locally returns `null`. Set `"remote": true` in the KV binding configuration to connect `wrangler dev` to the namespace on Cloudflare's global network (see remote bindings in the cloudflare-workers skill).
- For `env` and bindings as a general concept, see the cloudflare-workers skill.

## Related

- [kv-namespaces.md](./kv-namespaces.md)
- [environments.md](./environments.md)
- [api-overview.md](./api-overview.md)
