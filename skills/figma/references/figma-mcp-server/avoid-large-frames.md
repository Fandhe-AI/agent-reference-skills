# Avoid Large Frames

Large frame selections slow down tools, cause errors, or produce incomplete responses because there is too much context for the model to process at once.

## Signature / Usage

```
# Preferred: work at the component level
"Generate code for the Card component in this frame"
"Implement the Header section"
"Build the Sidebar component"

# Avoid: entire screen in one call
"Generate code for this full dashboard screen"
```

## Notes

- Break down selections to individual components or smaller sections (e.g., `Card`, `Header`, `Sidebar`)
- If a request feels slow or stuck, reduce your selection size and retry
- Keeping context manageable leads to more predictable outcomes for both user and model
- When troubleshooting quality issues, revisit three fundamentals: (1) how the Figma file is organized, (2) how prompts are written, (3) what context is passed to the model

## Related

- [Structure Figma File](./structure-figma-file.md)
- [Write Effective Prompts](./write-effective-prompts.md)
- [Trigger Specific Tools](./trigger-specific-tools.md)
