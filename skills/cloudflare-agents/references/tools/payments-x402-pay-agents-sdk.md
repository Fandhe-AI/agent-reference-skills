---
source: https://developers.cloudflare.com/agents/tools/payments/x402/pay-from-agents-sdk/
---

# x402: pay from the Agents SDK

Use `withX402Client` to wrap an Agent's MCP client so it can pay x402-protected tools, with an optional human-confirmation callback.

## Signature / Usage

Adapted (not in the official docs): the official snippet does not compile (undeclared `x402Client` property, `onPaymentRequired` with no body, untyped `Env` and key) and leaves the confirmation as a comment; this version declares the types and denies payment by default (fail-closed). See Notes.

```ts
import { Agent } from "agents";
import { withX402Client } from "agents/x402";
import { privateKeyToAccount } from "viem/accounts";

export class MyAgent extends Agent<Env> {
	// Your Agent definitions...
	private x402Client!: ReturnType<typeof withX402Client>;

	async onStart() {
		const { id } = await this.mcp.connect(`${this.env.WORKER_URL}/mcp`);
		const account = privateKeyToAccount(this.env.MY_PRIVATE_KEY as `0x${string}`);

		this.x402Client = withX402Client(this.mcp.mcpConnections[id].client, {
			network: "base-sepolia",
			account,
		});
	}

	async onPaymentRequired(paymentRequirements: unknown): Promise<boolean> {
		// Your human-in-the-loop confirmation flow goes here.
		// Deny by default until a user has explicitly approved this payment.
		return false;
	}

	async onToolCall(toolName: string, toolArgs: unknown) {
		// The first parameter is the confirmation callback.
		// Set to `null` for the agent to pay automatically (not recommended).
		return await this.x402Client.callTool(this.onPaymentRequired, {
			name: toolName,
			arguments: toolArgs,
		});
	}
}
```

Store the private key as a secret:

```sh
# Local development (.dev.vars)
MY_PRIVATE_KEY="0x..."

# Production
npx wrangler secret put MY_PRIVATE_KEY
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `withX402Client(client, { network, account })` | function | — | Wraps an MCP client with automatic `402` handling. |
| `network` | string | — | `base-sepolia` for testing. |
| `account` | viem account | — | Signer from `privateKeyToAccount`. |
| `callTool(confirm, { name, arguments })` | method | — | `confirm` is the confirmation callback; `null` pays automatically. |

## Notes

- Adapted from the official docs: typing added and `onPaymentRequired` returns `false` so the agent cannot spend until you implement approval; the official page leaves the confirmation body as a placeholder.
- Human-in-the-loop for payments: pass a confirmation callback (never `null`) in production, and cap spend per tool/day in your own code. Guide: [human-in-the-loop.md](../concepts/human-in-the-loop.md)
- The wallet private key controls funds: keep it in a Workers secret, add `.dev.vars` to `.gitignore`, never place it in tool arguments, prompts, or logs. Use `base-sepolia` and Circle faucet USDC (https://faucet.circle.com/) for testing.
- `agents/x402` needs `@modelcontextprotocol/sdk` (optional peer dependency; types refer to MCP SDK v1). Pin the version your Agents release expects.
- Working example: https://github.com/cloudflare/agents/tree/main/examples/x402-mcp

## Related

- [Charge for MCP tools](./payments-x402-charge-mcp.md)
- [Pay from coding tools](./payments-x402-coding-tools.md)
- [MCP client tools](./mcp-client-tools.md)
