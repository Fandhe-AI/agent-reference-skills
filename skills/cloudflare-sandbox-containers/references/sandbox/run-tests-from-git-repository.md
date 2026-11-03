---
source: https://developers.cloudflare.com/sandbox/commands/run-tests-from-a-git-repository/
---

# Run tests from a Git repository

Clone a public Git repository into a fresh sandbox, install dependencies, run its test script, return the result, and stop the instance.

## Signature / Usage

`Dockerfile` with Git and the runtime the tests need:

```dockerfile
FROM node:24-trixie-slim

RUN apt-get update \
	&& apt-get install --yes --no-install-recommends ca-certificates git \
	&& rm -rf /var/lib/apt/lists/*

CMD ["sleep", "infinity"]
```

Named image in `wrangler.jsonc` (`images.tests.dockerfile = "./Dockerfile"`; TOML: `[containers.images.tests]`). Durable Object method (fragment of the `MyContainer` class):

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
			// Runs inside the disposable sandbox container, never on the host.
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

Worker route (a random name gives each run a new instance):

```ts
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (request.method !== "POST") {
			return new Response("Not found", { status: 404 });
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

## Notes

- `enableInternet: true` lets `git` and `npm` download, and also lets the repository's install and test scripts reach the Internet. Do not pass credentials into this sandbox; to restrict egress to the Git server and package registry, use an outbound handler (outbound-traffic.md (https://developers.cloudflare.com/containers/configuration/outbound-traffic/)).
- The route is unauthenticated and triggers billable container runs: in production authenticate callers and rate-limit before starting a sandbox. The repository and revision are fixed by the Worker here; do not take them from untrusted input without validation. `--` keeps a repository value starting with `-` from being read as an option; `exec()` does not start a shell, so keep each argument in its own array entry.
- A step longer than 10 minutes exits `124` (or `137` if `timeout` also sends `SIGKILL`). The `finally` block stops the instance.
- `output()` holds all output in Durable Object memory; stream output for noisy suites.
- Failing steps return `500` with `step` naming the step that failed. Deploy with `npx wrangler deploy` and `curl <workers.dev URL> --request POST`.

## Related

- [Stream command output](./stream-command-output.md)
- [Save and restore a sandbox with snapshots](./save-and-restore-a-workspace.md)
- [Clone a private repository](./clone-a-private-repository.md)
- [Sandbox security](./sandbox-security.md)
