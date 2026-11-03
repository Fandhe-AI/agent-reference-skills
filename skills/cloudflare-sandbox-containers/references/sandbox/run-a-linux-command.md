---
source: https://developers.cloudflare.com/sandbox/get-started/
---

# Run a Linux command

POST `uname -a` to a Worker and read stdout that contains `Linux`. This is the base project that other sandbox guides extend.

## Signature / Usage

Create the project (`npm create cloudflare@latest -- sandbox-linux --category=hello-world --type=hello-world --lang=ts --no-deploy --no-git --no-agents`), then configure `wrangler.jsonc` so a Durable Object can start a container:

```jsonc
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "sandbox-linux",
	"main": "src/index.ts",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"observability": {
		"enabled": true,
	},
	"upload_source_maps": true,
	"containers": [
		{
			"class_name": "MyContainer",
			"scheduling_policy": "durable_object",
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

Then `src/index.ts`:

Adapted (not in the official docs): comments added that commands run in the sandbox, and a fail-closed bearer check, because the official handler runs caller-supplied argv unauthenticated; see Notes.

```ts
import { DurableObject } from "cloudflare:workers";

export class MyContainer extends DurableObject<Env> {
	async exec(argv: string[]) {
		const container = this.ctx.container;
		if (!container) {
			throw new Error("No container is configured");
		}

		if (!container.running) {
			container.start({
				// Debian Trixie with Node.js 24
				image: "cloudflare/debian-trixie",
				// Keep the instance running so it can accept commands
				entrypoint: ["sleep", "infinity"],
				// Block commands in the sandbox from reaching the Internet
				enableInternet: false,
			});
		}

		// Runs inside the disposable sandbox container, never on the host.
		const process = await container.exec(argv);
		const output = await process.output();
		return {
			stdout: new TextDecoder().decode(output.stdout),
			exitCode: output.exitCode,
		};
	}
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		// Fail closed: reject unless a secret is configured and the caller presents it.
		const expected = (env as { API_TOKEN?: string }).API_TOKEN;
		if (!expected || request.headers.get("Authorization") !== `Bearer ${expected}`) {
			return new Response("Unauthorized", { status: 401 });
		}
		const { argv } = (await request.json()) as { argv: string[] };
		// In production derive the name from the authenticated caller.
		const sandbox = env.MY_CONTAINER.getByName("sandbox");
		return Response.json(await sandbox.exec(argv));
	},
};
```

Run locally and send a command (the `curl` runs on your machine; the command itself runs in the sandbox):

```sh
npx wrangler types
npx wrangler dev
curl http://localhost:8787 --request POST --json '{"argv":["uname","-a"]}'
```

## Notes

- Adapted from the official docs: the official `fetch()` runs the caller's `argv` without authentication. The added `API_TOKEN` check is not in the source; set it as a secret (for local runs, a gitignored `.dev.vars` file) and send `Authorization: Bearer <token>` with the `curl`.
- The TOML form of the config is equivalent (`[[containers]]`, `[[durable_objects.bindings]]`, `[exports.MyContainer]`); the `src/index.js` variant drops the type annotations.
- `wrangler dev` runs the instance in Docker on your machine, so Docker must be running; running `cloudflare/debian-trixie` locally requires a recent Wrangler (see the Wrangler install docs). On deploy each instance runs in its own virtual machine.
- `enableInternet: false` blocks the sandbox from the Internet. A deploy does not replace a running instance.
- Containers `start()`/`exec()` API: see the `containers` category of this skill. The Durable Object class API belongs to the cloudflare-stateful skill.
- The minimal sandbox template at https://github.com/cloudflare/sandbox-sdk/tree/main/examples/minimal adds a `Dockerfile`, a sandbox per URL name, and file I/O with `@cloudflare/sandbox`.

## Related

- [Sandbox lifetime](./sandbox-lifetime.md)
- [Run Python code](./run-python-code.md)
- [Run JavaScript in a Dynamic Worker](./run-javascript-dynamic-workers.md)
- [@cloudflare/sandbox package](./sandbox-package.md)
