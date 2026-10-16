# Using Storybook with AI

Storybook's AI capabilities help with agentic development: setting up Storybook with an agent, then giving the agent ongoing access to component docs, story generation, and tests via an MCP server.

## Signature / Usage

Run this prompt in your agent to set up Storybook (React renderer + Vite builder only):

```text
Set up Storybook for me with npm create storybook@latest and follow its instructions precisely
```

Connect the agent to Storybook (dev server exposes `http://localhost:6006/mcp`; port may differ):

```shell
npx storybook add @storybook/addon-mcp
npx mcp-add --type http --url "http://localhost:6006/mcp" --scope project
```

Enable the components manifest in `.storybook/main.ts` (React example):

```ts
features: {
  componentsManifest: true,
},
```

## Notes

- AI capabilities are in preview; the API may change in future releases.
- Key concepts: Agentic setup (project-specific setup instructions, React + Vite only), Manifests (JSON maps of components and docs), MCP server (tools an agent calls to read component info, generate stories, run tests).
- After adding the MCP server, update `AGENTS.md` (or `CLAUDE.md`) so the agent uses the `docs-list`, `docs-show`, `get-storybook-story-instructions`, and `test-run` tools instead of guessing component props.
- Verify with a prompt like "List all documented components"; the agent should call `docs-list`.
- The MCP server addon (`@storybook/addon-mcp`) is Storybook's own; it is distinct from any other tool's MCP configuration.
- Source: https://storybook.js.org/docs/ai (Storybook v10.6.2).

## Related

- [Agentic setup](./agentic-setup.md)
- [Manifests](./manifests.md)
- [MCP server](./mcp-server.md)
- [MCP server API](./mcp-server-api.md)
- [Sharing your MCP server](./mcp-sharing.md)
- [Agentic review](./agentic-review.md)
- [Best practices](./best-practices.md)
