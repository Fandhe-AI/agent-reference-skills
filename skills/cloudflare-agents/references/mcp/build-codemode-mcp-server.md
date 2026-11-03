---
source: https://developers.cloudflare.com/agents/model-context-protocol/guides/build-codemode-mcp-server/
---

# Build a Code Mode MCP server

Expose an MCP server or a large OpenAPI service to any MCP client through sandboxed, model-written code, so tool definitions and intermediate data stay out of the model's context.

## Signature / Usage

```sh
npm i @cloudflare/codemode agents @modelcontextprotocol/sdk zod
```

Add a Worker Loader binding and `nodejs_compat`:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "codemode-mcp-server",
  "main": "src/server.ts",
  "upload_source_maps": true,
  // Set this to today's date
  "compatibility_date": "2026-11-03",
  "compatibility_flags": ["nodejs_compat"],
  "worker_loaders": [{ "binding": "LOADER" }]
}
```

### Pattern 1: wrap an existing MCP server (`code` tool)

`codeMcpServer()` advertises one `code` tool whose description holds generated TypeScript declarations for every upstream tool; the model writes JavaScript against a `codemode` namespace.

```ts
import { DynamicWorkerExecutor } from "@cloudflare/codemode";
import { codeMcpServer } from "@cloudflare/codemode/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createLegacyMcpHandler } from "agents/mcp";
import { z } from "zod";

function createOrderServer() {
	const server = new McpServer({ name: "orders", version: "1.0.0" });

	server.registerTool(
		"get_order",
		{
			description: "Get an order by ID",
			inputSchema: { orderId: z.string().describe("Order ID") },
		},
		async ({ orderId }) => ({
			structuredContent: { id: orderId, status: "processing" },
			content: [
				{ type: "text", text: JSON.stringify({ id: orderId, status: "processing" }) },
			],
		}),
	);

	return server;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const upstream = createOrderServer();
		const executor = new DynamicWorkerExecutor({ loader: env.LOADER });
		const server = await codeMcpServer({ server: upstream, executor });

		return createLegacyMcpHandler(server, { route: "/mcp" })(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
```

Model-written code inside the `code` tool:

```js
async () => {
	const order = await codemode.get_order({ orderId: "order-123" });
	return { id: order.id, status: order.status };
};
```

### Pattern 2: search and execute for a large API

`openApiMcpServer()` exposes `search` (code against the OpenAPI document, returning only needed operations) and `execute` (code with an authenticated request function). The full document stays in the sandbox; the credential stays in the host callback.

Adapted (not in the official docs): the host `request` callback forwards only read-only methods (`GET`, `HEAD`), so model-written code cannot issue writes or deletes with the caller's credential without an approval step you add. See Notes.

```ts
import { DynamicWorkerExecutor } from "@cloudflare/codemode";
import { openApiMcpServer } from "@cloudflare/codemode/mcp";
import { createLegacyMcpHandler } from "agents/mcp";

const SPEC_URL = "https://api.example.com/openapi.json";
const API_ORIGIN = "https://api.example.com";
// Writes and deletes need your own approval step before you allow them here.
const READ_ONLY_METHODS = new Set(["GET", "HEAD"]);

let specCache: Record<string, unknown> | undefined;

async function loadSpec(): Promise<Record<string, unknown>> {
	if (specCache) return specCache;
	const response = await fetch(SPEC_URL);
	if (!response.ok) {
		throw new Error(`OpenAPI request failed: ${response.status}`);
	}
	specCache = (await response.json()) as Record<string, unknown>;
	return specCache;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const authorization = request.headers.get("Authorization");
		if (!authorization?.startsWith("Bearer ")) {
			return new Response("Bearer token required", { status: 401 });
		}

		const server = openApiMcpServer({
			spec: await loadSpec(),
			executor: new DynamicWorkerExecutor({ loader: env.LOADER }),
			name: "example-api",
			version: "1.0.0",
			request: async (options) => {
				if (!options.path.startsWith("/")) {
					throw new Error("API path must start with a slash");
				}
				const method = String(options.method).toUpperCase();
				if (!READ_ONLY_METHODS.has(method)) {
					throw new Error(`${method} requires approval and is not allowed here`);
				}
				const url = new URL(`${API_ORIGIN}${options.path}`);
				for (const [key, value] of Object.entries(options.query ?? {})) {
					if (value !== undefined) url.searchParams.set(key, String(value));
				}
				const headers: Record<string, string> = { Authorization: authorization };
				if (options.contentType) {
					headers["Content-Type"] = options.contentType;
				} else if (options.body !== undefined) {
					headers["Content-Type"] = "application/json";
				}
				const response = await fetch(url, {
					method,
					headers,
					body:
						options.body === undefined
							? undefined
							: options.rawBody
								? (options.body as string)
								: JSON.stringify(options.body),
				});
				if (!response.ok) {
					throw new Error(`API request failed: ${response.status}`);
				}
				if (response.status === 204) return null;
				const responseType = response.headers.get("Content-Type") ?? "";
				return responseType.includes("application/json")
					? await response.json()
					: await response.text();
			},
		});

		return createLegacyMcpHandler(server, { route: "/mcp" })(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
```

Model-written code:

```js
// search tool
async () => {
	const spec = await codemode.spec();
	return Object.entries(spec.paths)
		.filter(([path]) => path.includes("/orders"))
		.map(([path, operations]) => ({ path, methods: Object.keys(operations) }));
};

// execute tool
async () => {
	const response = await codemode.request({
		method: "GET",
		path: "/orders",
		query: { status: "processing", limit: 20 },
	});
	return response.items.map(({ id, status }) => ({ id, status }));
};
```

Deploy with `npx wrangler deploy` and connect a client to `https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/mcp`.

## Options / Props

`openApiMcpServer()` request callback options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `method` | — | — | HTTP method |
| `path` | — | — | API path (must start with `/`) |
| `query` | — | — | Optional query parameters |
| `body` | — | — | Optional request body |
| `contentType` | — | — | Optional content type |
| `rawBody` | — | — | Optional; send `body` as-is instead of JSON-encoding |

`codeMcpServer()` custom `description` placeholders: `{{types}}` (generated declarations) and `{{example}}` (example call from the first upstream tool); both optional. `openApiMcpServer()` ignores these; an optional `description` is appended to the `execute` description. Exact types: [codemode-api-reference.md](../tools/codemode-api-reference.md)

## Notes

- Code Mode is experimental and may have breaking changes. Both helpers currently return an SDK v1 server, so serve them with `createLegacyMcpHandler` (see [Migrate to MCP SDK v2](./migrate-to-mcp-sdk-v2.md)); build a new server per request.
- In the OpenAPI example the client's own `Authorization` bearer is the upstream API's credential, forwarded only to the fixed `API_ORIGIN`. The MCP endpoint adds no authentication beyond requiring that header, and paths are validated rather than accepting arbitrary origins. Never take the origin from the model.
- Adapted from the official docs: the source `request` callback forwards any HTTP method chosen by model-written code, so a single `execute` call could create, change, or delete upstream resources with the caller's bearer token. The fence allows only `GET` and `HEAD` (an allowlist, not a deny-list of dangerous methods); to support writes, gate each non-read-only call behind an explicit approval step before forwarding it.
- `DynamicWorkerExecutor` blocks outbound `fetch()` and `connect()` from generated code by default. Code execution does not replace authorization: enforce permissions and per-operation approval inside upstream handlers or the host callback; neither helper provides durable per-call approval.
- Do not put secrets in the OpenAPI document or API results; both are visible to model-written code. Local `$ref` values resolve in the sandbox; external references do not.
- Responses are limited to about 6,000 estimated tokens and truncated with `--- TRUNCATED ---`; truncation does not undo API work already done, so select, map, aggregate, or paginate before returning.
- Distance lines: the protocol spec is mcp-spec; consuming MCP in Claude Code is anthropic-claude-code-extend; Claude API MCP connector is anthropic-api-tools-mcp; OpenAI Agents SDK MCP is openai-agents; ChatGPT MCP apps are openai-apps-sdk.

## Related

- [Cloudflare's own MCP servers](./servers-for-cloudflare.md)
- [Tools](./tools.md)
- [createMcpHandler API](./handler-api.md)
