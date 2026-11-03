---
source: https://developers.cloudflare.com/agents/model-context-protocol/guides/migrate-to-mcp-sdk-v2/
---

# Migrate to MCP SDK v2

Move Agents SDK MCP servers to the split MCP TypeScript SDK v2 packages, keep a temporary legacy lane only when sessionful features require it, and update MCP clients.

## Signature / Usage

Install only the generations you import (keep the v2 version exact):

```sh
npm i agents @modelcontextprotocol/server@2.3.1 zod
npm i agents @modelcontextprotocol/sdk@1.32.1 zod
npm i agents @modelcontextprotocol/client@2.3.1
```

(first: stateless server; second: temporary legacy lane; third: an Agent that connects to MCP servers.)

SDK v1 passed a constructed server; SDK v2 passes the factory:

```ts
// SDK v1: pass a fresh constructed server.
return createMcpHandler(createServer())(request, env, ctx);

// SDK v2: pass the factory itself.
return createMcpHandler(createServer)(request, env, ctx);
```

Stateless and legacy lanes on one URL:

```ts
import { isLegacyRequest } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";

const stateless = createMcpHandler(createStatelessServer, {
	route: "/mcp",
	legacy: "reject",
});

const legacy = MyMcpAgent.serve("/mcp");

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		if (await isLegacyRequest(request)) {
			return legacy.fetch(request, env, ctx);
		}
		return stateless(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
```

### Choose a server path

| Current server | Migration path |
|----------------|----------------|
| SDK v1 server without sessionful dependencies | Move to an SDK v2 factory and `createMcpHandler` |
| SDK v1 server with sessionful dependencies | Add an SDK v2 route; keep `createLegacyMcpHandler` only temporarily |
| `McpAgent` without legacy stateful features | Migrate directly to a factory and `createMcpHandler` |
| `McpAgent` with legacy stateful features | Design stateless equivalents, serve both lanes, drain the legacy lane |

Sessionful features that need a legacy lane: protocol sessions or a supplied `WorkerTransport`, transport storage or event replay, standalone GET streams, pushed elicitation/sampling/roots, session deletion with HTTP `DELETE`.

### Stateful feature to stateless design

| Legacy feature | Stateless design |
|----------------|------------------|
| Data keyed by MCP session | Store in a Durable Object, D1, KV, or R2 behind an authenticated, server-issued handle |
| Multi-step interaction state | Return integrity-protected `requestState` with `input_required`, bound to user, original method and parameters, and an expiry |
| Pushed elicitation, sampling, roots | Return `inputRequired(...)`; client retries the original operation |
| Standalone list-change stream | Publish via `subscriptions/listen`; clients reopen on end |
| Session replay or recovery | Make each request independently recoverable; persist progress in app storage |
| Agent-to-`McpAgent` RPC | Connect with a URL over Streamable HTTP (no RPC for stateless servers) |

### Protocol differences

| Area | Previous | New |
|------|----------|-----|
| Startup | `initialize` handshake | No handshake; `server/discover` optional |
| Request metadata | Connection-scoped negotiation | Version, capabilities, identity on each request |
| Sessions | Optional `Mcp-Session-Id` | No protocol session |
| Server input requests | Server sends JSON-RPC requests | Server returns `input_required`; client retries |
| Change notifications | Standalone GET stream | `subscriptions/listen` POST with SSE response |
| Stream recovery | `Last-Event-ID` resume | Listen streams reopen; no replay |

## Notes

- Deprecated in this release line: passing an SDK v1 server to `createMcpHandler` (scheduled for removal in the next major; use `createLegacyMcpHandler` only as a temporary bridge); `McpAgent` (feature-frozen, no removal version announced); `MCPClientManager.callTool(params, resultSchema, options)` and `withX402Client(...).callTool(confirm, params, resultSchema, options)` (use the forms without `resultSchema`); `experimental_createMcpHandler` (already deprecated).
- `@modelcontextprotocol/server` and `@modelcontextprotocol/sdk` are optional peers of `agents`; add them to your own `package.json`. `@modelcontextprotocol/client` is a required peer. An existing legacy server that imports the SDK without listing it worked only because `agents` installed it.
- `agents/mcp` loads `@modelcontextprotocol/sdk` even for client helpers; import `RPCClientTransport`, `RPC_DO_PREFIX`, and `McpClientOptions` from `agents/mcp/client`.
- Keep `legacy: "reject"` on the stateless handler when pairing with a legacy route, otherwise its compatibility lane consumes requests first. Inside the legacy `McpAgent` route keep the SDK v1 `McpServer` import.
- Do not `export default createMcpHandler(...)`: Wrangler treats function default exports as `WorkerEntrypoint` classes. Remove SDK v1 options (`transport`, `storage`, `sessionIdGenerator`, `onsessioninitialized`, `onsessionclosed`, `enableJsonResponse`, `eventStore`, `allowedHosts`, `allowedOrigins`, `enableDnsRebindingProtection`, `retryInterval`).
- For custom domains with wildcard CORS set `allowedHostnames` and `allowedOriginHostnames`; `"*"` disables the Origin check and is acceptable only behind trusted validating middleware. CORS is not authentication.
- Clients: `addMcpServer` negotiates the era automatically (`server/discover`, falling back to `initialize`). Handlers and in-flight interactive calls stay in memory; hibernation or reconnect rejects an active call, so retry. Treat `requestState` as untrusted: bind to user and operation, protect integrity, short expiry.
- Custom `AgentMcpOAuthProvider` must implement the v2 `OAuthClientProvider` contract (types from `@modelcontextprotocol/client`, issuer stamp preserved, `OAuthDiscoveryState` persisted, `"discovery"` accepted by `invalidateCredentials`). `skipIssuerMetadataValidation: true` weakens OAuth mix-up protection; do not use it as a general fallback.
- Proxies and gateways must preserve `MCP-Protocol-Version`, `Mcp-Method`, `Mcp-Name`, and declared `Mcp-Param-*` headers. Stored session IDs from earlier releases are discarded and the client reconnects.
- Still SDK v1: Code Mode `codeMcpServer` / `openApiMcpServer` and the `mppx` `Transport.mcpSdk()` payment transport; serve with `createLegacyMcpHandler`. SDK v2 servers work with `withX402` and with OpenAI Apps SDK servers (those are covered by the openai-apps-sdk skill).
- Rollout: classify endpoints, pin versions, factor stateless servers, add handlers beside legacy ones, route with `isLegacyRequest()`, test both clients and headers through proxies, test OAuth after hibernation, verify invalid Origins get `403`, remove legacy routes after sessions drain.
- Distance lines: the protocol spec revisions are mcp-spec; Claude Code MCP is anthropic-claude-code-extend; Claude API MCP connector is anthropic-api-tools-mcp; OpenAI Agents SDK MCP is openai-agents; ChatGPT MCP apps are openai-apps-sdk.

## Related

- [createMcpHandler API](./handler-api.md)
- [MCP Client API](./client-api.md)
- [McpAgent (deprecated)](./agent-api.md)
- [Build a Code Mode MCP server](./build-codemode-mcp-server.md)
