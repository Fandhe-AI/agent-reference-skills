# Write Effective Prompts

Guidelines for crafting prompts that get precise, consistent output from the Figma MCP server. Treat prompting like briefing a teammate — specificity drives results.

## Signature / Usage

```
# Specify framework and styling system
"Generate iOS SwiftUI code from the selected Figma frame"
"Implement the selected frame using Chakra UI components"

# Target your codebase conventions and file paths
"Generate this using components from src/components/ui"
"Add this component to src/components/marketing/PricingCard.tsx"

# Specify layout system
"Implement this using our Stack layout component"
```

## Options / Props

What a well-specified prompt controls:

| Aspect | Example |
|--------|---------|
| Framework or styling system | "React + Tailwind", "SwiftUI", "Chakra UI" |
| Codebase conventions | File structure, naming patterns, layout approaches |
| Output file path | `src/pages`, `components/ui` |
| Edit vs. create | "Add this to…" vs. "Create a new file for…" |
| Layout system | Flexbox, grid, absolute positioning, custom `Stack` component |

## Notes

- The MCP server provides structured data; what the model does with it depends entirely on what you ask
- When output seems wrong, try being explicit about which tool to invoke (see [Trigger Specific Tools](./trigger-specific-tools.md))
- Reusable team guidelines belong in custom rules (see [Add Custom Rules](./add-custom-rules.md))

## Related

- [Trigger Specific Tools](./trigger-specific-tools.md)
- [Add Custom Rules](./add-custom-rules.md)
- [Structure Figma File](./structure-figma-file.md)
