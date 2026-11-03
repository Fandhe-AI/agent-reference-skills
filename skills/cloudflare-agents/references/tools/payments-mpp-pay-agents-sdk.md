---
source: https://developers.cloudflare.com/agents/tools/payments/mpp/pay-from-agents-sdk/
---

# Pay MPP services from the Agents SDK

Configure a Cloudflare Agent so `mppx` pays HTTP services and MCP tools, retrying with MPP Credentials. Restrict automatic payments to trusted origins.

## Signature / Usage

Install `npm i agents mppx viem` and store the key as a secret (`npx wrangler secret put MPP_PRIVATE_KEY`). Create the payment method once:

```ts
import { tempo } from "mppx/client";
import { privateKeyToAccount } from "viem/accounts";

export function createPaymentMethods(privateKey: string) {
  const account = privateKeyToAccount(privateKey as `0x${string}`);

  return [tempo.charge({ account })] as const;
}
```

Pay an HTTP service (only from allowed origins):

```ts
import { Agent } from "agents";
import { Mppx } from "mppx/client";
import { createPaymentMethods } from "./payments";

type PaymentEnv = Env & { MPP_PRIVATE_KEY: string };

export class BuyerAgent extends Agent<PaymentEnv> {
	methods!: ReturnType<typeof createPaymentMethods>;
	payments!: ReturnType<typeof Mppx.create>;

	async onStart() {
		this.methods = createPaymentMethods(this.env.MPP_PRIVATE_KEY);
		this.payments = Mppx.create({
			acceptPaymentPolicy: { origins: ["https://api.example.com"] },
			methods: this.methods,
			polyfill: false,
		});
	}

	async buyReport() {
		const response = await this.payments.fetch(
			"https://api.example.com/reports/latest",
		);

		if (!response.ok) throw new Error(`Request failed: ${response.status}`);
		return response.json();
	}
}
```

Pay an MCP tool:

```ts
import { Agent } from "agents";
import { McpClient } from "mppx/mcp/client";
import { createPaymentMethods } from "./payments";

type PaymentEnv = Env & { MPP_PRIVATE_KEY: string };

export class BuyerAgent extends Agent<PaymentEnv> {
	methods!: ReturnType<typeof createPaymentMethods>;

	async onStart() {
		this.methods = createPaymentMethods(this.env.MPP_PRIVATE_KEY);
	}

	async paidSearch() {
		const connection = await this.addMcpServer(
			"premium-search",
			"https://mcp.example.com/mcp",
		);
		if (connection.state === "authenticating") {
			return { authUrl: connection.authUrl };
		}

		await this.mcp.waitForConnections();

		const server = this.getMcpServers().servers[connection.id];
		const mcpConnection = this.mcp.mcpConnections[connection.id];
		if (server?.state !== "ready" || !mcpConnection) {
			throw new Error("MCP server is not ready.");
		}

		const client = McpClient.wrap(mcpConnection.client, {
			methods: this.methods,
		});
		const result = await client.callTool({
			name: "premium_search",
			arguments: { query: "Cloudflare Agents" },
		});

		return { content: result.content, receipt: result.receipt };
	}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `acceptPaymentPolicy.origins` | string[] | — | Origins the HTTP client may pay automatically. |
| `methods` | array | — | Payment methods, for example `tempo.charge({ account })`. |
| `polyfill` | boolean | — | `false` in the example (does not patch global fetch). |
| `onChallenge` | callback | — | HTTP: invoked when a payment needs approval. |
| `onPaymentRequired` | callback | — | MCP: invoked when a payment needs approval. |
| `McpClient.wrap(client, { methods })` | function | — | Wraps an MCP client to retry paid tool calls with a Credential; the result includes `result.receipt`. |

## Notes

- Human-in-the-loop: by default both clients pay compatible Challenges automatically. Use `onChallenge` (HTTP) or `onPaymentRequired` (MCP) when a payment needs approval. Challenge amounts are integer base units, not decimal display values.
- For production Agents use a scoped access key with spending limits and recipient restrictions (https://mpp.dev/guides/managing-agent-spend). Keep `MPP_PRIVATE_KEY` a Workers secret, never in tool arguments or logs; fund the account only for the payment method the service accepts.
- If `paidSearch()` returns an `authUrl`, send the user there and retry after authorization. Free endpoints pass through; paid ones return a `Payment-Receipt` header.
- The `mppx` HTTP client also recognizes x402 Challenges; configure an x402-compatible EVM method (https://mpp.dev/guides/use-mpp-with-x402). MCP connection options: [client-api.md](../mcp/client-api.md)

## Related

- [MPP](./payments-mpp.md)
- [Accept payments with MPP](./payments-mpp-accept.md)
- [MCP client tools](./mcp-client-tools.md)
