# install

Install the Node MCP SDK, MCP Apps helpers, and `zod` to build a plugin's MCP server.

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
