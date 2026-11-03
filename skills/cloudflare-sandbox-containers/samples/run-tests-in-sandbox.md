---
source: https://developers.cloudflare.com/sandbox/commands/run-tests-from-a-git-repository/
---

# Run tests from a Git repository

Clone a repository into a fresh disposable sandbox container, install its dependencies, run its tests, return the result, and destroy the instance.

## Signature / Usage

`Dockerfile` (Git plus the runtime the tests need; `sleep infinity` keeps the container alive for more `exec()` calls):

```dockerfile
FROM node:24-trixie-slim

RUN apt-get update \
	&& apt-get install --yes --no-install-recommends ca-certificates git \
	&& rm -rf /var/lib/apt/lists/*

CMD ["sleep", "infinity"]
```

`wrangler.jsonc` (named image `tests`):

```jsonc
{
	"containers": [
		{
			"class_name": "MyContainer",
			"scheduling_policy": "durable_object",
			"images": {
				"tests": {
					"dockerfile": "./Dockerfile",
				},
			},
		},
	],
}
```

Durable Object method. Every `exec()` below runs inside the disposable sandbox container, never on the host:

```ts
export class MyContainer extends DurableObject<Env> {
	// ...

	async runTests(repository: string, revision: string) {
		const container = this.ctx.container;

		if (!container) {
			throw new Error("No container is configured");
		}

		container.start({
			image: container.images.tests,
			// `git` and `npm` need the Internet. Do not pass credentials into this sandbox
			enableInternet: true,
		});

		const decoder = new TextDecoder();
		const run = async (step: string, argv: string[], cwd?: string) => {
			// Limit each step to 10 minutes.
			const process = await container.exec(
				["timeout", "--kill-after=5", "600", ...argv],
				{ cwd },
			);
			const output = await process.output();

			return {
				step,
				stdout: decoder.decode(output.stdout),
				stderr: decoder.decode(output.stderr),
				exitCode: output.exitCode,
			};
		};

		try {
			const clone = await run("clone", [
				"git",
				"clone",
				"--depth=1",
				`--branch=${revision}`,
				"--",
				repository,
				"/workspace",
			]);

			if (clone.exitCode !== 0) {
				return clone;
			}

			const install = await run(
				"install",
				["npm", "ci", "--no-audit", "--no-fund"],
				"/workspace",
			);

			if (install.exitCode !== 0) {
				return install;
			}

			return await run("test", ["npm", "test", "--", "--silent"], "/workspace");
		} finally {
			if (container.running) {
				await container.destroy();
			}
		}
	}
}
```

Adapted (not in the official docs): the route authenticates the caller (fail-closed) before it starts a sandbox; see Notes.

Worker route (the repository and revision are fixed by the Worker, not taken from the request):

```ts
// Fail closed: reject when TEST_RUNNER_TOKEN is unset or the header does not match.
function authorized(request: Request, env: Env): boolean {
	const expected = env.TEST_RUNNER_TOKEN;
	if (!expected) return false;
	const encoder = new TextEncoder();
	const given = encoder.encode(request.headers.get("Authorization") ?? "");
	const wanted = encoder.encode(`Bearer ${expected}`);
	return (
		given.byteLength === wanted.byteLength &&
		crypto.subtle.timingSafeEqual(given, wanted)
	);
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (request.method !== "POST") {
			return new Response("Not found", { status: 404 });
		}
		if (!authorized(request, env)) {
			return new Response("Unauthorized", { status: 401 });
		}

		const sandbox = env.MY_CONTAINER.getByName(crypto.randomUUID());
		const result = await sandbox.runTests(
			"https://github.com/cloudflare/workers-oauth-provider.git",
			"v0.0.6",
		);

		return Response.json(result, {
			status: result.exitCode === 0 ? 200 : 500,
		});
	},
} satisfies ExportedHandler<Env>;
```

Deploy (Docker must be running locally), set the token on stdin, and send a `POST`:

```sh
npx wrangler deploy
npx wrangler secret put TEST_RUNNER_TOKEN
curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev --request POST --header "Authorization: Bearer ${TEST_RUNNER_TOKEN}"
```

Response:

```json
{
	"step": "test",
	"stdout": "...\n Test Files  1 passed (1)\n      Tests  37 passed (37)\n...",
	"stderr": "",
	"exitCode": 0
}
```

## Notes

- Adapted from the official docs: the official route has no authentication, yet it starts a sandbox that runs repository scripts with Internet access. `TEST_RUNNER_TOKEN` is checked first and the route rejects everything when it is unset. Add `TEST_RUNNER_TOKEN: string` to `Env`.
- `enableInternet: true` also lets the repository's install and test scripts reach the Internet, so never pass credentials into this sandbox. Allow only the Git server and package registry with outbound traffic handling.
- A random sandbox name gives each run a new instance; one run cannot see files from another. Do not build repository, revision, or instance names from unverified request input.
- `exec()` does not start a shell: keep each argument in its own array entry. `--` stops `git` from reading a repository starting with `-` as an option.
- A step over 10 minutes exits with `124` (or `137` after `SIGKILL`). `output()` buffers all output in Durable Object memory; stream large output instead.

## Related

- [Run tests from a Git repository (reference)](../references/sandbox/run-tests-from-git-repository.md)
- [Stream command output](./stream-command-output.md)
- [Sandbox security](../references/sandbox/sandbox-security.md)
- [Outbound traffic](../references/containers/outbound-traffic.md)
