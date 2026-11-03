---
source: https://developers.cloudflare.com/agents/tools/payments/x402/charge-for-mcp-tools/
---

# x402: charge for MCP tools

`paidTool` registers an MCP tool with x402 payment requirements so clients pay per call; free and paid tools can be mixed on one server.

## Signature / Usage

```ts
import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";
import { withX402, type X402Config } from "agents/x402";
import { z } from "zod";

const X402_CONFIG: X402Config = {
	network: "base",
	recipient: "0xYourWalletAddress",
	facilitator: { url: "https://x402.org/facilitator" }, // Payment facilitator URL
	// To learn more about facilitators: https://docs.x402.org/core-concepts/facilitator
};

function createServer() {
	const server = withX402(
		new McpServer({ name: "PaidMCP", version: "1.0.0" }),
		X402_CONFIG,
	);

	// Paid tool — $0.01 per call
	server.paidTool(
		"square",
		"Squares a number",
		0.01, // USD
		{ number: z.number() },
		{},
		async ({ number }) => {
			return { content: [{ type: "text", text: String(number ** 2) }] };
		},
	);

	// Free tool
	server.registerTool(
		"echo",
		{ description: "Echo a message", inputSchema: { message: z.string() } },
		async ({ message }) => {
			return { content: [{ type: "text", text: message }] };
		},
	);

	return server;
}

const handler = createMcpHandler(createServer);

export default {
	fetch(request, env, ctx) {
		return handler(request, env, ctx);
	},
} satisfies ExportedHandler;
```

## Options / Props

`X402Config`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `network` | string | — | `base` for production, `base-sepolia` for testing. |
| `recipient` | string | — | Wallet address to receive payments. |
| `facilitator` | `{ url }` | — | Payment facilitator URL (use `https://x402.org/facilitator`). |

`paidTool(name, description, price, inputSchema, annotations, handler)`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | — | Tool name. |
| `description` | string | — | Tool description. |
| `price` | number | — | Price per call in USD, for example `0.01`. |
| `inputSchema` | Zod shape | — | Input shape. |
| `annotations` | object | — | MCP tool annotations. |
| `handler` | async function | — | Runs after payment succeeds. |

## Notes

- A call without payment returns `402` with payment requirements; the client pays via x402, retries with proof, and gets the result.
- `agents/x402` needs `@modelcontextprotocol/sdk`, an optional peer dependency of `agents`; it is not loaded at runtime but its types refer to MCP SDK v1. Pin the exact version your Agents release expects (for example `@modelcontextprotocol/sdk@1.32.1`).
- Test with `base-sepolia` and Circle faucet USDC (https://faucet.circle.com/). `0xYourWalletAddress` is a placeholder for your public receiving address.
- Server-side MCP publishing guide: remote-mcp-server.md (https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/) . The MCP protocol itself: mcp-spec skill.

## Related

- [Pay from the Agents SDK](./payments-x402-pay-agents-sdk.md)
- [Charge for HTTP content](./payments-x402-charge-http.md)
