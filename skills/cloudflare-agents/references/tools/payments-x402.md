---
source: https://developers.cloudflare.com/agents/tools/payments/x402/
---

# x402

x402 is a payment standard built on HTTP 402: services return payment instructions, and clients pay programmatically with a crypto wallet, with no accounts, sessions, or API keys.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/agents/tools/payments/x402/charge-for-http-content/

```ts
import { Hono } from "hono";
import { paymentMiddleware } from "x402-hono";

const app = new Hono<{ Bindings: Env }>();

app.use(
	paymentMiddleware(
		"0xYourWalletAddress" as `0x${string}`,
		{
			"/premium": {
				price: "$0.10",
				network: "base-sepolia",
				config: { description: "Premium content" },
			},
		},
		{ url: "https://x402.org/facilitator" },
	),
);

app.get("/premium", (c) => c.json({ message: "Thanks for paying!" }));

export default app;
```

Flow: `GET /resource` returns `402` with a Base64 `PAYMENT-REQUIRED` header (price, token, network, merchant address); the client retries with a signed `PAYMENT-SIGNATURE`; the server verifies (directly or via a facilitator), settles on-chain, and returns the resource with `PAYMENT-RESPONSE`.

## Options / Props

Schemes:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `exact` | scheme | — | Transfers a fixed token amount (typically ERC-20 USDC on EVM). Networks: EVM, Solana, Aptos, Stellar, Hedera, Sui, Algorand. |
| `upto` | scheme | — | Authorizes a maximum amount; the actual charge is set at settlement from resource consumption. EVM. |

SDK packages:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `x402-hono` | npm | — | Hono middleware for Worker servers. |
| `@x402/fetch` | npm | — | Fetch wrapper with automatic payment handling. |
| `@x402/evm` | npm | — | EVM payment scheme support. |
| `@x402/avm` | npm | — | Algorand payment scheme support. |
| `agents/x402` | in `agents` | — | MCP client with x402 payment support. |

Facilitator operations: `POST /verify` (confirm payload validity) and `POST /settle` (submit the pre-signed transaction).

## Notes

- The facilitator is optional but recommended; it does not hold funds. `https://x402.org/facilitator` is the public Coinbase-operated one used in all Cloudflare examples; others exist (https://docs.x402.org/dev-tools/facilitators).
- Supported networks include Base, Ethereum, Polygon, Optimism, Arbitrum, Avalanche, Solana, Aptos, Stellar, Sui, Algorand. Use `base-sepolia` for testing with test USDC from https://faucet.circle.com/ ; switch to `base` only for production.
- Protocol spec: https://x402.org ; SDK: https://github.com/x402-foundation/x402

## Related

- [Charge for HTTP content](./payments-x402-charge-http.md)
- [Charge for MCP tools](./payments-x402-charge-mcp.md)
- [Pay from the Agents SDK](./payments-x402-pay-agents-sdk.md)
- [Pay from coding tools](./payments-x402-coding-tools.md)
