---
source: https://developers.cloudflare.com/containers/configuration/wrangler/
---

# Wrangler configuration for Containers

A Container application needs a `containers` entry, a Durable Object binding, and a Durable Object class export. The cloudflare-wrangler skill owns the full `containers` key table; this page covers the Containers-docs view.

## Signature / Usage

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "my-container-worker",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"containers": [
		{
			"class_name": "MyContainer",
			"image": "./Dockerfile",
			"max_instances": 10,
		},
	],
	"durable_objects": {
		"bindings": [
			{
				"name": "MY_CONTAINER",
				"class_name": "MyContainer",
			},
		],
	},
	"exports": {
		"MyContainer": {
			"type": "durable-object",
			"storage": "sqlite",
		},
	},
}
```

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "my-container-worker"
main = "src/index.ts"
upload_source_maps = true
# Set this to today's date
compatibility_date = "2026-11-03"

[[containers]]
class_name = "MyContainer"
image = "./Dockerfile"
max_instances = 10

[[durable_objects.bindings]]
name = "MY_CONTAINER"
class_name = "MyContainer"

[exports.MyContainer]
type = "durable-object"
storage = "sqlite"
```

## Options / Props

The three sections:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| containers | array | — | Defines the container image and associates it with a Durable Object class through `class_name`. |
| durable_objects.bindings | array | — | Makes the Durable Object namespace available to Worker code (here `env.MY_CONTAINER`). |
| exports | object | — | Declares the Durable Object class and provisions SQLite storage. |

The `containers` entry can also set instance type, maximum running instances, image build, placement constraints, rollouts, and SSH access. Keys the sibling pages in this category document:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| scheduling_policy | string | `"default"` | `"default"` or `"durable_object"`; see scheduling-policy.md. |
| image | string | — | Dockerfile path or image reference. See image-management.md. |
| instance_type | string \| object | `"lite"` | Predefined name or custom `{ vcpu, memory_mib, disk_mb }`. See limits.md. |
| max_instances | number | — | Maximum concurrent instances, enforced in production only. |
| constraints | object | — | `regions` and `jurisdiction`; see placement.md. |
| rollout_active_grace_period, rollout_step_percentage | number, number \| number[] | — | See rollouts.md. |
| ssh, authorized_keys | object, object[] | — | See ssh.md. |

## Notes

- `class_name` in `containers` and in `durable_objects.bindings`, and the key in `exports`, must match the exported Durable Object class in your Worker.
- Existing applications using the legacy `migrations` array can keep it. Do not configure `exports` and `migrations` together.
- The cloudflare-wrangler skill (`wrangler.jsonc` keys for containers) is the authoritative key table, including defaults not repeated here (for example the `max_instances` default and the allowed values of `rollout_step_percentage`); where this page and that skill differ, defer to that skill.
- The placement page lists jurisdictions `eu`, `us`, and `fedramp`; the Wrangler key reference lists `eu` and `fedramp`. Check the cloudflare-wrangler skill before relying on `us`.

## Related

- [Overview](./overview.md)
- [Scheduling policy](./scheduling-policy.md)
- [Rollouts](./rollouts.md)
- [Placement](./placement.md)
- [Image management](./image-management.md)
