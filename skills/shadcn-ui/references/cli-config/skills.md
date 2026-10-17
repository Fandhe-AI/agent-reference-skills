---
source: https://ui.shadcn.com/docs/skills
---

# Skills

shadcn's own Agent Skill gives AI assistants such as Claude Code project-aware context about shadcn/ui: how to find, install, compose and customize components with the correct APIs for your project.

## Signature / Usage

```bash
npx skills add shadcn/ui
```

Example requests: "Add a login form with email and password fields.", "Switch to --preset [CODE]", "Can you add a hero from @tailark?"

## Notes

- Activates when it finds a `components.json` in the project. On every interaction it runs `shadcn info --json` to read framework, Tailwind version, aliases, base library (`base`, `radix`, or `aria`), icon library, installed components and resolved file paths.
- Included knowledge: CLI commands (`init`, `add`, `search`, `view`, `docs`, `diff`, `info`, `build` with flags, dry-run, smart merge, presets, templates); theming (CSS variables, OKLCH, dark mode, custom colors, border radius, variants; Tailwind v3 and v4); registry authoring (`registry.json`, item types, file objects, dependencies, CSS variables, building, hosting); MCP server setup and tools.
- Pattern enforcement: `FieldGroup` for forms, `ToggleGroup` for option sets, semantic colors, correct base-specific APIs. Component discovery via `shadcn docs`, `shadcn search` or MCP tools.
- This is shadcn's own distributed skill, separate from this repository's shadcn-ui reference skill. Claude Code Agent Skills (SKILL.md) themselves are covered by skill anthropic-claude-code-extend.

## Related

- [shadcn CLI](./cli.md)
- [MCP Server](./mcp.md)
