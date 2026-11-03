---
source: https://developers.cloudflare.com/agents/agent-class/sub-agents/
---

# Sub-agents (subAgent / abortSubAgent / deleteSubAgent)

Spawn child agents as co-located Durable Object facets with their own isolated SQLite storage. The parent gets a typed RPC stub for every public method of the child class.

## Signature / Usage

```ts
import { Agent } from "agents";

export class Orchestrator extends Agent {
	async delegateWork() {
		const researcher = await this.subAgent(Researcher, "research-1");
		const findings = await researcher.search("cloudflare agents sdk");
		return findings;
	}
}

export class Researcher extends Agent {
	async search(query: string) {
		const results = await fetch(`https://api.example.com/search?q=${query}`);
		return results.json();
	}
}
```

Adapted (not in the official docs): the source builds the URL with the raw `query`; it is URL-encoded here (see Notes).

```ts
export class Researcher extends Agent {
	async search(query: string) {
		const results = await fetch(
			`https://api.example.com/search?q=${encodeURIComponent(query)}`,
		);
		return results.json();
	}
}
```

Only the top-level parent needs a binding and migration:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  // Set this to today's date
  "compatibility_date": "2026-11-03",
  "compatibility_flags": [
    "nodejs_compat"
  ],
  "durable_objects": {
    "bindings": [
      {
        "class_name": "Orchestrator",
        "name": "Orchestrator"
      }
    ]
  },
  "migrations": [
    {
      "new_sqlite_classes": [
        "Orchestrator"
      ],
      "tag": "v1"
    }
  ]
}
```

Signatures:

```ts
class Agent {
	async subAgent<T extends Agent>(
		cls: SubAgentClass<T>,
		name: string,
	): Promise<SubAgentStub<T>>;
	abortSubAgent(cls: SubAgentClass, name: string, reason?: unknown): void;
	deleteSubAgent(cls: SubAgentClass, name: string): void;
}
```

Gate and route:

```ts
export class Inbox extends Agent {
	override async onBeforeSubAgent(_request, { className, name }) {
		// Strict registry gate: only allow clients to reach chats that were created.
		if (!this.hasSubAgent(className, name)) {
			return new Response(`${className} "${name}" not found`, {
				status: 404,
			});
		}
	}
}
```

```tsx
const chat = useAgent({
	agent: "Inbox",
	name: userId,
	sub: [{ agent: "Chat", name: chatId }],
});
```

Adapted (not in the official docs): comment added that the caller must be authenticated and own `userId` before routing (the name comes from the URL).

```ts
import { getAgentByName, routeSubAgentRequest } from "agents";

export default {
	async fetch(request: Request, env: Env) {
		const url = new URL(request.url);
		const match = url.pathname.match(/^\/api\/u\/([^/]+)(\/.*)$/);
		if (!match) return new Response("Not found", { status: 404 });

		const [, userId, rest] = match;
		// Authenticate the caller and check they own `userId` before routing;
		// a name taken from the URL alone is not an identity.
		const parent = await getAgentByName(env.Inbox, userId);
		return routeSubAgentRequest(request, parent, { fromPath: rest });
	},
};
```

```ts
import { getAgentByName, getSubAgentByName } from "agents";

const inbox = await getAgentByName(env.Inbox, userId);
const chat = await getSubAgentByName(inbox, Chat, chatId);

await chat.addMessage({ role: "user", content: "hello" });
```

Callback URLs and identity:

```ts
import { buildAgentUrl } from "agents";

export class Chat extends Agent<Env> {
	callbackUrl() {
		return buildAgentUrl(this.env.PUBLIC_ORIGIN, this.selfPath, {
			leafPath: "/callbacks/job",
		});
	}

	override async onRequest(request: Request) {
		if (new URL(request.url).pathname === "/callbacks/job") {
			return this.handleJobCallback(request);
		}
		return new Response("Not found", { status: 404 });
	}
}
```

```ts
// Inside a Chat spawned by Inbox:
this.parentPath;
// [{ className: "Inbox", name: "user-123" }]

this.selfPath;
// [
//   { className: "Inbox", name: "user-123" },
//   { className: "Chat", name: "chat-abc" }
// ]

const inbox = await this.parentAgent(Inbox);
await inbox.recordTurn(this.name, "...");
```

Callback streaming with an `RpcTarget`:

```ts
import { RpcTarget } from "cloudflare:workers";

class StreamCollector extends RpcTarget {
	chunks: string[] = [];
	onChunk(text: string) {
		this.chunks.push(text);
	}
}

export class Parent extends Agent {
	async streamFromChild() {
		const child = await this.subAgent(Streamer, "streamer-1");
		const collector = new StreamCollector();
		await child.generate("Write a poem", collector);
		return collector.chunks;
	}
}

export class Streamer extends Agent {
	async generate(prompt: string, callback: StreamCollector) {
		const chunks = ["Once ", "upon ", "a ", "time..."];
		for (const chunk of chunks) {
			callback.onChunk(chunk);
		}
	}
}
```

## Options / Props

`subAgent`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `cls` | `SubAgentClass<T>` | — | Agent subclass; must be exported from the worker entry and the export name must equal the class name |
| `name` | `string` | — | Unique child name; the same name always returns the same child |

`abortSubAgent`: `cls`, `name`, `reason?` (`unknown`, error thrown to pending/future RPC callers). `deleteSubAgent`: `cls`, `name`.

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `hasSubAgent(cls, name)` | method | — | Whether a child has been spawned and not deleted (SQLite registry) |
| `listSubAgents(cls?)` | method | — | Rows `{ className, name, createdAt }` in creation order |
| `onBeforeSubAgent(request, child)` | hook | — | Return `void` to forward, a `Request` to forward modified, a `Response` to short-circuit |
| `parentPath` / `selfPath` | array | `[]` for top-level | Root-first `{ className, name }` chain |
| `parentAgent(Cls)` | method | — | Typed RPC stub to the immediate parent |
| `buildAgentPath(path, { leafPath, rootBinding })` | function | — | Canonical pathname for HTTP and WebSocket |
| `buildAgentUrl(origin, path, options)` | function | — | Adds an HTTP(S)/WS(S) origin (no credentials, path, query or fragment) |
| `routeSubAgentRequest(request, parent, { fromPath })` | function | — | Dispatch into a sub-agent from a resolved parent stub |
| `getSubAgentByName(parent, Cls, name)` | function | — | RPC-only proxy from outside the parent; `.fetch()` throws |

Behaviour of Agent features inside a sub-agent:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `schedule()`/`scheduleEvery()`/`cancelSchedule()`/`getScheduleById()`/`listSchedules()` | method | — | Work, scoped to the sub-agent |
| `keepAlive()`/`keepAliveWhile()` | method | — | Delegate the heartbeat to the top-level parent |
| `runFiber()`, `setState()`, `this.sql`, `subAgent()` | method | — | Work against the child's own storage |
| `getSchedule()`/`getSchedules()` | method | — | Throw inside sub-agents |

## Notes

- Adapted from the official docs: the search URL now uses `encodeURIComponent(query)` so child input cannot alter the query string.
- `SubAgentStub<T>` exposes only user-defined methods, not inherited ones (lifecycle hooks, `setState`, `broadcast`, `sql`...). Sync return types are wrapped in `Promise`.
- Child classes are discovered through `ctx.exports`; the child class name cannot be `Sub` (`/sub/` is the URL separator). A facet-only child need not be in `new_sqlite_classes`.
- Tests with `@cloudflare/vitest-plugin` may need facet classes as test-only DO bindings (keep them out of `new_sqlite_classes`, test wrangler config only).
- Abort and delete are transitive; abort preserves storage, delete wipes it. `this.destroy()` in a sub-agent delegates to the parent: treat as fire-and-forget.
- Different classes may share a name; the internal key is class name plus facet name. `this.name` in a child is the facet name.
- Workflows started from a sub-agent are tracked in the child's SQLite; add child wrapper methods to control them (see [run-workflows.md](./run-workflows.md)).
- Do not authenticate sub-agent access by name alone: use `onBeforeSubAgent`. If you return a modified `Request`, preserve WebSocket upgrade headers.
- Sub-agents use Durable Object facets; see the cloudflare-stateful skill for DO-level behaviour.

## Related

- [Agents as tools](./agent-tools.md)
- [Routing](./routing.md)
- [Durable execution](./durable-execution.md)
- [Run Workflows](./run-workflows.md)
