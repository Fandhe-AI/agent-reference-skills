# Figma MCP Server Overview

Integrates Figma into AI agent workflows via the Model Context Protocol (MCP), enabling design-to-code generation and writing native Figma content back to the canvas.

## Signature / Usage

Two deployment options:

```text
Remote  : https://mcp.figma.com/mcp
Desktop : http://127.0.0.1:3845/mcp
```

- **Remote server** (recommended): cloud-hosted at `https://mcp.figma.com/mcp`; no desktop app needed; broadest feature set
- **Desktop server**: locally hosted at `http://127.0.0.1:3845/mcp` through the Figma desktop app; for specific organization and enterprise needs. Requires a Dev or Full seat on a Professional, Education, Organization, Government, or Enterprise plan

## Options / Props

- Generate code from selected Figma frames with design context (variables, components, layout)
- Write native Figma content (frames, components, variables, auto layout) directly from MCP clients in Figma Design, FigJam, and Figma Slides (remote only)
- Send UI: turn live UI from your browser (production, staging, localhost) into editable design layers in Figma Design (remote only, select clients)
- Retrieve FigJam resources for use in code generation workflows
- Retrieve Make file resources for prototype-to-production transitions
- Leverage Code Connect for consistency between generated code and actual components
- Figma Specs (`figma-spec` skill, open beta): read, create, and update specs; writing requires the remote server and edit access to the file

### Client support (summary)

| Client | Desktop | Remote | Write to canvas (remote only) | Plugin / skills |
| --- | --- | --- | --- | --- |
| Claude Code | Yes | Yes | Yes | Figma plugin |
| Claude Desktop | Yes | Yes | Yes | Figma connector |
| Codex by OpenAI | Yes | Yes | Yes | Codex Skills |
| Copilot CLI | Yes | Yes | Yes | Figma plugin |
| Cursor | Yes | Yes | Yes | Figma plugin |
| VS Code | Yes | Yes | Yes | Figma plugin |
| Gemini CLI | Yes | Yes | No | Extension |
| Kiro | Yes | Yes | Yes | Kiro Powers |
| Xcode (beta) | No | Yes | Yes | Figma plugin |
| Amazon Q, Openhands | Yes | No | No | None |
| Dia, Linear, Meta Muse | No | Yes | Yes | None |
| Replit | No | Yes | No | None |

Also listed: Android Studio (desktop and remote, no write), Augment Code, Factory, Firebender, OpenCode, Warp (desktop, remote, and write, no plugin/skills). For the latest list see the Figma MCP catalog.

## Notes

- Only MCP clients listed in the [Figma MCP Catalog](https://www.figma.com/mcp-catalog) can connect to the Figma MCP Server
- Write to canvas is in beta and currently free; will eventually become a usage-based paid feature
- Writing outside your drafts requires the remote server and a Full seat (the desktop server doesn't support writing)
- Figma for Government supports the desktop server only
- The MCP server and Figma Agent can access fonts uploaded to your account
- Installing Figma skills for your MCP client is recommended for reliable write-to-Figma workflows; skills package recommended workflows and do not add new capabilities
- The official Overview page has no code examples; for client configuration examples see Remote Server Installation and Desktop Server Installation
- Usage and rate limits are covered in Plans, access, and permissions

## Related

- [Remote Server Installation](./remote-server-installation.md)
- [Desktop Server Installation](./desktop-server-installation.md)
- [Tools and Prompts](./tools-and-prompts.md)
- [Rate Limits and Access](./rate-limits-access.md)
