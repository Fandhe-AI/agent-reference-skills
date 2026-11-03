---
source: https://developers.cloudflare.com/agents/tools/codemode/mcp/
---

# Code Mode with MCP tools

`McpConnector` exposes tools from an existing Agents SDK MCP client connection inside the Code Mode sandbox, with discovery, durable approvals, and execution history. This page covers an Agent consuming an MCP server; publishing Code Mode as an MCP server is documented in build-codemode-mcp-server.md (https://developers.cloudflare.com/agents/model-context-protocol/guides/build-codemode-mcp-server/)

## Signature / Usage

Requires the durable runtime setup ([codemode-durable-runtime.md](./codemode-durable-runtime.md)) and an existing MCP connection (see [MCP client tools](./mcp-client-tools.md)). Create the connector; `create_issue` is marked as requiring approval:

```ts
import {
	McpConnector,
	type ConnectorTool,
	type McpConnectionLike,
} from "@cloudflare/codemode";

export class GithubConnector extends McpConnector<Env> {
	private connection: McpConnectionLike;

	constructor(
		ctx: DurableObjectState | ExecutionContext,
		env: Env,
		connection: McpConnectionLike,
	) {
		super(ctx, env);
		this.connection = connection;
	}

	override name() {
		return "github";
	}

	protected override instructions() {
		return "Use for GitHub repositories, issues, and pull requests.";
	}

	protected override createConnection() {
		return this.connection;
	}

	protected override tool(
		name: string,
		tool: ConnectorTool,
	): ConnectorTool {
		if (name === "create_issue") {
			return { ...tool, requiresApproval: true };
		}

		return tool;
	}
}
```

Add it to the runtime:

```ts
import { Agent } from "agents";
import {
	createCodemodeRuntime,
	DynamicWorkerExecutor,
} from "@cloudflare/codemode";
import { GithubConnector } from "./github-connector";

export class Chat extends Agent<Env> {
	private async codemodeRuntime() {
		await this.mcp.waitForConnections();

		const server = this.mcp
			.listServers()
			.find((server) => server.name === "github");

		if (!server) {
			throw new Error("GitHub MCP server is not registered.");
		}

		const connection = this.mcp.mcpConnections[server.id];
		if (!connection) {
			throw new Error("GitHub MCP connection is not available.");
		}

		return createCodemodeRuntime({
			ctx: this.ctx,
			executor: new DynamicWorkerExecutor({ loader: this.env.LOADER }),
			connectors: [
				new GithubConnector(this.ctx, this.env, connection),
			],
		});
	}
}
```

Model-written code with progressive discovery:

```js
async () => {
	const matches = await codemode.search("open pull requests");
	const docs = await codemode.describe(matches.results[0].path);

	const pullRequests = await github.list_pull_requests({
		owner: "cloudflare",
		repo: "agents",
		state: "open",
	});

	return { docs, pullRequests };
};
```

Lighter integration without durable approvals (default `codemode` namespace):

```ts
import { DynamicWorkerExecutor } from "@cloudflare/codemode";
import { createCodeTool } from "@cloudflare/codemode/ai";

await this.mcp.waitForConnections();

const executor = new DynamicWorkerExecutor({ loader: this.env.LOADER });
const codemode = createCodeTool({
	tools: this.mcp.getAITools(),
	executor,
});
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name()` | method | — | Defines the sandbox global; must be unique within a runtime. |
| `createConnection()` | method | — | Returns the existing Agents SDK MCP connection. |
| `instructions()` | method | — | Guidance text for the model. |
| `tool(name, tool)` | method | — | Decoration hook receiving each generated method by sanitized name; return `{ ...tool, requiresApproval: true }` to pause before execution. |
| `toolName()` | method | — | Override to disambiguate colliding sanitized names (a collision throws). |
| `includeMcpTools` | boolean | — | Think agents: `false` skips the automatic `getAITools()` call (MCP connection stays available to the connector). |
| `waitForMcpConnections` | boolean | — | Think agents: set `true` alongside `includeMcpTools = false`. |

## Notes

- Each discovered MCP tool becomes a typed sandbox method (types from MCP schemas) that calls `connection.client.callTool()`. Names are sanitized: `list-pull.requests` becomes `list_pull_requests`, `3d-render` becomes `_3d_render`, `delete` becomes `delete_`.
- Human-in-the-loop: mark destructive MCP tools with `requiresApproval: true` in `tool()`; the runtime returns a paused execution and the same sandbox program continues after approval. The `createCodeTool(this.mcp.getAITools())` path has no durable pause/approval; use `McpConnector` when tools can cause side effects or need on-demand discovery.
- Await `codemodeRuntime()` before calling approval, rejection, rollback, or snippet methods so MCP connections finish restoring after hibernation.
- Tool results and descriptions from external MCP servers are untrusted input to the model. Connector credentials stay on the host side and are never exposed to sandbox code.
- `getAITools()` schema conversion is reused while a live connection's catalog is unchanged; use `this.mcp.listTools()` to inspect the raw MCP catalog. The MCP protocol itself is in the mcp-spec skill.

## Related

- [MCP client tools](./mcp-client-tools.md)
- [Durable runtime](./codemode-durable-runtime.md)
