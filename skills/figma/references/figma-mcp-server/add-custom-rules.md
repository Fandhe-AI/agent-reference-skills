# Add Custom Rules

Store project-level rules in your MCP client's configuration to guide AI output, reduce repetitive prompting, and ensure consistency across team workflows.

## Signature / Usage

For Claude Code, add rules to `CLAUDE.md`:

```markdown
# MCP Servers
## Figma MCP server rules
- Always use components from `/src/components/ui` when possible
- Prioritize design fidelity; avoid hardcoding values
- Use design tokens from Figma where available
- Follow accessibility standards (WCAG)
- If the Figma MCP Server returns a localhost source for an image or SVG, use that source directly
```

Check your specific client's documentation for the correct configuration file and formatting.

## Options / Props

Recommended rule categories:

| Category | Example rule |
|----------|--------------|
| Component library path | "Always use components from `/path/to/design-system`" |
| Design tokens | "Use Figma variables for spacing, color, and typography" |
| Asset handling | "Use localhost image/SVG sources directly from the Figma payload" |
| Accessibility | "Follow WCAG accessibility standards" |
| Workflow | "Fetch design context first, then screenshots, then translate" |

## Notes

- Rules act as documented best practices that persist across sessions
- To generate tailored rules automatically: prompt the agent to analyze your codebase and produce documentation covering design systems, component libraries, frameworks, and styling approaches
- Avoid creating new icon packages from scratch — assets should always originate from the Figma payload
- A structured workflow rule ensures quality: (1) fetch design context → (2) get screenshots → (3) download assets → (4) translate with project conventions → (5) reuse existing components → (6) validate against Figma

## Related

- [Write Effective Prompts](./write-effective-prompts.md)
- [Trigger Specific Tools](./trigger-specific-tools.md)
- [Code Connect Integration](./code-connect-integration.md)
