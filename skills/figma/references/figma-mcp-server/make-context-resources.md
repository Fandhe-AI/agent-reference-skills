# Make Context and Resources

Official title: "Resources (Make → MCP)". Fetch code and other resources from Figma Make files through the MCP integration, enabling agents to reuse existing design context instead of starting from scratch.

## Signature / Usage

Example prompt workflow:

1. Share a Make project link with the agent
2. Agent returns a list of available files in the project
3. Download desired files when prompted

Example prompt:

```
"Here is my Make project link: [URL]. Extract the button component's behavior and styling for implementation."
```

## Options / Props

| Item | Details |
| --- | --- |
| Availability | Starter, Professional, Education, Organization, and Enterprise plans; requires view access to the file and an MCP client that supports MCP resources |
| Flow | Copy the Make file URL → paste it in your MCP client and ask for context → the agent lists the files in the Make project → choose the files to get |
| Fetch scope | Project context directly from Make (individual files or whole project) |
| Component reuse | Prompt the agent to use existing code components instead of creating new ones |
| Prototype extension | Extend prototypes with real data to validate and productionize designs faster |

## Notes

- This integration uses the **MCP resources** capability; only available on clients that support MCP resources
- Designed to reduce friction when transitioning Make prototypes into production applications
- Preserves design intent throughout implementation by reusing existing component definitions
- Name the component in your codebase you want the agent to use, so it extends what you already have
- This page is about bringing Make content into your own coding tools. To connect other services to Figma Make, see Figma's "Manage MCP connectors" article
- Reverse direction: `send_code_to_figma` imports a local project into Figma as a Make file or code layer (see [Tools and Prompts](./tools-and-prompts.md))

## Related

- [Overview](./overview.md)
- [Code Connect Integration](./code-connect-integration.md)
- [Write to Canvas](./write-to-canvas.md)
