# Trigger Specific Tools

AI assistants don't always select the right MCP tool automatically. Explicitly naming the desired tool or describing its output in your prompt forces correct tool selection.

## Signature / Usage

```
# Force get_design_context
"Get the design context for my Figma selection"

# Force get_variable_defs — use explicit description of what you want
"Get the variable names and values used in this frame"

# Force get_screenshot
"Take a screenshot of my selection"

# Force get_metadata
"Get the metadata for the selected Figma layers"
```

## Options / Props

Key tools to trigger explicitly:

| Tool | When to trigger explicitly |
|------|---------------------------|
| `get_design_context` | When you want structured React + Tailwind representation; adapt with framework instructions |
| `get_variable_defs` | When you want design tokens (colors, spacing, typography) rather than generated code |
| `get_screenshot` | When you need a visual reference rather than structured data |
| `get_metadata` | When you want a sparse XML representation of the selection structure |

## Notes

- If output seems incomplete or inaccurate, rephrasing to name the tool explicitly is the first troubleshooting step
- `get_design_context` serves as a foundation for any framework — pair it with framework instructions in your prompt
- As the MCP server adds more tools, explicit tool references in prompts become increasingly important

## Related

- [Tools and Prompts](./tools-and-prompts.md)
- [Write Effective Prompts](./write-effective-prompts.md)
- [Add Custom Rules](./add-custom-rules.md)
