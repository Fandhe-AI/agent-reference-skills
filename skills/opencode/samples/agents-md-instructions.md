---
source: https://opencode.ai/docs/instructions/
---

# AGENTS.md Instructions

Give OpenCode persistent project guidance with `AGENTS.md` and extra configured instruction files.

```md title="AGENTS.md"
# Project instructions

- Run `bun typecheck` after changing TypeScript.
- Keep database queries in `src/database`.
- Do not edit generated files directly.
```

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "instructions": [
    "CONTRIBUTING.md",
    "docs/guidelines/*.md",
    "~/rules/opencode.md",
    "https://example.com/instructions.md",
  ],
}
```

## Notes

- Remote `https://` instructions are fetched when the config loads and are treated as instructions; use URLs only from origins you control and trust.
- OpenCode V2 recognizes `AGENTS.md` only; it does not fall back to `CLAUDE.md`.
- Files from the workspace up to the project root plus `~/.config/opencode/AGENTS.md` are combined; conflicts are not resolved.
- Configured `instructions` load after `AGENTS.md` files; URLs are fetched with a five-second timeout.
- Distinct from the AGENTS.md handling in openai-codex.
