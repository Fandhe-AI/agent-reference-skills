# Create Skills for the Figma MCP Server

Package a repeatable Figma workflow into a `SKILL.md` so the agent builds on your existing design system (libraries, variables, modes, components, auto layout) consistently across runs.

## Signature / Usage

```
name: figma-apply-palette
description: "Creates local paint styles in a Figma file from a list of hex color values. Use when seeding or applying a color palette into Figma from an external list of colors. Does not create color variables or bind to design system tokens — use figma-generate-library for that."
compatibility: Requires the figma-use skill to be installed alongside this skill
metadata:
  mcp-server: figma
```

Body of the example skill creates styles via `use_figma`:

```js
(async () => {
  try {
    const style = figma.createPaintStyle();
    style.name = "Brand/Blue";
    style.paints = [{ type: "SOLID", color: { r: 0.23, g: 0.51, b: 0.96 }, opacity: 1 }];
    figma.closePlugin(JSON.stringify({ created: [{ id: style.id, name: style.name }] }));
  } catch(e) { figma.closePluginWithFailure(e.toString()); }
})()
```

## Options / Props

| Step | Detail |
|------|--------|
| Folder | Each skill is a folder containing `SKILL.md`. Claude Code: `.claude/skills/<skill-name>/`. Codex: run `$skill-creator`. Cursor: run `/create-skill` |
| `name` | Short lowercase-hyphen identifier (e.g. `convert-to-variables`), matching the folder name |
| `description` | What the skill does and when to use it; be specific |
| Body | `# Title`, `## When to use`, numbered `## Instructions`, `## Examples` (at least one), `## Common edge cases` |
| Optional frontmatter | `compatibility`, `metadata`, `allowed-tools` — only for real requirements, ownership, versioning |
| `scripts/` | Self-contained code for steps easier or safer in code; document dependencies, return clear errors |
| `references/` | Detailed guidance too long for `SKILL.md`; one topic per file |
| `assets/` | Templates, example files, lookup tables, sample output structure |

## Notes

- Custom skills work best alongside Figma's `figma-use` skill, which teaches the agent the basics of writing to Figma. Try Figma-provided skills first.
- Example skill pattern: pass `skillNames: "<skill-name>"` when calling `use_figma` (a logging parameter that does not affect execution); invoke `figma-use` before every `use_figma` call; on any `use_figma` error, stop, call `get_metadata` to inspect partial state, clean up, fix the root cause, then retry.
- Best practices: write descriptions like routing rules (say when to use and when not to); keep `SKILL.md` focused and move detail to supporting files; make high-risk skills manual only via the client's option such as `disable-model-invocation`.
- Test on a duplicate or example file. Run with `/<skill-name>` in Claude Code, `/skills` or `$` in Codex, `/` in Cursor Agent chat.
- Browse shared skills in the Figma Community (`figma.com/community/skills`) and the `figma/community-resources` GitHub repo (`agent_skills`).
- Source: https://developers.figma.com/docs/figma-mcp-server/create-skills/ (fetched 2026-10-17)

## Related

- [Write to Canvas](./write-to-canvas.md)
- [Tools and Prompts](./tools-and-prompts.md)
- [Write Effective Prompts](./write-effective-prompts.md)
