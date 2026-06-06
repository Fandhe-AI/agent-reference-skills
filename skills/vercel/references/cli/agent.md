# vercel agent

Generate or update a section about Vercel deployment best practices in the project's agent guidance file (`AGENTS.md` or `CLAUDE.md`).

## Signature / Usage

```bash
vercel agent init
vercel agent init --yes
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--yes` | `-y` | Skip the confirmation prompt; required in non-interactive shells |

## Notes

- Target file is `AGENTS.md` by default; `CLAUDE.md` when run from Claude Code
- Wrapped in `<!-- VERCEL BEST PRACTICES START -->` / `<!-- VERCEL BEST PRACTICES END -->` markers
- Safe to re-run: updates only the marked section; existing content is preserved
- Creates the file if it doesn't exist; appends if markers are absent
