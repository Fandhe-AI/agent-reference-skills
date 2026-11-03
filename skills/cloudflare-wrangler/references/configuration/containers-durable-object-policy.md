---
source: https://developers.cloudflare.com/workers/wrangler/configuration/#durable_object-scheduling-policy
---

# Containers: `durable_object` Scheduling Policy

The `durable_object` policy is in beta. Each Durable Object supplies its Container image or snapshot and instance size to `ctx.container.start()`. Set `scheduling_policy` to `"durable_object"` explicitly; the linked Durable Object must use SQLite storage.

## Signature / Usage

```jsonc
{
	"containers": [
		{
			"class_name": "AgentComputer",
			"scheduling_policy": "durable_object",
			"images": {
				"base": {
					"dockerfile": "./container/Dockerfile",
					"build_context": ".",
					"build_vars": {
						"APP_ENV": "production",
					},
				},
			},
		},
	],
	"durable_objects": {
		"bindings": [
			{
				"name": "AGENT_COMPUTER",
				"class_name": "AgentComputer",
			},
		],
	},
	"exports": {
		"AgentComputer": {
			"type": "durable-object",
			"storage": "sqlite",
		},
	},
}
```

```toml
[[containers]]
class_name = "AgentComputer"
scheduling_policy = "durable_object"

[containers.images.base]
dockerfile = "./container/Dockerfile"
build_context = "."

  [containers.images.base.build_vars]
  APP_ENV = "production"

[[durable_objects.bindings]]
name = "AGENT_COMPUTER"
class_name = "AgentComputer"

[exports.AgentComputer]
type = "durable-object"
storage = "sqlite"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `scheduling_policy` | `string` required | Must be `"durable_object"`. |
| `images` | `Record<string, object>` optional | Named images accessible via `ctx.container.images`. Up to 100 named images; each name 1-128 characters. Each must set exactly one of `dockerfile` or `image`. |
| `images.<name>.dockerfile` | `string` conditional | Path to a local Dockerfile; `wrangler deploy` builds and pushes it. |
| `images.<name>.build_context` | `string` optional | Build context relative to the Wrangler config file. Defaults to the directory of `dockerfile`. Only valid with `dockerfile`. Equivalent to `image_build_context` in the `default` policy. |
| `images.<name>.build_vars` | `Record<string, string>` optional | Build-time variables; equivalent to `image_vars`. Only valid with `dockerfile`. |
| `images.<name>.image` | `string` conditional | A digest-pinned image reference in the Cloudflare Registry. |
| `class_name` | `string` conditional | Durable Object class name. Omit when linked by `name` from `exports.<Class>.container`. |
| `name` | `string` conditional | Container application name. Defaults to Worker name plus class name. Required when `class_name` is omitted. |
| `observability` | `object` optional | Set `observability.enabled` or `observability.logs.enabled` to enable/disable application-wide logs. `target_instance_count` / `target_instance_percentage` are not supported. If omitted, Wrangler preserves the existing setting instead of inheriting the root Worker setting. |
| `unsafe.configuration.experimental_flags` | `string[]` optional | Experimental flags; the only `unsafe` setting accepted with this policy. |
| `ssh` | `object` optional | See the SSH section of [containers.md](./containers.md). The deprecated `wrangler_ssh` alias is not accepted. |
| `authorized_keys` | `object[]` optional | Public keys for the Container's `authorized_keys`. |

## Notes

- Wrangler rejects every other Container application field for this policy, including `image`, `instance_type`, `max_instances`, rollout settings, and placement constraints.
- Configure the startup image or snapshot and instance size in `ctx.container.start()`; see the Containers scheduling-policy docs for a code example.

## Related

- [containers.md](./containers.md)
