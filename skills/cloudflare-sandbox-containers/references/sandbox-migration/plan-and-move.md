---
source: https://developers.cloudflare.com/sandbox/sdk/migrate/replace-the-sandbox-class/, https://developers.cloudflare.com/sandbox/sdk/migrate/plan-the-move/, https://developers.cloudflare.com/sandbox/sdk/migrate/move-side-by-side/
---

# Replace the Sandbox class, plan the switch, move side by side

Replace the 0.12 `Sandbox` class with a Durable Object class you write, then choose between an in-place switch (one deploy) and a side-by-side move.

## Signature / Usage

Wrangler configuration for the replacement (keep the class name and binding; give the container application a new `name`):

```jsonc
{
	"containers": [
		{
			"class_name": "MySandbox",
			"name": "my-worker-mysandbox-v2",
			"scheduling_policy": "durable_object",
			"images": {
				"sandbox": {
					"dockerfile": "./Dockerfile",
				},
			},
		},
	],
}
```

The 1.0 class (replaces `sleepAfter`, `envVars` and `onStart()`). Adapted (not in the official docs): `enableInternet` is `false` here instead of the official `true` (kept only to match the 0.12 default), because the sandbox runs generated or untrusted commands; see Notes.

```ts
import { DurableObject } from "cloudflare:workers";

// Replaces sleepAfter and envVars.
const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;
const ENV = { NODE_ENV: "test" };

export class MySandbox extends DurableObject<Env> {
	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		const container = ctx.container;
		// A restarted Durable Object sets the timeout again.
		if (container?.running) {
			void ctx.blockConcurrencyWhile(() =>
				container.setInactivityTimeout(
					INACTIVITY_TIMEOUT_MS,
				),
			);
		}
	}

	private get container(): Container {
		const container = this.ctx.container;

		if (!container) {
			throw new Error("No container is configured");
		}

		return container;
	}

	private setup: Promise<void> | null = null;

	private ensureRunning(): Promise<void> {
		// Set up each new container, and a running container
		// after this Durable Object restarts.
		if (this.setup === null || !this.container.running) {
			this.setup = this.startContainer().catch((error) => {
				this.setup = null;
				throw error;
			});
		}
		return this.setup;
	}

	private async startContainer(): Promise<void> {
		const newContainer = !this.container.running;

		if (newContainer) {
			this.container.start({
				image: this.container.images.sandbox,
				instance: "standard-1",
				env: ENV,
				// 0.12 allowed Internet access by default; set true only if the commands need it.
				enableInternet: false,
			});
		}

		try {
			if (newContainer) {
				// Replaces onStart().
				await this.ctx.storage.put("startedAt", Date.now());
			}
			await this.container.setInactivityTimeout(
				INACTIVITY_TIMEOUT_MS,
			);
		} catch (error) {
			// The next request starts a new container.
			await this.container.destroy();
			throw error;
		}
	}
}
```

Deploy for an in-place switch (cannot be undone; run from your project directory):

```
npx wrangler versions upload
npx wrangler versions deploy <VERSION_ID>@100% -y
```

Clean up the old container application afterwards:

```
npx wrangler containers list
npx wrangler containers delete <OLD_APPLICATION_ID>
```

## Options / Props

0.12 class fields and `getSandbox()` options to 1.0:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| sleepAfter | 0.x field | — | `setInactivityTimeout()` after `start()`, and again in the constructor (at most 6 hours). |
| keepAlive | 0.x field | — | An alarm that runs more often than the inactivity timeout while work remains. |
| envVars, setEnvVars() | 0.x field | — | `env` on `start()` for the main process and `env` on each `exec()`; commands do not inherit `start()` variables except `PATH`. |
| entrypoint | 0.x field | — | `entrypoint` on `start()`, or `CMD` in the image. |
| enableInternet | 0.x field | `true` in 0.12 | `enableInternet` on `start()`; every call must pass it. |
| labels, setLabels() | 0.x field | — | `labels` on `start()`. |
| defaultPort, requiredPorts | 0.x field | — | `this.container.getTcpPort(port)`. |
| allowedHosts, deniedHosts, outboundByHost, outbound, interceptHttps | 0.x field | — | See networking-and-other.md. |
| normalizeId | 0.x option | — | Lowercase the name before `getByName()`. |
| containerTimeouts | 0.x field | — | An `AbortSignal` on calls that need a deadline, or `timeout`. |
| enableDefaultSession | 0.x field | — | Nothing; each `exec()` is its own process. |
| transport, pingEndpoint | 0.x field | — | Nothing; remove them. |
| onStart() | 0.x hook | — | Code in `startContainer()` inside `if (newContainer)`. |
| onStop(), onError() | 0.x hook | — | `monitor()` plus error handling where you call `start()` and `exec()`. |
| onActivityExpired() | 0.x hook | — | No equivalent before the timeout stops the container; keep your own idle deadline in an alarm and call `destroy()`. |

Two paths:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| In place | path | — | One deploy moves every sandbox. Commands in 0.12 containers end and their files do not carry over. Suits short-lived or cheap-to-recreate sandboxes. |
| Side by side | path | — | A 1.0 class (new name such as `SandboxV1`) runs next to the 0.12 class in the same Worker; code moves each sandbox on first request, then you delete the 0.12 class. Suits long-lived sandboxes. |

## Notes

- Steps for the class: install `@cloudflare/sandbox` 1.x; change the Dockerfile base (for example `node:24-trixie-slim`, add the tools your commands use) and `COPY --from=docker.io/cloudflare/sandbox:1.0.1 /usr/local/bin/sandbox-shim /usr/local/bin/sandbox-shim` (match the tag to the installed package version; `Files`, `S3Mount`, `DirectoryBackup` need it; remove `EXPOSE`; `exec()` does not see image `ENV`); replace `image`, `instance_type` and `max_instances` (not accepted with this policy) with `images`; remove `SANDBOX_TRANSPORT`, `SANDBOX_INSTANCE_TIMEOUT_MS`, `SANDBOX_PORT_TIMEOUT_MS`, `SANDBOX_POLL_INTERVAL_MS` from `vars`; keep `nodejs_compat`; use compatibility date `2025-11-17` or later (or `enable_ctx_exports`) because `this.ctx.exports` is `undefined` before it; run `npx wrangler types`; verify under `npx wrangler dev`. Leave `durable_objects` and `migrations`/`exports` as they are; the class keeps its name, so no class migration. A new container application `name` is required: without it the deploy fails after the new Worker version is already live.
- Call `ensureRunning()` before each use of the container. `running` is `true` as soon as `start()` returns, so concurrent requests wait on the same `startContainer()`; a deploy restarts the Durable Object, so every step after `start()` must be safe to repeat; if a setup step throws, `startContainer()` destroys the container so no request runs in a half-set-up container. Set `enableInternet` to `false` if commands do not need the Internet.
- Move the methods your Worker called on the `getSandbox()` stub into methods on the class (for example a `test()` method running `this.container.exec(["npm", "test"], { cwd: "/workspace/app", env: ENV })`) and call them from the Worker via `env.MY_SANDBOX.getByName(id.toLowerCase())`. Validate or authenticate sandbox names derived from request paths; the official example takes `id` from the URL path unchecked.
- `monitor()` resolves on exit code 0 or `destroy()` with no reason and rejects otherwise; it is not durable across Durable Object memory eviction and, while pending, keeps the Durable Object in memory so the inactivity timeout does not start.
- Exec commands in this class run inside the sandbox container, never on the host.
- Adapted from the official docs: the official class passes `enableInternet: true` to match the 0.12 default; the snippet uses `false` (fail closed). Commands that need the network (for example `npm ci`) require `true`, or an outbound handler that allows only the needed hosts (see networking-and-other.md).
- Switch effects on live sandboxes (in-place): old containers keep running in the old application and for a short time your Durable Object still reports `running: true` with `exec()`/`getTcpPort()` reaching the 0.12 container; files stay in old containers; running commands end (non-streamed calls fail with HTTP 500, streamed output stops with HTTP 200 and no error); WebSockets go silent without a close frame; pending alarms call your 1.0 `alarm()` once per active sandbox (make it check its own state; a handler that throws is retried with backoff, and a class without `alarm()` logs one internal error per alarm); `schedule()` callbacks never run (use `ctx.storage.setAlarm()`); 0.12 storage keys `portTokens`, `tunnels`, `tunnels:meta`, `OUTBOUND_CONFIGURATION` remain.
- Process for in-place: save needed files with 0.12 `createBackup()` beforehand; prepare clients to reconnect; rehearse on a staging Worker with its own Worker `name` and container `name`s (the `--name` option of `wrangler deploy` does not rename container applications); `wrangler versions upload` (builds the image and creates the container application, no traffic change) then `wrangler versions deploy <VERSION_ID>@100% -y` when no long commands run. Gradual deployments cannot mix the two versions (Wrangler rejects with "All Worker Versions in a multi-version deployment must declare identical Durable Object-managed Container applications."). After a `wrangler rollback` 0.12 code cannot start containers.
- Verify: send a command and a file read; wait a few minutes first since requests can still reach the 0.12 container briefly; `wrangler containers list` shows the new application and the old one (named from Worker and class, such as `my-worker-sandbox`). The old application keeps running and billing until `wrangler containers delete` (this stops its containers and deletes their files; Durable Objects and storage stay). Delete other storage keys by name; do not call `deleteAll()`.
- Side by side: install both packages (`npm i @cloudflare/sandbox sandbox-0x@npm:@cloudflare/sandbox@0.12.10`, change 0.12 imports to `sandbox-0x`), add `isRunning()` and `exportStorage()` methods to a `Sandbox` subclass, create `Dockerfile.v1`, add a second `containers` entry (`SandboxV1`, own `name`, `durable_object` policy), binding and `new_sqlite_classes` migration (or an `exports` entry), then `moveFrom0x(name)` on the 1.0 class copies 0.12 storage and `/workspace` (tar, base64, one RPC message limited to 32 MiB; larger workspaces use a backup) once per name and stores `moved`; route every request through `sandboxFor(env, name)`. The method uses 0.12 `stop()` not `destroy()` (destroy deletes preview tokens and named tunnels). Send no other requests to the 0.12 class for a sandbox while it moves. Keep 0.12 exports, variables and secrets (such as `ContainerProxy`, `SANDBOX_TRANSPORT`, `R2_ACCESS_KEY_ID`) until the 0.12 class is deleted. If `getSandbox()` used `normalizeId: true`, lowercase the name before `sandboxFor()`.
- Delete the 0.12 class last: move remaining sandboxes (a Worker cannot list Durable Objects), remove 0.12 code, remove the `Sandbox` container and binding and add `{ "deleted_classes": ["Sandbox"], "tag": "v3" }` (or `state = "deleted"` with `exports`). This permanently deletes that class's Durable Objects and storage, including 0.12 backup handles; with `migrations` Wrangler refuses a rollback past it, with `exports` a rollback deploys and calls fail with `Durable Object Namespace was deleted`. Then `npm uninstall sandbox-0x`, `wrangler types`, `wrangler deploy`, and delete the old container application as above.
- The container-side rules (policy, snapshots, `exec()`) are documented in the containers/ category of this skill: scheduling-policy.md, durable-object-container.md.

## Related

- [Overview](./overview.md)
- [API map](./api-map.md)
- [Commands and processes](./commands-and-processes.md)
- [Files and storage](./files-and-storage.md)
- [Networking and other features](./networking-and-other.md)
