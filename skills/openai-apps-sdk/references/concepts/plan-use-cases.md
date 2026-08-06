# Brainstorm Plugin Use Cases

Before building, list what people will expect the plugin to do based on its name, description, skills, tools, and connection to an existing product. This determines what belongs in the plugin: a skill for instructions/resources, an MCP server for live data/authentication/controlled actions, and UI only when visual interaction materially improves a workflow.

## Options / Props

| Field (use-case inventory) | Question to answer |
|------|-------------|
| User goal | What is the person trying to accomplish? |
| Example requests | How might they ask directly or indirectly? |
| Expected result | What would make the interaction successful? |
| Required context | What information, account access, or prior state is needed? |
| Plugin capability | Can a skill handle it, or does it need an MCP tool? |
| Safety boundary | Could it expose data, change state, spend money, or affect another person? |
| Support decision | Will the first version support it, defer it, or intentionally exclude it? |

## Notes

- Gather likely requests from existing product tasks, user interviews, support requests, search queries, and common terms; do not limit the brainstorm to what the current API already supports.
- Group requests sharing the same goal into one use case with different filters rather than separate features.
- Check coverage: confirm each supported use case has a complete request-to-result path, identify missing skills/tools/data/permissions, avoid tools that expose technical operations without a recognizable user goal, verify write actions have authorization/confirmation, and ensure the plugin can explain what it cannot do.
- Document intentional exclusions (safety/privacy risk, unsupported by underlying API, unverifiable permissions, misleading results, or out-of-scope for the first release) — these inform skill boundaries, tool descriptions, refusal behavior, and test cases.
- Keep the use-case inventory as a test plan with direct, indirect, edge-case, and out-of-scope requests.

## Related

- [Define tools](./define-tools.md)
- [Skills (plugin skills)](./plugin-skills.md)
- [MCP server](./mcp-server.md)
