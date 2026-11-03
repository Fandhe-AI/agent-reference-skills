---
source: https://developers.cloudflare.com/containers/configuration/rollouts/
---

# Rollouts

A rollout applies a target container application configuration (image, instance type, limits, placement, other settings) after you deploy a Worker that uses Containers. Applies only to the `default` scheduling policy.

## Signature / Usage

Immediate rollout for one deploy (`npx wrangler deploy` form; yarn and pnpm equivalents work too):

```
npx wrangler deploy --containers-rollout=immediate
```

Configuration with a 300 second grace period and steps `[10, 100]`:

```jsonc
{
	"containers": [
		{
			"max_instances": 10,
			"class_name": "MyContainer",
			"image": "./Dockerfile",
			"rollout_active_grace_period": 300,
			"rollout_step_percentage": [10, 100],
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

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| rollout_step_percentage | number \| number[] | `100` if `max_instances` is omitted or less than 2; otherwise `[10, 100]` | Rollout steps. |
| rollout_active_grace_period | number (seconds) | `0` | Minimum time an instance must already have been connected to its Durable Object before a rollout may replace it. Applies in every mode, including immediate. |
| `--containers-rollout` (flag) | `immediate` \| `none` | omitted (gradual) | `immediate` targets 100% in one step; `none` deploys Worker code only. |

## Notes

- `wrangler deploy` uploads and activates the new Worker version first, builds and pushes a Dockerfile image if needed, then starts the rollout. The steps are not transactional, so the Worker can stay active if a later step fails. Success means the rollout started, not that every instance was replaced. The first deploy creates the application directly; a deploy with no effective container change starts no rollout. `--containers-rollout` applies to `wrangler deploy` only, not `wrangler versions upload`.
- While an image change rolls out, new Worker code can still reach instances on the previous image; prefer compatible changes, or use `immediate` (shortest mixed window, but not zero).
- Gradual (default): first step targets about 10% (raised so it is at least one instance at `max_instances`), then 100%. Replacement of each instance: skip while inside the grace period; send `SIGTERM`; up to 15 minutes to exit; `SIGKILL` if still running; `onStop` can then run; a new instance starts with the target image. The fleet is not restarted at once.
- Startup often takes seconds; a request needing the new instance may wait or fail on a shorter client or Worker timeout.
- `none` leaves images and running instances unchanged. If `image` is a Dockerfile path and Docker is unavailable, Wrangler may require this flag or a working Docker setup.
- Rollouts do not change Durable Object storage. Disk is ephemeral.
- Field names and values: the cloudflare-wrangler skill owns the key table.

## Related

- [Architecture and lifecycle](./architecture.md)
- [Deploy](./deploy.md)
- [Image management](./image-management.md)
- [Scheduling policy](./scheduling-policy.md)
