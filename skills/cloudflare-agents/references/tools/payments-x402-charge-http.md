---
source: https://developers.cloudflare.com/agents/tools/payments/x402/charge-for-http-content/
---

# x402: charge for HTTP content

The x402-proxy template is a Worker in front of any HTTP backend that returns `402` for protected routes, verifies payment, then forwards to your origin. Alternatively add x402 middleware (Hono) directly to your Worker.

## Signature / Usage

Protected routes in `wrangler.jsonc`:

```json
{
	"vars": {
		"PAY_TO": "0xYourWalletAddress",
		"NETWORK": "base-sepolia",
		"PROTECTED_PATTERNS": [
			{
				"pattern": "/api/premium/*",
				"price": "$0.10",
				"description": "Premium API access"
			}
		]
	}
}
```

Selective gating of crawlers with Bot Management:

```json
{
	"pattern": "/content/*",
	"price": "$0.10",
	"description": "Content access",
	"bot_score_threshold": 30,
	"except_detection_ids": [117479730]
}
```

Deploy the template (deploys to your Cloudflare account):

```sh
git clone https://github.com/cloudflare/templates
cd templates/x402-proxy-template
npm install
npx wrangler deploy
```

Custom Worker endpoint:

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

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `PAY_TO` | string | — | Wallet address that receives payments. |
| `NETWORK` | string | — | `base-sepolia` (test) or `base` (production). |
| `PROTECTED_PATTERNS[].pattern` | string | — | Route glob to protect. |
| `PROTECTED_PATTERNS[].price` | string | — | Price, for example `"$0.10"`. |
| `PROTECTED_PATTERNS[].description` | string | — | Human-readable description. |
| `bot_score_threshold` | number | — | Requests with a bot score at or below it are sent to the paywall (requires Bot Management). |
| `except_detection_ids` | number[] | — | Allowlist specific crawlers by detection ID. |

## Notes

- `base-sepolia` is a test network; change to `base` for production. `0xYourWalletAddress` is a placeholder: use your own receiving address (a public address, not a private key).
- Prerequisites: a Cloudflare account, an HTTP backend to gate, and a wallet address. Full options: https://github.com/cloudflare/templates/tree/main/x402-proxy-template ; Bot Management docs: https://developers.cloudflare.com/bots/ ; detection IDs: https://developers.cloudflare.com/ai-crawl-control/reference/bots/
- Complete implementation: https://github.com/cloudflare/agents/tree/main/examples/x402

## Related

- [x402](./payments-x402.md)
- [Charge for MCP tools](./payments-x402-charge-mcp.md)
