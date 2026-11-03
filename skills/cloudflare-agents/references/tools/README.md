# tools

| Name | Description | Path |
| --- | --- | --- |
| AI Search tool | Retrieval over indexed content via an AI Search binding | [ai-search.md](./ai-search.md) |
| MCP client tools | Connect an agent to external MCP servers and pass their tools to model calls | [mcp-client-tools.md](./mcp-client-tools.md) |
| Agent Skills tools | activate_skill / read_skill_resource tools and skill catalogs for harnesses | [skills-tools.md](./skills-tools.md) |
| Web fetch | web_fetch tool with document conversion, windowing, and request policy | [web-fetch.md](./web-fetch.md) |
| Web search | web_search tool backed by the Cloudflare Web Search API | [web-search.md](./web-search.md) |
| Sandbox | Linux container sandbox attached to an agent for shell commands | [sandbox.md](./sandbox.md) |
| File system | Cloudflare Computer workspace, file tools, and sandboxed JavaScript runtime | [filesystem.md](./filesystem.md) |
| Browser | Persistent Browser Run browser with browserTool adapters and CDP API | [browser.md](./browser.md) |
| Browser internal hostnames | Serve agent-owned sites to the browser via .internal hosts | [browser-internal-hostnames.md](./browser-internal-hostnames.md) |
| Browser Live View and recording | Human takeover, session recording, closing the browser | [browser-live-view-recording.md](./browser-live-view-recording.md) |
| Browser legacy tools | Deprecated createBrowserTools, runtime, Quick Actions, Kitesurf | [browser-legacy.md](./browser-legacy.md) |
| Code Mode overview | Model-written code as a plan; direct tool calls vs Code Mode | [codemode-overview.md](./codemode-overview.md) |
| How Code Mode works | Executor, connectors, durable runtime, approvals, replay, rollback, snippets | [codemode-how-it-works.md](./codemode-how-it-works.md) |
| Code Mode durable runtime | createCodemodeRuntime with connectors, approvals, history | [codemode-durable-runtime.md](./codemode-durable-runtime.md) |
| Code Mode AI SDK | createCodeTool and ToolSetConnector for AI SDK tools | [codemode-ai-sdk.md](./codemode-ai-sdk.md) |
| Code Mode TanStack AI | createCodeTool and tanstackTools for TanStack AI chat | [codemode-tanstack-ai.md](./codemode-tanstack-ai.md) |
| Code Mode browser | Iframe executor for browser-owned tools in a chat UI | [codemode-browser.md](./codemode-browser.md) |
| Code Mode MCP | McpConnector exposing MCP tools in the sandbox | [codemode-mcp.md](./codemode-mcp.md) |
| Code Mode OpenAPI | OpenApiConnector deriving typed methods from an OpenAPI spec | [codemode-openapi.md](./codemode-openapi.md) |
| Code Mode API reference | Exports, types, and options across the codemode entry points | [codemode-api-reference.md](./codemode-api-reference.md) |
| Agentic Payments overview | x402 and MPP over HTTP 402 with the Agents SDK | [payments-overview.md](./payments-overview.md) |
| x402 | x402 protocol, facilitator, schemes, SDK packages | [payments-x402.md](./payments-x402.md) |
| x402 charge for HTTP | Gate HTTP routes with x402-proxy or Hono middleware | [payments-x402-charge-http.md](./payments-x402-charge-http.md) |
| x402 charge for MCP tools | withX402 and paidTool per-call pricing | [payments-x402-charge-mcp.md](./payments-x402-charge-mcp.md) |
| x402 pay from Agents SDK | withX402Client with human approval | [payments-x402-pay-agents-sdk.md](./payments-x402-pay-agents-sdk.md) |
| x402 pay from coding tools | OpenCode plugin and Claude Code hook for 402 responses | [payments-x402-coding-tools.md](./payments-x402-coding-tools.md) |
| MPP | Machine Payments Protocol intents and flow | [payments-mpp.md](./payments-mpp.md) |
| MPP charge for HTTP | Gate HTTP routes with the mpp-proxy Worker | [payments-mpp-charge-http.md](./payments-mpp-charge-http.md) |
| MPP accept payments | mppx middleware for Worker routes and MCP tools | [payments-mpp-accept.md](./payments-mpp-accept.md) |
| MPP pay from Agents SDK | mppx client payments for HTTP and MCP from an Agent | [payments-mpp-pay-agents-sdk.md](./payments-mpp-pay-agents-sdk.md) |
