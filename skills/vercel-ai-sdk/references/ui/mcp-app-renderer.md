---
source: https://ai-sdk.dev/docs/reference/ai-sdk-ui/mcp-app-renderer
---

# experimental_MCPAppRenderer

Renders an MCP App for an AI SDK tool UI part. Detects MCP App metadata on the tool part, loads the app resource, renders the app in a sandbox proxy iframe, and bridges MCP Apps JSON-RPC messages between the iframe and your host application. For tool parts without MCP App metadata, it renders `fallback`.

## Signature / Usage

```tsx
'use client';

import {
  experimental_MCPAppRenderer as MCPAppRenderer,
  type MCPAppBridgeHandlers,
  type MCPAppMetadata,
  type MCPAppResource,
  type MCPAppSandboxConfig,
} from '@ai-sdk/react';
import { isToolUIPart } from 'ai';

const sandbox = {
  url: '/mcp-app-sandbox',
  className: 'h-80 w-full rounded-lg border',
  style: { border: 0 },
} satisfies MCPAppSandboxConfig;

async function loadResource(app: MCPAppMetadata): Promise<MCPAppResource> {
  const response = await fetch('/api/mcp-app-host/read-resource', {
    method: 'POST',
    body: JSON.stringify({ uri: app.resourceUri }),
  });

  if (!response.ok) {
    throw new Error('Failed to load MCP App resource');
  }

  return response.json();
}

const handlers: MCPAppBridgeHandlers = {
  callTool: params =>
    fetch('/api/mcp-app-host/call-tool', {
      method: 'POST',
      body: JSON.stringify(params),
    }).then(response => response.json()),
  openLink: ({ url }) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    return {};
  },
};

export function MessagePart({ part }: { part: unknown }) {
  if (!isToolUIPart(part)) {
    return null;
  }

  return (
    <MCPAppRenderer
      part={part}
      loadResource={loadResource}
      handlers={handlers}
      sandbox={sandbox}
      fallback={null}
    />
  );
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| part | `ToolUIPart<UITools> \| DynamicToolUIPart` | The AI SDK tool UI part. The renderer looks for MCP App metadata in `part.toolMetadata.mcp.app`. |
| sandbox | `MCPAppSandboxConfig` | Configuration for the outer sandbox proxy iframe used to host the app. |
| resource | `MCPAppResource` | Optional. A preloaded MCP App resource. Provide either `resource` or `loadResource`. |
| loadResource | `(app: MCPAppMetadata) => Promise<MCPAppResource>` | Optional. Loads the MCP App resource for the app metadata found on the tool part. |
| handlers | `MCPAppBridgeHandlers` | Optional. Callbacks that handle iframe requests such as `tools/call`, `resources/read`, `ui/open-link`, and display mode changes. |
| hostInfo | `{ name: string; version: string }` | Optional. Host identity returned to the app during the `ui/initialize` handshake. |
| hostContext | `MCPAppHostContext` | Optional. Host context sent to the app, such as theme, display mode, and available display modes. |
| fallback | `ReactNode` | Optional. Rendered while the resource is loading, when loading fails, or when the tool part is not an MCP App. |

### Sandbox config (`MCPAppSandboxConfig`)

| Name | Type | Description |
| --- | --- | --- |
| url | `string \| URL` | The URL of the sandbox proxy iframe. The proxy receives app HTML from the host and creates the inner app iframe. |
| title | `string` | Optional. Accessible iframe title. |
| className | `string` | Optional. Class name applied to the outer iframe. |
| style | `CSSProperties` | Optional. Inline styles applied to the outer iframe. |
| targetOrigin | `string` | Optional. Target origin used for `postMessage`. Defaults to `*`; set this to your sandbox origin in production. |
| outerSandbox | `string` | Optional. Sandbox attribute for the outer proxy iframe. Defaults to `allow-scripts allow-same-origin allow-forms`. |
| innerSandbox | `string` | Optional. Sandbox attribute sent to the proxy for the inner app iframe. Defaults to `allow-scripts allow-forms`. |

### Bridge handlers (`MCPAppBridgeHandlers`)

| Name | Type | Description |
| --- | --- | --- |
| allowedTools | `string[]` | Optional client-side allowlist checked before forwarding `tools/call` requests. |
| callTool | `(params: MCPAppToolCallParams) => Promise<unknown> \| unknown` | Handles app-initiated `tools/call` requests. |
| readResource | `(params: { uri: string }) => Promise<unknown> \| unknown` | Handles app-initiated `resources/read` requests. |
| listResources | `(params?: unknown) => Promise<unknown> \| unknown` | Handles app-initiated `resources/list` requests. |
| openLink | `(params: { url: string }) => Promise<unknown> \| unknown` | Handles app-initiated `ui/open-link` requests. |
| sendMessage | `(params: unknown) => Promise<unknown> \| unknown` | Handles app-initiated `ui/message` requests. |
| updateModelContext | `(params: unknown) => Promise<unknown> \| unknown` | Handles app-initiated `ui/update-model-context` requests. |
| requestDisplayMode | `(params: { mode: 'inline' \| 'fullscreen' \| 'pip' }) => Promise<{ mode: MCPAppDisplayMode }> \| { mode: MCPAppDisplayMode }` | Handles app-initiated `ui/request-display-mode` requests. |
| onSizeChange | `(params: { width?: number; height?: number }) => void` | Called when the app sends a size change notification. |
| onInitialized | `() => void` | Called after the app sends `ui/notifications/initialized`. |
| onRequestTeardown | `(params: unknown) => void` | Called when the app requests teardown. |
| onLog | `(params: unknown) => void` | Called when the app sends a log notification. |
| onError | `(error: Error) => void` | Called when a supported iframe request fails while being handled. |

## Notes

- `experimental_MCPAppRenderer` is experimental and may change in a future release. React only (`@ai-sdk/react`); other frameworks do not support MCP Apps.
- In production, server-backed handlers should validate authorization and MCP Apps tool visibility before calling the MCP server.
- Distinct from MCP in other skills: this is the host-side renderer for MCP Apps in an AI SDK UI (the AI SDK acts as an MCP client / app host). Connecting to MCP servers from Claude Code or the Claude API is covered by anthropic-claude-code-extend and anthropic-api-tools-mcp; MCP in the OpenAI Agents SDK (consumer side) by openai-agents; publishing apps as MCP servers inside ChatGPT (publisher side) by openai-apps-sdk.

## Related

- [MCP Apps guide](../tools-mcp/mcp-apps-guide.md)
- [MCP Apps helpers](../tools-mcp/mcp-apps.md)
- [useChat](./use-chat.md)
