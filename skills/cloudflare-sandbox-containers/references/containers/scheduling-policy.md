---
source: https://developers.cloudflare.com/containers/configuration/scheduling-policy/, https://developers.cloudflare.com/containers/guides/migrate-to-durable-object-scheduling-policy/
---

# Scheduling policies

A scheduling policy decides where a Container's image and instance size are configured and how image updates apply. It is chosen when the Container application is created and is immutable.

## Signature / Usage

`durable_object` policy (public beta): named images in Wrangler, selected in Durable Object code.

```jsonc
{
	"name": "agent-computer",
	"main": "src/index.ts",
	"upload_source_maps": true,
	"compatibility_date": "2026-09-29",
	"containers": [
		{
			"class_name": "AgentComputer",
			"scheduling_policy": "durable_object",
			"images": {
				"base": {
					"dockerfile": "./container/Dockerfile",
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

```js
import { DurableObject } from "cloudflare:workers";

export class AgentComputer extends DurableObject {
	startContainer() {
		if (this.ctx.container.running) {
			return;
		}

		this.ctx.container.start({
			image: this.ctx.container.images.base,
			instance: "standard-2",
			enableInternet: false,
		});
	}
}
```

`default` policy (policy omitted means `default`):

```jsonc
{
	"containers": [
		{
			"class_name": "ApiContainer",
			"scheduling_policy": "default",
			"image": "./api/Dockerfile",
			"instance_type": "standard-1",
			"max_instances": 5,
		},
	],
}
```

Cloudflare-managed image and a custom instance object. Adapted (not in the official docs): the two `start()` fragments are wrapped in Durable Object methods (the source used `this` at top level); only one of them runs per container start.

```js
import { DurableObject } from "cloudflare:workers";

export class AgentComputer extends DurableObject {
	startManagedImage() {
		this.ctx.container.start({
			image: "cloudflare/debian-trixie",
			instance: "standard-2",
			enableInternet: false,
		});
	}

	startCustomInstance() {
		this.ctx.container.start({
			image: this.ctx.container.images.base,
			enableInternet: false,
			instance: {
				vcpu: 1,
				memoryMib: 4096,
				diskMb: 8000,
			},
		});
	}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `default` policy: where configured | — | — | Wrangler configuration (`image`, `instance_type`, `max_instances`). Updates apply application-wide through rollouts. Best for services whose instances share one image and size. |
| `durable_object` policy: where configured | — | — | Durable Object code calling `ctx.container.start()`; code picks the image each time. Best for sandboxes and agent environments with per-instance configuration. |
| containers[].images | Record<string, { dockerfile \| image, build_context?, build_vars? }> | — | (durable_object policy only) Each key becomes a property on `ctx.container.images`. Each value has exactly one source: `dockerfile` (built on `wrangler deploy`) or `image` (digest-pinned `registry.cloudflare.com/<ACCOUNT_ID>/<REPOSITORY>@sha256:<DIGEST>`). Up to 100 named images; names 1 to 128 characters. |
| instance (start option) | string \| object | `lite` | (durable_object policy only) `lite`, `standard-1`, `standard-2`, `standard-3`, `standard-4`, or `{ vcpu, memoryMib, diskMb }`. |

Migration mapping from `default` to `durable_object`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| image (Dockerfile path) | — | — | becomes `dockerfile` on a named `images` entry, selected in `start()`. |
| image (registry reference) | — | — | becomes `image` on a named entry; must be digest-pinned in the Cloudflare managed registry. |
| image_build_context, image_vars | — | — | become `build_context`, `build_vars` on the named image. |
| instance_type | — | — | becomes the `instance` start option. `dev` maps to `lite`, `standard` to `standard-1`, `basic` to `lite` or `standard-1`. |
| max_instances | — | — | Not supported; enforce any cap in application code. Instances count toward account limits. |
| observability, unsafe.configuration.experimental_flags, ssh, authorized_keys | — | — | Keep in Wrangler configuration. |
| Placement constraints, rollout settings, wrangler_ssh, trusted_user_ca_keys | — | — | Not supported on the replacement application. |

## Notes

- One Wrangler configuration can contain applications with both policies. The `durable_object` policy does not support `max_instances`.
- `ctx.container.start()` returns before the container is ready; add a readiness check before sending traffic or calling `exec()`. The runtime accepts neither `basic` nor the legacy `dev` / `standard` aliases for `instance`; the runtime camel case (`memoryMib`, `diskMb`) differs from Wrangler's snake case (`memory_mib`, `disk_mb`) which only applies to the `default` policy.
- Direct references to Docker Hub, Amazon ECR or Google Artifact Registry are not supported for named images; push to the Cloudflare managed registry first (see image-management.md). `cloudflare/debian-trixie` includes Node.js 24.20.0 on Debian Trixie slim.
- The image map ships with the Worker version; updating it does not restart instances. During a gradual deployment `ctx.container.images` reflects the map of the Worker version running that Durable Object. `durable_object` instances do not take part in rollouts; application code decides when to stop and restart with another image.
- `image` and `containerSnapshot` are mutually exclusive; snapshots are `durable_object` only and tied to the image they came from (see snapshots.md). `ssh` and `authorized_keys` are supported (see ssh.md).
- The `Container` class does not support `durable_object` applications; use the Durable Object Container API.
- Migration procedure (the policy cannot be changed in place): add a new SQLite-backed Durable Object class, binding and a Container entry with `"scheduling_policy": "durable_object"`, a different `name`, and the new `class_name`; keep the old entry, class and binding unchanged. Do not flip `scheduling_policy` on the existing entry: `wrangler deploy` ships the new Worker version before configuring the application and would fail with the new code live. Instances and Durable Object storage do not transfer and `default` has no snapshots, so design any data transfer yourself. Namespaces differ, so choose the binding per logical container (record which namespace each sandbox uses) rather than per request; mixing can run two diverging containers for one name. Replace a `Container` subclass with the Durable Object Container API, and set `enableInternet` explicitly (the `Container` class allowed Internet unless disabled). Keep the old application during an observation period; rolling back routes to the old binding, but writes made after cutover stay in the new namespace.
- Cleaning up: removing the entry from Wrangler does not delete the old application. Run `npx wrangler containers list`, then `npx wrangler containers delete <OLD_APPLICATION_ID>` (deletes its instances). Delete the old Durable Object class only when its data is no longer needed; that permanently deletes the namespace.
- Routing sketch from the official page (isMigrated is application code): `const binding = (await isMigrated(sandboxName)) ? env.DURABLE_SANDBOX : env.SANDBOX; const sandbox = binding.getByName(sandboxName);`.

## Related

- [Wrangler configuration](./wrangler-configuration.md)
- [Rollouts](./rollouts.md)
- [Image management](./image-management.md)
- [Durable Object Container API](./durable-object-container.md)
- [API comparison](./api-comparison.md)
