---
source: https://developers.cloudflare.com/sandbox/get-started/dynamic-workers/
---

# Run JavaScript in a Dynamic Worker

POST JavaScript to a Worker and read `{"result":["Ada"]}`. The Worker runs the code in a Dynamic Worker (no child processes; see the choose-a-sandbox-environment page for when to use a Container instead).

## Signature / Usage

Create the project with `npm create cloudflare@latest -- sandbox-dynamic-worker --category=hello-world --type=hello-world --lang=ts --no-deploy`, then add a Worker Loader binding in `wrangler.jsonc` and run `npx wrangler types`:

```jsonc
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "sandbox-dynamic-worker",
	"main": "src/index.ts",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"observability": {
		"enabled": true,
	},
	"upload_source_maps": true,
	"worker_loaders": [
		{
			"binding": "LOADER",
		},
	],
}
```

`src/index.ts`:

```ts
import type { WorkerEntrypoint } from "cloudflare:workers";

type CodeEntrypoint = WorkerEntrypoint & {
	evaluate(): Promise<unknown>;
};

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		// Authenticate callers before running code from them.
		const { code } = (await request.json()) as { code: string };

		// The untrusted code runs in an isolated Dynamic Worker, never in this Worker.
		const sandbox = env.LOADER.load({
			compatibilityDate: "2026-11-03",
			mainModule: "code.js",
			modules: {
				"code.js": `
					import { WorkerEntrypoint } from "cloudflare:workers";

					export class Code extends WorkerEntrypoint {
						evaluate() {
							${code}
						}
					}
				`,
			},
			// Block `fetch()` and `connect()`
			globalOutbound: null,
			// Stop code that uses more than 50 milliseconds of CPU time
			limits: { cpuMs: 50 },
		});

		const result = await sandbox
			.getEntrypoint<CodeEntrypoint>("Code")
			.evaluate();
		return Response.json({ result });
	},
};
```

Run `npx wrangler dev` and POST code (the `curl` runs on your machine):

```sh
curl http://localhost:8787 --request POST --json '{
  "code": "const users = [{ name: \"Ada\", role: \"admin\" }, { name: \"Grace\", role: \"user\" }]; return users.filter((u) => u.role === \"admin\").map((u) => u.name);"
}'
```

## Notes

- `code` is the body of `evaluate()`, so it needs a `return` statement. Code that waits without using CPU can still hold the request open: add a timeout before running code from other people (see the build-an-ai-code-interpreter page).
- The official handler is unauthenticated; anyone with the URL can run code on your account's quota. Authenticate callers first.
- The Dynamic Worker does not inherit your bindings; it can call only methods you pass in (Bindings) and reaches the Internet unless `globalOutbound` is `null`. `load()` / `get()` are documented in the Dynamic Workers Loader API at https://developers.cloudflare.com/dynamic-workers/api-reference/ and Bindings at https://developers.cloudflare.com/dynamic-workers/usage/bindings/ (no separate skill).

## Related

- [Choose a sandbox environment](./choose-a-sandbox-environment.md)
- [Build an AI code interpreter](./build-an-ai-code-interpreter.md)
- [Call an authenticated API from a sandbox](./call-an-authenticated-api.md)
- [Run a Linux command](./run-a-linux-command.md)
