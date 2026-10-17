---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/mcp-stdio-transport
---

# Experimental_StdioMCPTransport

Transport for MCP clients to communicate with MCP servers over standard input and output streams. Node.js environments only.

## Signature / Usage

Import: `import { Experimental_StdioMCPTransport } from "@ai-sdk/mcp/mcp-stdio"`.

```typescript
import { createMCPClient } from '@ai-sdk/mcp';
import { Experimental_StdioMCPTransport } from '@ai-sdk/mcp/mcp-stdio';

const client = await createMCPClient({
  transport: new Experimental_StdioMCPTransport({
    command: 'node server.js',
  }),
});
```

## Options / Props

`config: StdioConfig`:

| Name | Type | Description |
| --- | --- | --- |
| command | string | The command to run the MCP server. |
| args | string[] | Optional. Arguments to pass to the MCP server. |
| env | Record<string, string> | Optional. Environment variables for the MCP server. |
| stderr | `IOType \| Stream \| number` | Optional. Stream to write the server's stderr to. |
| cwd | string | Optional. Working directory for the MCP server. |

## Notes

- Experimental: this feature may change or be removed in the future.
- Use only for local servers; stdio cannot be deployed to production environments (HTTP transport is recommended there). The MCP SDK's `StdioClientTransport` can be used instead.

## Related

- [createMCPClient](./create-mcp-client.md)
- [Model Context Protocol (MCP)](./mcp-tools.md)
