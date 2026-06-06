# vercel skills

Discover agent skills relevant to the current project or search the skill catalog.

## Signature / Usage

```bash
vercel skills
vercel skills nextjs
vercel skills nextjs --json
```

## Options / Props

| Name | Description |
|------|-------------|
| `--json` | Emit results as JSON (equivalent to `--format json`) |
| `--format` | Output format; `json` |
| `--yes` / `-y` | Skip confirmation prompts in interactive flows |

## Notes

- Without arguments, detects project framework (via `@vercel/fs-detectors`) and `package.json` dependencies to recommend matching skills
- With a query argument, searches the catalog by keyword

## Related

- [agent.md](./agent.md)
