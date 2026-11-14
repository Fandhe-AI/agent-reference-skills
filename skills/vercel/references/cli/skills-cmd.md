# vercel skills

Discover agent skills relevant to the current project or search the skill catalog.

## Signature / Usage

```bash
vercel skills [query]
```

```bash
vercel skills
vercel skills nextjs
vercel skills nextjs --json
vercel skills --yes
```

## Options / Props

| Name | Description |
|------|-------------|
| `--json` | Emit results as JSON instead of human-readable output. Only lists skills; does not prompt or install anything |
| `-y, --yes` | Install every recommended skill that is not installed yet, without asking you to select skills. No effect with a search term or `--json`. Use where the command cannot prompt (script, CI) |

## Notes

- Without arguments, detects the project framework (via `@vercel/fs-detectors`) and scans `package.json` for a curated set of notable dependencies (ORMs, auth libraries, payment SDKs, testing frameworks), recommends matching skills from the Skills.sh catalog, and asks which to install.
- With a query argument, searches the catalog by keyword and lists results without installing them. To install from the results, see Installing skills in the official Agent Resources docs.
- The previous `--format` option is not listed in the current official page (not confirmed).
- Source: https://vercel.com/docs/cli/skills (fetched 2026-11-14)

## Related

- [agent.md](./agent.md)
- [setup.md](./setup.md)
