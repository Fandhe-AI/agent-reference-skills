---
source: https://ai-sdk.dev/docs/ai-sdk-core/mcp-apps
---

# MCP Apps

MCP Apps extend MCP tools with interactive UI resources: the model calls ordinary MCP tools, and tools can point to a `ui://` resource containing HTML that your app renders in a sandboxed iframe. The AI SDK provides `@ai-sdk/mcp` helpers (advertise support, split tools by visibility, read `ui://` resources) and `@ai-sdk/react` components (render the iframe, bridge JSON-RPC messages).

## Signature / Usage

Host flow: connect with MCP Apps capabilities; list tools and split by visibility; pass only model-visible tools to `streamText` / `generateText`; read the `ui://` resource when a tool part has MCP App metadata; render in a sandboxed iframe; proxy allowed iframe requests (app-visible `tools/call`) back to the MCP server.

```ts
import { createMCPClient, mcpAppClientCapabilities } from '@ai-sdk/mcp';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

export function createMCPAppsClient(origin: string) {
  return createMCPClient({
    transport: new StreamableHTTPClientTransport(new URL('/mcp', origin)),
    clientName: 'my-mcp-apps-host',
    capabilities: mcpAppClientCapabilities,
  });
}
```

Expose only model-visible tools:

```ts
const definitions = await client.listTools();
const { modelVisible } = splitMCPAppTools(definitions);
const tools = client.toolsFromDefinitions(modelVisible);

const result = streamText({
  model: openai('gpt-6-luna'),
  tools,
  messages: await convertToModelMessages(messages),
  onEnd: async () => {
    await client.close();
  },
});
```

Read app resources (route `app/api/mcp-app-host/read-resource/route.ts`):

```ts
import { readMCPAppResource } from '@ai-sdk/mcp';

return Response.json(await readMCPAppResource({ client, uri }));
```

Proxy app-visible tool calls (validate before calling the server):

```ts
const { appVisible } = splitMCPAppTools(await client.listTools());
const isAllowed = appVisible.tools.some(tool => tool.name === name);

if (!isAllowed) {
  return Response.json({ error: 'Tool is not app-visible' }, { status: 403 });
}

return Response.json(await client.callTool({ name, arguments: toolArguments ?? {} }));
```

Render with React:

```tsx
import {
  experimental_MCPAppRenderer as MCPAppRenderer,
  useChat,
  type MCPAppBridgeHandlers,
  type MCPAppMetadata,
  type MCPAppResource,
  type MCPAppSandboxConfig,
} from '@ai-sdk/react';
import { DefaultChatTransport, isToolUIPart } from 'ai';

const sandbox = {
  url: '/mcp-app-sandbox',
  className: 'h-80 w-full rounded-lg border',
  style: { border: 0 },
} satisfies MCPAppSandboxConfig;

// inside the message loop:
if (isToolUIPart(part)) {
  return (
    <MCPAppRenderer
      key={part.toolCallId}
      part={part}
      loadResource={loadResource}
      handlers={handlers}
      sandbox={sandbox}
      fallback={<div>Loading MCP App...</div>}
    />
  );
}
```

where `handlers: MCPAppBridgeHandlers` supplies `callTool` (POST to your call-tool route) and `openLink`, and `loadResource(app: MCPAppMetadata): Promise<MCPAppResource>` fetches your read-resource route with `app.resourceUri`.

## Notes

- `experimental_MCPAppRenderer` is experimental and may change in a future release.
- Distinct from other skills: the AI SDK is the **host side** (it renders MCP App UIs inside your app). Publishing an MCP server whose UI runs inside ChatGPT is covered by openai-apps-sdk; MCP in Claude Code by anthropic-claude-code-extend; the Claude API MCP connector by anthropic-api-tools-mcp; MCP consumption from the Agents SDK by openai-agents.
- Only advertise `mcpAppClientCapabilities` if the host can fetch and render MCP App resources safely. When a model calls an app-backed tool, the MCP client preserves app metadata on the tool UI part. For ordinary tools the renderer shows `fallback` (or nothing).
- Best practices: treat MCP App HTML as untrusted (sandboxed iframe, ideally a sandbox proxy route on a separate origin); never pass app-only tools to the model; validate every iframe request server-side; cache resources by `resourceUri`; keep tool `content` / `structuredContent` useful without the UI; close short-lived clients.

## Related

- [MCP Apps (reference)](./mcp-apps.md)
- [Model Context Protocol (MCP)](./mcp-tools.md)
- [createMCPClient](./create-mcp-client.md)
- [MCPAppRenderer](../ui/mcp-app-renderer.md)
