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

    // Reject redirects; DNS protection requires a guarded fetch or egress policy.
    redirect: 'error',
  },
});
```

When an application accepts MCP server URLs from users or external configuration, pass a `guarded-fetch` transport through `transport.fetch` (see Notes, Securing remote server URLs).

```ts
import { createGuardedFetch } from 'guarded-fetch';
import { createMCPClient } from '@ai-sdk/mcp';

const fetch = createGuardedFetch();
const mcpClient = await createMCPClient({
  transport: {
    type: 'http',
    url: 'https://mcp.example.com/mcp',
    fetch,
    redirect: 'error',
  },
});

// Reuse the client and transport. At application shutdown, close the MCP
// client first, then await fetch.close() after all requests have finished.
```

Other transports: SSE (`transport: { type: 'sse', url, headers?, authProvider?, redirect? }`), official SDK `StreamableHTTPClientTransport`, stdio (local servers only), or a custom `MCPTransport`.

```typescript
import { createMCPClient } from '@ai-sdk/mcp';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
// Or use the AI SDK's stdio transport:
// import { StdioMCPTransport as StdioClientTransport } from '@ai-sdk/mcp/mcp-stdio';

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
| `listPrompts()` / `getPrompt({ name, arguments })` | MCP prompts. |
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
- Source: https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools (ai@7.0.173)
- Use HTTP transport in production; stdio is for local servers only. The built-in stdio transport probes with `server/discover` and falls back to the legacy `initialize` handshake; the client supports both legacy initialization-based versions and stateless MCP `2026-07-28` (custom transports opt in with `supportsProtocolVersionDiscovery: true`). Session reattach options (`initialSessionId`, `initialProtocolVersion`, `terminateSessionOnClose`, `onSessionIdChange`, `onSessionExpired`, `initialInitializeResult`) apply to legacy sessions only.
- The client is lightweight, intended for tool conversion: no automatic session persistence, resumable streams, or receiving notifications. OAuth is supported on HTTP / SSE via `authProvider`.
- OAuth hardening: optional `OAuthClientProvider.invalidateCredentials(scope, context?)` (delete tokens only if they still match `context.tokens`, atomically), `validateAuthorizationServerURL` (allowlist authorization server origins), `auth(provider, { serverUrl, authorizationCode, callbackState, callbackIssuer })` (an `iss` that mismatches the discovered issuer aborts the code exchange), and `isClientInformationDynamicallyRegistered` for recovery of dynamically registered clients.
- Only enable `maxRetries` for idempotent tools. JSON-RPC application errors and `isError: true` results are not retried. Use `MCPClientError.isInstance(error)`; a missing `statusCode` does not prove a failure is transient.
- Annotations are untrusted server hints; the client does not turn them into an approval policy automatically.
- MCP prompts: `listPrompts` / `getPrompt` replace `experimental_listPrompts` / `experimental_getPrompt` and are no longer marked experimental. Elicitation handling is the application's responsibility.
- Drift detection covers description / input schema / title mutation only; it cannot detect a behavior or endpoint swap. Baseline storage and the response are the app's job.
- With OpenAI's Responses API the built-in `openai.tools.mcp` tool is an alternative that needs no tool conversion.

### 7.0.173 additions

- Protocol discovery: recognized modern protocol errors, including `-32022` (unsupported protocol version), do not trigger automatic fallback to `initialize`. If you know an endpoint requires legacy initialization, set `protocolVersionDiscovery: false` on `createMCPClient` to skip discovery and start with the legacy handshake; the server can then negotiate an older supported version in its `initialize` response.
- Securing remote server URLs: when an application accepts MCP server URLs from users or external configuration, use `guarded-fetch` on Node.js unless the destinations are controlled by your application or your fetch implementation or network egress policy already provides equivalent SSRF protection. Authentication alone does not make a user-supplied URL trusted. Rejecting redirects does not prevent a hostname from resolving to a private address. Pass the guarded transport through `transport.fetch` on the built-in HTTP or SSE transport; the built-in transports also use it for OAuth metadata and token requests. Only send credentials to approved server destinations. Official SDK and custom transports need equivalent protection in their own fetch configuration. See https://ai-sdk.dev/docs/advanced/secure-url-fetching for runtime requirements.
- OAuth on server runtimes (including Node.js): pass a `fetch` with connect-time DNS validation, such as `guarded-fetch`, when the authorization server is on a different origin than the MCP server. OAuth discovery blocks untrusted authorization-server URLs, redirects, token endpoints, and registration endpoints unless you supply a custom `fetch` with connect-time address validation and DNS pinning; without one the request fails with a `DownloadError`. When calling `auth` directly, pass the same transport as `fetchFn`. Passing global `fetch` explicitly does not opt out. The configured MCP server origin remains supported, including local endpoints; response-supplied authorization-server hosts are not automatically trusted. Browser window discovery remains supported; browser Web Workers and Service Workers without a DOM follow the strict custom-fetch requirement.
- OAuth resource binding: the client includes the OAuth `resource` parameter in authorization, authorization-code exchange, and token refresh requests, using the validated resource from protected resource metadata when available, otherwise the configured MCP server URL with its fragment removed. Implement `OAuthClientProvider.validateResourceURL` to customize validation and selection: return a `URL` to select a resource, or throw to reject it. Returning `undefined` uses the canonical MCP server URL; it does not omit the `resource` parameter.
- OAuth invalidation: tokens lacking an authorization server pin must be cleared before the SDK saves a new client registration or authorization server pin. If the invalidation hook is missing or refresh tokens remain in storage, authorization stops with an error; clear the stored tokens and start authorization again.
- Pre-registered confidential clients must be bound to their authorization server before starting OAuth: set `issuer` on the credentials returned by `clientInformation()` to the issuer of the server that registered the client (configure it from the client's registration, not from the MCP server's metadata). The issuer must exactly match the discovered issuer; the SDK rejects a mismatch before redirecting or sending credentials. Dynamic client registration attaches this binding automatically. Without a binding, a pre-registered client secret or custom `addClientAuthentication` handler is rejected, even when `validateAuthorizationServerURL` accepts the selected server; that hook is an optional additional restriction and does not replace the credential binding.
- Elicitation on MCP `2026-07-28` connections: the same handler processes form elicitation requests embedded in `input_required` results from tools, prompts, and resource reads. The client retries the original request with the handler's answers and the server's unchanged `requestState` until it receives a final result, with a limit of 10 retries; state-only retries are delayed by 250 ms. Each round respects `timeout` (including time awaiting the handler) while `maxTotalTimeout` bounds the entire exchange. Missing handlers and unsupported input requests reject the operation. Older connections continue to use `elicitation/create` server requests.

## Related

- [createMCPClient](./create-mcp-client.md)
- [Experimental_StdioMCPTransport](./mcp-stdio-transport.md)
- [MCP Apps (guide)](./mcp-apps-guide.md)
- [MCP Events (guide)](./mcp-events-guide.md)
- [Tool Calling](./tools-and-tool-calling.md)
