# Plugin Architecture

Plugins are the packages people discover, install, share, and publish in ChatGPT and Codex. A plugin can contain skills, an MCP server, both, or lifecycle hooks that run commands at configured points in the Codex runtime (including ChatGPT Work and Codex).

## Signature / Usage

```text
Plugin
├── Skills
└── MCP server (optional)
    ├── Tools and structured results
    └── UI resources (optional)
```

## Options / Props

| Shape | Choose it when |
|------|-------------|
| Skills only | Instructions and existing tools are enough to complete the workflow. |
| MCP server only | The plugin needs MCP tools but does not need extra workflow instructions. |
| Skills and MCP server | Skills should guide the model through workflows that use your MCP tools. |
| MCP server with UI | Visual interaction materially improves part of an MCP-backed workflow. |

## Notes

- ChatGPT and Codex share one universal plugin directory; a published public plugin is discoverable from supported surfaces in either product. Individual capabilities can still be surface-specific: hook scripts must be available in the execution environment, and installing a plugin on the web does not deploy those scripts (see bundled hooks in the plugin packaging docs for setup and trust requirements).
- An MCP server can return structured data and model-readable text without custom UI; add a UI resource only when a task benefits from visual interaction.
- ChatGPT supports the open MCP Apps UI standard for optional UI; start with the shared standard before adding ChatGPT-specific extensions.
- Start with the smallest shape that supports your use cases; an MCP server or UI can be added later without changing the plugin's purpose.
- When writing skill instructions, follow the instruction-following guidance (https://developers.openai.com/plugins/build/skills#review-instruction-following).
- Source: https://developers.openai.com/plugins/concepts/plugins (local .md twin copy, fetched 2026-11-14).

## Related

- [Skills (plugin skills)](./plugin-skills.md)
- [MCP server](./mcp-server.md)
- [UI guidelines](./ui-guidelines.md)
