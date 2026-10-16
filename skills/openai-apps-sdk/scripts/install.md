# install

Install the Node MCP SDK, MCP Apps helpers, and `zod` to build a plugin's MCP server, plus the optional OpenAI MCP Extensions and MCP Events packages.

## Install the Node MCP SDK, MCP Apps helpers, and zod

```bash
npm install @modelcontextprotocol/sdk @modelcontextprotocol/ext-apps zod
```

Source: https://developers.openai.com/plugins/build/app-quickstart

## package.json dependencies (Node quickstart)

Set `"type": "module"` and pin the versions used by the quickstart:

```json
{
  "type": "module",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.20.2",
    "@modelcontextprotocol/ext-apps": "^1.0.1",
    "zod": "^3.25.76"
  }
}
```

Source: https://developers.openai.com/plugins/build/app-quickstart

If you use a web framework such as React for the UI component, build it into static assets first (for example with a project-specific `npm run build`) so the compiled output can be inlined into the HTML template served by the MCP server; the vanilla-HTML quickstart itself needs no build step.

## Install OpenAI MCP Extensions (MCP server)

Extension-only: this is the optional `@openai/mcp-extensions` SDK, not the base quickstart install above. It targets `@modelcontextprotocol/server@^2`, whereas the quickstart and `build/mcp-server.md` use `@modelcontextprotocol/sdk`.

```sh
pnpm add @openai/mcp-extensions @modelcontextprotocol/server@^2
```

Source: https://github.com/openai/mcp-extensions (tag `node-v0.2.0`, `typescript/README.md`)

## Install OpenAI MCP Extensions (MCP Apps)

Extension-only: for MCP Apps, install the app integration instead.

```sh
pnpm add @openai/mcp-extensions @modelcontextprotocol/ext-apps@^1.7.5 @modelcontextprotocol/sdk@^1
```

Source: https://github.com/openai/mcp-extensions (tag `node-v0.2.0`, `typescript/README.md`)

## Install the Standard Webhooks library (MCP Events)

Used to sign event deliveries in the MCP Events Node.js example.

```bash
npm install standardwebhooks
```

Source: https://developers.openai.com/plugins/build/mcp-events
