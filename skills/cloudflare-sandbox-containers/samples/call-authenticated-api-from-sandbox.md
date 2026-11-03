---
source: https://developers.cloudflare.com/sandbox/network/call-an-authenticated-api/
---

# Call an authenticated API from a sandbox

Let code in a sandbox container call an API that needs a token while the token stays in your Worker: outbound HTTPS to `api.github.com` is intercepted and delivered to a Worker entrypoint that allows only `GET /user` and adds the token.

## Signature / Usage

Declare the secret, generate types, and store the token (Wrangler prompts on stdin):

```jsonc
{
	"secrets": {
		"required": ["GITHUB_TOKEN"],
	},
}
```

```sh
npx wrangler types
npx wrangler secret put GITHUB_TOKEN
```

Entrypoint that accepts exactly one GitHub API request and adds the token:

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export class GitHubGateway extends WorkerEntrypoint {
	async fetch(request) {
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

Durable Object method. The `node` command runs inside the disposable sandbox container, never on the host:

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

Adapted (not in the official docs): the official route snippet is a bare `if` with no authentication; this is a complete handler that rejects unauthenticated callers (fail-closed). See Notes.

Worker route:

```ts
// Fail closed: reject when API_TOKEN is unset or the header does not match.
function authorized(request: Request, env: Env): boolean {
	const expected = env.API_TOKEN;
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
		const url = new URL(request.url);

		if (url.pathname !== "/username") {
			return new Response("Not found", { status: 404 });
		}
		if (!authorized(request, env)) {
			return new Response("Unauthorized", { status: 401 });
		}

		const sandbox = env.MY_CONTAINER.getByName("github");
		return Response.json({ username: await sandbox.getUsername() });
	},
} satisfies ExportedHandler<Env>;
```

Deploy and call (set `API_TOKEN` with `npx wrangler secret put API_TOKEN`):

```sh
npx wrangler deploy
curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/username --header "Authorization: Bearer ${API_TOKEN}"
```

```json
{ "username": "octocat" }
```

## Notes

- Adapted from the official docs: the route is wrapped in a handler and authenticated with `API_TOKEN` (rejects when unset) so other people cannot use your GitHub token's quota. Add `API_TOKEN: string` to `Env`.
- The gateway allows only `GET /user`, so code in the sandbox cannot use the token for anything else. Allow each request your code needs and nothing more.
- An instance that is already running keeps the Internet access it started with, so `enableInternet: false` applies only to an instance this method starts. The sandbox name `github` is fixed by the Worker.
- The official page also shows a Dynamic Worker variant (a `GitHub` entrypoint with `getUsername()` passed to `env.LOADER.load()` with `globalOutbound: null`); it is omitted here.

## Related

- [Call an authenticated API (reference)](../references/sandbox/call-an-authenticated-api.md)
- [Outbound traffic](../references/containers/outbound-traffic.md)
- [Sandbox security](../references/sandbox/sandbox-security.md)
