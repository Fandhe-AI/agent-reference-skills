# Build skills

A skill complements a plugin's MCP server by teaching ChatGPT and Codex how to use its tools in a repeatable workflow (tool sequences, decision points, output requirements, examples, templates). The server handles live data, auth, and actions; the skill handles reusable procedural guidance. A skill can also work without an MCP server if it needs only packaged instructions/resources.

## Signature / Usage

```md
---
name: tabletop-dice
description: Roll one or more dice for tabletop games and report each result and the total.
---

Use this skill when the user asks to roll dice.

1. Parse requests written as `NdS` as N dice with S sides. For example, `3d6`
   means three six-sided dice.
2. Call `roll_dice` once for each requested die and pass S as `sides`.
3. Report each tool result in order.
4. When the user requests multiple dice, add the results and report the total.

Do not invent, replace, or reroll a result unless the user asks you to.
```

Create with the built-in creator:

```text
@skill-creator Create a skill named tabletop-dice that understands dice
notation such as 3d6, calls roll_dice once for each die, and reports every
roll and the total.
```

Codex invokes the same creator as `$skill-creator`.

Declare an MCP tool dependency in `agents/openai.yaml`:

```yaml
dependencies:
  tools:
    - type: "mcp"
      value: "dice-roller"
      description: "Roll an N-sided die"
      transport: "streamable_http"
      url: "https://tinymcp.dev/api/moldy-aloof-zettabyte/mcp"
```

## Options / Props

| Directory | Purpose |
|-----------|---------|
| `SKILL.md` | `name` + `description` frontmatter (determines when the model considers the skill) plus body instructions |
| `references/` | Policies, schemas, examples, background material |
| `assets/` | Templates or files the workflow copies/transforms |
| `scripts/` | Deterministic computation or file processing the model shouldn't do inline |

## Notes

- **"skills" here means a ChatGPT plugin's packaged workflow around its own MCP tools — unrelated to Claude Code Skills or Anthropic's skill system.**
- One plugin can contain one skill or a group of related skills; keep each skill focused on one recognizable user goal from the use-case inventory.
- The `description` determines activation; put detailed procedure/format/safety instructions in the body.
- A dependency declaration in `agents/openai.yaml` makes a tool available but does not replace clear workflow instructions (order, fallback handling).
- Skills can be imported from the MCP server itself (via `io.modelcontextprotocol/skills` capability and **Scan Tools** during submission) instead of uploaded as packaged files — see [MCP server § Import skills](./mcp-server.md).
- Test with direct requests, indirect requests (same goal, different phrasing), incomplete inputs (should trigger follow-up), requests that should NOT activate the skill, and edge cases where the skill must avoid inventing info.
- Package by pointing the plugin manifest's `skills` field at the skills directory: `"skills": "./skills/"`.

## Related

- [MCP server](./mcp-server.md)
- [Package your plugin](./package-plugin.md)
