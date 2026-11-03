---
source: https://developers.cloudflare.com/agents/tools/payments/
---

# Agentic Payments overview

The Agents SDK supports agent-initiated payments over HTTP `402 Payment Required` through two protocols: x402 (Coinbase-created, on-chain stablecoin) and Machine Payments Protocol (MPP, payment-method agnostic, backwards-compatible with x402).

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

## Options / Props

Common flow for both protocols:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Request | step 1 | — | Client requests a resource or calls a tool. |
| Challenge | step 2 | — | Server returns `402` describing what to pay, how much, and where. |
| Credential | step 3 | — | Client pays and retries with a payment credential. |
| Receipt | step 4 | — | Server verifies (optionally via a facilitator) and returns the resource plus a receipt. |

| Name | Type | Default | Description |
|------|------|---------|-------------|
| x402 headers | headers | — | `PAYMENT-REQUIRED`, `PAYMENT-SIGNATURE`, `PAYMENT-RESPONSE`. |
| MPP headers | headers | — | `WWW-Authenticate: Payment` and `Authorization: Payment`. |
| x402 server side | SDK | — | `withX402` and `paidTool` for MCP servers; `x402-hono` middleware for HTTP Workers. |
| x402 client side | SDK | — | `withX402Client` wraps MCP connections with automatic `402` handling and optional human approval. |

## Notes

- Security: payment keys are wallet private keys that can move funds. Keep them in Workers secrets (never in tool arguments, prompts, config, or source), use testnets while developing (`base-sepolia` for x402), apply spending limits and trusted-origin policies, and require human approval before an agent pays (see the pay-side pages).
- Pages: [x402](./payments-x402.md), [x402 charge HTTP](./payments-x402-charge-http.md), [x402 charge MCP](./payments-x402-charge-mcp.md), [x402 pay from Agents SDK](./payments-x402-pay-agents-sdk.md), [x402 coding tools](./payments-x402-coding-tools.md), [MPP](./payments-mpp.md), [MPP charge HTTP](./payments-mpp-charge-http.md), [MPP accept payments](./payments-mpp-accept.md), [MPP pay from Agents SDK](./payments-mpp-pay-agents-sdk.md).
- Cloudflare-native monetization without code: Pay Per Crawl, https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/ . Specs: https://www.x402.org/ and https://mpp.dev . Stripe-based card payments in MPP are separate from the stripe skill's own APIs.

## Related

- [x402](./payments-x402.md)
- [MPP](./payments-mpp.md)
