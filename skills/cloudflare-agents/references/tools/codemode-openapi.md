---
source: https://developers.cloudflare.com/agents/tools/codemode/openapi/
---

# Code Mode with an OpenAPI service

`OpenApiConnector` exposes an OpenAPI service in a durable Code Mode runtime, deriving one typed sandbox method per operation while authentication stays in the host Worker. The model discovers methods with `codemode.search()` / `codemode.describe()`.

## Signature / Usage

Requires the durable runtime setup ([codemode-durable-runtime.md](./codemode-durable-runtime.md)). Give each operation a unique `operationId`:

```ts
export const ordersOpenApiSpec = {
	openapi: "3.1.0",
	info: { title: "Orders API", version: "1.0.0" },
	paths: {
		"/orders/{orderId}": {
			get: {
				operationId: "get_order",
				summary: "Get an order by ID.",
				parameters: [
					{
						name: "orderId",
						in: "path",
						required: true,
						schema: { type: "string" },
					},
				],
			},
		},
		"/orders": {
			post: {
				operationId: "create_order",
				summary: "Create an order.",
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									productId: { type: "string" },
									quantity: { type: "integer" },
								},
								required: ["productId", "quantity"],
							},
						},
					},
				},
			},
		},
	},
} as const;
```

Adapted (not in the official docs): the official `path.startsWith("/")` check still allows a protocol-relative path such as `//attacker.example/x`, which `new URL()` resolves to another host and would receive the bearer token; the origin is now verified after resolution. See Notes.

```ts
import {
	OpenApiConnector,
	type ConnectorTool,
	type OpenApiRequestOptions,
} from "@cloudflare/codemode";
import { ordersOpenApiSpec } from "./orders-openapi";

const API_ORIGIN = "https://api.example.com";

export class OrdersConnector extends OpenApiConnector<Env> {
	override name() {
		return "orders";
	}

	protected override instructions() {
		return "Use for reading and creating orders.";
	}

	protected override spec() {
		return ordersOpenApiSpec;
	}

	protected override async request(options: OpenApiRequestOptions) {
		if (!options.path.startsWith("/")) {
			throw new Error("Orders API path must start with a slash");
		}

		const url = new URL(options.path, API_ORIGIN);
		// Reject protocol-relative paths ("//host/...") that would leave API_ORIGIN.
		if (url.origin !== API_ORIGIN) {
			throw new Error("Orders API path must stay on the API origin");
		}
		for (const [key, value] of Object.entries(options.params ?? {})) {
			if (value !== undefined) {
				url.searchParams.set(key, String(value));
			}
		}

		const response = await fetch(url, {
			method: options.method ?? "GET",
			headers: {
				...(options.body !== undefined
					? { "Content-Type": "application/json" }
					: {}),
				...options.headers,
				Authorization: `Bearer ${this.env.ORDERS_API_TOKEN}`,
			},
			body:
				options.body === undefined
					? undefined
					: JSON.stringify(options.body),
		});

		if (!response.ok) {
			throw new Error(`Orders API request failed: ${response.status}`);
		}
		if (response.status === 204) return null;
		return response.json();
	}

	protected override tool(name: string, tool: ConnectorTool): ConnectorTool {
		if (name === "create_order") {
			return { ...tool, requiresApproval: true };
		}
		return tool;
	}
}
```

Add the connector to the runtime and let the model call it:

```ts
import { AIChatAgent } from "@cloudflare/ai-chat";
import {
	createCodemodeRuntime,
	DynamicWorkerExecutor,
} from "@cloudflare/codemode";
import { OrdersConnector } from "./orders-connector";

export class Chat extends AIChatAgent<Env> {
	#runtime() {
		return createCodemodeRuntime({
			ctx: this.ctx,
			executor: new DynamicWorkerExecutor({ loader: this.env.LOADER }),
			connectors: [new OrdersConnector(this.ctx, this.env)],
		});
	}

	async onChatMessage() {
		const tools = { codemode: this.#runtime().tool() };
		// Pass tools to your model call.
	}
}
```

```js
async () => {
	const matches = await codemode.search("get an order by ID");
	const docs = await codemode.describe(matches.results[0].path);

	const order = await orders.get_order({ orderId: "order-123" });
	return { docs, order };
};
```

Low-level escape hatch exposed on every OpenAPI connector:

```js
const result = await orders.request({
	path: "/orders",
	method: "GET",
	params: { status: "processing" },
});
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `spec()` | method | — | Returns the OpenAPI document. |
| `request(options)` | method | — | Makes the authenticated host-side request; receives `{ path, method, params, body, headers }`. |
| `exposeSpec()` | method | `false` | Return `true` only when model code needs the raw document (large documents bloat results and the durable log). |
| `tool(name, tool)` | method | — | Decorate derived operations (approval, replay, revert). |

## Notes

- Adapted from the official docs: the origin check after URL resolution is added (see the Adapted marker). Without it a model-supplied `//host/path` could send `ORDERS_API_TOKEN` to an arbitrary host (SSRF / credential leak). The other lines are verbatim.
- Credentials (`ORDERS_API_TOKEN`) stay in the host Worker as a secret; model code receives only methods and results. `options.headers` is model-influenced; the connector sets `Authorization` last so the model cannot override it.
- Human-in-the-loop: `create_order` is marked `requiresApproval: true`, so the run pauses before the side effect. Do the same for every mutating operation.
- Method names are the sanitized `operationId` (else derived from HTTP method and path; duplicates and names reserved for `request` / `spec` are skipped). Parameters are top-level fields, JSON body under `body`, required OpenAPI parameters are required fields, local `$ref` resolved. Response types are not derived: methods return `unknown`.
- Publishing an OpenAPI service to external MCP clients via `search` / `execute`: build-codemode-mcp-server.md (https://developers.cloudflare.com/agents/model-context-protocol/guides/build-codemode-mcp-server/)

## Related

- [Durable runtime](./codemode-durable-runtime.md)
- [Code Mode with MCP](./codemode-mcp.md)
- [API reference](./codemode-api-reference.md)
