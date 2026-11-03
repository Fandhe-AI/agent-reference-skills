---
source: https://developers.cloudflare.com/agents/tools/payments/x402/pay-with-tool-plugins/
---

# x402: pay from coding tools (OpenCode, Claude Code)

Add x402 payment handling to local coding tools: an OpenCode plugin tool `x402-fetch`, or a Claude Code `PostToolUse` hook that retries a `WebFetch` that hit a `402`. Requires `@x402/fetch`, `@x402/evm`, `viem`, and a wallet private key in `X402_PRIVATE_KEY`.

## Signature / Usage

Adapted (not in the official docs): both scripts spent funds automatically with the approval step commented out; they now refuse to pay unless `X402_AUTO_PAY=1` is set explicitly (fail-closed). See Notes.

OpenCode plugin (`.opencode/plugins/x402-payment.ts`):

```ts
// Use base-sepolia for testing. Get test USDC from https://faucet.circle.com/
import type { Plugin } from "@opencode-ai/plugin";
import { tool } from "@opencode-ai/plugin";
import { x402Client, wrapFetchWithPayment } from "@x402/fetch";
import { registerExactEvmScheme } from "@x402/evm/exact/client";
import { privateKeyToAccount } from "viem/accounts";

export const X402PaymentPlugin: Plugin = async () => ({
	tool: {
		"x402-fetch": tool({
			description:
				"Fetch a URL with x402 payment. Use when webfetch returns 402.",
			args: {
				url: tool.schema.string().describe("The URL to fetch"),
				timeout: tool.schema.number().optional().describe("Timeout in seconds"),
			},
			async execute(args) {
				const privateKey = process.env.X402_PRIVATE_KEY;
				if (!privateKey) {
					throw new Error("X402_PRIVATE_KEY environment variable is not set.");
				}

				// Fail closed: only pay when the user has explicitly opted in.
				// Replace with your human-in-the-loop confirmation flow:
				// const approved = await confirmPayment(args.url, estimatedCost);
				// if (!approved) throw new Error("Payment declined by user");
				if (process.env.X402_AUTO_PAY !== "1") {
					throw new Error("Automatic x402 payment is disabled (set X402_AUTO_PAY=1 to enable).");
				}

				const account = privateKeyToAccount(privateKey as `0x${string}`);
				const client = new x402Client();
				registerExactEvmScheme(client, { signer: account });
				const paidFetch = wrapFetchWithPayment(fetch, client);

				const response = await paidFetch(args.url, {
					method: "GET",
					signal: args.timeout
						? AbortSignal.timeout(args.timeout * 1000)
						: undefined,
				});

				if (!response.ok) {
					throw new Error(`${response.status} ${response.statusText}`);
				}

				return await response.text();
			},
		}),
	},
});
```

Claude Code hook script (`.claude/scripts/handle-x402.mjs`):

```js
// Use base-sepolia for testing. Get test USDC from https://faucet.circle.com/
import { x402Client, wrapFetchWithPayment } from "@x402/fetch";
import { registerExactEvmScheme } from "@x402/evm/exact/client";
import { privateKeyToAccount } from "viem/accounts";

const input = JSON.parse(await readStdin());

const haystack = JSON.stringify(input.tool_response ?? input.error ?? "");
if (!haystack.includes("402")) process.exit(0);

const url = input.tool_input?.url;
if (!url) process.exit(0);

// Fail closed: only pay when the user has explicitly opted in.
if (process.env.X402_AUTO_PAY !== "1") process.exit(0);

const privateKey = process.env.X402_PRIVATE_KEY;
if (!privateKey) {
	console.error("X402_PRIVATE_KEY not set.");
	process.exit(2);
}

try {
	// Your human-in-the-loop confirmation flow...
	// const approved = await confirmPayment(url);
	// if (!approved) process.exit(0);

	const account = privateKeyToAccount(privateKey);
	const client = new x402Client();
	registerExactEvmScheme(client, { signer: account });
	const paidFetch = wrapFetchWithPayment(fetch, client);

	const res = await paidFetch(url, { method: "GET" });
	const text = await res.text();

	if (!res.ok) {
		console.error(`Paid fetch failed: ${res.status}`);
		process.exit(2);
	}

	console.log(
		JSON.stringify({
			hookSpecificOutput: {
				hookEventName: "PostToolUse",
				additionalContext: `Paid for "${url}" via x402:\n${text}`,
			},
		}),
	);
} catch (err) {
	console.error(`x402 payment failed: ${err.message}`);
	process.exit(2);
}

function readStdin() {
	return new Promise((resolve) => {
		let data = "";
		process.stdin.on("data", (chunk) => (data += chunk));
		process.stdin.on("end", () => resolve(data));
	});
}
```

Register the hook in `.claude/settings.json`:

```json
{
	"hooks": {
		"PostToolUse": [
			{
				"matcher": "WebFetch",
				"hooks": [
					{
						"type": "command",
						"command": "node .claude/scripts/handle-x402.mjs",
						"timeout": 30
					}
				]
			}
		]
	}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `X402_PRIVATE_KEY` | env var | — | Wallet private key used to sign payments. |
| `X402_AUTO_PAY` | env var | unset (added by this skill) | Must be `1` for the adapted scripts to pay automatically; not part of the official docs. |
| `x402Client` / `wrapFetchWithPayment(fetch, client)` | `@x402/fetch` | — | Fetch wrapper that pays on `402`. |
| `registerExactEvmScheme(client, { signer })` | `@x402/evm/exact/client` | — | Registers the `exact` EVM scheme. |

## Notes

- Adapted from the official docs: the `X402_AUTO_PAY` opt-in guard was added to both scripts. The official examples pay immediately whenever a `402` appears and leave the confirmation flow as a comment, which means a model-chosen URL could drain the wallet.
- The hook pays for a URL taken from the tool input (model-influenced). Use a dedicated low-balance wallet on `base-sepolia` while testing, keep the private key in a secret manager or local environment (never commit it; do not put it in `settings.json`), and implement real confirmation before enabling auto-pay. Hooks run on the host machine, so treat this as local developer tooling, not agent infrastructure.
- Claude Code hook mechanics belong to the anthropic-claude-code-extend skill; OpenCode plugin API is OpenCode's. When the built-in `webfetch` returns a 402 the agent calls `x402-fetch`.
- Human-in-the-loop guide: [human-in-the-loop.md](../concepts/human-in-the-loop.md)

## Related

- [Pay from the Agents SDK](./payments-x402-pay-agents-sdk.md)
- [Charge for HTTP content](./payments-x402-charge-http.md)
