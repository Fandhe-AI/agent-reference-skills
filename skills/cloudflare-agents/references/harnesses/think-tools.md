---
source: https://developers.cloudflare.com/agents/harnesses/think/tools/
---

# Think tools

Think provides workspace file tools on every turn plus integration points for custom tools, approvals, MCP tools, code execution, browser tools, and dynamic extensions.

## Signature / Usage

Adapted (not in the official docs): the city is URL-encoded via `URL.searchParams`, the API key must be configured, and errors are surfaced; the original interpolated the raw model-supplied city into the URL. See Notes.

```ts
import { Think } from "@cloudflare/think";
import { tool } from "ai";
import type { ToolSet } from "ai";
import { z } from "zod";

export class MyAgent extends Think<Env> {
	getTools(): ToolSet {
		return {
			getWeather: tool({
				description: "Get the current weather for a city",
				inputSchema: z.object({
					city: z.string().describe("City name"),
				}),
				execute: async ({ city }) => {
					if (!this.env.WEATHER_KEY) throw new Error("WEATHER_KEY is not set");
					const url = new URL("https://api.weather.com/v1/current");
					url.searchParams.set("q", city);
					url.searchParams.set("key", this.env.WEATHER_KEY);
					const res = await fetch(url);
					if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
					return res.json();
				},
			}),
		};
	}
}
```

## Options / Props

### Tool merge order (later sources override earlier on name collision)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| 1. Workspace tools | built-in | — | `read`, `ls`, `find`, `grep`, `write`, `edit`, `delete`, plus `exec` and `publish` when configured. |
| 2. `getTools()` | custom | — | Your server-side tools. |
| 3. Extension tools | dynamic | — | Prefixed by extension name (`math` + `add` = `math_add`). |
| 4. Session tools | from `configureSession` | — | `set_context`, `load_context`, `search_context`. |
| 5. Skill tools | from `getSkills()` | — | `activate_skill`, `read_skill_resource`, `run_skill_script`. |
| 6. MCP tools | from MCP servers | `includeMcpTools: true` | Connected MCP server tools. |
| 7. Client tools | from the browser | — | See think-client-tools.md. |

### Built-in workspace tools (`this.workspace`, a `Workspace` from `@cloudflare/computer` in DO SQLite)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `read` | tool | — | Read text with line and byte paging; pass images and PDFs to multimodal models. |
| `ls` | tool | — | List files/directories with pagination. |
| `find` | tool | — | Find files matching a glob. |
| `grep` | tool | — | Search contents by regex or fixed string. |
| `write` | tool | — | Write a file (creates parent directories). |
| `edit` | tool | — | Exact text replacements, falling back to whitespace-tolerant search. |
| `delete` | tool | — | Delete a file or directory. |
| `exec` | tool | — | Run a command or module on one of the Workspace's execution backends. |
| `publish` | tool | — | Share a workspace file through a presigned URL, when the Workspace has assets. |

### Browser tools (`createBrowserTools`)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `browser_execute` | tool | — | Run JavaScript against a live browser over CDP. |
| `browser_markdown` | tool | — | Read a page or raw HTML as Markdown. |
| `browser_extract` | tool | — | Extract structured data with AI. |
| `browser_links` | tool | — | List links on a page. |
| `browser_scrape` | tool | — | Scrape elements by CSS selector. |
| `quickActions` | `false \| { actions, maxChars, options }` | — | `false` keeps only `browser_execute`. |
| `session` | `{ mode: "dynamic" }` or `{ mode: "reuse", key }` | one-shot | Session lifetime for `cdp.*`. |

## Notes

- Paths are absolute; Computer's tools treat `/workspace` as working root. Return a tool with the same name from `getTools()` to replace a built-in; hide tools for a turn with `activeTools` from `beforeTurn`.
- Adapted from the official docs: the weather example interpolated `city` directly into the URL query string, allowing a model-supplied value to inject query parameters; it now uses `URL.searchParams` and throws when `WEATHER_KEY` is unset instead of sending `key=undefined` (matching think-getting-started.md). Placeholder `getModel() { /* ... */ }` bodies are omitted in the snippets below and assume the model is defined as in the quick start.
- Upgrade from `@cloudflare/shell` (deprecated): `list` is now `ls`; the in-process `bash` tool is gone (add a backend to get `exec`); `workspaceBash`, `createWorkspaceTools`, and `@cloudflare/think/tools/workspace` are removed. Think does not move your data: copy files with the script at https://github.com/cloudflare/agents/blob/main/docs/shell/migrating-to-computer.md.
- `ws:tools` does not export tools that need approval or run in the browser; calls from code do not go through `beforeToolCall`.
- Code run via `exec` on the JavaScript backend executes in a Dynamic Worker isolate (needs a `worker_loaders` binding), not on the host. A `just-bash` shell backend and a container backend with a full Linux userland also exist (see https://github.com/cloudflare/computer/tree/main/packages/computer#choosing-a-backend). For container/sandbox isolation products, see the cloudflare-sandbox-containers skill (sandbox; https://developers.cloudflare.com/sandbox/).
- Corrected from the official docs: `deleteFile` used `needsApproval: async ({ path }) => path.startsWith("/important/")`, which lets the model delete any other file without approval and is bypassable with `..` segments; it is `needsApproval: true`. Because a tool returned from `getTools()` only adds a name and does not replace a differently named built-in, a separate `deleteFile` would leave the built-in `delete` callable without approval; the example therefore returns the approval-gated tool under the built-in name `delete` and lists `delete` in the `beforeTurn` `activeTools`. A predicate is still fine for non-destructive tools, but compare normalized paths.
- Approval: when `needsApproval` returns `true` the call goes to the client and the conversation pauses until the client responds with `CF_AGENT_TOOL_APPROVAL`. Inside the deprecated code-execution sandbox, `needsApproval` maps to Code Mode's durable pause/approve/resume and a function-valued `needsApproval` always requires approval. The `pending` array in a paused tool output is a truncated preview (~2 KB per arg); render approval cards from `pendingExecutions()` (full args up to 1 MB), not the transcript. Callables: `approveExecution(executionId)`, `rejectExecution(executionId, reason?)`, `pendingExecutions()`.
- Adapted from the official docs: the `addServer` callable in the MCP snippet forwarded any client-supplied URL to `addMcpServer()`; the fence adds an origin allowlist (`https://mcp.example.com` is a placeholder). Callables are reachable by every connected client, so also authenticate connections (routing-authentication reference).
- `beforeTurn` can return `activeTools` (limits callable tools) and `tools` (extra tools for this turn only).
- MCP: Think inherits MCP client support. `includeMcpTools = false` turns off only the automatic tool merge (connections still register, restore, discover, wait). Use it instead of removing MCP names via `activeTools`, which cannot avoid schema conversion. `waitForMcpConnections = true` uses a 10s default timeout. MCP servers added with `addMcpServer(name, url)` expose their tools to the model: only add servers you trust, and do not accept arbitrary URLs from unauthenticated callers.
- Deprecated: `createExecuteTool` / `createExecuteRuntime` (use `exec` with a `ws:tools` module). It needs `@cloudflare/codemode`, a `worker_loaders` binding, and optional `browser` binding; the worker entry must export `CodemodeRuntime` from `@cloudflare/codemode`. Inside it, `tools.*`, `cdp.*`, and `codemode.search/describe/step/run` are available; only tools with an `execute` function are exposed. The runtime handle (`this.codemode`) offers `executions()`, `expirePaused()` (call from a scheduled task), and `saveSnippet(name, { executionId })`.
- `cdpUrl: "http://localhost:9222"` for a custom Chrome endpoint only works where the Worker can reach that address (for example local development).
- Extensions are dynamically loaded sandboxed Workers (`extensionLoader = this.env.LOADER`). With `createExtensionTools`, the LLM can write and load extension source (`load_extension`, `list_extensions`): treat that as untrusted, model-generated code, keep `permissions: { network: false }` unless needed, and restrict who can drive the agent. Extension context blocks are registered as `<extension>_<label>` (e.g. `notes_scratchpad`).
- Distinction: browser tooling API is in the "Browse the web" tools documentation; Browser Run itself and Dynamic Workers are separate Cloudflare products: https://developers.cloudflare.com/dynamic-workers/.

### Run code with exec (Workspace backend)

The JavaScript backend runs model-written code in a Dynamic Worker isolate, not on the host.

```ts
import { Think } from "@cloudflare/think";
import { Workspace } from "@cloudflare/computer";
import { WorkerJavaScriptBackend } from "@cloudflare/computer/backends/worker-javascript";
import { createGitClient } from "@cloudflare/computer/git";
import { createGitModule } from "@cloudflare/computer/modules/git";

export class MyAgent extends Think<Env> {
	override workspace = new Workspace({
		storage: this.ctx.storage,
		git: createGitClient(),
		backends: [
			new WorkerJavaScriptBackend({
				id: "js",
				loader: this.env.LOADER,
				access: "read-write",
				modules: { "ws:git": createGitModule() },
			}),
		],
	});
}
```

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "worker_loaders": [
    {
      "binding": "LOADER"
    }
  ]
}
```

Expose the agent's tools to that code with a `ws:tools` module:

```ts
import { createToolBindings } from "@cloudflare/computer/modules/tools";
import { forAISDKTools } from "@cloudflare/computer/tools/ai-sdk";

new WorkerJavaScriptBackend({
	id: "js",
	loader: this.env.LOADER,
	modules: {
		"ws:tools": createToolBindings(forAISDKTools(() => this.getTools())),
	},
});
```

Code the model runs with `exec`:

```js
import { readFile } from "node:fs/promises";
import { getWeather } from "ws:tools";

export default async function () {
	const cities = JSON.parse(await readFile("/workspace/cities.json", "utf8"));
	const reports = [];
	for (const city of cities) reports.push((await getWeather({ city })).text);
	return reports;
}
```

### Tool approval and per-turn overrides

Adapted (not in the official docs): the official `deleteFile` asks for approval only when `path.startsWith("/important/")`, so every other deletion (and a path such as `/x/../important/y` that resolves inside `/important/`) runs without approval; deletion now always requires approval. The tool is named `delete` so it replaces the built-in workspace `delete` (otherwise the model could still delete files without approval), and `beforeTurn` keeps `delete` in `activeTools`. See Notes.

```ts
getTools(): ToolSet {
	return {
		// Same name as the built-in workspace tool, so this replaces it.
		delete: tool({
			description: "Delete a file or directory",
			inputSchema: z.object({ path: z.string() }),
			// Destructive: always require approval (a prefix check on an
			// unnormalized path can be bypassed with "..").
			needsApproval: true,
			execute: async ({ path }) => {
				await this.workspace.fs.rm(path);
				return { deleted: path };
			},
		}),
	};
}

beforeTurn(ctx: TurnContext) {
	return {
		activeTools: ["read", "write", "delete", "getWeather"],
		tools: { emergencyTool: this.createEmergencyTool() },
	};
}
```

`createEmergencyTool()` is a user-defined helper.

### MCP tools

```ts
export class MyAgent extends Think<Env> {
	includeMcpTools = false;
	waitForMcpConnections = true; // or: { timeout: 5000 }
}
```

Adapted (not in the official docs): the callable accepted any client-supplied URL; an origin allowlist is added so connected clients cannot make the agent connect to arbitrary hosts. See Notes.

```ts
import { callable } from "agents";

const ALLOWED_MCP_ORIGINS = new Set(["https://mcp.example.com"]);

export class MyAgent extends Think<Env> {
	@callable()
	async addServer(name: string, url: string) {
		if (!ALLOWED_MCP_ORIGINS.has(new URL(url).origin)) {
			throw new Error("MCP server not allowed");
		}
		return await this.addMcpServer(name, url);
	}

	@callable()
	async removeServer(serverId: string) {
		await this.removeMcpServer(serverId);
	}
}
```

### Deprecated: execute tool (Code Mode)

```ts
import { createAITools } from "@cloudflare/computer/tools/ai-sdk";
import { createExecuteTool } from "@cloudflare/think/tools/execute";

export class MyAgent extends Think<Env> {
	getTools() {
		return {
			execute: createExecuteTool(this, {
				tools: createAITools({ workspace: this.workspace }),
			}),
		};
	}
}
```

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "worker_loaders": [
    {
      "binding": "LOADER"
    }
  ],
  "browser": {
    "binding": "BROWSER"
  }
}
```

### Browser tools

```ts
import { createBrowserTools } from "@cloudflare/think/tools/browser";

export class MyAgent extends Think<Env> {
	getTools() {
		return {
			...createBrowserTools({
				ctx: this.ctx,
				browser: this.env.BROWSER,
				loader: this.env.LOADER,
			}),
		};
	}
}
```

### Extensions

```ts
export class MyAgent extends Think<Env> {
	extensionLoader = this.env.LOADER;

	getExtensions() {
		return [
			{
				manifest: {
					name: "math",
					version: "1.0.0",
					permissions: { network: false },
				},
				source: `({
					tools: {
						add: {
							description: "Add two numbers",
							parameters: { a: { type: "number" }, b: { type: "number" } },
							execute: async ({ a, b }) => ({ result: a + b })
						}
					}
				})`,
			},
		];
	}
}
```

LLM-driven loading:

```ts
import { createExtensionTools } from "@cloudflare/think/tools/extensions";

getTools() {
	return {
		...createExtensionTools({ manager: this.extensionManager! }),
		...this.extensionManager!.getTools(),
	};
}
```

## Related

- [think-actions.md](./think-actions.md)
- [think-client-tools.md](./think-client-tools.md)
- [think-lifecycle-hooks.md](./think-lifecycle-hooks.md)
- [think-configuration.md](./think-configuration.md)
