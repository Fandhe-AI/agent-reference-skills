---
source: https://developers.cloudflare.com/workers/wrangler/configuration/#containers
---

# Containers (default scheduling policy)

Define Containers to run alongside your Worker with the `containers` field. Each Container application has a scheduling policy that determines whether image and instance configuration is managed centrally (`default`) or supplied by Durable Object code at runtime (`durable_object`; see [containers-durable-object-policy.md](./containers-durable-object-policy.md)). The policy is immutable after the application is created.

## Signature / Usage

```jsonc
{
	"containers": [
		{
			"class_name": "MyContainer",
			"scheduling_policy": "default", // Optional, defaults to "default". Cannot be changed after the application is created.
			"image": "./Dockerfile",
			"max_instances": 10,
			"instance_type": "basic", // Optional, defaults to "lite"
			"observability": {
				"enabled": true,
				"target_instance_percentage": 25,
			},
			"image_vars": {
				"FOO": "BAR",
			},
			"constraints": {
				"regions": ["ENAM", "WNAM"],
				"jurisdiction": "fedramp",
			},
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
[[containers]]
class_name = "MyContainer"
scheduling_policy = "default"
image = "./Dockerfile"
max_instances = 10
instance_type = "basic"

  [containers.observability]
  enabled = true
  target_instance_percentage = 25

  [containers.image_vars]
  FOO = "BAR"

  [containers.constraints]
  regions = [ "ENAM", "WNAM" ]
  jurisdiction = "fedramp"

[[durable_objects.bindings]]
name = "MY_CONTAINER"
class_name = "MyContainer"

[exports.MyContainer]
type = "durable-object"
storage = "sqlite"
```

## Options / Props

The `default` policy stores the image and instance configuration on the Container application and manages deployments as rollouts. Used when `scheduling_policy` is omitted or `"default"`.

| Name | Type | Description |
|------|------|-------------|
| `scheduling_policy` | `string` optional | `"default"`, or omit. |
| `image` | `string` required | Local path to a `Dockerfile` (`wrangler deploy` builds and pushes the image) or an image reference. Supported registries: Cloudflare Registry, Docker Hub, Amazon ECR, Google Artifact Registry. |
| `class_name` | `string` conditional | Corresponding Durable Object class name; makes it a container-enabled Durable Object. Omit when the Container is linked by `name` from `exports.<Class>.container`. |
| `name` | `string` conditional | Container identifier. Defaults to a combination of Worker name, class name, and environment. Required when `class_name` is omitted so that `exports.<Class>.container` can reference it. |
| `instance_type` | `string \| object` optional | `"lite"` (default), `"basic"`, `"standard-1"`, `"standard-2"`, `"standard-3"`, `"standard-4"`, or a custom object (see below). |
| `max_instances` | `number` optional | Maximum concurrent container instances (stopped ones do not count). Defaults to 20. Only enforced in production, not local development. If a start request exceeds the limit, it errors. |
| `image_build_context` | `string` optional | Build context; defaults to the directory of `image`. |
| `image_vars` | `Record<string, string>` optional | Build-time variables, like `--build-arg` with `docker build`. For runtime variables, pass them to `ctx.container.start()`. |
| `rollout_active_grace_period` | `number` optional | During a rollout, minimum seconds an instance must already have been connected to its Durable Object before it may be replaced. Defaults to `0`. Still applies with `--containers-rollout=immediate`. |
| `rollout_step_percentage` | `number \| number[]` optional | Percentage of instances updated per rollout step. A single number (`5`, `10`, `20`, `25`, `50`, or `100`), or an array of ascending integers from `10` through `100`, ending in `100`, at most 10 entries and no more than `max_instances`; values are cumulative. Defaults to `100` if `max_instances` is omitted or less than `2`; otherwise `[10, 100]`. Override for one deploy with `--containers-rollout=immediate`. |
| `observability` | `object` optional | Overrides the root Worker observability for this application; if omitted, the top-level `observability` is the fallback. |
| `observability.enabled` | `boolean` optional | Shorthand for `observability.logs.enabled`. |
| `observability.logs.enabled` | `boolean` optional | Whether logs for this container are persisted. |
| `observability.target_instance_percentage` | `number` optional | Apply application-level observability changes to this percentage of running instances; integer 1 to 99; not with `target_instance_count`; requires observability enabled. |
| `observability.target_instance_count` | `number` optional | Apply to this many running instances; positive integer; not with `target_instance_percentage`; requires observability enabled. |
| `unsafe.configuration.experimental_flags` | `string[]` optional | Experimental application flags. |
| `ssh` | `object` optional | SSH through Wrangler; see "SSH and authorized keys" below. |
| `wrangler_ssh` | `object` optional, deprecated | Deprecated alias for `ssh`. |
| `authorized_keys` | `object[]` optional | Public keys added to the Container's `authorized_keys`. |
| `constraints` | `object` optional | Placement constraints. |
| `constraints.regions` | `string[]` optional | `"ENAM"`, `"WNAM"`, `"EEUR"`, `"WEUR"`, `"APAC"`, `"SAM"`, `"ME"`, `"OC"`, `"AFR"`. |
| `constraints.jurisdiction` | `string` optional | `"eu"`, `"fedramp"`. |

### Custom instance types

Applies only to the `default` policy. With `durable_object`, pass a custom instance object to `ctx.container.start()` instead.

| Name | Type | Description |
|------|------|-------------|
| `vcpu` | `number` optional | vCPU. Defaults to `0.0625` (1/16 vCPU). |
| `memory_mib` | `number` optional | Memory in MiB. Defaults to `256`. |
| `disk_mb` | `number` optional | Disk in MB. Defaults to `2000` (2GB). |

```jsonc
{
	"containers": [
		{
			"image": "./Dockerfile",
			"instance_type": {
				"vcpu": 1,
				"memory_mib": 3072,
				"disk_mb": 4000,
			},
		},
	],
}
```

### SSH and authorized keys

Configuration for SSH access to a Container instance through Wrangler. Applies to both the `default` and `durable_object` scheduling policies.

`ssh`:

| Name | Type | Description |
|------|------|-------------|
| `enabled` | `boolean` optional | Whether SSH through Wrangler is enabled. Defaults to `true`. Set `false` to disable SSH access. |
| `port` | `number` optional | Port for the SSH service. Defaults to `22`. |

`authorized_keys` entries (public keys that can be used to SSH into a Container):

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` required | Display name of the key. |
| `public_key` | `string` required | The public key itself. Currently only the `ssh-ed25519` key type is supported. |

## Notes

- The official docs give no code example for the SSH keys; the tables above are transcribed from the option lists (source anchors `#ssh` and `#authorized-keys`).
- Each Container application must link to a Durable Object defined in the same Worker. Set `class_name` on the Container entry, or set `name` and reference it from `exports.<Class>.container`. Configure exactly one of these linkage directions.
- Docs quirk: the `observability` option is listed twice in the source option list (once as "Overrides the root Worker observability configuration", once with the sub-keys); merged here.
- Container runtime behavior and the Durable Object Container API are documented by the Containers docs.
- Container runtime variables: the 2026-11-14 official page says to pass them to `ctx.container.start()`; the previous revision pointed to secret bindings or `envVars` on the Container class.
- Source: https://developers.cloudflare.com/workers/wrangler/configuration/ (cloudflare-docs production `34d908a`, fetched 2026-11-14)

## Related

- [containers-durable-object-policy.md](./containers-durable-object-policy.md)
- [bindings-durable-objects.md](./bindings-durable-objects.md)
- [observability.md](./observability.md)
