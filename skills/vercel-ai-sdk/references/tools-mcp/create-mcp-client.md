---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/create-mcp-client
---

# createMCPClient

Creates a lightweight Model Context Protocol (MCP) client that connects to an MCP server. Provides tools (MCP -> AI SDK tool conversion), resources, prompts, completions, elicitation handling, and experimental events (`client.experimental_events`).

## Signature / Usage

Import: `import { createMCPClient } from "@ai-sdk/mcp"`.

```typescript
import { createMCPClient } from '@ai-sdk/mcp';
import { generateText } from 'ai';
import { Experimental_StdioMCPTransport } from '@ai-sdk/mcp/mcp-stdio';

let client;

try {
  client = await createMCPClient({
    transport: new Experimental_StdioMCPTransport({
      command: 'node server.js',
    }),
  });

  const tools = await client.tools();

  const response = await generateText({
    model: __MODEL__,
    tools,
    messages: [{ role: 'user', content: 'Query the data' }],
  });

  console.log(response);
} catch (error) {
  console.error('Error:', error);
} finally {
  // ensure the client is closed even if an error occurs
  if (client) {
    await client.close();
  }
}
```

## Options / Props

`config: MCPClientConfig`:

| Name | Type | Description |
| --- | --- | --- |
| transport | `MCPTransportConfig \| MCPTransport` | Message transport layer. |
| experimental_events | `Experimental_MCPEventsConfig` | Optional. Either `store` or `adapter` (not both). |
| experimental_events.store | `Experimental_MCPEventStore` | Optional. Required in direct mode; persists subscription identities, callback URLs, secrets, cursors, expirations; shared with the webhook receiver. Cannot combine with `adapter`. |
| experimental_events.adapter | `Experimental_MCPEventAdapter` | Optional. Required in managed mode; creates bound subscription operations once before transport startup, receiving `{ type, url }` (HTTP/SSE) or `{ type: 'custom' }`. Cannot combine with `store` or `validateArguments`. |
| experimental_events.validateArguments | `({ definition, arguments }) => void \| PromiseLike<void>` | Optional. Application validation for event filters; throw to reject before persisting the secret or sending `events/subscribe`. |
| initializationOptions | RequestOptions | Optional. Signal and timeout bounding transport startup and protocol negotiation; timeout or abort closes the transport and rejects `createMCPClient`. |
| clientName | string | Optional. Defaults to "ai-sdk-mcp-client". |
| name | string | Optional. Deprecated; use `clientName`. |
| version | string | Optional. Defaults to "1.0.0". |
| onUncaughtError | `(error: unknown) => void` | Optional. Handler for uncaught errors. |
| maxRetries | number | Optional. Retries for transient `tools/call` failures; defaults to 0 (disabled, opt-in). |
| initialInitializeResult | InitializeResult | Optional. Initialize result from a previous legacy session; reused without sending a new `initialize`. |
| capabilities | ClientCapabilities | Optional. Advertised during legacy initialization or on each stateless modern request, e.g. `{ elicitation: {} }`. |

`MCPTransportConfig` (HTTP / SSE):

| Name | Type | Description |
| --- | --- | --- |
| type | `'sse' \| 'http'` | Transport kind. |
| url | string | URL of the MCP server. |
| headers | Record<string, string> | Optional. Additional HTTP headers. |
| authProvider | OAuthClientProvider | Optional. OAuth for protected remote servers; implement `validateAuthorizationServerURL` to allowlist authorization servers. |
| redirect | `'follow' \| 'error'` | Optional. Defaults to `'error'` (rejects redirects, preventing redirects to unintended hosts). |
| initialSessionId | string | Optional. Legacy session id for resumed Streamable HTTP requests; pair with `initialInitializeResult`. HTTP only. |
| initialProtocolVersion | string | Optional. Legacy protocol version sent before `initialize` negotiates. HTTP only. |
| onSessionIdChange | `(sessionId: string \| undefined) => void` | Optional. Called when the server creates, changes, or clears the session id. HTTP only. |
| onSessionExpired | `(sessionId: string) => void` | Optional. Called on 404 for an existing session id; the id is cleared first. HTTP only. |
| terminateSessionOnClose | boolean | Optional. Whether `close()` sends DELETE for the session; defaults to true. HTTP only. |
| fetch | FetchFunction | Optional. Custom fetch implementation. |

A custom `MCPTransport` implements `start()`, `send(message: JSONRPCMessage)`, `close()`, and `onclose` / `onerror(error)` / `onmessage(message)` callbacks.

Returned `MCPClient`:

| Name | Type | Description |
| --- | --- | --- |
| experimental_events | `Experimental_MCPEvents \| Experimental_ManagedMCPEvents` | Event catalog discovery plus mode-specific subscription methods (managed adds `getSubscription` / `listSubscriptions`; direct has `refresh`). |
| initializeResult | InitializeResult | Connection metadata (derived from protocol discovery for modern servers). |
| serverInfo | Configuration | Server name, version, optional title. |
| instructions | string | Optional. Server instructions from the initialize handshake; useful in the system prompt. |
| tools | `async (options?: { schemas?: TOOL_SCHEMAS }) => Promise<McpToolSet<TOOL_SCHEMAS>>` | Gets server tools; `schemas` give compile-time types (`inputSchema`, optional `outputSchema` for `structuredContent`). |
| listTools | `async (options?: { params?; options? }) => Promise<ListToolsResult>` | Lists tool definitions without conversion. |
| callTool | `async (args: { name; arguments?; options? }) => Promise<CallToolResult>` | Calls a tool directly (host-mediated calls such as MCP Apps iframe requests). |
| toolsFromDefinitions | `(definitions: ListToolsResult, options?: { schemas? }) => McpToolSet` | Converts existing definitions without listing again. |
| listResources | `async (options?) => Promise<ListResourcesResult>` | Lists resources. |
| readResource | `async (args: { uri; options? }) => Promise<ReadResourceResult>` | Reads a resource by URI. |
| listResourceTemplates | `async (options?) => Promise<ListResourceTemplatesResult>` | Lists resource templates. |
| complete | `async (args: CompleteRequestParams & { options? }) => Promise<CompleteResult>` | Autocompletion (`ref`, `argument`, optional `context.arguments`); server must advertise completions. |
| experimental_listPrompts | `async (options?) => Promise<ListPromptsResult>` | Lists prompts (experimental). |
| experimental_getPrompt | `async (args: { name; arguments?; options? }) => Promise<GetPromptResult>` | Retrieves a prompt (experimental). |
| onElicitationRequest | `(schema: typeof ElicitationRequestSchema, handler) => void` | Registers an elicitation handler returning `{ action: 'accept' \| 'decline' \| 'cancel', content? }`. |
| close | `() => Promise<void>` | Closes the connection and cleans up. |

## Notes

- Distinct from other skills: this is the MCP **client** of the AI SDK. The Claude API MCP connector is covered by anthropic-api-tools-mcp, MCP in Claude Code by anthropic-claude-code-extend, MCP consumption in the Agents SDK by openai-agents, and publishing MCP servers for ChatGPT apps by openai-apps-sdk.
- The client does not support in-band notifications from an MCP server. Experimental webhook delivery is covered by the MCP Events pages.
- Errors: `MCPClientError` (initialization failures, protocol version mismatches, missing server capabilities, connection failures) with optional `code` (JSON-RPC application error), `statusCode`, `url`, `responseBody` (HTTP context; undefined for network errors, timeouts, aborts, stdio failures). Use `MCPClientError.isInstance(error)`. A missing `statusCode` alone does not indicate a retryable failure. OAuth failures can throw `UnauthorizedError` or `MCPClientOAuthError`. Tool execution errors propagate as `CallToolError`. Redact `url` / `responseBody` before logging.

```typescript
if (MCPClientError.isInstance(error)) {
  if (error.statusCode === 401 || error.statusCode === 403) {
    // Authentication or authorization must be fixed before retrying.
    throw error;
  }
}
```

## Related

- [Model Context Protocol (MCP)](./mcp-tools.md)
- [Experimental_StdioMCPTransport](./mcp-stdio-transport.md)
- [MCP Apps (reference)](./mcp-apps.md)
- [MCP Events (reference)](./mcp-events.md)
