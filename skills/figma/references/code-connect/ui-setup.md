# Getting Started with Code Connect UI

Browser-based interface within Figma Dev Mode for connecting design components to code without local CLI installation.

## Signature / Usage

UI procedure page (no code API); steps below replace a code example.

1. Open a Figma library file containing design components
2. Switch to **Dev Mode**
3. Select **Library → Connect components to code** from the dropdown
4. Map each component to its code file path and optional component name

## Options / Props

| Feature | Details |
|---------|---------|
| GitHub integration | Optional; provides file path autocomplete and direct component browsing |
| Multiple frameworks | Map a single design component to multiple code implementations |
| Custom AI instructions | Add prompts that guide Figma MCP server code generation |
| AI preview | Preview generated code snippets by adjusting component properties in the UI |

### Adding multiple framework connections

1. Connect the initial component
2. Hover over the component row to reveal the add button
3. Enter file path and name for each additional framework

## Notes

- Available on a Dev or Full seat on the Professional, Organization, and Enterprise plans; requires a Figma library file with published design components
- Professional plans can have one active library and one active framework (set by the team's first publish; a team admin can change it in Admin → Settings → Resources → Code Connect). Connections for the previous framework are kept but show a Deactivated badge in Dev Mode and Code Connect UI and are not returned by the Figma MCP server. Organization and Enterprise can have multiple active frameworks
- UI mappings do **not** display code snippets in the Inspect panel (unlike CLI)
- GitHub Enterprise Server (GHES) is not supported
- GitHub connection is optional; without it, enter the component path (for example `src/components/Button.tsx`) and optional component name manually
- CLI-created connections appear in the UI but are editable only via CLI

## Related

- [Connect to GitHub Repository](./ui-github.md)
- [Comparing CLI and UI](./comparing-cc.md)
- [Overview](./overview.md)
