---
source: https://developers.cloudflare.com/sandbox/network/call-an-authenticated-api/
---

# Call an authenticated API from a sandbox

Let code in a sandbox call an API that needs a token while the token stays in your Worker. Requests from the sandbox reach a Worker entrypoint that allows only requests you choose and adds the token. The example reads the GitHub profile. The "credentials and network" guides keep credentials in your Worker and decide which services a sandbox reaches.

## Signature / Usage

Declare the token as a secret (`npx wrangler types`, then `npx wrangler secret put GITHUB_TOKEN`; use a gitignored `.dev.vars` for local runs):

```jsonc
{
	"secrets": {
		"required": ["GITHUB_TOKEN"],
	},
}
```

Container: the entrypoint accepts only `GET /user` and adds the token:

```ts
import { WorkerEntrypoint } from "cloudflare:workers";

export class GitHubGateway extends WorkerEntrypoint<Env> {
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);

		if (
			request.method !== "GET" ||
			url.hostname !== "api.github.com" ||
			url.pathname !== "/user" ||
			url.search !== ""
		) {
			return new Response("Forbidden", { status: 403 });
		}

		return fetch("https://api.github.com/user", {
			headers: {
				Accept: "application/vnd.github+json",
				Authorization: `Bearer ${this.env.GITHUB_TOKEN}`,
				"User-Agent": "cloudflare-sandbox",
				"X-GitHub-Api-Version": "2022-11-28",
			},
		});
	}
}
```

The Durable Object intercepts HTTPS to that hostname and runs code that calls it:

```ts
export class MyContainer extends DurableObject<Env> {
	// ...

	async getUsername(): Promise<string> {
		const container = this.ctx.container;

		if (!container) {
			throw new Error("No container is configured");
		}

		await container.interceptOutboundHttps(
			"api.github.com",
			this.ctx.exports.GitHubGateway,
		);

		if (!container.running) {
			container.start({
				image: "cloudflare/debian-trixie",
				entrypoint: ["sleep", "infinity"],
				// The container can reach only the hostnames you intercept
				enableInternet: false,
			});
		}

		// Runs inside the disposable sandbox container, never on the host.
		const process = await container.exec(
			[
				"node",
				"--input-type=module",
				"--eval",
				`const response = await fetch("https://api.github.com/user");
if (!response.ok) throw new Error("GitHub request failed");
console.log((await response.json()).login);`,
			],
			{
				env: {
					// The intercept terminates TLS with a certificate that the container
					// CA certificate signs. Node.js reads the CA certificate from this path
					NODE_EXTRA_CA_CERTS: "/etc/cloudflare/certs/cloudflare-containers-ca.crt",
				},
			},
		);
		const output = await process.output();

		if (output.exitCode !== 0) {
			throw new Error(new TextDecoder().decode(output.stderr));
		}

		return new TextDecoder().decode(output.stdout).trim();
	}
}
```

Route (authenticate callers first):

```ts
if (url.pathname === "/username") {
	const sandbox = env.MY_CONTAINER.getByName("github");
	return Response.json({ username: await sandbox.getUsername() });
}
```

Dynamic Worker: pass a method instead of the token.

```ts
import { WorkerEntrypoint } from "cloudflare:workers";

export class GitHub extends WorkerEntrypoint<Env> {
	async getUsername(): Promise<string> {
		const response = await fetch("https://api.github.com/user", {
			headers: {
				Accept: "application/vnd.github+json",
				Authorization: `Bearer ${this.env.GITHUB_TOKEN}`,
				"User-Agent": "cloudflare-sandbox",
				"X-GitHub-Api-Version": "2022-11-28",
			},
		});

		if (!response.ok) {
			throw new Error(`GitHub returned ${response.status}`);
		}

		const user = await response.json<{ login: string }>();
		return user.login;
	}
}
```

In the `fetch(request, env, ctx)` handler (`ctx` is needed for `ctx.exports`):

```ts
const sandbox = env.LOADER.load({
	compatibilityDate: "2026-10-01",
	mainModule: "code.js",
	modules: {
		"code.js": `
			import { WorkerEntrypoint } from "cloudflare:workers";

			export class Code extends WorkerEntrypoint {
				async run() {
					return this.env.GITHUB.getUsername();
				}
			}
		`,
	},
	env: {
		// Create a stub that the Dynamic Worker can receive
		GITHUB: ctx.exports.GitHub({ props: {} }),
	},
	// Block every other `fetch()` and `connect()` call from the Dynamic Worker
	globalOutbound: null,
});

const username = await sandbox
	.getEntrypoint<WorkerEntrypoint & { run(): Promise<string> }>("Code")
	.run();
return Response.json({ username });
```

## Notes

- The gateway allows only `GET /user`, so sandbox code cannot use the token for anything else: allow each request your code needs and nothing more. Add the credential to HTTPS requests only.
- An already-running instance keeps the Internet access it started with, so `enableInternet: false` applies only to an instance this method starts; use a sandbox name of its own (`github`).
- Authenticate callers of your Worker first, otherwise anyone can spend the quota of your token. The Dynamic Worker pattern: the method and the loader decide what code can do; documentation for Dynamic Workers bindings and egress control is at https://developers.cloudflare.com/dynamic-workers/. Store the token as a Worker secret (https://developers.cloudflare.com/workers/configuration/secrets/); never in env passed to the sandbox.
- `interceptOutboundHttps()` is documented in the `containers` category of this skill. `WorkerEntrypoint` and `ctx.exports` belong to the Workers runtime (cloudflare-workers skill).

## Related

- [Clone a private repository](./clone-a-private-repository.md)
- [Sandbox security](./sandbox-security.md)
- [Run JavaScript in a Dynamic Worker](./run-javascript-dynamic-workers.md)
