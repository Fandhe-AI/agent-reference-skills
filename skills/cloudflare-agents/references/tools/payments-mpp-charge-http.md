---
source: https://developers.cloudflare.com/agents/tools/payments/mpp-charge-for-http-content/
---

# MPP: charge for HTTP content

The mpp-proxy template is a Worker in front of any HTTP backend that returns an MPP `402` challenge for protected routes, verifies payment, forwards to your origin, and issues a 1-hour session cookie.

## Signature / Usage

Protected routes in `wrangler.jsonc`:

```jsonc
{
	"vars": {
		"PAY_TO": "0xYourWalletAddress",
		"TEMPO_TESTNET": false,
		"PAYMENT_CURRENCY": "0x20c000000000000000000000b9537d11c60e8b50",
		"PROTECTED_PATTERNS": [
			{
				"pattern": "/premium/*",
				"amount": "0.01",
				"description": "Access to premium content for 1 hour"
			}
		]
	}
}
```

Selective gating with Bot Management:

```jsonc
{
	"pattern": "/content/*",
	"amount": "0.25",
	"description": "Content access for 1 hour",
	"bot_score_threshold": 30,
	"except_detection_ids": [120623194, 117479730]
}
```

Deploy (secrets are set interactively, not on the command line):

```sh
git clone https://github.com/cloudflare/mpp-proxy
cd mpp-proxy
npm install
npx wrangler secret put JWT_SECRET
npx wrangler secret put MPP_SECRET_KEY
npx wrangler deploy
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `PAY_TO` | string | — | Wallet address that receives payments. |
| `TEMPO_TESTNET` | boolean | — | `true` for testnet development. |
| `PAYMENT_CURRENCY` | string | — | Currency token address; use `0x20c0000000000000000000000000000000000000` for testnet. |
| `PROTECTED_PATTERNS[].pattern` | string | — | Route glob to protect. |
| `PROTECTED_PATTERNS[].amount` | string | — | Price amount, for example `"0.01"`. |
| `PROTECTED_PATTERNS[].description` | string | — | Description. |
| `bot_score_threshold` | number | — | Requests at or below this bot score go to the paywall. |
| `except_detection_ids` | number[] | — | Allowlist crawlers by detection ID. |
| `JWT_SECRET`, `MPP_SECRET_KEY` | secrets | — | Set with `wrangler secret put`. |

## Notes

- Set `TEMPO_TESTNET` to `true` and `PAYMENT_CURRENCY` to the testnet address for development. Prerequisites: Cloudflare account, an HTTP backend, a wallet address.
- Keep `JWT_SECRET` and `MPP_SECRET_KEY` as Workers secrets only. For Worker-level middleware instead of the proxy see [Accept payments with MPP](./payments-mpp-accept.md).
- Full options and proxy modes: https://github.com/cloudflare/mpp-proxy ; Bot Management: https://developers.cloudflare.com/bots/

## Related

- [Accept payments with MPP](./payments-mpp-accept.md)
- [x402: charge for HTTP content](./payments-x402-charge-http.md)
