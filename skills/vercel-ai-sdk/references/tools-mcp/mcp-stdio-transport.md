---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/mcp-stdio-transport
---

# StdioMCPTransport

Transport for MCP clients to communicate with MCP servers over standard input and output streams. Node.js environments only.

## Signature / Usage

Import: `import { StdioMCPTransport } from "@ai-sdk/mcp/mcp-stdio"`. `Experimental_StdioMCPTransport` is a deprecated alias of `StdioMCPTransport`.

```typescript
import { createMCPClient } from '@ai-sdk/mcp';
import { StdioMCPTransport } from '@ai-sdk/mcp/mcp-stdio';

const client = await createMCPClient({
  transport: new StdioMCPTransport({
    command: 'node',
    args: ['server.js'],
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

- The upstream example passes `command: 'node server.js'`; corrected here to `command: 'node'` + `args: ['server.js']` because `command` is the executable and arguments go in `args`.
- Source: https://ai-sdk.dev/docs/reference/ai-sdk-core/mcp-stdio-transport (ai@7.0.173): renamed from `Experimental_StdioMCPTransport` to `StdioMCPTransport`; the old name remains as a deprecated alias.
- Use only for local servers; stdio cannot be deployed to production environments (HTTP transport is recommended there). The MCP SDK's `StdioClientTransport` can be used instead.

## Related

- [createMCPClient](./create-mcp-client.md)
- [Model Context Protocol (MCP)](./mcp-tools.md)
