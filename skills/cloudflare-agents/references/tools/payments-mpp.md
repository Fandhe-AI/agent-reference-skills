---
source: https://developers.cloudflare.com/agents/tools/payments/mpp/
---

# MPP (Machine Payments Protocol)

An open protocol standardizing HTTP `402 Payment Required` with a payment authentication scheme (proposed to the IETF). Payment-method agnostic: stablecoins, cards through Stripe, and custom methods; backwards-compatible with x402.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/agents/tools/payments/mpp/accept-payments/

```ts
import { env } from "cloudflare:workers";
import { Hono } from "hono";
import { Mppx, tempo } from "mppx/hono";

const workerEnv = env as Env & { MPP_SECRET_KEY: string };
const app = new Hono();
const mppx = Mppx.create({
  methods: [tempo.charge({ testnet: true })],
  secretKey: workerEnv.MPP_SECRET_KEY,
});

app.get(
  "/premium",
  mppx.charge({
    amount: "0.01",
    currency: "0x20c0000000000000000000000000000000000000",
    description: "Premium API access",
    recipient: "<YOUR_WALLET_ADDRESS>",
  }),
  (c) => c.json({ access: "paid" }),
);

export default app;
```

## Options / Props

Payment intents:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `charge` | intent | — | Collect a one-time payment. |
| `session` | intent | — | Charge for measured usage. |
| `subscription` | intent | — | Sell recurring access. |

Flow: client requests a resource; service returns `402` with a payment Challenge; client fulfills it and retries with a Credential; service returns the resource with a Receipt. HTTP uses authentication headers; MCP tools use the same flow through JSON-RPC.

## Notes

- SDKs exist for TypeScript, Python, Rust, Go, and Ruby; the Cloudflare guides use TypeScript `mppx` (https://mpp.dev/sdk/typescript/). Intents: https://mpp.dev/intents/ ; IETF scheme: https://paymentauth.org
- MPP clients can consume existing x402 services without changes to those services.
- Security: payment keys and `MPP_SECRET_KEY` are secrets (Workers secrets, not config or tool arguments); use testnet while developing and apply spend limits.

## Related

- [Accept payments with MPP](./payments-mpp-accept.md)
- [Pay from the Agents SDK (MPP)](./payments-mpp-pay-agents-sdk.md)
- [x402](./payments-x402.md)
