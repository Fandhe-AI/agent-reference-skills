---
source: https://developers.cloudflare.com/agents/getting-started/quick-start/, https://developers.cloudflare.com/agents/getting-started/testing-your-agent/, https://developers.cloudflare.com/agents/examples/chat-agent/, https://developers.cloudflare.com/agents/harnesses/think/getting-started/
---

# Dev and Test

Commands for generating types, running an Agent locally, sending test requests, and running Vitest tests.

## Signature / Usage

### Generate Env types

```sh
npx wrangler types
```

Run this after exporting a Durable Object class or changing bindings to update `Env`.

### Start the local development server

```sh
npx wrangler dev
```

The Worker is simulated locally with Miniflare. In the Quick start setup the `AI` binding always runs remotely, so Wrangler asks you to log in the first time.

Template-generated projects also use:

```sh
npm run dev
```

The Vite-based Think harness setup uses:

```sh
npx vite dev
```

### Send a prompt over HTTP

```sh
curl -X POST http://localhost:8787/agents/assistant/demo \
  -d "What is 47 times 19? Reply with the number only."
```

Requests are routed to `/agents/<agent>/<name>` when `routeAgentRequest()` is used.

### Connect over WebSocket

```sh
npx wscat -c ws://localhost:8787/agents/assistant/demo
```

This works only if the Agent has the `WebSockets` capability installed.

### Set up Vitest

```sh
npm install vitest@^4.1.0 @cloudflare/vitest-plugin --save-dev
```

New Workers projects already include `vitest` and `@cloudflare/vitest-plugin`. `vitest.config.js` needs the `cloudflareTest` plugin configured.

### Run tests

```sh
npm run test
# or run vitest directly
npx vitest
```

## Notes

- `wrangler dev` runs locally in Miniflare/workerd, which is not a hardened sandbox for untrusted code. The local URLs above are unauthenticated unless you add `onBeforeConnect` / `onBeforeRequest` checks; do not expose the dev server publicly.

## Related

- For `wrangler dev` flag details, see the cloudflare-wrangler skill.
- [mcp.md](./mcp.md) — testing an MCP server locally
