# Comparing Code Connect UI and CLI

Side-by-side comparison of the two Code Connect approaches to help teams choose the right tool.

## Signature / Usage

Use the **CLI** when your team needs precise prop mapping and design-system snippets in Inspect:

```bash
# install, configure figma.config.ts, then publish
npx figma connect publish
```

Use the **UI** (Dev Mode) when no local setup is desired or when mapping spans multiple frameworks simultaneously — open a component in Dev Mode and follow the guided connection flow.

## Options / Props

| Aspect | CLI | UI |
|--------|-----|-----|
| Setup location | Runs locally in repository | Integrated in Figma Dev Mode |
| MCP context provided | Component path, name, property mapping, dynamic code examples | Component path, name, user prompts, codebase context |
| Language support | Built-in parsers for React, Web Components, SwiftUI, Jetpack Compose; template files for any language | Language-agnostic; supports multiple frameworks simultaneously |
| Connections per component | Single mapping | One-to-many across frameworks |
| Code display in Inspect | Shows design system snippets | Displays file/component names only; AI-generated code preview |
| Property mapping | Full prop mapping with helpers | Not currently supported |
| Target audience | Engineering teams wanting precision and control | Mixed design-engineering teams; no local setup required |

## Notes

- CLI-created connections appear in the UI but remain editable only via CLI
- UI scales better across organizations where non-developers participate in component mapping
- Both tools complement each other and both enhance Figma MCP server context

## Related

- [CLI Quickstart](./quickstart.md)
- [UI Setup](./ui-setup.md)
- [Overview](./overview.md)
