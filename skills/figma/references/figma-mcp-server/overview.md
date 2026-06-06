# Figma MCP Server Overview

Integrates Figma into AI agent workflows via the Model Context Protocol (MCP), enabling design-to-code generation and writing native Figma content back to the canvas.

## Signature / Usage

Two deployment options:

- **Remote server** (recommended): cloud-hosted at `https://mcp.figma.com/mcp`; broadest feature set
- **Desktop server**: locally hosted at `http://127.0.0.1:3845/mcp`; for specific organizational needs

## Options / Props

- Generate code from selected Figma frames with design context (variables, components, layout)
- Write native Figma content (frames, components, variables, auto layout) directly from MCP clients
- Retrieve Make file resources for prototype-to-production transitions
- Leverage Code Connect for consistency between generated code and actual components

## Notes

- Only MCP clients listed in the [Figma MCP Catalog](https://www.figma.com/mcp-catalog) can connect to the Figma MCP Server
- Write to canvas is in beta and currently free; will eventually become usage-based and paid
- Installing Figma skills for your MCP client is recommended for reliable write-to-Figma workflows
- Full Figma seat required for write operations; Dev seats are read-only

## Related

- [Remote Server Installation](./remote-server-installation.md)
- [Desktop Server Installation](./desktop-server-installation.md)
- [Tools and Prompts](./tools-and-prompts.md)
