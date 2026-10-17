---
source: https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools
---

# Model Context Protocol (MCP)

The AI SDK connects to MCP servers to access their tools, resources, and prompts via `createMCPClient` from `@ai-sdk/mcp`.

## Signature / Usage

HTTP transport (recommended for production):

```typescript
import { createMCPClient } from '@ai-sdk/mcp';

const mcpClient = await createMCPClient({
  transport: {
    type: 'http',
    url: 'https://your-server.com/mcp',

    // optional: configure HTTP headers
    headers: { Authorization: 'Bearer my-api-key' },

    // optional: provide an OAuth client provider for automatic authorization
    authProvider: myOAuthClientProvider,

    // optional: allow redirect responses (default is 'error' to prevent SSRF)
    redirect: 'follow',
  },
});
```

Other transports: SSE (`transport: { type: 'sse', url, headers?, authProvider?, redirect? }`), official SDK `StreamableHTTPClientTransport`, stdio (local servers only), or a custom `MCPTransport`.

```typescript
import { createMCPClient } from '@ai-sdk/mcp';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
// Or use the AI SDK's stdio transport:
// import { Experimental_StdioMCPTransport as StdioClientTransport } from '@ai-sdk/mcp/mcp-stdio';

const mcpClient = await createMCPClient({
  transport: new StdioClientTransport({
    command: 'node',
    args: ['src/stdio/dist/server.js'],
  }),
});
```

Using tools and closing the client:

```typescript
const tools = await mcpClient.tools();

const result = await streamText({
  model: __MODEL__,
  tools,
  prompt: 'What is the weather in Brooklyn, New York?',
  onEnd: async () => {
    await mcpClient.close();
  },
});
```

## Options / Props

Client capabilities covered by the page:

| Name | Usage |
| --- | --- |
| `mcpClient.tools()` | Schema discovery: all server tools, input types inferred from server schemas (no static type safety). |
| `mcpClient.tools({ schemas })` | Schema definition: explicit `inputSchema` (and optional `outputSchema` for typed `structuredContent`); only the defined tools are pulled. Use `z.object({})` for zero-input tools. |
| `listResources()` / `readResource({ uri })` / `listResourceTemplates()` | MCP resources (application-driven context). |
| `complete({ ref, argument, context? })` | Autocompletion for prompt arguments / resource template variables; throws `MCPClientError` if the server lacks `capabilities.completions`. |
| `experimental_listPrompts()` / `experimental_getPrompt({ name, arguments })` | MCP prompts (experimental). |
| `onElicitationRequest(ElicitationRequestSchema, handler)` | Elicitation; advertise with `capabilities: { elicitation: {} }`. Handler returns `{ action: 'accept' \| 'decline' \| 'cancel', content? }` (`content` required for `accept`). |
| `maxRetries` (client option) | Opt-in retries (default disabled) for transient HTTP/network failures of `tools/call`; not applied to initialization. |

Typed outputs:

```typescript
const tools = await mcpClient.tools({
  schemas: {
    'get-weather': {
      inputSchema: z.object({ location: z.string() }),
      outputSchema: z.object({
        temperature: z.number(),
        conditions: z.string(),
        humidity: z.number(),
      }),
    },
  },
});
```

Tool annotations (`readOnlyHint`, `destructiveHint`, `idempotentHint`, `openWorldHint`) are exposed on `metadata.annotations` / `toolMetadata.annotations`; combine them with `toolApproval`:

```typescript
const result = streamText({
  model: __MODEL__,
  tools,
  toolApproval: ({ toolCall }) => {
    const annotations = (
      toolCall.toolMetadata as McpProviderMetadata | undefined
    )?.annotations;

    return annotations?.readOnlyHint === true
      ? 'not-applicable'
      : {
          type: 'user-approval',
          reason:
            annotations?.destructiveHint === true
              ? 'The MCP server marks this tool as destructive.'
              : 'The MCP server does not mark this tool as read-only.',
        };
  },
  prompt,
});
```

Tool-definition drift ("rug pull") detection with `fingerprintTools` / `detectToolDrift` from `ai`:

```typescript
import { fingerprintTools, detectToolDrift } from 'ai';

const baseline = await fingerprintTools(await mcpClient.tools());

const tools = await mcpClient.tools();
const drift = detectToolDrift(await fingerprintTools(tools), baseline);

if (drift.changed.length || drift.added.length) {
  // Block, re-approve, or alert per your policy.
}
```

## Notes

- Distinct from other skills: this is the AI SDK MCP **client** (consuming side, converting MCP tools to AI SDK tools). MCP connector in the Claude API is covered by anthropic-api-tools-mcp, MCP in Claude Code by anthropic-claude-code-extend, MCP consumption from the Agents SDK by openai-agents, and publishing an MCP server as a ChatGPT app by openai-apps-sdk.
- Use HTTP transport in production; stdio is for local servers only. The built-in stdio transport probes with `server/discover` and falls back to the legacy `initialize` handshake; the client supports both legacy initialization-based versions and stateless MCP `2026-07-28` (custom transports opt in with `supportsProtocolVersionDiscovery: true`). Session reattach options (`initialSessionId`, `initialProtocolVersion`, `terminateSessionOnClose`, `onSessionIdChange`, `onSessionExpired`, `initialInitializeResult`) apply to legacy sessions only.
- The client is lightweight, intended for tool conversion: no automatic session persistence, resumable streams, or receiving notifications. OAuth is supported on HTTP / SSE via `authProvider`.
- OAuth hardening: optional `OAuthClientProvider.invalidateCredentials(scope, context?)` (delete tokens only if they still match `context.tokens`, atomically), `validateAuthorizationServerURL` (allowlist authorization server origins), `auth(provider, { serverUrl, authorizationCode, callbackState, callbackIssuer })` (an `iss` that mismatches the discovered issuer aborts the code exchange), and `isClientInformationDynamicallyRegistered` for recovery of dynamically registered clients.
- Only enable `maxRetries` for idempotent tools. JSON-RPC application errors and `isError: true` results are not retried. Use `MCPClientError.isInstance(error)`; a missing `statusCode` does not prove a failure is transient.
- Annotations are untrusted server hints; the client does not turn them into an approval policy automatically.
- MCP Prompts are experimental. Elicitation handling is the application's responsibility.
- Drift detection covers description / input schema / title mutation only; it cannot detect a behavior or endpoint swap. Baseline storage and the response are the app's job.
- With OpenAI's Responses API the built-in `openai.tools.mcp` tool is an alternative that needs no tool conversion.

## Related

- [createMCPClient](./create-mcp-client.md)
- [Experimental_StdioMCPTransport](./mcp-stdio-transport.md)
- [MCP Apps (guide)](./mcp-apps-guide.md)
- [MCP Events (guide)](./mcp-events-guide.md)
- [Tool Calling](./tools-and-tool-calling.md)
