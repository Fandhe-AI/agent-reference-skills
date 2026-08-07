# Define tools

Tools are the actions and data that a plugin's MCP server exposes to ChatGPT and Codex. Define them after brainstorming use cases and before implementing the server; every tool should help complete a user goal rather than mirror an internal API.

## Signature / Usage

```text
list_projects   -> find projects (read)
get_project     -> inspect one project (read)
create_project  -> create a project (write)
update_project  -> change project details (write)
archive_project -> consequential state change (write)
```

## Options / Props

| Field (tool contract) | What to define |
|------|-------------|
| Name | A stable, action-oriented identifier. |
| Title | A concise human-readable action. |
| Description | The user goal and conditions that should trigger the tool. |
| Input schema | Required and optional parameters, types, allowed values, and limits. |
| Output schema | Structured fields the model can inspect and reuse. |
| Authorization | The account, role, or resource access the server must verify. |
| Side effects | Data or external state the tool can change. |
| Failure behavior | Errors the model can explain or recover from. |

## Notes

- Separate read and write operations so the model and user can distinguish information retrieval from state-changing actions; split operations that have different permissions, safety risks, or confirmation requirements.
- Use explicit inputs; do not depend on the model guessing identifiers or account scope. Return stable identifiers and enough structured data for follow-up calls; keep secrets, tokens, and unnecessary personal data out of results.
- Write tool descriptions around user intent (what it does, when to use it, how it differs from similar tools), not implementation details.
- Safety annotations follow the MCP `ToolAnnotations` schema: `readOnlyHint` (true only if the tool cannot change state), `destructiveHint` (true if the tool can cause irreversible/hard-to-reverse outcomes), `openWorldHint` (true if the tool can affect public/external systems). Annotations do not replace server-side authorization, validation, or confirmation.
- Keep the finished tool plan as an implementation and evaluation checklist; test each contract with representative, invalid, and unauthorized inputs.

## Related

- [Brainstorm Plugin Use Cases](./plan-use-cases.md)
- [MCP server](./mcp-server.md)
