---
source: https://developers.cloudflare.com/durable-objects/reference/environments/
---

# Environments

Durable Object bindings are configured per Wrangler environment and are not inherited. By default an environment binding points at that environment's own Worker (different objects and storage); use `script_name` to share the top-level objects.

## Signature / Usage

```jsonc
{
	"env": {
		"staging": {
			"durable_objects": {
				"bindings": [
					{
						"name": "EXAMPLE_CLASS",
						"class_name": "DurableObjectExample"
					}
				]
			}
		}
	}
}
```

Equivalent to (Worker named `worker-name`):

```jsonc
{
	"env": {
		"staging": {
			"durable_objects": {
				"bindings": [
					{
						"name": "EXAMPLE_CLASS",
						"class_name": "DurableObjectExample",
						"script_name": "worker-name-staging"
					}
				]
			}
		}
	}
}
```

Share the top-level Worker's objects from another environment:

```jsonc
{
	"env": {
		"another": {
			"durable_objects": {
				"bindings": [
					{
						"name": "EXAMPLE_CLASS",
						"class_name": "DurableObjectExample",
						"script_name": "worker-name"
					}
				]
			}
		}
	}
}
```

```toml
[[env.another.durable_objects.bindings]]
name = "EXAMPLE_CLASS"
class_name = "DurableObjectExample"
script_name = "worker-name"
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Binding name. |
| `class_name` | `string` | — | Durable Object class. |
| `script_name` | `string` | environment's own Worker (`<worker-name>-<env>`) | Worker whose objects the binding reaches; set it to the top-level Worker name to share objects across environments. |

## Notes

- Wrangler appends the environment name to the top-level Worker name, so the staging `EXAMPLE_CLASS` binding reaches different objects with different persistent storage than the top-level binding.
- Migrations may be defined per environment and override top-level ones; see the legacy migrations and exports pages.
- Local development creates a standalone local-only environment mirroring production. Remote development in the dashboard playground is available only for KV-backed Durable Objects, not SQLite-backed ones. Wrangler environments and local development are documented in the cloudflare-wrangler skill.

## Related

- [Class exports (declarative)](./migrations.md)
- [Legacy class migrations](./class-migrations-legacy.md)
- [Get started](./get-started.md)
