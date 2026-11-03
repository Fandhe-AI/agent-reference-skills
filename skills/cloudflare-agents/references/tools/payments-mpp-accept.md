---
source: https://developers.cloudflare.com/agents/tools/payments/mpp/accept-payments/
---

# Accept payments with MPP

Charge for a Worker route with `mppx` Hono middleware, or require payment before an MCP tool returns its result. For HTTP content without changing the origin, use mpp-proxy instead.

## Signature / Usage

Install and store the signing key as a secret:

```sh
npm i hono mppx
npx wrangler secret put MPP_SECRET_KEY
```

Paid Worker route:

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

Unpaid request (returns `402` with `WWW-Authenticate: Payment`; a paid retry returns a `Payment-Receipt` header):

```sh
curl -i https://<YOUR_WORKER>.workers.dev/premium
```

Paid MCP tool (install `npm i agents mppx @modelcontextprotocol/sdk zod`; `compatibility_flags: ["nodejs_compat"]`):

```ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createLegacyMcpHandler } from "agents/mcp";
import { Mppx, tempo, Transport } from "mppx/server";
import { z } from "zod";

type PaymentEnv = Env & { MPP_SECRET_KEY: string };

function createServer(env: PaymentEnv) {
  const server = new McpServer({ name: "paid-search", version: "1.0.0" });
  const mppx = Mppx.create({
    methods: [tempo.charge({ testnet: true })],
    secretKey: env.MPP_SECRET_KEY,
    transport: Transport.mcpSdk(),
  });

  server.registerTool(
    "premium_search",
    {
      description: "Search premium content",
      inputSchema: { query: z.string() },
    },
    async ({ query }, extra) => {
      const payment = await mppx.charge({
        amount: "0.01",
        currency: "0x20c0000000000000000000000000000000000000",
        description: "Premium search",
        recipient: "<YOUR_WALLET_ADDRESS>",
      })(extra);

      if (payment.status === 402) throw payment.challenge;

      return payment.withReceipt({
        content: [{ type: "text", text: `Results for: ${query}` }],
      });
    },
  );

  return server;
}

export default {
  fetch(request, env, ctx) {
    return createLegacyMcpHandler(createServer(env))(request, env, ctx);
  },
} satisfies ExportedHandler<PaymentEnv>;
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Mppx.create({ methods, secretKey, transport? })` | function | — | Creates the payment handler; `transport: Transport.mcpSdk()` for MCP tools. |
| `tempo.charge({ testnet })` | method | — | Stablecoin charge method; `testnet: true` in the examples. |
| `mppx.charge({ amount, currency, description, recipient })` | middleware / function | — | Requires payment. In MCP, call the result with the request `extra`. |
| `payment.status` / `payment.challenge` / `payment.withReceipt(result)` | result | — | `402` status means throw the challenge; otherwise return the result with the Receipt (in `_meta` for MCP). |

## Notes

- Examples use a stablecoin testnet method; other methods: https://mpp.dev/payment-methods/ . Production billing patterns: https://mpp.dev/intents/
- `mppx` reads MCP payment credentials through the MCP SDK v1 request context, so the MCP server uses an SDK v1 `McpServer` with `createLegacyMcpHandler`; it is stateless (a new server per request, no Durable Object).
- Keep `MPP_SECRET_KEY` a Workers secret. `<YOUR_WALLET_ADDRESS>` is a placeholder for your public receiving address. Use the testnet currency until you intentionally switch to production.
- Verify the secret is set at deploy time: the official code does not guard against an undefined `MPP_SECRET_KEY`.
- MCP protocol itself: mcp-spec skill.

## Related

- [MPP](./payments-mpp.md)
- [MPP: charge for HTTP content](./payments-mpp-charge-http.md)
- [Pay from the Agents SDK (MPP)](./payments-mpp-pay-agents-sdk.md)
