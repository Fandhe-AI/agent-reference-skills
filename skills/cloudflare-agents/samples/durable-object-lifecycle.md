---
source: https://developers.cloudflare.com/agents/getting-started/add-to-existing-project/
---

# Add the Lifecycle to an existing Durable Object

Install the Agents SDK Lifecycle on an existing SQLite-backed Durable Object, add a Scheduler capability, and route agent traffic safely.

## Signature / Usage

```sh
npm i agents
```

Wrangler configuration (`nodejs_compat` is required by `agents`; the object needs SQLite storage and must be addressed by name):

```jsonc
{
	"compatibility_flags": ["nodejs_compat"],
	"durable_objects": {
		"bindings": [{ "name": "NOTES", "class_name": "Notes" }],
	},
	"exports": {
		"Notes": { "type": "durable-object", "storage": "sqlite" },
	},
}
```

Adapted (not in the official docs): the page's incremental snippets assembled into one class, with the "as before" members written out; `add()` and `remindLater()` are RPC methods and now await `this.lifecycle.start()` first, with `add()` async and its callers awaiting it. `onRequest()` also rejects POST bodies over 4 KiB before storing them as a note. See Notes.

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { Scheduler } from "agents/schedules";

export class Notes extends DurableObject<Env> {
	readonly scheduler = new Scheduler({
		callbacks: {
			remind: async (payload: { text: string }) => {
				await this.add(`Reminder: ${payload.text}`);
			},
		},
	});

	readonly lifecycle = Lifecycle.install(this).use(this.scheduler);

	onStart(): void {
		this.ctx.storage.sql.exec(
			"CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, text TEXT NOT NULL)",
		);
	}

	async add(text: string): Promise<void> {
		// RPC calls do not go through fetch, so start the lifecycle first
		await this.lifecycle.start();
		this.ctx.storage.sql.exec("INSERT INTO notes (text) VALUES (?)", text);
	}

	async list(): Promise<string[]> {
		// RPC calls do not go through fetch, so start the lifecycle first
		await this.lifecycle.start();
		return this.ctx.storage.sql
			.exec<{ text: string }>("SELECT text FROM notes ORDER BY id")
			.toArray()
			.map((row) => row.text);
	}

	async remindLater(text: string, seconds: number): Promise<void> {
		// RPC calls do not go through fetch, so start the lifecycle first
		await this.lifecycle.start();
		await this.scheduler.set(seconds, "remind", { text });
	}

	async onRequest(request: Request): Promise<Response> {
		if (request.method === "POST") {
			// Notes are stored as SQLite rows: reject bodies over 4 KiB before reading them all.
			const length = Number(request.headers.get("content-length"));
			if (!Number.isFinite(length) || length <= 0 || length > 4096) {
				return new Response("Content-Length required, max 4 KiB", { status: 413 });
			}
			const text = await request.text();
			if (new TextEncoder().encode(text).byteLength > 4096) {
				return new Response("Note too large", { status: 413 });
			}
			await this.add(text);
		}
		return Response.json(await this.list());
	}
}
```

Worker entry: serve only the lifecycle-enabled binding through `routeAgentRequest()`, ahead of your existing routes:

Adapted (not in the official docs): the routing hooks also authenticate the caller (fail closed) and bind the object name to the authenticated user. See Notes.

```ts
import { routeAgentRequest } from "agents";

export { Notes } from "./notes";

// routeAgentRequest() matches every Durable Object binding in env.
// Only serve the ones that run the lifecycle.
const AGENT_BINDINGS = new Set(["NOTES"]);

async function authenticate(
	request: Request,
	env: Env,
): Promise<{ id: string } | null> {
	// Verify a session cookie, a JWT, or an API key here.
	// This placeholder rejects every request until you implement verification.
	return null;
}

async function onlyAgents(
	env: Env,
	request: Request,
	route: { className: string; name: string },
): Promise<Response | void> {
	if (!AGENT_BINDINGS.has(route.className)) {
		return new Response("Not found", { status: 404 });
	}
	const user = await authenticate(request, env);
	if (!user) return new Response("Unauthorized", { status: 401 });
	// Each user can only reach the object named after them.
	if (route.name !== user.id) return new Response("Forbidden", { status: 403 });
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const agentResponse = await routeAgentRequest(request, env, {
			onBeforeRequest: (req, route) => onlyAgents(env, req, route),
			onBeforeConnect: (req, route) => onlyAgents(env, req, route),
		});
		if (agentResponse) return agentResponse;

		// Your existing routes
		return new Response("Not found", { status: 404 });
	},
} satisfies ExportedHandler<Env>;
```

Call over RPC from the Worker:

```ts
const notes = env.NOTES.getByName("team");
await notes.remindLater("Stand-up", 60);
```

## Notes

- Adapted from the official docs: `onRequest()` stored `await request.text()` without a bound; it now requires a `Content-Length` of at most 4 KiB (an example cap) and checks the decoded byte length before calling `add()`.
- The Lifecycle only installs handlers the class does not define: remove your own `fetch()`, `alarm()`, `webSocketMessage()`, `webSocketClose()`, and `webSocketError()`, otherwise `onStart()` / `onRequest()` / capabilities never run. Move constructor setup to `onStart()` and `fetch()` to `onRequest()`.
- The object must use SQLite storage (not KV-backed) and be addressed with `getByName()` / `idFromName()`; objects from `newUniqueId()` / `idFromString()` have no name.
- Do not call `ctx.storage.setAlarm()` or `deleteAlarm()` yourself; the Lifecycle owns the alarm. RPC methods bypass `fetch`, so call `await this.lifecycle.start()` first (capability methods such as `scheduler.set()` start it themselves).
- `onlyAgents` keeps `routeAgentRequest()` from exposing your other Durable Object bindings.
- Adapted from the official docs: the page's hook only filters by binding, so any caller could add notes to any object over HTTP; the fence also runs a placeholder `authenticate()` that rejects every request until you implement verification (fail closed) and requires the object name to equal the user id. Never derive identity from unverified headers or query parameters. Worker-side RPC such as `env.NOTES.getByName("team")` does not pass through these hooks; authorize it in your own code.
- With static assets, add `"run_worker_first": ["/agents/*"]` under `assets` so agent routes reach the Worker. A legacy `migrations` array may be used instead of `exports`, but not both.
- Lifecycle-added tables are prefixed `cf_agents_` and keys `cf_agents:`; your own tables are untouched.

## Related

- [Lifecycle](../references/runtime/lifecycle.md)
- [Capabilities](../references/runtime/capabilities.md)
- [Scheduler](../references/runtime/scheduler.md)
