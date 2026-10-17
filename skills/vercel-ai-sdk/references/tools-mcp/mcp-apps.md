---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/mcp-apps
---

# MCP Apps

MCP Apps helpers in `@ai-sdk/mcp` let an MCP host advertise UI support, keep model-visible and app-visible tools separate, and read `ui://` HTML resources for rendering.

## Signature / Usage

```ts
import {
  MCP_APP_MIME_TYPE,
  mcpAppClientCapabilities,
  readMCPAppResource,
  splitMCPAppTools,
} from "@ai-sdk/mcp"
```

```ts
const definitions = await client.listTools();
const { modelVisible, appVisible } = splitMCPAppTools(definitions);

const tools = client.toolsFromDefinitions(modelVisible);

const resource = await readMCPAppResource({
  client,
  uri: 'ui://example/dashboard',
});
```

`MCP_APP_MIME_TYPE`:

```ts
const MCP_APP_MIME_TYPE = 'text/html;profile=mcp-app';
```

`mcpAppClientCapabilities` is passed as `capabilities` to `createMCPClient`; the advertised capability is:

```json
{
  "extensions": {
    "io.modelcontextprotocol/ui": {
      "mimeTypes": ["text/html;profile=mcp-app"]
    }
  }
}
```

## Options / Props

`splitMCPAppTools(definitions)`:

| Name | Type | Description |
| --- | --- | --- |
| definitions | ListToolsResult | Tool definitions returned by `client.listTools()`. |
| returns modelVisible | ListToolsResult | Tools that can be exposed to the language model. |
| returns appVisible | ListToolsResult | Tools an MCP App can call through the host bridge. |

`readMCPAppResource({ client, uri, options? })`:

| Name | Type | Description |
| --- | --- | --- |
| client | `Pick<MCPClient, 'readResource'>` | MCP client used to read the resource. |
| uri | string | The `ui://` resource URI. |
| options | RequestOptions | Optional. Abort signal or timeout. |
| returns uri | string | The `ui://` resource URI. |
| returns mimeType | `'text/html;profile=mcp-app'` | MCP Apps HTML MIME type. |
| returns html | string | App HTML to render in a sandboxed iframe. |
| returns meta | MCPAppResourceMeta | Optional. Rendering metadata from `_meta.ui` such as CSP, permissions, `prefersBorder`. |

Returns `Promise<MCPAppResource>`.

## Notes

- Tools without MCP Apps visibility metadata remain model-visible; tools whose `_meta.ui.visibility` includes `"app"` are returned in `appVisible`.
- `readMCPAppResource` validates the `ui://` prefix, requires the `text/html;profile=mcp-app` MIME type, and supports text or base64 blob contents.
- Distinct from other skills: these are host-side helpers of the AI SDK MCP client. Publishing an MCP app that runs in ChatGPT is covered by openai-apps-sdk; the Claude API MCP connector by anthropic-api-tools-mcp; MCP in Claude Code by anthropic-claude-code-extend; MCP consumption from the Agents SDK by openai-agents.

## Related

- [MCP Apps (guide)](./mcp-apps-guide.md)
- [createMCPClient](./create-mcp-client.md)
- [MCPAppRenderer](../ui/mcp-app-renderer.md)
