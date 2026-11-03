---
source: https://developers.cloudflare.com/agents/model-context-protocol/protocol/tools/
---

# Tools

Define MCP tools with `server.registerTool()` on an `McpServer` and serve them with `createMcpHandler`.

## Signature / Usage

```ts
import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";
import { z } from "zod";

function createServer() {
	const server = new McpServer({ name: "Math", version: "1.0.0" });

	server.registerTool(
		"add",
		{
			description: "Add two numbers together",
			inputSchema: { a: z.number(), b: z.number() },
			outputSchema: { sum: z.number() },
		},
		async ({ a, b }) => {
			const result = { sum: a + b };
			return {
				structuredContent: result,
				content: [{ type: "text", text: JSON.stringify(result) }],
			};
		},
	);

	return server;
}

const handler = createMcpHandler(createServer);

export default {
	fetch(request, env, ctx) {
		return handler(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
```

### Tool results and errors

A handler returns `{ content: [...] }` where each part has a `type` (typically `"text"`). Set `isError: true` to signal failure; the model receives the message.

```ts
async ({ userId }) => {
	const user = await env.USERS.get(userId, "json");
	if (!user) {
		return {
			isError: true,
			content: [{ type: "text", text: `User ${userId} not found` }],
		};
	}
	return { content: [{ type: "text", text: JSON.stringify(user, null, 2) }] };
};
```

### Input validation

Inputs are schemas (Zod or Valibot) validated before the handler runs. Use `.describe()` to give the model context per parameter:

```ts
inputSchema: {
	query: z.string().describe("Text to look for in document titles"),
	limit: z.number().min(1).max(100).default(10).describe("Maximum number of results to return"),
	category: z.enum(["docs", "blog", "api"]).optional().describe("Only return documents in this category"),
},
```

### Tools that need state

`createMcpHandler` builds a new server per request, so keep data in a binding. The source example falls back to a shared `"anonymous"` identity; this version fails closed.

Adapted (not in the official docs): reject unauthenticated callers instead of sharing one `"anonymous"` counter, and increment inside a per-user Durable Object instead of a KV read-then-write; see Notes.

```ts
import { DurableObject, env } from "cloudflare:workers";
import { getMcpAuthContext } from "agents/mcp/server";

// One object per user. Storage calls inside one object are serialized,
// so concurrent increments cannot overwrite each other.
export class Counter extends DurableObject {
	async increment(): Promise<number> {
		const count = ((await this.ctx.storage.get<number>("count")) ?? 0) + 1;
		await this.ctx.storage.put("count", count);
		return count;
	}
}

// Inside createServer():
server.registerTool(
	"incrementCounter",
	{ description: "Increment and return your counter" },
	async () => {
		const userId = getMcpAuthContext()?.props?.userId;
		if (typeof userId !== "string") {
			return {
				isError: true,
				content: [{ type: "text", text: "Authentication required" }],
			};
		}
		const count = await env.COUNTERS.getByName(userId).increment();
		return { content: [{ type: "text", text: `Counter: ${count}` }] };
	},
);
```

`COUNTERS` is a Durable Object binding for the exported `Counter` class (declare it under `durable_objects.bindings` with a `new_sqlite_classes` migration).

## Notes

- Adapted from the official docs: the source falls back to `"anonymous"` when no auth props exist, so every caller shares one counter. The snippet above rejects unauthenticated calls.
- Corrected from the official docs: the source increments with a KV `get` followed by `put` (`env.COUNTERS` as a KV namespace). Two concurrent calls can read the same value and one increment is lost, and KV is eventually consistent across locations. The fence keeps the counter in a per-user Durable Object, whose storage operations are serialized.
- Descriptions are what the model reads to decide when to call a tool: be specific, state input expectations and limitations.
- Define both `inputSchema` and `outputSchema`; strict clients reject results that do not match `outputSchema`.
- Experimental: `agents/experimental/webmcp` bridges tools from a remote MCP server to Chrome's `navigator.modelContext`; it may change between releases.
- For transactions or per-user logic, call a Durable Object or an Agent from the tool.
- Distance lines: the tools specification is mcp-spec; Claude Code MCP use is anthropic-claude-code-extend; Claude API tool use and MCP connector is anthropic-api-tools-mcp; OpenAI Agents SDK MCP is openai-agents; ChatGPT MCP apps are openai-apps-sdk.

## Related

- [createMcpHandler API](./handler-api.md)
- [Authorization](./authorization.md)
- [Build a Remote MCP server](./remote-mcp-server.md)
