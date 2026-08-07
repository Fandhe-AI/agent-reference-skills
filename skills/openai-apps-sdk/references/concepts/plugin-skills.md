# Skills (plugin skills)

Skills are folders of instructions and resources that teach ChatGPT and Codex how to complete repeatable workflows. In an MCP-backed plugin, a skill complements the server by teaching the model how to combine its tools for recognizable user goals.

## Options / Props

| Field | Description |
|------|-------------|
| Name | Skill identifier. |
| Description | Tells the model when to consider the skill. |
| Instructions | Steps for completing the workflow. |
| References/scripts/templates/assets (optional) | Supporting resources bundled with the skill. |

## Notes

- `SKILL.md` is the entry file for a skill folder.
- Boundary: the MCP server provides data, authentication, authorization, and actions; the skill provides reusable instructions, examples, templates, and other resources. A skill can also work without an MCP server when the workflow needs only packaged instructions and resources.
- Activation: the model first sees skill metadata (name, description) and loads the complete instructions when the user's request matches the skill or the user invokes it directly. Write descriptions around the user goal and trigger conditions; keep detailed steps and output requirements in the instruction body.
- "skills" here means a ChatGPT plugin's packaged workflow around its own MCP tools — unrelated to Claude Code Skills or Anthropic's skill system.

## Related

- [MCP server](./mcp-server.md)
- [Plugin Architecture](./plugin-architecture.md)
