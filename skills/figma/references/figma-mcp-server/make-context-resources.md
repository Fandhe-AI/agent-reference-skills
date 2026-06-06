# Make Context and Resources

Fetch design and prototype files from Make projects through the MCP integration, enabling agents to reuse existing design context instead of starting from scratch.

## Signature / Usage

```
# Example prompt workflow
1. Share a Make project link with the agent
2. Agent returns a list of available files in the project
3. Download desired files when prompted
```

Example prompt:

```
"Here is my Make project link: [URL]. Extract the button component's behavior and styling for implementation."
```

## Options / Props

- Fetch project context directly from Make (individual files or whole project)
- Prompt the agent to use existing code components instead of creating new ones
- Extend prototypes with real data to validate and productionize designs faster

## Notes

- This integration uses the **MCP resources** capability; only available on clients that support MCP resources
- Designed to reduce friction when transitioning Make prototypes into production applications
- Preserves design intent throughout implementation by reusing existing component definitions

## Related

- [Overview](./overview.md)
- [Code Connect Integration](./code-connect-integration.md)
- [Write to Canvas](./write-to-canvas.md)
