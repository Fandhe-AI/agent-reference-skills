# Structure Figma File

Best practices for organizing Figma files to maximize code generation quality when using the MCP server.

## Options / Props

| Practice | Detail |
|----------|--------|
| Use components | Buttons, cards, inputs, nav items — anything repeated should be a component |
| Connect via Code Connect | The #1 way to get consistent component reuse in generated code |
| Apply Figma Variables | Use variables consistently for spacing, color, radius, and typography |
| Semantic layer naming | Replace `Frame1268` with descriptive names like `CardContainer` or `CTA_Button` |
| Auto Layout | Makes designs more responsive and communicates layout intent clearly |
| Add Annotations | Convey design behaviors and intent that visuals alone cannot communicate |
| Include Dev Resources | Attach developer resource links to layers in Dev Mode for added context |

## Notes

- Semantic layer names help the model comprehend functionality and purpose; generic names produce lower-quality code
- Auto Layout typically results in cleaner code without absolute positioning
- Code Connect eliminates guesswork for the AI model about which component to use

## Related

- [Code Connect Integration](./code-connect-integration.md)
- [Write Effective Prompts](./write-effective-prompts.md)
- [Avoid Large Frames](./avoid-large-frames.md)
