---
source: https://developers.cloudflare.com/sandbox/commands/run-python-code/
---

# Run Python code

Run Python code in a Linux sandbox and return its output. The image sets the Python version and importable packages; files one run writes stay in the sandbox for the next run. This category's "commands" guides share one intro: run Python code and tests, stream output, keep processes running, open a terminal.

## Signature / Usage

`Dockerfile` with the packages the code may import (installed at build time so the sandbox needs no Internet):

```dockerfile
FROM python:3.13-slim

RUN pip install --no-cache-dir numpy pandas matplotlib

WORKDIR /workspace

CMD ["sleep", "infinity"]
```

Build it as a named image in `wrangler.jsonc` (TOML: `[containers.images.python]` with `dockerfile = "./Dockerfile"`):

```jsonc
{
	"containers": [
		{
			"class_name": "MyContainer",
			"scheduling_policy": "durable_object",
			"images": {
				"python": {
					"dockerfile": "./Dockerfile",
				},
			},
		},
	],
}
```

Durable Object method (fragment of the `MyContainer` class from the run-a-linux-command page; assumes `INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000`, and a constructor that calls `container.setInactivityTimeout()` when the container is already running):

```ts
export class MyContainer extends DurableObject<Env> {
	// ...

	async runPython(code: string) {
		const container = this.ctx.container;

		if (!container) {
			throw new Error("No container is configured");
		}

		if (!container.running) {
			container.start({
				image: container.images.python,
				// Block the code from reaching the Internet
				enableInternet: false,
			});
			await container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
		}

		// Runs inside the disposable sandbox container, never on the host.
		// Each run is a new Python process, so variables do not carry over
		const process = await container.exec(
			[
				// GNU coreutils `timeout` stops code that runs longer than 60 seconds
				"timeout", "--kill-after=5", "60",
				// `python3 -` reads the code from standard input
				"python3", "-",
			],
			{
				stdin: new Response(code).body!,
				// Files that the code writes here stay until the instance stops
				cwd: "/workspace",
			},
		);
		const output = await process.output();
		const decoder = new TextDecoder();

		return {
			stdout: decoder.decode(output.stdout),
			// A Python exception prints its traceback here
			stderr: decoder.decode(output.stderr),
			// `124` or `137` if the code timed out, `1` if it raised an exception
			exitCode: output.exitCode,
		};
	}
}
```

Worker route that runs the request body as Python (untrusted code stays in the sandbox):

```ts
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const match = /^\/sandboxes\/([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)\/python$/.exec(url.pathname);

		if (!match || request.method !== "POST") {
			return new Response("Not found", { status: 404 });
		}

		// Authenticate the caller first and derive the name from that identity.
		const sandbox = env.MY_CONTAINER.getByName(match[1]);
		return Response.json(await sandbox.runPython(await request.text()));
	},
} satisfies ExportedHandler<Env>;
```

Return a chart: have the code save `chart.png` in `/workspace`, then read it with a second method:

```ts
export class MyContainer extends DurableObject<Env> {
	// ...

	async readFile(name: string) {
		const container = this.ctx.container;

		if (!container?.running) {
			return null;
		}

		// Runs inside the sandbox container.
		const process = await container.exec(["cat", "--", name], {
			cwd: "/workspace",
			stderr: "ignore",
		});
		const output = await process.output();
		return output.exitCode === 0 ? output.stdout : null;
	}
}
```

## Notes

- Deploy with `npx wrangler deploy` (Docker must be running locally); run with `curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/sandboxes/ada/python --data-binary @sales.py`. Expected JSON has `stdout`, `stderr`, `exitCode`.
- The code can read every file in its sandbox: give each user their own sandbox name and authenticate callers first (see the sandbox-security page). The official regex route takes the name from the URL only for brevity.
- `readFile(name)` above is passed a name that the Worker route fixes (`chart.png`); do not forward caller-supplied paths (see the manage-files page for path handling). The official page also adds a `/sandboxes/<name>/chart.png` route to `fetch()` that returns the bytes with `Content-Type: image/png` (404 when null); it is omitted here.
- `output()` holds all printed output in Durable Object memory; stream large output instead. `timeout` stops processes that stay in its process group; see "Stop the processes a command starts" in execute-commands.md (https://developers.cloudflare.com/containers/guides/execute-commands/).
- Other languages: change the base image and the stdin command, for example `FROM ruby:3.4-slim` with `["ruby", "-"]`, or `FROM node:24-slim` with `["node", "-"]`.
- `exec()` options are documented in the `containers` category of this skill.

## Related

- [Run a Linux command](./run-a-linux-command.md)
- [Stream command output](./stream-command-output.md)
- [Move files in and out of a sandbox](./manage-files.md)
- [Build an AI code interpreter](./build-an-ai-code-interpreter.md)
