---
source: https://developers.cloudflare.com/sandbox/manage/list-sandboxes/
---

# List a user's sandboxes

Each user gets a registry Durable Object (`SandboxDirectory`) that records the user's sandboxes; the Worker asks each sandbox's Durable Object whether its container is running. Sandboxes are named `<OWNER>/<SESSION>`.

## Signature / Usage

Bindings and exports in `wrangler.jsonc` (with a `migrations` array instead, add a migration with a new `tag` and `"new_sqlite_classes": ["SandboxDirectory"]`):

```jsonc
{
	"durable_objects": {
		"bindings": [
			{
				"class_name": "MyContainer",
				"name": "MY_CONTAINER",
			},
			{
				"class_name": "SandboxDirectory",
				"name": "SANDBOX_DIRECTORY",
			},
		],
	},
	"exports": {
		"MyContainer": {
			"type": "durable-object",
			"storage": "sqlite",
		},
		"SandboxDirectory": {
			"type": "durable-object",
			"storage": "sqlite",
		},
	},
}
```

Registry and container methods:

```ts
export class SandboxDirectory extends DurableObject<Env> {
	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		ctx.storage.sql.exec(
			"CREATE TABLE IF NOT EXISTS sandboxes (session TEXT PRIMARY KEY, created_at INTEGER NOT NULL)",
		);
	}

	add(session: string) {
		// Keep the time of the first command when the same session runs again
		this.ctx.storage.sql.exec(
			"INSERT OR IGNORE INTO sandboxes (session, created_at) VALUES (?, ?)",
			session,
			Date.now(),
		);
	}

	remove(session: string) {
		this.ctx.storage.sql.exec("DELETE FROM sandboxes WHERE session = ?", session);
	}

	list() {
		return this.ctx.storage.sql
			.exec<{ session: string }>("SELECT session FROM sandboxes ORDER BY created_at")
			.toArray()
			.map((row) => row.session);
	}
}
```

```ts
const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;

export class MyContainer extends DurableObject<Env> {
	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		const container = ctx.container;
		if (container?.running) {
			void ctx.blockConcurrencyWhile(() =>
				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
			);
		}
	}

	isRunning() {
		// Reading `running` does not start the container
		return this.ctx.container?.running ?? false;
	}

	async destroy() {
		await this.ctx.container?.destroy();
	}
}
```

In `exec()` (the `MyContainer.exec(argv)` method from the run-a-linux-command page), call this after `start()` inside the `if (!container.running)` block: `await container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);`. Worker routes:

```ts
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const [, users, owner, sandboxes, session] = url.pathname.split("/");

		if (users !== "users" || !owner || sandboxes !== "sandboxes") {
			return new Response("Not found", { status: 404 });
		}

		// Authenticate first and derive `owner` from the caller's identity, not the URL.
		const directory = env.SANDBOX_DIRECTORY.getByName(owner);

		if (request.method === "GET" && !session) {
			const sessions = await directory.list();
			// Call the Durable Object of every session in parallel
			const list = await Promise.all(
				sessions.map(async (name) => ({
					session: name,
					running: await env.MY_CONTAINER.getByName(`${owner}/${name}`).isRunning(),
				})),
			);
			return Response.json(list);
		}

		if (!session) {
			return new Response("Not found", { status: 404 });
		}

		const sandbox = env.MY_CONTAINER.getByName(`${owner}/${session}`);

		if (request.method === "POST") {
			const { argv } = (await request.json()) as { argv: string[] };
			await directory.add(session);
			// argv runs inside the disposable sandbox container, never on the host.
			return Response.json(await sandbox.exec(argv));
		}

		if (request.method === "DELETE") {
			await sandbox.destroy();
			await directory.remove(session);
			return new Response(null, { status: 204 });
		}

		return new Response("Not found", { status: 404 });
	},
} satisfies ExportedHandler<Env>;
```

List sandboxes across the account with the Containers API (run on your machine, token from an environment variable):

Adapted (not in the official docs): the bearer token is read from an environment variable instead of a literal placeholder; see Notes.

```sh
curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/containers/applications/<APPLICATION_ID>/instances?name_prefix=ada/" \
	--header "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}"
```

## Notes

- Adapted from the official docs: `${CLOUDFLARE_API_TOKEN}` replaces `<API_TOKEN>` so the secret is not typed inline in shell history. The token needs the **Containers Read** permission, which covers every Container application in the account: use it for administration and cleanup, not in routes that users call.
- A sandbox whose container stopped stays in the list with `running: false` until the Worker removes its session. A listing request can wake a restarted Durable Object, which starts without the timeout `exec()` set; the constructor sets it again.
- The registry lists only the sandboxes your Worker recorded. The API lists every sandbox of the Container application; the application ID is shown by `wrangler containers list` (application is named after the Worker and class, for example `sandbox-linux-mycontainer`). `name_prefix` filters by name start; `state=active` returns starting/running/stopping; stopped sandboxes stay listed; a new sandbox can take a few seconds to appear; `wrangler dev` sandboxes do not appear.
- Without authentication anyone can list, use, or stop another user's sandboxes: derive the owner from the verified identity. SQLite storage and migrations belong to the cloudflare-stateful skill (https://developers.cloudflare.com/durable-objects/).

## Related

- [Run code when a sandbox stops](./run-code-when-a-sandbox-stops.md)
- [Sandbox lifetime](./sandbox-lifetime.md)
- [Sandbox security](./sandbox-security.md)
