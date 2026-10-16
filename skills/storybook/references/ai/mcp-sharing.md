# Sharing your MCP server (Chromatic / @storybook/mcp self-hosting)

Share the docs toolset of your MCP server so agents outside your local environment can use your manifests. Two ways: Chromatic publishing or self-hosting with `@storybook/mcp`.

## Signature / Usage

Minimal self-hosted server using `@storybook/mcp`:

```ts
import { createStorybookMcpHandler } from '@storybook/mcp';

const storybookMcpHandler = await createStorybookMcpHandler();

export async function handleRequest(request: Request): Promise<Response> {
  if (new URL(request.url).pathname === '/mcp') {
    return storybookMcpHandler(request);
  }

  return new Response('Not found', { status: 404 });
}
```

## Notes

- Preview feature. Sharing means sharing the docs toolset, which needs a components manifest. The development and testing toolsets only apply to a locally running Storybook.
- Chromatic: publishing your Storybook with Chromatic automatically publishes the MCP server. Private Storybook means private MCP server (only invited Chromatic project members); public Storybook means public MCP server. Share the MCP server URL from Chromatic with your team.
- Self-hosting: `@storybook/mcp` is a library that creates a `tmcp`-based MCP server exposing component/docs knowledge from manifests. You manage infrastructure, security, and updates.
- Prerequisites: Node.js 20+; a manifest source containing `components.json` (required) and `docs.json` (optional).
- Full API is in the `@storybook/mcp` package README (`code/lib/mcp` in the storybookjs/storybook repo); `serve.ts` there is a Node self-hosting example.

## Related

- [MCP server](./mcp-server.md)
- [Manifests](./manifests.md)
