---
source: https://developers.cloudflare.com/sandbox/reference/
---

# @cloudflare/sandbox package

`@cloudflare/sandbox` provides classes (`Files`, `S3Mount`, `DirectoryBackup`) that run helper processes in a container you start from a Durable Object through `exec()`. The package does not start, stop, or monitor the container.

## Signature / Usage

```sh
npm i @cloudflare/sandbox
```

```dockerfile
FROM node:24-trixie-slim

COPY --from=docker.io/cloudflare/sandbox:<VERSION> /usr/local/bin/sandbox-shim /usr/local/bin/sandbox-shim

RUN mkdir /workspace
CMD ["sleep", "infinity"]
```

Worker configuration meeting every requirement:

```jsonc
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "sandbox-files",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": ["nodejs_compat"],
	"containers": [
		{
			"class_name": "MyContainer",
			"scheduling_policy": "durable_object",
			"images": {
				"workspace": {
					"dockerfile": "./Dockerfile",
				},
			},
		},
	],
	"durable_objects": {
		"bindings": [
			{
				"class_name": "MyContainer",
				"name": "MY_CONTAINER",
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

Durable Object that starts the `workspace` image and passes the container to a class:

```ts
import { Files } from "@cloudflare/sandbox";
import { DurableObject } from "cloudflare:workers";

const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;

export class MyContainer extends DurableObject<Env> {
	private readonly container: Container;
	private readonly files: Files;

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		const container = ctx.container;

		if (!container) {
			throw new Error("No container is configured");
		}

		this.container = container;
		// ctx.container stays the same object while the Durable Object runs.
		this.files = new Files(container);

		// A restarted Durable Object sets the timeout again.
		if (container.running) {
			void ctx.blockConcurrencyWhile(() =>
				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
			);
		}
	}

	async listWorkspace() {
		// Files does not start the container.
		if (!this.container.running) {
			// Runs inside the disposable sandbox container with Internet access off.
			this.container.start({
				image: this.container.images.workspace,
				enableInternet: false,
			});
			await this.container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
		}

		return this.files.readDirectory("/workspace");
	}
}
```

## Notes

- Requirements for every class: the image contains `/usr/local/bin/sandbox-shim`, copied from the `cloudflare/sandbox` image whose tag matches the installed package version (a mismatch can cause `SandboxProtocolError`); the helper is a statically linked `linux/amd64` binary that runs in any `linux/amd64` image; the Worker has the `nodejs_compat` compatibility flag; the container is running when a method runs the helper (some methods such as `DirectoryBackup.delete()` do not need it).
- `wrangler.toml` form is equivalent to the JSONC shown. JS variants drop the type annotations.
- `start()`, `exec()`, `snapshotContainer()` and `images` belong to the Durable Object container API, documented in the `containers` category of this skill; the Durable Objects API belongs to the cloudflare-stateful skill.
- Classes: `Files`, `S3Mount` (re-export `S3Gateway`), `DirectoryBackup` (re-export `DirectoryBackupGateway`).

## Related

- [Files API](./files-api.md)
- [S3Mount API](./s3-mount-api.md)
- [DirectoryBackup API](./directory-backup-api.md)
- [Sandbox lifetime](./sandbox-lifetime.md)
