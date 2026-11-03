---
source: https://developers.cloudflare.com/kv/reference/environments/
---

# Environments

Bind different KV namespaces to the same binding name across Wrangler environments such as staging and production.

## Signature / Usage

```jsonc
{
	"env": {
		"staging": {
			"kv_namespaces": [
				{
					"binding": "MY_KV",
					"id": "e29b263ab50e42ce9b637fa8370175e8"
				}
			]
		},
		"production": {
			"kv_namespaces": [
				{
					"binding": "MY_KV",
					"id": "a825455ce00f4f7282403da85269f8ea"
				}
			]
		}
	}
}
```

Insert a value into the staging namespace:

```sh
wrangler kv key put --env=staging --binding=<YOUR_BINDING> "<KEY>" "<VALUE>"
```

`--namespace-id` is unique, so no `--env` is needed:

```sh
wrangler kv key put --namespace-id=<YOUR_ID> "<KEY>" "<VALUE>"
```

Top-level default plus a production override:

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "my-worker",
	"account_id": "<account id here>",
	"route": "staging.example.com/*",
	"workers_dev": false,
	"kv_namespaces": [
		{
			"binding": "MY_KV",
			"id": "06779da6940b431db6e566b4846d64db"
		}
	],
	"env": {
		"production": {
			"route": "example.com/*",
			"kv_namespaces": [
				{
					"binding": "MY_KV",
					"id": "07bc1f3d1f2a4fd8a45a7e026e2681c6"
				}
			]
		}
	}
}
```

```sh
wrangler kv key get --binding "MY_KV" --env=production "<KEY>"
```

## Notes

- Using the same binding name for different namespaces keeps Worker code readable: `MY_KV.get("KEY")` reads from the namespace of the active environment.
- Since Wrangler 3.60.0 the `kv ...` syntax is supported; earlier versions use the deprecated `kv:...` syntax.
- Most `kv` subcommands accept the optional `--env` flag.
- Wrangler environments in general belong to the cloudflare-wrangler skill.

## Related

- [kv-bindings.md](./kv-bindings.md)
- [kv-commands.md](./kv-commands.md)
