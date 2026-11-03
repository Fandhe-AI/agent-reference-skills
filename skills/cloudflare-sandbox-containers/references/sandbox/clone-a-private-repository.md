---
source: https://developers.cloudflare.com/sandbox/network/clone-a-private-repository/
---

# Clone a private repository

Clone a private repository into a sandbox while the access token stays in your Worker. Putting the token in the clone URL would let every command in the sandbox read it, so the Durable Object intercepts HTTPS from Git to `github.com` and a Worker entrypoint checks each request and adds the token.

## Signature / Usage

`Dockerfile` that installs Git:

```dockerfile
FROM node:24-trixie-slim

RUN apt-get update \
	&& apt-get install --yes --no-install-recommends ca-certificates git \
	&& rm -rf /var/lib/apt/lists/*

CMD ["sleep", "infinity"]
```

`wrangler.jsonc` (replace `<OWNER>/<REPOSITORY>`; run `npx wrangler types`, then `npx wrangler secret put GITHUB_TOKEN`; use a token with read access to the repository contents only):

```jsonc
{
	"vars": {
		"REPOSITORY": "<OWNER>/<REPOSITORY>",
	},
	"secrets": {
		"required": ["GITHUB_TOKEN"],
	},
	"containers": [
		{
			"class_name": "MyContainer",
			"scheduling_policy": "durable_object",
			"images": {
				"git": {
					"dockerfile": "./Dockerfile",
				},
			},
		},
	],
}
```

The entrypoint accepts only the requests that fetch the repository and adds the token:

```ts
import { WorkerEntrypoint } from "cloudflare:workers";

export class GitGateway extends WorkerEntrypoint<Env> {
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);
		const repository = `/${this.env.REPOSITORY}.git`;
		const fetchesRepository =
			(request.method === "GET" &&
				url.pathname === `${repository}/info/refs` &&
				url.search === "?service=git-upload-pack") ||
			(request.method === "POST" &&
				url.pathname === `${repository}/git-upload-pack`);

		if (url.hostname !== "github.com" || !fetchesRepository) {
			return new Response("Forbidden", { status: 403 });
		}

		const headers = new Headers(request.headers);
		const credentials = btoa(`x-access-token:${this.env.GITHUB_TOKEN}`);
		headers.set("Authorization", `Basic ${credentials}`);

		return fetch(new Request(request, { headers }));
	}
}
```

Durable Object method and route:

```ts
export class MyContainer extends DurableObject<Env> {
	// ...

	async clone(): Promise<{ exitCode: number; stderr: string }> {
		const container = this.ctx.container;

		if (!container) {
			throw new Error("No container is configured");
		}

		await container.interceptOutboundHttps(
			"github.com",
			this.ctx.exports.GitGateway,
		);

		if (!container.running) {
			container.start({
				image: container.images.git,
				// The container can reach only the hostnames you intercept
				enableInternet: false,
			});
			// Keep the clone for later requests
			await container.setInactivityTimeout(10 * 60 * 1000);
		}

		// Runs inside the disposable sandbox container, never on the host.
		const process = await container.exec(
			[
				"git",
				"clone",
				"--depth=1",
				`https://github.com/${this.env.REPOSITORY}.git`,
				"/workspace",
			],
			{
				env: {
					// The intercept terminates TLS with a certificate that the container
					// CA certificate signs. Git reads the CA certificate from this path
					GIT_SSL_CAINFO: "/etc/cloudflare/certs/cloudflare-containers-ca.crt",
				},
			},
		);
		const output = await process.output();

		return {
			exitCode: output.exitCode,
			// Git prints its progress to standard error
			stderr: new TextDecoder().decode(output.stderr),
		};
	}
}
```

```ts
// Authenticate callers first so others cannot read the repository through the sandbox.
if (url.pathname === "/clone" && request.method === "POST") {
	const sandbox = env.MY_CONTAINER.getByName("repo");
	const { exitCode, stderr } = await sandbox.clone();
	return new Response(stderr, { status: exitCode === 0 ? 200 : 500 });
}
```

## Notes

- `git-upload-pack` serves clones and fetches; the gateway allows it for one repository and rejects everything else, so sandbox code cannot push (`git-receive-pack`) or read other repositories even if the token could. `git remote get-url origin` prints the URL without a token; a `git push` fails with `403`.
- The route uses a sandbox name of its own because a running instance keeps the image and Internet access it started with (it would otherwise have no Git). While the sandbox keeps running a second request fails (`500`) because `/workspace` already holds the clone. The clone lasts until the instance stops.
- `interceptOutboundHttps()` is documented in the `containers` category of this skill. Test: `curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/clone --request POST` prints `Cloning into '/workspace'...`.

## Related

- [Call an authenticated API from a sandbox](./call-an-authenticated-api.md)
- [Run tests from a Git repository](./run-tests-from-git-repository.md)
- [Sandbox security](./sandbox-security.md)
